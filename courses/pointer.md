


<https://www.pointer.gg/>



# Build a NFT Lootbox with thirdweb



helper.js

```js

import { ThirdwebSDK } from "@3rdweb/sdk"
import ethers from "ethers"

// Read environment variables from .env
import dotenv from "dotenv"
dotenv.config()

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY

if ( !walletPrivateKey ) {
	console.error( "Wallet private key missing" )
	process.exit( 1 )
}


```



