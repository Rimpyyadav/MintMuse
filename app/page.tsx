"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/component/navbar"
import { ContentUploader } from "@/component/content-uploader"
import { ContentPreview } from "@/component/content-preview"
import { SuccessMessage } from "@/component/success-message"
import { Sparkles } from "lucide-react"

export default function Home() {
  const { toasty } = toast()
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [nftName, setNftName] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [contentType, setContentType] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string>("")
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [mintTxId, setMintTxId] = useState("")

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setWalletConnected(true)
    setWalletAddress("8xH5f...3kPq")
    toasty({
      title: "Wallet Connected",
      description: "Your Solana wallet has been connected successfully.",
    })
  }

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile)

    // Determine file type
    const fileExtension = uploadedFile.name.split(".").pop()?.toLowerCase() || ""

    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      setFileType("image")
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(uploadedFile)
    } else if (["mp3", "wav"].includes(fileExtension)) {
      setFileType("audio")
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(uploadedFile)
    } else if (["txt", "md"].includes(fileExtension)) {
      setFileType("text")
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setFilePreview(e.target.result as string)
        }
      }
      reader.readAsText(uploadedFile)
    } else if (["pdf", "zip"].includes(fileExtension)) {
      setFileType("binary")
      setFilePreview(URL.createObjectURL(uploadedFile))
    } else {
      setFileType("other")
      setFilePreview(null)
    }

    // Auto-select content type based on file extension
    if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      setContentType("art")
    } else if (["mp3", "wav"].includes(fileExtension)) {
      setContentType("song")
    } else if (["txt", "md"].includes(fileExtension)) {
      setContentType("poetry")
    } else if (["js", "ts", "py", "java", "c", "cpp", "html", "css"].includes(fileExtension)) {
      setContentType("code")
    }
  }

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      toasty({
        title: "File Required",
        description: "Please upload a file for your NFT.",
        variant: "destructive",
      })
      return
    }

    if (!nftName) {
      toasty({
        title: "Name Required",
        description: "Please provide a name for your NFT.",
        variant: "destructive",
      })
      return
    }

    if (!contentType) {
      toasty({
        title: "Content Type Required",
        description: "Please select a content type for your NFT.",
        variant: "destructive",
      })
      return
    }

    // Simulate minting process
    setIsMinting(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsMinting(false)
    setMintSuccess(true)
    setMintTxId("4xZkT...7mNp")

    toasty({
      title: "NFT Minted Successfully!",
      description: "Your creative work has been minted on the Solana blockchain.",
    })
  }

  const resetForm = () => {
    setNftName("")
    setNftDescription("")
    setContentType("")
    setFile(null)
    setFilePreview(null)
    setFileType("")
    setMintSuccess(false)
    setMintTxId("")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar connected={walletConnected} address={walletAddress} onConnect={handleConnectWallet} />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
            Mint Your Creative Work as an NFT
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Music, poetry, code, or digital art — own it on the blockchain
          </p>
        </section>

        {mintSuccess ? (
          <SuccessMessage txId={mintTxId} onCreateAnother={resetForm} />
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Upload and Preview */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Upload & Preview</h2>
              <ContentUploader onFileUpload={handleFileUpload} />

              {filePreview && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Preview</h3>
                  <ContentPreview fileType={fileType} filePreview={filePreview} fileName={file?.name || ""} />
                </div>
              )}
            </div>

            {/* Right Column - NFT Details Form */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">NFT Details</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg">
                <form onSubmit={handleMint} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="nft-name" className="block text-sm font-medium">
                      NFT Name
                    </label>
                    <Input
                      id="nft-name"
                      placeholder="Enter a name for your NFT"
                      value={nftName}
                      onChange={(e) => setNftName(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="nft-description" className="block text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      id="nft-description"
                      placeholder="Describe your creative work (optional)"
                      value={nftDescription}
                      onChange={(e) => setNftDescription(e.target.value)}
                      className="bg-gray-800 border-gray-700 min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="content-type" className="block text-sm font-medium">
                      Content Type
                    </label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="song">Song</SelectItem>
                        <SelectItem value="poetry">Poetry</SelectItem>
                        <SelectItem value="code">Code</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {walletConnected && (
                    <div className="py-2 px-4 bg-gray-800 rounded-lg flex items-center gap-2 text-sm">
                      <div className="size-2 rounded-full bg-green-500"></div>
                      <span>Connected: {walletAddress}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full py-6 text-lg bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 transition-all duration-300"
                    disabled={!walletConnected || isMinting}
                  >
                    {isMinting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Minting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="size-5" />
                        Mint NFT
                      </span>
                    )}
                  </Button>

                  {!walletConnected && (
                    <p className="text-sm text-center text-gray-400">Connect your wallet to mint an NFT</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 border-t border-gray-800 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">© 2025 SolCreative. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-violet-500 transition">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-500 transition">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-500 transition">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
