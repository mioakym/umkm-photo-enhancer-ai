"use client";
import { ArrowRight, Wand, Spotlight, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function LandingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(( { data }) => {
      setIsLoggedIn(!!data.session)
    })
  })

  const handleButton = () => {
    if (isLoggedIn) {
      router.push('/upscale')
    } else {
      router.push('/login')
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Tingkatkan Kualitas Foto Produk UMKM Anda
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            UMKM Photo Enhancer AI membantu meningkatkan kualitas foto produk
            agar terlihat lebih profesional dan siap menaikkan nilai jual.
          </p>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            onClick={handleButton}
          >
            Mulai Sekarang <ArrowRight size={18} />
          </button>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-6 h-24 w-24 bg-blue-100 rounded-2xl blur-2xl" />
          <div className="absolute -bottom-8 -right-4 h-20 w-20 bg-blue-200 rounded-full blur-xl" />

          <div className="bg-gray-100 rounded-2xl shadow-lg p-3 relative z-10">
            <div className="relative w-full h-80 md:h-[450px]">
              <Image
                src="/landingpage.jpg"
                alt="example product"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-sm border rounded-2xl p-6 text-center">
            <Wand className="mx-auto text-blue-600 mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Enhance Otomatis</h3>
            <p className="text-gray-600 text-sm">
              Foto diproses otomatis untuk menghasilkan kualitas premium.
            </p>
          </div>

          <div className="bg-white shadow-sm border rounded-2xl p-6 text-center">
            <Spotlight className="mx-auto text-blue-600 mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Optimasi Cahaya</h3>
            <p className="text-gray-600 text-sm">
              Warna dan pencahayaan diperbaiki agar produk terlihat lebih menarik.
            </p>
          </div>

          <div className="bg-white shadow-sm border rounded-2xl p-6 text-center">
            <Upload className="mx-auto text-blue-600 mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Siap Upload Marketplace</h3>
            <p className="text-gray-600 text-sm">
              Hasil foto langsung siap dipakai untuk marketplace & sosial media.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 mt-10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Buat Foto Produk Anda Terlihat Lebih Profesional
          </h2>
          <p className="text-gray-600 mb-8">
            Cukup upload foto → AI kami akan meningkatkan kualitasnya dalam hitungan detik.
          </p>

          <button className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            onClick={handleButton}
          >
            Coba Sekarang <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}
