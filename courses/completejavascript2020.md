


<https://www.udemy.com/course/the-complete-javascript-course/>



# 01 - Welcome, Welcome, Welcome!



---



# 02 - JavaScript Fundamentals Part 1



---



# 03 - JavaScript Fundamentals Part 2



---



# 04 - How to Navigate This Course



---



# 05 - Developer Skills & Editor Setup



---



# 06 - HTML & CSS Crash Course



---



# 07 - JavaScript in the Browser: DOM & Events Fundamentals



---



# 08 - How JavaScript Works Behind the Scenes



---



# 09 - Data Structures, Modern Operators & Strings



---



# 10 - A Closer Look at Functions



## Section Intro
## Section Roadmap
## Default Parameters

```js

const bookings = []

const createBooking = ( flightNum, numPassengers = 1, price = 199 * numPassengers ) => {
	// old way of setting default parameters
	// numPassengers = numPassengers || 1
	// price = price || 199
	const booking = {
		price,
		flightNum,
		numPassengers,
	}
	console.log( booking )
	bookings.push( booking )
}

createBooking( 'LH123' )
// { price: 199, flightNum: "LH123", numPassengers: 1 }

createBooking( 'LH123', 2 )
// { price: 398, flightNum: "LH123", numPassengers: 2 }

// skip 2nd parameter
createBooking( 'LH123', undefined, 1000 )
// { price: 1000, flightNum: "LH123", numPassengers: 1 }

;```



## How Passing Arguments Works: Value vs Reference

```js

const flight = 'LH234'
const jonas = {
	name: 'Jonas Schedtmann',
	passport: 123456789,
}

const checkIn = ( flightNum, passenger ) => {
	flightNum = 'LH999'
	passenger.name = 'Mr ' + passenger.name

	if ( passenger.passport === 123456789 ) {
		console.log( 'checked in' )
	} else {
		console.log( 'wrong passport' )
	}
}

checkIn( flight, jonas ) // checked in
console.log( flight ) // LH1234
console.log( jonas ) // { name: 'Mr Jonas Schedtmann', passport: 123456789 }

const newPassport = ( person ) => {
	person.passport = Math.trunc( Math.random() * 1000000 )
}

newPassport( jonas )
checkIn( flight, jonas ) // wrong passport

;```



## First-Class & Higher-Order Functions

**first-class functions**

- JavaScript treats functions as first-class citizens
- this means that functions are simply values
- functions are just another type of object



**higher-order functions**

- a function that
	- receives another function as an argument
	- that returns a new function
	- or both
- this is only possible because of first-class functions



## Functions Accepting Callback Functions

```js

const oneWord = ( str ) => {
	return str.replace( / /g, '' ).toLowerCase()
}

const upperFirstWord = ( str ) => {
	const [ first, ...others ]= str.split( ' ' )
	return [ first.toUpperCase(), ...others ].join( ' ' )
}

const transformer = ( str, fn ) => {
	console.log( str )
	console.log( `${ fn( str ) }` )
	console.log( `transformed by ${ fn.name }` )
}

transformer( 'JavaScript is the best!', oneWord )
// JavaScript is the best!
// javascriptisthebest!
// transformed by oneWord

transformer( 'JavaScript is the best!', upperFirstWord )
// JavaScript is the best!
// JAVASCRIPT is the best!
// transformed by upperFirstWord

;```



## Functions Returning Functions

```js

const greet = ( greeting ) => {
	return ( name ) => {
		console.log( `${ greeting } ${ name }` )
	}
}

const greetHey = greet( 'Hey' )
greetHey( 'Jonas' ) // Hey Jonas

greet( 'Hello' )( 'Steven' ) // Hello Steven

const greetArrow = gretting => name => console.log( `${ greeting } ${ name }` )
greetArrow( 'Hello' )( 'Jonas' ) // Hello Jonas

;```



## The Call & Apply Methods

```js

const sia = {
	airline: 'Singapore Airlines',
	code: 'SIA',
	bookings: [],
	book( flightNum, name ) {
		console.log( `${ name } booked a seat on ${ this.airline } ${ this.code } ${ flightNum }` )
		this.bookings.push( { flight: `${ this.code } ${ flightNum }`, name } )
	},
}

sia.book( 239, 'Jonas' )
// Jonas booked a seat on Singapore Airlines SIA 239

const eva = {
	airline: 'EVA Air',
	code: 'EVA',
	bookings: [],
}

const book = sia.book

// book( 23, 'Sarah' )
// error

book.call( eva, 23, 'Sarah' )
// Sarah booked a seat on EVA Air EVA 23

book.apply( eva, [ 123, 'John' ] )
// John booked a seat on EVA Air EVA 123

;```



## The Bind Method

```js

const bookEva = book.bind( eva )
bookEva( 987, 'Williams' )
// Williams booked a seat on EVA Air EVA 987

const bookEva23 = book.bind( eva, 23 )
bookEva23( 'Peggy' )
// Peggy booked a seat on EVA Air EVA 23



sia.planes = 300
sia.buyPlane = function() {
	this.planes++
	console.log( this.planes )
}

document.querySelector( '.buy' ).addEventListener( 'click', sia.buyPlane.bind( sia ) )
// 301



// partial application
const addTax = ( rate, value ) => value + value * rate
console.log( addTax( .1, 200 ) ) // 220

const addGST = addTax.bind( null, .07 )
console.log( addGST( 100 ) ) // 107

const addTaxRate = ( rate ) => {
	return ( value ) => {
		return value + value * rate
	}
}

const addGST2 = addTaxRate( .07 )
console.log( addGST2( 100 ) ) // 107

;```



## Coding Callenge #1

```js

const poll = {
	question: 'What is your fav coding lang?',
	options: [ '0: JS', '1: Python', '2: C++', '3: Ruby' ],
	answers: new Array( 4 ).fill( 0 ),
	registerNewAnswer() {
		const answer = Number(
			prompt(
				`${ this.question }\n${ this.options.join( '\n' ) }\n(Write no.)`
			)
		)
		console.log( answer )
		typeof answer === 'number' && answer < this.answers.length && this.answers[ answer ]++
		console.log( this.answers )
		this.displayResults()
		this.displayResults( 'string' )
	},
	displayResults( type = 'array' ) {
		if ( type === 'array' ) {
			console.log( this.answers )
		} else if ( type === 'string' ) {
			console.log( `Poll results are ${ this.answers.join( ', ' ) }` )
		}
	}
}

poll.registerNewAnswer()
// document.querySelector( '.poll' ).addEventListener( 'click', poll.registerNewAnswer.bind( poll ) )

poll.displayResults.call( { answers: [ 5, 2, 3 ] } )

;```



## Immediately Invoked Function Expressions ( IIFE )

```js

// used to keep scope private
(
	() => console.log( 'this will never run again' )
	const isPrivate = 23
)()
// this will never run again
console.log( isPrivate ) // not defined


// es6 has block scoped so iife not used that often anymore
{
	const isPrivate = 23
	var notPrivate = 32
}
console.log( isPrivate ) // not defined
console.log( notPrivate ) // 32

;```



## Closures

```js

const secureBooking = () => {
	let passengerCount = 0

	return () => {
		passengerCount++
		console.log( `${ passengerCount }` )
	}
}

const booker = secureBooking()
booker()
// 1
booker()
// 2
booker()
// 3

;```



## More Closure Examples

```js

let f

const g = () => {
	const a = 23
	f = () => {
		console.log( a * 2 )
	}
}

const h = () => {
	const b = 777
	f = () => {
		console.log( b * 2 )
	}
}

g()
f()
// 46
// console.dir( f )s

h()
f()
// 1554
// console.dir( f )



const boardPassengers = ( n, wait ) => {
	const perGroup = n / 3
	setTimeout( () => {
		console.log( `we are now boarding all ${ n } passengers` )
		console.log( `there are 3 groups, each with ${ perGroup } passengers` )
	}, wait * 1000 )
	console.log( `will start boarding in ${ wait } seconds` )
}

const perGroup = 1000 // closure has priority over this global var
boardPassengers( 180, 3 )
// will start boarding in 3 seconds
// ...
// we are now boarding all 180 passengers
// there are 3 groups, each with 60 passengers

;```



## Coding Challenge #2

```js

(
	() => {
		const header = document.querySelector( 'h1' )
		header.style.color = 'red'

		document.querySelector( 'body' ).addEventListener( 'click', () => {
			header.style.color = 'blue'
		} )
	}
)

;```



---



# 11 - Working With Arrays



## Section Intro
## Section Roadmap
## Simple Array Methods

