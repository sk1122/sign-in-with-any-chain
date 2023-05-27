import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Login } from '@/components/Login'
import { useEffect, useState } from 'react'
import { prepareMessage, verifyMessageAndGenerateJWT } from "siwac"
import { Blockchain, stringToBlockchain } from 'siwac/dist/types'
import base58 from 'bs58'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [show, setShow] = useState(false)
  const [account, setAccount] = useState<{ address: string, type: string }>()
  const [token, setToken] = useState<{ accessToken: string, expiresIn: string }>()
  const [access, setAccess] = useState(false)

  useEffect(() => console.log(account), [account])

  const sign = async () => {
    if(!account) return

    const message = prepareMessage({
      domain: "fetcch.xyz",
      address: account.address, // public key
      blockchain: stringToBlockchain(account.type),
      message: "yo",
      uri: "https://fetcch.xyz",
      version: '1',
      blockchainId: '1'
    })

    const anyWindow = window as any

    if(account.type === "ETHEREUM") {
      const signature = await anyWindow.ethereum.request({ method: 'personal_sign', params: [message, account.address] })

      const res = await fetch(`/api/generate`, {
        method: "POST",
        body: JSON.stringify({
          message,
          signature
        })
      })

      const token = await res.json()

      setToken(token)
    } else if(account.type === "SOLANA") {
      const anyWindow = window as any

      const solana = anyWindow.solana ?? anyWindow.backpack
      
      const signature = base58.encode(await solana.signMessage(Buffer.from(message)))

      const res = await fetch(`/api/generate`, {
        method: "POST",
        body: JSON.stringify({
          message,
          signature
        })
      })

      const token = await res.json()

      setToken(token)
    } else if (account.type === "APTOS") {
      const anyWindow = window as any

      const signature = await anyWindow.martian.signMessage(message)

      console.log(signature)
      const res = await fetch(`/api/generate`, {
        method: "POST",
        body: JSON.stringify({
          message,
          signature: signature.signature
        })
      })

      const token = await res.json()

      setToken(token)
    }
  }

  const verify = async () => {
    if(!token) return

    const res = await fetch('/api/verify', {
      method: "POST",
      body: JSON.stringify({
        token: token.accessToken
      })
    })

    const data = await res.json()

    setAccess(data.access)
  }
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {!account && <button onClick={() => setShow(true)} className='rounded-xl p-3'>Login</button>}
      {show && <Login setShow={setShow} setAccount={setAccount} />}

      {account && (
        <div className='flex justify-center items-center flex-col space-y-4'>
          <h1>Connected Wallet: <b>{account.address}</b></h1>
          <div onClick={() => sign()} className='p-3 bg-gray-500 rounded-xl cursor-pointer text-center '>
            Verify Yourself
          </div>
        </div>
      )}

      {account && token && (
        <div className='w-1/2 text-center'>
          <p className='w-full truncate'>Access Token: {token.accessToken}</p>
          <p>Expires In: {token.expiresIn}</p>
          <p>Verified: {access ? "✅" : "❌"}</p>
          <div onClick={() => verify()} className='p-3 bg-gray-500 rounded-xl cursor-pointer text-center '>
            Verify Yourself
          </div>
        </div>
      )}
    </main>
  )
}
