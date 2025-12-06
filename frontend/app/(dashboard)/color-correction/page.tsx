"use client"

import Image from "next/image"
import { Upload, Image as ImageIcon, Download, Loader2, X } from "lucide-react"
import { useColorCorrection } from "@/lib/hooks/useColorCorrection"

export default function ColorCorrectionPage() {
  const {
    selectedFile,
    previewUrl,
    colorCorrectionUrl,
    loading,
    model,
    error,
    fileInputRef,
    handleFileSelect,
    handleColorCorrection,
    handleDownload,
    handleReset,
    setModel,
  } = useColorCorrection()

  const models = [
    { value: "gray", label: "Grayscale" },
    { value: "clahe", label: "CLAHE" },
    { value: "all", label: "All Enhancement" },
    { value: "retinex", label: "Retinex" },
  ]

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Correction</h1>
        <p className="text-gray-600">
          Tingkatkan kualitas warna dan kontras gambar dengan teknologi AI
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
          {/* Model Selection */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Pilih Model Color Correction
            </label>
            <div className="grid grid-cols-4 gap-3">
              {models.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setModel(item.value)}
                  className={`px-4 py-3 rounded-lg font-medium transition ${
                    model === item.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preview & Result */}
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

            {/* Color Corrected */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Color Corrected
                </h3>

                {colorCorrectionUrl && (
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
                ) : colorCorrectionUrl ? (
                  <Image
                    src={colorCorrectionUrl}
                    alt="Color Corrected"
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
              onClick={handleColorCorrection}
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
                  Apply Color Correction
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