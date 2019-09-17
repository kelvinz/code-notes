


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
	greet();
	//	hello me

```



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
	console.log( person.name );

```



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
	greet( { firstname: 'Kelvin' } );

```



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
