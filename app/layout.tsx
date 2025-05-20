import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'MintMuse',
  description: 'Mint your creative work as NFT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
