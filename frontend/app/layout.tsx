import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FotoKu - AI Photo Enhancement untuk UMKM",
  description: "Platform AI untuk meningkatkan kualitas foto produk UMKM. Upscale resolusi, hapus background, dan koreksi warna secara otomatis dalam hitungan detik.",
  keywords: ["AI photo enhancement", "UMKM", "upscale foto", "remove background", "color correction", "foto produk"],
  authors: [{ name: "FotoKu Team" }],
  creator: "FotoKu",
  publisher: "FotoKu",
  robots: "index, follow",
  openGraph: {
    title: "FotoKu - AI Photo Enhancement untuk UMKM",
    description: "Tingkatkan kualitas foto produk UMKM dengan AI. Gratis dan mudah digunakan.",
    type: "website",
    locale: "id_ID",
    siteName: "FotoKu",
  },
  twitter: {
    card: "summary_large_image",
    title: "FotoKu - AI Photo Enhancement untuk UMKM",
    description: "Tingkatkan kualitas foto produk UMKM dengan AI",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}