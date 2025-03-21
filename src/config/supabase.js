import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://plivrunhyvkrljyuhkbk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsaXZydW5oeXZrcmxqeXVoa2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NTgwNDksImV4cCI6MjA1NzQzNDA0OX0.jhqcsddcNPUtj--M8HKUrIfzSoasLSU4HzCIPXPK7mg';

export const supabase = createClient(supabaseUrl, supabaseKey);
