import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fvbokfobbshysuxguoix.supabase.co";
const supabaseAnonKey = "sb_publishable_tumYBLBIuLiu61snGJrsrQ_sRhlkHjr"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);