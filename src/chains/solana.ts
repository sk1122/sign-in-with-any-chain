import nacl from "tweetnacl"
import base58 from "bs58"

export const verifySolanaSignature = (signature: string, message: string, address: string) => {
    return nacl.sign.detached.verify(Buffer.from(message), base58.decode(signature), base58.decode(address))
}