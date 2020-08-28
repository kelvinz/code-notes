


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




---
