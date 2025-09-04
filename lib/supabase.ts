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
}