//	shuffles array, will modify array
export const shuffleArray = ( arr ) => {
	for ( let i = arr.length - 1; i > 0; i-- ) {
		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ arr[ i ], arr[ j ] ] = [ arr[ j ], arr[ i ] ]
	}
	return arr
}



//	random number of items from shuffled array
export const randomFromArray = ( arr, num = 1 ) => {
	return shuffleArray( arr ).slice( 0, num )
}



//	returns true or false with percent => 0 to 1
export const chance = ( percent = .5 ) => {
	return Math.random() >= 1 - percent
}



//	objects has chance property, they add up to 1 making 100%
export const pickOne = ( arr ) => {
	let i = 0
	let r = Math.random()
	while ( r > 0 ) {
		r = r - arr[ i ].chance
		i++
	}
	i--
	return arr[ i ]
}



//	generate alphanumeric code without o, 0, i, l, 1
export const generateCode = ( num ) => {
	return Math.random()
		.toString( 36 )
		.replace( /[o0il1,.]+/g, '' )
		.slice( -num )
}



//	split array into chunks of x size
export const splitToChunks = ( array, size ) => {
	let results = []
	for ( i = 0, j = array.length; i < j; i += size ) {
		results.push( array.slice( i, i + size ) )
	}
	return results
}



//	normalize value from ranges a - b, to ranges a - b
export const normalize = ( value, fromA, fromB, toA, toB ) => {
	return ( value - fromA ) / ( fromB - fromA ) * ( toB - toA ) + toA
}



//	random include min, exclude max
export const getRandom = ( min, max ) => {
	return Math.random() * ( max - min ) + min
}



//	random integers only including min, excluding max
export const getRandomInt = ( min, max ) => {
	min = Math.ceil( min )
	max = Math.floor( max )
	return Math.floor( Math.random() * ( max - min ) ) + min
}



//	random integers only including both min, max
export const getRandomIntInc = ( min, max ) => {
	min = Math.ceil( min )
	max = Math.floor( max )
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}



//	debounce - wait for end of burst events like window resize
export const debounce = ( fn, delay = 100, immediate = true ) => {
	let timer
	return ( ...args ) => {
		const myFn = fn.bind( this, ...args )
		clearTimeout( timer )
		if ( immediate && !timer ) myFn()
		const callFn = immediate ? () => { timer = null } : myFn
		timer = setTimeout( callFn, delay )
	}
}



//	throttle - limit number of checks like scrolling
export const throttle = ( fn, delay = 100, immediate = true ) => {
	let timer
	return ( ...args ) => {
		const myFn = fn.bind( this, ...args )
		if ( timer ) return
		if ( immediate && !timer ) myFn()
		timer = setTimeout( () => {
			if ( !immediate ) myFn()
			timer = null
		}, delay )
	}
}



//	run only once
export const once = ( fn ) => {
	let result
	return ( ...args ) => {
		if ( fn ) {
			result = fn.apply( this, args )
			fn = null
		}
		return result
	}
}



//	wait x millisecond
export const wait = ( amount = 0 ) => {
	return new Promise( resolve => {
		setTimeout( resolve, amount )
	} )
}



//	1000 => 1,000
export const addCommaToNum = ( num ) => {
	return num.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
}



// $( '.item' )
window.$ = document.querySelector.bind( document )

//	$$( '.items' )
window.$$ = document.querySelectorAll.bind( document )

//	$( '.item' ).on( 'click', e => { } )
Node.prototype.on = window.on = function ( name, fn ) {
	this.addEventListener( name, fn )
}

//	nodelist to act like list
NodeList.prototype.__proto__ = Array.prototype
NodeList.prototype.on = NodeList.prototype.addEventListener = function ( name, fn ) {
	this.forEach( function ( elem, i ) {
		elem.on( name, fn )
	} )
}



// deep clone an object
export const deepClone = ( obj ) => {
	return JSON.parse( JSON.stringify( obj ) )
}



// check if a value is empty (null, undefined, '', [], {})
export const isEmpty = ( value ) => {
	return ( value === null || value === undefined ||
		( typeof value === 'string' && value.trim().length === 0 ) ||
		( Array.isArray( value ) && value.length === 0 ) ||
		( typeof value === 'object' && Object.keys( value ).length === 0 ) )
}



