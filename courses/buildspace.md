


<https://app.buildspace.so/home>



# Ship your own custom NFT collection on Solana w/ Metaplex in a weekend



## 1. 💻 Connect your web app to Solana.



### 👻 Using the Solana object.

```code

const checkIfWalletIsConnected = async () => {
	try {
		const { solana } = window

		if ( solana ) {
			if ( solana.isPhantom ) {
				console.log( 'Phantom wallet found!' )
			}
		} else {
			alert( 'Solana object not found! Get a Phantom Wallet 👻' )
		}
	} catch ( err ) {
		console.log( err )
	}
}

useEffect( () => {
	const onLoad = async () => {
		await checkIfWalletIsConnected()
	}
	window.addEventListener( 'load', onLoad )
	return () => window.removeEventListener( 'load', onLoad )
}, [] )

```



### 🔒 Accessing the user's account.

<https://docs.phantom.app/integrating/establishing-a-connection#eagerly-connecting>

```code

const checkIfWalletIsConnected = async () => {
	try {
		const { solana } = window

		if ( solana ) {
			if ( solana.isPhantom ) {
				console.log( 'Phantom wallet found!' )

				const res = await solana.connect({ onlyIfTrusted: true })
				console.log( `Connected with Public Key: ${ res.publicKey.toString() }`)
			}
		} else {
			alert( 'Solana object not found! Get a Phantom Wallet 👻' )
		}
	} catch ( err ) {
		console.log( err )
	}
}


```



### 🛍 Render connect to wallet button.

```code

const [ walletAddress, setWalletAddress ] = useState( null )

const checkIfWalletIsConnected = async () => {
	try {
		const { solana } = window

		if ( solana ) {
			if ( solana.isPhantom ) {
				console.log( 'Phantom wallet found!' )

				const res = await solana.connect({ onlyIfTrusted: true })
				console.log( `Connected with Public Key: ${ res.publicKey.toString() }`)

				setWalletAddress( res.publicKey.toString() )
			}
		} else {
			alert( 'Solana object not found! Get a Phantom Wallet 👻' )
		}
	} catch ( err ) {
		console.log( err )
	}
}

const connectWallet = () => {
	const { solana } = window

	if ( solana ) {
		const res = await solana.connect()
		console.log( 'Connected with Public Key:', res.publicKey.toString() )
		setWalletAddress( res.publicKey.toString() )
	}
}

```



---

## 2. 🍭 Deploy your NFT Candy Machine.



### 🤖 Install the pre-reqs

```terminal

git version
> git version 2.31.1 (or higher!)

node --version
> v14.17.0 (or higher, below v17 -- we found that node v16 works best)

yarn --version
> 1.22.11 (or higher!)

ts-node --version
> v10.2.1 (or higher!)

```



### 🔥 Install Solana

<https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool>

```terminal

sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

solana --version

solana config set --url devnet
solana config get

```



### 🤩 Getting started with the Metaplex CLI

```terminal

git clone --branch v1.0.0 https://github.com/metaplex-foundation/metaplex.git ~/metaplex-foundation/metaplex

yarn install --cwd ~/metaplex-foundation/metaplex/js/

ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts --version

```



### ✨ Create the NFTs of your dreams.

<https://github.com/metaplex-foundation/metaplex/issues/511>
<https://docs.metaplex.com/nft-standard#json-structure>

0.png
0.json

```code

{
	"name": "NAME_OF_NFT",
	"symbol": "",
	"image": "0.png",
	"properties": {
		"files": [
			{
				"uri": "0.png",
				"type": "image/png"
			}
		],
		"creators": [
			{
				"address": "INSERT_CREATOR_WALLET_ADDRESS_HERE",
				"share": 100
			}
		]
	}
}

```



### 🔑 Setting up a Solana keypair.

```terminal

solana-keygen new --outfile ~/.config/solana/devnet.json

solana config set --keypair ~/.config/solana/devnet.json

solana balance

solana airdrop 2

ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts upload ./assets --env devnet --keypair ~/.config/solana/devnet.json

ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts verify --keypair ~/.config/solana/devnet.json

```



### 👩‍💻 Deploy candy machine to devnet

```terminal

ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts create_candy_machine --env devnet --keypair ~/.config/solana/devnet.json -p 1

ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts update_candy_machine --date "1 Dec 2021 00:12:00 GMT" --env devnet --keypair ~/.config/solana/devnet.json

```



---

## 3. 👑 Let users start minting NFTs from your web app.



### 🌲 Setup .env properties

.env

```code

REACT_APP_CANDY_MACHINE_CONFIG=
REACT_APP_CANDY_MACHINE_ID=
REACT_APP_TREASURY_ADDRESS=
REACT_APP_SOLANA_NETWORK=
REACT_APP_SOLANA_RPC_HOST=

```

**.cache/devnet-temp**
can be found at the root of your folder after running the Metaplex command in previous steps.

**REACT_APP_CANDY_MACHINE_CONFIG**
This can be found in your .cache/devnet-temp JSON file that was created. Look for the value associated with the config key.

**REACT_APP_CANDY_MACHINE_ID**
This can also be found in the same .cache/devnet-temp JSON file, look for the value associated with the candyMachineAddress key.

**REACT_APP_TREASURY_ADDRESS**
This can also be found in the same .cache/devnet-temp JSON file, look for the value associated with the authority key.

**REACT_APP_SOLANA_NETWORK**
Set this to devnet as this is just the network in which we are accessing our candy machine from

**REACT_APP_SOLANA_RPC_HOST**
This is pretty much the same as above. Since we are accessing out Candy Machine on devnet we need to point the RPC to that devnet link which is https://explorer-api.devnet.solana.com



### 🤬 A note on changing your NFTs.

Let's say you don't like the NFT collection you used for testing and got a better idea. You need to be careful here! Whenever you change your collection, you need to follow the same steps from earlier to deploy the NFTs.

1. Delete the .cache folder that was generated by the Metaplex CLI's candy machine commands.
2. Change up your NFT files to be whatever you want!
3. Run Metaplex's upload command via the CLI to upload the NFTs.
4. Run Metaplex's verify command via the CLI to make sure the NFTs were uploaded.
5. Run Metaplex's create_candy_machine command via the CLI to create a new candy machine.
6. Run Metaplex's update_candy_machine command via the CLI to create the drop date.
7. Update your .env file with all your new addresses.

If you mess up even one of these steps, everything will break. So, watch out.



### 📞 Make a call to your candy machine.

