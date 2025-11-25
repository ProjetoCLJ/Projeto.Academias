/*
  # Dados de exemplo para testar a plataforma FitConnect

  Este arquivo insere dados de exemplo para:
  - Especialidades/modalidades
  - Academias
  - Usuários de exemplo (professores e alunos)
  - Agendas
  - Pacotes de preços
  - Alguns agendamentos e avaliações
*/

-- Inserir especialidades
INSERT INTO specialties (id, name, description, icon) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Musculação', 'Treinos com pesos para hipertrofia e força', 'dumbbell'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Yoga', 'Práticas de yoga para flexibilidade e bem-estar', 'heart'),
  ('550e8400-e29b-41d4-a716-446655440003', 'CrossFit', 'Treinos funcionais de alta intensidade', 'zap'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Calistenia', 'Exercícios com peso corporal', 'users'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Artes Marciais', 'Modalidades de luta e defesa pessoal', 'trophy'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Natação', 'Técnicas de natação e condicionamento aquático', 'target'),
  ('550e8400-e29b-41d4-a716-446655440007', 'Pilates', 'Exercícios para fortalecimento do core', 'circle'),
  ('550e8400-e29b-41d4-a716-446655440008', 'Funcional', 'Treinos funcionais para o dia a dia', 'activity');

-- Inserir academias
INSERT INTO gyms (id, name, address, city, state, latitude, longitude) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Smart Fit - Zona Sul', 'Av. Ibirapuera, 1000', 'São Paulo', 'SP', -23.5875, -46.6561),
  ('660e8400-e29b-41d4-a716-446655440002', 'Bodytech - Paulista', 'Av. Paulista, 2000', 'São Paulo', 'SP', -23.5614, -46.6558),
  ('660e8400-e29b-41d4-a716-446655440003', 'Bio Ritmo - Zona Oeste', 'Av. Rebouças, 1500', 'São Paulo', 'SP', -23.5505, -46.6833),
  ('660e8400-e29b-41d4-a716-446655440004', 'Bluefit - Centro', 'R. Augusta, 800', 'São Paulo', 'SP', -23.5489, -46.6388),
  ('660e8400-e29b-41d4-a716-446655440005', 'Fórmula Academia - Zona Norte', 'Av. Cruzeiro do Sul, 2500', 'São Paulo', 'SP', -23.5200, -46.6278),
  ('660e8400-e29b-41d4-a716-446655440006', 'Runner - Vila Madalena', 'R. Harmonia, 500', 'São Paulo', 'SP', -23.5364, -46.6911),
  ('660e8400-e29b-41d4-a716-446655440007', 'Competition - Moema', 'Av. Moema, 300', 'São Paulo', 'SP', -23.6019, -46.6625);

-- Inserir perfis de exemplo (professores)
INSERT INTO profiles (id, user_id, user_type, full_name, email, phone, birth_date, gender, city, state) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '11111111-1111-1111-1111-111111111111', 'trainer', 'Carlos Silva', 'carlos.silva@email.com', '(11) 99999-0001', '1985-03-15', 'male', 'São Paulo', 'SP'),
  ('770e8400-e29b-41d4-a716-446655440002', '22222222-2222-2222-2222-222222222222', 'trainer', 'Ana Santos', 'ana.santos@email.com', '(11) 99999-0002', '1988-07-22', 'female', 'São Paulo', 'SP'),
  ('770e8400-e29b-41d4-a716-446655440003', '33333333-3333-3333-3333-333333333333', 'trainer', 'Roberto Costa', 'roberto.costa@email.com', '(11) 99999-0003', '1982-11-08', 'male', 'São Paulo', 'SP'),
  ('770e8400-e29b-41d4-a716-446655440004', '44444444-4444-4444-4444-444444444444', 'trainer', 'Mariana Oliveira', 'mariana.oliveira@email.com', '(11) 99999-0004', '1990-05-12', 'female', 'São Paulo', 'SP'),
  ('770e8400-e29b-41d4-a716-446655440005', '55555555-5555-5555-5555-555555555555', 'trainer', 'Pedro Almeida', 'pedro.almeida@email.com', '(11) 99999-0005', '1987-09-30', 'male', 'São Paulo', 'SP');

