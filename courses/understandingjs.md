


<https://www.udemy.com/understand-javascript/learn/lecture/2237546#overview>



# section 1: getting started



...



---



# section 2: execution contexts & lexical environments



## some definitions

**syntax parsers**
a program that reads your code & determines what it does & if its grammar is valid
your code -> syntax parser -> instructions that computer reads
like a translator in the middle between you & computer

**lexical environment**
where something sits physically in the code you write

**execution context**
a wrapper to help manage the code that is running

**name/value pair**
a name which maps to a unique value

**object**
a collection of name value pairs

**javascript is single threaded**
one command at a time

**synchronous**
one line at a time
in the order it appears



## global & execution contexts

**global execution context**

-	*creates a global object*
	in the case of browsers, it is the window object
	global = not inside a function

-	*creates 'this'*
	indow can be called by using 'this' or window

-	*creates outer environment*
	in the case of global
	there is no outer environment as it is the furthest out it can be

**execution context phases**

-	*creation*
	-	global object
	-	this
	-	outer environment
	-	setup memory space for all variables & functions *hoisting*
		-	all variables in js are initially set to undefined in creation
		-	*undefined* is a special value
		-	all functions on the otherhand sits in memory in its entirety in creation

-	**execution**
	-	runs code line by line



## function invocation & the execution stack

**invocation**
running a function
in js, using the parenthesis ()

1. when a function is invocated, a new execution context is created
2. this will be added to the execution stack one on top of the other
3. the one on top is the one currently running line by line
4. when the top context finishes running, it is popped off the stack
5. the one below it continues to run
6. until it finishes the global execution context which is always the first & bottom

**variable environment**
where the variable live
& how they relate to each other in memory

each execution context holds its own variables
aka scope

**scope chain**
if a variable is not defined in its execution context
it looks for it in the outer environment
all the way till it finds it
else it's undefined/uncaught reference

**outer environment**
is determined by the lexical environment
where the code sits physically in the code
if it's not wrapped within another function
the outer environment is the global environment

or 'who created me'



## scope, es6, let

**scope**
where a variable is available in your code
& if it's the same or a new copy

**let**
uses block scope
block is defined using {}
only available in the block



## asynchronous callback

**asynchronous**
more than one at a time

**event queue**
stuff outside of the js engine which runs asynchronously
adds things to do into an event queue into js engine
when the execution stack of the js engine is empty
aka global stack finishes
it looks at the event queue & runs them



---



# section 3: types & operators



## types

**dynamic typing**
you don't tell the engine what type of data a variable holds
it figures it out while your code is running

opposite is static typing where you need to specify a type to the variable

**primitive types**
a type of data that represents a single value
not an object

-	*undefined*
	lack of existence
	set automatically, don't set it yourself

-	*null*
	lack of existence
	you can set it yourself

-	*boolean*
	true or false
	1 or 0

-	*number*
	floating point number
	always some decimals
	can cause weird math issues

-	*string*
	a sequence of characters
	'' or "" can be used to specify strings

-	*symbol*
	used in es6



## operators

**definition**
a special function that is syntactically ( written ) different
generally, operators take two parameters & return one result

**operator precedence**
which operator function gets called first
functions are called in order of precedence
higher precedence wins

**operator associativity**
what order operator functions get called in:
left-to-right or right-to-left
when functions have the same precedence

var a = 2, b = 3, c = 4;
a = b = c
console.log( a, b, c )
//	4, 4, 4

**operator precedence & associativity table**
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence>



## coercion

**definition**
converting a value from one type to another
happens quite often in javascript as it's dynamically typed

**example**
var a = 1 + '2'
//	12 ( string instead of number )
1 is coerced from a number to a string so it can be concatenated with the string

**comparison operators**
console.log( 1 < 2 < 3 )
//	true
console.log( 3 < 2 < 1 )
//	true

left to right associativity

3 < 2 < 1
false < 1
//	coerced to
0 < 1
//	true
*this is a dangerous side effect of javascript's auto coercion*

**side note**
NaN   = not a number
null  = 0
""    = 0
false = 0
true  = 1

**prevent coercion**
use '===' instead of '=='
use '>==' instead of '>='
use '!==' instead of '!='

### use strict comparison operator unless you knowingly need to coerce values

**equality comparisons table**
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness>



## existence & booleans

undefined = false
null      = false
""        = false

*use this to our advantage*

```js

	var a
	//	then add some function that goes out to the internet
	//	finds a value & update var a

	if ( a ) {
		//	then do something
	}

```

