'use client'

import { useState } from "react"
import { registerAction } from "../actions/auth"
import { RegisterFormData, registerSchema } from "../validations/register.schema"

export function useRegister() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({})

    async function register(form: RegisterFormData) {
        setIsLoading(true)
        setError(null)
        setFieldErrors({})

        const result = registerSchema.safeParse(form)
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

        const res = await registerAction(form.email, form.username, form.password)

        if (!res.success) {
            setError(res.message!)
        }

        setIsLoading(false)
        return res
    }

    return { register, isLoading, error, fieldErrors }
}