```code

import React, { useEffect } from 'react'

const CandyMachine = ({ walletAddress }) => {
	useEffect( () => {
		getCandyMachineState()
	}, [] )
}

const getProvider = () => {
	const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST
	// Create a new connection object
	const connection = new Connection( rpcHost )

	// Create a new Solana provider object
	const provider = new Provider(
		connection,
		window.solana,
		opts.preflightCommitment
	)

	return provider
}

// Declare getCandyMachineState as an async method
const getCandyMachineState = async () => {
	const provider = getProvider()

	// Get metadata about your deployed candy machine program
	const idl = await Program.fetchIdl( candyMachineProgram, provider )

	// Create a program that you can call
	const program = new Program( idl, candyMachineProgram, provider )

	// Fetch the metadata from your candy machine
	const candyMachine = await program.account.candyMachine.fetch(
		process.env.REACT_APP_CANDY_MACHINE_ID
	)

	// Parse out all our metadata and log it out
	const itemsAvailable = candyMachine.data.itemsAvailable.toNumber()
	const itemsRedeemed = candyMachine.itemsRedeemed.toNumber()
	const itemsRemaining = itemsAvailable - itemsRedeemed
	const goLiveData = candyMachine.data.goLiveDate.toNumber()

	// We will be using this later in our UI so let's generate this now
	const goLiveDateTimeString = `${ new Date(
		goLiveData * 1000
	).toGMTString()}`

	console.log({
		itemsAvailable,
		itemsRedeemed,
		itemsRemaining,
		goLiveData,
		goLiveDateTimeString,
	})
}

```



---

## 4. ✨ Finishing touches.




---



# Build your own DAO with just Javascript in a weekend



## 1. 💻 Setup client app for DAO



### ⛓ Specify your chain and wallet type.

```code

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

// chain to support
// 4 = Rinkeby
// <https://besu.hyperledger.org/en/stable/Concepts/NetworkID-And-ChainID/>
const supportedChainIds = [ 4 ]

// type of wallet to support
// metamask is an injected wallet
const connectors = {
	injected: {},
}

ReactDOM.render(
	<React.StrictMode>
		<ThirdwebWeb3Provider
			connectors={ connectors }
			supportedChainIds={ supportedChainIds }
	>
			<App />
		</ThirdwebWeb3Provider>
	</React.StrictMode>,
	document.getElementById( 'root' )
);

```



### 🌟 Add Connect to Wallet.

```code

import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'

const App = () => {
	const { connectWallet, address, error, provider } = useWeb3()
	console.log( '👋🏻 Address: ', address )

	if ( !address ) {
		return (
			<div className="landing">
				<h1>Welcome to So Dao</h1>
				<button onClick={ () => connectWallet( 'injected' ) } className="btn-hero">
					Connect your wallet
				</button>
			</div>
		)
	}

	return (
		<div className="landing">
			<h1>👀 wallet connected, now what?</h1>
		</div>
	)
}

export default App


```



---



## 2. 😎 Create membership NFTs



### 🥳 Initialize SDK

```code

import { ThirdwebSDK } from '@3rdweb/sdk'
import ethers from 'ethers'
import dotenv from 'dotenv'

dotenv.config()

if ( !process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == '' ) {
	console.log( '🛑 Private key not found.' )
}

if ( !process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == '' ) {
	console.log( '🛑 Alchemy API URL not found.' )
}

if ( !process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == '' ) {
	console.log( '🛑 Wallet Address not found.' )
}

const sdk = new ThirdwebSDK(
	new ethers.Wallet(

		// Your wallet private key. ALWAYS KEEP THIS PRIVATE, DO NOT SHARE IT WITH ANYONE, add it to your .env file and do not commit that file to github!
		process.env.PRIVATE_KEY,

		// RPC URL, we'll use our Alchemy API URL from our .env file.
		ethers.getDefaultProvider( process.env.ALCHEMY_API_URL ),
	),
);

( async () => {
	try {
		const apps = await sdk.getApps()
		console.log( 'Your app address is: ', apps[ 0 ].address )
		// 0x040595B27b6Dc540A8d0Fc04b630336608416f8B
	} catch(err) {
		console.error( 'Failed to get apps from the sdk', err )
		process.exit( 1 )
	}
} )()

export default sdk

```



### 🧨 Create an ERC-1155 collection.

What we're going to do now is create + deploy an ERC-1155 contract to Rinkeby. This is basically the base module we'll need to create our NFTs. We're not creating our NFT here, yet. We're just setting up metadata around the collection itself. This is stuff like the name of the collection (ex. CryptoPunks) and an image associated with the collection that shows up on OpenSea as the header.

Note: You may know ERC-721 where every NFT is unique, even if they have the same image, name, and properties. With an ERC-1155, multiple people can be the holder of the same NFT. In this case, our "membership NFT" is the same for everyone, so instead of making a new NFT every time we can simply assign the same NFT to all our members. This is also more gas efficient! This is a pretty common approach for cases where the NFT is the same for all holders.

```code

import { ethers } from 'ethers'
import sdk from './1-initialize-sdk.js'
import { readFileSync } from 'fs'

const app = sdk.getAppModule( '0x040595B27b6Dc540A8d0Fc04b630336608416f8B' );

( async () => {
	try {
		const bundleDropModule = await app.deployBundleDropModule({
			// The collection's name, ex. CryptoPunks
			name: 'So Dao Membership',
			// A description for the collection.
			description: 'Why so dao?',
			// The image for the collection that will show up on OpenSea.
			image: readFileSync( 'scripts/assets/photo-1633164442172-dc4147f21954.jpeg' ),
			// We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
			// We're planning on not charging people for the drop, so we'll pass in the 0x0 address
			// you can set this to your own wallet address if you want to charge for the drop.
			primarySaleRecipientAddress: '0xDD3d23B2Fc8EF806D2A115e670097242A0bafe9b',
		})

		console.log(
			'✅ Successfully deployed bundleDrop module, address:',
			bundleDropModule.address,
		)

		console.log(
			'✅ bundleDrop metadata:',
			await bundleDropModule.getMetadata(),
		)
	} catch( error ) {
		console.log( 'failed to deploy bundleDrop module', error )
	}
} )()

// ✅ Successfully deployed bundleDrop module, address: 0x43C0c52c706Bf3D1c2C560AF1a0094a0f6C28377
// image loaded to <https://docs.ipfs.io/concepts/what-is-ipfs/>

```



### 👾 Setup NFT Data.

```code

import sdk from './1-initialize-sdk.js'
import { readFileSync } from 'fs'

const bundleDrop = sdk.getBundleDropModule(
	'0x43C0c52c706Bf3D1c2C560AF1a0094a0f6C28377',
);

( async () => {
	try {
		await bundleDrop.createBatch([
			{
				name: 'So Dao Access Card',
				description: 'This NFT will give you access to So Dao!',
				image: readFileSync( 'scripts/assets/hww.png' ),
			},
		])
		console.log( '✅ Successfully created a new NFT in the drop!' )
	} catch( error ) {
		console.error( 'failed to create the new NFT', error )
	}
} )()

// Your app address is:  0x040595B27b6Dc540A8d0Fc04b630336608416f8B

```



### 😼 Setup claim condition.

```code

import sdk from './1-initialize-sdk.js'

const bundleDrop = sdk.getBundleDropModule(
	'0x43C0c52c706Bf3D1c2C560AF1a0094a0f6C28377',
);

( async () => {
	try {
		const claimConditionFactory = bundleDrop.getClaimConditionFactory()
		// Specify conditions.
		claimConditionFactory.newClaimPhase({
			startTime: new Date(),
			maxQuantity: 100,
			maxQuantityPerTransaction: 1,
		})

		await bundleDrop.setClaimCondition( 0, claimConditionFactory )
		console.log( '✅ Successfully set claim condition on bundle drop:', bundleDrop.address )
	} catch( error ) {
		console.error( 'Failed to set claim condition', error )
	}
} )()

```