*gotcha*
0 = false
in case 0 is the result you want use this
if ( a || a === 0 )

**default values**

```js

	function greet( name ) {
		console.log( 'Hello ' + name )
	}

	greet( 'kelvin' )
	//	hello kelvin
	greet()
	//	hello undefined




	function greet( name ) {
		name = name || 'me'
		console.log( 'Hello ' + name )
	}

	greet( 'kelvin' )
	//	hello kelvin
	greet()
	//	hello me

;```



---



# section 4: objects & functions



## objects & the dot

objects have
eg. address in memory: 0x001

-	primitive property: type, ie. boolean, string, etc
	eg. address in memory: 0x002

-	object property: ie. child object
	eg. address in memory: 0x003

-	function: called method
	eg. address in memory: 0x004

```js

	console.log( person[ 'name' ] )

	//	same results as above but
	//	preferred way of accessing properties unless dynamic string needed
	//	dot notation will auto convert name to string
	//	so it won't implement a variable like myVar = 'na' + 'me'
	//	person.myVar will become person.'myVar' instead of person.'name'
	console.log( person.name )

;```



## objects & object literals

```js

	var me = {
		firstname: 'Kelvin',
		lastname: 'Zhao',
		address: {
			street: '446C Jalan Kayu',
			country: 'Singapore'
		}
	}

	function greet( person ) {
		console.log( 'Hi ' + person.firstname )
	}

	greet( me );
	//	same results
	greet( { firstname: 'Kelvin' } )

;```



## framework aside: faking namespaces

**namespace**
a container for variables & functions
typically to keep variables & functions with the same name seperate

```js

	var greet = 'Hello!'
	var greet = 'Hola!'

	console.log( greet )
	//	Hola!

	//	use an object to contain namespaces
	var english = {}
	var spanish = {}

	english.greet = 'Hello!'
	spanish.greet = 'Hola!'

	console.log( english.greet )
	console.log( spanish.greet )

;```



## json & object literals

```js

	//	properties doesn't have to be wrapped in quotes
	//	but it can be too for objects
	var objectLiteral = {
		firstname: 'Mary',
		isAProgrammer: true
	}

	//	properties has to be wrapped in quotes
	{
		'firstname': 'Mary',
		'isAProgrammer': true
	}

	//	convert objects to json
	var json = JSON.stringify( objectLiteral )

	//	convert json to objects
	var objectLiteral = JSON.parse( "{ 'firstname': 'Mary', 'isAProgrammer': true }" )

;```



## functions are objects

**first class functions**
everything you can do with other types you can do with functions
assign them to variables, pass them around, create them on the fly

function - a special type of object with
-	primitive
-	object
-	function
-	name: optional, can be anonymous
-	code: invocable with ()

```js

	function greet() {
		console.log( 'hi' )
	}

	greet.language = 'english'
	console.log( greet.language )

	//	function object with
	//	name - greet
	//	code - console.log( 'hi ' )

;```



## function statements & function expressions

**expression**
a unit of code that results in a value
it doesn't have to save to a variable

```js

	//	both returns a value
	//	they are expressions
	a = 3
	//	3

	1 + 2
	//	3

	//	this is a statement
	//	it doesn't return anything
	if ( a === 3 ) {
		//
	}

	//	this is a statement
	//	it doesn't result in a value
	function greet() {
		console.log( 'hi' )
	}

	greet()

	//	this is an expression as it results in a value
	//	function doesn't have a name it is anonymous
	//	but the variable anonGreet points to the anonymous function
	var anonGreet = function() {
		console.log( 'hi' )
	}

	anonGreet()

	function log( a ) {
		console.log( a )
	}

	log( 3 )
	//	3

	function log( a ) {
		a()
	}

	log( function() {
		console.log( 'hi' )
	} )
	//	hi

;```



## conceptual aside: by value vs by reference

*by value*
var a = a primitive value
a points to an address in memory, 0x001 which contains the value
var b = a
b will point to a different address in memory, 0x002 which contains a copy of the value in a

*by reference*
var a = an object
a points to an address in memory, 0x001 which contains the object
var b = a
b will point to the same address in memory, 0x001

*note*
equals '=' will set up a new memory address if there's no existing reference

