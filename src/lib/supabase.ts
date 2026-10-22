
import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
import type { AuthUser } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Supports either a modern publishable key or a legacy anon key.
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export const getSupabaseClient = () => {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and your publishable or anon key in .env.local, then restart Next.js.'
    );
  }

  return supabase;
};

export const toAuthUser = (user: User): AuthUser => {
  const name =
    typeof user.user_metadata.full_name === 'string'
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
      year: 'numeric',
    }),
    country:
      typeof user.user_metadata.country === 'string'
        ? user.user_metadata.country
        : undefined,
  };
};