### 🤔 Check if user owns a membership NFT.

```code

import { ThirdwebSDK } from "@3rdweb/sdk"
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'

const sdk = new ThirdwebSDK( 'rinkeby' );

const bundleDropModule = sdk.getBundleDropModule(
	'0x43C0c52c706Bf3D1c2C560AF1a0094a0f6C28377',
)

const App = () => {
	const { connectWallet, address, error, provider } = useWeb3()
	console.log( '👋🏻 Address: ', address )

	const [ hasClaimedNFT, setHasClaimedNFT ] = useState( false )

	useEffect( () => {
		if ( !address ) return

		return bundleDropModule
			.balanceOf( address, '0' ) // check for id 0 nft
			.then( balance => {
				if ( balance.gt( 0 ) ) {
					setHasClaimedNFT( true )
					console.log( '🌟 this user has a membership NFT!' )
				} else {
					setHasClaimedNFT( false )
					console.log( `😭 this user doesn't have a membership NFT.` )
				}
			} )
			.catch( error => {
				setHasClaimedNFT( false )
				console.log( 'failed to nft balance', error )
			} )
	}, [ address ] )

	if ( !address ) {
		return (
			<div className="landing">
				<h1>Welcome to So Dao</h1>
				<button onClick={ () => connectWallet( 'injected' ) } className="btn-hero">
					Connect your wallet
				</button>
			</div>
		)
	}

	return (
		<div className="landing">
			<h1>👀 wallet connected, now what?</h1>
		</div>
	)
}

export default App

```



### ✨ Build a "Mint NFT" button.

```code

import { ThirdwebSDK } from '@3rdweb/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'

const sdk = new ThirdwebSDK( 'rinkeby' );

const bundleDropModule = sdk.getBundleDropModule(
	'0x43C0c52c706Bf3D1c2C560AF1a0094a0f6C28377',
)

const App = () => {
	const { connectWallet, address, error, provider } = useWeb3()
	console.log( '👋🏻 Address: ', address )

	// The signer is required to sign transactions on the blockchain.
		// Without it we can only read data, not write.
	// https://docs.ethers.io/v5/api/signer/
	const signer = provider ? provider.getSigner() : undefined

	const [ hasClaimedNFT, setHasClaimedNFT ] = useState( false )
	// isClaiming lets us easily keep a loading state while the NFT is minting.
	const [ isClaiming, setIsClaiming ] = useState( false )

	useEffect( () => {
		// We pass the signer to the sdk, which enables us to interact with
			// our deployed contract!
		sdk.setProviderOrSigner( signer )
	}, [ signer ] )

	useEffect( () => {
		if ( !address ) return

		return bundleDropModule
			.balanceOf( address, '0' ) // check for id 0 nft
			.then( balance => {
				if ( balance.gt( 0 ) ) {
					setHasClaimedNFT( true )
					console.log( '🌟 this user has a membership NFT!' )
				} else {
					setHasClaimedNFT( false )
					console.log( `😭 this user doesn't have a membership NFT.` )
				}
			} )
			.catch( error => {
				setHasClaimedNFT( false )
				console.log( 'failed to nft balance', error )
			} )
	}, [ address ] )

	if ( !address ) {
		return (
			<div className="landing">
				<h1>Welcome to So Dao</h1>
				<button onClick={ () => connectWallet( 'injected' ) } className="btn-hero">
					Connect your wallet
				</button>
			</div>
		)
	}

	if ( hasClaimedNFT ) {
		return(
			<div className="member-page">
				<h1>🍪 DAO Member Page</h1>
				<p>Congrats on being a member</p>
			</div>
		)
	}

	const mintNft = () => {
		setIsClaiming( true )
		// Call bundleDropModule.claim( '0', 1 ) to mint nft to user's wallet.
		bundleDropModule
			.claim( '0', 1 )
			.then( () => {
				setHasClaimedNFT( true )
				console.log( `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${ bundleDropModule.address }/0` )
			} )
			.catch( err => {
				console.error( 'failed to claim', err )
			} )
			.finally( () => {
				setIsClaiming( false )
			} )
	}

	return (
		<div className="mint-nft">
			<h1>Mint your free 🍪 DAO Membership NFT</h1>
			<button
				disabled={ isClaiming }
				onClick={ () => mintNft() }
			>
				{ isClaiming ? 'Minting...' : 'Mint your free nft (FREE)' }
			</button>
		</div>
	)
}

export default App

```



---



## 3. 💎 Create your own token + on-chain governance



### 🥵 Deploy your token.

```code

import sdk from './1-initialize-sdk.js'

const app = sdk.getAppModule( '0x040595B27b6Dc540A8d0Fc04b630336608416f8B' );

// https://github.com/nftlabs/nftlabs-protocols/blob/main/contracts/Coin.sol

( async () => {
	try {
		// Deploy a standard ERC-20 contract.
		const tokenModule = await app.deployTokenModule({
			// What's your token's name? Ex. 'Ethereum'
			name: 'So Dao Governance Token',
			// What's your token's symbol? Ex. 'ETH'
			symbol: 'HWW',
		})

		console.log(
			'✅ Successfully deployed token module, address:',
			tokenModule.address,
		)

	} catch( err ) {
		console.error( 'failed to deploy token module', err )
	}
} )()

// ✅ Successfully deployed token module, address: 0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9

```



### 💸 Create your token’s supply.

```code

import { ethers } from 'ethers'
import sdk from './1-initialize-sdk.js'

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
	'0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9',
);

( async () => {
	try {
		// What's the max supply you want to set? 1,000,000 is a nice number!
		const amount = 1_000_000
		// We use the util function from 'ethers' to convert the amount
		// to have 18 decimals (which is the standard for ERC20 tokens).
		const amountWith18Decimals = ethers.utils.parseUnits( amount.toString(), 18 )
		// Interact with your deployed ERC-20 contract and mint the tokens!
		await tokenModule.mint( amountWith18Decimals )
		const totalSupply = await tokenModule.totalSupply()

		// Print out how many of our token's are out there now!
		console.log(
			'✅ There now is',
			ethers.utils.formatUnits( totalSupply, 18 ),
			'$HWW in circulation',
		)
	} catch( err ) {
		console.error( 'Failed to print money', err )
	}
} )()


```



### ✈️ Airdrop it.

```code

import { ethers } from 'ethers'
import sdk from './1-initialize-sdk.js'

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
	'0x43C0c52c706Bf3D1c2C560AF1a0094a0f6C28377',
);

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
	'0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9',
);

( async () => {
	try {
		// Grab all the addresses of people who own our membership NFT, which has
		// a tokenId of 0.
		const walletAddresses = await bundleDropModule.getAllClaimerAddresses( '0' )

		if ( walletAddresses.length === 0 ) {
			console.log(
				'No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!',
			)
			process.exit( 0 )
		}

		// Loop through the array of addresses.
		const airdropTargets = walletAddresses.map( address => {
			// Pick a random # between 1000 and 10000.
			const randomAmount = Math.floor( Math.random() * ( 10000 - 1000 + 1 ) + 1000 )
			console.log( '✅ Going to airdrop', randomAmount, 'tokens to', address )

			// Set up the target.
			const airdropTarget = {
				address,
				// Remember, we need 18 decimal placees!
				amount: ethers.utils.parseUnits( randomAmount.toString(), 18 ),
			}

			return airdropTarget
		})

		// Call transferBatch on all our airdrop targets.
		console.log( '🌈 Starting airdrop...' )
		await tokenModule.transferBatch( airdropTargets )
		console.log( '✅ Successfully airdropped tokens to all the holders of the NFT!' )
	} catch( err ) {
		console.error( 'Failed to airdrop tokens', err )
	}
} )()