-- Inserir perfis de exemplo (alunos)
INSERT INTO profiles (id, user_id, user_type, full_name, email, phone, birth_date, gender, city, state) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '66666666-6666-6666-6666-666666666666', 'student', 'Maria Fernanda', 'maria.fernanda@email.com', '(11) 99999-1001', '1992-01-20', 'female', 'São Paulo', 'SP'),
  ('880e8400-e29b-41d4-a716-446655440002', '77777777-7777-7777-7777-777777777777', 'student', 'João Pedro', 'joao.pedro@email.com', '(11) 99999-1002', '1989-06-15', 'male', 'São Paulo', 'SP'),
  ('880e8400-e29b-41d4-a716-446655440003', '88888888-8888-8888-8888-888888888888', 'student', 'Beatriz Lima', 'beatriz.lima@email.com', '(11) 99999-1003', '1995-12-03', 'female', 'São Paulo', 'SP'),
  ('880e8400-e29b-41d4-a716-446655440004', '99999999-9999-9999-9999-999999999999', 'student', 'Lucas Rodrigues', 'lucas.rodrigues@email.com', '(11) 99999-1004', '1991-04-18', 'male', 'São Paulo', 'SP');

-- Inserir dados específicos dos professores
INSERT INTO trainers (id, profile_id, cref, experience_years, description, objectives, base_price, start_date, instagram, rating, total_reviews, is_active) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '123456-G/SP', 8, 'Personal trainer especializado em musculação e hipertrofia. Metodologia baseada em ciência e resultados comprovados.', 'Ajudar pessoas a alcançarem seus objetivos de forma saudável e sustentável.', 150.00, '2016-01-15', '@carlossilvafit', 4.8, 124, true),
  ('990e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '234567-G/SP', 10, 'Instrutora de yoga e pilates com certificação internacional. Foco em bem-estar e equilíbrio.', 'Promover o bem-estar físico e mental através de práticas holísticas.', 180.00, '2014-03-20', '@anasantosyoga', 4.9, 98, true),
  ('990e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', '345678-G/SP', 6, 'Especialista em CrossFit e treinamento funcional. Ex-atleta com experiência em competições.', 'Desenvolver atletas e entusiastas do fitness através do treinamento funcional.', 140.00, '2018-06-10', '@robertocrossfit', 4.7, 156, true),
  ('990e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', '456789-G/SP', 5, 'Personal trainer focada em emagrecimento e condicionamento feminino. Abordagem personalizada.', 'Empoderar mulheres através do fitness e autoestima.', 160.00, '2019-02-14', '@marianafitness', 4.9, 87, true),
  ('990e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', '567890-G/SP', 7, 'Especialista em calistenia e peso corporal. Formação em educação física e biomecânica.', 'Ensinar o domínio do próprio corpo através da calistenia.', 130.00, '2017-08-25', '@pedrocalistenia', 4.6, 73, true);

-- Inserir dados específicos dos alunos
INSERT INTO students (id, profile_id, description, fitness_goals, total_classes, total_spent) VALUES
  ('aa0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'Busco emagrecimento e condicionamento físico', 'Perder peso e ganhar condicionamento', 45, 6750.00),
  ('aa0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 'Quero ganhar massa muscular', 'Hipertrofia e força', 32, 4800.00),
  ('aa0e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', 'Iniciante no mundo fitness', 'Criar hábitos saudáveis', 18, 2880.00),
  ('aa0e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440004', 'Atleta amador de corrida', 'Melhorar performance e prevenir lesões', 28, 3640.00);

-- Inserir especialidades dos professores
INSERT INTO trainer_specialties (trainer_id, specialty_id) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001'), -- Carlos - Musculação
  ('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440008'), -- Carlos - Funcional
  ('990e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002'), -- Ana - Yoga
  ('990e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440007'), -- Ana - Pilates
  ('990e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003'), -- Roberto - CrossFit
  ('990e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008'), -- Roberto - Funcional
  ('990e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001'), -- Mariana - Musculação
  ('990e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440008'), -- Mariana - Funcional
  ('990e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004'), -- Pedro - Calistenia
  ('990e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440008'); -- Pedro - Funcional

-- Inserir academias dos professores
INSERT INTO trainer_gyms (trainer_id, gym_id) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001'), -- Carlos - Smart Fit
  ('990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440007'), -- Carlos - Competition
  ('990e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002'), -- Ana - Bodytech
  ('990e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440006'), -- Ana - Runner
  ('990e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004'), -- Roberto - Bluefit
  ('990e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003'), -- Roberto - Bio Ritmo
  ('990e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440001'), -- Mariana - Smart Fit
  ('990e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440007'), -- Mariana - Competition
  ('990e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005'), -- Pedro - Fórmula
  ('990e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440006'); -- Pedro - Runner

-- Inserir horários dos professores
INSERT INTO schedules (trainer_id, day_of_week, start_time, end_time, is_available) VALUES
  -- Carlos Silva
  ('990e8400-e29b-41d4-a716-446655440001', 'monday', '08:00', '09:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'monday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'monday', '14:00', '15:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'monday', '15:00', '16:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'tuesday', '08:00', '09:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'tuesday', '10:00', '11:00', false),
  ('990e8400-e29b-41d4-a716-446655440001', 'tuesday', '14:00', '15:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'wednesday', '08:00', '09:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'wednesday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'wednesday', '16:00', '17:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'thursday', '08:00', '09:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'thursday', '14:00', '15:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'thursday', '15:00', '16:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'friday', '08:00', '09:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'friday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'saturday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440001', 'saturday', '10:00', '11:00', true),
  
  -- Ana Santos
  ('990e8400-e29b-41d4-a716-446655440002', 'monday', '07:00', '08:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'monday', '08:00', '09:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'monday', '17:00', '18:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'monday', '18:00', '19:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'tuesday', '07:00', '08:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'tuesday', '18:00', '19:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'wednesday', '07:00', '08:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'wednesday', '17:00', '18:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'thursday', '07:00', '08:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'thursday', '17:00', '18:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'friday', '07:00', '08:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'saturday', '08:00', '09:00', true),
  ('990e8400-e29b-41d4-a716-446655440002', 'saturday', '09:00', '10:00', true),
  
  -- Roberto Costa
  ('990e8400-e29b-41d4-a716-446655440003', 'monday', '06:00', '07:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'monday', '18:00', '19:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'monday', '19:00', '20:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'tuesday', '06:00', '07:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'tuesday', '18:00', '19:00', false),
  ('990e8400-e29b-41d4-a716-446655440003', 'wednesday', '06:00', '07:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'wednesday', '19:00', '20:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'thursday', '06:00', '07:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'thursday', '18:00', '19:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'friday', '06:00', '07:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'saturday', '07:00', '08:00', true),
  ('990e8400-e29b-41d4-a716-446655440003', 'saturday', '08:00', '09:00', true),
  
  -- Mariana Oliveira
  ('990e8400-e29b-41d4-a716-446655440004', 'monday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'monday', '10:00', '11:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'monday', '16:00', '17:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'tuesday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'tuesday', '16:00', '17:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'tuesday', '17:00', '18:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'wednesday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'wednesday', '10:00', '11:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'thursday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'thursday', '16:00', '17:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'friday', '09:00', '10:00', true),
  ('990e8400-e29b-41d4-a716-446655440004', 'saturday', '10:00', '11:00', true),
  
  -- Pedro Almeida
  ('990e8400-e29b-41d4-a716-446655440005', 'monday', '15:00', '16:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'monday', '16:00', '17:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'tuesday', '15:00', '16:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'tuesday', '17:00', '18:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'wednesday', '15:00', '16:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'wednesday', '16:00', '17:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'thursday', '15:00', '16:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'friday', '15:00', '16:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'friday', '16:00', '17:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'saturday', '14:00', '15:00', true),
  ('990e8400-e29b-41d4-a716-446655440005', 'saturday', '15:00', '16:00', true);

-- Inserir pacotes de preços
INSERT INTO pricing_packages (trainer_id, name, classes_count, price, discount_percentage, is_active) VALUES
  -- Carlos Silva
  ('990e8400-e29b-41d4-a716-446655440001', 'Pacote 4 aulas', 4, 570.00, 5.0, true),
  ('990e8400-e29b-41d4-a716-446655440001', 'Pacote 8 aulas', 8, 1080.00, 10.0, true),
  ('990e8400-e29b-41d4-a716-446655440001', 'Pacote 12 aulas', 12, 1530.00, 15.0, true),
  
  -- Ana Santos
  ('990e8400-e29b-41d4-a716-446655440002', 'Pacote 4 aulas', 4, 684.00, 5.0, true),
  ('990e8400-e29b-41d4-a716-446655440002', 'Pacote 8 aulas', 8, 1296.00, 10.0, true),
  ('990e8400-e29b-41d4-a716-446655440002', 'Pacote 12 aulas', 12, 1836.00, 15.0, true),
  
  -- Roberto Costa
  ('990e8400-e29b-41d4-a716-446655440003', 'Pacote 4 aulas', 4, 532.00, 5.0, true),
  ('990e8400-e29b-41d4-a716-446655440003', 'Pacote 8 aulas', 8, 1008.00, 10.0, true),
  ('990e8400-e29b-41d4-a716-446655440003', 'Pacote 12 aulas', 12, 1428.00, 15.0, true),
  
  -- Mariana Oliveira
  ('990e8400-e29b-41d4-a716-446655440004', 'Pacote 4 aulas', 4, 608.00, 5.0, true),
  ('990e8400-e29b-41d4-a716-446655440004', 'Pacote 8 aulas', 8, 1152.00, 10.0, true),
  ('990e8400-e29b-41d4-a716-446655440004', 'Pacote 12 aulas', 12, 1632.00, 15.0, true),
  
  -- Pedro Almeida
  ('990e8400-e29b-41d4-a716-446655440005', 'Pacote 4 aulas', 4, 494.00, 5.0, true),
  ('990e8400-e29b-41d4-a716-446655440005', 'Pacote 8 aulas', 8, 936.00, 10.0, true),
  ('990e8400-e29b-41d4-a716-446655440005', 'Pacote 12 aulas', 12, 1326.00, 15.0, true);

-- Inserir alguns agendamentos de exemplo
INSERT INTO bookings (id, student_id, trainer_id, booking_date, start_time, end_time, status, price, gym_id) VALUES
  ('bb0e8400-e29b-41d4-a716-446655440001', 'aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '2024-12-02', '08:00', '09:00', 'confirmed', 150.00, '660e8400-e29b-41d4-a716-446655440001'),
  ('bb0e8400-e29b-41d4-a716-446655440002', 'aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', '2024-12-02', '17:00', '18:00', 'confirmed', 180.00, '660e8400-e29b-41d4-a716-446655440002'),
  ('bb0e8400-e29b-41d4-a716-446655440003', 'aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440003', '2024-12-03', '18:00', '19:00', 'pending', 140.00, '660e8400-e29b-41d4-a716-446655440004'),
  ('bb0e8400-e29b-41d4-a716-446655440004', 'aa0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440004', '2024-12-04', '09:00', '10:00', 'confirmed', 160.00, '660e8400-e29b-41d4-a716-446655440001'),
  ('bb0e8400-e29b-41d4-a716-446655440005', 'aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440005', '2024-11-28', '15:00', '16:00', 'completed', 130.00, '660e8400-e29b-41d4-a716-446655440005'),
  ('bb0e8400-e29b-41d4-a716-446655440006', 'aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', '2024-11-25', '14:00', '15:00', 'completed', 150.00, '660e8400-e29b-41d4-a716-446655440001'),
  ('bb0e8400-e29b-41d4-a716-446655440007', 'aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', '2024-11-20', '07:00', '08:00', 'completed', 180.00, '660e8400-e29b-41d4-a716-446655440002');

-- Inserir transações
INSERT INTO transactions (booking_id, student_id, trainer_id, amount, status, payment_method) VALUES
  ('bb0e8400-e29b-41d4-a716-446655440001', 'aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 150.00, 'paid', 'credit_card'),
  ('bb0e8400-e29b-41d4-a716-446655440002', 'aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', 180.00, 'paid', 'pix'),
  ('bb0e8400-e29b-41d4-a716-446655440003', 'aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440003', 140.00, 'pending', 'credit_card'),
  ('bb0e8400-e29b-41d4-a716-446655440004', 'aa0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440004', 160.00, 'paid', 'debit_card'),
  ('bb0e8400-e29b-41d4-a716-446655440005', 'aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440005', 130.00, 'paid', 'pix'),
  ('bb0e8400-e29b-41d4-a716-446655440006', 'aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', 150.00, 'paid', 'credit_card'),
  ('bb0e8400-e29b-41d4-a716-446655440007', 'aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', 180.00, 'paid', 'pix');

-- Inserir avaliações
INSERT INTO reviews (booking_id, student_id, trainer_id, rating, comment) VALUES
  ('bb0e8400-e29b-41d4-a716-446655440005', 'aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440005', 5, 'Excelente professor! Muito atencioso e com ótima metodologia. Recomendo!'),
  ('bb0e8400-e29b-41d4-a716-446655440006', 'aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', 5, 'Carlos é um profissional excepcional. Treinos personalizados e resultados rápidos.'),
  ('bb0e8400-e29b-41d4-a716-446655440007', 'aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', 4, 'Ana é muito dedicada e as aulas de yoga são relaxantes. Ambiente muito bom.');

-- Inserir algumas mensagens de exemplo
INSERT INTO messages (sender_id, receiver_id, booking_id, subject, content) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440001', 'Confirmação da aula', 'Olá Carlos! Confirmo nossa aula de segunda-feira às 8h. Até lá!'),
  ('770e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440001', 'Re: Confirmação da aula', 'Perfeito Maria! Estarei te esperando na Smart Fit. Lembre-se de trazer uma toalha.'),
  ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440002', 'Dúvida sobre equipamentos', 'Oi Ana! Preciso levar algum equipamento específico para a aula de yoga?'),
  ('770e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440002', 'Re: Dúvida sobre equipamentos', 'Olá João! Apenas um tapete de yoga, se tiver. Caso contrário, a academia fornece. Namastê!');