


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



## Bind, Call & Apply

```js

const john = {
	name: 'John',
	age: 26,
	job: 'teacher',
	presentation( style, timeOfDay ) {
		if ( style === 'formal' ) {
			console.log( `Good ${ timeOfDay }, Ladies and gentlemen! I'm ${ this.name }, I'm a ${ this.job } and I'm ${ this.age } years old.` )
		} else if ( style === 'friendly' ) {
			console.log( `Hey! What's up? I'm ${ this.name }, I'm a ${this.job} and I'm ${this.age} years old. Have a nice ${ timeOfDay }.` )
		}
	}
}

const emily = {
	name: 'Emily',
	age: 35,
	job: 'designer'
}

john.presentation( 'formal', 'morning' )
//	Good morning, Ladies and gentlemen! I'm John, I'm a teacher and I'm 26 years old.

john.presentation.call( emily, 'friendly', 'afternoon' )
//	Hey! What's up? I'm Emily, I'm a designer and I'm 35 years old. Have a nice afternoon.

john.presentation.apply( emily, [ 'friendly', 'afternoon' ] )
//	Hey! What's up? I'm Emily, I'm a designer and I'm 35 years old. Have a nice afternoon.

const johnFriendly = john.presentation.bind( john, 'friendly' )

johnFriendly( 'morning' )
//	Hey! What's up? I'm John, I'm a teacher and I'm 26 years old. Have a nice morning.

johnFriendly( 'night' )
//	Hey! What's up? I'm John, I'm a teacher and I'm 26 years old. Have a nice night.

const emilyFormal = john.presentation.bind( emily, 'formal' )
emilyFormal( 'afternoon' )
//	Good afternoon, Ladies and gentlemen! I'm Emily, I'm a designer and I'm 35 years old.



const years = [ 1990, 1965, 1937, 2005, 1998 ]

function arrayCalc(arr, fn) {
	let arrRes = []
	for ( let i = 0; i < arr.length; i++ ) {
		arrRes.push( fn( arr[ i ] ) )
	}
	return arrRes
}

function calculateAge( el ) {
	return 2016 - el
}

function isFullAge( limit, el ) {
	return el >= limit
}

const ages = arrayCalc( years, calculateAge )
const fullJapan = arrayCalc( ages, isFullAge.bind( this, 20 ) )
console.log( ages ) // [ 26, 51, 79, 11, 18 ]
console.log( fullJapan ) // [ true, true, true, false, false ]

;```



## Coding Challenge 7
## Coding Challenge 7: Solution Part 1

```js

( function() {
	function Question( question, answers, correct ) {
		this.question = question
		this.answers = answers
		this.correct = correct
	}

	Question.prototype.displayQuestion = function() {
		console.log( this.question )
		for ( let i = 0; i < this.answers.length; i++ ) {
			console.log( `${ i }: ${ this.answers[ i ] }` )
		}
	}

	Question.prototype.checkAnswer = function( ans ) {
		if ( ans === this.correct ) {
			console.log( 'Correct answer!' )
		} else {
			console.log( 'Wrong answer. Try again :)' )
		}
	}

	const q1 = new Question( 'Is JavaScript the coolest programming language in the world?',
						[ 'Yes', 'No' ], 0 )

	const q2 = new Question( `What is the name of this course's teacher?`,
						[ 'John', 'Micheal', 'Jonas' ], 2 )

	const q3 = new Question( 'What does best describe coding?',
						[ 'Boring', 'Hard', 'Fun', 'Tediuos' ], 2 )

	const questions = [ q1, q2, q3 ]
	const n = Math.floor( Math.random() * questions.length )
	questions[ n ].displayQuestion()

	const answer = parseInt( prompt( 'Please select the correct answer.' ) )
	questions[ n ].checkAnswer( answer )
} )()

;```



## Coding Challenge 7: Solution Part 2

```js

( function() {
	function Question( question, answers, correct ) {
		this.question = question
		this.answers = answers
		this.correct = correct
	}

	Question.prototype.displayQuestion = function() {
		console.log( this.question )
		for ( let i = 0; i < this.answers.length; i++ ) {
			console.log( `${ i }: ${ this.answers[ i ] }` )
		}
	}

	Question.prototype.checkAnswer = function( ans, callback ) {
		let sc

		if ( ans === this.correct ) {
			console.log( 'Correct answer!' )
			sc = callback( true )
		} else {
			console.log( 'Wrong answer. Try again :)' )
			sc = callback( false )
		}

		this.displayScore( sc )
	}

	Question.prototype.displayScore = function( score ) {
		console.log( `Your current score is: ${ score }` )
		console.log( '------------------------------' )
	}

	const q1 = new Question( 'Is JavaScript the coolest programming language in the world?',
						[ 'Yes', 'No' ], 0 )

	const q2 = new Question( `What is the name of this course's teacher?`,
						[ 'John', 'Micheal', 'Jonas' ], 2 )

	const q3 = new Question( 'What does best describe coding?',
						[ 'Boring', 'Hard', 'Fun', 'Tediuos' ], 2 )

	const questions = [ q1, q2, q3 ]

	function score() {
		let sc = 0
		return ( correct ) => {
			if ( correct ) {
				sc++
			}
			return sc
		}
	}

	const keepScore = score()

	function nextQuestion() {
		const n = Math.floor( Math.random() * questions.length )
		questions[ n ].displayQuestion()

		const answer = prompt( 'Please select the correct answer.' )
		if( answer !== 'exit' ) {
			questions[ n ].checkAnswer( parseInt( answer ), keepScore )
			nextQuestion()
		}
	}

	nextQuestion()

} )()

;```



---



# 06 - Putting It All Together: The Budget App Project



## Section Intro
## Download the Code

<https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/6-budgety>



## Project Setup & Details
## Project Planning & Architecture: Step 1
## Implementing the Module Pattern
## Setting up the First Event Listeners
## Reading Input Data
## Creating an Initialization Function
## Creating Incoming & Expense Function Constructors
## Adding a New Item to Our Budget Controller
## Adding a New Item to the UI
## Clearing Our Input Fields
## Updating the Budget: Controller
## Updating the Budget: Budget Controller
## Updating the Budget: UI Controller
## Project Planning & Architecture: Step 2
## Event Delegation
## Setting up the Delete Event Listener Using Event Delegation
## Deleting an Item from Our Buddget Controller
## Deleting an Item from the UI
## Project Planning & Architecture: Step 3
## Updating the Percentages: Controller
## Updating the Percentages: Buddget Controller
## Updating the Percentages: UI Controller
## Formatting Our Buddget Numbers: String Manipulation
## Displaying the Current Month & Year
## Finishing Touches: Improving the UX

```js

//	BUDGET CONTROLLER
const budgetController = ( function() {

	const Expense = function( id, description, value ) {
		this.id = id
		this.description = description
		this.value = value
		this.percentage = -1
	}

	Expense.prototype.calcPercentage = function( totalIncome ) {
		if ( totalIncome > 0 ) {
			this.percentage = Math.round( ( this.value / totalIncome ) * 100 )
		} else {
			this.percentage = -1
		}
	}

	Expense.prototype.getPercentage = function() {
		return this.percentage
	}

	const Income = function( id, description, value ) {
		this.id = id
		this.description = description
		this.value = value
	}

	const calculateTotal = function( type ) {
		let sum = 0
		data.allItems[ type ].forEach( function( cur ) {
			sum += cur.value
		} )
		data.totals[ type ] = sum
	}

	const data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	}

	return {
		addItem( type, des, val ) {
			let newItem, ID

			// [ 1 2 3 4 5 ], next ID = 6
			// [ 1 2 4 6 8 ], next ID = 9
			// ID = last ID + 1

			// Create new ID
			if ( data.allItems[type].length > 0 ) {
				ID = data.allItems[ type ][ data.allItems[ type ].length - 1 ].id + 1
			} else {
				ID = 0
			}

			// Create new item based on 'inc' or 'exp' type
			if ( type === 'exp' ) {
				newItem = new Expense( ID, des, val )
			} else if ( type === 'inc' ) {
				newItem = new Income( ID, des, val )
			}

			// Push it into our data structure
			data.allItems[ type ].push( newItem )

			// Return the new element
			return newItem
		},
		deleteItem( type, id ) {
			let ids, index

			// id = 6
			// data.allItems[ type ][ id ]
			// ids = [ 1 2 4 8 ]
			// index = 3

			ids = data.allItems[ type ].map( function( current ) {
				return current.id
			} )

			index = ids.indexOf( id )

			if ( index !== -1 ) {
				data.allItems[ type ].splice( index, 1 )
			}

		},
		calculateBudget() {

			// calculate total income and expenses
			calculateTotal( 'exp' )
			calculateTotal( 'inc' )

			// Calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp

			// calculate the percentage of income that we spent
			if ( data.totals.inc > 0 ) {
				data.percentage = Math.round( ( data.totals.exp / data.totals.inc ) * 100 )
			} else {
				data.percentage = -1
			}

			// Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
		},
		calculatePercentages() {
			/*
				a = 20
				b = 10
				c = 40
				income = 100
				a = 20 / 100 = 20%
				b = 10 / 100 = 10%
				c = 40 / 100 = 40%
			*/
			data.allItems.exp.forEach( function( cur ) {
			   cur.calcPercentage( data.totals.inc )
			} )
		},
		getPercentages() {
			const allPerc = data.allItems.exp.map( function( cur ) {
				return cur.getPercentage()
			} )
			return allPerc
		},
		getBudget() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
		},
		testing:() {
			console.log( data )
		}
	}

} )()



