


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



## different ways to declare functions

```js

	//	function declaration
	function doctorize( firstName ) {
		return `Dr. ${ firstName }`
	}



	//	anonymous function
	//	function without a name
	function ( firstName ) {
		return `Dr. ${ firstName }`
	}



	//	function expression
	//	store anonymous function into a variable
	const doctorize = function( firstName ) {
		return `Dr. ${ firstName }`
	}
	//	difference between function declaration is hoisting



	//	arrow function
	//	they are anonymous functions
	const inchToCM = ( inches ) => {
		return inches * 2.54
	}

	//	shorthand
	const inchToCM = ( inches ) => inches * 2.54

	//	even shorter
	const inchToCM = inches => inches * 2.54



	//	returning an object
	const makeABaby = ( first, last ) => {
		return {
			name: `${ first } ${ last }`,
			age: 0
		}
	}

	//	shorthand
	const makeABaby = ( first, last ) => ( { name: `${ first } ${ last }`, age: 0 } )



	//	IIFE - immediately invoked function expression
	( function() {
		console.log( 'running iife' )
	} )()



	//	methods - function that lives inside an object
	const hello = {
		name: 'Kelvin',

		//	method
		sayHi: function() {
			console.log( `Hi ${ this.name }` )
		},

		//	shorthand method
		yellHi() {
			console.log( `HI ${ this.name.uppercase() }` )
		},

		//	arrow function
		whisperHi: ( name ) => {
			console.log( `HI ${ name.uppercase() }` )
		}
	}



	//	callback function
	const button = document.querySelector( '.clickMe' )
	button.addEventListener( 'click', hello.yellHi )

	//	via anonymous function
	button.addEventListener( 'click', function() {
		console.log( 'nice' )
	} )

	//	timer callback - 1 sec later
	setTimeout( hello.sayHi, 1000 )

	//	via anonymous function
	setTimeout( function() {
		console.log( 'hoho' )
	}, 1000 )

;```



## debugging tools

**console methods**

-	*console.log()*
	general logging info

-	*console.info()*
	informative logging

-	*console.error()*
	outputs error message

-	*console.warn()*
	outputs warning message

-	*console.table()*
	outputs data as a table

-	*console.count()*
	count number of times it runs

-	*console.group()*
	group up console logs xxx... console.groupEnd()




**callstack**
Uncaught ReferenceError: doesntExist is not defined
	at greet (debugging.js: 47)
	at go (debugging.js: 52)
	at <anonymous>:1:1

error happened as doesntExist variable is not defined
it happned at greet function debugging.js line 47
greet was called at go function debugging.js line 52
go was called in console



**grabbing elements**
select the element via element inspector
swap to console
$0 will select the element
$0.value will show the value inside if there is
`$('p') select the first para`
`$$( 'p' ) select all the paras`



**breakpoints**
`debugger`
stops script from running at point where debugger is written
happens if your console is open only



**scope**
what vars are inside each scope, explained further later



**network requests**
network tab
shows all resources sent & recieved & its details



**break on attribute**
go into element
right click > break on > attribute modification
or set it in the sources tab



## scope

**global scope**
window object

**function scope**
inside functions (){ ... }
variables exists in it only
can't be accessed outside of it
if variables can't be found in scope tho,
it searches/lookup in external scope
but not the other way round

**block scope**
inside blocks { ... }
const, let are block scoped
var is not

```js

	const dog = 'snickers'

	function logDog() {
		console.log( dog )
	}

	function go() {
		const dog = 'sunny'
		logDog()
	}

	go()
	//	snickers
	//	var lookup looks at where it's written
	//	not where it is called
	//	scope depends on where things are declared

;```

**functions**
functions are scoped like variables



## hoisting

functions & variables are hoisted to top of file
before it goes line by line to run script
functions are hoisted fully
variables are hoisted but undefined before it reaches line to define it



## closures

```js

	function outer() {
		const outerVar = `I am outerVar`
		function inner() {
			const innerVar = `I am innerVar`
			console.log( innerVar )
			console.log( outerVar )
		}
		inner()
	}

	outer()
	//	I am innerVar
	//	I am outerVar



	function outer() {
		const outerVar = `I am outerVar`
		function inner() {
			const innerVar = `I am innerVar`
			console.log( innerVar )
			console.log( outerVar )
		}
		return inner
	}

	const innerFn = outer()
	innerFn()
	//	I am innerVar
	//	I am outerVar



	function createGreeting( greeting = `` ) {
		const myGreet = greeting.toUpperCase()
		return function( name ) {
			return `${ myGreet } ${ name }`
		}
	}

	const sayHello = createGreeting( 'hello' )
	const sayHey = createGreeting( 'hey' )

	console.log( sayHello( 'kelvin' ) )
	//	HELLO kelvin
	console.log( sayHey( 'kelvin' ) )
	//	HEY kelvin



	function createGame( gameName ) {
		let score = 0
		return function win() {
			score++
			return `${ gameName } score is ${ score }`
		}
	}

	const hockeyGame = createGame( 'Hockey' )
	hockeyGame()
	hockeyGame()
	//	Hockey score is 2

;```



