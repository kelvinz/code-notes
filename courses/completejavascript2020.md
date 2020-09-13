


<https://www.udemy.com/course/the-complete-javascript-course/>



# 01 - Course Introduction



## Welcome to the Course!
## Read Before you start!
## Setting up Our Tools

<https://github.com/jonasschmedtmann/complete-javascript-course>



---



# 02 - JavaScript Language Basics



## Section Intro
## Download the Code

<https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/2-JS-basics>



## Let's start coding
## A Brief Introduction to JavaScript
## Variables & Data Types
## Variable Mutation & Type Coercion
## Basic Operators
## Operator Percedence
## Coding Challenge 1
## Coding Challenge 1: Solution

```js

const massMark = 78
const heightMark = 1.69

const massJohn = 92
const heightJohn = 1.95

const BMIMark = massMark / ( heightMark * heightMark )
const BMIJohn = massJohn / ( heightJohn * heightJohn )
console.log( BMIMark, BMIJohn )

const markHigherBMI = BMIMark > BMIJohn
console.log( `Is Mark's BMI higher than John's? ${ markHigherBMI }` )

;```



## If/else Statements
## Boolean Logic
## The Ternary Operator & Switch Statements
## Truthy & Falsy Values & Equality Operators
## Coding Challenge 2
## Coding Challenge 2: Solution

```js

const scoreJohn = ( 189 + 120 + 103 ) / 3
const scoreMike = ( 129 + 94 + 123 ) / 3
const scoreMary = ( 97 + 134 + 105 ) / 3
console.log( scoreJohn, scoreMike, scoreMary )

if ( scoreJohn > scoreMike && scoreJohn > scoreMary ) {
	console.log( `John's team wins with ${ scoreJohn } points` )
} else if ( scoreMike > scoreJohn && scoreMike > scoreMary ) {
	console.log( `Mike's team wins with ${ scoreMike } points` )
} else if (scoreMary > scoreJohn && scoreMary > scoreMike ) {
	console.log( `Mary's team wins with ${ scoreMary } points` )
} else {
	console.log( `There is a draw` )
}

if ( scoreJohn > scoreMike ) {
	console.log( `John's team wins with ${ scoreJohn } points` )
} else if ( scoreMike > scoreJohn ) {
	console.log( `Mike's team wins with ${ scoreMike } points` )
} else {
	console.log( `There is a draw` )
}

;```



## Functions
## Function Statements & Expressions
## Arrays
## Coding Challenge
## Coding Challenge 3: Solution

```js

function tipCalculator( bill ) {
	let percentage
	if ( bill < 50 ) {
		percentage = .2
	} else if ( bill >= 50 && bill < 200 ) {
		percentage = .15
	} else {
		percentage = .1
	}
	return percentage * bill
}
const bills = [ 124, 48, 268 ]
const tips = [
				tipCalculator( bills[ 0 ] ),
				tipCalculator( bills[ 1 ] ),
				tipCalculator( bills[ 2 ] )
			]
const finalValues = [
						bills[ 0 ] + tips[ 0 ],
						bills[ 1 ] + tips[ 1 ],
						bills[ 2 ] + tips[ 2 ]
					]
console.log( tips, finalValues )

;```



## Objects & Properties
## Objects & Methods
## Coding Challenge 4
## Coding Challenge 4: Solution

```js

const john = {
	fullName: 'John Smith',
	mass: 110,
	height: 1.95,
	calcBMI() {
		return this.mass / ( this.height * this.height )
	}
}
const mark = {
	fullName: 'Mark Miller',
	mass: 78,
	height: 1.69,
	calcBMI() {
		return this.bmi = this.mass / ( this.height * this.height )
	}
}
if ( john.calcBMI() > mark.calcBMI() ) {
	console.log( `${ john.fullName } has a higher BMI of ${ john.bmi }` )
} else if ( mark.bmi > john.bmi ) {
	console.log( `${ mark.fullName } has a higher BMI of ${ mark.bmi }` )
} else {
	console.log( `They have the same BMI` )
}

;```



## Loops & Iteration
## Coding Challenge 5
## Coding Challenge 5: Solution, Part 1
## Coding Challenge 5: Solution, Part 2

```js

const john = {
	fullName: 'John Smith',
	bills: [ 124, 48, 268, 180, 42 ],
	calcTips() {
		this.tips = []
		this.finalValues = []

		for ( let i = 0; i < this.bills.length; i++ ) {
			let percentage
			const bill = this.bills[ i ]

			if ( bill < 50 ) {
				percentage = .2
			} else if ( bill >= 50 && bill < 200 ) {
				percentage = .15
			} else {
				percentage = .1
			}

			this.tips[ i ] = bill * percentage
			this.finalValues[ i ] = bill + bill * percentage
		}
	}
}

