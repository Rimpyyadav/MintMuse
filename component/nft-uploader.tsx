"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"

interface NFTUploaderProps {
  imagePreview: string | null
  onImageUpload: (file: File) => void
}

export function NFTUploader({ imagePreview, onImageUpload }: NFTUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card
      className={`p-6 flex flex-col items-center justify-center h-[400px] cursor-pointer transition-all duration-200 border-2 ${
        isDragging
          ? "border-purple-500 bg-gray-900/50"
          : imagePreview
            ? "border-gray-700 bg-gray-900"
            : "border-dashed border-gray-700 bg-gray-900"
      }`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      {imagePreview ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={imagePreview || "/placeholder.svg"}
            alt="NFT Preview"
            className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-200 rounded-lg">
            <p className="text-white font-medium">Click to change image</p>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="size-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto">
            <Upload className="size-8 text-gray-400" />
          </div>
          <div className="space-y-2">
            <p className="font-medium text-lg">Upload NFT Image</p>
            <p className="text-sm text-gray-400">Drag and drop or click to browse</p>
            <p className="text-xs text-gray-500">Supports JPG, PNG, GIF (Max 10MB)</p>
          </div>
        </div>
      )}
    </Card>
  )
}
