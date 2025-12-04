import { z } from "zod"

export const registerSchema = z.object({
    email: z
    .string()
    .min(1, 'Email tidak boleh kosong')
    .email('Format email tidak valid'),
    username: z
    .string()
    .min(4, 'Username minimal 4 karakter')
    .max(15, 'Username maksimal 15 karakter'),
    password: z
    .string()
    .min(6, 'Password minimal 6 karakter')
    .max(20, 'Password maksimal 20 karakter')
})

export type RegisterFormData = z.infer<typeof registerSchema>