const mark = {
	fullName: 'Mark Miller',
	bills: [ 77, 475, 110, 45 ],
	calcTips() {
		this.tips = []
		this.finalValues = []

		for ( let i = 0; i < this.bills.length; i++ ) {
			let percentage
			const bill = this.bills[ i ]

			if ( bill < 100 ) {
				percentage = .2
			} else if ( bill >= 100 && bill < 300 ) {
				percentage = .1
			} else {
				percentage = .25
			}

			this.tips[ i ] = bill * percentage
			this.finalValues[ i ] = bill + bill * percentage
		}
	}
}
function calcAverage( tips ) {
	let sum = 0
	for ( let i = 0; i < tips.length; i++ ) {
		sum = sum + tips[ i ]
	}
	return sum / tips.length
}

john.calcTips()
mark.calcTips()
john.average = calcAverage( john.tips )
mark.average = calcAverage( mark.tips )
console.log( john, mark )

if ( john.average > mark.average ) {
	console.log( `${ john.fullName }'s family pays higher tips, with an average of $${ john.average }` )
} else if ( mark.average > john.average ) {
	console.log( `${ mark.fullName }'s family pays higher tips, with an average of $${ mark.average }` )
}

;```



## JavaScript Versions: ES5, ES6/ES2015 & ES6+



---



# 03 - How JavaScript Works Behind the Scenes



## Section Intro
## Download the Code

<https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/3-how-JS-works>



## How Our Code Is Executed: JavaScript Parsers & Engines
## Execution Contexts & the Execution Stack

**Execution Context**

- a box, a container, or a wrapper
- stores variables
- in which a piece of our code is evaluated & executed



**The Default**

- global execution context
- code that is not inside any function
- associated with the global object
- in the browser, that's the window object
- lastName === window.lastName



1. everytime a function is called
2. a new execution context is created
3. it will be added to the execution stack
4. it will be popped off the stack when it finishes running



## Execution Contexts in Detail: Creation & Execution Phases & Hoisting

1. **Creation Phase**
	- Creation of the Variable Object ( VO )
	- Creation of the scope chain
	- Determine value of the 'this' variable

2. **Execution Phase**
	- function that generated the current execution context is run line by line



## Hoisting in Practice
## Scoping & the Scope Chain

- scoping answers the question 'where can we access a certain variable'

- each new function creates a scope: the space/environment
- in which the variables it defines are accessible

- lexical scoping: a function that is lexically within another function
- gets access to the scope of the outer function



## The 'this' Keyword

- regular function call: the 'this' keyword points at the global object, window for browsers
- method call ( object's function ): the 'this' variable points to the object that is calling the method
- the 'this' keyword is not assigned a value until a function where it is defined is actually called



## The 'this' Keyword in Practice



---



# 04 - JavaScript in the Browser: DOM Manipulation & Events



## Section Intro
## Download the Code

<https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/4-DOM-pig-game>



## The DOM & DOM Manipulation
## 5-Minute HTML & CSS Crash Course
## Project Setup & Details
## First DOM Access & Manipulation
## Events & Event Handling: Rolling the Dice
## Updating Scores & Changing the Active Player
## Implementing Our 'Hold' Function & the DRY Principle
## Creating a Game Initialization
## Finishing Touches: State Variables
## Coding Challenge 6
## Coding Challenge 6: Solution, Part 1
## Coding Challenge 6: Solution, Part 2
## Coding Challenge 6: Solution, Part 3

```js

let scores, roundScore, activePlayer, gamePlaying

init()

let lastDice

document.querySelector( '.btn-roll' ).addEventListener( 'click', () => {
	if( gamePlaying ) {
		//	1. Random number
		const dice1 = Math.floor( Math.random() * 6 ) + 1
		const dice2 = Math.floor( Math.random() * 6 ) + 1

		//	2. Display the result
		document.getElementById( 'dice-1' ).style.display = 'block'
		document.getElementById( 'dice-2' ).style.display = 'block'
		document.getElementById( 'dice-1' ).src = `dice-${ dice1 }.png`
		document.getElementById( 'dice-2' ).src = `dice-${ dice2 }.png`

		//	3. Update the round score IF the rolled number was NOT a 1
		if ( dice1 !== 1 && dice2 !== 1 ) {
			//	Add score
			roundScore += dice1 + dice2
			document.querySelector( `#current-${ activePlayer }` ).textContent = roundScore
		} else {
			//	Next player
			nextPlayer()
		}

		/*
		if ( dice === 6 && lastDice === 6 ) {
			//	Player looses score
			scores[ activePlayer ] = 0
			document.querySelector( `#score-${ activePlayer }` ).textContent = '0'
			nextPlayer()
		} else if ( dice !== 1 ) {
			//	Add score
			roundScore += dice
			document.querySelector( `#current-${ activePlayer }` ).textContent = roundScore
		} else {
			//	Next player
			nextPlayer()
		}
		lastDice = dice
		*/
	}
})