```js

let arr = [ 'a', 'b', 'c', 'd', 'e' ]

// slice
// returns a new array
// ( start, end position )
console.log( arr.slice( 2 ) ) // [ 'c', 'd', 'e' ]
console.log( arr.slice( 2, 4 ) ) // [ 'c', 'd' ]
console.log( arr.slice( -2 ) ) // [ 'd', 'e' ]
console.log( arr.slice( -1 ) ) // [ 'e' ]
console.log( arr.slice( 1, -2 ) ) // [ 'b', 'c' ]
console.log( arr.slice() ) // [ 'a', 'b', 'c', 'd', 'e' ]
console.log( [ ...arr ] ) // [ 'a', 'b', 'c', 'd', 'e' ]
console.log( arr ) // [ 'a', 'b', 'c', 'd', 'e' ]



// splice
// mutates original array
// ( start, no. to delete )
let arr = [ 'a', 'b', 'c', 'd', 'e' ]
console.log( arr.splice( 2 ) ) // [ 'c', 'd', 'e' ]
console.log( arr ) // [ 'a', 'b' ]
arr = [ 'a', 'b', 'c', 'd', 'e' ]
console.log( arr.splice( -1 ) ) // [ 'e' ]
arr = [ 'a', 'b', 'c', 'd', 'e' ]
console.log( arr.splice( 1, 2 ) ) // [ 'b', 'c' ]



// reverse
// mutates original array
arr = [ 'a', 'b', 'c', 'd', 'e' ]
console.log( arr.reverse() ) // [ 'e', 'd', 'c', 'b', 'a' ]
console.log( arr )  // [ 'e', 'd', 'c', 'b', 'a' ]



// concat
// returns new array
let arr1 = [ 'a', 'b' ]
let arr2 = [ 'c', 'd' ]
console.log( console.log( arr1.concat( arr2 ) ) ) // [ 'a', 'b', 'c', 'd' ]
console.log( console.log( [ ...arr1, ...arr2 ] ) ) // [ 'a', 'b', 'c', 'd' ]



// join
// returns new string
arr = [ 'a', 'b', 'c', 'd', 'e' ]
console.log( arr.join() ) // a,b,c,d,e
console.log( arr.join( '' ) ) // abcde
console.log( arr.join( '-' ) ) // a-b-c-d-e

;```



## Looping Arrays: forEach

```js

const movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]

// for ( const [ i, movement ] of movements.entries() ) {
for ( const movement of movements ) {
	if ( movement > 0 ) {
		console.log( `You deposited ${ movement }` )
	} else {
		console.log( `You withdrew ${ Math.abs( movement ) }` )
	}
}

// movements.forEach( ( movement, i, arr ) => {
movements.forEach( ( movement ) => {
	if ( movement > 0 ) {
		console.log( `You deposited ${ movement }` )
	} else {
		console.log( `You withdrew ${ Math.abs( movement ) }` )
	}
} )

;```



## forEach With Maps & Sets

```js

const currencies = new Map( [
	[ 'usd', 'united states dollar' ],
	[ 'eur', 'euro' ],
	[ 'gbp', 'pound sterling' ],
] )

currencies.forEach( ( value, key, map ) => {
	console.log( `${ key }: ${ value}` )
} )
// usd: united states dollar
// eur: euro
// gbp: pound sterling



const currenciesUnique = new Set( [ 'usd', 'gbp', 'usd', 'eur', 'eur' ] )
currenciesUnique.forEach( ( value, _, map ) => {
	console.log( `${ value }: ${ _ }` )
} )
// usd: usd
// gbp: gbp
// eur: eur

;```



## Project: 'Bankist' App
## Creating DOM Elements
## Coding Challenge #1

```js

const checkDogs = ( dogsJulia, dogsKate ) => {
	// julia's first & last 2 are not dogs
	const dogsJuliaCorrected = dogsJulia.slice()
	dogsJuliaCorrected.splice( 0, 1 )
	dogsJuliaCorrected.splice( -2 )

	// collect all dogs
	const dogs = dogsJuliaCorrected.concat( dogsKate )

	// check each
	dogs.forEach( ( dog, i ) => {
		if ( dog >= 3 ) {
			console.log( `Dog number ${ i } is an adult at ${ dog } years old.` )
		} else {
			console.log( `Dog number ${ i } is still a puppy at ${ dog } years old.` )
		}
	} )
}

checkDogs( [ 3, 5, 2, 12, 7 ], [ 4, 1, 15, 8, 3 ] )

;```



## Data Transformations: Map, Filter, Reduce

```js

// map
// returns new arr
[ 🐮, 🥔, 🐔, 🌽 ].map( cook ) = [ 🍔, 🍟, 🍗, 🍿 ]

// filter
// returns new arr
[ 🍔, 🍟, 🍗, 🍿 ].filter( isVegetarian ) = [ 🍟, 🍿 ]

// reduce
// returns single output
[ 🍔, 🍟, 🍗, 🍿 ].reduce( eat ) = [ 💩 ]

;```



## The Map Method

```js

const eurToUsd = 1.1

// convert movements from euro to usd
movements.map( m => m * eurToUsd )

;```



## Computing Usernames

```js

const user = 'Steven Thomas Williams'
const username = user.toLowerCase().split( ' ' ).map( name => name[ 0 ] ).join( '' )
// stw

const createUserNames = accs => {
	accs.forEach( acc => {
		acc.username = acc.owner
			.toLowerCase()
			.split( ' ' )
			.map( name => name[ 0 ] )
			.join( '' )
	} )
}

createUserNames( accounts )

;```



## The Filter Method

```js

// filter
const deposits = movements.filter( mov => mov > 0 )

// for loop
const depositsFor = []
for ( const mov of movements ) if ( mov > 0 ) depositesFor.push( mov )

;```



## The Reduce Method

```js

const movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]

const balance = movements.reduce( ( acc, cur, i, arr ) => {
	console.log( i, acc )
	return acc + cur
}, 0 )
// 0 0
// 1 200
// 2 650
// 3 250
// 4 3250
// 5 2600
// 6 2470
// 7 2540



const max = movements.reduce( ( acc, mov ) => {
	if ( acc > mov ) return acc
	else return mov
}, movements[ 0 ] )
// 3000

;```



## Coding Challenge #2

```js

const calcAverageHumanAge = ( ages ) => {
	const humanAges = ages.map( age => age <= 2 ? 2 * age : 16 + age * 4 )
	const adults = humanAges.filter( age => age >= 18 )
	// const average = adults.reduce( ( acc, age ) => acc + age, 0 )  / adults.length
	const average = adults.reduce( ( acc, age, i, arr ) => acc + age / arr.length, 0 )
	return average
}

console.log( calcAverageHumanAge( [ 5, 2, 4, 1, 15, 8, 3 ] ) )
// 44

;```



## The Magic of Chaining Methods

```js

const eurToUsd = 1.1
const totalDepositsUSD = movements
		.filter( mov => mov > 0 )
		.map( mov => mov * eurToUsd )
		.reduce( ( acc, mov ) => acc + mov, 0 )

;```



## Coding Challenge #3

```js

const calcAverageHumanAge = ( ages ) =>
	ages
	.map( age => age <= 2 ? 2 * age : 16 + age * 4 )
	.filter( age => age >= 18 )
	.reduce( ( acc, age, i, arr ) => acc + age / arr.length, 0 )

console.log( calcAverageHumanAge( [ 5, 2, 4, 1, 15, 8, 3 ] ) )
// 44


;```



## The Find Method

```js

const movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]

// returns the first el that satisfy the condition
const firstWithdrawal = movements.find( mov => mov < 0 )
console.log( firstWithdrawal )
// -400

;```



## Implementing Login
## Implementing Transfers
## The findIndex Method

```js

btnClose.addEventListener( 'click', e => {
	e.preventDefault()

	if ( inputCloseUsername.value !== currentAccount.username ) return
	if ( Number( inputClosePin.value ) !== currentAccount.pin ) return

	const index = accounts.findIndex( acc => acc.username === currentAccount.username )
	accounts.splice( index, 1 )
	containerApp.style.opacity = 0
} )

;```



## Some & Every

```js

const movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]

// includes
// has value
console.log( movements.includes( -130 ) ) // true

// some
// more flexible, use any condition to test
console.log( movements.some( mov => mov > 0 ) ) // true
console.log( movements.some( mov => mov > 5000 ) ) // false

// every
// true if every el pass condition
console.log( movements.every( mov => mov > 0 ) ) // false



// reuse checking function
const deposit = mov => mov > 0
console.log( movements.some( deposit ) )
console.log( movements.every( deposit ) )
console.log( movements.filter( deposit ) )

;```



## Flat & flatMap

```js

// nested array
const arr = [ [ 1, 2, 3 ], [ 4, 5, 6 ], 7, 8 ]
console.log( arr.flat() ) // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

// deep nested array
// add depth value, defaults is 1
const arr2 = [ [ [ 1, 2 ], 3 ], [ 4, [ 5, 6 ] ], 7, 8 ]
console.log( arr2.flat() ) // [ Array(2), 3, 4, Array(2), 7, 8 ]
console.log( arr2.flat( 2 ) ) // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

// flatmap
// flat then map
const overallBalance = accounts
	.map( acc => acc.movements )
	.flat()
	.reduce( ( acc, mov ) => acc + mov, 0 )

const overallBalance = accounts
	.flatMap( acc => acc.movements )
	.reduce( ( acc, mov ) => acc + mov, 0 )

;```



## Sorting Arrays

```js

// sort alphabetically
// mutates original arr
const owners = [ 'Jonas', 'Zach', 'Adam', 'Martha' ]
console.log( owners.sort() ) // [ 'Adam', 'Jonas', 'Martha', 'Zach' ]
console.log( owners ) // [ 'Adam', 'Jonas', 'Martha', 'Zach' ]



const movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]

// return < 0 ---> a, b
// return > 0 ---> b, a

movements.sort( ( a, b ) => a > b ? 1 : -1 )
// [ -650, -400, -130, 70, 200, 450, 1300, 3000 ]
movements.sort( ( a, b ) => a - b )
// [ -650, -400, -130, 70, 200, 450, 1300, 3000 ]



// to not affect orginal arr
movements.slice().sort( ( a, b ) => a - b )

;```



## More Ways of Creating & Filtering Arrays

