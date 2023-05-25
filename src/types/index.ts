export enum Blockchain {
    ETHEREUM = "ETHEREUM",
    SOLANA = "SOLANA",
    APTOS = "APTOS"
}

export const stringToBlockchain = (string_: string) => {
    if(string_ === "ETHEREUM") return Blockchain.ETHEREUM
    else if (string_ === "SOLANA") return Blockchain.SOLANA
    else if (string_ === "APTOS") return Blockchain.APTOS

    throw new Error("blockchain invalid")
}

export interface PrepareMessage {
    domain: string, 
    address: string, 
    blockchain: Blockchain, 
    message: string, 
    uri: string, 
    version: string, 
    blockchainId: number | string, 
    issuedAt?: Date
}