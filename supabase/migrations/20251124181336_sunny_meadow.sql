/*
  # Estrutura completa do banco FitConnect

  1. Tabelas principais
    - `profiles` - Perfis de usuários (base para alunos e professores)
    - `trainers` - Dados específicos dos professores
    - `students` - Dados específicos dos alunos
    - `specialties` - Especialidades/modalidades
    - `trainer_specialties` - Relação professor-especialidades
    - `gyms` - Academias/locais de atendimento
    - `trainer_gyms` - Relação professor-academias
    - `schedules` - Agenda dos professores
    - `bookings` - Agendamentos de aulas
    - `reviews` - Avaliações dos alunos
    - `pricing_packages` - Pacotes de preços dos professores
    - `transactions` - Transações financeiras
    - `messages` - Sistema de mensagens

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas específicas para cada tipo de usuário
    - Proteção de dados sensíveis

  3. Funcionalidades
    - Sistema completo de agendamento
    - Gestão financeira
    - Avaliações e reviews
    - Mensagens entre usuários
    - Controle de disponibilidade
*/

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum para tipos de usuário
CREATE TYPE user_type AS ENUM ('student', 'trainer');

-- Enum para status de agendamento
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Enum para status de transação
CREATE TYPE transaction_status AS ENUM ('pending', 'paid', 'cancelled', 'refunded');

-- Enum para dias da semana
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- 1. Tabela de perfis (base para todos os usuários)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type user_type NOT NULL,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  birth_date date,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  profile_image_url text,
  city text,
  state text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Tabela específica para professores
CREATE TABLE IF NOT EXISTS trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  cref text NOT NULL,
  experience_years integer DEFAULT 0,
  description text,
  objectives text,
  base_price decimal(10,2) DEFAULT 0,
  start_date date,
  instagram text,
  facebook text,
  linkedin text,
  rating decimal(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  total_students integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Tabela específica para alunos
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  description text,
  fitness_goals text,
  total_classes integer DEFAULT 0,
  total_spent decimal(10,2) DEFAULT 0,
  average_rating decimal(3,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Tabela de especialidades/modalidades
CREATE TABLE IF NOT EXISTS specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- 5. Relação professor-especialidades
CREATE TABLE IF NOT EXISTS trainer_specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid REFERENCES trainers(id) ON DELETE CASCADE,
  specialty_id uuid REFERENCES specialties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(trainer_id, specialty_id)
);

-- 6. Tabela de academias/locais
CREATE TABLE IF NOT EXISTS gyms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  city text NOT NULL,
  state text NOT NULL,
  latitude decimal(10,8),
  longitude decimal(11,8),
  created_at timestamptz DEFAULT now()
);

-- 7. Relação professor-academias
CREATE TABLE IF NOT EXISTS trainer_gyms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid REFERENCES trainers(id) ON DELETE CASCADE,
  gym_id uuid REFERENCES gyms(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(trainer_id, gym_id)
);

-- 8. Agenda dos professores
CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid REFERENCES trainers(id) ON DELETE CASCADE,
  day_of_week day_of_week NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 9. Pacotes de preços