document.querySelector( '.btn-hold' ).addEventListener( 'click', () => {
	if ( gamePlaying ) {
		//	Add CURRENT score to GLOBAL score
		scores[ activePlayer ] += roundScore

		//	Update the UI
		document.querySelector( `#score-${ activePlayer }` ).textContent = scores[ activePlayer ]

		var input = document.querySelector( '.final-score' ).value
		var winningScore

		//	Undefined, 0, null or "" are COERCED to false
		//	Anything else is COERCED to true
		if( input ) {
			winningScore = input
		} else {
			winningScore = 100
		}

		//	Check if player won the game
		if ( scores[ activePlayer ] >= winningScore ) {
			document.querySelector( `#name-${ activePlayer }` ).textContent = 'Winner!'
			document.getElementById( 'dice-1' ).style.display = 'none'
			document.getElementById( 'dice-2' ).style.display = 'none'
			document.querySelector( `.player-${ activePlayer }-panel` ).classList.add( 'winner' )
			document.querySelector( `.player-${ activePlayer }-panel` ).classList.remove( 'active' )
			gamePlaying = false
		} else {
			//	Next player
			nextPlayer()
		}
	}
})


function nextPlayer() {
	//	Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
	roundScore = 0

	document.getElementById( 'current-0' ).textContent = '0'
	document.getElementById( 'current-1' ).textContent = '0'

	document.querySelector( '.player-0-panel' ).classList.toggle( 'active' )
	document.querySelector( '.player-1-panel' ).classList.toggle( 'active' )

	// document.querySelector( '.player-0-panel' ).classList.remove( 'active' )
	// document.querySelector( '.player-1-panel' ).classList.add( 'active' )

	document.getElementById( 'dice-1' ).style.display = 'none'
	document.getElementById( 'dice-2' ).style.display = 'none'
}

document.querySelector( '.btn-new' ).addEventListener( 'click', init )

function init() {
	scores       = [ 0, 0 ]
	activePlayer = 0
	roundScore   = 0
	gamePlaying  = true

	document.getElementById( 'dice-1' ).style.display = 'none'
	document.getElementById( 'dice-2' ).style.display = 'none'

	document.getElementById( 'score-0' ).textContent = '0'
	document.getElementById( 'score-1' ).textContent = '0'
	document.getElementById( 'current-0' ).textContent = '0'
	document.getElementById( 'current-1' ).textContent = '0'
	document.getElementById( 'name-0' ).textContent = 'Player 1'
	document.getElementById( 'name-1' ).textContent = 'Player 2'
	document.querySelector( '.player-0-panel' ).classList.remove( 'winner' )
	document.querySelector( '.player-1-panel' ).classList.remove( 'winner' )
	document.querySelector( '.player-0-panel' ).classList.remove( 'active' )
	document.querySelector( '.player-1-panel' ).classList.remove( 'active' )
	document.querySelector( '.player-0-panel' ).classList.add( 'active' )
}

;```



---



# 05 - Advanced JavaScript: Objects & Functions



## Section Intro
## Download the Code

<https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/5-advanced-JS>



## Everything Is an Object: Inheritance & the Prototype Chain

Almost everything.

1. **Primitives**
	- Numbers
	- Strings
	- Booleans
	- Undefined
	- Null

2. **Object**
	- Arrays
	- Functions
	- Objects
	- Dates
	- Wrappers for Numbers, Strings, Booleans

Each object has a prototype property.
It works like a chain.
Method or property called on an object.
It will look for it's prototype.
If it's not found.
It goes up to it's parent to find it.
All the way to the root object.



## Creating Objects: Function Constructors

```js

//	object
const john = {
	name: 'John',
	dob: 1990,
	job: 'Teacher',
}

//	function constructor
const Person = function( name, dob, job ) {
	this.name = name
	this.dob = dob
	this.job = job
	this.calculateAge = function() {
		console.log( 2020 - this.dob )
	}
}

//	new keyword creates an empty object
//	then runs function constructor
//	making the this point to the empty object
const john = new Person( 'John', 1990, 'teacher' )

john.calculateAge()
//	30

//	attaching prototype to constructor
//	will be inherited by Person's child
Person.prototype.agePlusTwo = function() {
	console.log( 2020 - this.dob + 2 )
}

john.agePlusTwo()
//	32