//	UI CONTROLLER
const UIController = ( function() {

	const DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',
		dateLabel: '.budget__title--month'
	}

	const formatNumber = function( num, type ) {
		let numSplit, int, dec, type
		/*
			+ or - before number
			exactly 2 decimal points
			comma separating the thousands
			2310.4567 -> + 2,310.46
			2000 -> + 2,000.00
		*/
		num = Math.abs( num )
		num = num.toFixed( 2 )

		numSplit = num.split( '.' )

		int = numSplit[ 0 ]
		if ( int.length > 3 ) {
			int = int.substr( 0, int.length - 3 ) + ',' + int.substr( int.length - 3, 3 )
			// input 23510, output 23,510
		}

		dec = numSplit[ 1 ]

		return ( type === 'exp' ? '-' : '+' ) + ' ' + int + '.' + dec
	}

	const nodeListForEach = function( list, callback ) {
		for ( let i = 0; i < list.length; i++ ) {
			callback( list[ i ], i )
		}
	}

	return {
		getInput() {
			return {
				type: document.querySelector( DOMstrings.inputType ).value, // Will be either inc or exp
				description: document.querySelector( DOMstrings.inputDescription ).value,
				value: parseFloat( document.querySelector( DOMstrings.inputValue ).value )
			}
		},
		addListItem( obj, type ) {
			let html, newHtml, element

			// Create HTML string with placeholder text
			if ( type === 'inc' ) {
				element = DOMstrings.incomeContainer

				html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			} else if ( type === 'exp' ) {
				element = DOMstrings.expensesContainer

				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}

			// Replace the placeholder text with some actual data
			newHtml = html.replace( '%id%', obj.id )
			newHtml = newHtml.replace( '%description%', obj.description )
			newHtml = newHtml.replace( '%value%', formatNumber( obj.value, type ) )

			// Insert the HTML into the DOM
			document.querySelector( element ).insertAdjacentHTML( 'beforeend', newHtml )
		},
		deleteListItem( selectorID ) {

			const el = document.getElementById( selectorID )
			el.parentNode.removeChild( el )

		},
		clearFields() {
			let fields, fieldsArr

			fields = document.querySelectorAll( DOMstrings.inputDescription + ', ' + DOMstrings.inputValue )

			fieldsArr = Array.prototype.slice.call( fields )

			fieldsArr.forEach( function( current, index, array ) {
				current.value = ""
			} )

			fieldsArr[ 0 ].focus()
		},
		displayBudget( obj ) {
			let type
			obj.budget > 0 ? type = 'inc' : type = 'exp'

			document.querySelector( DOMstrings.budgetLabel ).textContent = formatNumber( obj.budget, type )
			document.querySelector( DOMstrings.incomeLabel ).textContent = formatNumber( obj.totalInc, 'inc' )
			document.querySelector( DOMstrings.expensesLabel ).textContent = formatNumber( obj.totalExp, 'exp' )

			if ( obj.percentage > 0 ) {
				document.querySelector( DOMstrings.percentageLabel ).textContent = obj.percentage + '%'
			} else {
				document.querySelector( DOMstrings.percentageLabel ).textContent = '---'
			}

		},
		displayPercentages( percentages ) {

			const fields = document.querySelectorAll( DOMstrings.expensesPercLabel )

			nodeListForEach( fields, function( current, index ) {

				if ( percentages[ index ] > 0 ) {
					current.textContent = percentages[ index ] + '%'
				} else {
					current.textContent = '---'
				}
			} )

		},
		displayMonth() {
			let now, months, month, year

			now = new Date()
			// const christmas = new Date( 2016, 11, 25 )

			months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
			month = now.getMonth()

			year = now.getFullYear()
			document.querySelector( DOMstrings.dateLabel ).textContent = months[ month ] + ' ' + year
		},
		changedType() {

			const fields = document.querySelectorAll(
				DOMstrings.inputType + ',' +
				DOMstrings.inputDescription + ',' +
				DOMstrings.inputValue)

			nodeListForEach( fields, function( cur ) {
			   cur.classList.toggle( 'red-focus' )
			} )

			document.querySelector( DOMstrings.inputBtn ).classList.toggle( 'red' )

		},
		getDOMstrings() {
			return DOMstrings
		}
	}

} )()



//	GLOBAL APP CONTROLLER
const controller = ( function( budgetCtrl, UICtrl ) {

	const setupEventListeners = function() {
		const DOM = UICtrl.getDOMstrings()

		document.querySelector( DOM.inputBtn ).addEventListener( 'click', ctrlAddItem )

		document.addEventListener( 'keypress', function( event ) {
			if ( event.keyCode === 13 || event.which === 13 ) {
				ctrlAddItem()
			}
		} )

		document.querySelector( DOM.container ).addEventListener( 'click', ctrlDeleteItem )

		document.querySelector( DOM.inputType ).addEventListener( 'change', UICtrl.changedType )
	}

	const updateBudget = function() {

		// 1. Calculate the budget
		budgetCtrl.calculateBudget()

		// 2. Return the budget
		var budget = budgetCtrl.getBudget()

		// 3. Display the budget on the UI
		UICtrl.displayBudget( budget )
	}

	const updatePercentages = function() {

		// 1. Calculate percentages
		budgetCtrl.calculatePercentages()

		// 2. Read percentages from the budget controller
		var percentages = budgetCtrl.getPercentages()

		// 3. Update the UI with the new percentages
		UICtrl.displayPercentages( percentages )
	}

	const ctrlAddItem = function() {
		let input, newItem

		// 1. Get the field input data
		input = UICtrl.getInput()

		if ( input.description !== "" && !isNaN( input.value ) && input.value > 0 ) {
			// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem( input.type, input.description, input.value )

			// 3. Add the item to the UI
			UICtrl.addListItem( newItem, input.type )

			// 4. Clear the fields
			UICtrl.clearFields()

			// 5. Calculate and update budget
			updateBudget()

			// 6. Calculate and update percentages
			updatePercentages()
		}
	}

	const ctrlDeleteItem = function( event ) {
		let itemID, splitID, type, ID

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id

		if ( itemID ) {

			// inc-1
			splitID = itemID.split( '-' )
			type = splitID[ 0 ]
			ID = parseInt( splitID[ 1 ] )

			// 1. delete the item from the data structure
			budgetCtrl.deleteItem( type, ID )

			// 2. Delete the item from the UI
			UICtrl.deleteListItem( itemID )

			// 3. Update and show the new budget
			updateBudget()

			// 4. Calculate and update percentages
			updatePercentages()
		}
	}

	return {
		init() {
			console.log( 'Application has started.' )
			UICtrl.displayMonth()
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			} )
			setupEventListeners()
		}
	}

} )( budgetController, UIController )

controller.init()

;```



## We've Made It! Final Considerations



---



# 07 - Next Generation JavaScript: Intro to ES6/ES2015



## Section Intro
## Download the Code

<https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/7-ES6>



## What's new in ES6/ES2015
## Variable Declarations with let & const

var is function scoped
let & const is block scoped



## Blocks & IIFEs

```js

//	block
{
	const a = 1
}
console.log( a )
//	error



//	iife
( function() {
	var b = 1
} )()
console.log( b )
//	error

;```



## Strings in ES6/ES2015

```js

myString.startsWith( 'a' )
myString.endsWith( 'a' )
myString.includes( 'a' )
myString.repeat( 5 )

;```



## Arrow Functions: Basics
## Arrow Functions: Lexical 'this' Keyword

```js

const box = {
	color: 'green',
	myClick: function() {
		document.querySelector( '.green' ).addEventListener( 'click', function() {
			console.log( this.color )
			//	undefined
		} )
	}
}

const box = {
	color: 'green',
	myClick: function() {
		const self = this
		document.querySelector( '.green' ).addEventListener( 'click', function() {
			console.log( self.color )
			//	green
		} )
	}
}

const box = {
	color: 'green',
	myClick: function() {
		document.querySelector( '.green' ).addEventListener( 'click', () => {
			console.log( this.color )
			//	green
		} )
	}
}

