import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
import type { AuthUser } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error('Account services are not configured. Set the Supabase URL and anon key, then restart the app.');
  }
  return supabase;
};

export const toAuthUser = (user: User): AuthUser => {
  const name = typeof user.user_metadata.full_name === 'string'
    ? user.user_metadata.full_name
    : user.email?.split('@')[0] || 'Customer';
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const isAdmin = user.app_metadata.role === 'admin';

  return {
    id: user.id,
    name,
    email: user.email || '',
    role: isAdmin ? 'Administrator' : 'Verified Client',
    isAdmin,
    avatarInitials: initials || 'AN',
    joinedDate: new Date(user.created_at).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric'
    }),
    country: typeof user.user_metadata.country === 'string'
      ? user.user_metadata.country
      : undefined
  };
};
