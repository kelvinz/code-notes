


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



---



# 14 - Object-Oriented Programming ( OOP ) With JavaScript



---



# 15 - Mapty App: OOP, Geolocation, External Libraries & More!



---



# 16 - Asynchronous JavaScript: Promises, Async/Await & AJAX



---



# 17 - Modern JavaScript Development: Modules & Tooling



---



# 18 - Forkify App: Building a Modern Application



---



# 19 - Setting Up Git & Development



---



# 20 - The End!



---
