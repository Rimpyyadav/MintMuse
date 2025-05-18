// lib/solana.ts

import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js"
import {
  Metaplex,
  walletAdapterIdentity,
  bundlrStorage
} from "@metaplex-foundation/js"
import { WalletAdapter } from "@solana/wallet-adapter-base"

export async function mintNFTOnSolana(
  metadataUri: string,
  wallet: WalletAdapter
): Promise<string> {
  const connection = new Connection(clusterApiUrl("devnet"))
  const metaplex = Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(bundlrStorage())

  const { nft } = await metaplex.nfts().create({
    uri: metadataUri,
    name: "My Awesome NFT",
    symbol: "COOL",
    sellerFeeBasisPoints: 500
  })

  return nft.address.toString()
}