// capitalize the first letter of a string
export const capitalize = ( str ) => {
	return str.charAt( 0 ).toUpperCase() + str.slice( 1 )
}



// remove duplicates from an array
export const removeDuplicates = ( arr ) => {
	return [ ...new Set( arr ) ]
}



// check if a date is valid
export const isValidDate = ( date ) => {
	return date instanceof Date && !isNaN( date )
}



// get the difference between two dates in days
export const daysBetween = ( date1, date2 ) => {
	const oneDay = 24 * 60 * 60 * 1000
	return Math.round( Math.abs( ( date1 - date2 ) / oneDay ) )
}



// truncate a string to a specified length
export const truncate = ( str, length, ending = '...' ) => {
	return str.length > length ? str.substring( 0, length - ending.length ) + ending : str
}



// escape HTML special characters
export const escapeHTML = ( str ) => {
	return str.replace( /[&<>"']/g, ( match ) => {
		return {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;'
		}[ match ]
	} )
}



// memoize function
export const memoize = ( fn ) => {
	const cache = new Map()
	return ( ...args ) => {
		const key = JSON.stringify( args )
		if ( cache.has( key ) ) {
			return cache.get( key )
		}
		const result = fn( ...args )
		cache.set( key, result )
		return result
	}
}



// average of an array of numbers
export const getAverage = ( numbers ) => {
	return numbers.reduce( ( sum, num ) => sum + num, 0 ) / numbers.length
}



// convert RGB to HEX
export const rgbToHex = ( r, g, b ) => {
	return "#" + ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString( 16 ).slice( 1 )
}



// convert HEX to RGB
export const hexToRgb = ( hex ) => {
	hex = hex.replace( /^#/, '' )
	const bigint = parseInt( hex, 16 )
	const r = ( bigint >> 16 ) & 255
	const g = ( bigint >> 8 ) & 255
	const b = bigint & 255
	return { r, g, b }
}



// generate a random UUID (v4 uuid standard)
export const generateUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, ( c ) => {
		const r = Math.random() * 16 | 0
		const v = c === 'x' ? r : ( r & 0x3 | 0x8 )
		return v.toString( 16 )
	} )
}



// retry a function with delay
export const retry = async ( fn, maxAttempts = 3, delay = 1000 ) => {
	for ( let attempt = 1; attempt <= maxAttempts; attempt++ ) {
		try {
			return await fn()
		} catch ( error ) {
			if ( attempt === maxAttempts ) throw error
			await new Promise( resolve => setTimeout( resolve, delay ) )
		}
	}
}



// flatten a nested array
export const flattenArray = ( arr ) => {
	return arr.reduce( ( flat, toFlatten ) => {
		return flat.concat( Array.isArray( toFlatten ) ? flattenArray( toFlatten ) : toFlatten )
	}, [] )
}



// generate a private/public key pair
export const generateKeyPair = async () => {
	const keyPair = await window.crypto.subtle.generateKey(
		{
			name: "RSA-OAEP",
			modulusLength: 2048,
			publicExponent: new Uint8Array( [ 1, 0, 1 ] ),
			hash: "SHA-256",
		},
		true,
		[ "encrypt", "decrypt" ]
	)

	return keyPair
}



// encrypt a message with the public key
export const encrypt = async ( message, publicKey ) => {
	const encoder = new TextEncoder()
	const data = encoder.encode( message )

	const encryptedData = await window.crypto.subtle.encrypt(
		{
			name: "RSA-OAEP"
		},
		publicKey,
		data
	)

	return encryptedData
}



// decrypt a message with the private key
export const decrypt = async ( encryptedData, privateKey ) => {
	const decryptedData = await window.crypto.subtle.decrypt(
		{
			name: "RSA-OAEP"
		},
		privateKey,
		encryptedData
	)

	const decoder = new TextDecoder()
	return decoder.decode( decryptedData )
}



// generate a digital signature
export const signMessage = async ( message, privateKey ) => {
	const encoder = new TextEncoder()
	const data = encoder.encode( message )

	const signature = await window.crypto.subtle.sign(
		{
			name: "RSA-PSS",
			saltLength: 32,
		},
		privateKey,
		data
	)

	return new Uint8Array( signature )
}