const box = {
	color: 'green',
	myClick: () => {
		document.querySelector( '.green' ).addEventListener( 'click', () => {
			console.log( this.color )
			//	undefined
		} )
	}
}

;```

```js

function Person( name ) {
	this.name = name
}

Person.prototype.myFriends = function( friends ) {
	const arr = friends.map( function( el ) {
		return `${ this.name } is friends with ${ el }`
	} )
	console.log( arr )
}

const friends = [ 'Kelvin', 'Kelly' ]
new Person( 'John' ).myFriends( friends )
//	[ " is friends with Kelvin", " is friends with Kelly" ]



function Person( name ) {
	this.name = name
}

Person.prototype.myFriends = function( friends ) {
	const arr = friends.map( function( el ) {
		return `${ this.name } is friends with ${ el }`
	}.bind( this ) )
	console.log( arr )
}

const friends = [ 'Kelvin', 'Kelly' ]
new Person( 'John' ).myFriends( friends )
//	[ "John is friends with Kelvin", "John is friends with Kelly" ]



function Person( name ) {
	this.name = name
}

Person.prototype.myFriends = function( friends ) {
	const arr = friends.map( el => `${ this.name } is friends with ${ el }` )
	console.log( arr )
}

const friends = [ 'Kelvin', 'Kelly' ]
new Person( 'John' ).myFriends( friends )
//	[ "John is friends with Kelvin", "John is friends with Kelly" ]

;```



## Destructuring

```js

const [ name, age ] = [ 'John', 26 ]
//	name = 'John'
//	age = 26



const obj = {
	firstName: 'John',
	lastName: 'Smith',
}
const { firstName, lastName } = obj
//	firstName = 'John'
//	lastName = 'Smith'
const { firstName: firsty, lastName: lasty } = obj
//	firsty = 'John'
//	lasty = 'Smith'



function calcRetirementAge( year ) {
	const age = new Date().getFullYear() - year
	return [ age, 65 - age ]
}
const [ age, retirement ] = calcRetirementAge( 1990 )

;```



## Arrays in ES6/ES2015

```js

const boxes = document.querySelectorAll( '.box' )
const boxesArray = Array.from( boxes )

for ( const current of boxesArray ) {
	if ( current.className.includes( 'blue' ) ) {
		continue;
		//	similar to break
		//	but the loop continues instead of stopping the loop
		//	just skipping this round of the loop
	}
	current.textContent = 'I am blue'
}



const ages = [ 12, 17, 8, 21, 14, 11 ]
console.log( ages.findIndex( cur => cur >= 18 ) ) // 3
console.log( ages.find( cur => cur >= 18 ) ) // 21

;```



## The Spread Operator
## Rest Parameters

```js

//	with no args, it takes in anything into arguments
function isFullAge() {
	const years = Array.from( arguments )
	years.forEach( cur => console.log( 2020 - cur ) )
}
isFullAge( 1990, 1999, 1965 ) // 30, 21, 55



function isFullAge( ...years ) {
	years.forEach( cur => console.log( 2020 - cur ) )
}
isFullAge( 1990, 1999, 1965 ) // 30, 21, 55

function isFullAge( limit, ...years ) {
	years.forEach( cur => console.log( 2020 - cur >= limit ) )
}
isFullAge( 21, 1990, 1999, 1965 ) // true, true, true

;```



## Default Parameters
## Maps

```js

const question = new Map()
question.set( 'question', 'how are you' )
question.set( 1, 'good' )
question.set( 2, 'so-so' )
question.set( 3, 'bad' )
question.set( 'correct', 2 )
question.set( true, 'correct' )
question.set( false, 'wrong' )

console.log( question.get( 'question' ) ) // how are you
console.log( question.size ) // 7
console.log( question.delete( 3 ) ) // 3, 'bad' is deleted
console.log( question.has( 3 ) ) // false
question.clear() // map is empty now

question.forEach( ( value, key ) => console.log( key, value ) )

for ( let [ key, value ] of question.entries() ) {
	console.log( key, value, typeof( key ) ) // typeof returns string, number, boolean, etc
}

;```



## Classes

```js

//	es5
const Person = function( name, yob, job ) {
	this.name = name
	this.yob = yob
	this.job = job
}

Person.prototype.age = function() {
	console.log( new Date().getFullYear() - this.yob )
}

const john = new Person( 'John', 1990, 'teacher' )
john.age() // 30



//	es6 - syntactic sugar
//	same as above but written in different way
class Person {
	constructor ( name, yob, job ) {
		this.name = name
		this.yob = yob
		this.job = job
	}

	age() {
		console.log( new Date().getFullYear() - this.yob )
	}
}

const john = new Person( 'John', 1990, 'teacher' )
john.age() // 30

;```



## Classes with Subclasses

```js

//	es5
const Person = function( name, yob, job ) {
	this.name = name
	this.yob = yob
	this.job = job
}

Person.prototype.age = function() {
	console.log( new Date().getFullYear() - this.yob )
}

const Athlete = function( name, yob, job, medals ) {
	Person.call( this, name, yob, job )
	this.medals = medals
}

Athlete.prototype = Object.create( Person.prototype )

Athlete.prototype.won = function() {
	console.log( this.medals )
}

const john = new Athlete( 'John', 1990, 'teacher', 10 )
john.age() // 30
john.won() // 10



//	es6 - syntactic sugar
//	same as above but written in different way
class Person {
	constructor ( name, yob, job ) {
		this.name = name
		this.yob = yob
		this.job = job
	}

	age() {
		console.log( new Date().getFullYear() - this.yob )
	}
}

class Athlete extends Person {
	constructor( name, yob, job, medals ) {
		super( name, yob, job )
		this.medals = medals
	}

	won() {
		console.log( this.medals )
	}
}

const john = new Athlete( 'John', 1990, 'teacher', 10 )
john.age() // 30
john.won() // 10


;```



## Coding Challenge 8
## Coding Challenge 8: Solution

```js

class Element {
	constructor( name, buildYear ) {
		this.name = name
		this.buildYear = buildYear
	}
}

class Park extends Element {
	constructor( name, buildYear, area, numTrees ) {
		super( name, buildYear )
		this.area = area // km2
		this.numTrees = numTrees
	}

	treeDensity() {
		const density = this.numTrees / this.area
		console.log( `${ this.name } has a tree density of ${ density } trees per square km.`)
	}
}

class Street extends Element {
	constructor( name, buildYear, length, size = 3 ) {
		super( name, buildYear )
		this.length = length
		this.size = size
	}

	classifyStreet() {
		const classification = new Map()
		classification.set( 1, 'tiny' )
		classification.set( 2, 'small' )
		classification.set( 3, 'normal' )
		classification.set( 4, 'big' )
		classification.set( 5, 'huge' )
		console.log( `${ this.name }, build in ${ this.buildYear }, is a ${ classification.get( this.size ) } street.` )
	}
}

function calc( arr ) {
	const sum = arr.reduce( ( previous, current, index ) => previous + current, 0 )
	return [ sum, sum / arr.length ]
}

const allParks = [
					new Park( 'Green Park', 1987, .2, 215 ),
					new Park( 'National Park', 1894, 2.9, 3541 ),
					new Park( 'Oak Park', 1953, .4, 949 ),
				]

const allStreets = [
						new Street( 'Ocean Avenue', 1999, 1.1, 4 ),
						new Street( 'Evergreen Street', 2008, 2.7, 2 ),
						new Street( '4th Street', 2015, .8 ),
						new Street( 'Sunset Boulevard', 1982, 2.5, 5 ),
					]

function reportParks( p ) {
	console.log( `------- Parks Report -------`)

	//	density
	p.forEach( el => el.treeDensity() )

	/*
		Green Park has a tree density of 1075 trees per square km.
		National Park has a tree density of 1221.0344827586207 trees per square km.
		Oak Park has a tree density of 2372.5 trees per square km.
	*/

	//	average age
	const ages = p.map( el => new Date().getFullYear() - el.buildYear )
	const [ totalAge, avgAge ] = calc( ages )
	console.log( `Our ${ p.length } parks have an average of ${ avgAge } years.` )

	/*
		Our 3 parks have an average of 75.33333333333333 years.
	*/

	//	which park has more than 1k trees
	const i = p.map( el => el.numTrees ).findIndex( el => el >= 1000 )
	console.log( `${ p[ i ].name } has more than 1k trees.` )

	/*
		National Park has more than 1k trees.
	*/
}

function reportStreets( s ) {
	console.log( `------- Streets Report -------`)

	//	total & average length of the town's streets
	const [ totalLength, avgLength ] = calc( s.map( el => el.length ) )
	console.log( `Our ${ s.length } streets have a total length of ${ totalLength }km, with an average of ${ avgLength }km.` )
	/*
		Our 4 streets have a total length of 7.1000000000000005km, with an average of 1.7750000000000001km.
	*/

	//	classify sizes
	s.forEach( el => el.classifyStreet() )

	/*
		Ocean Avenue, build in 1999, is a big street.
		Evergreen Street, build in 2008, is a small street.
		4th Street, build in 2015, is a normal street.
		Sunset Boulevard, build in 1982, is a huge street.
	*/
}

