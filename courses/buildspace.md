


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