```js

const x = new Array( 7 )
console.log( x ) // [ empty × 7 ]

// fill
console.log( x.fill( 1, 3, 5 ) ) // [ empty × 3, 1, 1, empty × 2 ]
console.log( x.fill( 1 ) ) // [ 1, 1, 1, 1, 1, 1, 1 ]



// Array.from
const y = Array.from( { length: 7 }, () => 1 )
console.log( y ) // [ 1, 1, 1, 1, 1, 1, 1 ]
// 2nd param is a callback fn
const z = Array.from( { length: 7 }, ( cur, i ) => i + 1 )
console.log( z ) // [ 1, 2, 3, 4, 5, 6, 7 ]

// nodelist to array
const movementUI = Array.from( document.querySelectorAll( '.movement__value' ) )

// chain with callback like a map fn
const movementUI = Array.from( document.querySelectorAll( '.movement__value' ), ( el ) => {
	Number( el.textContent.replace( '$', '' ) )
} )

;```



## Summary: Which Array Method to Use?

```js

/*	to mutate original array
------------------- */

// add to original
.push // to end
.unshift // to start

// remove from original
.pop // from end
.shift // from start
.splice // from any

// others
.reverse
.sort
.fill



/*	to a new array
------------------- */
// from original
.map // loop

// filter using condition
.filter

// portion of original
.slice

// adding original to another
.concat

// flatten original
.flat
.flatMap



/*	an array index
------------------- */
// based on value
.indexOf

// based on test condition
.findIndex



/*	an array element
------------------- */
// based on test condition
.find



/*	know if array includes
------------------- */

// basd on value
.includes

// based on test condition
.some
.every



/*	a new string
------------------- */

// based on a sseparator
.join



/*	to transform to value
------------------- */

// based on accumulator
.reduce // boil to single value



/*	to just loop array
------------------- */

// based on callback
.forEach // does not create new array

;```



## Coding Challenge #4

```js

const dogs = [
	{ weight: 22, curFood: 250, owners: [ 'Alice', 'Bob' ] },
	{ weight: 8, curFood: 200, owners: [ 'Matilda' ] },
	{ weight: 13, curFood: 275, owners: [ 'Sarah', 'John' ] },
	{ weight: 32, curFood: 340, owners: [ 'Michael' ] },
]



/*	1.
------------------- */
dogs.forEach( dog => dog.recFood = Math.trunc( dog.weight ** .75 * 28 ) )
console.log( dogs )
// { weight: 22, curFood: 250, owners: Array(2), recFood: 284 }
// { weight: 8, curFood: 200, owners: Array(1), recFood: 133 }
// { weight: 13, curFood: 275, owners: Array(2), recFood: 191 }
// { weight: 32, curFood: 340, owners: Array(1), recFood: 376 }



/*	2
------------------- */
const dogSarah = dogs.find( dog => dog.owners.includes( 'Sarah' ) )
console.log( dogSarah )
// { weight: 13, curFood: 275, owners: Array(2), recFood: 191 }
console.log( `Sarah's dog is eating too ${ dogSarah.curFood > dogSarah.recFood ? 'much' : 'little' }!` )
// Sarah's dog is eating too much!



/*	3
------------------- */
const ownersEatTooMuch = dogs
	.filter( dog => dog.curFood > dog.recFood )
	// .map( dog => dog.owners )
	// .flat()
	.flatMap( dog => dog.owners )
console.log( ownersEatTooMuch )
// [ 'Matilda', 'Sarah', 'John' ]

const ownersEatTooLittle = dogs
	.filter( dog => dog.curFood < dog.recFood )
	.flatMap( dog => dog.owners )
console.log( ownersEatTooLittle )
// [ 'Alice', 'Bob', 'Michael' ]



/*	4
------------------- */
console.log( `${ ownersEatTooMuch.join( ' and ' ) }'s dogs eat too much!` )
console.log( `${ ownersEatTooLittle.join( ' and ' ) }'s dogs eat too little!` )
// Matilda and Sarah and John's dogs eat too much!
// Alice and Bob and Michael's dogs eat too little!



/*	5
------------------- */
console.log( dogs.some( dog => dog.curFood === dog.recFood ) )
// false
// there are no dogs eating exactly the recommended amount of food



/*	6
------------------- */
const checkEatingOkay = ( dog ) => dog.curFood > dog.recFood * .9 && dog.curFood < dog.recFood * 1.1
console.log( dogs.some( checkEatingOkay ) ) // true



/*	7
------------------- */
console.log( dogs.filter( checkEatingOkay ) )
// { weight: 32, curFood: 340, owners: [ 'Michael' ], recFood: 376 }



/*	8
------------------- */
const dogFoodAscending = dogs.slice().sort( ( a, b ) => a.recFood - b.recFood )
console.log( dogFoodAscending )
// { weight: 8, curFood: 200, owners: Array(1), recFood: 133 }
// { weight: 13, curFood: 275, owners: Array(2), recFood: 191 }
// { weight: 22, curFood: 250, owners: Array(2), recFood: 284 }
// { weight: 32, curFood: 340, owners: Array(1), recFood: 376 }

const dogFoodDescending = dogs.slice().sort( ( a, b ) => b.recFood - a.recFood )
console.log( dogFoodDescending )
// { weight: 32, curFood: 340, owners: Array(1), recFood: 376 }
// { weight: 22, curFood: 250, owners: Array(2), recFood: 284 }
// { weight: 13, curFood: 275, owners: Array(2), recFood: 191 }
// { weight: 8, curFood: 200, owners: Array(1), recFood: 133 }

;```



---



# 12 - Numbers, Dates, Intl & Timers



## Section Intro
## Section Roadmap
## Converting & Checking Numbers

```js

// in js all numbers are floating point
// integers are floating point numbers without a fraction
// converting a number to an integer finds the closest n

// js engine bug
console.log( 0.1 + 0.2 ) // 0.30000000000000004
console.log( 0.1 + 0.2 === 0.3 ) // false

// string to number
console.log( Number( '23' ) )
console.log( +'23' )

// parsing - where 10 stands for base 10 number which is optional
console.log( Number.parseInt( '30px', 10 ) ) // 30
console.log( Number.parseFloat( '2.5rem' ) ) // 2.5

// check if value is not a number
console.log( Number.isNaN( 20 ) ) // false, it is a number
console.log( Number.isNaN( '20' ) ) // false, it is a number
console.log( Number.isNaN( +'20x' ) ) // true, it is not a number
console.log( Number.isNaN( 23 / 0 ) ) // false, but is a infinity number

// better way to check if value is a number
console.log( Number.isFinite( 20 ) ) // true
console.log( Number.isFinite( '20' ) ) // false
console.log( Number.isFinite( +'20x' ) ) // false
console.log( Number.isFinite( 23 / 0 ) ) // false

// or if you know you're using integers ( no decimals )
console.log( Number.isInteger( 20 ) ) // true
console.log( Number.isInteger( '20' ) ) // false
console.log( Number.isInteger( +'20x' ) ) // false
console.log( Number.isInteger( 23 / 0 ) ) // false

;```



## Math & Rounding

```js

// square root
console.log( Math.sqrt( 25 ) ) // 5
console.log( 25 ** ( 1 / 2 ) ) // 5

// cubic root
console.log( 25 ** ( 1 / 3 ) ) // 2

// find largest or smallest
console.log( Math.max( 4, 18, 20, 3, 28 ) ) // 28
console.log( Math.min( 4, 18, 20, 3, 28 ) ) // 3

// find area of circle - PI * radius squared
console.log( Math.PI * Number.parseFloat( '10px' ) ** 2 ) // 314.1592653589793

// not sure if this is the best way, double check with
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const randomInt = ( min, max ) => Math.floor( Math.random() * ( max - min ) + 1 ) + min

// getting integers from floating numbers
// coercion to numbers also occurs
console.log( Math.trunc( 23.3 ) ) // remove decimals
console.log( Math.ceil( 23.3 ) ) // always rounding up
console.log( Math.floor( 23.3 ) ) // always rounding down
console.log( Math.round( 23.3 ) ) // rounding to nearest integer

// rounding decimals
console.log( ( 2.7 ).toFixed( 0 ) ) // '3' - result is string, need to convert to num
console.log( ( 2.7 ).toFixed( 3 ) ) // '2.700' - result is string, need to convert to num
console.log( +( 2.7 ).toFixed( 3 ) ) // 2.700

;```



## The Remainder Operator

```js

// 5 / 2 = 2.5 ~= 2
// 2 * 2 = 4
// 5 - 5 = 1
console.log( 5 % 2 ) // 1

const isEven = n => n % 2 === 0
console.log( isEven( 8 ) ) // true
console.log( isEven( 23 ) ) // false

;```



## Working with BigInt

```js

// biggest number js can accurately count & store
console.log( 2 ** 53 - 1 ) // 9007199254740991
console.log( Number.MAX_SAFE_INTEGER ) // 9007199254740991

// new js which can count & store any size number
console.log( 123456789123456789n )
console.log( BigInt( 123456789123456789 ) )

// operations
console.log( 123456n + 123456n )

// can't mix int & bigint
console.log( 20n + 20 ) // error
console.log( 20n + BigInt( 20 ) ) // 40n

// bigint nums auto round to nearest n
console.log( 20n / 3n ) // 6n

;```



## Creating Dates

```js

console.log( new Date() )
// Fri Dec 18 2020 21:22:28 GMT+0800 (Singapore Standard Time)

console.log( new Date( 'Fri Dec 18 2020 21:22:28' ) )
// Fri Dec 18 2020 21:22:28 GMT+0800 (Singapore Standard Time)

