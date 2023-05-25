import { privateKeyToAccount } from "viem/accounts"
import { prepareMessage, verifyJwtToken, verifyMessageAndGenerateJWT } from "../src"
import { Blockchain } from "../src/types"
import * as aptos from "aptos"
import { config } from "dotenv"
import nacl from "tweetnacl"
import base58 from "bs58"
import assert from "assert"
config()

describe("test", async () => {
    it("tests full flow with ethereum", async () => {
        const message = prepareMessage({
            domain: "fetcch.xyz",
            address: "0x1DCcc9baF7E8d7A18f948acD467CE016044fC546",
            blockchain: Blockchain.APTOS,
            message: "dasdasihfaf\nfaskfaskfnas",
            uri: "https://fetcch.xyz",
            version: '1',
            blockchainId: '1'
        })

        const wallet = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)

        const signature = await wallet.signMessage({
            message: message
        })

        const verified = await verifyMessageAndGenerateJWT(message, signature, "TEST_SECRET", "30m")

        console.log(verified)

        assert(await verifyJwtToken(verified.accessToken, "TEST_SECRET"))
    })

    it("tests full flow with solana", async () => {
        const message = prepareMessage({
            domain: "fetcch.xyz",
            address: "EFJNBxptdfJaxiUmFs9y5fTYPCEGtJMhyXtc1FkxZLJh",
            blockchain: Blockchain.SOLANA,
            message: "dasdasihfaf\nfaskfaskfnas",
            uri: "https://fetcch.xyz",
            version: '1',
            blockchainId: '1'
        })

        const signature = base58.encode(nacl.sign.detached(Buffer.from(message), base58.decode(process.env.SOLANA_PRIVATE_KEY as string)))

        const verified = await verifyMessageAndGenerateJWT(message, signature, "TEST_SECRET", "30m")

        console.log(verified)

        assert(await verifyJwtToken(verified.accessToken, "TEST_SECRET"))
    })

    it("tests full flow with aptos", async () => {
        const message = prepareMessage({
            domain: "fetcch.xyz",
            address: "0xdb0b609fba81340e68e5b36dfa1c7c42c7b865940b082981736a1fcbd9486a65", // public key
            blockchain: Blockchain.APTOS,
            message: "dasdasihfaf\nfaskfaskfnas",
            uri: "https://fetcch.xyz",
            version: '1',
            blockchainId: 'mainnet'
        })
        
        const wallet = new aptos.AptosAccount(aptos.HexString.ensure(process.env.APTOS_PRIVATE_KEY as string).toUint8Array())
        const signature = wallet.signBuffer(Buffer.from(message)).toString()

        console.log(signature)

        const verified = await verifyMessageAndGenerateJWT(message, signature, "TEST_SECRET", "30m")

        console.log(verified)

        assert(await verifyJwtToken(verified.accessToken, "TEST_SECRET"))
    })
})