---



# the dom



## introduction to the document

-	**dom**
	document object model, represents webpage in tree-node structure

-	**window**
	global object holding functions, objects, namespaces associated to the opened browser window

-	**document**
	everything inside the html head to html end

-	**navigator**
	device related stuff like vibration, gps, etc



## selecting elements

note: load js at the bottom so html loads first

```js

	//	select the first p element
	//	returns single node
	const p = document.querySelector( 'p' )

	//	selects all divs
	//	returns NodeList - array-like
	const divs = document.querySelectorAll( 'div' )

	//	able to use css selectors
	const items = document.querySelectorAll( '.item' )
	//	go deeper
	const img = items.querySelector( 'img' )

;```



## element properties & methods

```js

	//	get or set any content inside element including text or scripts
	myElement.textContent

	//	get or set only readable text content & is not hidden
	myElement.innerText

	//	get or set html content, including or excluding the element itself
	myElement.innerHTML
	myElement.outerHTML

	//	insert stuff beside element
	//	afterbegin, beforeend in position
	myElement.insertAdjacentText( position, what )
	myElement.insertAdjacentHTML( position, what )
	myElement.insertAdjacentElement( position, what )

;```



## working with classes

```js

	const pic = document.querySelector( '.nice' )

	pic.classList.add( 'open' )
	pic.classList.remove( 'nice' )
	pic.classList.toggle( 'hello' )
	pic.classList.contains( 'hello' )

;```



## build in & custom data attributes

```js

	//	get or set
	pic.alt = 'some alt text'
	pic.width = 200

	//	get
	pic.naturalWidth

	pic.setAttribute( 'alt', 'hello' )
	pic.getAttribute( 'alt' )
	pic.hasAttribute( 'alt' )

	//	img src='' data-greet="kelvin">
	//	custom data attribute
	pic.dataset.greet

;```



## creating html

```js

	const myDiv = document.createElement( 'div' )
	myDiv.classList.add( 'wrapper' )

	const myimg = document.createElement( 'img' )
	img.src = 'https://picsum.photos/500'
	img.alt = 'random pic'

	const myPara = document.createElement( 'p' )
	myPara.textContent = 'I am a <p>'
	myPara.classList.add( 'hello' )

	myDiv.appendChild( myImg )
	myDiv.appendChild( myPara )

	//	repaints page when adding to page
	//	best to do it only once
	document.body.appendChild( myDiv )

	//	this will cause another repaint
	const heading = document.createElement( 'h2' )
	heading.textContent = 'Some header'
	myDiv.insertAdjacentElement( 'beforebegin', heading )

;```

```js

	const li2 = document.createElement( 'li' )
	li2.textContent = 'two'
	list.append( li2 )

	//	deep clone, true
	const li1 = li2.cloneNode( true )
	li1.textContent = 'one'

	list.insertAdjacentElement( 'afterbegin', li1 )

;```



## html from strings & xss

```js

	const
	item = document.querySelector( '.item' ),
	src = `https://picsum.photos/200`,
	alt = `random`,
	myHTML = `
			<div>
				<h1>Hey how are you?</h1>
				<img src="${ src }" alt="${ alt }" />
			</div>
		`

	console.log( myHTML.querySelector( 'img' ) )
	//	error

	//	myHTML is a string until it's added to dom via innerHTML
	item.innerHTML = myHTML

	//	turns a string into a dom element w/o putting into dom first
	const myFragment = document.createRange()
						.createContextualFragment( myHTML )
	console.log( myFragment.querySelector( 'img' ) )

;```



## traversing & removing nodes

```js

	//	<p class="wes">I am Wes, I <em>love</em> to bbq</p>

	const wes = document.querySelector( '.wes' )

	console.log( wes.children )
	//	1
	//	em

	//	some other element commands
	//	ignore plain text
	myItem.children
	myItem.firstElementChild
	myItem.lastElementChild
	myItem.previousElementSibling
	myItem.nextElementSibling
	myItem.parentElement



	console.log( wes.childNodes )
	//	3
	//	text, em, text

	//	some other node commands
	//	considers plain text
	myItem.childNodes
	myItem.firstChild
	myItem.lastChild
	myItem.previousSibling
	myItem.nextSibling
	myItem.parentNode

	//	removing stuff from dom
	myItem.remove()



