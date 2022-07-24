


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

export const sdk = new ThirdwebSDK(
	new ethers.Wallet(
		// Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
		process.env.WALLET_PRIVATE_KEY,
		// We use Polygon Mumbai network
		ethers.getDefaultProvider( "https://winter-icy-sun.matic-testnet.quiknode.pro/f36aa318f8f806e4e15a58ab4a1b6cb9f9e9d9b9/" )
	),
)

const appAddress = '0x176dC94186Aa40e55a621BD54F553Eb3ff5FfaF4' // your project address from thirdweb

export async function getApp () {
	const app = await sdk.getAppModule( appAddress )
	return app
}

```



1-create-bundle-module.js

```js

import { getApp } from './helpers.js'

async function main () {
	const app = await getApp()

	console.log( 'Deploying bundle collection module...' )

	const bundleModule = await app.deployBundleModule( {
		name: 'Lootbox Bundle',
		sellerFeeBasisPoints: 0, // 100 means 1% royalty fee
	} )

	console.log( `Deployed bundle collection module with address ${ bundleModule.address }` )
}

try {
	await main()
} catch ( error ) {
	console.error( 'Error creating the bundle collection module', error )
	process.exit( 1 )
}

// 0x1a6CEa2bdAFB15D034fCF81C800a4B754Cef9316

```



2-mint-bundle-nfts.js

```js

import { readFileSync } from 'fs'
import { sdk } from './helpers.js'

async function main () {
	// Paste in the address from when you created the bundle collection module
	const bundleModuleAddress = '0x1a6CEa2bdAFB15D034fCF81C800a4B754Cef9316'
	const bundleModule = sdk.getBundleModule( bundleModuleAddress )

	console.log( 'Creating NFT batch...' )

	const created = await bundleModule.createAndMintBatch( [
		{
			metadata: {
				name: '#2764',
				description: 'Just a doodle.',
				image: readFileSync( './assets/2764.png' ),
				properties: {
					rarity: 'a bit rare',
					fanciness: 5,
				}
			},
			supply: 50,
		},
		{
			metadata: {
				name: '#6914',
				description: 'Just a doodle.',
				image: readFileSync( './assets/6914.png' ),
				properties: {
					rarity: 'a bit rare',
					fanciness: 5,
				}
			},
			supply: 50,
		},
		{
			metadata: {
				name: '#9243',
				description: 'Just a doodle.',
				image: readFileSync( './assets/9243.png' ),
				properties: {
					rarity: 'super rare!',
					fanciness: 10,
				}
			},
			supply: 1,
		}
	] )

	console.log( 'NFTs created!' )
	console.log( JSON.stringify( created, null, 2 ) )
}

try {
	await main()
} catch ( error ) {
	console.error( "Error minting the NFTs", error )
	process.exit( 1 )
}

```



3-create-pack-module.js

```js

import { getApp } from './helpers.js'

async function main () {
	const app = await getApp()

	console.log( 'Deploying pack module...' )

	const packModule = await app.deployPackModule( {
		name: 'Lootbox Pack',
		sellerFeeBasisPoints: 0,
	} )

	console.log( `Deployed pack module with address ${ packModule.address }` )
}

try {
	await main()
} catch ( error ) {
	console.error( 'Error creating the pack module', error )
	process.exit( 1 )
}

// 0x1B5f9fD92882d50da47cA73Ce9762Ee02Bd6d1c9

```



4-create-pack-from-bundle.js

```js

import { readFileSync } from 'fs'
import { sdk } from './helpers.js'

async function main () {
	const bundleModuleAddress = '0x1a6CEa2bdAFB15D034fCF81C800a4B754Cef9316' // your bundle module address
	const bundleModule = sdk.getBundleModule( bundleModuleAddress )

	const packModuleAddress = '0x1B5f9fD92882d50da47cA73Ce9762Ee02Bd6d1c9' // your pack module address
	const packModule = sdk.getPackModule( packModuleAddress )

	console.log( 'Getting all NFTs from bundle...' )
	const nftsInBundle = await bundleModule.getAll()

	console.log( 'NFTs in bundle:' )
	console.log( nftsInBundle )

	console.log( 'Creating a pack containing the NFTs from bundle...' )
	const created = await packModule.create( {
		assetContract: bundleModuleAddress,
		metadata: {
			name: 'Fancy Doodles Pack!',
			image: readFileSync( './assets/2764.png' ),
		},
		assets: nftsInBundle.map( nft => ( {
			tokenId: nft.metadata.id,
			amount: nft.supply,
		} ) ),
	} )

	console.log( 'Pack created!' )
	console.log( created )
}

try {
	await main()
} catch ( error ) {
	console.error( 'Error minting the NFTs', error )
	process.exit( 1 )
}

```




```



