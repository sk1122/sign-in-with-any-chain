import { Blockchain } from "../types";
import { verifyAptosSignature } from "./aptos";
import { verifyEthereumSignature } from "./ethereum";
import { verifySolanaSignature } from "./solana";

export const verifySignature = (address: string, message: string, signature: string, blockchain: Blockchain) => {
    if(blockchain === Blockchain.ETHEREUM) return verifyEthereumSignature(signature, message, address)
    else if (blockchain === Blockchain.APTOS) return verifyAptosSignature(signature, message, address)
    else if (blockchain === Blockchain.SOLANA) return verifySolanaSignature(signature, message, address)

    throw new Error("invalid blockchain")
}