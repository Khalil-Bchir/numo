import { PrismaClient } from '@numo/database';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@numo/types';

export type AbstractServiceOptions = {
  prisma: PrismaClient;
};

export type AuthenticationServiceOptions = AbstractServiceOptions & {
  supabase: SupabaseClient<Database>;
  emailRedirectTo?: string;
  resetRedirectTo?: string;
  oauthRedirectTo?: string;
};