console.log( new Date( 'August 31, 1982' ) )
// Tue Aug 31 1982 00:00:00 GMT+0800 (Singapore Standard Time)

console.log( new Date( 2037, 10, 19, 15, 23, 5 ) )
// Thu Nov 19 2037 15:23:05 GMT+0800 (Singapore Standard Time)
// 0 based thus 10 month is november

console.log( new Date( 2037, 10, 33, 15, 23, 5 ) )
// Thu Dec 03 2037 15:23:05 GMT+0800 (Singapore Standard Time)
// auto count up 33 days to next month

console.log( new Date( 0 ) )
// Thu Jan 01 1970 07:30:00 GMT+0730 (Singapore Standard Time)
// start of unix time

console.log( new Date( 3 * 24 * 60 * 60 * 1000 ) )
// Sun Jan 04 1970 07:30:00 GMT+0730 (Singapore Standard Time)
// 3 days after unix
// 24 hrs * 60 mins * 60 secs * 1000 ms

// working with dates
const future = new Date( 2037, 10, 19, 15, 23 )
console.log( future.getFullYear() ) // 2037
console.log( future.getMonth() ) // 10 - 0 based thus 10 = november
console.log( future.getDate() ) // 19
console.log( future.getDay() ) // 4
console.log( future.getHours() ) // 15
console.log( future.getMinutes() ) // 23
console.log( future.getSeconds() ) // 0
console.log( future.toISOString() ) // 2037-11-19T07:23:00.000Z
console.log( future.getTime() ) // 2142228180000 - time since unix
console.log( new Date( 2142228180000 ) ) // Thu Nov 19 2037 15:23:00 GMT+0800 (Singapore Standard Time)

console.log( Date.now() ) // 1608298477721

// updating a date, it will auto correct its day, etc according to new date
console.log( future.setFullYear( 2020 ) )
// also has setMonth, setDate, etc etc

;```



## Adding Dates to 'Bankist' App

```js

const now = new Date()
const day = `${ now.getDate() }`.padStart( 2, 0 )
const month = `${ now.getMonth() + 1 }`.padStart( 2, 0 )
const year = now.getFullYear()
const hour = now.getHours()
const min = now.getMinutes()

console.log( `${ day }/${ month }/${ year }, ${ hour }:${ min }` ) // 19/12/2020, 9:23

console.log( new Date().toDateString() ) // Sat Dec 19 2020
console.log( new Date().toISOString() ) // 2020-12-19T01:36:42.451Z

;```



## Operations With Dates

```js

const calcDaysPassed = ( date1, date2 ) => Math.round( Math.abs( date2 - date1 ) / ( 1000 * 60 * 60 * 24 ) )
const daysPassed = calcDaysPassed( new Date( 2032, 10, 10 ), new Date( 2032, 10, 13 ) )

console.log( daysPassed ) // 3

const formatDate = ( date ) => {
	const daysPassed = calcDaysPassed( new Date(), date )

	if ( daysPassed === 0 ) return 'Today'
	if ( daysPassed === 1 ) return 'Yesterday'
	if ( daysPassed <= 7 ) return `${ daysPassed } days ago`

	const day = `${ date.getDate() }`.padStart( 2, 0 )
	const month = `${ date.getMonth() + 1 }`.padStart( 2, 0 )
	const year = date.getFullYear()

	return `${ day }/${ month }/${ year }`
}

;```



## Internationalizing Dates ( Intl )

```js

const now = new Date()
const options = {
	hour: 'numeric',
	minute: 'numeric',
	day: 'numeric',
	month: 'long', // numeric, long, short, 2-digit
	year: 'numeric', // numeric, 2-digit
	weekday: 'long', // long, short, narrow
}
console.log( new Intl.DateTimeFormat( 'en-US' ).format( now ) ) // 12/19/2020
console.log( new Intl.DateTimeFormat( 'en-US', options ).format( now ) ) // Saturday, December 19, 2020, 12:52 PM

// get user's browser locale
const locale = navigator.language
console.log( locale ) // en-US

;```



## Internationalizing Numbers ( Intl )

```js

const num = 23592938479
const options = {
	style: 'currency',
	currency: 'EUR',
	// unit: 'mile-per-hour', // celsius, etc
}
console.log( new Intl.NumberFormat( 'en-US' ).format( num ) ) // 23,592,938,479
console.log( new Intl.NumberFormat( 'en-US', options ).format( num ) ) // €23,592,938,479.00

;```



## Timers: setTimeout & setInterval

```js

setTimeout( () => console.log( '🍕' ), 3000 )
console.log( 'waiting' )
//	waiting
//	🍕

setTimeout( ( a, b ) => console.log( a, b ), 3000, 'item1', 'item2' )

const items = [ 'item1', 'item2' ]
const testTimer = setTimeout( ( a, b ) => console.log( a, b ), 3000, ...items )
if ( items.includes( 'item2' ) ) clearTimeout( testTimer )

setInterval( () => {
	const now = new Date()
	console.log( now )
}, 1000 )
//	repeats every 1 sec

;```



## Implementing a Countdown Timer

```js

let timer
const startLogOutTimer = () => {
	let time = 100

	const tick = () => {
		const min = String( Math.trunc( time / 60 ) ).padStart( 2, 0 )
		const sec = String( time % 60 ).padStart( 2, 0 )
		console.log( `${ min }:${ sec }` )
		if ( time === 0 ) clearInterval( timer )
		time--
	}

	return timer = setInterval( tick, 1000 )
}

if ( timer ) clearInterval( timer )
timer = startLogOutTimer()

;```



---



# 13 - Advanced DOM & Events



## Section Intro
## Section Roadmap
## Project: 'Bankist' Website

```js

// modal window
const modal = document.querySelector( '.modal' )
const overlay = document.querySelector( '.overlay' )
const btnCloseModal = document.querySelector( '.btn--close-modal' )
const btnsOpenModal = document.querySelectorAll( '.btn--show-modal' )

const openModal = ( e ) => {
	e.preventDefault()
	modal.classList.remove( 'hidden' )
	overlay.classList.remove( 'hidden' )
}

const closeModal = () => {
	modal.classList.add( 'hidden' )
	overlay.classList.add( 'hidden' )
}

btnsOpenModal.forEach( btn => btn.addEventListener( 'click', openModal ) )
btnCloseModal.addEventListener( 'click', closeModal )
overlay.addEventListener( 'click', closeModal )

document.addEventListener( 'keydown', ( e ) => {
	if ( e.key === 'Escape' && !modal.classList.contains( 'hidden' ) ) {
		closeModal()
	}
} )

;```



## How the DOM Really Works

**event target**

- .addEventListener()
- .removeEventListener()



**Node**

- .textContent
- .childNodes
- .parentNode
- .cloneNode()



**element**

- .innerHTML
- .classList
- .children
- .parentElement
- .append()
- .remove()
- .insertAdjacentHTML()
- .querySelector()
- .closest()
- .matches()
- .scrollIntoView()
- .setAttribute()



**document**

- .querySelector()
- .createElement()
- .getElementById()



## Selecting, Creating & Deleting Elements

```js

// selecting elements

document.documentElement // whole document
document.head
document.body

document.querySelector( '.header' )
document.querySelectorAll( '.section' ) // nodelist, doesn't update if dom changes

document.getElementById( 'section--1' )
document.getElementsByTagName( 'button' ) // html collection, auto updates when dom changes
document.getElementsByClassName( 'btn' ) // html collection, auto updates when dom changes



// creating & inserting elements

// .insertAdjacentHTML -> refer to previous examples

const message = document.createElement( 'div' )
message.classList.add( 'cookie-message' )
// message.textContent = `We use cookies for analytics.`
message.innerHTML = `We use cookies for analytics. <button class="btn btn--close-cookie">Got it!</button>`
const header = document.querySelector( '.header' )
header.append( message )
// header.prepend( message ) // once element added, same el can't be added to dom again
// header.prepend( message.cloneNode( true ) ) // to duplicate of same element to add into dom
// header.before( message )
// header.after( message )



// delete elements

document.querySelector( '.btn--close-cookie' ).addEventListener( 'click', () => {
	// message.parentElement.removeChild( message ) // old way
	message.remove()

	// document.querySelector( '.cookie-message' ).remove()
	// can select it too but since we already have element in a const
} )

;```



## Styles, Attributes & Classes

```js

// styles

myElement.style.backgroundColor = '#37383d'
myElement.style.width = '120%'

console.log( getComputedStyle( myElement ).color )

myElementHeight = Number.parseFloat( getComputedStyle( myElement ).height, 10 )
myElement.style.height = myElementHeight + 30 + 'px'

// set :root var
document.documentElement.style.setProperty( '--color-primary', 'orangered' )



// attributes

const logo = document.querySelector( '.nav__logo' )
console.log( logo.src ) // can get & set
console.log( logo.alt ) // can get & set
console.log( logo.setAttribute( 'myCustomAttribute', 'hello' ) )
console.log( logo.getAttribute( 'myCustomAttribute' ) )

// data attributes
// data-something-custom
console.log( logo.dataset.somethingCustom )



// classes

logo.classList.add( 'test' )
logo.classList.remove( 'test' )
logo.classList.toggle( 'test' )
logo.classList.contains( 'test' )

;```



## Implementing Smooth Scrolling

```js

// button smooth scrolling

const btnScrollTo = document.querySelector( '.btn--scroll-to' )
const section1 = document.querySelector( '#section--1' )



// old way

