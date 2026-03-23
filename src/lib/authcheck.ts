import { supabase } from "./supabase";

export const requireAuth = async (router: any, redirectPath?: string) => {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    router.push("/login");
    return false;
  }

  return true;
};