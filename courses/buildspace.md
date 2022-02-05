


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




```



---

