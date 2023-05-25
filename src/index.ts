import { verifySignature } from "./chains";
import { Blockchain, PrepareMessage } from "./types";
import { generateLoginMessage, unpackMessage } from "./utils/message";
import { generateRandomNonce } from "./utils/nonce";

import jwt from "jsonwebtoken"

export const prepareMessage = (config: PrepareMessage) => {
    const nonce = generateRandomNonce()
    const message = generateLoginMessage(config.domain, config.address, config.blockchain, config.message, config.uri, config.version, config.blockchainId, nonce)

    return message
}

export const verifyMessage = async (message: string, signature: string): Promise<boolean> => {
    try {
        const config = unpackMessage(message)
        const valid = verifySignature(config.address, message, signature, config.blockchain)
        
        return valid
    } catch (e) {
        return false
    }
}

export const verifyMessageAndGenerateJWT = async (message: string, signature: string, secret: string, expiresIn: string) => {
    const valid = await verifyMessage(message, signature)

    if(!valid) throw new Error("signature not valid")

    const config = unpackMessage(message)

    const accessToken = jwt.sign({ address: config.address, message, signature: signature, blockchain: config.blockchain, chainId: config.blockchainId }, secret, {
        expiresIn: expiresIn
    })

    return {
        accessToken,
        expiresIn
    }
}

export const verifyJwtToken = (token: string, secret: string) => {
    const payload: any = jwt.verify(token, secret)

    const valid = verifyMessage(payload.message, payload.signature)

    return valid
}