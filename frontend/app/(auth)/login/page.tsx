'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, KeySquare, AlertCircle } from 'lucide-react'
import { useLogin } from '@/lib/hooks/useLogin'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error, fieldErrors } = useLogin()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async () => {
    const res = await login(form)
    if (res.success) {
      alert('Login berhasil 🎉')
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <KeySquare className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
          <p className="text-gray-600">Masuk ke akun UMKM Photo Enhancer Anda</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-5">
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="nama@email.com"
                  disabled={isLoading}
                />
              </div>
              {fieldErrors.email && <p className="text-sm text-red-600">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border ${
                    fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  placeholder="Masukkan password"
                  disabled={isLoading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-sm text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg"
            >
              {isLoading ? 'Memproses…' : 'Masuk'}
            </button>


            {/* Link to Register */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Belum punya akun?{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Masuk di sini
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
