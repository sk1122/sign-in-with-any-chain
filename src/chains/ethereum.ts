import { getAddress, verifyMessage } from "viem"

export const verifyEthereumSignature = (signature: string, message: string, address: string) => {    
    return verifyMessage({
        address: address as `0x${string}`,
        message,
        signature: signature as `0x${string}`
    })
}