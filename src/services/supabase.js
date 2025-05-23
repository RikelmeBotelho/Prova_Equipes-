import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase
const supabaseUrl = 'https://wqqkzsjifmacrgunvfvx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcWt6c2ppZm1hY3JndW52ZnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NjExMTYsImV4cCI6MjA1OTEzNzExNn0.Gh2i8P6lbPEup2vw6cmNNAuZj-JbqYqlbk-n_JOrZGo';

// Criação do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
