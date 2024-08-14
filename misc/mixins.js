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


}
