import { createClient } from "@supabase/supabase-js";

const customFetch: typeof fetch = (input, init?) => {
  const customInit: RequestInit = {
    ...init,
    cache: "no-store", // Add cache control here
  };
  return fetch(input, customInit);
};

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseCacheFreeClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: { fetch: customFetch },
  }
);
