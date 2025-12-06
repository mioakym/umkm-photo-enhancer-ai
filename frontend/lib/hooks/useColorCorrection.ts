"use client"

import { useState, useRef } from "react"

export function useColorCorrection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [colorCorrectionUrl, setColorCorrectionUrl] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState<string>("gray")
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
    setColorCorrectionUrl("")
    setError("")
  }

  const handleColorCorrection = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch(`/api/colorcorrection/${model}`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const blob = await response.blob()
      setColorCorrectionUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!colorCorrectionUrl) return

    const a = document.createElement("a")
    a.href = colorCorrectionUrl
    a.download = `colorcorrection_${model}_${selectedFile?.name || "image"}`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    setColorCorrectionUrl("")
    setError("")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return {
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
  }
}