btnScrollTo.addEventListener( 'click', ( e ) => {
	console.log( e.target.getBoundingClientRect() )
	console.log( 'scroll x/y', window.pageXOffset, window.pageYOffset )
	console.log( 'h/w viewport', document.documentElement.clientHeight, document.documentElement.clientWidth )

	const s1 = section1.getBoundingClientRect()
	// window.scrollTo( s1.left + window.pageXOffset, s1.top + window.pageYOffset )
	window.scrollTo( {
		left: s1.left + window.pageXOffset,
		top: s1.top + window.pageYOffset,
		behavior: 'smooth',
	} )
} )



// new way for modern browsers

btnScrollTo.addEventListener( 'click', ( e ) => {
	section1.scrollIntoView( {
		behavior: 'smooth',
	} )
} )

;```



## Types of Events & Event Handlers

```js

const h1 = document.querySelector( 'h1' )
h1.addEventListener( 'mouseenter', ( e ) => alert( 'heyo' ) )

// https://developer.mozilla.org/en-US/docs/Web/Events

h1.onmouseenter = ( e ) => alert( 'also works, but old way' )
// can't have multiple fns attached
// can't remove unless overwrite

const alertMe = () => alert( 'hihi' )
h1.addEventListener( 'mouseenter', alertMe )
h1.removeEventListener( 'mouseenter', alertMe )

;```



## Event Propagation: Bubbling & Capturing
## Event Propagation in Practice

capturing moves down
bubbling moves up

```js

const randomInt = ( min, max ) => Math.floor( Math.random() * ( max - min + 1 ) + min )
const rgb = () => randomInt( 0, 255 )
const randomColor = () => `rgb( ${ rgb() }, ${ rgb() }, ${ rgb() } }`

document.querySelector( '.nav__link' ).addEventListener( 'click', function( e ) {
	this.style.backgroundColor = randomColor()
	console.log( e.target )
	// e.stopPropagation() // stop bubbling
} )

document.querySelector( '.nav__links' ).addEventListener( 'click', function( e ) {
	this.style.backgroundColor = randomColor()
	console.log( e.target )
} )

document.querySelector( '.nav' ).addEventListener( 'click', function( e ) {
	this.style.backgroundColor = randomColor()
	console.log( e.target )
}, true ) // run at capturing & not bubbling

;```



## Event Delegation: Implementing Page Navigation

```js

// page navigation smooth scrolling

// document.querySelectorAll( '.nav__link' ).forEach( el => {
// 	el.addEventListener( 'click', function( e ) {
// 		e.preventDefault()
// 		const id = this.getAttribute( 'href' )
// 		document.querySelector( id ).scrollIntoView( { behavior: 'smooth' } )
// 	} )
// } )

// instead of attaching a function to each & every every element
// add only 1 to the parent
// more memory efficient

// 1. add event listener to common parent
document.querySelector( '.nav__links' ).addEventListener( 'click', function( e ) {
	e.preventDefault()

	// 2. determine what element originated the event
	if ( e.target.classList.contains( 'nav__link' ) ) {
		const id = this.getAttribute( 'href' )
		document.querySelector( id ).scrollIntoView( { behavior: 'smooth' } )
	}
} )

;```



## DOM Traversing

```js

const h1 = document.querySelector( 'h1' )

// going downwards: child
console.log( h1.querySelectorAll( '.highlight' ) ) // all the way, all
console.log( h1.childNodes ) // direct child
console.log( h1.children ) // direct child
console.log( h1.firstElementChild ) // first child

// going upwards: parents
console.log( h1.parentNode ) // direct parent
console.log( h1.parentElement ) // direct parent
// all the way till finds 1
// return self ( if matches ) or matching, else null
console.log( h1.closest( '.header' ) )

// going sideways: siblings
console.log( h1.previousElementSibling ) // prev sibling
console.log( h1.nextElementSibling ) // next sibling
console.log( h1.parentElement.children ) // all siblings

;```



## Building a Tabbed Component

```js

// tabbed component
const tabsContainer = document.querySelector( '.operations__tab-container' )
const tabs = document.querySelectorAll( '.operations__tab' )
const tabsContent = document.querySelector( '.operations__tab-content' )

tabsContainer.addEventListener( 'click', ( e ) => {
	// span within tab could be the target depending on how accurately you click
	// or the tab button could be the target depending on how accurately you click
	// so we need a way to make sure we are getting the tab button only
	const clicked = e.target.closest( '.operations__tab' )

	if ( !clicked ) return
	tabs.forEach( el => el.classList.remove( 'operations__tab--active' ) )
	clicked.classList.add( 'operations__tab--active' )

	tabsContent.forEach( el => el.classList.remove( 'operations__content--active' ) )
	document.querySelector( `.operations__content--${ clicked.dataset.tab  }` )
		.classList.add( 'operations__content--active' )
} )

;```



## Passing Arguments to Event Handlers

```js

// menu fade animation
const nav = document.querySelector( '.nav' )

const handleHover = ( e ) => {
	if ( e.target.classList.contains( 'nav__link' ) ) {
		const link = e.target
		const siblings = link.closest( '.nav' ).querySelectorAll( '.nav__link' )
		const logo = link.closest( '.nav' ).querySelector( 'img' )

		siblings.forEach( el => if ( el !== link ) el.style.opacity = this )
		logo.style.opacity = this
	}
}

// nav.addEventListener( 'mouseover', ( e ) => handleHover( e, .5 ) )
// nav.addEventListener( 'mouseout', ( e ) => handleHover( e, 1 ) )
nav.addEventListener( 'mouseover', handleHover.bind( .5 ) ) // changing the this keyword
nav.addEventListener( 'mouseout', handleHover.bind( 1 ) ) // changing the this keyword

;```



## Implementing a Sticky Navigation: The Scroll Event

```css

.sticky { position: fixed; }

```

```js

const initialCoords = section1.getBoundingClientRect()

// not performant
window.addEventListener( 'scroll', () => {
	if ( window.scrollY > initialCoords.top ) nav.classList.add( 'sticky' )
} )

;```



## A Better Way: The Intersection Observer API

```js

// eg how it works

const obsCallback = ( entries, observer ) => {
	entries.forEach( entry => {

	} )
}

const obsOptions = {
	root: null, // = viewport
	threshold: [ 0, .2 ],
}

const observer = new IntersectionObserver( obsCallback, obsOptions )
observer.observe( section1 )

;```

```js

// implementing it on site

const header = document.querySelector( '.header' )
const navHeight = nav.getBoundingClientRect().height

const stickyNav = ( entries ) => {
	const [ entry ] = entries // same as entries[ 0 ]

	if ( !entry.isIntersecting ) {
		nav.classList.add( 'sticky' )
	} else {
		nav.classList.remove( 'sticky' )
	}
}

