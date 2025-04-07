import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
if (supabaseUrl === 'MISSING_URL') {
  throw new Error('Supabase URL is missing from environment variables');
}

export default supabase;