reportParks( allParks )
reportStreets( allStreets )

;```



---



# 08 - Asynchronous JavaScript: Promises, Async/Await & Ajax



## Section Intro
## Download the Code

<https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/8-asynchronous-JS>



## An Example of Asynchronous JavaScript

```js

const second = () => {
	console.log( 'second' )
}

const first = () => {
	console.log( 'hey there' )
	second()
	console.log( 'the end' )
}

//	hey there
//	second
//	the end

;```

```js

const second = () => {
	setTimeout( () => {
		console.log( 'async hey there' )
	}, 2000 )
}

const first = () => {
	console.log( 'hey there' )
	second()
	console.log( 'the end' )
}

//	hey there
//	the end
//	async hey there

;```



## Understanding Asynchronous JavaScript: The Event Loop
## The Old Way: Asynchronous JavaScript with Callbacks

```js

function getRecipe() {

	setTimeout( () => {

		const recipeID = [ 523, 883, 432, 794 ]
		console.log( recipeID )

		setTimeout( id => {
			const recipe = {
				title: `Fresh tomato pasta`,
				publisher: `Jonas`,
			}
			console.log( `${ id }: ${ recipe.title }` )

			setTimeout( publisher => {
				const recipe = {
					title: `Italian pizza`,
					publisher,
				}
				console.log( recipe )

			}, 1500, recipe.publisher )

		}, 1500, recipeID[ 2 ] )

	}, 1500 )

}

getRecipe()

//	[ 523, 883, 432, 794 ]
//	432: Fresh tomato pasta
//	{ title: `Italian pizza`, publisher: `Jonas`, }

;```



## From Callback Hell to Promises

```js

const getIDs = new Promise( ( resolve, reject ) => {
	setTimeout( () => {
		resolve( [ 523, 883, 432, 794 ] )
	}, 1500 )
} )

const getRecipe = recID => {
	return new Promise( ( resolve, reject ) => {
		setTimeout( ID => {
			const recipe = {
				title: `Fresh tomato pasta`,
				publisher: `Jonas`,
			}
			resolve( `${ id }: ${ recipe.title }` )
		}, 1500, recID )
	} )
}

const getRelated = publisher => {
	return new Promise( ( resolve, reject ) => {
		setTimeout( publisher => {
			const recipe = {
				title: `Italian pizza`,
				publisher,
			}
			return( recipe )
		}, 1500, publisher )
	} )
}

getIDs
.then( IDs => {
	console.log( IDs )
	return getRecipe( IDs[ 2 ] )
} )
.then( recipe => {
	console.log( recipe )
	return getRelated( `Jonas` )
} )
.then( recipe => {
	console.log( recipe )
} )
.catch( err => console.log( err ) )

//	[ 523, 883, 432, 794 ]
//	432: Fresh tomato pasta
//	{ title: `Italian pizza`, publisher: `Jonas`, }

;```



## From Promises to Async/Await

```js

const getIDs = new Promise( ( resolve, reject ) => {
	setTimeout( () => {
		resolve( [ 523, 883, 432, 794 ] )
	}, 1500 )
} )

const getRecipe = recID => {
	return new Promise( ( resolve, reject ) => {
		setTimeout( ID => {
			const recipe = {
				title: `Fresh tomato pasta`,
				publisher: `Jonas`,
			}
			resolve( `${ id }: ${ recipe.title }` )
		}, 1500, recID )
	} )
}

const getRelated = publisher => {
	return new Promise( ( resolve, reject ) => {
		setTimeout( publisher => {
			const recipe = {
				title: `Italian pizza`,
				publisher,
			}
			return( recipe )
		}, 1500, publisher )
	} )
}

async function getRecipes() {
	const IDs = await getIDs
	console.log( IDs )
	const recipe = await getRecipe( IDs[ 2 ] )
	console.log( recipe )
	const related = await getRelated( `Jonas` )
	console.log( related )
}

getRecipes()

//	[ 523, 883, 432, 794 ]
//	432: Fresh tomato pasta
//	{ title: `Italian pizza`, publisher: `Jonas`, }



;```

```js

async function getRecipes() {
	const IDs = await getIDs
	console.log( IDs )
	const recipe = await getRecipe( IDs[ 2 ] )
	console.log( recipe )
	const related = await getRelated( `Jonas` )
	console.log( related )

	return recipe
}

const rec = getRecipes()
console.log( rec )
//	Promise

getRecipes().then( result => {
	console.log( result )
} )
//	432: Fresh tomato pasta

;```



## Ajax & APIs

Ajax => Asynchronous JavaScript And XML
API  => Application Programming Interface



## Making Ajax Calls with Fetch & Promises

```js

fetch( `https://crossorigin.me/https://www.metaweather.com/api/location/2487956/` )
.then( res => res.json() ) // return res.json promise
.then( data => console.log( data ) )
.catch( err => console.log( err ) )

;```

```js

function getWeather( woeid ) {
	fetch( `https://crossorigin.me/https://www.metaweather.com/api/location/${ woeid }/` )
	.then( res => {
		return res.json()
	} )
	.then( data => {
		const today = data.consolidated_weather[ 0 ]
		console.log( `Temp in ${ data.title } stay between ${ today.min_temp } and ${ today.max_temp }.` )
	} )
	.catch( err => console.log( err ) )
}

getWeather( 2487956 )
getWeather( 44418 )

;```



## Making Ajax Callback with Fetch & Async/Await

```js

async function getWeather( woeid ) {
	try {
		const result = await fetch( `https://crossorigin.me/https://www.metaweather.com/api/location/${ woeid }/` )
		const data = await result.json()
		const today = data.consolidated_weather[ 0 ]
		console.log( `Temp in ${ data.title } stay between ${ today.min_temp } and ${ today.max_temp }.` )
	} catch( err ) {
		console.log( err )
	}
}

getWeather( 2487956 )
getWeather( 44418 )

;```



---



# 09 - Modern JavaScript: Using ES6, NPM, Babel & Webpack



## Section Intro
## Download the Code

<https://github.com/jonasschmedtmann/complete-javascript-course/tree/master/9-forkify>



## Project Overview
## An Overview of Modern JavaScript
## A Brief Introduction to the Command Line
## A Modern Setup: Installing Node.js & NPM
## Note: Tooling Changes
## A Modern Setup: Configuring Webpack
## A Modern Setup: The Webpack Dev Server
## A Modern Setup: Babel
## Planning our Project Architecture with MVC
## How ES6 Modules Work
## Please Read: Changes to the Project API
## Making our First API Calls

https://corsproxy.github.io/
https://cors-anywhere.herokuapp.com/

```js

import axios from 'axios'

async function getResults( query ) {
	const proxy = 'https://cors-anywhere.herokuapp.com/'
	const key = '462b1cc8d4f2730071462fbc65136320'
	try {
		const res = await axios( `${ proxy }http://food2fork.com/api/search?key=${ key }&q=${ query }`)
		const recipes = res.data.recipes
		console.log( recipes )
	} catch( error ) {
		alert( error )
	}
}

getResults( 'pizza' )

;```



## Building the Search Model

search.js

```js

import axios from 'axios'

export default class Search {
	constructor( query ) {
		this.query = query
	}

	async getResults() {
		const proxy = 'https://cors-anywhere.herokuapp.com/'
		const key = '462b1cc8d4f2730071462fbc65136320'
		try {
			const res = await axios( `${ proxy }http://food2fork.com/api/search?key=${ key }&q=${ this.query }` )
			this.result = res.data.recipes
		} catch( error ) {
			alert( error )
		}
	}
}

;```

```js

import Search from './models/Search'

const search = new Search( 'pizza' )
search.getResults()

;```



## Building the Search Controller
## Building the Search View - Part 1
## Building the Search View - Part 2

base.js

```js

export const elements = {
	searchForm: document.querySelector( '.search' ),
	searchInput: document.querySelector( '.search__field' ),
	searchResList: document.querySelector( '.results__list' ),
}

;```



index.js

```js

import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements } from './views/base'

const state = {}

const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput()

	if ( query ) {
		// 2. new search object added to state
		state.search = new Search( query )

		// 3. prepare ui for search
		searchView.clearInput()
		searchView.clearResults()

		// 4. search for recipes
		await state.search.getResults()

		// 5. render results on ui
		searchView.renderResults( state.search.result )
	}
}

elements.searchForm.addEventListener( 'submit', e => {
	e.preventDefault()
	controlSearch()
} )

;```



searchView.js

```js

import { elements } from './base'

export const getInput = () => elements.searchInput.value

