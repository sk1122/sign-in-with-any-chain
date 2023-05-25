import { Blockchain, PrepareMessage, stringToBlockchain } from "../types";

export const generateLoginMessage = (domain: string, address: string, blockchain: Blockchain, message: string, uri: string, version: string, blockchainId: number | string, nonce: string) => {
    return `${domain} wants you to sign in with your ${blockchain} account:${address}

${message}

URI: ${uri}
Version: ${version}
Chain: ${blockchain}
Chain ID: ${blockchainId}
Nonce: ${nonce}
Issued At: ${Math.floor(new Date().getTime() / 1000)}`
}

export const unpackMessage = (message: string): PrepareMessage & { nonce: string } => {
    try {
        const newLineSplitted = message.split('\n')

        const firstLineSpaceSplitted = newLineSplitted[0].split(" ")

        let config: PrepareMessage & { nonce: string } = {} as PrepareMessage & { nonce: string }

        config.domain = firstLineSpaceSplitted[0]

        const address = firstLineSpaceSplitted[firstLineSpaceSplitted.length - 1].split(":")
        config.address = address[address.length - 1]

        const index = newLineSplitted.findIndex(x => x.startsWith("URI:"))
        const uriSplitted = newLineSplitted[index].split(" ")
        config.uri = uriSplitted[uriSplitted.length - 1]

        const _message = newLineSplitted.slice(2, index - 1).join("\n")
        config.message = _message

        const versionSplitted = newLineSplitted[index + 1].split(" ")
        config.version = versionSplitted[versionSplitted.length - 1]

        const chainSplitted = newLineSplitted[index + 2].split(" ")
        config.blockchain = stringToBlockchain(chainSplitted[chainSplitted.length - 1])

        const chainIdSplitted = newLineSplitted[index + 3].split(" ")
        config.blockchainId = chainIdSplitted[chainIdSplitted.length - 1]
        
        const nonceSplitted = newLineSplitted[index + 4].split(" ")
        config.nonce = nonceSplitted[nonceSplitted.length - 1]

        const issuedAtSplitted = newLineSplitted[index + 5].split(" ")
        config.issuedAt = new Date(Number(issuedAtSplitted[issuedAtSplitted.length - 1]) * 1000)

        return config
    } catch (e) {
        console.log(e)
        throw new Error("wrong message format")
    }
}