```



### 🥺 Retrieve token holders on web app.

```code

import { ethers } from 'ethers'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'

const sdk = new ThirdwebSDK( 'rinkeby' );

const bundleDropModule = sdk.getBundleDropModule(
	'0x43C0c52c706Bf3D1c2C560AF1a0094a0f6C28377',
);

const tokenModule = sdk.getTokenModule(
	'0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9'
);

const App = () => {
	const { connectWallet, address, error, provider } = useWeb3()
	console.log( '👋🏻 Address: ', address )

	// The signer is required to sign transactions on the blockchain.
		// Without it we can only read data, not write.
	const signer = provider ? provider.getSigner() : undefined

	const [ hasClaimedNFT, setHasClaimedNFT ] = useState( false )
	// isClaiming lets us easily keep a loading state while the NFT is minting.
	const [ isClaiming, setIsClaiming ] = useState( false )

	// Holds the amount of token each member has in state.
	const [ memberTokenAmounts, setMemberTokenAmounts ] = useState({})
	// The array holding all of our members addresses.
	const [ memberAddresses, setMemberAddresses ] = useState([])

	// A fancy function to shorten someones wallet address, no need to show the whole thing.
	const shortenAddress = str => {
		return str.substring( 0, 6 ) + '...' + str.substring( str.length - 4 )
	}

	// This useEffect grabs all the addresses of our members holding our NFT.
	useEffect( () => {
		if ( !hasClaimedNFT ) return

		// Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
		// with tokenId 0.
		bundleDropModule
			.getAllClaimerAddresses( '0' )
			.then( addresses => {
				console.log( '🚀 Members addresses', addresses )
				setMemberAddresses( addresses )
			} )
			.catch( err => {
				console.error( 'failed to get member list', err )
			} )
	}, [ hasClaimedNFT ] )

	// This useEffect grabs the # of token each member holds.
	useEffect( () => {
		if ( !hasClaimedNFT ) return

		// Grab all the balances.
		tokenModule
			.getAllHolderBalances()
			.then( amounts => {
				console.log( '👜 Amounts', amounts )
				setMemberTokenAmounts( amounts )
			} )
			.catch( err => {
				console.error( 'failed to get token amounts', err )
			} )
	}, [ hasClaimedNFT ] )

	// Now, we combine the memberAddresses and memberTokenAmounts into a single array
	const memberList = useMemo( () => {
		return memberAddresses.map( address => {
			return {
				address,
				tokenAmount: ethers.utils.formatUnits(
					// If the address isn't in memberTokenAmounts, it means they don't
							// hold any of our token.
					memberTokenAmounts[ address ] || 0,
					18,
				)
			}
		})
	}, [ memberAddresses, memberTokenAmounts ] )

	useEffect( () => {
		// We pass the signer to the sdk, which enables us to interact with
			// our deployed contract!
		sdk.setProviderOrSigner( signer )
	}, [ signer ] )

	useEffect( () => {
		if ( !address ) return

		return bundleDropModule
			.balanceOf( address, '0' ) // check for id 0 nft
			.then( balance => {
				if ( balance.gt( 0 ) ) {
					setHasClaimedNFT( true )
					console.log( '🌟 this user has a membership NFT!' )
				} else {
					setHasClaimedNFT( false )
					console.log( `😭 this user doesn't have a membership NFT.` )
				}
			} )
			.catch( error => {
				setHasClaimedNFT( false )
				console.log( 'failed to nft balance', error )
			} )
	}, [ address ] )

	if ( !address ) {
		return (
			<div className="landing">
				<h1>Welcome to So Dao</h1>
				<button onClick={ () => connectWallet( 'injected' ) } className="btn-hero">
					Connect your wallet
				</button>
			</div>
		)
	}

	if ( hasClaimedNFT ) {
		return(
			<div className="member-page">
				<h1>🍪DAO Member Page</h1>
				<p>Congratulations on being a member</p>
				<div>
					<div>
					<h2>Member List</h2>
					<table className="card">
						<thead>
						<tr>
							<th>Address</th>
							<th>Token Amount</th>
						</tr>
						</thead>
						<tbody>
						{memberList.map((member) => {
							return (
							<tr key={member.address}>
								<td>{shortenAddress(member.address)}</td>
								<td>{member.tokenAmount}</td>
							</tr>
							);
						})}
						</tbody>
					</table>
					</div>
				</div>
			</div>
		)
	}

	const mintNft = () => {
		setIsClaiming( true )
		// Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
		bundleDropModule
			.claim( '0', 1 )
			.then( () => {
				setHasClaimedNFT( true )
				console.log( `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${ bundleDropModule.address }/0` )
			} )
			.catch( err => {
				console.error( 'failed to claim', err )
			} )
			.finally( () => {
				setIsClaiming( false )
			} )
	}

	return (
		<div className="mint-nft">
			<h1>Mint your free 🍪 DAO Membership NFT</h1>
			<button
				disabled={ isClaiming }
				onClick={ () => mintNft() }
			>
				{ isClaiming ? 'Minting...' : 'Mint your free nft (FREE)' }
			</button>
		</div>
	)
}

export default App

```



### 📝 Deploy a governance contract.

```code

import sdk from './1-initialize-sdk.js'

// Grab the app module address.
const appModule = sdk.getAppModule(
	'0x040595B27b6Dc540A8d0Fc04b630336608416f8B',
);

( async () => {
	try {
		const voteModule = await appModule.deployVoteModule({
		// Give your governance contract a name.
		name: `So Dao Epic Proposals`,

		// This is the location of our governance token, our ERC-20 contract!
		votingTokenAddress: '0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9',

		// After a proposal is created, when can members start voting?
		// For now, we set this to immediately.
		proposalStartWaitTimeInSeconds: 0,

		// How long do members have to vote on a proposal when it's created?
		// Here, we set it to 24 hours (86400 seconds)
		proposalVotingTimeInSeconds: 24 * 60 * 60,

		// Will explain more below.
		// % of min tokens must vote before execution.
		votingQuorumFraction: 0,

		// What's the minimum # of tokens a user needs to be allowed to create a proposal?
		// I set it to 0. Meaning no tokens are required for a user to be allowed to
		// create a proposal.
		minimumNumberOfTokensNeededToPropose: '0',
		})

		console.log(
		'✅ Successfully deployed vote module, address:',
		voteModule.address,
		)
	} catch( err ) {
		console.error( 'Failed to deploy vote module', err )
	}
} )()


// ✅ Successfully deployed vote module, address: 0xe3a17512d7B8038E664140762ED4CbD7d734ae27

```



### 🏦 Setup your treasury.

```code

import { ethers } from 'ethers'
import sdk from './1-initialize-sdk.js'

