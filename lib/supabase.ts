import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pifckmvbmkhjoktrxcam.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpZmNrbXZibWtoam9rdHJ4Y2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MTY3MzgsImV4cCI6MjEwMDk5MjczOH0.GUGPQKwW2VchMaozMdlcoKCHJEkw2HrXFm52eQmdeZY";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);