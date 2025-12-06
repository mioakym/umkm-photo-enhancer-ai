"use client"

import Image from "next/image"
import { Upload, Image as ImageIcon, Download, Loader2, X } from "lucide-react"
import { useUpscale } from "@/lib/hooks/useUpscale"

export default function UpscalePage() {
  const {
    selectedFile,
    previewUrl,
    upscaledUrl,
    loading,
    scale,
    error,
    fileInputRef,
    handleFileSelect,
    handleUpscale,
    handleDownload,
    handleReset,
    setScale,
  } = useUpscale()

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Upscale</h1>
        <p className="text-gray-600">
          Tingkatkan resolusi gambar hingga 8x dengan teknologi AI
        </p>
      </div>

      {/* Upload Area */}
      {!selectedFile ? (
        <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 p-12">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="text-blue-600" size={32} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Gambar
            </h3>
            <p className="text-gray-500 mb-6">
              PNG, JPG, atau WEBP (Max. 10MB)
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />

            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition"
            >
              <ImageIcon size={20} />
              Pilih Gambar
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Scale Selection */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Pilih Tingkat Upscale
            </label>
            <div className="grid grid-cols-4 gap-3">
              {["2", "4", "6", "8"].map((value) => (
                <button
                  key={value}
                  onClick={() => setScale(value)}
                  className={`px-4 py-3 rounded-lg font-medium transition ${
                    scale === value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {value}x
                </button>
              ))}
            </div>
          </div>

          {/* Preview & Upscaled */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Original</h3>
                <button
                  onClick={handleReset}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={previewUrl}
                  alt="Original"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Upscaled */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Upscaled {scale}x
                </h3>

                {upscaledUrl && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Download size={18} />
                    Download
                  </button>
                )}
              </div>

              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                  </div>
                ) : upscaledUrl ? (
                  <Image
                    src={upscaledUrl}
                    alt="Upscaled"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Hasil akan muncul di sini</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Action */}
          <div className="flex gap-3">
            <button
              onClick={handleUpscale}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upscale Gambar
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
