import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Task {
  id: string;
  text: string;
  is_important: boolean;
  is_urgent: boolean;
  is_high_impact: boolean;
  status: 'active' | 'waiting' | 'completed' | 'deferred';
  priority_order: number;
  created_at: string;
  completed_at: string | null;
}
