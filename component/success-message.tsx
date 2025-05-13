"use client"

import { Button } from "@/components/ui/button"
import { Check, ExternalLink } from "lucide-react"

interface SuccessMessageProps {
  txId: string
  onCreateAnother: () => void
}

export function SuccessMessage({ txId, onCreateAnother }: SuccessMessageProps) {
  return (
    <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg">
      <div className="text-center space-y-6">
        <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
          <Check className="size-10 text-green-500" />
        </div>

        <h2 className="text-3xl font-bold">NFT Minted Successfully!</h2>

        <p className="text-gray-300">Your creative work has been successfully minted on the Solana blockchain.</p>

        <div className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-sm text-gray-400">Transaction ID</p>
            <p className="font-mono">{txId}</p>
          </div>

          <a
            href={`https://explorer.solana.com/tx/${txId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition"
          >
            View on Explorer
            <ExternalLink className="size-4" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={onCreateAnother}
            className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 transition-all duration-300"
          >
            Create Another NFT
          </Button>

          <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800">
            View My Collection
          </Button>
        </div>
      </div>
    </div>
  )
}
