'use client'

import { useState, useRef } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'

type ImageUploadProps = {
  onUpload: (url: string) => void
  currentImage?: string
  folder?: string
  className?: string
}

export default function ImageUpload({ onUpload, currentImage, folder = 'uploads', className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || '')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setPreview(data.url)
      onUpload(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removeImage = () => {
    setPreview('')
    onUpload('')
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl
          p-6 cursor-pointer transition-colors
          ${uploading ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30'}
        `}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin h-8 w-8 border-3 border-indigo-600 border-t-transparent rounded-full" />
            <span className="text-xs text-primary font-medium">Uploading...</span>
          </div>
        ) : preview ? (
          <div className="relative w-full group">
            <ImageIcon className="absolute top-2 left-2 h-4 w-4 text-white/80 drop-shadow" />
            <img
              src={preview}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeImage() }}
              className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Upload className="h-8 w-8" />
            <span className="text-sm font-medium">Click to upload</span>
            <span className="text-xs">JPEG, PNG, WebP up to 5MB</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFile}
          className="hidden"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}