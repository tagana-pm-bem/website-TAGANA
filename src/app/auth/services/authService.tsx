import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  fullName: string;
}

export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  role: string;
  created_at?: string;
}

export const authService = {
   login: async ({ username, password }: LoginPayload) => {
    try {
      const emailDummy = `${username}@sriharjo.com`;
      console.log("Login dengan:", emailDummy);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailDummy,
        password: password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error dari Supabase:", error);
      throw error;
    }
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data as UserProfile;
  },

  getAllAdmins: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as UserProfile[];
  },

  deleteAdmin: async (userId: string) => {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) throw error;
    return true;
  },

  registerAdmin: async ({ username, password, fullName }: RegisterPayload) => {
    const tempSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        auth: {
          persistSession: false, 
          autoRefreshToken: false,
        },
      }
    );

    const email = `${username}@sriharjo.com`;

    const { data, error } = await tempSupabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          role: "admin", 
        },
      },
    });

    if (error) throw error;
    return data;
  },
};