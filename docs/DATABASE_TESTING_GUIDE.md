# Guia de Testes do Banco de Dados FitConnect

## Estrutura Criada

O banco de dados foi configurado com uma estrutura completa para testar todas as funcionalidades da plataforma:

### 📊 Dados de Exemplo Inseridos

#### Professores (5 perfis completos)
- **Carlos Silva** - Musculação/Funcional (R$ 150/aula)
- **Ana Santos** - Yoga/Pilates (R$ 180/aula) 
- **Roberto Costa** - CrossFit/Funcional (R$ 140/aula)
- **Mariana Oliveira** - Musculação/Funcional (R$ 160/aula)
- **Pedro Almeida** - Calistenia/Funcional (R$ 130/aula)

#### Alunos (4 perfis)
- **Maria Fernanda** - Foco em emagrecimento
- **João Pedro** - Foco em hipertrofia
- **Beatriz Lima** - Iniciante
- **Lucas Rodrigues** - Atleta amador

#### Academias (7 locais)
- Smart Fit, Bodytech, Bio Ritmo, Bluefit, Fórmula Academia, Runner, Competition

#### Especialidades (8 modalidades)
- Musculação, Yoga, CrossFit, Calistenia, Artes Marciais, Natação, Pilates, Funcional

### 🔧 Funcionalidades para Testar

## 1. Busca de Professores

```sql
-- Buscar professores de musculação em São Paulo
SELECT * FROM search_trainers('Musculação', 'São Paulo');

-- Buscar professores disponíveis na segunda-feira de manhã
SELECT * FROM search_trainers(NULL, 'São Paulo', 'monday', '08:00', '10:00');
```

## 2. Verificar Disponibilidade

```sql
-- Verificar se Carlos Silva está disponível na segunda às 8h
SELECT check_availability(
  '990e8400-e29b-41d4-a716-446655440001', 
  'monday', 
  '08:00', 
  '09:00',
  '2024-12-09'
);
```

## 3. Estatísticas de Professor

```sql
-- Obter estatísticas do Carlos Silva
SELECT * FROM get_trainer_stats('990e8400-e29b-41d4-a716-446655440001');
```

## 4. Relatório Mensal

```sql
-- Relatório de dezembro 2024 do Carlos Silva
SELECT * FROM get_monthly_report(
  '990e8400-e29b-41d4-a716-446655440001', 
  2024, 
  12
);
```

## 5. Próximas Aulas do Aluno

```sql
-- Próximas aulas da Maria Fernanda
SELECT * FROM get_student_upcoming_classes('aa0e8400-e29b-41d4-a716-446655440001');
```

## 6. Histórico do Aluno

```sql
-- Histórico de aulas da Maria Fernanda
SELECT * FROM get_student_class_history('aa0e8400-e29b-41d4-a716-446655440001');
```

### 📋 Cenários de Teste Prontos

#### Para Professores:
1. **Gestão de Agenda**: Horários já cadastrados para todos os professores
2. **Pacotes de Preços**: 3 pacotes por professor (4, 8, 12 aulas)
3. **Agendamentos**: Aulas confirmadas, pendentes e concluídas
4. **Faturamento**: Transações pagas, pendentes e canceladas
5. **Avaliações**: Reviews reais dos alunos

#### Para Alunos:
1. **Busca**: Filtros por modalidade, cidade, horário
2. **Agendamento**: Aulas já agendadas para testar
3. **Histórico**: Aulas concluídas com avaliações
4. **Mensagens**: Conversas com professores

### 🚀 Como Testar na Interface

1. **Login como Professor**:
   - Use qualquer email dos professores (ex: carlos.silva@email.com)
   - Acesse o dashboard para ver agenda, preços, faturamento

2. **Login como Aluno**:
   - Use qualquer email dos alunos (ex: maria.fernanda@email.com)
   - Teste busca, agendamento, histórico

3. **Busca Pública**:
   - Teste filtros por cidade (São Paulo)
   - Teste filtros por modalidade
   - Veja horários disponíveis

### 📊 Dados Estatísticos Disponíveis

- **124 avaliações** para Carlos Silva (4.8 estrelas)
- **98 avaliações** para Ana Santos (4.9 estrelas)
- **Transações** em diferentes status (pago, pendente, cancelado)
- **Agendamentos** distribuídos ao longo da semana
- **Mensagens** entre alunos e professores

### 🔍 Consultas Úteis para Debug

```sql
-- Ver todos os professores e suas especialidades
SELECT p.full_name, s.name as specialty
FROM profiles p
JOIN trainers t ON p.id = t.profile_id
JOIN trainer_specialties ts ON t.id = ts.trainer_id
JOIN specialties s ON ts.specialty_id = s.id;

-- Ver agenda completa de um professor
SELECT p.full_name, sch.day_of_week, sch.start_time, sch.end_time, sch.is_available
FROM profiles p
JOIN trainers t ON p.id = t.profile_id
JOIN schedules sch ON t.id = sch.trainer_id
WHERE p.full_name = 'Carlos Silva'
ORDER BY sch.day_of_week, sch.start_time;

-- Ver agendamentos por status
SELECT b.status, COUNT(*) as total
FROM bookings b
GROUP BY b.status;
```

Esta estrutura permite testar completamente todas as funcionalidades da plataforma FitConnect!