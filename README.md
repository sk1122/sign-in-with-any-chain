# Sign In With Any Chain

As we move towards a omnichain future, your dApps users can onboard from any blockchain possible

That's why we build this

Now your user can sign in from any blockchain and prove their ownership to your servers

# Usage

## Frontend

In frontend, you would want to sign a message from the user's wallet

**Generate Message**
```ts
import { prepareMessage, Blockchain } from "siwac"

const message = prepareMessage({
    domain: "DOMAIN",
    address: "ADDRESS",
    blockchain: Blockchain.APTOS,
    message: "ANY MESSAGE",
    uri: "FULL_URI",
    version: '1',
    blockchainId: '1'
})
```

sign the generated message from user and send it to server for verification

## Backend

In backend, you would want to verify the signed message and probably generate access tokens for the user

**Verify Signature**
Details like address, timestamp etc are directly unpacked from the message string itself through parser

```ts
import { verifyMessage } from "siwac"

const verified = await verifyMessage(message, signature)

if(verified) {
    // your logic
}
```

**Verify Signature and Generate JWT**
```ts
import { verifyMessageAndGenerateJWT } from "siwac"

const token = await verifyMessageAndGenerateJWT(message, signature, "YOUR_JWT_SECRET", "30m" // OR 8h)

// token = { accessToken: string, expiresIn: string }
```

Now we also need to verify the JWT generated to grant user's access to some gated data

**Verify JWT**
```ts
import { verifyJwtToken } from "siwac"

const verified = await verifyJwtToken("ACCESS_TOKEN", "TEST_SECRET")

if(verified) {
    // your logic
}
```