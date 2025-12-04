import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_PROJECT_API!,
    process.env.NEXT_PUBLIC_API_KEY!
  )
}