const headerObserver = new IntersectionObserver( stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${ navHeight }px`, // extra margin before threshold hits
} )

;```



## Revealing Elements on Scroll

```css
.section {
	transition: transform 1s, opacity 1s;
}

.section--hidden {
	opacity: 0;
	transform: translateY( 8rem );
}

```

```js

const allSections = document.querySelectorAll( '.section' )

const revealSection = ( entries, observer ) => {
	const [ entry ] = entries

	if ( !entry.isIntersecting ) return
	entry.target.classList.remove( 'section--hidden' )
	observer.unobserve( entry.target )
}

const sectionObserver = new IntersectionObserver( revealSection, {
	root: null,
	threshold: .15,
} )

allSections.forEach( section => {
	sectionObserver.observe( section )
	section.classList.add( 'section--hidden' )
} )

;```



## Lazy Loading Images

```css

.lazy-img {
	filter: blur( 20px );
}

```

```html

<img
	src="img/digital-lazy.jpg"
	data-src="img/digital.jpg"
	alt="Computer"
	class="features__img lazy-img"
/>

```

```js

const imgTargets = document.querySelectorAll( 'img[data-src]' )

const loadImg = ( entries, observer ) => {
	const [ entry ] = entries

	if ( !entry.isIntersecting ) return
	entry.target.src = entry.target.dataset.src
	entry.target.addEventListener( 'load', () => {
		entry.target.classList.remove( 'lazy-img' )
	} )
	observer.unobserve( entry.target )
}

const imgObserver = new IntersectionObserver( loadImg, {
	root: null,
	threshold: 0,
	rootMargin: '200px', // let it load in faster
} )

imgTargets.forEach( img => imgObserver.observe( img ) )

;```



## Building a Slider Component: Part 1
## Building a Slider Component: Part 2

```css

.slider {
	max-width: 100rem;
	height: 50rem;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
}

.slide {
	position: absolute;
	top: 0;
	width: 100%;
	height: 50rem;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 1s;
}

.slide > img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.slider__btn {
	position: absolute;
	top: 50%;
	z-index: 10;

	border: none;
	background: rgba(255, 255, 255, 0.7);
	font-family: inherit;
	color: #333;
	border-radius: 50%;
	height: 5.5rem;
	width: 5.5rem;
	font-size: 3.25rem;
	cursor: pointer;
}

.slider__btn--left {
	left: 6%;
	transform: translate(-50%, -50%);
}

.slider__btn--right {
	right: 6%;
	transform: translate(50%, -50%);
}

.dots {
	position: absolute;
	bottom: 5%;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
}

.dots__dot {
	border: none;
	background-color: #b9b9b9;
	opacity: 0.7;
	height: 1rem;
	width: 1rem;
	border-radius: 50%;
	margin-right: 1.75rem;
	cursor: pointer;
	transition: all 0.5s;

	/* Only necessary when overlying images */
	/* box-shadow: 0 0.6rem 1.5rem rgba(0, 0, 0, 0.7); */
}

.dots__dot:last-child {
	margin: 0;
}

.dots__dot--active {
	background-color: #888;
	opacity: 1;
}

;```

```js

const slider = () => {
	const slides = document.querySelectorAll( '.slide' )
	const btnLeft = document.querySelector( '.slider__btn-left' )
	const btnRight = document.querySelector( '.slider__btn-right' )
	const dotContainer = document.querySelector( '.dots' )

	let curSlide = 0
	const maxSlide = slides.length - 1

	const createDots = () => {
		slides.forEach( ( _, i ) => {
			dotContainer.insertAdjacentHTML( 'beforeend', `
				<button class="dots__dot" data-slide="${ i }"></button>
			` )
		} )
	}

	const activateDot = ( slide ) => {
		document.querySelectorAll( 'dots__dot' )
			.forEach( dot => dot.classList.remove( 'dots__dot--active' ) )
		document.querySelector( `.dots__dot[ data-slide="${ slide }" ]` )
			.classList.add( 'dots__dot--active' )
	}


	const goToSlide = ( slide ) => {
		slides.forEach( ( s, i ) => {
			s.style.transform = `translateX( ${ 100 * ( i - slide ) }% )` 
		} )
	}

	const nextSlide = () => {
		curSlide === maxSlide ?	curSlide = 0 : curSlide++
		goToSlide( curSlide )
		activeDot( curSlide )
	}

	const prevSlide = () = {
		curSlide === 0 ? curSlide = maxSlide : curSlide--
		goToSlide( curSlide )
		activeDot( curSlide )
	}

	const init = () => {
		createDots()
		activateDot( 0 )
		goToSlide( 0 )
	}

	init()

	btnRight.addEventListener( 'click', nextSlide )
	btnRight.addEventListener( 'click', prevSlide )

	document.addEventListener( 'keydown', ( e ) => {
		if ( e.key === 'ArrowLeft' ) prevSlide()
		if ( e.key === 'ArrowRight' ) nextSlide()
	} )

	dotContainer.addEventListener( 'click', ( e ) => {
		if ( e.target.classList.contains( 'dots__dot' ) ) {
			const { slide } = e.target.dataset
			goToSlide( slide )
			activeDot( slide )
		}
	} )
}

slider()

;```



## Lifecycle DOM Events

```js

document.addEventListener( 'DOMContentLoaded', e => {
	console.log( 'HTML parsed & DOM tree built!' )
} )

window.addEventListener( 'load', e => {
	console.log( 'Page fully loaded!' )
} )

// before user leaves page
window.addeventListener( 'beforeunload', e => {
	e.preventDefault()
	console.log( e )
	e.returnValue = ''
} )

;```



## Efficient Script Loading: Defer & Async

// <script defer src="xxx">

**regular**

- on head
	parse html
	fetch script
	execute
	finish parsing html
	DOMContentLoaded

- body end
	parsing html
	fetch script
	execute
	finish parsing html
	DOMContentLoaded



**async**
*good for 3rd party scripts that you don't need to wait for like analytics*

- on head
	parsing html + fetch script
	waiting
	execute ( not in order, depends on which script loads faster )
	finish parsing html
	DOMContentLoaded ( can happen before fetch finish )



**defer**
*overall best solution for loading scripts*

- on head
	parsing html + fetch script
	finish parsing html
	waiting
	execute ( script is executed in order as listed )
	DOMContentLoaded ( only after fetch completes )



---



# 14 - Object-Oriented Programming ( OOP ) With JavaScript



---



# 15 - Mapty App: OOP, Geolocation, External Libraries & More!



---



# 16 - Asynchronous JavaScript: Promises, Async/Await & AJAX



## Section Intro
## Section Roadmap
## Asynchronous JavaScript, AJAX & APIs

**synchronous code**

- most code is synchronous
- synchronous code is executed line by line
- each line of code waits for previous line to finish
- long-running operations block code execution

**asynchronous code**

- asynchronous code is executed after a task that runs in the background finishes
- asynchronous code is non-blocking
- execution doesn't wait for an asynchronous task to finish its work
- callback functions alone do *not* make code asynchronous

**API**

- Application Programming Interface
- piece of sofware that can be used by another piece of software
- allow applications to talk to each other



## Our First AJAX Call: XMLHttpRequest

```js

const btn = document.querySelector( '.btn-country' )
const countriesContainer = document.querySelector( '.countries' )

// old way
const getCountryData = ( country ) => {
	const request = new XMLHttpRequest()
	request.open( 'GET', `https://restcountries.eu/rest/v2/name/${ country }` )
	request.send()
	request.addEventListener( 'load', function() {
		// destructure resulting array's [ 0 ] into data
		const [ data ] = JSON.parse( this.responseText )

		console.log( data.flag )
		console.log( data.name )
		console.log( data.region )
		console.log( ( +data.population / 1000000 ).toFixed( 1 ) )
		console.log( data.languages[ 0 ].name )
		console.log( data.currencies[ 0 ].name )
	} )
}

getCountryData( 'portugal' )
// https://restcountries.eu/data/prt.svg
// Portugal
// Europe
// 10.4
// Portuguese
// Euro

;```



## How the Web Works: Requests & Responses

1.	when api is called dns lookup happens first
	translate domain name to ip address

2.	tcp/ip socket connection to web server opens
	breaks data into packets to send over
	remains open till done

3.	http request
	get, post, rest/v2/name/xxx
	headers
	body

4.	http response
	response code
	headers
	body

5.	file arrives to browser



## Welcome to Callback Hell
## Promises & the Fetch API

```js

const request = fetch( 'https://restcountries.eu/rest/v2/name/portugal' )
console.log( request ) // pending promise
// a placeholder for a future value

// 1. pending
// 2. settled - fulfilled or rejected

;```



## Consuming Promises

```js

const getCountryData = ( country ) => {
	fetch( `https://restcountries.eu/rest/v2/name/${ country }` )
	.then( res => res.json() )
	.then( data => console.log( data ) )
}

getCountryData( 'portugal' )

;```



## Chaining Promises

```js

const getCountryData = ( country ) => {
	fetch( `https://restcountries.eu/rest/v2/name/${ country }` )
	.then( res => res.json() )
	.then( data => {
		console.log( data )

		const neighbor = data[ 0 ].borders[ 0 ]
		if ( !neighbor ) return
		return fetch( `https://restcountries.eu/rest/v2/name/${ neighbor }` )
	} )
	.then( res => res.json() )
	.then( data => console.log( data ) )
}

getCountryData( 'portugal' )

;```



## Handling Rejected Promises

```js

const getCountryData = ( country ) => {
	fetch( `https://restcountries.eu/rest/v2/name/${ country }` )
	.then( res => res.json(), err => console.log( err ) ) // catch err in each request
	.then( data => {
		console.log( data )

		const neighbor = data[ 0 ].borders[ 0 ]
		if ( !neighbor ) return
		return fetch( `https://restcountries.eu/rest/v2/name/${ neighbor }` )
	} )
	.then( res => res.json(), err => console.log( err ) ) // catch err in each request
	.then( data => console.log( data ) )
}

getCountryData( 'portugal' )

;```

```js

const getCountryData = ( country ) => {
	fetch( `https://restcountries.eu/rest/v2/name/${ country }` )
	.then( res => res.json() )
	.then( data => {
		console.log( data )

		const neighbor = data[ 0 ].borders[ 0 ]
		if ( !neighbor ) return
		return fetch( `https://restcountries.eu/rest/v2/name/${ neighbor }` )
	} )
	.then( res => res.json() )
	.then( data => console.log( data ) )
	.catch( err => console.log( err ) ) // catch any err in whole chain
}

getCountryData( 'portugal' )

;```

```js

const getCountryData = ( country ) => {
	fetch( `https://restcountries.eu/rest/v2/name/${ country }` )
	.then( res => res.json() )
	.then( data => {
		console.log( data )

		const neighbor = data[ 0 ].borders[ 0 ]
		if ( !neighbor ) return
		return fetch( `https://restcountries.eu/rest/v2/name/${ neighbor }` )
	} )
	.then( res => res.json() )
	.then( data => console.log( data ) )
	.catch( err => console.log( err ) )
	.finally( () => {
		console.log( '"Finally" always happens at end of promise chain, no matter if success or error' )
	} )
}

getCountryData( 'portugal' )

;```



## Throwing Errors Manually

```js

const getCountryData = ( country ) => {
	fetch( `https://restcountries.eu/rest/v2/name/${ country }` )
	.then( res => {
		if ( !res.ok ) {
			throw new Error( `Country not found ( ${ res.status } )` )
		}
		return res.json()
	} )
	.then( data => {
		console.log( data )

		const neighbor = data[ 0 ].borders[ 0 ]
		if ( !neighbor ) return
		return fetch( `https://restcountries.eu/rest/v2/name/${ neighbor }` )
	} )
	.then( res => {
		if ( !res.ok ) {
			throw new Error( `Country not found ( ${ res.status } )` )
		}
		return res.json()
	} )
	.then( data => console.log( data ) )
	.catch( err => console.log( err ) )
}

getCountryData( 'kelvin' )

;```

```js

const getJSON = ( url, errMsg = 'Something went wrong.' ) => {
	return fetch( url )
	.then( res => {
		if ( !res.ok ) throw new Error( `${ errMsg } ( ${ res.status } )` )
		return res.json()
	} )
}

