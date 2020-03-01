


<https://beginnerjavascript.com/>



# welcome



## source files

<https://github.com/wesbos/beginner-javascript>



## browser, editor & terminal setup

**option + command + c**
elements tab in dev tools

**option + command  + j**
console tab in dev tools



## running & loading js

-	browser console directly
-	script tag in html
-	running in node engine



## variables & statements

**var**

-	can be updated
-	function scoped

**let**

-	can be updated
-	block scoped

**const**

-	cannot be updated
- 	block scoped

*some common conventions*

variables

-	shouldn't start with capital letters
-	should start with a-z
-	_ or $ starting letters used by other big libraries, try not to use
-	camelCase for multi-word variables



## code quality tooling with prettier & eslint

<https://github.com/wesbos/eslint-config-wesbos>
some default settings for both to start with

<https://www.prettier.io>
formatting to make code more 'pretty' & easier to read

<https://www.eslint.org>
for best practises or potential errors



---



# types



## introduction

**7 types**

-	string
-	number
-	object
-	boolean
-	null
-	undefined
-	symbol



## strings

```js

	//	3 ways to display strings
	const singleQuotes = 'single'
	const doubleQuotes = "double"
	const backticks = `backticks`

	//	escape using backslash
	const sentence = 'she\'s so cool'

	//	backslash or backticks for multiple lines
	const song = 'hi\
		this is multi-lines\
		'
	const song = `hi
		this is multi-lines
		`

	//	concat strings
	const hello = 'hello my name is ' + myName + '!'
	const hello = `hello my name is ${ myName }!`

;```



## numbers

```js

	const age = 100
	const name = 'wes'

	typeof age
	//	'number'
	typeof name
	//	'string'

	1 + '1' = '11'
	//	num + string = string

	Math.round( 20.5 )
	//	21

	Math.round( 20.2 )
	//	20

	Math.floor( 20.999 )
	//	20

	Math.ceil( 20.1 )
	//	21

	Math.random()
	//	random number between 0 & 1

	const smarties = 20
	const kids = 3
	const eachKidGets = smarties / kids
	//	eachKidGets = 6.666666666666667
	smarties % kids
	//	2
	//	remainder after division

	0.1 + 0.2 = 0.30000000000000004
	//	www.http://0.30000000000000004.com

	/* Your language isn't broken, it's doing floating point math. Computers can only natively store integers, so they need some way of representing decimal numbers. This representation comes with some degree of inaccuracy. That's why, more often than not, .1 + .2 != .3. */

	//	thus, don't store prices in decimals, might cause some bugs
	//	store them in cents & when displaying convert it

	10 ** 2
	//	100
	//	** = to the power of

	1000 ** 200
	//	infinity
	//	computer can't process

	NaN
	//	not a number

;```



## objects

```js

	//	collection of stuff

	const person = {
		first: 'kelvin',
		last: 'zhao',
		age: 18
	}

	//	order doesn't matter in objects
	//	if you need them to be in order, use arrays

	person.first
	//	'kelvin'

;```



## null & undefined

```js

	let somethingUndefined
	//	undefined
	//	yet to be set

	const somethingNull = null
	//	null
	//	explictly set to nothing

;```



## booleans & equality

```js

	let isDrawing = false

	const age = 18
	const ofAge = age > 19
	//	ofAge = false

	==
	//	loose check
	//	only value checked, can be coerced
	===
	//	strict check
	//	value + type, no coercion

;```



---



# functions



## built in

```js

	//	a few examples

	Math.max( 10, 12 )
	//	12
	//	larger of the two

	Math.floor( 2.44 )
	//	2

	Date.now()
	//	e.g. 123456789
	//	represents current time/date

	document.querySelector( 'p' )
	//	selects the p tag in html

	navigator.vibrate( 100 )
	//	vibrate device for 100 ms

	window.scrollTo( 0, 200 )
	//	scroll down to 200 y

;```



## custom

```js

	//	function definition
	function calculateBill() {

		//	function body
		const total = 100 * 1.17

		//	return statement
		return total

	}

	//	function call
	calculateBill()

	//	capture return value
	const myTotal = calculateBill()
	console.log( `the total is $${ myTotal }` )

	//	using it directly
	console.log( `the total is $${ calculateBill() }` )

;```



## parameters & arguments

```js

	//	pass in parameters - billAmount, taxRate
	function calculateBill( billAmount, taxRate ) {

		const total = billAmount * ( 1 + taxRate )

		return total

	}

	//	pass in arguments - 200, 0.17
	calculateBill( 200, .17 )



	//	pass expressions in arguments
	//	will result in 100 in first argument
	calculateBill( 50 + 50, .17 )



	//	pass in functions in arguments
	calculateBill( addUp( 50, 50 ), .17 )

	function addUp( one, two ) {
		return one + two
	}



	//	default values
	function calculateBill( billAmount, taxRate = .17 ) {
		const total = billAmount * ( 1 + taxRate )
		return total
	}

	calculateBill( 100 )
	//	taxRate will default to .17 when nothing is passed in



	function caculateBill( billAmount, taxRate = .17, tipRate = .15 ) {
		const total billAmount * ( 1 + taxRate ) * tipRate
		return total
	}

	//	skip setting taxRate but set tipRate
	//	pass in undefined
	caculateBill( 100, undefined, .2 )

;```



