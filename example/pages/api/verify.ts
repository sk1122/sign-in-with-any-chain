// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyJwtToken, verifyMessageAndGenerateJWT } from 'siwac'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const body = JSON.parse(req.body)
    console.log(body)
    const token = await verifyJwtToken(body.token, "TEST_SECRET")
    res.status(200).send({
        access: token
    })
  } catch (e) {
    res.status(400).send("signature invalid")
  }
}
