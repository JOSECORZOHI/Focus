/*
  # Create tasks table for FocusFlow

  ## Overview
  This migration creates the core tasks table for the FocusFlow task management application.
  The table stores user tasks with their title, description, and completion status.

  ## New Tables
  
  ### `tasks`
  - `id` (uuid, primary key) - Unique identifier for each task
  - `titulo` (text, required) - Task title/name
  - `descripcion` (text, optional) - Detailed description of the task
  - `estado` (text, required) - Task status: 'pendiente' or 'completada'
  - `created_at` (timestamptz) - Timestamp when task was created
  - `user_id` (uuid, required) - Reference to the user who owns the task

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the tasks table
  - Users can only view their own tasks
  - Users can only insert tasks for themselves
  - Users can only update their own tasks
  - Users can only delete their own tasks

  ## Notes
  - All tasks require authentication
  - The estado field is restricted to 'pendiente' or 'completada' values
  - Default estado is 'pendiente' for new tasks
*/

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descripcion text DEFAULT '',
  estado text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completada')),
  created_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own tasks
CREATE POLICY "Users can view own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own tasks
CREATE POLICY "Users can insert own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own tasks
CREATE POLICY "Users can update own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own tasks
CREATE POLICY "Users can delete own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_created_at_idx ON tasks(created_at DESC);