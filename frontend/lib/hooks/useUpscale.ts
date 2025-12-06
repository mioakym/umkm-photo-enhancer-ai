"use client"

import { useState, useRef } from "react"

export function useUpscale() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [upscaledUrl, setUpscaledUrl] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [scale, setScale] = useState<string>("2")
  const [error, setError] = useState<string>("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran file maksimal 10MB")
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setUpscaledUrl("")
    setError("")
  }

  const handleUpscale = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch(`/api/upscale/${scale}`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const blob = await response.blob()
      setUpscaledUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!upscaledUrl) return

    const a = document.createElement("a")
    a.href = upscaledUrl
    a.download = `upscaled_${scale}x_${selectedFile?.name || "image"}`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    setUpscaledUrl("")
    setError("")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return {
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
  }
}