CREATE TABLE IF NOT EXISTS pricing_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid REFERENCES trainers(id) ON DELETE CASCADE,
  name text NOT NULL,
  classes_count integer NOT NULL,
  price decimal(10,2) NOT NULL,
  discount_percentage decimal(5,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 10. Agendamentos
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  trainer_id uuid REFERENCES trainers(id) ON DELETE CASCADE,
  schedule_id uuid REFERENCES schedules(id),
  booking_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  status booking_status DEFAULT 'pending',
  price decimal(10,2) NOT NULL,
  notes text,
  gym_id uuid REFERENCES gyms(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 11. Avaliações
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  trainer_id uuid REFERENCES trainers(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- 12. Transações financeiras
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  trainer_id uuid REFERENCES trainers(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  status transaction_status DEFAULT 'pending',
  payment_method text,
  transaction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- 13. Sistema de mensagens
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  subject text,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_trainers_profile_id ON trainers(profile_id);
CREATE INDEX IF NOT EXISTS idx_students_profile_id ON students(profile_id);
CREATE INDEX IF NOT EXISTS idx_bookings_student_id ON bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_bookings_trainer_id ON bookings(trainer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_schedules_trainer_id ON schedules(trainer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_trainer_id ON reviews(trainer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);

-- Triggers para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trainers_updated_at BEFORE UPDATE ON trainers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_packages_updated_at BEFORE UPDATE ON pricing_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Public can read trainer profiles" ON profiles FOR SELECT TO authenticated USING (user_type = 'trainer');

-- Políticas RLS para trainers
CREATE POLICY "Trainers can manage own data" ON trainers FOR ALL TO authenticated USING (
  profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Public can read active trainers" ON trainers FOR SELECT TO authenticated USING (is_active = true);

-- Políticas RLS para students
CREATE POLICY "Students can manage own data" ON students FOR ALL TO authenticated USING (
  profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Políticas RLS para specialties (público para leitura)
CREATE POLICY "Anyone can read specialties" ON specialties FOR SELECT TO authenticated USING (true);

-- Políticas RLS para trainer_specialties
CREATE POLICY "Trainers can manage own specialties" ON trainer_specialties FOR ALL TO authenticated USING (
  trainer_id IN (
    SELECT t.id FROM trainers t 
    JOIN profiles p ON t.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);
CREATE POLICY "Public can read trainer specialties" ON trainer_specialties FOR SELECT TO authenticated USING (true);

-- Políticas RLS para gyms (público para leitura)
CREATE POLICY "Anyone can read gyms" ON gyms FOR SELECT TO authenticated USING (true);

-- Políticas RLS para trainer_gyms
CREATE POLICY "Trainers can manage own gyms" ON trainer_gyms FOR ALL TO authenticated USING (
  trainer_id IN (
    SELECT t.id FROM trainers t 
    JOIN profiles p ON t.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);
CREATE POLICY "Public can read trainer gyms" ON trainer_gyms FOR SELECT TO authenticated USING (true);

-- Políticas RLS para schedules
CREATE POLICY "Trainers can manage own schedules" ON schedules FOR ALL TO authenticated USING (
  trainer_id IN (
    SELECT t.id FROM trainers t 
    JOIN profiles p ON t.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);
CREATE POLICY "Public can read available schedules" ON schedules FOR SELECT TO authenticated USING (is_available = true);

-- Políticas RLS para pricing_packages
CREATE POLICY "Trainers can manage own packages" ON pricing_packages FOR ALL TO authenticated USING (
  trainer_id IN (
    SELECT t.id FROM trainers t 
    JOIN profiles p ON t.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);
CREATE POLICY "Public can read active packages" ON pricing_packages FOR SELECT TO authenticated USING (is_active = true);

-- Políticas RLS para bookings
CREATE POLICY "Users can read own bookings" ON bookings FOR SELECT TO authenticated USING (
  student_id IN (
    SELECT s.id FROM students s 
    JOIN profiles p ON s.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  ) OR trainer_id IN (
    SELECT t.id FROM trainers t 
    JOIN profiles p ON t.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);
CREATE POLICY "Students can create bookings" ON bookings FOR INSERT TO authenticated WITH CHECK (
  student_id IN (
    SELECT s.id FROM students s 
    JOIN profiles p ON s.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);
CREATE POLICY "Users can update own bookings" ON bookings FOR UPDATE TO authenticated USING (
  student_id IN (
    SELECT s.id FROM students s 
    JOIN profiles p ON s.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  ) OR trainer_id IN (
    SELECT t.id FROM trainers t 
    JOIN profiles p ON t.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);

-- Políticas RLS para reviews
CREATE POLICY "Students can create reviews for own bookings" ON reviews FOR INSERT TO authenticated WITH CHECK (
  student_id IN (
    SELECT s.id FROM students s 
    JOIN profiles p ON s.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);
CREATE POLICY "Public can read reviews" ON reviews FOR SELECT TO authenticated USING (true);

-- Políticas RLS para transactions
CREATE POLICY "Users can read own transactions" ON transactions FOR SELECT TO authenticated USING (
  student_id IN (
    SELECT s.id FROM students s 
    JOIN profiles p ON s.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  ) OR trainer_id IN (
    SELECT t.id FROM trainers t 
    JOIN profiles p ON t.profile_id = p.id 
    WHERE p.user_id = auth.uid()
  )
);

-- Políticas RLS para messages
CREATE POLICY "Users can read own messages" ON messages FOR SELECT TO authenticated USING (
  sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
  receiver_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT TO authenticated WITH CHECK (
  sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own messages" ON messages FOR UPDATE TO authenticated USING (
  receiver_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);