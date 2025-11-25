/*
  # Funções auxiliares para testes da plataforma FitConnect

  Funções para facilitar consultas e testes:
  - Buscar professores por modalidade e cidade
  - Calcular estatísticas de professores
  - Verificar disponibilidade de horários
  - Funções de relatórios
*/

-- Função para buscar professores por modalidade e cidade
CREATE OR REPLACE FUNCTION search_trainers(
  p_specialty_name text DEFAULT NULL,
  p_city text DEFAULT NULL,
  p_day_of_week day_of_week DEFAULT NULL,
  p_start_time time DEFAULT NULL,
  p_end_time time DEFAULT NULL
)
RETURNS TABLE (
  trainer_id uuid,
  full_name text,
  rating decimal,
  total_reviews integer,
  base_price decimal,
  experience_years integer,
  description text,
  specialties text[],
  gym_names text[],
  available_slots json
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id as trainer_id,
    p.full_name,
    t.rating,
    t.total_reviews,
    t.base_price,
    t.experience_years,
    t.description,
    ARRAY_AGG(DISTINCT s.name) as specialties,
    ARRAY_AGG(DISTINCT g.name) as gym_names,
    json_agg(
      DISTINCT json_build_object(
        'day', sch.day_of_week,
        'start_time', sch.start_time,
        'end_time', sch.end_time,
        'available', sch.is_available
      )
    ) as available_slots
  FROM trainers t
  JOIN profiles p ON t.profile_id = p.id
  LEFT JOIN trainer_specialties ts ON t.id = ts.trainer_id
  LEFT JOIN specialties s ON ts.specialty_id = s.id
  LEFT JOIN trainer_gyms tg ON t.id = tg.trainer_id
  LEFT JOIN gyms g ON tg.gym_id = g.id
  LEFT JOIN schedules sch ON t.id = sch.trainer_id
  WHERE 
    t.is_active = true
    AND (p_specialty_name IS NULL OR s.name ILIKE '%' || p_specialty_name || '%')
    AND (p_city IS NULL OR p.city ILIKE '%' || p_city || '%')
    AND (p_day_of_week IS NULL OR sch.day_of_week = p_day_of_week)
    AND (p_start_time IS NULL OR sch.start_time >= p_start_time)
    AND (p_end_time IS NULL OR sch.end_time <= p_end_time)
  GROUP BY t.id, p.full_name, t.rating, t.total_reviews, t.base_price, t.experience_years, t.description
  ORDER BY t.rating DESC, t.total_reviews DESC;
END;
$$ LANGUAGE plpgsql;

-- Função para obter estatísticas de um professor
CREATE OR REPLACE FUNCTION get_trainer_stats(p_trainer_id uuid)
RETURNS TABLE (
  total_bookings integer,
  completed_bookings integer,
  pending_bookings integer,
  cancelled_bookings integer,
  total_earnings decimal,
  current_month_earnings decimal,
  average_rating decimal,
  total_reviews integer,
  active_students integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(b.id)::integer as total_bookings,
    COUNT(CASE WHEN b.status = 'completed' THEN 1 END)::integer as completed_bookings,
    COUNT(CASE WHEN b.status = 'pending' THEN 1 END)::integer as pending_bookings,
    COUNT(CASE WHEN b.status = 'cancelled' THEN 1 END)::integer as cancelled_bookings,
    COALESCE(SUM(CASE WHEN t.status = 'paid' THEN t.amount END), 0) as total_earnings,
    COALESCE(SUM(CASE WHEN t.status = 'paid' AND DATE_TRUNC('month', t.transaction_date) = DATE_TRUNC('month', CURRENT_DATE) THEN t.amount END), 0) as current_month_earnings,
    tr.rating as average_rating,
    tr.total_reviews,
    COUNT(DISTINCT b.student_id)::integer as active_students
  FROM trainers tr
  LEFT JOIN bookings b ON tr.id = b.trainer_id
  LEFT JOIN transactions t ON b.id = t.booking_id
  WHERE tr.id = p_trainer_id
  GROUP BY tr.id, tr.rating, tr.total_reviews;
END;
$$ LANGUAGE plpgsql;

-- Função para verificar disponibilidade de horário
CREATE OR REPLACE FUNCTION check_availability(
  p_trainer_id uuid,
  p_day_of_week day_of_week,
  p_start_time time,
  p_end_time time,
  p_booking_date date DEFAULT NULL
)
RETURNS boolean AS $$
DECLARE
  schedule_exists boolean := false;
  booking_conflict boolean := false;
BEGIN
  -- Verificar se existe horário na agenda
  SELECT EXISTS(
    SELECT 1 FROM schedules 
    WHERE trainer_id = p_trainer_id 
    AND day_of_week = p_day_of_week 
    AND start_time <= p_start_time 
    AND end_time >= p_end_time
    AND is_available = true
  ) INTO schedule_exists;
  
  -- Se uma data específica foi fornecida, verificar conflitos
  IF p_booking_date IS NOT NULL THEN
    SELECT EXISTS(
      SELECT 1 FROM bookings 
      WHERE trainer_id = p_trainer_id 
      AND booking_date = p_booking_date
      AND status IN ('confirmed', 'pending')
      AND (
        (start_time <= p_start_time AND end_time > p_start_time) OR
        (start_time < p_end_time AND end_time >= p_end_time) OR
        (start_time >= p_start_time AND end_time <= p_end_time)
      )
    ) INTO booking_conflict;
  END IF;
  
  RETURN schedule_exists AND NOT booking_conflict;
END;
$$ LANGUAGE plpgsql;

-- Função para obter relatório mensal de um professor
CREATE OR REPLACE FUNCTION get_monthly_report(
  p_trainer_id uuid,
  p_year integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  p_month integer DEFAULT EXTRACT(MONTH FROM CURRENT_DATE)
)
RETURNS TABLE (
  month_year text,
  total_classes integer,
  completed_classes integer,
  cancelled_classes integer,
  total_earnings decimal,
  paid_earnings decimal,
  pending_earnings decimal,
  new_students integer,
  average_rating decimal
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(DATE_TRUNC('month', b.booking_date), 'MM/YYYY') as month_year,
    COUNT(b.id)::integer as total_classes,
    COUNT(CASE WHEN b.status = 'completed' THEN 1 END)::integer as completed_classes,
    COUNT(CASE WHEN b.status = 'cancelled' THEN 1 END)::integer as cancelled_classes,
    COALESCE(SUM(b.price), 0) as total_earnings,
    COALESCE(SUM(CASE WHEN t.status = 'paid' THEN t.amount END), 0) as paid_earnings,
    COALESCE(SUM(CASE WHEN t.status = 'pending' THEN t.amount END), 0) as pending_earnings,
    COUNT(DISTINCT b.student_id)::integer as new_students,
    COALESCE(AVG(r.rating), 0) as average_rating
  FROM bookings b
  LEFT JOIN transactions t ON b.id = t.booking_id
  LEFT JOIN reviews r ON b.id = r.booking_id
  WHERE 
    b.trainer_id = p_trainer_id
    AND EXTRACT(YEAR FROM b.booking_date) = p_year
    AND EXTRACT(MONTH FROM b.booking_date) = p_month
  GROUP BY DATE_TRUNC('month', b.booking_date);
END;
$$ LANGUAGE plpgsql;

-- Função para obter próximas aulas de um aluno
CREATE OR REPLACE FUNCTION get_student_upcoming_classes(p_student_id uuid)
RETURNS TABLE (
  booking_id uuid,
  trainer_name text,
  booking_date date,
  start_time time,
  end_time time,
  gym_name text,
  gym_address text,
  status booking_status,
  price decimal
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id as booking_id,
    p.full_name as trainer_name,
    b.booking_date,
    b.start_time,
    b.end_time,
    g.name as gym_name,
    g.address as gym_address,
    b.status,
    b.price
  FROM bookings b
  JOIN trainers t ON b.trainer_id = t.id
  JOIN profiles p ON t.profile_id = p.id
  LEFT JOIN gyms g ON b.gym_id = g.id
  WHERE 
    b.student_id = p_student_id
    AND b.booking_date >= CURRENT_DATE
    AND b.status IN ('confirmed', 'pending')
  ORDER BY b.booking_date, b.start_time;
END;
$$ LANGUAGE plpgsql;

-- Função para obter histórico de aulas de um aluno
CREATE OR REPLACE FUNCTION get_student_class_history(p_student_id uuid)
RETURNS TABLE (
  booking_id uuid,
  trainer_name text,
  booking_date date,
  start_time time,
  end_time time,
  gym_name text,
  status booking_status,
  price decimal,
  rating integer,
  review_comment text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id as booking_id,
    p.full_name as trainer_name,
    b.booking_date,
    b.start_time,
    b.end_time,
    g.name as gym_name,
    b.status,
    b.price,
    r.rating,
    r.comment as review_comment
  FROM bookings b
  JOIN trainers t ON b.trainer_id = t.id
  JOIN profiles p ON t.profile_id = p.id
  LEFT JOIN gyms g ON b.gym_id = g.id
  LEFT JOIN reviews r ON b.id = r.booking_id
  WHERE 
    b.student_id = p_student_id
    AND b.status = 'completed'
  ORDER BY b.booking_date DESC, b.start_time DESC;
END;
$$ LANGUAGE plpgsql;