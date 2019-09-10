


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



---



# section 3: types & operators



---



# section 4: objects & functions



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