export const clearInput = () => {
	elements.searchInput.value = ''
}

export const clearResults = () => {
	elements.searchResList.innerHTML = ''
}

const limitRecipeTitle = ( title, limit = 17 ) => {
	const newTitle = []
	if ( title.length > limit ) {
		title.split( ' ' ).reduce( ( acc, cur ) => {
			if ( acc + cur.length <= limit ) {
				newTitle.push( cur )
			}
			return acc + cur.length
		}, 0 )

		return `${ newTitle.join( ' ' ) } ...`
	}
	return title
}

const renderRecipe = recipe => {
	const markup = `
		<li>
			<a href="#${ recipe.recipe_id }">
				<figure>
					<img src="${ recipe.image_url }" alt="${ recipe.title }">
				</figure>
				<div>
					<h4>${ limitRecipeTitle( recipe.title ) }</h4>
					<p>${ recipe.publisher }</p>
				</div>
			</a>
		</li>
	`
	elements.searchResList.insertAdjacentHTML( 'beforeend', markup )
}

export const renderResults = recipes => {
	recipes.forEach( renderRecipe )
}

;```



## Rendering an Ajax Loading Spinner

base.js

```js

export const elements = {
	searchForm: document.querySelector( '.search' ),
	searchInput: document.querySelector( '.search__field' ),
	searchRes: document.querySelector( '.results' ),
	searchResList: document.querySelector( '.results__list' ),
}

export const elementStrings = {
	loader: 'loader'
}

export const renderLoader = parent => {
	const loader = `
		<div class="${ elementStrings.loader }">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`
	parent.insertAdjacentHTML( 'afterbegin', loader )
}

export const clearLoader = () => {
	const loader = document.querySelector( `.${ elementStrings.loader }` )
	if ( loader ) loader.parentElement.removeChild( loader )
}

;```



index.js

```js

import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}

const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput()

	if ( query ) {
		// 2. new search object added to state
		state.search = new Search( query )

		// 3. prepare ui for search
		searchView.clearInput()
		searchView.clearResults()
		renderLoader( elements.searchRes )

		// 4. search for recipes
		await state.search.getResults()

		// 5. render results on ui
		clearLoader()
		searchView.renderResults( state.search.result )
	}
}

elements.searchForm.addEventListener( 'submit', e => {
	e.preventDefault()
	controlSearch()
} )

;```



## Implementing Search Results Pagination

base.js

```js

export const elements = {
	searchForm: document.querySelector( '.search' ),
	searchInput: document.querySelector( '.search__field' ),
	searchRes: document.querySelector( '.results' ),
	searchResList: document.querySelector( '.results__list' ),
	searchResPages: document.querySelector( '.results__pages' )
}

export const elementStrings = {
	loader: 'loader'
}

export const renderLoader = parent => {
	const loader = `
		<div class="${ elementStrings.loader }">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`
	parent.insertAdjacentHTML( 'afterbegin', loader )
}

export const clearLoader = () => {
	const loader = document.querySelector( `.${ elementStrings.loader }` )
	if ( loader ) loader.parentElement.removeChild( loader )
}

;```



searchView.js

```js

import { elements } from './base'

export const getInput = () => elements.searchInput.value

export const clearInput = () => {
	elements.searchInput.value = ''
}

export const clearResults = () => {
	elements.searchResList.innerHTML = ''
	elements.searchResPages.innerHTML = ''
}

const limitRecipeTitle = ( title, limit = 17 ) => {
	const newTitle = []
	if ( title.length > limit ) {
		title.split( ' ' ).reduce( ( acc, cur ) => {
			if ( acc + cur.length <= limit ) {
				newTitle.push( cur )
			}
			return acc + cur.length
		}, 0 )

		return `${ newTitle.join( ' ' ) } ...`
	}
	return title
}

const renderRecipe = recipe => {
	const markup = `
		<li>
			<a href="#${ recipe.recipe_id }">
				<figure>
					<img src="${ recipe.image_url }" alt="${ recipe.title }">
				</figure>
				<div>
					<h4>${ limitRecipeTitle( recipe.title ) }</h4>
					<p>${ recipe.publisher }</p>
				</div>
			</a>
		</li>
	`
	elements.searchResList.insertAdjacentHTML( 'beforeend', markup )
}

const createButton = ( page, type ) => `
	<button class="btn-inline results__btn--${ type }" data-goto=${ type === 'prev' ? page - 1 : page + 1 }>
		<span>Page ${ type === 'prev' ? page - 1 : page + 1 }</span>
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right' }"></use>
		</svg>
	</button>
`

const renderButtons( page, numResults, resPerPage ) => {
	const pages = Math.ceil( numResults / resPerPage )

	let button
	if ( page === 1 && pages > 1 ) {
		button = createButton( page, 'next' )
	} else if( page < pages ) {
		button = `
			${ createButton( page, 'next' ) }
			${ createButton( page, 'prev' ) }
		`
	} else if ( page === pages && pages > 1 ) {
		button = createButton( page, 'prev' )
	}

	elements.searchResPages.insertAdjacentHTML( 'afterbegin', button )
}

export const renderResults = ( recipes, page = 1, resPerPage = 10 ) => {
	const start = ( page - 1 ) * resPerPage
	const end = page * resPerPage

	recipes.slice( start, end ).forEach( renderRecipe )
	renderButtons( page, recipes.length, resPerPage )
}

;```



index.js

```js

import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}

const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput()

	if ( query ) {
		// 2. new search object added to state
		state.search = new Search( query )

		// 3. prepare ui for search
		searchView.clearInput()
		searchView.clearResults()
		renderLoader( elements.searchRes )

		// 4. search for recipes
		await state.search.getResults()

		// 5. render results on ui
		clearLoader()
		searchView.renderResults( state.search.result )
	}
}

elements.searchForm.addEventListener( 'submit', e => {
	e.preventDefault()
	controlSearch()
} )

elements.searchResPages.addEventListener( 'click', e => {
	const btn = e.target.closest( '.btn-inline' )
	if ( btn ) {
		const goToPage = parseInt( btn.dataset.goto, 10 )
		searchView.clearResults()
		searchView.renderResults( state.search.result, goToPage )
	}
} )

;```



## Building the Recipe Model - Part 1

config.js

```js

export const proxy = `https://cors-anywhere.herokuapp.com/`
export const key = `462b1cc8d4f2730071462fbc65136320`

;```



recipe.js

```js

import axios from 'axios'
import { key, proxy } from '../config.js'

export default class Recipe {
	constructor( id ) {
		this.id = id
	}

	async getRecipe() {
		try {
			const res = await axios( `${ proxy }http://food2fork.com/api/get?key=${ key }&rId=${ this.id }` )
			this.title = res.data.recipe.title
			this.author = res.data.recipe.publisher
			this.img = res.data.recipe.image_url
			this.url = res.data.recipe.source_url
			this.ingredients = res.data.recipe.ingredients
		} catch( err ) {
			alert( `Something went wrong!` )
			console.log( err )
		}
	}

	calcTime() {
		//	assuming 15 mins for every 3 ingredients
		const numIng = this.ingredients.length
		const periods = Math.ceil( numIng / 3 )
		this.time = periods * 15
	}

	calcServings() {
		this.servings = 4
	}
}

;```



search.js

```js

import axios from 'axios'
import { key, proxy } from '../config.js'

export default class Search {
	constructor( query ) {
		this.query = query
	}

	async getResults() {
		const proxy = 'https://cors-anywhere.herokuapp.com/'
		const key = '462b1cc8d4f2730071462fbc65136320'
		try {
			const res = await axios( `${ proxy }http://food2fork.com/api/search?key=${ key }&q=${ this.query }` )
			this.result = res.data.recipes
		} catch( error ) {
			alert( error )
		}
	}
}

;```



index.js

```js

import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}



//	search controller
const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput()

	if ( query ) {
		// 2. new search object added to state
		state.search = new Search( query )

		// 3. prepare ui for search
		searchView.clearInput()
		searchView.clearResults()
		renderLoader( elements.searchRes )

		// 4. search for recipes
		await state.search.getResults()

		// 5. render results on ui
		clearLoader()
		searchView.renderResults( state.search.result )
	}
}

elements.searchForm.addEventListener( 'submit', e => {
	e.preventDefault()
	controlSearch()
} )

elements.searchResPages.addEventListener( 'click', e => {
	const btn = e.target.closest( '.btn-inline' )
	if ( btn ) {
		const goToPage = parseInt( btn.dataset.goto, 10 )
		searchView.clearResults()
		searchView.renderResults( state.search.result, goToPage )
	}
} )



//	recipe controller
const r = new Recipe()
r.getRecipe()

;```



## Building the Recipe Controller

index.js

```js

import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}



