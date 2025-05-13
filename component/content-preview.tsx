"use client"

import { useState } from "react"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContentPreviewProps {
  fileType: string
  filePreview: string
  fileName: string
}

export function ContentPreview({ fileType, filePreview, fileName }: ContentPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const renderPreview = () => {
    switch (fileType) {
      case "image":
        return (
          <div className="flex items-center justify-center bg-gray-900 rounded-xl overflow-hidden border border-gray-800 p-4">
            <img
              src={filePreview || "/placeholder.svg"}
              alt="NFT Preview"
              className="max-h-[300px] max-w-full object-contain rounded-lg shadow-lg"
            />
          </div>
        )

      case "audio":
        return (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                <Music className="size-8 text-white" />
              </div>
              <div>
                <h4 className="font-medium">{fileName}</h4>
                <p className="text-sm text-gray-400">Audio File</p>
              </div>
            </div>
            <audio
              src={filePreview}
              controls
              className="w-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        )

      case "text":
        return (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                <FileText className="size-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium">{fileName}</h4>
                <p className="text-sm text-gray-400">Text File</p>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg max-h-[200px] overflow-auto font-mono text-sm">
              {filePreview.length > 500 ? filePreview.substring(0, 500) + "..." : filePreview}
            </div>
          </div>
        )

      case "binary":
        return (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                  <FileIcon fileName={fileName} />
                </div>
                <div>
                  <h4 className="font-medium">{fileName}</h4>
                  <p className="text-sm text-gray-400">{fileName.endsWith(".pdf") ? "PDF Document" : "Archive File"}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => window.open(filePreview, "_blank")}
              >
                <Download className="size-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 text-center">
            <p>Preview not available for this file type</p>
          </div>
        )
    }
  }

  return <div className="animate-fadeIn">{renderPreview()}</div>
}

function FileIcon({ fileName }: { fileName: string }) {
  if (fileName.endsWith(".pdf")) {
    return <FileText className="size-6 text-white" />
  } else if (fileName.endsWith(".zip")) {
    return <Archive className="size-6 text-white" />
  } else {
    return <File className="size-6 text-white" />
  }
}

function Music(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function Archive(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <rect width="8" height="4" x="8" y="8" rx="1" />
      <path d="M12 16v-4" />
    </svg>
  )
}

function File(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
