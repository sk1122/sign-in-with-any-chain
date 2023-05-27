// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyMessageAndGenerateJWT } from 'siwac'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const body = JSON.parse(req.body)
    console.log(body)
    const token = await verifyMessageAndGenerateJWT(body.message, body.signature, "TEST_SECRET", "30m")
    res.status(200).send(token)
  } catch (e) {
    res.status(400).send("signature invalid")
  }
}