const getCountryData = ( country ) => {
	getJSON( `https://restcountries.eu/rest/v2/name/${ country }`, `Country not found.` )
	.then( data => {
		console.log( data )

		const neighbor = data[ 0 ].borders[ 0 ]
		if ( !neighbor ) throw new Error( 'No neighbor found.' )
		return getJSON( `https://restcountries.eu/rest/v2/name/${ neighbor }`, `Country not found.` )
	} )
	.then( data => console.log( data ) )
	.catch( err => console.log( err ) )
}

getCountryData( 'kelvin' )

;```



## Coding Challenge #1

```js

const whereAmI = ( lat, lng ) => {
	fetch( `https://geocode.xyz/${ lat },${ lng }?geoit-json` )
	.then( res => {
		if ( !res.ok ) throw new Error( `Problem with geocoding ${ res.status }` )
		res.json()
	} )
	.then( data => {
		console.log( `You are in ${ data.city }, ${ data.country }` )

		return fetch( `https://restcountries.eu/rest/v2/name/${ data.country }` )
	} )
	.then( res => {
		if ( !res.ok ) throw new Error( `Country not found ( ${ res.status } )` )

		return res.json()
	} )
	.then( data => console.log( data ) )
	.catch( err => console.log( err.message ) )
}

whereAmI( 52.508, 13.381 )

;```



## Asynchronous Behind the Scenes: The Event Loop
## The Event Loop in Practice

```js

console.log( 'test start' ) // added straight to execution stack
setTimeout( () => console.log( '0 sec timer' ), 0 ) // callback queue
Promise.resolve( 'resolved promise 1' )
.then( res => console.log( res ) ) // micro task ( promises ) has priority over callback queue
console.log( 'test end' ) // added straight to execution stack

// test start
// test end
// resolved promise 1
// 0 sec timer

;```



## Building a Simple Promise

```js

const lottoPromise = new Promise( ( resolve, reject ) => {
	console.log( `lotto start` )
	setTimeout( () => {
		if ( Math.random() >= .5 ) resolve( `you win` )
		else reject( new Error( `you lost` ) )
	}, 1000 )
} )

lottoPromise
.then( res => console.log( res ) )
.catch( err => console.log( err ) )

// lottoPromise stores result, aka promise runs only once
// return new promise to be able to run it again everytime

;```

```js

const wait = ( seconds ) => {
	return new Promise( resolve => {
		setTimeout( resolve, seconds * 1000 )
	} )
}

wait( 2 )
.then( () => {
	console.log( `heyo` )
	return wait( 1 )
} )
.then( () => console.log( `hi` ) )

;```



## Promisifying the Geolocation API

```js

const getPosition = () => {
	return new Promise( ( resolve, reject ) => {
		// navigator.geolocation.getCurrentPosition(
		// 	pos => resolve( pos ),
		// 	err => reject( err )
		// )
		navigator.geolocation.getCurrentPosition( resolve, reject )
	} )
}

getPosition()
.then( pos => console.log( pos ) )
.catch( err => console.log( err ) )

;```

```js

const whereAmI = () => {
	getPosition()
	.then( pos => {
		const { latitude: lat, longitude: lng } = pos.coords
		return fetch( `https://geocode.xyz/${ lat },${ lng }?/geoit=json` )
	} )
	.then( res => {
		if ( !res.ok ) throw new Error( `Problem with geocoding ${ res.status }` )
		return res.json()
	} )
	.then( data => {
		console.log( `You are in ${ data.city }, ${ data.country }` )

		return fetch( `https://restcountries.eu/rest/v2/name/${ data.country }` )
	} )
	.then( res => {
		if ( !res.ok ) throw new Error( `Country not found ( ${ res.status } )` )

		return res.json()
	} )
	.then( data => console.log( data ) )
	.catch( err => console.log( err.message ) )
}

;```



## Coding Challenge #2

```js

const imgContainer = document.querySelector( '.images' )

const createImg = ( imgPath ) => {
	return new Promise( ( resolve, reject ) => {
		const img = document.createElement( 'img' )
		img.src = imgPath
		img.addEventListener( 'load', () => {
			imgContainer.append( img )
			resolve( img )
		} )
		img.addEventListener( 'error', () => {
			reject( new Error( 'Image not found' ) )
		} )
	} )
}

createImg( `img/img-1.jpg` )
.then( img => {
	currentImg = img
	console.log( 'image 1 loaded' )
	return wait( 2 )
} )
.then( () => {
	currentImg.style.display = 'none'
	return createImg( `img/img-2.jpg` )
} )
.then( () => {
	currentImg = img
	console.log( 'image 2 loaded' )
	return wait( 2 )
} )
.then( () => {
	currentImg.style.display = 'none'
} )
.catch( err => console.log( err ) )

;```



## Consuming Promises with Async/Await

```js

const whereAmI = async () => {
	const pos = await getPosition()
	const { latitude: lat, longitude: lng } = pos.coords
	const resGeo = await fetch( `https://geocode.xyz/${ lat },${ lng }?geoit=json` )
	const dataGeo = await resGeo.json()
	const res = await fetch( `https://restcountries.eu/rest/v2/name/${ dataGeo.country }` )
	const data = await res.json()
	console.log( data )
}

whereAmI()

;```



## Error Handling With try... catch

```js

const whereAmI = async () => {
	try {
		const pos = await getPosition()
		const { latitude: lat, longitude: lng } = pos.coords
		const resGeo = await fetch( `https://geocode.xyz/${ lat },${ lng }?geoit=json` )
		if ( !resGeo.ok ) throw new Error( `no location data` )
		const dataGeo = await resGeo.json()
		const res = await fetch( `https://restcountries.eu/rest/v2/name/${ dataGeo.country }` )
		if ( !res.ok ) throw new Error( `problem getting country` )
		const data = await res.json()
		console.log( data )
	} catch ( err ) {
		console.log( err.message )
	}
}

whereAmI()

;```



## Returning Values from Async Functions

```js

const whereAmI = async () => {
	try {
		const pos = await getPosition()
		const { latitude: lat, longitude: lng } = pos.coords
		const resGeo = await fetch( `https://geocode.xyz/${ lat },${ lng }?geoit=json` )
		if ( !resGeo.ok ) throw new Error( `no location data` )
		const dataGeo = await resGeo.json()
		const res = await fetch( `https://restcountries.eu/rest/v2/name/${ dataGeo.country }` )
		if ( !res.ok ) throw new Error( `problem getting country` )
		const data = await res.json()
		return data
	} catch ( err ) {
		throw err
	}
}

whereAmI()
.then( res => console.log( res ) )
.catch( err => console.log( err ) )
.finally( () => console.log( `end` ) )

;```

```js

( async () => {
	try {
		const data = await whereAmI()
		console.log( data )
	} catch ( err ) {
		console.log( err )
	}
	console.log( `end` )
} )()

;```



## Running Promises in Parallel

```js

const getJSON = ( url, errMsg = 'Something went wrong.' ) => {
	return fetch( url )
	.then( res => {
		if ( !res.ok ) throw new Error( `${ errMsg } ( ${ res.status } )` )
		return res.json()
	} )
}

const get3Countries = async ( c1, c2, c3 ) => {
	try {
		const [ data1 ] = await getJSON( `https://restcountries.eu/rest/v2/name/${ c1 }` )
		const [ data2 ] = await getJSON( `https://restcountries.eu/rest/v2/name/${ c2 }` )
		const [ data3 ] = await getJSON( `https://restcountries.eu/rest/v2/name/${ c3 }` )
		console.log( [ data1.capital, data2.capital, data3.capital ] )
	} catch ( err ) {
		console.log( err )
	}
}

get3Countries( 'portugal', 'singapore', 'canada' )

;```

```js

const getJSON = ( url, errMsg = 'Something went wrong.' ) => {
	return fetch( url )
	.then( res => {
		if ( !res.ok ) throw new Error( `${ errMsg } ( ${ res.status } )` )
		return res.json()
	} )
}

const get3Countries = async ( c1, c2, c3 ) => {
	try {
		const data = await Promise.all( [
			getJSON( `https://restcountries.eu/rest/v2/name/${ c1 }` ),
			getJSON( `https://restcountries.eu/rest/v2/name/${ c2 }` ),
			getJSON( `https://restcountries.eu/rest/v2/name/${ c3 }` )
		] )
		console.log( data.map( d => d[ 0 ].capital ) )
	} catch ( err ) {
		console.log( err )
	}
}

get3Countries( 'portugal', 'singapore', 'canada' )

;```



## Other Promise Combinators: race, allSettled & any

```js

const getJSON = ( url, errMsg = 'Something went wrong.' ) => {
	return fetch( url )
	.then( res => {
		if ( !res.ok ) throw new Error( `${ errMsg } ( ${ res.status } )` )
		return res.json()
	} )
}

( async () => {
	const res = await Promise.race( [
		getJSON( `https://restcountries.eu/rest/v2/name/${ 'portugal' }` ),
		getJSON( `https://restcountries.eu/rest/v2/name/${ 'singapore' }` ),
		getJSON( `https://restcountries.eu/rest/v2/name/${ 'canada' }` )
	] )
	console.log( res[ 0 ] )
	// only show the first finishing promise
	// also will show err if err finishes first before any promise did
} )()



const timeout = ( sec ) => {
	return new Promise( ( _, reject ) => {
		setTimeout( () => {
			reject( new Error( `Request took too long!` ) )
		}, sec * 1000 )
	})
}

Promise.race( [
	getJSON( `https://restcountries.eu/rest/v2/name/${ 'tanzania' }` ),
	timeout( 1 )
] )
.then( res => console.log( res ) )
.catch( err => console.log( err ) )