;```



## The Prototype Chain in the Console

__proto__ is where you can see the prototype of an object
from there you can see its constructor
when you click in, you can find its __proto__
all the way up the chain to the mother object

john.hasOwnProperty( 'name' ) // false
john instance of Person // true



## Creating Objects: Object.create

```js

const personProto = {
	calculateAge() {
	console.log( 2016 - this.yearOfBirth )
    }
}

const john = Object.create( personProto )

john.name = 'John'
john.yearOfBirth = 1990
john.job = 'teacher'

const jane = Object.create( personProto, {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
} )

;```



## Primitives vs Objects

```js

//	Primitives
let a = 23
let b = a
a = 46
console.log( a ) // 46
console.log( b ) // 23



//	Objects
let obj1 = {
	name: 'John',
	age: 26
}
let obj2 = obj1
obj1.age = 30
console.log( obj1.age ) // 30
console.log( obj2.age ) // 30



//	Functions
let age = 27
let obj = {
	name: 'Jonas',
	city: 'Lisbon'
}

function change( a, b ) {
	a = 30
	b.city = 'San Francisco'
}

change( age, obj )
console.log( age ) // 27
console.log( obj.city ) // San Francisco

;```



## First Class Functions: Passing Functions as Arguments

```js

const years = [ 1990, 1965, 1937, 2005, 1998 ]
function arrayCalc( arr, fn ) {
	let arrRes = []
	for ( let i = 0; i < arr.length; i++ ) {
		arrRes.push( fn( arr[ i ] ) )
	}
	return arrRes
}
function calculateAge( el ) {
	return 2016 - el
}
function isFullAge( el ) {
	return el >= 18
}
function maxHeartRate( el ) {
	if ( el >= 18 && el <= 81 ) {
		return Math.round( 206.9 - ( 0.67 * el ) )
	} else {
		return -1
	}
}
const ages = arrayCalc( years, calculateAge )
const fullAges = arrayCalc( ages, isFullAge )
const rates = arrayCalc( ages, maxHeartRate )
console.log( ages ) // [ 26, 51, 79, 11, 18 ]
console.log( rates ) // [ 189, 173, 154, -1, 195 ]

;```



## First Class Functions: Functions Returning Functions

```js

function interviewQuestion( job ) {
	if ( job === 'designer' ) {
		return function( name ) {
			console.log( `${ name }, can you please explain what UX design is?` )
		}
	} else if ( job === 'teacher' ) {
		return function( name ) {
			console.log( `What subject do you teach, ${ name }?` )
			}
	} else {
		return function( name ) {
			console.log( `Hello ${ name }, what do you do?` )
		}
	}
}

const teacherQuestion = interviewQuestion( 'teacher' )
const designerQuestion = interviewQuestion( 'designer' )

teacherQuestion( 'John' ) // What subject do you teach, John?
designerQuestion( 'John' ) // John, can you please explain what UX design is?
designerQuestion( 'Jane' ) // Jane, can you please explain what UX design is?
designerQuestion( 'Mark' ) // Mark, can you please explain what UX design is?
designerQuestion( 'Mike' ) // Mike, can you please explain what UX design is?
interviewQuestion( 'teacher' )( 'Mark' ) // What subject do you teach, Mark?

;```



## Immediately Invoked Function Expressions ( IIFE )

```js

function game() {
	const score = Math.random() * 10
	console.log( score >= 5 )
}

game()



( function () {
	const score = Math.random() * 10
	console.log( score >= 5 )
} )()



( function ( goodLuck ) {
	const score = Math.random() * 10
	console.log( score >= 5 - goodLuck )
} )( 5 )

;```



## Closures

```js

function retirement( retirementAge ) {
	const a = ' years left until retirement.'
	return function( yearOfBirth ) {
		const age = 2016 - yearOfBirth
		console.log( ( retirementAge - age ) + a )
	}
}

const retirementUS = retirement( 66 )
const retirementGermany = retirement( 65 )
const retirementIceland = retirement( 67 )

retirementGermany( 1990 ) // 39 years left until retirement.
retirementUS( 1990 ) // 40 years left until retirement.
retirementIceland( 1990 ) // 41 years left until retirement.
retirement( 66 )( 1990 ) // 40 years left until retirement.



function interviewQuestion( job ) {
	return function( name ) {
		if ( job === 'designer' ) {
			console.log( `${ name }, can you please explain what UX design is?` )
		} else if ( job === 'teacher' ) {
			console.log( `What subject do you teach, ${ name }?` )
		} else {
			console.log( `Hello ${ name }, what do you do?` )
		}
	}
}

interviewQuestion( 'teacher' )( 'John' )
// What subject do you teach, John?

;```



---
