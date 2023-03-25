import { createClient } from "@supabase/supabase-js";
const URL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_KEY as string;
export const supabase = createClient(URL, KEY);