// verify a digital signature
export const verifySignature = async ( message, signature, publicKey ) => {
	const encoder = new TextEncoder()
	const data = encoder.encode( message )

	return await window.crypto.subtle.verify(
		{
			name: "RSA-PSS",
			saltLength: 32,
		},
		publicKey,
		signature,
		data
	)
}



// hash a message
export const hashMessage = async ( message ) => {
	const encoder = new TextEncoder()
	const data = encoder.encode( message )

	const hashBuffer = await window.crypto.subtle.digest( 'SHA-256', data )

	// convert buffer to hex string
	const hashArray = Array.from( new Uint8Array( hashBuffer ) )
	const hashHex = hashArray.map( b => b.toString( 16 ).padStart( 2, '0' ) ).join( '' )

	return hashHex
}



// pipe functions (left to right)
export const pipe = ( ...fns ) => x => fns.reduce( ( acc, fn ) => fn( acc ), x )



// delay/sleep utility using promises
export const delay = ms => new Promise( resolve => setTimeout( resolve, ms ) )



// group array of objects by key
export const groupBy = ( array, key ) => {
	return array.reduce( ( result, item ) => {
		( result[ item[ key ] ] = result[ item[ key ] ] || [] ).push( item )
		return result
	}, {} )
}



// format number as currency
export const formatCurrency = ( number, currency = 'USD', locale = 'en-US' ) => {
	return new Intl.NumberFormat( locale, {
		style: 'currency',
		currency: currency
	} ).format( number )
}



// validate email address
export const isValidEmail = ( email ) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test( email )
}



// get query parameters from URL
export const getQueryParams = ( url = window.location.href ) => {
	const params = {}
	const queryString = url.split( '?' )[ 1 ]

	if ( !queryString ) return params

	queryString.split( '&' ).forEach( param => {
		const [ key, value ] = param.split( '=' )
		params[ decodeURIComponent( key ) ] = decodeURIComponent( value || '' )
	} )

	return params
}



// debounced version of a function that runs on RAF
export const rafDebounce = ( fn ) => {
	let requestId = null

	return ( ...args ) => {
		if ( requestId ) {
			cancelAnimationFrame( requestId )
		}

		requestId = requestAnimationFrame( () => {
			fn.apply( this, args )
		} )
	}
}



// get the time difference between two dates in human readable format
export const getTimeDiff = ( startDate, endDate ) => {
	const diff = Math.abs( endDate - startDate )
	const units = {
		year: 31536000000,
		month: 2628000000,
		day: 86400000,
		hour: 3600000,
		minute: 60000,
		second: 1000
	}

	for ( const [ unit, ms ] of Object.entries( units ) ) {
		if ( diff >= ms ) {
			const value = Math.floor( diff / ms )
			return `${ value } ${ unit }${ value !== 1 ? 's' : '' }`
		}
	}
	return 'just now'
}



// detect if device is touch-enabled
export const isTouchDevice = () => {
	return ( ( 'ontouchstart' in window ) ||
		( navigator.maxTouchPoints > 0 ) ||
		( navigator.msMaxTouchPoints > 0 ) )
}



// median of an array of numbers
export const getMedian = ( numbers ) => {
	const sorted = [ ...numbers ].sort( ( a, b ) => a - b )
	const middle = Math.floor( sorted.length / 2 )

	if ( sorted.length % 2 === 0 ) {
		return ( sorted[ middle - 1 ] + sorted[ middle ] ) / 2
	}

	return sorted[ middle ]
}



// camelCase to kebab-case
export const camelToKebab = ( str ) => {
	return str.replace( /([a-z0-9])([A-Z])/g, '$1-$2' )
		.replace( /([A-Z])([A-Z])(?=[a-z])/g, '$1-$2' )
		.toLowerCase()
}



// kebab-case to camelCase
export const kebabToCamel = ( str ) => {
	return str.replace( /-([a-z0-9])/g, ( match, group ) =>
		group.toUpperCase()
	)
}



// convert a string to snake_case
export const toSnakeCase = ( str ) => {
	return str.replace( /\W+/g, ' ' )
		.split( / |\B(?=[A-Z])/ )
		.map( word => word.toLowerCase() )
		.join( '_' )
}



