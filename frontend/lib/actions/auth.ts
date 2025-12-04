'use server'

import { createClient } from "../supabase/server"

export async function loginAction(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, user: data.user }
}

export async function registerAction(email: string, username: string, password: string) {
  const supabase = await createClient();

  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      }
    }
  })

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, user: data.user }
}