;```



## cardio

```js

	//	adding div with class
	const div = document.createElement( 'div' )
	div.classList.add( 'wrapper' )

	document.body.appendChild( div )



	//	adding ul with li items
	const ul = `
		<ul>
			<li>one</li>
			<li>two</li>
			<li>three</li>
		</ul>
	`

	div.innerHTML = ul



	//	adding image
	const img = document.createElement( 'img' )
	img.src = `https://picsum.photos/500`
	img.width = 250
	img.height = 250
	img.classList.add( 'cute' )
	img.alt = 'random'

	div.appendChild( img )



	//	adding html + misc
	const myHTML = `
		<div class="myDiv">
			<p>Para One</p>
			<p>Para Two</p>
		</div>
	`

	const ulEl = div.querySelector( 'ul' )
	ul.insertAdjacentHTML( 'beforebegin', myHTML )

	const myDiv = div.querySelector( '.myDiv' )
	myDiv.children[ 1 ].classList.add( 'warning' )

	myDiv.firstElementChild.remove()



	//	function generating stuff
	function generatePlayerCard( name, age, height ) {
		const html = `
			<div class="playerCard">
				<h2>${ name } - ${ age }</h2>
				<p>
					They are ${ height } and ${ age } years old.
					In dog years this person would be ${ age * 7 }.
				</p>
				<button class="delete" type="button">&times; Delete</button>
			</div>
		`
		return html
	}
	const cards = document.createElement( 'div' )
	cards.classList.add( 'cards' )

	let cardsHTML = generatePlayerCard( 'wes', 12, 150 )
	cardsHTML += generatePlayerCard( 'wes', 12, 150 )
	cardsHTML += generatePlayerCard( 'scott', 24, 160 )
	cardsHTML += generatePlayerCard( 'snickers', 11, 170 )
	cards.innerHTML = cardsHTML
	div.insertAdjacentElement( 'beforebegin', cards )

	const buttons = document.querySelectorAll( '.delete' )

	function deleteCard() {
		const buttonThatGotClicked = event.currentTarget
		buttonThatGotClicked.parentElement.remove()
		//	or look up nodes & find closest
		buttonThatGotClicked.closest( '.playerCard' ).remove()
	}

	buttons.forEach( button => button.addEventListener( 'click', deleteCard ) )

;```



---



# events



## event listener

```js

	const butts = document.querySelector( '.butts' )

	//	anonymous
	butts.addEventListener( 'click', () => {
		console.log( 'clicked' )
	} )
	//	unable to remove as there's no ref

	//	named
	const = () => { console.log( 'clicked' ) }
	butts.addEventListener( 'click', handleClick )
	butts.removeEventListener( 'click', handleClick )



	//	listen on multiple items
	const buyButtons = document.querySelectorAll( 'button.buy' )

	const buyItem = () => {
		console.log( 'buy!' )
	}

	buyButtons.forEach( button => button.addEventListener( 'click', buyItem ) )

;```



## targets, bubbling, propagation & capture

```js

	function handleBuyButtonClick( e ) {
		console.log( e ) // whole bunch of info
		console.log( e.target ) // what exactly is clicked ( dive into nested elements )
		console.log( e.currentTarget ) // what is clicked ( the thing that fired listener )

		//	stop event from bubbling up
		//	clicking on button, also clicked window if you don't stop bubbling
		//	events keep going up the node
		e.stopPropagation()
	}

	buyButtons.forEach( button => button.addEventListener( 'click', handleBuyButtonClick ) )

	//	capture happens before the bubbling happens
	//	you click the window first, then the div, then the button, etc
	//	then the button bubbles the event upwards
	//	true activates event when it's moving down, instead of when it's bubbling up
	window.addEventListener( 'click', e => {
		console.log( e.target )
	}, true )

;```



## prevent default & form events

```js

	//	stop default action
	//	like link going to its src link, submit button from submitting, etc

	myLink.addEventListener( 'click', e => {
		const shouldChangePage = confirm(
			'Do you want to continue?'
		)
		if ( !shouldChangePage ) {
			e.preventDefault()
		}
	} )

	const signupForm = document.querySelector( '[ name = "signup" ]' )
	signupForm.addEventListener( 'submit', e => {
		e.preventDefault()
		const name = e.currentTarget.name.value
		if ( name.includes( 'wes' ) ) {
			alert( 'sorry bro' )
			e.preventDefault()
		}
	} )

