"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Sparkles } from "lucide-react"

interface NavbarProps {
  connected: boolean
  address: string
  onConnect: () => void
}

export function Navbar({ connected, address, onConnect }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-gray-950/80 border-b border-gray-800">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 flex items-center justify-center">
            <Sparkles className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
            MintMuse
          </span>
        </div>

        {connected ? (
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
            <div className="size-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">{address}</span>
          </div>
        ) : (
          <Button
            onClick={onConnect}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded-full px-6 transition-all duration-300"
          >
            <Wallet className="mr-2 size-4" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  )
}
