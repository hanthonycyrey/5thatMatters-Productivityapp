/*
  # Create Tasks Table for "The 5 That Matter"

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key) - Unique task identifier
      - `text` (text) - The task description
      - `is_important` (boolean) - Eisenhower Matrix: Important dimension
      - `is_urgent` (boolean) - Eisenhower Matrix: Urgent dimension
      - `is_high_impact` (boolean) - 80/20 rule flag for result-driving tasks
      - `status` (text) - Task state: 'active', 'waiting', 'completed', 'deferred'
      - `priority_order` (integer) - Sort order within active tasks (lower = higher priority)
      - `created_at` (timestamptz) - Task creation timestamp
      - `completed_at` (timestamptz) - Task completion timestamp
  
  2. Security
    - Enable RLS on `tasks` table
    - Public access for demo purposes (single-user app)
    
  3. Notes
    - Active tasks are hard-capped at 5 through application logic
    - Only Important tasks can be active
    - The Frog is always priority_order = 1 within active tasks
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  is_important boolean NOT NULL DEFAULT false,
  is_urgent boolean NOT NULL DEFAULT false,
  is_high_impact boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'waiting',
  priority_order integer DEFAULT 999,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for demo"
  ON tasks
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);