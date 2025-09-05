import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WaitlistEntry = {
  id?: number
  first_name: string
  last_name: string
  email: string
  description: string
  content_creator: boolean
  heard_about: string | null
  other_source: string | null
  created_at?: string
  // Progressive form fields for creators
  social_handle_instagram?: string | null
  social_handle_tiktok?: string | null
  social_handle_twitter?: string | null
  social_handle_youtube?: string | null
  follower_count_range?: string | null
  content_niche?: string | null
  collaboration_interests?: string | null
  form_completed?: boolean
}