//	search controller
const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput()

	if ( query ) {
		// 2. new search object added to state
		state.search = new Search( query )

		// 3. prepare ui for search
		searchView.clearInput()
		searchView.clearResults()
		renderLoader( elements.searchRes )

		try {
			// 4. search for recipes
			await state.search.getResults()

			// 5. render results on ui
			clearLoader()
			searchView.renderResults( state.search.result )
		} catch( err ) {
			alert( `Something went wrong with the serach...` )
			clearLoader()
		}
	}
}

elements.searchForm.addEventListener( 'submit', e => {
	e.preventDefault()
	controlSearch()
} )

elements.searchResPages.addEventListener( 'click', e => {
	const btn = e.target.closest( '.btn-inline' )
	if ( btn ) {
		const goToPage = parseInt( btn.dataset.goto, 10 )
		searchView.clearResults()
		searchView.renderResults( state.search.result, goToPage )
	}
} )



//	recipe controller
const controlRecipe = async () => {
	//	get id from url
	const id = window.location.hash.replace( '#', '' )

	if ( id ) {
		//	prepare ui for changes

		//	create new recipe obj
		state.recipe = new Recipe( id )

		try {
			//	get recipe data
			await state.recipe.getRecipe()

			//	calculate time & servings
			state.recipe.calcTime()
			state.recipe.calcServings()

			//	render recipe

		} catch ( err ) {
			alert( `Error processing recipe!` )
		}
	}
}

// window.addEventListener( 'hashchange', controlRecipe )
// window.addEventListener( 'load', controlRecipe )

[ 'hashchange', 'load' ].forEach( e => window.addEventListener( e, controlRecipe ) )

;```



## Building the Recipe Model - Part 2

recipe.js

```js

import axios from 'axios'
import { key, proxy } from '../config.js'

export default class Recipe {
	constructor( id ) {
		this.id = id
	}

	async getRecipe() {
		try {
			const res = await axios( `${ proxy }http://food2fork.com/api/get?key=${ key }&rId=${ this.id }` )
			this.title = res.data.recipe.title
			this.author = res.data.recipe.publisher
			this.img = res.data.recipe.image_url
			this.url = res.data.recipe.source_url
			this.ingredients = res.data.recipe.ingredients
		} catch( err ) {
			alert( `Something went wrong!` )
			console.log( err )
		}
	}

	calcTime() {
		//	assuming 15 mins for every 3 ingredients
		const numIng = this.ingredients.length
		const periods = Math.ceil( numIng / 3 )
		this.time = periods * 15
	}

	calcServings() {
		this.servings = 4
	}

	parseIngredients() {
		const unitsLong =	[
								'tablespoons', 'tablespoon',
								'ounces', 'ounce',
								'teaspoons', 'teaspoon',
								'cups', 'pounds'
							]

		const unitsShort =	[
								'tbsp', 'tbsp',
								'oz', 'oz',
								'tsp', 'tsp',
								'cup', 'pound'
							]

		const units = [ ...unitsShort, 'kg', 'g' ]

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
			const unitIndex = arrIng.findIndex( el2 => units.includes( el2 ) )

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

		this.ingredients = newIngredients
	}
}

;```



## Building the Recipe View - Part 1

index.js

```js

import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}



//	search controller
const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput()

	if ( query ) {
		// 2. new search object added to state
		state.search = new Search( query )

		// 3. prepare ui for search
		searchView.clearInput()
		searchView.clearResults()
		renderLoader( elements.searchRes )

		try {
			// 4. search for recipes
			await state.search.getResults()

			// 5. render results on ui
			clearLoader()
			searchView.renderResults( state.search.result )
		} catch( err ) {
			alert( `Something went wrong with the serach...` )
			clearLoader()
		}
	}
}

elements.searchForm.addEventListener( 'submit', e => {
	e.preventDefault()
	controlSearch()
} )

elements.searchResPages.addEventListener( 'click', e => {
	const btn = e.target.closest( '.btn-inline' )
	if ( btn ) {
		const goToPage = parseInt( btn.dataset.goto, 10 )
		searchView.clearResults()
		searchView.renderResults( state.search.result, goToPage )
	}
} )



//	recipe controller
const controlRecipe = async () => {
	//	get id from url
	const id = window.location.hash.replace( '#', '' )

	if ( id ) {
		//	prepare ui for changes
		recipeView.clearRecipe()
		renderLoader( elements.recipe )

		//	create new recipe obj
		state.recipe = new Recipe( id )

		try {
			//	get recipe data
			await state.recipe.getRecipe()

			//	calculate time & servings
			state.recipe.calcTime()
			state.recipe.calcServings()

			//	render recipe
			clearLoader()
			recipeView.renderRecipe( state.recipe )
		} catch ( err ) {
			alert( `Error processing recipe!` )
		}
	}
}

// window.addEventListener( 'hashchange', controlRecipe )
// window.addEventListener( 'load', controlRecipe )

[ 'hashchange', 'load' ].forEach( e => window.addEventListener( e, controlRecipe ) )

;```



recipeView.js

```js

import { elements } from './views/base'

export const clearRecipe = () => {
	elements.recipe.innerHTML = ``
}

const createIngredient = ingredient => `
	<li class="recipe__item">
		<svg class="recipe__icon">
			<use href="img/icons.svg#icon-check"></use>
		</svg>
		<div class="recipe__count">${ ingredient.count }</div>
		<div class="recipe__ingredient">
			<span class="recipe__unit">${ ingredient.unit }</span>
			${ ingredient.ingredient }
		</div>
	</li>
`

export const renderRecipe = recipe => {
	const markup = `
		<figure class="recipe__fig">
			<img src="${ recipe.img }" alt="${ recipe.title }" class="recipe__img">
			<h1 class="recipe__title">
				<span>${ recipe.title }</span>
			</h1>
		</figure>

		<div class="recipe__details">
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="img/icons.svg#icon-stopwatch"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--minutes">${ recipe.time }</span>
				<span class="recipe__info-text"> minutes</span>
			</div>
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="img/icons.svg#icon-man"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--people">${ recipe.servings }</span>
				<span class="recipe__info-text"> servings</span>

				<div class="recipe__info-buttons">
					<button class="btn-tiny btn-decrease">
						<svg>
							<use href="img/icons.svg#icon-circle-with-minus"></use>
						</svg>
					</button>
					<button class="btn-tiny btn-increase">
						<svg>
							<use href="img/icons.svg#icon-circle-with-plus"></use>
						</svg>
					</button>
				</div>

			</div>
			<button class="recipe__love">
				<svg class="header__likes">
					<use href="img/icons.svg#icon-heart${ isLiked ? '' : '-outlined' }"></use>
				</svg>
			</button>
		</div>

		<div class="recipe__ingredients">
			<ul class="recipe__ingredient-list">
				${ recipe.ingredients.map( el => createIngredient( el ) ).join('') }
			</ul>

			<button class="btn-small recipe__btn recipe__btn--add">
				<svg class="search__icon">
					<use href="img/icons.svg#icon-shopping-cart"></use>
				</svg>
				<span>Add to shopping list</span>
			</button>
		</div>

		<div class="recipe__directions">
			<h2 class="heading-2">How to cook it</h2>
			<p class="recipe__directions-text">
				This recipe was carefully designed and tested by
				<span class="recipe__by">${ recipe.author }</span>. Please check out directions at their website.
			</p>
			<a class="btn-small recipe__btn" href="${ recipe.url }" target="_blank">
				<span>Directions</span>
				<svg class="search__icon">
					<use href="img/icons.svg#icon-triangle-right"></use>
				</svg>
			</a>
		</div>
	`

	elements.recipe.insertAdjacentHTML( 'afterbegin', markup )
}

;```



base.js

```js

export const elements = {
	searchForm: document.querySelector( '.search' ),
	searchInput: document.querySelector( '.search__field' ),
	searchRes: document.querySelector( '.results' ),
	searchResList: document.querySelector( '.results__list' ),
	recipe: document.querySelector( '.recipe' ),
}

export const elementStrings = {
	loader: 'loader'
}

export const renderLoader = parent => {
	const loader = `
		<div class="${ elementStrings.loader }">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`
	parent.insertAdjacentHTML( 'afterbegin', loader )
}

export const clearLoader = () => {
	const loader = document.querySelector( `.${ elementStrings.loader }` )
	if ( loader ) loader.parentElement.removeChild( loader )
}

;```



## Building the Recipe View - Part 2

npm install fractional

recipeView.js

```js

import { elements } from './views/base'
import { Fraction } from 'fractional'

export const clearRecipe = () => {
	elements.recipe.innerHTML = ``
}

const formatCount = count => {
	if ( count ) {
		//	count = 2.5 -> 2 1/2
		//	count = 0.5 -> 1/2
		const [ int, dec ] = count.toString().split( '.' ).map( el => parseInt( el, 10 ) )

		if ( !dec ) return count

		if ( int === 0 ) {
			const fr = new Fraction( count )
			return `${ fr.numerator }/${ fr.denominator }`
		} else {
			const fr = new Fraction( count - int )
			return `${ int } ${ fr.numerator }/${ fr.denominator }`
		}
	}
}