;```

**Promise.allSettled**
- takes in array of promise
- returns all in array no matter if reject or resolve

**Promise.any**
- takes in array of promise
- return the first successful promise
- ignores rejects



## Coding Challenge #3

```js

const loadNPause = async () => {
	try {
		let img = await createImage( 'img/img-1.jpg' )
		console.log( `image 1 loaded` )
		await wait( 2 )
		img.style.display = `none`
		img = await createImage( 'img/img-2.jpg' )
		console.log( `image 2 loaded` )
		await wait( 2 )
		img.style.display = `none`
	} catch { // possible to catch without the ( err ) in es6
		console.log( err )
	}
}

loadNPause()

;```

```js

const loadAll = async ( imgArr ) => {
	try {
		const imgs = imgArr.map( async img => await createImage( img ) )
		console.log( imgs ) // will return promises instead of data

		const imgsEl = await Promise.all( imgs )
		console.log( imgsEl )

		imgsEl.forEach( img => img.classList.add( 'parallel' ) )
	} catch {
		console.log( err )
	}
}

loadAll( [ `img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg` ] )

;```



---



# 17 - Modern JavaScript Development: Modules & Tooling



## Section Intro
## Section Roadmap
## An Overview of Modules in JavaScript
## Exporting & Importing in ES6
## The Module Pattern
## CommonJS Modules
## A Brief Introduction to the Command Line
## Introduction to NPM
## Bundling With Parcel & NPM Scripts
## Configuring Babel & Polyfilling
## Review: Writing Clean & Modern JavaScript

**Readable Code**

- write code so that *others* can understand it
- write code so that *you* can understand it in 1 year
- avoid too *clever* & overcomplicated solutions
- use descriptive variable names: *what they contain*
- use descriptive function names: *what they do*



**General**

- use *DRY* principle ( refactor your code )
- don't pollute global namespace, encapsulate instead
- don't use *var*
- use *strong type checks* ( === & !== )



**Functions**

- generally, functions should *do only one thing*
- don't use more than *3 function parameters*
- use *default parameters* whenever possible
- generally, *return same data type* as received
- use *arrow functions* when they make code more readable



**Oop**

- use *es6 classes*
- *encapsulate data & don't mutate* it from outside the class
- implement *method chaining*
- *do not* use arrow functions as methods ( in regular objects )



**Avoid Nested Code**

- use *early return* ( guard clauses )
- use *ternary* ( conditional ) or *logical operators* instead of if
- use *multiple if* instead of if / else-if
- avoid for loops, use *array methods* instead
- avoid *callback-based asynchronous API*



**Asynchronous Code**

- consume promises with *async/await* for best readability
- whenever possible, run promises in *parallel* ( promise.all )
- *handle errors* & promise rejections



## Let's Fix Some Bad Code: Part 1

```js

var budget = [
	{ value: 250, description: 'Sold old TV 📺', user: 'jonas' },
	{ value: -45, description: 'Groceries 🥑', user: 'jonas' },
	{ value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
	{ value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
	{ value: -1100, description: 'New iPhone 📱', user: 'jonas' },
	{ value: -20, description: 'Candy 🍭', user: 'matilda' },
	{ value: -125, description: 'Toys 🚂', user: 'matilda' },
	{ value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]

var limits = {
	jonas: 1500,
	matilda: 100,
}

var add = function ( value, description, user ) {
	if ( !user ) user = 'jonas'
	user = user.toLowerCase()

	var lim
	if ( limits[ user ] ) {
		lim = limits[ user ]
	} else {
		lim = 0
	}

	if ( value <= lim ) {
		budget.push( { value: -value, description: description, user: user } )
	}
}
add( 10, 'Pizza 🍕' )
add( 100, 'Going to movies 🍿', 'Matilda' )
add( 200, 'Stuff', 'Jay' )
console.log( budget )

var check = function () {
	for ( var el of budget ) {
		var lim
		if ( limits[ el.user ] ) {
			lim = limits[ el.user ]
		} else {
			lim = 0
		}

		if ( el.value < -lim ) {
			el.flag = 'limit'
		}
	}
}
check()

console.log( budget )

var bigExpenses = function ( limit ) {
	var output = ''
	for ( var el of budget ) {
		if ( el.value <= -limit ) {
			output += el.description.slice( -2 ) + ' / ' // Emojis are 2 chars
		}
	}
	output = output.slice( 0, -2 ) // Remove last '/ '
	console.log( output )
}

;```

```js

const budget = [
	{ value: 250, description: 'Sold old TV 📺', user: 'jonas' },
	{ value: -45, description: 'Groceries 🥑', user: 'jonas' },
	{ value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
	{ value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
	{ value: -1100, description: 'New iPhone 📱', user: 'jonas' },
	{ value: -20, description: 'Candy 🍭', user: 'matilda' },
	{ value: -125, description: 'Toys 🚂', user: 'matilda' },
	{ value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]

const spendingLimits = {
	jonas: 1500,
	matilda: 100,
}

// same as
// spendingLimits[ user ] ? spendingLimits[ user ] : 0
const getLimit = user => spendingLimits?.[ user ] ?? 0

const addExpense = function ( value, description, user = 'jonas' ) {
	user = user.toLowerCase()
	if ( value <= getLimit( user ) ) budget.push( { value: -value, description, user } )
}
addExpense( 10, 'Pizza 🍕' )
addExpense( 100, 'Going to movies 🍿', 'Matilda' )
addExpense( 200, 'Stuff', 'Jay' )

const checkExpenses = function () {
	for ( const entry of budget ) {
		if ( entry.value < -getLimit( entry.user) ) entry.flag = 'limit'
	}
}
checkExpenses()

const logBigExpenses = function ( bigLimit ) {
	let output = ''
	for ( const entry of budget ) {
		output += entry.value <= -bigLimit ? `${ entry.description.slice( -2 ) } / `
	}
	output = output.slice( 0, -2 ) // Remove last '/ '
	console.log( output )
}

console.log( budget )
logBigExpenses( 1000 )

;```



## Declarative & Functional JavaScript Principles

**imperative**

- programmer explains *how* to do things
- we explain to the computer *every single step* it has to follow to achieve a result
- eg. step-by-step recipe of a cake

```js

const arr = [ 2, 4, 6, 8 ]
const doubled = []
for ( let i = 0; i < arr.length; i++ ) {
	doubled[ i ] = arr[ i ] * 2
}

;```



**declarative**

- programmer tells *what* to do
- we simply *describe* the way the computer should achieve the result
- the *how* gets abstracted away
- eg. description of a cake

```js

const arr = [ 2, 4, 6, 8 ]
const doubled = arr.map( n => n * 2 )

;```



**functional programming**

- *declarative* programming paradigm
- based on the idea of writing software by combining many *pure functions*
- avoiding *side effects* & *mutating* data

- side effect => *modification/mutation* of any data outside of the function
- like mutating external variables, logging to console, writing to DOM, etc

- pure function => function without side effects
- *does not depend on external variables*
- given same inputs, always returns same outputs

- immutability => *state/data is never modified*
- instead state is *copied* & the copy is *mutated* & *returned*



**functional programming techniques**

- try to avoid data mutations
- use built-in methods that don't produce side effects
- do data transformations with methods such as .map, .filter, .reduce
- try to avoid side effects in functions: of course not always possible



**declarative syntax**

- use array & object destructuring
- use the spread operator
- use ternary/conditional operator
- use template literals



## Let's Fix Some Bad Code: Part 2

```js

const budget = Object.freeze( [
	{ value: 250, description: 'Sold old TV 📺', user: 'jonas' },
	{ value: -45, description: 'Groceries 🥑', user: 'jonas' },
	{ value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
	{ value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
	{ value: -1100, description: 'New iPhone 📱', user: 'jonas' },
	{ value: -20, description: 'Candy 🍭', user: 'matilda' },
	{ value: -125, description: 'Toys 🚂', user: 'matilda' },
	{ value: -1800, description: 'New Laptop 💻', user: 'jonas' },
] )

const spendingLimits = Object.freeze( {
	jonas: 1500,
	matilda: 100,
} )

const getLimit = ( limits, user ) => limits?.[ user ] ?? 0

const addExpense = ( state, limits, value, description, user = 'jonas' ) => {
	const cleanUser = user.toLowerCase()
	return value <= getLimit( limits, cleanUser )
					? [ ...state, { value: -value, description, user: cleanUser } ]
					: state
}

const newBudget1 = addExpense( budget, spendingLimits, 10, 'Pizza 🍕' )
const newBudget2 = addExpense( newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda' )
const newBudget3 = addExpense( newBudget2, spendingLimits, 200, 'Stuff', 'Jay' )

const checkExpenses = ( state, limits ) => {
	return state.map( entry => {
		return entry.value < -getLimit( limits, entry.user)
				? { ...entry, entry.flag = 'limit' }
				: entry
	} )
}

const finalBudget = checkExpenses( newBudget3, spendingLimits )

const logBigExpenses = ( state, bigLimit ) => {
	const bigExpenses = state
						.filter( entry => entry.value <= -bigLimit )
						// .map( entry => entry.description.slice( -2 ) )
						// .join( ' / ' )
						.reduce( ( str, cur ) => `${ str } / ${ cur.description.slice( -2 ) }` , '' )
	console.log( bigExpenses )
}

console.log( budget )
logBigExpenses( finalBudget, 1000 )

;```



---



# 18 - Forkify App: Building a Modern Application



---



# 19 - Setting Up Git & Development



---



# 20 - The End!



---
