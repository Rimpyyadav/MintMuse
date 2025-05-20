"use client"

import type React from "react"
import { NFTUploader } from "./nft-uploader"

import { useState, useRef } from "react"
import { Upload, FileText, Music, Code, ImageIcon } from "lucide-react"

interface ContentUploaderProps {
  onFileUpload: (file: File) => void
}

export function ContentUploader({ onFileUpload }: ContentUploaderProps) {
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
      onFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`p-8 flex flex-col items-center justify-center h-[300px] cursor-pointer transition-all duration-200 border-2 rounded-xl ${
        isDragging
          ? "border-violet-500 bg-violet-500/10"
          : "border-dashed border-gray-700 bg-gray-900 hover:bg-gray-900/70"
      }`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".mp3,.txt,.pdf,.zip,.png,.jpg,.jpeg,.gif,.wav,.md"
        className="hidden"
      />

      <div className="text-center space-y-6">
        <div className="size-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto">
          <Upload className="size-8 text-gray-400" />
        </div>
        <div className="space-y-2">
          <p className="font-medium text-lg">Upload Your Creative Work</p>
          <p className="text-sm text-gray-400">Drag and drop or click to browse</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <div className="flex items-center gap-1 text-xs bg-gray-800 px-2 py-1 rounded-full">
              <ImageIcon className="size-3" /> Images
            </div>
            <div className="flex items-center gap-1 text-xs bg-gray-800 px-2 py-1 rounded-full">
              <Music className="size-3" /> Audio
            </div>
            <div className="flex items-center gap-1 text-xs bg-gray-800 px-2 py-1 rounded-full">
              <FileText className="size-3" /> Text
            </div>
            <div className="flex items-center gap-1 text-xs bg-gray-800 px-2 py-1 rounded-full">
              <Code className="size-3" /> Code
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
