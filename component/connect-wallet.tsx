"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

interface ConnectWalletButtonProps {
  connected: boolean
  address: string
  onConnect: () => void
}

export function ConnectWalletButton({ connected, address, onConnect }: ConnectWalletButtonProps) {
  return connected ? (
    <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
      <div className="size-2 rounded-full bg-green-500"></div>
      <span className="text-sm font-medium">{address}</span>
    </div>
  ) : (
    <Button
      onClick={onConnect}
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full px-6"
    >
      <Wallet className="mr-2 size-4" />
      Connect Wallet
    </Button>
  )
}
