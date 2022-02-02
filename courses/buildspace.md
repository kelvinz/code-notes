


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


```



---

