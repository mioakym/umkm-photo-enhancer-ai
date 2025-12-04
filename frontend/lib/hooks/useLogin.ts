'use client'

import { useState } from 'react'
import { loginAction } from '@/lib/actions/auth'
import { LoginFormData, loginSchema } from '@/lib/validations/login.schema'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({})

  async function login(form: LoginFormData) {
    setIsLoading(true)
    setError(null)
    setFieldErrors({})

    const result = loginSchema.safeParse(form)
    if (!result.success) {
      const zodErrors: any = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0]
        zodErrors[field] = issue.message
      })
      setFieldErrors(zodErrors)
      setIsLoading(false)
      return { success: false }
    }

    const res = await loginAction(form.email, form.password)

    if (!res.success) {
      setError(res.message!)
    }

    setIsLoading(false)
    return res
  }

  return { login, isLoading, error, fieldErrors }
}
