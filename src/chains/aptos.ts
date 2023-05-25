import nacl from "tweetnacl"

export const verifyAptosSignature = (signature: string, message: string, address: string) => {
    try {
        const signatureU8 = Buffer.from(signature.slice(2), 'hex');
        
        const messageU8 = Buffer.from(message);
        const pubKeyU8 = Buffer.from(address.slice(2), 'hex');

        if (nacl.sign.detached.verify(messageU8, signatureU8, pubKeyU8)) return true;
    
        return false
    } catch (e) {
        return false
    }
}