// This is our governance contract.
const voteModule = sdk.getVoteModule(
	'0xe3a17512d7B8038E664140762ED4CbD7d734ae27',
);

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
	'0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9',
);

( async () => {
	try {
		// Give our treasury the power to mint additional token if needed.
		await tokenModule.grantRole( 'minter', voteModule.address )

		console.log(
			'Successfully gave vote module permissions to act on token module'
		)
	} catch( err ) {
		console.error(
			'failed to grant vote module permissions on token module',
			err
		)
		process.exit( 1 )
	}

	try {
		// Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
		const ownedTokenBalance = await tokenModule.balanceOf(
			// The wallet address stored in your env file or Secrets section of Repl
			process.env.WALLET_ADDRESS
		)

		// Grab 50% of the supply that we hold.
		const ownedAmount = ethers.BigNumber.from( ownedTokenBalance.value )
		const percent50 = ownedAmount.div( 100 ).mul( 50 )

		// Transfer 50% of the supply to our voting contract.
		await tokenModule.transfer(
			voteModule.address,
			percent50
		)

		console.log( '✅ Successfully transferred tokens to vote module' )
	} catch( err ) {
		console.error( 'failed to transfer tokens to vote module', err )
	}
} )()

```



### 📜 Create your DAO’s first two proposals.

```code

import { ethers } from 'ethers'
import sdk from './1-initialize-sdk.js'

// Our voting contract.
const voteModule = sdk.getVoteModule(
  '0xe3a17512d7B8038E664140762ED4CbD7d734ae27',
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  '0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9',
);

( async () => {
  try {
	const amount = 100_000;
	// Create proposal to mint 100,000 new token to the treasury.
	await voteModule.propose(
		'Should the DAO mint an additional ' + amount + ' tokens into the treasury?',
		[
			{
				// Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want to send in this proposal. In this case, we're sending 0 ETH.
				// We're just minting new tokens to the treasury. So, set to 0.
				nativeTokenValue: 0,
				transactionData: 		tokenModule.contract.interface.encodeFunctionData(
					// We're doing a mint! And, we're minting to the voteModule, which is acting as our treasury.
					'mint',
					[
						voteModule.address,
						ethers.utils.parseUnits( amount.toString(), 18 ),
					]
				),
				// Our token module that actually executes the mint.
				toAddress: tokenModule.address,
			},
		]
	)

		console.log( '✅ Successfully created proposal to mint tokens' )
	} catch( err ) {
		console.error( 'failed to create first proposal', err )
		process.exit( 1 )
	}

	try {
		const amount = 6_900;
		// Create proposal to transfer ourselves 6,900 tokens for being awesome.
		await voteModule.propose(
			'Should the DAO transfer ' +
			amount + ' tokens from the treasury to ' +
			process.env.WALLET_ADDRESS + ' for being awesome?',
			[
				{
					// Again, we're sending ourselves 0 ETH. Just sending our own token.
					nativeTokenValue: 0,
					transactionData: tokenModule.contract.interface.encodeFunctionData(
						// We're doing a transfer from the treasury to our wallet.
						'transfer',
						[
							process.env.WALLET_ADDRESS,
							ethers.utils.parseUnits( amount.toString(), 18 ),
						]
					),
					toAddress: tokenModule.address,
				},
			]
		)

		console.log(
			`✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!`
		)
	} catch( err ) {
		console.error( 'failed to create second proposal', err )
	}
} )()

```



### ✍️ Let users vote on proposals from the dashboard.

```code
import { ethers } from 'ethers'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'

const sdk = new ThirdwebSDK( 'rinkeby' );

const bundleDropModule = sdk.getBundleDropModule(
	'0x43C0c52c706Bf3D1c2C560AF1a0094a0f6C28377',
);

const tokenModule = sdk.getTokenModule(
	'0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9'
);

const voteModule = sdk.getVoteModule(
	'0xe3a17512d7B8038E664140762ED4CbD7d734ae27',
);

