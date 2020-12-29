


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