;```

**sidenote**
preserve log option in browser console settings to keep log even if navigate away from page



## accesibility gotchas & keyboard codes

-	*buttons* are for actions within site
-	*links* are used to change the page
-	*clickable things* that are not buttons or links
	should be given a role="button" tabindex="0" so they can be tabbed to
-	*clickable things* should be given a eventlistener 'keyup' enter so they can be clicked



---



# exercises



## etch-a-sketch

canvas html 1600px, but css resizes to 800px to make it 2x resolution

```js

	//	select the elements on the page
	const canvas = document.querySelector( '#etch-a-sketch' )
	const ctx = canvas.getContext( '2d' )
	const shakebutton = document.querySelector( '.shake' )

	const MOVE_AMOUNT = 10
	let hue = 0

	//	setup our canvas for drawing
	const width = canvas.width
	const height = canvas.height
	//	or using destructuring
	const { width, height } = canvas

	//	create random x, y starting points on the canvas
	function randomDot() {
		let x = Math.floor( Math.random() * width )
		let y = Math.floor( Math.random() * height )

		ctx.lineJoin = 'round'
		ctx.lineCap = 'round'
		ctx.lineWidth = 10

		ctx.strokeStyle = `hsl( ${ hue }, 100%, 50% )`
		ctx.beginPath()
		ctx.moveTo( x, y )
		ctx.lineTo( x, y )
		ctx.stroke()
	}
	randomDot()

	//	write a draw function
	function draw( { key } ) {
		//	if hue exceeds range, browser will auto calculate it back from 0 even if number is huge
		hue += 1

		ctx.strokeStyle = `hsl( ${ hue }, 100%, 50% )`
		ctx.beginPath()
		ctx.moveTo( x, y )

		switch ( key ) {
			case 'ArrowUp':
				y -= MOVE_AMOUNT
				break
			case 'ArrowRight':
				x += MOVE_AMOUNT
				break
			case 'ArrowDown':
				y += MOVE_AMOUNT
				break
			case 'ArrowLeft':
				x -= MOVE_AMOUNT
				break
			default:
				break
		}

		ctx.lineTo( x, y )
		ctx.stroke()
	}

	//	write a handler for the keys
	function handleKey( e ) {
		if ( e.key.includes( 'Arrow' ) ) {
			e.preventDefault()
			draw( { key: e.key } )
		}
	}

	//	clear / shake function
	function clearCanvas() {
		//	css class that adds keyframe animation
		canvas.classList.add( 'shake' )
		ctx.clearRect( 0, 0, width, height )
		randomDot()
		canvas.addEventListener( 'animationend', function() {
			canvas.classList.remove( 'shake' )
		},{ once: true } ) //	remove event listener automatically with once: true
	}

	//	listen for arrow keys
	window.addEventListener( 'keydown', handleKey )
	shakebutton.addEventListener( 'click', clearCanvas )

;```



## click outside modal

```js

	const
	cardButtons = document.querySelectorAll( '.card button' ),
	modalInner = document.querySelector( '.modal-inner' )

	function handleCardButtonClick( e ) {
		const
		button = e.currentTarget,
		card = button.closest( '.card' ),
		imgSrc = card.querySelector( 'img' ).src,
		desc = card.dataset.description
		modalInner.innerHTML = `
			<img
				src="${ imgSrc.replace( '200', '600' )}"
				alt="${ name }"
			/>
			<p>${ desc }</p>
		`
		modalOuter.classList.add( 'open' )
	}

	cardButtons.forEach( button = > {
		button.addEventListener( 'click', handleCardButtonClick )
	})

	function closeModal() {
		modalOuter.classList.remove( 'open' )
	}

	modalOuter.addEventListener( 'click',  e => {
		const isOutside = !e.target.closest( '.modal-inner' )
		if ( isOutside ) {
			closeModal()
		}
	})

	window.addEventListener( 'keydown', e => {
		if ( event.key === 'Escape' ) {
			closeModal()
		}
	})

;```



## scroll events & intersection observer

```js

	function scrollToAccept() {

		const terms = document.querySelector( '.terms-and-conditions' )
		const button = document.querySelector( '.accept' )

		//	quit if not on page with terms
		if ( !terms ) { return }

		function obCallback( payload ) {
			if ( payload[ 0 ].intersectionRatio ==- 1 ) {
				button.disabled = false

				//	stop observing
				ob.unobserve( terms.lastElementChild )
			}
		}

		const ob = new IntersectionObserver( obCallback, {
			root: terms,
			threshold: 1
		} )
		ob.observe( terms.lastElementChild )

	}

;```



## tabs

```html

	<div class="tabs">
		<div role="tablist" aria-label="Programming Languages">
			<button role="tab" aria-selected="true" id="js">
				JavaScript
			</button>
			<button role="tab" aria-selected="false" id="ruby">
				Ruby
			</button>
			<button role="tab" aria-selected="false" id="php">
				PHP
			</button>
		</div>
		<div role="tabpanel" aria-labelledby="js">
			<p>JavaScript is great!</p>
		</div>
		<div role="tabpanel" aria-labelledby="ruby" hidden>
			<p>Ruby is great!</p>
		</div>
		<div role="tabpanel" aria-labelledby="php" hidden>
			<p>PHP is great!</p>
		</div>
	</div>

;```


;```



---




;```



---