```js

	//	by value ( primitives )
	var a = 3
	var b

	b = a
	a = 2

	console.log( a )
	//	2
	console.log( b )
	//	3

	//	by reference ( objects, including functions )
	var c = { greeting: 'hi' }
	var d

	d = c
	c.greeting = 'hello' //	mutate: change

	console.log( c )
	//	Object { greeting: 'hello' }
	console.log( d )
	//	Object { greeting: 'hello' }

	//	reference even as parameters
	function changeGreeting( obj ) {
		obj.greeting = 'hola'
	}

	changeGreeting( d )
	console.log( c )
	//	Object { greeting: 'hola' }
	console.log( d )
	//	Object { greeting: 'hola' }

	//	equals operator sets up a new memory space ( new address )
	c = { greeting: 'howdy' }
	console.log( c )
	//	Object { greeting: 'howdy' }
	console.log( d )
	//	Object { greeting: 'hola' }

;```



## objects, functions & 'this'

*execution context ( creation phase )*

-	variable environment
-	outer environment
-	'this' ( changes depending on where function is & how it's called )

**this points to an object**

```js

	function a() {
		console.log( this )
	}

	a()
	//	Window { ... }

	var b = function() {
		console.log( this )
	}

	b()
	//	Window { ... }

	var c = {
		name: 'The c object',
		log: function() {
			console.log( this )
		}
	}

	c.log()
	//	Object { name: 'The c object', log: function }

	var c = {
		name: 'The c object',
		log: function() {
			this.name = 'Updated c object'
			console.log( this )
		}
	}

	c.log()
	//	Object { name: 'Updated c object', log: function }

	var c = {
		name: 'The c object',
		log: function() {
			this.name = 'Updated c object'
			console.log( this )
			//	Object { name: 'Updated c object', log: function }

			var setname = function( newname ) {
				this.name = newname
				//	this.name actually points to global object instead
				//	Window.name = newname
			}
			setname( 'Updated again!' )
			console.log( this )
			//	Object { name: 'Updated c object', log: function }
		}
	}

	var c = {
		name: 'The c object',
		log: function() {
			var self = this

			this.name = 'Updated c object'
			console.log( self )
			//	Object { name: 'Updated c object', log: function }

			var setname = function( newname ) {
				self.name = newname
			}
			setname( 'Updated again!' )
			console.log( self )
			//	Object { name: 'Updated again!', log: function }
		}
	}

;```



## conceptual aside: arrays - collections of anything

```js

	var arr = [
		1,
		false,
		{
			name: 'Kelvin',
			address: '111 Main St.'
		},
		function( name ) {
			var greeting = 'Hello '
			console.log( greeting + name )
		},
		'hello'
	]

	console.log( arr )
	//	[ 1, false, Object, function, 'hello' ]

	arr[ 3 ]( arr[ 2 ].name )
	//	Hello Kelvin

;```



## arguments & spread

*execution conext is created ( function )*

-	variable environment
-	'this'
-	outer environment
-	arguments: all the values/parameters passed in to function

```js

	function greet( firstname, lastname, language ) {
		console.log( firstname )
		console.log( lastname )
		console.log( language )
	}

	greet()
	//	undefined, undefined, undefined

	greet( 'John' )
	//	John, undefined, undefined

	greet( 'John', 'Doe' )
	//	John, Doe, undefined

	greet( 'John', 'Doe', 'en' )
	//	John, Doe, en

	function greet( firstname, lastname, language ) {
		console.log( firstname )
		console.log( lastname )
		console.log( language )

		console.log( arguments )
		console.log( arguments.length )
	}

	greet()
	//	undefined, undefined, undefined, [], 0

	greet( 'John' )
	//	John, undefined, undefined, [ 'John' ], 1

	//	arguments will be deprecated
	//	spread will replace it

	function greet( firstname, lastname, ...other ) {
		//
	}

	//	...other will be an array

;```



## framework aside: function overloading

```js

	function greet( firstname, lastname, language ) {
		language = language || 'en'

		if ( language === 'en' ) {
			console.log( 'Hello ' + firstname + ' ' + lastname )
		}

		if ( language === 'es' ) {
			console.log( 'Hola ' + firstname + ' ' + lastname )
		}
	}

	greet( 'John', 'Doe', 'en' )
	//	Hello John Doe
	greet( 'John', 'Doe', 'es' )
	//	Hola John Doe

	function greetEnglish( firstname, lastname ) {
		greet( firstname, lastname, 'en' )
	}

	greetEnglish( 'John', 'Doe' )
	//	Hello John Doe

;```



## conceptual aside: syntax parsers

javascript engine reads character by character with a set of rules
it can even make changes if it wants before it is executed



## dangerous aside: automatic semicolon insertion

javascript engine reads 'return/enter' it auto adds a semicolon ;

```js

	function getPerson() {
		return
		{
			firstname: 'Tony'
		}
	}

	console.log( getPerson() )
	//	undefined
	//	; is added beside the return
	//	breaks the return-ing of the object

	function getPerson() {
		return {
			firstname: 'Tony'
		}
	}

	console.log( getPerson() )
	//	Object { firstname: 'Tony' }

;```



## framework aside: whitespace

*whitespace*
invisible characters that create literal 'space' in your written code
carriage returns, tabs, spaces

javascript engine is very liberal with whitespace
it will just ignore/accept them

```js

	var
		//	first name of erson
		firstname,

		//	last name of person
		lastname,

		//	the language
		//	can be 'en' or 'es'
		language

	var person = {
		//	the first name
		firstname: 'John',

		//	the last name
		lastname: 'Doe'
	}

;```



## immediately invoked functions expressions ( IIFEs )

```js

	//	function statement
	function greet() {
		//
	}

	//	function expression
	var greetFunc = function() {
		//
	}

	//	IIFEs
	var greeting = function() {
		//
	}()

	( function() {
		//
	}())

;```



## framework aside: IIFEs & safe code

variables in IIFEs exists in the execution context of that IIFE
it doesn't pollute the global context

```js

	//	if we do want to access/edit the global
	//	pass it into the IIFE

	var greeting = 'Mary'

	( function( global, name ) {
		var greeting = 'Hello'
		global.greeting = greeting + ' ' + name
	}( window, 'John' ) )

;```



## understanding closures

```js

	function greet( whattosay ) {
		return function( name ) {
			console.log( whattosay + ' ' + name )
		}
	}

	greet( 'hi' )( 'kelvin' )
	//	hi kelvin

	var sayHi = greet( 'hi' )
	sayHi( 'kelvin' )
	//	hi kelvin

;```

every execution context has a dedicated space that stores all variables, etc
when the context is popped off/cleared, the variables still exists in memory
they will eventually be cleared off by garbage collection, but it's there for now
functions created within, has access to them



## understanding closures 2

```js

	function buildFunctions() {
		var arr = []
		for ( var i = 0; i < 3; i++ ) {
			arr.push(
				function() {
					console.log( i )
				}
			)
		}
		return arr
	}

	var fs = buildFunctions()
	fs[ 0 ]()
	fs[ 1 ]()
	fs[ 2 ]()
	//	3, 3, 3

;```

console.log is executed only after the arr runs/finishes
when it references the i, it is the last i = 3 in memory



```js

	function buildFunctions() {
		var arr = []
		for ( let i = 0; i < 3; i++ ) {
			arr.push(
				function() {
					console.log( i )
				}
			)
		}
		return arr
	}

	var fs = buildFunctions()
	fs[ 0 ]()
	fs[ 1 ]()
	fs[ 2 ]()
	//	0, 1, 2

;```

let is block scoped not function scope
in the block, a memory reference is created like how functions creates execution contexts



```js

	function buildFunctions() {
		var arr = []
		for ( var i = 0; i < 3; i++ ) {
			arr.push(
				(function( i ) {
					return function() {
						console.log( i )
					}
				}( i ) )
			)
		}
		return arr
	}

	var fs = buildFunctions()
	fs[ 0 ]()
	fs[ 1 ]()
	fs[ 2 ]()
	//	0, 1, 2

;```

if you don't want to use let
we can create immediately invoked functions to create a function scope to store each k value



## framework aside: function factories

```js

	function makeGreeting( lang ) {
		return function( firstname, lastname ) {
			if ( lang === 'en' ) {
				console.log( 'Hello ' + firstname + ' ' + lastname )
			}
			if ( lang === 'es' ) {
				console.log( 'Hola ' + firstname + ' ' + lastname )
			}
		}
	}

	var greetEnglish = makeGreeting( 'en' )
	var greetSpanish = makeGreeting( 'es' )

	greetEnglish( 'John', 'Doe' )
	//	Hello John Doe

	greetSpanish( 'John', 'Doe' )
	//	Hola John Doe

;```



## closures & callbacks

```js

	function sayHiLater() {
		var greeting = 'Hi!'

		setTimeout( function() {
			console.log( greeting )
		}, 3000 )
	}

	sayHiLater()
	//	3 seconds later, 'Hi!'

;```

---



# section 5: object-oriented javascript & prototypal inheritance



---



# section 6: building objects



---



# section 7: odds & ends



---



# section 8: examining famous frameworks & libraries



---



# section 9: let's build a framework / library!



---



# section 10: bonus lectures



---



# section 11: getting ready for ecmascript 6



---



# section 12: conclusion



---
