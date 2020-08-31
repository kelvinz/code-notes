


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




---
