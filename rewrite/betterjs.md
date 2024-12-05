```js

//	const x = () => ( { } ) returns an object

const talker = ( state ) => ( {
	talk() { console.log( `${ state.name } is talking` ) }
} )

const walker = ( state ) => ( {
	walk() { console.log( `${ state.name } is walking` ) }
} )

const Person = ( name ) => {
	const state = {
		name
	}

	return {
		...talker( state ),
		...walker( state ),
	}
}

const kelvin = Person( 'kelvin' )
kelvin.talk() // kelvin is talking
kelvin.walk() // kelvin is walking

;```



---

```js

// optional chaining
const person = {
	address: {
		street: '123'
	}
}

// checks if person exists
// then checks if address exists
// then gets street
// returns undefined if any is missing
// prevents code breaking when part of person.address.street is missing
console.log( person?.address?.street )

// works with functions or arrays too
person.talk?.()
person.hobbies?.[ 0 ]
person.hobbies?.[ 0 ].toLowerCase()

;```



---

```js

// better way of looping objects
for ( const [ key, value ] of Object.entries( myObj ) ) {

}

;```



---

```js

const memoize = fn => ( ( cache = {} ) => arg => cache[ arg ] || ( cache[ arg ] = fn( arg ) ) )()

// count fibonacci
const fibo = memoize( n => n <= 2 ? 1 : fibo( n - 1 ) + fibo( n - 2 ) )

fib( 1 ) // 1
fib( 2 ) // 1
fib( 3 ) // 2
fib( 4 ) // 3
fib( 5 ) // 5
fib( 6 ) // 8

;```



---

# this || that

```js

if ( team === 'japan' || team === 'singapore' ) {
	// do something
}

if ( [ 'japan', 'singapore' ].includes( team ) ) {
	// do something
}

;```



---

# if, elseif

```js

let settings
if ( team === 'japan' ) {
	settings = 'x'
} else if ( team === 'singapore' ) {
	settings = 'y'
}

let settings = team => {
	return {
		japan: 'x',
		singapore: 'y',
	}[ team ]
}

;```



---

# full example

```js

const teams = [
	{
		country: 'japan',
		players: [
			{
				score: 165,
			},
			{
				score: 147,
			},
		]
	},
	{
		country: 'england',
		players: [
			{
				score: 185,
			},
			{
				score: 752,
			},
		]
	},
	{
		country: 'singapore',
		players: [
			{
				score: 144,
			},
			{
				score: 152,
			},
		]
	},
]

let total = 0
for ( const team of teams ) {
	if ( team.country === 'japan' || team.country === 'singapore' ) {
		for ( const player of team.players ) {
			total += player.score
		}
	}
}
console.log( total )

let newTotal = teams
				.filter( team => [ 'japan', 'singapore' ].includes( team.country ) )
				.flatMap( team => team.players )
				.reduce( ( acc, val ) => acc + val.score, 0 )

console.log( newTotal )

;```



---

# hash

```js

// window.addEventListener( 'hashchange', useHash )
// window.addEventListener( 'load', useHash )

[ 'hashchange', 'load' ].forEach( e => window.addEventListener( e, useHash ) )

const userHash = () => {
	const id = window.location.hash.replace( '#', '' )
}

;```



---

# standardisation

```js

const newIngredients = this.ingredients.map( el => {
	//	uniform units
	let ingredient = el.toLowerCase()
	unitsLong.forEach( ( unit, i ) => {
		ingredient = ingredient.replace( unit, unitsShort[ i ] )
	} )

	//	remove parentheses ()
	ingredient = ingredient.replace( / *\([^]*\) */g, ' ' )

	//	parse ingredients into count, unit, ingredients
	const arrIng = ingredient.split( ' ' )
	const unitIndex = arrIng.findIndex( el2 => unitsShort.includes( el2 ) )

	let objIng
	if ( unitIndex > -1 ) {
		//	there is a unit found
		//	eg. 4 1/2 cups, arrCount is [ 4, 1/2 ]
		//	eg. 4 cups, arrCount is [ 4 ]
		const arrCount = arrIng.slice( 0, unitIndex )

		let count
		if ( arrCount.length === 1 ) {
			// 	count = arrIng[ 0 ]	// normal case
			//	for edge case -> 1-1/2 cups
			count = eval( arrIng[ 0 ].replace( '-', '+' ) )
		} else {
			//	eval( '4+1/2' ) => 4.5
			count = eval( arrIng.slice( 0, unitIndex ).join( '+' ) )
		}

		objIng = {
			count,
			unit: arrIng[ unitIndex ],
			ingredient: arrIng.slice( unitIndex + 1 ).join( ' ' )
		}
	} else if ( parseInt( arrIng[ 0 ], 10 ) ) {
		//	take first el, try to convert to num, if converts, if statement turns true
		//	there is no unit found, but 1st element is a number
		objIng = {
			count: parseInt( arrIng[ 0 ], 10 ),
			unit: '',
			ingredient: arrIng.slice( 1 ).join( ' ' )
		}
	} else if ( unitIndex === -1 ) {
		//	there is no unit found
		objIng = {
			count: 1,
			unit: '',
			ingredient
		}
	}

	return objIng
} )

;```

---

# event delegation

for items that are not on the dom yet on load but dynamically added
you can add event listeners to a parent node that is constant
match or closest from the parent to find the event there



---

# async/await with error handling:

```js

const asyncWrapper = async ( promise ) => {
	try {
		const data = await promise
		return [ data, null ]
	} catch ( error ) {
		return [ null, error ]
	}
}

// Usage
const getData = async () => {
	const [ data, error ] = await asyncWrapper( fetch( `api/data` ) )

	if ( error ) {
		console.log( `Error:`, error )
		return
	}

	// Use data safely
	console.log( data )
}

;```


---

# proxy for validation:

```js

const validator = {
	set( obj, prop, value ) {
		if ( prop === `age` ) {
			if ( !Number.isInteger( value ) ) {
				throw new TypeError( `Age must be an integer` )
			}
			if ( value < 0 || value > 120 ) {
				throw new RangeError( `Age must be between 0 and 120` )
			}
		}

		obj[ prop ] = value
		return true
	}
}

const person = new Proxy( {}, validator )

// Usage
person.age = 30 // Works
person.age = -1 // Throws RangeError
person.age = `young` // Throws TypeError

;```



---

# currying

```js

const curry = ( fn ) => {
return function curried( ...args ) {
		if ( args.length >= fn.length ) {
			return fn.apply( this, args )
		} else {
			return function( ...nextArgs ) {
				return curried.apply( this, args.concat( nextArgs ) )
			}
		}
	}
}

// Usage
const add = ( a, b, c ) => a + b + c
const curriedAdd = curry( add )
console.log( curriedAdd( 1 )( 2 )( 3 ) ) // 6

;```



---

---
