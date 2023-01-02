import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.SUPABASE_URL ?? "",
//   process.env.SUPABASE_ANON_KEY ?? ""
// );

const supabase = createClient(
  "https://rzbhbpskzzutuagptiqq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YmhicHNrenp1dHVhZ3B0aXFxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MjY3NTI0MCwiZXhwIjoxOTg4MjUxMjQwfQ.rZ5h_dZT8Aukw1aM9xpUXbTimz4Mae-ICXXuIWsC8T4"
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YmhicHNrenp1dHVhZ3B0aXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI2NzUyNDAsImV4cCI6MTk4ODI1MTI0MH0.DLHnaBrgCZQqzoQKSZHxuklujyKDMourZCwzlzqaZEk"
);

export default supabase;
