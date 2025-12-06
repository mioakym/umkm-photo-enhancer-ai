"use client"

import { useState, useRef } from "react"

export function useRemovebg() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [removedUrl, setRemovedUrl] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [removed, setRemoved] = useState<string>("1")
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
    setRemovedUrl("")
    setError("")
  }

  const handleRemovebg = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch(`/api/removebg/${removed}`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const blob = await response.blob()
      setRemovedUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!removedUrl) return

    const a = document.createElement("a")
    a.href = removedUrl
    a.download = `removedbg_${removed}"}`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    setRemovedUrl("")
    setError("")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return {
    selectedFile,
    previewUrl,
    removedUrl,
    loading,
    removed,
    error,
    fileInputRef,

    handleFileSelect,
    handleRemovebg,
    handleDownload,
    handleReset,
    setRemoved,
  }
}