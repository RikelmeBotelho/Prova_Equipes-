import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase
const supabaseUrl = 'https://hgaosftvcdcovrpxlwrb.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnYW9zZnR2Y2Rjb3ZycHhsd3JiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzU2MjE5MSwiZXhwIjoyMDU5MTM4MTkxfQ.YwmIR_3RyglOj4GTCTM0sCqu4y-XYBok4NHK1gavrEI';

// Criação do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabase;
