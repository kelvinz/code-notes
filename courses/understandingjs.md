


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