const App = () => {
	const { connectWallet, address, error, provider } = useWeb3()
	console.log( '👋🏻 Address: ', address )

	// The signer is required to sign transactions on the blockchain.
  	// Without it we can only read data, not write.
	const signer = provider ? provider.getSigner() : undefined

	const [ hasClaimedNFT, setHasClaimedNFT ] = useState( false )
	// isClaiming lets us easily keep a loading state while the NFT is minting.
	const [ isClaiming, setIsClaiming ] = useState( false )

	// Holds the amount of token each member has in state.
	const [ memberTokenAmounts, setMemberTokenAmounts ] = useState({})
	// The array holding all of our members addresses.
	const [ memberAddresses, setMemberAddresses ] = useState([])

	const [ proposals, setProposals ] = useState([])
	const [ isVoting, setIsVoting ] = useState( false )
	const [ hasVoted, setHasVoted ] = useState( false )

	// Retrieve all our existing proposals from the contract.
	useEffect( () => {
		if ( !hasClaimedNFT ) return
		// A simple call to voteModule.getAll() to grab the proposals.
		voteModule
			.getAll()
			.then( proposals => {
				// Set state!
				setProposals( proposals )
				console.log( '🌈 Proposals:', proposals )
			} )
			.catch( err => {
				console.error( 'failed to get proposals', err )
			} )
	}, [ hasClaimedNFT ] )

	// We also need to check if the user already voted.
	useEffect(() => {
		if ( !hasClaimedNFT ) return

		// If we haven't finished retrieving the proposals from the useEffect above
		// then we can't check if the user voted yet!
		if ( !proposals.length ) return

		// Check if the user has already voted on the first proposal.
		voteModule
			.hasVoted( proposals[ 0 ].proposalId, address )
			.then( hasVoted => {
				setHasVoted( hasVoted )
				if ( hasVoted ) {
					console.log( '🥵 User has already voted' )
				} else {
					console.log( '🙂 User has not voted yet' )
				}
			} )
			.catch( err => {
				console.error( 'failed to check if wallet has voted', err )
			} )
	}, [ hasClaimedNFT, proposals, address ] )

	// A fancy function to shorten someones wallet address, no need to show the whole thing.
	const shortenAddress = str => {
		return str.substring( 0, 6 ) + '...' + str.substring( str.length - 4 )
	}

	// This useEffect grabs all the addresses of our members holding our NFT.
	useEffect( () => {
		if ( !hasClaimedNFT ) return

		// Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
		// with tokenId 0.
		bundleDropModule
			.getAllClaimerAddresses( '0' )
			.then( addresses => {
				console.log( '🚀 Members addresses', addresses )
				setMemberAddresses( addresses )
			} )
			.catch( err => {
				console.error( 'failed to get member list', err )
			} )
	}, [ hasClaimedNFT ] )

	// This useEffect grabs the # of token each member holds.
	useEffect( () => {
		if ( !hasClaimedNFT ) return

		// Grab all the balances.
		tokenModule
			.getAllHolderBalances()
			.then( amounts => {
				console.log( '👜 Amounts', amounts )
				setMemberTokenAmounts( amounts )
			} )
			.catch( err => {
				console.error( 'failed to get token amounts', err )
			} )
	}, [ hasClaimedNFT ] )

	// Now, we combine the memberAddresses and memberTokenAmounts into a single array
	const memberList = useMemo( () => {
		return memberAddresses.map( address => {
			return {
				address,
				tokenAmount: ethers.utils.formatUnits(
					// If the address isn't in memberTokenAmounts, it means they don't
					// hold any of our token.
					memberTokenAmounts[ address ] || 0,
					18,
				)
			}
		})
	}, [ memberAddresses, memberTokenAmounts ] )

	useEffect( () => {
		// We pass the signer to the sdk, which enables us to interact with
		// our deployed contract!
		sdk.setProviderOrSigner( signer )
	}, [ signer ] )

	useEffect( () => {
		if ( !address ) return

		return bundleDropModule
			.balanceOf( address, '0' ) // check for id 0 nft
			.then( balance => {
				if ( balance.gt( 0 ) ) {
					setHasClaimedNFT( true )
					console.log( '🌟 this user has a membership NFT!' )
				} else {
					setHasClaimedNFT( false )
					console.log( `😭 this user doesn't have a membership NFT.` )
				}
			} )
			.catch( error => {
				setHasClaimedNFT( false )
				console.log( 'failed to nft balance', error )
			} )
	}, [ address ] )

	if ( !address ) {
		return (
			<div className="landing">
				<h1>Welcome to So Dao</h1>
				<button onClick={ () => connectWallet( 'injected' ) } className="btn-hero">
					Connect your wallet
				</button>
			</div>
		)
	}

	if ( hasClaimedNFT ) {
		return (
		<div className="member-page">
			<h1>🍪DAO Member Page</h1>
			<p>Congratulations on being a member</p>
			<div>
			<div>
				<h2>Member List</h2>
				<table className="card">
				<thead>
					<tr>
					<th>Address</th>
					<th>Token Amount</th>
					</tr>
				</thead>
				<tbody>
					{memberList.map((member) => {
					return (
						<tr key={member.address}>
						<td>{shortenAddress(member.address)}</td>
						<td>{member.tokenAmount}</td>
						</tr>
					);
					})}
				</tbody>
				</table>
			</div>
			<div>
				<h2>Active Proposals</h2>
				<form
				onSubmit={async (e) => {
					e.preventDefault();
					e.stopPropagation();

					//before we do async things, we want to disable the button to prevent double clicks
					setIsVoting(true);

					// lets get the votes from the form for the values
					const votes = proposals.map((proposal) => {
					let voteResult = {
						proposalId: proposal.proposalId,
						//abstain by default
						vote: 2,
					};
					proposal.votes.forEach((vote) => {
						const elem = document.getElementById(
						proposal.proposalId + "-" + vote.type
						);

						if (elem.checked) {
						voteResult.vote = vote.type;
						return;
						}
					});
					return voteResult;
					});

					// first we need to make sure the user delegates their token to vote
					try {
					//we'll check if the wallet still needs to delegate their tokens before they can vote
					const delegation = await tokenModule.getDelegationOf(address);
					// if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
					if (delegation === ethers.constants.AddressZero) {
						//if they haven't delegated their tokens yet, we'll have them delegate them before voting
						await tokenModule.delegateTo(address);
					}
					// then we need to vote on the proposals
					try {
						await Promise.all(
						votes.map(async (vote) => {
							// before voting we first need to check whether the proposal is open for voting
							// we first need to get the latest state of the proposal
							const proposal = await voteModule.get(vote.proposalId);
							// then we check if the proposal is open for voting (state === 1 means it is open)
							if (proposal.state === 1) {
							// if it is open for voting, we'll vote on it
							return voteModule.vote(vote.proposalId, vote.vote);
							}
							// if the proposal is not open for voting we just return nothing, letting us continue
							return;
						})
						);
						try {
						// if any of the propsals are ready to be executed we'll need to execute them
						// a proposal is ready to be executed if it is in state 4
						await Promise.all(
							votes.map(async (vote) => {
							// we'll first get the latest state of the proposal again, since we may have just voted before
							const proposal = await voteModule.get(
								vote.proposalId
							);

							//if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
							if (proposal.state === 4) {
								return voteModule.execute(vote.proposalId);
							}
							})
						);
						// if we get here that means we successfully voted, so let's set the "hasVoted" state to true
						setHasVoted(true);
						// and log out a success message
						console.log("successfully voted");
						} catch (err) {
						console.error("failed to execute votes", err);
						}
					} catch (err) {
						console.error("failed to vote", err);
					}
					} catch (err) {
					console.error("failed to delegate tokens");
					} finally {
					// in *either* case we need to set the isVoting state to false to enable the button again
					setIsVoting(false);
					}
				}}
				>
				{proposals.map((proposal, index) => (
					<div key={proposal.proposalId} className="card">
					<h5>{proposal.description}</h5>
					<div>
						{proposal.votes.map((vote) => (
						<div key={vote.type}>
							<input
							type="radio"
							id={proposal.proposalId + "-" + vote.type}
							name={proposal.proposalId}
							value={vote.type}
							//default the "abstain" vote to chedked
							defaultChecked={vote.type === 2}
							/>
							<label htmlFor={proposal.proposalId + "-" + vote.type}>
							{vote.label}
							</label>
						</div>
						))}
					</div>
					</div>
				))}
				<button disabled={isVoting || hasVoted} type="submit">
					{isVoting
					? "Voting..."
					: hasVoted
						? "You Already Voted"
						: "Submit Votes"}
				</button>
				<small>
					This will trigger multiple transactions that you will need to
					sign.
				</small>
				</form>
			</div>
			</div>
		</div>
		)
	}

	const mintNft = () => {
		setIsClaiming( true )
		// Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
		bundleDropModule
			.claim( '0', 1 )
			.then( () => {
				setHasClaimedNFT( true )
				console.log( `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${ bundleDropModule.address }/0` )
			} )
			.catch( err => {
				console.error( 'failed to claim', err )
			} )
			.finally( () => {
				setIsClaiming( false )
			} )
	}

	return (
		<div className="mint-nft">
			<h1>Mint your free 🍪 DAO Membership NFT</h1>
			<button
				disabled={ isClaiming }
				onClick={ () => mintNft() }
			>
				{ isClaiming ? 'Minting...' : 'Mint your free nft (FREE)' }
			</button>
		</div>
	)
}

export default App

```



---



## 4. 🌟 Finishing touches



### 😡 Revoke roles.

```code

import sdk from './1-initialize-sdk.js'

const tokenModule = sdk.getTokenModule(
	'0xebc8a89936644Eb4c5BB777520E2b90Ccca873A9',
);

( async () => {
	try {
		// Log the current roles.
		console.log(
			'👀 Roles that exist right now:',
			await tokenModule.getAllRoleMembers()
		)

		// Revoke all the superpowers your wallet had over the ERC-20 contract.
		await tokenModule.revokeAllRolesFromAddress( process.env.WALLET_ADDRESS )
		console.log(
			'🎉 Roles after revoking ourselves',
			await tokenModule.getAllRoleMembers()
		)
		console.log( '✅ Successfully revoked our superpowers from the ERC-20 contract' )
		} catch( err ) {
			console.error( 'Failed to revoke ourselves from the DAO treasury', err )
	}
} )()

```



### 👍 Handle basic unsupported network error.

```code

import { UnsupportedChainIdError } from '@web3-react/core'