const createIngredient = ingredient => `
	<li class="recipe__item">
		<svg class="recipe__icon">
			<use href="img/icons.svg#icon-check"></use>
		</svg>
		<div class="recipe__count">${ formatCount( ingredient.count ) }</div>
		<div class="recipe__ingredient">
			<span class="recipe__unit">${ ingredient.unit }</span>
			${ ingredient.ingredient }
		</div>
	</li>
`

export const renderRecipe = recipe => {
	const markup = `
		<figure class="recipe__fig">
			<img src="${ recipe.img }" alt="${ recipe.title }" class="recipe__img">
			<h1 class="recipe__title">
				<span>${ recipe.title }</span>
			</h1>
		</figure>

		<div class="recipe__details">
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="img/icons.svg#icon-stopwatch"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--minutes">${ recipe.time }</span>
				<span class="recipe__info-text"> minutes</span>
			</div>
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="img/icons.svg#icon-man"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--people">${ recipe.servings }</span>
				<span class="recipe__info-text"> servings</span>

				<div class="recipe__info-buttons">
					<button class="btn-tiny btn-decrease">
						<svg>
							<use href="img/icons.svg#icon-circle-with-minus"></use>
						</svg>
					</button>
					<button class="btn-tiny btn-increase">
						<svg>
							<use href="img/icons.svg#icon-circle-with-plus"></use>
						</svg>
					</button>
				</div>

			</div>
			<button class="recipe__love">
				<svg class="header__likes">
					<use href="img/icons.svg#icon-heart${ isLiked ? '' : '-outlined' }"></use>
				</svg>
			</button>
		</div>

		<div class="recipe__ingredients">
			<ul class="recipe__ingredient-list">
				${ recipe.ingredients.map( el => createIngredient( el ) ).join('') }
			</ul>

			<button class="btn-small recipe__btn recipe__btn--add">
				<svg class="search__icon">
					<use href="img/icons.svg#icon-shopping-cart"></use>
				</svg>
				<span>Add to shopping list</span>
			</button>
		</div>

		<div class="recipe__directions">
			<h2 class="heading-2">How to cook it</h2>
			<p class="recipe__directions-text">
				This recipe was carefully designed and tested by
				<span class="recipe__by">${ recipe.author }</span>. Please check out directions at their website.
			</p>
			<a class="btn-small recipe__btn" href="${ recipe.url }" target="_blank">
				<span>Directions</span>
				<svg class="search__icon">
					<use href="img/icons.svg#icon-triangle-right"></use>
				</svg>
			</a>
		</div>
	`

	elements.recipe.insertAdjacentHTML( 'afterbegin', markup )
}

;```



searchView.js

```js

import { elements } from './base'

export const getInput = () => elements.searchInput.value

export const clearInput = () => {
	elements.searchInput.value = ''
}

export const clearResults = () => {
	elements.searchResList.innerHTML = ''
	elements.searchResPages.innerHTML = ''
}

export const highlightSelected = id => {
	const resultsArr = Array.from( document.querySelectorAll( '.results__link' ) )
	resultsArr.forEach( el => el.classList.remove( 'results__link--active' ) )
	document.querySelector( `a[ href="#${ id }" ]` ).classList.add( 'results__link--active' )
}

const limitRecipeTitle = ( title, limit = 17 ) => {
	const newTitle = []
	if ( title.length > limit ) {
		title.split( ' ' ).reduce( ( acc, cur ) => {
			if ( acc + cur.length <= limit ) {
				newTitle.push( cur )
			}
			return acc + cur.length
		}, 0 )

		return `${ newTitle.join( ' ' ) } ...`
	}
	return title
}

const renderRecipe = recipe => {
	const markup = `
		<li>
			<a href="#${ recipe.recipe_id }">
				<figure>
					<img src="${ recipe.image_url }" alt="${ recipe.title }">
				</figure>
				<div>
					<h4>${ limitRecipeTitle( recipe.title ) }</h4>
					<p>${ recipe.publisher }</p>
				</div>
			</a>
		</li>
	`
	elements.searchResList.insertAdjacentHTML( 'beforeend', markup )
}

const createButton = ( page, type ) => `
	<button class="btn-inline results__btn--${ type }" data-goto=${ type === 'prev' ? page - 1 : page + 1 }>
		<span>Page ${ type === 'prev' ? page - 1 : page + 1 }</span>
		<svg class="search__icon">
			<use href="img/icons.svg#icon-triangle-${ type === 'prev' ? 'left' : 'right' }"></use>
		</svg>
	</button>
`

const renderButtons( page, numResults, resPerPage ) => {
	const pages = Math.ceil( numResults / resPerPage )

	let button
	if ( page === 1 && pages > 1 ) {
		button = createButton( page, 'next' )
	} else if( page < pages ) {
		button = `
			${ createButton( page, 'next' ) }
			${ createButton( page, 'prev' ) }
		`
	} else if ( page === pages && pages > 1 ) {
		button = createButton( page, 'prev' )
	}

	elements.searchResPages.insertAdjacentHTML( 'afterbegin', button )
}

export const renderResults = ( recipes, page = 1, resPerPage = 10 ) => {
	const start = ( page - 1 ) * resPerPage
	const end = page * resPerPage

	recipes.slice( start, end ).forEach( renderRecipe )
	renderButtons( page, recipes.length, resPerPage )
}

;```



index.js

```js

import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}



//	search controller
const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput()

	if ( query ) {
		// 2. new search object added to state
		state.search = new Search( query )

		// 3. prepare ui for search
		searchView.clearInput()
		searchView.clearResults()
		renderLoader( elements.searchRes )

		try {
			// 4. search for recipes
			await state.search.getResults()

			// 5. render results on ui
			clearLoader()
			searchView.renderResults( state.search.result )
		} catch( err ) {
			alert( `Something went wrong with the serach...` )
			clearLoader()
		}
	}
}

elements.searchForm.addEventListener( 'submit', e => {
	e.preventDefault()
	controlSearch()
} )

elements.searchResPages.addEventListener( 'click', e => {
	const btn = e.target.closest( '.btn-inline' )
	if ( btn ) {
		const goToPage = parseInt( btn.dataset.goto, 10 )
		searchView.clearResults()
		searchView.renderResults( state.search.result, goToPage )
	}
} )



//	recipe controller
const controlRecipe = async () => {
	//	get id from url
	const id = window.location.hash.replace( '#', '' )

	if ( id ) {
		//	prepare ui for changes
		recipeView.clearRecipe()
		renderLoader( elements.recipe )

		//	highlight selected search item
		if ( state.search ) searchView.highlightSelected( id )

		//	create new recipe obj
		state.recipe = new Recipe( id )

		try {
			//	get recipe data
			await state.recipe.getRecipe()

			//	calculate time & servings
			state.recipe.calcTime()
			state.recipe.calcServings()

			//	render recipe
			clearLoader()
			recipeView.renderRecipe( state.recipe )
		} catch ( err ) {
			alert( `Error processing recipe!` )
		}
	}
}

// window.addEventListener( 'hashchange', controlRecipe )
// window.addEventListener( 'load', controlRecipe )

[ 'hashchange', 'load' ].forEach( e => window.addEventListener( e, controlRecipe ) )

;```



## Updating Recipe Servings

recipe.js

```js

import axios from 'axios'
import { key, proxy } from '../config.js'

export default class Recipe {
	constructor( id ) {
		this.id = id
	}

	async getRecipe() {
		try {
			const res = await axios( `${ proxy }http://food2fork.com/api/get?key=${ key }&rId=${ this.id }` )
			this.title = res.data.recipe.title
			this.author = res.data.recipe.publisher
			this.img = res.data.recipe.image_url
			this.url = res.data.recipe.source_url
			this.ingredients = res.data.recipe.ingredients
		} catch( err ) {
			alert( `Something went wrong!` )
			console.log( err )
		}
	}

	calcTime() {
		//	assuming 15 mins for every 3 ingredients
		const numIng = this.ingredients.length
		const periods = Math.ceil( numIng / 3 )
		this.time = periods * 15
	}

	calcServings() {
		this.servings = 4
	}

	parseIngredients() {
		const unitsLong =	[
								'tablespoons', 'tablespoon',
								'ounces', 'ounce',
								'teaspoons', 'teaspoon',
								'cups', 'pounds'
							]

		const unitsShort =	[
								'tbsp', 'tbsp',
								'oz', 'oz',
								'tsp', 'tsp',
								'cup', 'pound'
							]

		const units = [ ...unitsShort, 'kg', 'g' ]

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
			const unitIndex = arrIng.findIndex( el2 => units.includes( el2 ) )

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

		this.ingredients = newIngredients
	}

