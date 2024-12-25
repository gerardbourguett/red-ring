import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://lsbmgjxnaronsbjnyrxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzYm1nanhuYXJvbnNiam55cnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNDkwNjcsImV4cCI6MjAyOTcyNTA2N30.fN-KeGDa--5Nq7DrWIrgOAyFFC39108V6yUTeBpiGVg"
);

export { supabase as s };