if ( error instanceof UnsupportedChainIdError ) {
	return (
		<div className="unsupported-network">
		<h2>Please connect to Rinkeby</h2>
		<p>
			This dapp only works on the Rinkeby network, please switch networks
			in your connected wallet.
		</p>
		</div>
	)
}

```



---



# Create your own mini turn-based NFT browser game



## 1. 🤠 Ship your NFT character system.



### 📝 Write our starter contract.

```solidity

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract MyEpicGame {
	constructor() {
		console.log( 'this is my game contract. nice.' );
	}
}

```



### 😲 How do we run it?

```code

const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory( 'MyEpicGame' )
	const gameContract = await gameContractFactory.deploy()
	await gameContract.deployed()
	console.log( "Contract deployed to:", gameContract.address )
}

const runMain = async () => {
	try {
		await main()
		process.exit( 0 )
	} catch ( error ) {
		console.log( error )
		process.exit( 1 )
	}
}

runMain()

```



### ✨ Setup the data for your NFTs

```solidity

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract MyEpicGame {

	struct CharacterAttributes {
		uint characterIndex;
		string name;
		string imageURI;
		uint hp;
		uint maxHp;
		uint attackDamage;
	}

	CharacterAttributes[] defaultCharacters;

	constructor(
		string[] memory characterNames,
		string[] memory characterImageURIs,
		uint[] memory characterHp,
		uint[] memory characterAttackDmg
	) {
		for ( uint i = 0; i < characterNames.length; i += 1 ) {
			defaultCharacters.push( CharacterAttributes( {
				characterIndex: i,
				name: characterNames[ i ],
				imageURI: characterImageURIs[ i ],
				hp: characterHp[ i ],
				maxHp: characterHp[ i ],
				attackDamage: characterAttackDmg[ i ]
			} ) );

			CharacterAttributes memory c = defaultCharacters[ i ];
			console.log( 'Done initializing %s w/ HP %s, img %s', c.name, c.imageURI );
		}

	}
}

```

```code

const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory( 'MyEpicGame' )
	const gameContract = await gameContractFactory.deploy(
		[ "Leo", "Aang", "Pikachu" ], // Names
		[ "https://i.imgur.com/pKd5Sdk.png", // Images
			"https://i.imgur.com/xVu4vFL.png",
			"https://i.imgur.com/WMB6g9u.png" ],
		[ 100, 200, 300 ], // HP values
		[ 100, 50, 25 ]
	)
	await gameContract.deployed()
	console.log( "Contract deployed to:", gameContract.address )
}

const runMain = async () => {
	try {
		await main()
		process.exit( 0 )
	} catch ( error ) {
		console.log( error )
		process.exit( 1 )
	}
}

runMain()

```



### ✨ Mint the NFTs

```solidity

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import 'hardhat/console.sol';

// Our contract inherits from ERC721, which is the standard NFT contract!
contract MyEpicGame is ERC721 {

	struct CharacterAttributes {
		uint characterIndex;
		string name;
		string imageURI;
		uint hp;
		uint maxHp;
		uint attackDamage;
	}

	// The tokenId is the NFTs unique identifier, it's just a number that goes
	// 0, 1, 2, 3, etc.
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	CharacterAttributes[] defaultCharacters;

	// We create a mapping from the nft's tokenId => that NFTs attributes.
	mapping( uint256 => CharacterAttributes ) public nftHolderAttributes;

	// A mapping from an address => the NFTs tokenId. Gives me an ez way
	// to store the owner of the NFT and reference it later.
	mapping( address => uint256 ) public nftHolders;

	constructor(
		string[] memory characterNames,
		string[] memory characterImageURIs,
		uint[] memory characterHp,
		uint[] memory characterAttackDmg

		// Below, you can also see I added some special identifier symbols for our NFT.
		// This is the name and symbol for our token, ex Ethereum and ETH. I just call mine
		// Heroes and HERO. Remember, an NFT is just a token!
	)
		ERC721( "Heroes", "HERO" )
	{
		for ( uint i = 0; i < characterNames.length; i += 1 ) {
			defaultCharacters.push( CharacterAttributes( {
				characterIndex: i,
				name: characterNames[ i ],
				imageURI: characterImageURIs[ i ],
				hp: characterHp[ i ],
				maxHp: characterHp[ i ],
				attackDamage: characterAttackDmg[ i ]
			} ) );

			CharacterAttributes memory c = defaultCharacters[ i ];

			// Hardhat's use of console.log() allows up to 4 parameters in any order of following types: uint, string, bool, address
			console.log( "Done initializing %s w/ HP %s, img %s", c.name, c.hp, c.imageURI );
		}

		// I increment _tokenIds here so that my first NFT has an ID of 1.
		// More on this in the lesson!
		_tokenIds.increment();
	}

	// Users would be able to hit this function and get their NFT based on the
	// characterId they send in!
	function mintCharacterNFT( uint _characterIndex ) external {
		// Get current tokenId (starts at 1 since we incremented in the constructor).
		uint256 newItemId = _tokenIds.current();

		// The magical function! Assigns the tokenId to the caller's wallet address.
		_safeMint( msg.sender, newItemId );

		// We map the tokenId => their character attributes. More on this in
		// the lesson below.
		nftHolderAttributes[ newItemId ] = CharacterAttributes({
			characterIndex: _characterIndex,
			name: defaultCharacters[ _characterIndex ].name,
			imageURI: defaultCharacters[ _characterIndex ].imageURI,
			hp: defaultCharacters[ _characterIndex ].hp,
			maxHp: defaultCharacters[ _characterIndex ].maxHp,
			attackDamage: defaultCharacters[ _characterIndex ].attackDamage
		});

		console.log( "Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex );

		// Keep an easy way to see who owns what NFT.
		nftHolders[ msg.sender ] = newItemId;

		// Increment the tokenId for the next person that uses it.
		_tokenIds.increment();
	}
}

```

```code

const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory( 'MyEpicGame' )
	const gameContract = await gameContractFactory.deploy(
		[ "Leo", "Aang", "Pikachu" ], // Names
		[ "https://i.imgur.com/pKd5Sdk.png", // Images
			"https://i.imgur.com/xVu4vFL.png",
			"https://i.imgur.com/WMB6g9u.png" ],
		[ 100, 200, 300 ], // HP values
		[ 100, 50, 25 ]
	)
	await gameContract.deployed()
	console.log( "Contract deployed to:", gameContract.address )

	let txn;
	// We only have three characters.
	// an NFT w/ the character at index 2 of our array.
	txn = await gameContract.mintCharacterNFT( 2 )
	await txn.wait()

	// Get the value of the NFT's URI.
	let returnedTokenUri = await gameContract.tokenURI( 1 )
	console.log( "Token URI:", returnedTokenUri );
}

const runMain = async () => {
	try {
		await main()
		process.exit( 0 )
	} catch ( error ) {
		console.log( error )
		process.exit( 1 )
	}
}

runMain()

```



### ⭐️ Setup tokenURI

```solidity

/**
 *Submitted for verification at Etherscan.io on 2021-09-05
 */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// [MIT License]