	updateServings( type ) {
		//	servings
		const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1

		//	ingredients
		this.ingredients.forEach( ing => {
			ing.count *= ( newServings / this.servings )
		})

		this.servings = newServings
	}
}

;```



index.js

```js

import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import { elements, renderLoader, clearLoader } from './views/base'

const state = {}



//	search controller
const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput()

	if ( query ) {
		// 2. new search object added to state
		state.search = new Search( query )

		// 3. prepare ui for search
		searchView.clearInput()
		searchView.clearResults()
		renderLoader( elements.searchRes )

		try {
			// 4. search for recipes
			await state.search.getResults()

			// 5. render results on ui
			clearLoader()
			searchView.renderResults( state.search.result )
		} catch( err ) {
			alert( `Something went wrong with the serach...` )
			clearLoader()
		}
	}
}

elements.searchForm.addEventListener( 'submit', e => {
	e.preventDefault()
	controlSearch()
} )

elements.searchResPages.addEventListener( 'click', e => {
	const btn = e.target.closest( '.btn-inline' )
	if ( btn ) {
		const goToPage = parseInt( btn.dataset.goto, 10 )
		searchView.clearResults()
		searchView.renderResults( state.search.result, goToPage )
	}
} )



//	recipe controller
const controlRecipe = async () => {
	//	get id from url
	const id = window.location.hash.replace( '#', '' )

	if ( id ) {
		//	prepare ui for changes
		recipeView.clearRecipe()
		renderLoader( elements.recipe )

		//	highlight selected search item
		if ( state.search ) searchView.highlightSelected( id )

		//	create new recipe obj
		state.recipe = new Recipe( id )

		try {
			//	get recipe data
			await state.recipe.getRecipe()

			//	calculate time & servings
			state.recipe.calcTime()
			state.recipe.calcServings()

			//	render recipe
			clearLoader()
			recipeView.renderRecipe( state.recipe )
		} catch ( err ) {
			alert( `Error processing recipe!` )
		}
	}
}

// window.addEventListener( 'hashchange', controlRecipe )
// window.addEventListener( 'load', controlRecipe )

[ 'hashchange', 'load' ].forEach( e => window.addEventListener( e, controlRecipe ) )



//	handling recipe button clicks
elements.recipe.addEventListener( 'click', e => {
	//	if click on btn-decrease
	//	or any child of btn-decrease *
	if ( e.target.matches( '.btn-decrease, .btn-decrease *' ) ) {
		if ( state.recipe.servings > 1 ) {
			state.recipe.updateServings( 'dec' )
			recipeView.updateServingsIngredients( state.recipe )
		}
	} else if ( e.target.matches( '.btn-increase, .btn-increase *' ) ) {
		state.recipe.updateServings( 'inc' )
		recipeView.updateServingsIngredients( state.recipe )
	}
} )

;```



recipeView.js

```js

import { elements } from './views/base'
import { Fraction } from 'fractional'

export const clearRecipe = () => {
	elements.recipe.innerHTML = ``
}

const formatCount = count => {
	if ( count ) {
		//	count = 2.5 -> 2 1/2
		//	count = 0.5 -> 1/2
		const [ int, dec ] = count.toString().split( '.' ).map( el => parseInt( el, 10 ) )

		if ( !dec ) return count

		if ( int === 0 ) {
			const fr = new Fraction( count )
			return `${ fr.numerator }/${ fr.denominator }`
		} else {
			const fr = new Fraction( count - int )
			return `${ int } ${ fr.numerator }/${ fr.denominator }`
		}
	}
}

const createIngredient = ingredient => `
	<li class="recipe__item">
		<svg class="recipe__icon">
			<use href="img/icons.svg#icon-check"></use>
		</svg>
		<div class="recipe__count">${ formatCount( ingredient.count ) }</div>
		<div class="recipe__ingredient">
			<span class="recipe__unit">${ ingredient.unit }</span>
			${ ingredient.ingredient }
		</div>
	</li>
`

export const renderRecipe = recipe => {
	const markup = `
		<figure class="recipe__fig">
			<img src="${ recipe.img }" alt="${ recipe.title }" class="recipe__img">
			<h1 class="recipe__title">
				<span>${ recipe.title }</span>
			</h1>
		</figure>

		<div class="recipe__details">
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="img/icons.svg#icon-stopwatch"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--minutes">${ recipe.time }</span>
				<span class="recipe__info-text"> minutes</span>
			</div>
			<div class="recipe__info">
				<svg class="recipe__info-icon">
					<use href="img/icons.svg#icon-man"></use>
				</svg>
				<span class="recipe__info-data recipe__info-data--people">${ recipe.servings }</span>
				<span class="recipe__info-text"> servings</span>

				<div class="recipe__info-buttons">
					<button class="btn-tiny btn-decrease">
						<svg>
							<use href="img/icons.svg#icon-circle-with-minus"></use>
						</svg>
					</button>
					<button class="btn-tiny btn-increase">
						<svg>
							<use href="img/icons.svg#icon-circle-with-plus"></use>
						</svg>
					</button>
				</div>

			</div>
			<button class="recipe__love">
				<svg class="header__likes">
					<use href="img/icons.svg#icon-heart${ isLiked ? '' : '-outlined' }"></use>
				</svg>
			</button>
		</div>

		<div class="recipe__ingredients">
			<ul class="recipe__ingredient-list">
				${ recipe.ingredients.map( el => createIngredient( el ) ).join('') }
			</ul>

			<button class="btn-small recipe__btn recipe__btn--add">
				<svg class="search__icon">
					<use href="img/icons.svg#icon-shopping-cart"></use>
				</svg>
				<span>Add to shopping list</span>
			</button>
		</div>

		<div class="recipe__directions">
			<h2 class="heading-2">How to cook it</h2>
			<p class="recipe__directions-text">
				This recipe was carefully designed and tested by
				<span class="recipe__by">${ recipe.author }</span>. Please check out directions at their website.
			</p>
			<a class="btn-small recipe__btn" href="${ recipe.url }" target="_blank">
				<span>Directions</span>
				<svg class="search__icon">
					<use href="img/icons.svg#icon-triangle-right"></use>
				</svg>
			</a>
		</div>
	`

	elements.recipe.insertAdjacentHTML( 'afterbegin', markup )
}

export const updateServingsIngredients = recipe => {
	//	update servings
	document.querySelector( '.recipe__info-data--people' ).textContent = recipe.servings

	//	update ingredients
	const countElements = Array.from( document.querySelectorAll( '.recipe__count' ) )
	countElements.forEach( ( el, i ) => {
		el.textContent = formatCount( recipe.ingredients[ i ].count )
	} )
}

;```



## Building the Shopping List Model

npm install uniqid

list.js

```js

import uniqid from 'uniqid'

export default class List {
	constructor() {
		this.items = []
	}

	addItem( count, unit, ingredient ) {
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredient,
		}
		this.items.push( item )
		return item
	}

	deleteItem( id ) {
		const index = this.items.findIndex( el => el.id === id )
		this.items.splice( index, 1 )
	}

	updateCount( id, newCount ) {
		this.items.find( el => el.id === id ).count = newCount
	}
}

;```



## Building the Shopping List View

listView.js

```js

import { elements } from './base'

export const renderItem = item => {
	const markup = `
		<li class="shopping__item" data-itemid=${ item.id }>
			<div class="shopping__count">
				<input type="number" value="${ item.count }" step="${ item.count }" class="shopping__count-value">
				<p>${ item.unit }</p>
			</div>
			<p class="shopping__description">${ item.ingredient }</p>
			<button class="shopping__delete btn-tiny">
				<svg>
					<use href="img/icons.svg#icon-circle-with-cross"></use>
				</svg>
			</button>
		</li>
	`
	elements.shopping.insertAdjacentHTML( 'beforeend', markup )
}

export const deleteItem = id => {
	const item = document.querySelector( `[data-itemid="${ id }"]` )
	if ( item ) item.parentElement.removeChild( item )
}

;```



base.js

```js

export const elements = {
	searchForm: document.querySelector( '.search' ),
	searchInput: document.querySelector( '.search__field' ),
	searchRes: document.querySelector( '.results' ),
	searchResList: document.querySelector( '.results__list' ),
	recipe: document.querySelector( '.recipe' ),
	shopping: document.querySelector( '.shopping__list' ),
}

export const elementStrings = {
	loader: 'loader'
}

export const renderLoader = parent => {
	const loader = `
		<div class="${ elementStrings.loader }">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`
	parent.insertAdjacentHTML( 'afterbegin', loader )
}

export const clearLoader = () => {
	const loader = document.querySelector( `.${ elementStrings.loader }` )
	if ( loader ) loader.parentElement.removeChild( loader )
}

;```



;```



---
