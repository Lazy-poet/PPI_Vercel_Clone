import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zkfqakvzqywbqfuvgyzt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprZnFha3Z6cXl3YnFmdXZneXp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NjQwNTY3NiwiZXhwIjoxOTkxOTgxNjc2fQ.SdNgoz4svHBYGfaz-Avvkem51UDqtn7ZdI72xyAE3V8"
);

export default supabase;