/// @title Base64
/// @notice Provides a function for encoding some bytes in base64
/// @author Brecht Devos <brecht@loopring.org>
library Base64 {
	bytes internal constant TABLE =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	/// @notice Encodes some bytes to the base64 representation
	function encode(bytes memory data) internal pure returns (string memory) {
		uint256 len = data.length;
		if (len == 0) return "";

		// multiply by 4/3 rounded up
		uint256 encodedLen = 4 * ((len + 2) / 3);

		// Add some extra buffer at the end
		bytes memory result = new bytes(encodedLen + 32);

		bytes memory table = TABLE;

		assembly {
			let tablePtr := add(table, 1)
			let resultPtr := add(result, 32)

			for {
				let i := 0
			} lt(i, len) {

			} {
				i := add(i, 3)
				let input := and(mload(add(data, i)), 0xffffff)

				let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
				out := shl(8, out)
				out := add(
					out,
					and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF)
				)
				out := shl(8, out)
				out := add(
					out,
					and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF)
				)
				out := shl(8, out)
				out := add(
					out,
					and(mload(add(tablePtr, and(input, 0x3F))), 0xFF)
				)
				out := shl(224, out)

				mstore(resultPtr, out)

				resultPtr := add(resultPtr, 4)
			}

			switch mod(len, 3)
			case 1 {
				mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
			}
			case 2 {
				mstore(sub(resultPtr, 1), shl(248, 0x3d))
			}

			mstore(result, encodedLen)
		}

		return string(result);
	}
}

```

```solidity

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Helper we wrote to encode in Base64
import "./libraries/Base64.sol";

import 'hardhat/console.sol';

// Our contract inherits from ERC721, which is the standard NFT contract!
contract MyEpicGame is ERC721 {

	struct CharacterAttributes {
		uint characterIndex;
		string name;
		string imageURI;
		uint hp;
		uint maxHp;
		uint attackDamage;
	}

	// The tokenId is the NFTs unique identifier, it's just a number that goes
	// 0, 1, 2, 3, etc.
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	CharacterAttributes[] defaultCharacters;

	// We create a mapping from the nft's tokenId => that NFTs attributes.
	mapping( uint256 => CharacterAttributes ) public nftHolderAttributes;

	// A mapping from an address => the NFTs tokenId. Gives me an ez way
	// to store the owner of the NFT and reference it later.
	mapping( address => uint256 ) public nftHolders;

	constructor(
		string[] memory characterNames,
		string[] memory characterImageURIs,
		uint[] memory characterHp,
		uint[] memory characterAttackDmg

		// Below, you can also see I added some special identifier symbols for our NFT.
		// This is the name and symbol for our token, ex Ethereum and ETH. I just call mine
		// Heroes and HERO. Remember, an NFT is just a token!
	)
		ERC721( "Heroes", "HERO" )
	{
		for ( uint i = 0; i < characterNames.length; i += 1 ) {
			defaultCharacters.push( CharacterAttributes( {
				characterIndex: i,
				name: characterNames[ i ],
				imageURI: characterImageURIs[ i ],
				hp: characterHp[ i ],
				maxHp: characterHp[ i ],
				attackDamage: characterAttackDmg[ i ]
			} ) );

			CharacterAttributes memory c = defaultCharacters[ i ];

			// Hardhat's use of console.log() allows up to 4 parameters in any order of following types: uint, string, bool, address
			console.log( "Done initializing %s w/ HP %s, img %s", c.name, c.hp, c.imageURI );
		}

		// I increment _tokenIds here so that my first NFT has an ID of 1.
		// More on this in the lesson!
		_tokenIds.increment();
	}

	// Users would be able to hit this function and get their NFT based on the
	// characterId they send in!
	function mintCharacterNFT( uint _characterIndex ) external {
		// Get current tokenId (starts at 1 since we incremented in the constructor).
		uint256 newItemId = _tokenIds.current();

		// The magical function! Assigns the tokenId to the caller's wallet address.
		_safeMint( msg.sender, newItemId );

		// We map the tokenId => their character attributes. More on this in
		// the lesson below.
		nftHolderAttributes[ newItemId ] = CharacterAttributes({
			characterIndex: _characterIndex,
			name: defaultCharacters[ _characterIndex ].name,
			imageURI: defaultCharacters[ _characterIndex ].imageURI,
			hp: defaultCharacters[ _characterIndex ].hp,
			maxHp: defaultCharacters[ _characterIndex ].maxHp,
			attackDamage: defaultCharacters[ _characterIndex ].attackDamage
		});

		console.log( "Minted NFT w/ tokenId %s and characterIndex %s", newItemId, _characterIndex );

		// Keep an easy way to see who owns what NFT.
		nftHolders[ msg.sender ] = newItemId;

		// Increment the tokenId for the next person that uses it.
		_tokenIds.increment();
	}

	function tokenURI( uint256 _tokenId ) public view override returns ( string memory ) {
		CharacterAttributes memory charAttributes = nftHolderAttributes[ _tokenId ];

		string memory strHp = Strings.toString( charAttributes.hp );
		string memory strMaxHp = Strings.toString( charAttributes.maxHp );
		string memory strAttackDamage = Strings.toString( charAttributes.attackDamage );

		string memory json = Base64.encode(
			abi.encodePacked(
				'{ "name": "',
					charAttributes.name,
					' -- NFT #: ',
					Strings.toString(_tokenId),
					'", "description": "This is an NFT that lets people play in the game Metaverse Slayer!", "image": "',
					charAttributes.imageURI,
					'", "attributes": [ { "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'}, { "trait_type": "Attack Damage", "value": ',
					strAttackDamage,'} ] }'
			)
		);

		string memory output = string(
			abi.encodePacked( "data:application/json;base64,", json )
		);

		return output;
	}
}

```



### 🤑 Getting some fake $

**Rinkeby Test Network Faucets**
| MyCrypto | <https://app.mycrypto.com/faucet>
| Buildspace | <https://buildspace-faucet.vercel.app/>
| Ethily | <https://ethily.io/rinkeby-faucet/>
| Rinkeby | <https://faucet.rinkeby.io/>



### 🚀 Setup a deploy.js file

```code

const main = async () => {
	const gameContractFactory = await hre.ethers.getContractFactory( 'MyEpicGame' )
	const gameContract = await gameContractFactory.deploy(
		[ "Leo", "Aang", "Pikachu" ],
		[ "https://i.imgur.com/pKd5Sdk.png",
			"https://i.imgur.com/xVu4vFL.png",
			"https://i.imgur.com/u7T87A6.png" ],
		[ 100, 200, 300 ],
		[ 100, 50, 25 ]
	)
	await gameContract.deployed()
	console.log( "Contract deployed to:", gameContract.address )


	let txn
	txn = await gameContract.mintCharacterNFT( 0 )
	await txn.wait()
	console.log( "Minted NFT #1" )

	txn = await gameContract.mintCharacterNFT( 1 )
	await txn.wait()
	console.log( "Minted NFT #2" )

	txn = await gameContract.mintCharacterNFT( 2 )
	await txn.wait()
	console.log( "Minted NFT #3" )

	txn = await gameContract.mintCharacterNFT( 1 )
	await txn.wait()
	console.log( "Minted NFT #4" )

	console.log( "Done deploying and minting!" )

}

```



---




```




```



---

