


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
					They are ${ height } & ${ age } years old.
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

```js

	const
	tabs = document.querySelectorAll( '.tabs' ),
	tabButtons = tabs.querySelectorAll( '[role="tab"]' ),
	tabPanels = tabs.querySelectorAll( '[role="tabpanel"]' )

	function handleTabClick( e ) {
		//	mark all tabs as unselected
		tabButtons.forEach( tab => {
			tab.setAttribute( 'aria-selected', false )
		})
		//	hide all tab panels
		tabPanels.forEach( panel => {
			panel.hidden = true
		})
		//	mark clicked tab as selected
		e.currentTarget.setAttribute( 'aria-selected', true )

		//	show tab panel
		const { id } = e.currentTarget
		const tabPanel = tabs.querySelector( `[aria-labelledby="${ id }"]` )
		tabPanel.hidden = false

		//	alt way to show panel
		//	need array to .find()
		//	tab panels is a nodelist, thus convert it to array
		const tabPanels = Array.from( tabs.querySelectorAll( '[role="tabpanel"]' ) )
		const tabPanel = tabPanels.find( panel => {
			return panel.getAttribute( 'aria-labelledby') === id
		})
		tabPanel.hidden = false

	}

	tabButtons.forEach( button => {
		button.addEventListener( 'click', handleTabClick )
	})

;```



## bedmas

**order by which things are run**
Brackets       : ()
Exponents      : **
Division       : /
Multiplication : *
Addition       : +
Subtraction    : -



## flow control - if statements, function returns, truthy, falsy

```js

	if ( true ) {
		//
	}

	if ( !false ) {
		//
	}

	function slugify( sentence, lowercase ) {
		let slug = sentence.replace( /\s/g, '-' )
		if ( lowercase ) {
			return slug.toLowerCase()
		}
		return slug
	}

	//	truthy
	1
	-1
	-10
	"0"
	[]
	{}

	//	falsy
	0
	undefined
	null
	NaN
	""

;```



## coercion, ternaries & conditional abuse

```js

	//	convert into boolean
	const name = 'hello'

	console.log( name )
	//	'hello'
	console.log( !name )
	//	false
	console.log( !!name )
	//	true



	//	ternaries = shorthand
	const count = 2
	let word
	if ( count === 1 ) {
		word = 'item'
	} else {
		word = 'items'
	}

	//	shorthand version
	const word = count === 1 ? 'item' : 'items'

	//	if with no else, null as to there for shorthand
	const isAdmin = true
	isAdmin ? doSomething() : null

	//	unless with && trick
	isAdmin && doSomething()
	//	if else - checks will run
	//	if true, goes to the && to run it to check for true
	//	since it won't return true
	//	it short curcuits so it doesn't need to go forward to the actual if else actions
	//	thus is a fake way of doing if else shorthand

;```



## case switch & animating a turtle with css variables

```js

	const turtle = document.querySelector( '.turtle' )

	function handleKeyDown( e ) {
		if ( !e.key.includes( 'Arrow' ) ) { return }

		let x = 0, y = 0, flipped = false

		switch ( e.key ) {
			case 'ArrowUp':
				y--
				break
			case 'ArrowDown'
				y++
				break
			case 'ArrowLeft'
				x--
				flipped = true
				break
			case 'ArrowRight'
				x++
				flipped = false
				break
			default:
				console.log( 'not valid' )
				break
		}

		//	custom css variables --x, --y, --rotate
		//	transform: translateX( var( --x ) ) translateY( var( --y ) ) rotateY( var( --rotate ) );
		turtle.setAttribute( 'style', `
			--rotate: ${ flipped ? '180deg' : '0' };
			--x: ${ x }px;
			--y: ${ y }px;
		` )
	}

	window.addEventListener( 'keydown', handleKeyDown )

;```



## intervals & timers

```js

	//	500 millisecond before myFunction is run
	setTimeout( myFunction, 500 )

	//	myFunction runs EVERY 500 millisecond
	setInterval( myFunction, 500 )

	//	run right away before starting interval
	function setImmediateInterval( funcToRun, ms ) {
		funcToRun()
		return setInterval( funcToRun, ms )
	}

	setImmediateInterval( myFunction, 2000 )



	//	to clear timer or interval, you need a ref to it
	function destory() {
		document.body.innerHTML = `<p>DESTORYED</p>`
	}

	const bombTimer = setTimeout( destory, 3000 )

	window.addEventListener( 'click', function() {
		console.log( 'You saved the world!' )
		clearTimeout( bombTimer )
	})

;```



---



# objects



## intro

```js

	//	order doesn't matter
	//	order js store objects isn't guaranteed



	//	age: age shorthand is just age
	const age = 100
	const person = {
		age
	}



	//	recommended to always add , at end
	const something = {
		hi: 'you',
		yo: 'yea',
	}



	//	const doesnt mean properties within objects cannot be changed
	//	only the object assignment itself
	const me = { name: 'kelvin' }
	//	error
	me = { something: 'else' }
	//	okay
	me.name = 'something else'
	//	to make properties not change
	//	meFroze cannot be changed
	//	but me still can be changed, original object not affected
	const meFroze = Object.freeze( me )



	//	accessing properties
	myObject.age
	myObject[ 'age' ]



	//	if wes.jobs doesn't exist
	if ( wes.jobs ) // works, return undefined
	if ( wes.jobs.main ) // returns error, code breaks
	//	thus you have to do checks beforehand
	if ( wes.jobs && wes.jobs.main ) {
		//	do something with wes.jobs.main
	}
	//	other common way to go into child without error
	//	check first if parent is undefined aka loading or doesn't exist
	const name = nameInput ? nameInput.value : ''



	//	delete property, returns true if successful
	delete me.name
	//	doesn't delete property but clears what's inside
	me.name = undefined
	me.name = null



	//	method aka function of object
	const me = {
		name: 'kelvin',
		sayHello: function( greeting ) {
			return `${ greeting } ${ this.name }`
		},
	}
	//	method shorthand
	const me = {
		name: 'kelvin',
		sayHello( greeting ) {
			return `${ greeting } ${ this.name }`
		},
	}
	//	arrow function affects this keyword
	const me = {
		name: 'kelvin',
		sayHello: ( greeting ) => {
			//	this becomes window instead of the object
			return `${ greeting } ${ this.name }`
		}
	}

;```



## reference vs values

```js

	let name1 = 'kelvin'
	let name2 = 'zhao'

	console.log( name1 === name2 )
	//	false
	name1 = name2
	console.log( name1 === name2 )
	//	true
	name1 = 'kelvin'
	console.log( name1 === name2 )
	//	false

	//	contents are copied over
	//	not pointing to same thing
	//	value



	const person1 = { name: 'kelvin' }
	const person2 = { name: 'kelvin' }

	console.log( person1 === person2 )
	//	false
	//	same content, but not same object

	const person3 = person1
	person3.name = 'zhao'
	console.log( person3.name, person1.name )
	//	zhao, zhao

	//	person3 points to person1 instead of copy
	//	objects & arrays
	//	reference

	//	ways to copy object
	//	caveat - one level deep
	const person4 = { ...person1 }
	const person5 = Object.assign( { }, person1 )

	//	deep clone
	//	import lodash lib
	const person6 = _.cloneDeep( person1 )



	//	merge
	const meat = {
		bacon: 2
	}

	const veggie = {
		tomatoes = 3
	}

	const inventory = {
		...meat,
		...veggie,
		oyster: 1
	}
	//	note, if there are same items in the spread
	//	the last one in will override the previous one

;```



## maps

```js

	const myMap = new Map()

	myMap.set( 'name', 'kelvin' )
	console.log( myMap )
	//	entries 0: name => wes
	//	in a map, key can be anything
	myMap.set( person1, 'really cool' )
	//	can even be an object

	myMap.get( person1 )
	//	reall cool

	myMap.size
	//	2

	//	order in maps is maintained, unlike objects

;```



---



# arrays



## intro

```js

	const names = [ 'one', 'two', 'three' ]

	typeof names
	//	object
	Array.isArray( names )
	//	true

	names[ 0 ] // first item
	names[ names.length - 1 ] // last item

	const backwards = names.reverse()
	//	names array is mutated/changed - mutable

	const pizzaSlice = names.slice( 1, 2 )
	//	names array remains the same - immutable

	const reversed = [ ...names ].reverse()
	//	a new copy of array to use for mutation



	const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	//	slice - immutable
	//	( begin, end ) - begin included, end not included
	numbers.slice( 2, 4 )
	//	[ 3, 4 ]
	//	numbers array remain the same

	//	splice - mutable
	//	( start, delete count )
	numbers.splice( 2, 4 )
	//	[ 3, 4, 5, 6 ] deleted
	//	numbers array changed



	const comments = [
		{ text: 'Me', id: 111 },
		{ text: 'You', id: 222 },
		{ text: 'This', id: 333 },
		{ text: 'That', id: 444 },
	]

	function deleteComment( id, comments ) {
		const commentIndex = comments.findIndex( comment => comment.id === id )
		return [
			...comments.slice( 0, commentIndex ),
			...comments.slice( commentIndex + 1 )
		]
	}

;```



## static methods

```js

	Array.of( 'kelvin', 'zhao' )
	//	[ 'kelvin', 'zhao' ]

	Array.isArray( myArray )
	//	true

	Object.entries( myObject )
	//	create array of arrays with the object
	Object.keys( myObject )
	//	create array with all the keys
	Object.values( myObject )
	//	create array with all the values

;```



## instance methods

```js

	myArray.join()
	//	joins array into a string with , seperator
	//	or given seperator
	//	join.( ' or ' )
	//	[ one, two, three ] => 'one or two or three'

	myString.split( ',' )
	//	string to array by ,
	//	split() will make every character an item in array

	myArray.pop()
	//	returns last item
	//	removes last time too
	//	mutable

	myArray.shift()
	//	returns first time
	//	removes first item

	myArray.indexOf( 'something' )
	//	gets index of x
	//	-1 means nothing

;```



## callback methods & function generation

```js

	const feedback = [
		{ comment: 'Love the burgs', rating: 4 },
		{ comment: 'Horrible Service', rating: 2 },
		{ comment: 'Smoothies are great, liked the burger too', rating: 5 },
		{ comment: 'Ambiance needs work', rating: 3 },
		{ comment: 'I DONT LIKE BURGERS', rating: 1 },
	]

	function findBurgRating( singleFeedback, i, array ) {
		return singleFeedback.comment.includes( 'burg' )
	}

	//	ends loop to find once a true is returned
	const burgRating = feedback.find( findBurgRating )



	// function to make another function
	function findByWord( word ) {
		return function( singleFeedback ) {
			return singleFeedback.comment.includes( word )
		}
	}

	const burgFinder = findByWord( 'burg' )
	const burgRating = feedback.find( burgFinder )
	const smoothieFinder = findByWord( 'smoothie' )
	const smoothieRating = feedback.find( smoothieFinder )

	//	or shorter
	const friesRating = feedback.find( findByWord( 'fries' ) )



	// filter returns new array
	const goodReviews = feedback.filter( singleFeedback => singleFeedback.rating > 2 )

	//	reuse
	function filterByMinRating( minRating ) {
		return function( singleFeedback ) {
			return singleFeedback.rating > minRating
		}
	}
	const greatReviews = feedback.filter( filterByMinRating( 4 ) )



	const meats = {
		beyond: 10,
		beef: 5,
		pork: 7,
	}

	//	some() checks for at least 1
	const moreThanOneMeat = Object.values( meats ).some( meatValue => 5 )
	//	every() checks for all
	const enoughOfEveryMeat = Object.values( meats ).every( meatValue => 3 )



	//	sort() alphabetically as strings, or giving pairs of item to check with
	const numbers = [ 1, 2, 100, 3, 200, 400, 155 ]
	const numbersSorted = numbers.sort( function( firstItem, secondItem ) {
		if ( firstItem > secondItem ) {
			return 1
		} else {
			return -1
		} else {
			return 0
		}
	} )
	//	shorter
	const numbersSorted = numbers.sort( function( firstItem, secondItem ) {
		return firstItem - secondItem
	} )
	const numbersSorted = numbers.sort( ( firstItem, secondItem ) => firstItem - secondItem )
	//	by default as strings
	myAlphabets.sort()

	const meatsSortedByNum = Object.entries( num ).sort( ( a, b ) => {
		const aNum = a[ 1 ]
		const bNum = b[ 1 ]
		return aNum - bNum
	} )
	const meatsSortedByNumObject = Object.fromEntries( meatsSortedByNum )

;```



---



# looping & iterating



## Array.forEach

> difference between .foreach & .map
> foreach does something to each el of array
> map returns a new array with modified el

```js

	const toppings = [
		'Mushrooms', 'Tomatoes', 'Eggs', 'Chili', 'Lettuce',
		'Avocado', 'Bacon', 'Pickles', 'Onions', 'Cheese'
	]

	toppings.forEach( ( topping, index, myArray ) => {
		const nextTopping = myArray( index + 1 )
		const prevTopping = myArray( index - 1 )

		prevTopping ? console.log( prevTopping ) : null
		console.log( topping )
		nextTopping ? console.log( nextTopping ) : null

		console.log( '-------🍕-------' )
		debugger
	} )

;```



## mapping

```js

	const faces = [ '🤖', '😈', '🤡', '👹', '🎃', '💀', '👽' ]

	function addArms( face ) {
		return `👋 ${ face } 👋`
	}

	const toys = faces.map( addArms )



	//	interesting body building with strings
	function attachBody( face, body ) {
		return `
			${ face }
			${ body.repeat( 3 ) }
			${ Array( 3 ).fill( body ).join( ' ' ) }
			👇 ${ body.repeat( 2 ) } 👇
			${ Array( 2 ).fill( body ).join( '  ' ) }
			${ Array( 2 ).fill( body ).join( '  ' ) }
			👢    👢
		`
	}

;```



## filter, find & higher order functions

```js

	//	filter returns an array
	//	people over 40 will be in this new list that is filtered
	const over40 = cleanPeople.filter( person => {
		if ( person.age > 40 ) {
			return true
		} else {
			return false
		}
	} )

	//	shorter
	const over40 = cleanPeople.filter( person => person.age > 40 )



	//	find returns 1 item, not array
	const student = students.find( stud => stud.id === '565a' )

	function findById( id ) {
		return function isStudent( student ) {
			return student.id === id
		}
	}

	const student = students.find( findById( '565a' ) )

	function findByProp( prop, propWeAreLookingFor ) {
		return function isStudent( student ) {
			return student[ prop ] === propWeAreLookingFor
		}
	}

	const student = students.find( findByProp( 'first_name', 'Micki' ) )

;```



## reduce

```js

	//	using normal loop
	let total = 0
	orderTotals.forEach( single => total += single )



	//	using reduce
	function tally( total, current ) {
		return total + current
	}

	//	starts total at 0
	const allOrders = orderTotals.reduce( tally, 0 )



	//	totals as an object
	function inventoryReducer( total, current ) {
		total[ current.type ] = totals[ current.type ]++ || 1
		return total
	}

	const inventoryCounts = inventory.reduce( inventoryReducer, {} )
	const totalInventoryPrice = inventory.reduce( ( total, item ) => total + item.price, 0 )



	//	nice example
	[ 🐮, 🥔, 🐔, 🌽 ].map( cook ) =
	[ 🍔, 🍟, 🍗, 🍿 ]

	[ 🍔, 🍟, 🍗, 🍿 ].filter( isVegetarian ) =
	[ 🍟, 🍿 ]

	[ 🍔, 🍟, 🍗, 🍿 ].reduce( eat ) =
	[ 💩 ]

;```



## reduce exercise

```js

	const result = myPara
					.split( '' ) // split each char into an item of an array
					.filter( char => char.match( /[a-z0-9]/i ) ) // remove non alphanumeric
					.map( char => char.toLowerCase ) // change all to lowercase
					.reduce( ( total, current ) => {
						total[ current ] = totals[ current ]++ || 1
						return total
					}, {} )

	const sortedResults = Object.entries( result )
								.sort( ( a, b ) => a[ 1 ] - b[ 1 ] )

;```



## for, for in, for of & while loops

```js

	//	for
	for ( let i = 0; i < 10; i++ ) {
		console.log( i )
	}

	for ( let i = 100; i <= 120; i += 2 ) {
		console.log( i )
	}

	for ( let i = 0; i < numbers.length; i++ ) {
		console.log( numbers[ i ] )
	}



	//	for of
	const name = 'Kelvin Zhao'

	for ( const letter of name ) {
		console.log( letter )
		//	k, e, l ...
	}



	//	for in
	//	looping keys
	const kelvin = {
		age: 18,
		first: 'kelvin',
		last: 'zhao',
	}

	//	similar to object.keys
	//	but can grab props even from prototypes/father
	for ( const prop in kelvin ) {
		console.log( prop )
		//	age, first, last
	}



	//	while
	let i = 0
	while( i < 100 ) {
		i++
		console.log( i )
	}



	//	do while
	do {
		i++
		console.log( i )
	} while( i < 100 )

;```



---



# exercises



## face detection & censorship

chrome://flags
experimental web platform features - enabled

```html

	<div class="wrap">
		<video class="webcam"></video>
		<canvas class="video"></canvas>
		<canvas class="face"></canvas>
	</div>

	<div class="controls">
		<label for="scale">
			Scale:
			<input value="1.35" type="range" name="scale" min="0.3" max="3" step="0.1">
		</label>
		<label for="size">
			Size:
			<input value="10" type="range" name="size" min="1" max="100" step="1">
		</label>
	</div>

;```

```js

	const
	video      = document.querySelector( '.webcam' ),

	canvas     = document.querySelector( '.video' ),
	ctx        = canvas.getContext( '2d' ),

	faceCanvas = document.querySelector( '.face' ),
	faceCtx    = faceCanvas.getContext( '2d' ),

	faceDector = new window.FaceDetector(),

	options = {
		size  : 10,
		scale : 1.35,
	}

	const optionsInputs = document.querySelectorAll( '.controls input[type="range"]' )

	function handleOption( e ) {
		const { value, name } = e.currentTarget
		options[ name ] = parseFloat( value )
	}

	optionsInputs.forEach( input => input.addEventListener( 'input', handleOption ) )

	async function populateVideo() {
		//	get webcam video stream
		const stream = await navigator.mediaDevices.getUserMedia( {
			video: {
				width: 1280,
				height: 720
			}
		} )

		//	put it into video src
		video.srcObject = stream

		//	play webcam video
		await video.play()

		//	update canvas sizes
		canvas.width = video.videoWidth
		canvas.height = video.videoHeight
		faceCanvas.width = video.videoWidth
		faceCanvas.height = video.videoHeight
	}

	async function detect() {
		const faces = await faceDector.detect( video )

		faces.forEach( drawFace )
		faces.forEach( censor )
		requestAnimationFrame( detect )
	}

	function drawFace( face ) {
		const { width, height, top, left } = face.boundingBox
		ctx.clearRect( 0, 0, canvas.width, canvas.height )
		ctx.strokeStyle = '#ffc600'
		ctx.lineWidth   = 2
		ctx.strokeRect( left, top, width, height )
	}

	//	deconstruct the boundingBox & name it as a var name face
	function censor( { boundingBox: face } ) {

		faceCtx.imageSmoothingEnabled = false
		faceCtx.clearRect( 0, 0, faceCanvas.width, faceCanvas.height )

		//	draw a small face
		faceCtx.drawImage(
			video, // where does the source come from?

			face.x, // where do we start pulling
			face.y,
			face.width,
			face.height,

			face.x, // where should we start drawing
			face.y,
			options.size,
			options.size
		)

		const
		width = face.width * options.scale,
		height = face.height * options.scale

		//	scale small face up
		faceCtx.drawImage(
			faceCanvas,

			face.x,
			face.y,
			options.size,
			options.size,

			face.x - ( width - face.width ) / 2,
			face.y - ( height - face.height ) / 2,
			width,
			height
		)
	}

	populateVideo().then( detect )

;```



## sarcastic text generator

```js

	const textarea = document.querySelector( '[name="text"]' )
	const result = document.querySelector( '.result' )
	const filterInputs = Array.from( document.querySelectorAll( '[name="filter"]' ) )

	const funkyLetters = { a: 'à', ... } // assorted funky letters

	const filters = {
		sarcastic( letter, index ) {
			return index % 2 ? letter.toUpperCase() : letter.toLowerCase()
		},
		funcky( letter ) {
			let funkyLetter = funkyLetters[ letter ]
			if ( funkyLetter ) return funkyLetter
			funkyLetter = funkyLetters[ letter.toLowerCase() ]
			if ( funkyLetter ) return funkyLetter
			return letter
		},
		unable( letter ) {
			const random = Math.floor( Math.random() * 3 )
			if ( letter === ' ' && random === 2 ) {
				return '...'
			}
			return letter
		},
	}

	function transformText( text ) {
		// const filter = document.querySelector( '[name="filter"]:checked' ).value
		const filter = filterInputs.find( input => input.checked ).value

		const mod = Array.from( text ).map( filters[ filter ] )
		result.textContent = mod.join( '' )
	}

	textarea.addEventListener( 'input', e => transformText( e.target.value ) )
	filterInputs.forEach( input => {
		input.addEventListener( 'input', () => transformText( textarea.value ) )
	} )

;```



## shopping form with custom events, delegation & localstorage

npm install -g parcel-bundler

```html

	<div class="shopping-list">
		<form class="shopping" autocomplete="off">
			<input type="text" name="item" id="item" required>
			<button type="submit">+ Add Item</button>
		</form>

		<ul class="list"></ul>
	</div>

;```

**important shat**

```js

	const shoppingForm = document.querySelector( '.shopping' )
	const list = document.querySelector( '.list' )

	let items = []

	function handleSubmit( e ) {
		e.preventDefault()

		const name = e.currentTarget.item.value

		// if empty don't run
		if ( !name ) return

		const item = {
			name, // same as name: name
			id: Date.now(),
			complete: false,
		}
		items.push( item )
		//	e.currentTarget.item.value = ''
		//	or
		e.currentTarget.reset()

		//	fire custom event
		//	let any other functions to know items updated
		list.dispatchEvent( new CustomEvent( 'itemsUpdated' ) )
	}

	function displayItems() {
		const html = items.map( item =>
			`<li class="shopping-item">
				<input
					type="checkbox"
					value="${ item.id }"
					${ item.complete && 'checked' }
				>
				<span class="itemName">${ item.name }</span>
				<button
					aria-label="remove ${ item.name }"
					value="${ item.id }"
				>&times;</button>
			</li>`
		).join( '' )

		list.innerHTML = html
	}

	function mirrorToLocalStorage() {
		//	localStorage is string only so convert to JSON
		localStorage.setItem( 'items', JSON.stringify( items ) )
	}

	function restoreFromLocalStorage() {
		const lsItems = JSON.parse( localStorage.getItem( 'items' ) )
		if( lsItems.length ) {
			items.push( ...lsItems )
			list.dispatchEvent( new CustomEvent( 'itemsUpdated' ) )
		}
	}

	function deleteItem( id ) {
		items = items.filter( item => item.id !== id )
		list.dispatchEvent( new CustomEvent( 'itemsUpdated' ) )
	}

	function markAsComplete( id ) {
		const itemRef = items.find( item => item.id === id )
		itemRef.complete = !itemRef.complete
		list.dispatchEvent( new CustomEvent( 'itemsUpdated' ) )
	}

	shoppingForm.addEventListener( 'submit', handleSubmit )
	list.addEventListener( 'itemsUpdated', displayItems )
	list.addEventListener( 'itemsUpdated', mirrorToLocalStorage )

	list.addEventListener( 'click', e => {
		//	e.target vs e.currentTarget is different
		//	listen on list
		//	button is within the list
		const id = parseInt( e.target.value )
		if ( e.target.matches( 'button' ) ) {
			deleteItem( id )
		}

		if ( e.target.matches( 'input[type="checkbox"' ) ) {
			markAsComplete( id )
		}
	} )

	restoreFromLocalStorage()

;```



## building a gallery exercise

`<img tabindex="0">`
so they can be tabbed/switched via keyboard

```js

	function Gallery( gallery ) {
		if ( !gallery ) { throw new Error( 'No Gallery Found!' ) }

		const images = Array.from( gallery.querySelectorAll( 'img' ) )
		const modal = document.querySelector( '.modal' )
		const prevButton = modal.querySelector( '.prev' )
		const nextButton = modal.querySelector( '.next' )
		let currentImage

		function openModal() {
			if ( modal.matches( '.open' ) ) return

			modal.classList.add( 'open' )

			window.addEventListener( 'keyup', handleKeyUp )
			nextButton.addEventListener( 'click', showNextImage )
			prevButton.addEventListener( 'click', showPrevImage )
		}

		function closeModal() {
			modal.classList.remove( 'open' )

			window.removeEventListener( 'keyup', handleKeyUp )
			nextButton.removeEventListener( 'click', showNextImage )
			prevButton.removeEventListener( 'click', showPrevImage )
		}

		function handleClickOutside( e ) {
			if ( e.target === e.currentTarget ) {
				closeModal()
			}
		}

		function handleKeyUp( e ) {
			if ( e.key === 'Escape' ) return closeModal()
			if ( e.key === 'ArrowRight') return showNextImage()
			if ( e.key === 'ArrowLeft') return showPrevImage()
		}

		function showNextImage() {
			showImage( currentImage.nextElementSibling || gallery.firstElementChild )
		}

		function showPrevImage() {
			showImage( currentImage.previousElementSibling || gallery.lastElementChild )
		}

		function showImage( el ) {
			if ( !el ) return

			modal.querySelector( 'img' ).src = el.src
			modal.querySelector( 'h2' ).textContent = el.title
			modal.querySelector( 'figure p' ).textContent = el.dataset.description

			currentImage = el

			openModal()
		}

		images.forEach( image =>
			image.addEventListener( 'click', e =>
				showImage( e.currentTarget )
			)
		)

		images.forEach( image =>
			image.addEventListener( 'keyup', e =>
				if ( e.key === 'Enter' ) {
					showImage( e.currentTarget )
				}
			)
		)

		modal.addEventListener( 'click', handleClickOutside )
	}

	const gallery1 = Gallery( document.querySelector( '.gallery1' ) )
	const gallery2 = Gallery( document.querySelector( '.gallery2' ) )

;```



## building a slider

```js

	function Slider( slider ) {
		if ( !( slider instanceof Element ) ) throw new Error( 'No slider passed in... 😧' )

		let current, prev, next
		const slides = slider.querySelector( '.slides' )
		const prevButton = slider.querySelector( '.goToPrev' )
		const nextButton = slider.querySelector( '.goToNext' )

		function startSlider() {
			//	nextSibling can be anything even plain text, breaks, etc
			//	nextElementSibling will give you the element
			current = slider.querySelector( '.current' ) || slides.firstElementChild
			prev = current.previousElementSibling || slides.lastElementChild
			next = current.nextElementSibling || slides.firstElementChild
		}

		function applyClasses() {
			current.classList.add( 'current' )
			prev.classList.add( 'prev' )
			next.classList.add( 'next' )
		}

		function move( dir ) {
			const classesToRemove = [ 'prev', 'current', 'next' ]

			prev.classList.remove( ...classesToRemove )
			current.classList.remove( ...classesToRemove )
			next.classList.remove( ...classesToRemove )

			if ( dir === 'back' ) {
				//	using destructuring to reassign
				[ prev, current, next ] = [
						prev.previousElementSibling || slides.lastElementChild,
						prev,
						current
					]
			} else {
				[ prev, current, next ] = [
						current,
						next,
						next.nextElementSibling || slides.firstElementChild
					]
			}

			applyClasses()
		}

		startSlider()
		applyClasses()

		prevButton.addEventListener( 'click', () => move( 'back' ) )
		nextButton.addEventListener( 'click', () => move() )
	}

	const mySlider = Slider( document.querySelector( '.slider' ) )
	const mySlider = Slider( document.querySelector( '.dog-slider' ) )

;```



---



# keywords



## the new keyword

```js

	const myDate = new Date( 'August 11, 2025' )
	console.log( typeof myDate ) // object
	console.log( myDate instanceof Date ) // true

	const names = [ 'hello', 'you' ]
	//	same as
	const names = new Array( 'hello', 'you' )

	function Pizza() {
		console.log( 'Making a pizza...' )
	}

	//	creating a new object
	//	that's an instance of the function that creates it
	const pepperoniPizza = new Pizza()

;```



## the this keyword

```js

	const button1 = document.querySelector( '.one' )
	const button2 = document.querySelector( '.two' )

	function tellMeAboutTheButton() {
		console.log( this ) // button1 or button2
	}

	function tellMeAboutTheButton = () => {
		console.log( this ) // window
		//	the scoped this
		//	if no outside scope, it'll be window
	}

	button1.addEventListener( 'click', tellMeAboutTheButton )
	button2.addEventListener( 'click', tellMeAboutTheButton )

	function Pizza( toppings = [], customer ) {
		this.toppings = toppings
		this.customer = customer
		this.id = Math.floor( Math.random() * 16777215 ).toString( 16 )
	}

	const pepperoniPizza = new Pizza( [ 'pepperoni' ], 'kelvin' )
	const canadianPizza = new Pizza( [ 'mushrooms', 'onion' ], 'kelly' )

;```



---



# prototype



## prototypes & prototypal inheritance

```js

	function Pizza( toppings = [], customer ) {
		this.toppings = toppings
		this.customer = customer
		this.id = Math.floor( Math.random() * 16777215 ).toString( 16 )
		this.slices = 12
		this.size = 'Medium'

		//	1 function for each instance
		//	not cost efficient
		//	duplicated for no good reason
		this.eat = function() {
			if ( this.slices > 0 ) this.slices -= 1
		}
	}

	//	share functions via prototype
	//	better
	Pizza.prototype.eat = function() {
		if ( this.slices > 0 ) this.slices -= 1
	}

	Pizza.prototype.size = 'Large'

	const pepperoniPizza = new Pizza( [ 'pepperoni' ], 'kelvin' )
	const canadianPizza = new Pizza( [ 'mushrooms', 'onion' ], 'kelly' )

	console.log( canadianPizza.size ) // Medium
	//	only if pizza itself has no size prop
	//	will it go to prototype to look

;```



## refactor of the gallery exercise

```js

	function Gallery( gallery ) {
		if ( !gallery ) { throw new Error( 'No Gallery Found!' ) }

		this.gallery = gallery

		this.images = Array.from( this.gallery.querySelectorAll( 'img' ) )
		this.modal = document.querySelector( '.modal' )
		this.prevButton = this.modal.querySelector( '.prev' )
		this.nextButton = this.modal.querySelector( '.next' )

		//	fix this binding
		this.handleKeyUp = this.handleKeyUp.bind( this )
		this.showNextImage = this.showNextImage.bind( this )
		this.showPrevImage = this.showPrevImage.bind( this )
		this.handleClickOutside = this.handleClickOutside.bind( this )

		this.images.forEach( image =>
			image.addEventListener( 'click', e => {
					this.showImage( e.currentTarget )
				}
			)
		)

		this.images.forEach( image =>
			image.addEventListener( 'keyup', e => {
					if ( e.key === 'Enter' ) {
						this.showImage( e.currentTarget )
					}
				}
			)
		)

		this.modal.addEventListener( 'click', this.handleClickOutside )
	}

	Gallery.prototype.openModal = function() {
		if ( this.modal.matches( '.open' ) ) return

		this.modal.classList.add( 'open' )

		//	this is bound to button thus a fix is used above
		window.addEventListener( 'keyup', this.handleKeyUp )
		this.nextButton.addEventListener( 'click', this.showNextImage )
		this.prevButton.addEventListener( 'click', this.showPrevImage )
	}

	Gallery.prototype.closeModal = function() {
		this.modal.classList.remove( 'open' )

		window.removeEventListener( 'keyup', this.handleKeyUp )
		this.nextButton.removeEventListener( 'click', this.showNextImage )
		this.prevButton.removeEventListener( 'click', this.showPrevImage )
	}

	Gallery.prototype.handleClickOutside = function( e ) {
		if ( e.target === e.currentTarget ) {
			this.closeModal()
		}
	}

	Gallery.prototype.handleKeyUp =  function( e ) {
		if ( e.key === 'Escape' ) return this.closeModal()
		if ( e.key === 'ArrowRight') return this.showNextImage()
		if ( e.key === 'ArrowLeft') return this.showPrevImage()
	}

	Gallery.prototype.showNextImage = function() {
		this.showImage( this.currentImage.nextElementSibling || this.gallery.firstElementChild )
	}

	Gallery.prototype.showPrevImage = function() {
		this.showImage( this.currentImage.previousElementSibling || this.gallery.lastElementChild )
	}

	Gallery.prototype.showImage = function( el ) {
		if ( !el ) return

		this.modal.querySelector( 'img' ).src = el.src
		this.modal.querySelector( 'h2' ).textContent = el.title
		this.modal.querySelector( 'figure p' ).textContent = el.dataset.description

		this.currentImage = el

		this.openModal()
	}

	const gallery1 = new Gallery( document.querySelector( '.gallery1' ) )
	const gallery2 = new Gallery( document.querySelector( '.gallery2' ) )

;```



## prototype refactor of the slider exercise

```js

	function Slider( slider ) {
		if ( !( slider instanceof Element ) ) throw new Error( 'No slider passed in... 😧' )

		this.slider = slider

		this.slides = this.slider.querySelector( '.slides' )
		this.prevButton = this.slider.querySelector( '.goToPrev' )
		this.nextButton = this.slider.querySelector( '.goToNext' )

		this.startSlider()
		this.applyClasses()

		//	why we don't bind but use arrow functions to fix the 'this' issue
		//	we don't need a reference to the event which needs to be removed
		//	in the gallery example
		//	anon arrow function removes the ability to reference it thus can't remove it later
		this.prevButton.addEventListener( 'click', () => this.move( 'back' ) )
		this.nextButton.addEventListener( 'click', () => this.move() )
	}

	Slider.prototype.startSlider = function() {
		//	nextSibling can be anything even plain text, breaks, etc
		//	nextElementSibling will give you the element
		this.current = this.slider.querySelector( '.current' ) || this.slides.firstElementChild
		this.prev = this.current.previousElementSibling || this.slides.lastElementChild
		this.next = this.current.nextElementSibling || this.slides.firstElementChild
	}

	Slider.prototype.applyClasses = function() {
		this.current.classList.add( 'current' )
		this.prev.classList.add( 'prev' )
		this.next.classList.add( 'next' )
	}

	Slider.prototype.move = function( dir ) {
		const classesToRemove = [ 'prev', 'current', 'next' ]

		this.prev.classList.remove( ...classesToRemove )
		this.current.classList.remove( ...classesToRemove )
		this.next.classList.remove( ...classesToRemove )

		if ( dir === 'back' ) {
			//	using destructuring to reassign
			[ this.prev, this.current, this.next ] = [
					this.prev.previousElementSibling || this.slides.lastElementChild,
					this.prev,
					this.current
				]
		} else {
			[ this.prev, this.current, this.next ] = [
					this.current,
					this.next,
					this.next.nextElementSibling || this.slides.firstElementChild
				]
		}

		this.applyClasses()
	}

	const mySlider = new Slider( document.querySelector( '.slider' ) )
	const mySlider = new Slider( document.querySelector( '.dog-slider' ) )

;```



---



## bind, call, apply

```js

	const person = {
		name: 'kelvin',
		sayHi() {
			return `hey ${ this.name }`
		}
	}

	person.sayHi()
	//	hey kelvin

	const sayHi = person.sayHi
	sayHi()
	//	hey

	const sayHi = person.sayHi.bind( person )
	sayHi()
	//	hey kelvin

	const jenna = { name: 'jenna' }
	const sayHi = person.sayHi.bind( jenna )
	sayHi()
	//	hey jenna

	const $ = document.querySelector.bind( document )
	$( 'p' )
	//	without bind, document.querySelector loses the document.
	//	because $ = function called querySelector taken from document
	//	but without document being locked in

	//	first arguument object to be binded
	//	second argument
	//	.06 will be passed into the calculate function
	const calc = bill.calculate.bind( { total: 500 }, .06 )

;```

.call binds & runs the function at the same time
.apply binds & runs the function at the same time, but parameters passed in as an array



## the event loop & callback hell

```js

	const go = document.querySelector( '.go' )

	go.addEventListener( 'click', function( e ) {
		const el = e.currentTarget

		el.textContent = 'Go!'

		setTimeout( function() {
			el.classList.add( 'circle' )

			setTimeout( function() {
				el.classList.add( 'red' )

				setTimeout( function() {
					el.classList.remove( 'circle' )

					setTimeout( function() {
						el.classList.remove( 'red' )
						el.classList.add( 'purple' )

						setTimeout( function() {
							el.classList.add( 'fadeout' )
						}, 500 )
					}, 300 )
				}, 250 )
			}, 500 )
		}, 2000 )
	} )

;```



---



## promises

```js

	function makePizza( toppings ) {
		return new Promise( function( resolve, reject ) {

			setTimeout( function() {
				resolve( `🍕 with ${ toppings.join( ' ' ) }` )
			}, 1000 )

		} )
	}

	const pepperoniPromise = makePizza( [ 'pepperoni', 'tomatoes' ] )

	pepperoniPromise.then( function( pizza ) {
		console.log( pizza )
	} )

	// wait one after another
	makePizza( [ 'pepperoni' ] )
		.then( function( pizza ) {
			console.log( pizza )
			return makePizza( [ 'ham', 'cheese' ] )
		} )
		.then( function( pizza ) {
			console.log( pizza )
			return makePizza( [ 'hot peppers', 'onions' ] )
		} )
		.then( function( pizza ) {
			console.log( pizza )
		} )

	// wait for all to finish
	const pizzaPromise1 = makePizza( [ 'pepperoni' ] )
	const pizzaPromise2 = makePizza( [ 'ham', 'cheese' ] )
	const pizzaPromise3 = makePizza( [ 'hot peppers', 'onions' ] )

	const dinnerPromise = Promise.all( [ pizzaPromise1, pizzaPromise2, pizzaPromise3 ] )

	dinnerPromise.then( function( pizzas ) {
		console.log( pizzas )
		//	array with all the pizza
	} )

	//	restructuring tips
	dinnerPromise.then( function( pizzas ) {
		const [ one, two, three ] = pizzas
		console.log( one, two, three )
	} )

	dinnerPromise.then( function( [ one, two, three ] ) ) {
		console.log( one, two, three )
	}

	//	get first to finish
	const firstPizza = Promise.race( [ pizzaPromise1, pizzaPromise2, pizzaPromise3 ] )
	firstPizza.then( pizza => console.log( 'first' + pizza ) )

;```



## error handling

```js

	function makePizza( toppings ) {
		return new Promise( function( resolve, reject ) {

			if ( toppings.includes( 'pineapple' ) ) {
				reject( 'No!' )
			}

			setTimeout( function() {
				resolve( `🍕 with ${ toppings.join( ' ' ) }` )
			}, 1000 )

		} )
	}

	makePizza( [ 'cheese', 'pineapple' ] )
		.then( pizza => {
			console.log( pizza )
		} )
		.catch( err => {
			console.log( err )
		} )

	//	only 1 catch is needed for chained promises
	//	but 1 error breaks chain
	//	use this instead if you need to continue
	const p1 = makePizza( [ 'pep' ] )
	const p2 = makePizza( [ 'pineapple' ] )
	const dinnerPromise = Promise.all( [ p1, p2 ] )
	dinnerPromise.then( results => {
		console.log( results ) // 1 success, 1 error
	} )

;```



## refactoring callback hell to promise land

```js

	function wait( ms = 0 ) {
		return new Promise( function( resolve ) {
			setTimeout( resolve, ms )
		} )
	}
	// or shorter
	const wait = ( ms = 0 ) => new Promise( resolve => setTimeout( resolve, ms ) )



	const go = document.querySelector( '.go' )

	function animate() {
		const el = e.currentTarget
		el.textContent = 'Go!'

		wait( 2000 )
			.then( ()=> {
				el.classList.add( 'circle' )
				return wait( 500 )
			} )
			.then( () => {
				el.classList.add( 'red' )
				return wait( 250 )
			} )
			.then( () => {
				el.classList.remove( 'circle' )
				return wait( 500 )
			} )
			.then( () => {
				el.classList.remove( 'red' )
				el.classList.add( 'purple' )
				return wait( 500 )
			} )
			.then( () => {
				el.classList.add( 'fadeout' )
			} )
	}

	go.addEventListener( 'click', animate )

;```



## async await

```js

	function wait( ms = 0 ) {
		return new Promise( resolve => {
			setTimeout( resolve, ms )
		} )
	}

	function go() {
		console.log( 'starting' )
		await wait( 2000 )
		console.log( 'ending' )
	}
	go()
	//	starting, ending, wait ends

	async function go() {
		console.log( 'starting' )
		await wait( 2000 )
		console.log( 'ending' )
	}
	go()
	//	starting, wait ends, ending



	//	await can only happen in async functions
	//	async functions are promises too
	//	can .then().catch() on them when running if needed



	//	fuction declaration
	async function fd() {}

	//	arrow function
	const arrowFn = async () => {}

	// callback
	window.addEventListener( 'click', async function() {} )

	const person = {
		//	method
		sayHi: async function() {},
		//	method shorthand
		async sayHello() {},
		//	function property
		sayHey: async () => {}
	}



	function makePizza( toppings ) {
		return new Promise( function( resolve, reject ) {

			if ( toppings.includes( 'pineapple' ) ) {
				reject( 'No!' )
			}

			setTimeout( function() {
				resolve( `🍕 with ${ toppings.join( ' ' ) }` )
			}, 1000 )

		} )
	}

	async function makeDinner() {
		const pizza1 = await makePizza( [ 'pepperoni' ] )
		const pizza2 = await makePizza( [ 'mushrooms' ] )
		//	after pizza 1 finishes, pizza 2 starts

		const pizzaPromise1 = makePizza( [ 'pepperoni' ] )
		const pizzaPromise2 = makePizza( [ 'mushrooms' ] )
		const pizzas = await Promise.all( [ pizzaPromise1, pizzaPromise2 ] )
		//	waits for both to be done, but both starts at same time
	}

	makeDinner()



	async function animate() {
		const el = e.currentTarget
		el.textContent = 'Go!'
		await wait( 2000 )
		el.classList.add( 'circle' )
		await wait( 500 )
		el.classList.add( 'red' )
		await wait( 250 )
		el.classList.remove( 'circle' )
		await wait( 500 )
		el.classList.remove( 'red' )
		el.classList.add( 'purple' )
		await wait( 500 )
		el.classList.add( 'fadeout' )
	}

;```



## error handling

```js

	//	try, catch
	async function go() {
		try {
			const pizza = await makePizza( [ 'pineapple' ] )
			console.log( pizza )
		} catch ( err ) {
			console.log( err )
		}
	}

	go()

	//	.catch
	function handleError( err ) {
		console.log( err )
	}

	async function go() {
		const pizza = await makePizza( [ 'pineapple' ] )
							.catch( handleError )
		console.log( pizza )
	}

	go()

	//	or catch when async called
	function handleError( err ) {
		console.log( err )
	}

	async function go() {
		const pizza = await makePizza( [ 'pineapple' ] )
		console.log( pizza )
	}

	go().catch( handleError )

	//	higer order function
	async function go() {
		const pizza = await makePizza( [ 'pineapple' ] )
		console.log( pizza )
	}

	function makeSafe( fn, handleError ) {
		return function() {
			fn().catch( handleError )
		}
	}

	const safeGo = makeSafe( go, handleError )
	safeGo()

;```



## prompt ui

```js

	const wait = ( ms = 0 ) => new Promise( resolve => setTimeout( resolve, ms ) )

	async function destroyPopup( popup ) {
		popup.classList.remove( 'open' )
		await wait( 1000 )
		//	old way to remove from dom
		//	popup.parentElement.removeChild( popup )
		//	new way .remove()
		popup.remove()

		//	remove from memory
		popup = null
	}

	function ask( options ) {
		return new Promise( async resolve => {
			//	createElement instead of string literal so we can attach eventlisteners to it
			//	otherwise we need to attach to dom before being able to add eventlisteners
			const popup = document.createElement( 'form' )
			popup.classList.add( 'popup' )
			popup.insertAdjacentHTML( 'afterbegin', `
				<fieldset>
					<label>${ options.title }</label>
					<input type="text" name="input" />
					<button type="submit">Submit</button>
				</fieldset>
			`)

			if ( options.cancel ) {
				const skipButton = document.createElement( 'button' )
				skipButton.type = 'button'
				skipButton.textContent = 'Cancel'
				popup.firstElementChild.appendChild( skipButton )

				skipButton.addEventListener( 'click', () => {
					resolve( null )
				}, { once: true } )
				destroyPopup( popup )
			}

			popup.addEventListener( 'submit', e => {
				e.preventDefault()
				//	.input is the 'name' property of the input
				//	<input type="text" name="input" />
				resolve( e.target.input.value )
				destoryPopup( popup )
			}, { once: true } )

			document.body.appendChild( popup )
			//	popup & open added at same time
			//	css doesn't play transition
			//	add small timeout to allow it to play
			await wait( 50 )
			popup.classList.add( 'open' )
		} )

	}

	async function askQuestion( e ) {
		const button = e.currentTarget
		const answer = await ask( {
			title: button.dataset.question,
			cancel: button.hasAttribute( 'data-cancel' )
		} )
		//	or use
		//	const cancel = 'cancel' in button.dataset
		//	to check if it exists
	}

	const buttons = document.querySelectorAll( '[ data-question ]' )
	buttons.forEach( button => button.addEventListener( 'click', askQuestion ) )



	//	asking 1 after another
	const questions = [
		{ title: `what is your name?` },
		{ title: `what is your age`, cancel: true },
		{ title: `what is your dog's name?` },
	]

	async function askMany() {
		//	map or forEach doesn't pause loops
		//	'of' allows for pausing
		for ( const question of questions ) {
			console.log( await ask( question ) )
		}
	}

	//	utility
	async function asyncMap( arr, callback ) {
		const results = []
		for ( const item of arr ) {
			results.push( await callback( item ) )
		}
		return results
	}

	async function go() {
		const answers = await asyncMap( question, ask )
		console.log( answers )
	}

	go()

;```



## typer ui - two ways

div with data-type, data-type-min, data-type-max

> for...of
> arrays, strings, etc
> for...in
> gets property/key of objects

```js

	const wait = ( ms = 0 ) => new Promise( resolve => setTimeout( resolve, ms ) )

	//	pass ran so that it can be tested with a fixed numer
	//	& function will return constant result
	//	random in function not good for tests
	const getRandomBetween = ( min, max, ran = Math.random() ) => {
		Math.floor( ran * ( max - min ) + min )
	}

	//	async for...of loop
	async function draw( el ) {
		const text = el.textContent
		let soFar = ``
		for ( const letter of text ) {
			soFar += letter
			el.textContent = soFar
			const { typeMin, typeMax } = el.dataset
			await wait( getRandomBetween( typeMin, typeMax ) )
		}
	}

	document.querySelectorAll( '[ data-type ]' ).forEach( draw )


	//	async recursion
	function draw( el ) {
		let index = 1
		const text = el.textContent
		const { typeMin, typeMax } = el.dataset

		async function drawLetter() {
			el.textContent = text.slice( 0, index )
			index++
			await wait( getRandomBetween( typeMin, typeMax ) )
			if ( index <= text.length ) {
				drawLetter()
			}
		}

		drawLetter()
	}

	document.querySelectorAll( '[ data-type ]' ).forEach( draw )

;```



## ajax & api

```js

	const endpoint = `https://api.github.com/users/wesbos`

	function handleError( err ) {
		console.log( err )
	}

	const wesPromise = fetch( endpoint )
	wesPromise
		.then( res => {
			return res.json()
		} )
		.then( data => {
			console.log( data )
		} )
		.catch( handleError )


	//	async version
	async function displayUser() {
		const res = await fetch( endpoint )
		const data = await res.json()
		console.log( data )
	}

	displayUser().catch( handleError )

;```



## cors & recipes

cors => cross origin resource sharing
sharing data across different domains

cors policy in server has to allow

babel not to transpile async await
package.json
"browserslist": [ "last 1 chrome versions" ]

proxy is a middleman from one domain to another domain
don't use with any sensitive data as the data will go thru the proxy

```js

	const proxy = `https://cros-anywhere.herokuapp.com/`
	const baseEndpoint = `http://www.recipepuppy.com/api`
	const form = document.querySelector( 'form.search' )
	const recipesGrid = document.querySelector( '.recipes' )

	async function fetchRecipes( query ) {
		const res = fetch( `${ proxy }${ baseEndpoint }?q=${ query }` )
		const data = await res.json()
		return data
	}

	function handleSubmit( e ) {
		e.preventDefault()
		fetchAndDisplay( form.query.value )
	}

	async function fetchAndDisplay( query ) {
		form.submit.disabled = true
		const recipes = await fetchRecipes( query )
		form.submit.disabled = false
		displayRecipes( recipes )
	}

	function displayRecipes( recipes ) {
		const html = recipes.map(
			recipe => `<div>
				<h2>${ recipe.title }</h2>
				<p>${ recipe.ingredients }</p>
				${ recipe.thumbnail &&
					`<img src="${ recipe.thumbnail }" alt="${ recipe.title }" />`
				}
			</div>`
		)
		recipesGrid.innerHTML = html.join( '' )
	}

	form.addEventListener( 'submit', handleSubmit )
	fetchAndDisplay( 'pizza' )

;```



---



# exercises



## dad jokes

```js

	const jokeButton = document.querySelector( '.getJoke' )
	const jokeHolder = document.querySelector( '.joke p' )
	const loader = document.querySelector( '.loader' )

	const buttonText = [
		'Urgh.',
		'🤦🏻‍♀️',
		'omg dad',
		'you are the worst',
		'seriously',
		'stop it.',
		'please stop',
		'that was the worst one',
	]

	async function fetchJoke() {

		loader.classList.remove( 'hidden' )

		const response = await fetch(
			'https://icanhazdadjoke.com',
			{ headers: {
				Accept: 'application/json'
			} }
		)
		const data = await response.json()

		loader.classList.add( 'hidden' )

		return data
	}

	function randomItemFromArray( arr, not ) {
		const item = arr[ Math.floor( Math.random() * arr.length ) ]

		if ( item === not ) {
			return randomItemFromArray( arr, not )
		}

		return item
	}

	async function handleClick() {
		const { joke } = await fetchJoke()
		jokeHolder.textContent = joke
		jokeButton.textContent = randomItemFromArray( buttonText, jokeButton.textContent )
	}

	jokeButton.addEventListener( 'click', handleClick )

;```



## currency converter

```js

	const fromInput = document.querySelector( '[name="from_amount"]' )
	const fromSelect = document.querySelector( '[name="from_currency"]' )
	const toSelect = document.querySelector( '[name="to_currency"]' )
	const toEl = document.querySelector( '.to_amount' )
	const form = document.querySelector( '.app form' )
	const currencies = { USD: 'United States Dollar', ... etc }
	const endpoint = 'https://api.exchangeratesapi.io/latest'
	const ratesByBase = {}

	function generateOptions( options ) {
		return Object.entries( options )
				.map( [ currencyCode, currencyName ] => {
					return `<option value="${ currencyCode}">
								${ currencyCode } - ${ currencyName }
							</options>`
				} )
				.join( '' )
	}

	async function fetchRates( base = 'USD' ) {
		const res = await fetch( `${ endpoint }?base=${ base }` )
		const rates = await res.json()
		return rates
	}

	async function convert( amount, from, to ) {
		if ( !ratesByBase[ from ] ) {
			const rates = await fetchRates( from )
			ratesByBase[ from ] = rates
		}
		const rate = ratesByBase[ from ].rates[ to ]
		const convertedAmount = rate * amount
		return convertedAmount
	}

	function formatCurrency( amount, currency ) {
		return Intl.NumberFormat( 'en-US', {
			style: 'currency',
			currency
		} ).format( amount )
	}

	async function handleInput( e ) {
		const rawAmount = await convert(
									fromInput.value,
									fromSelect.value,
									toSelect.value
								)
		toEl.textContent = formatCurrency( rawAmount, toSelect.value )
	}

	const optionsHTML = generateOptions( currencies )
	fromSelect.innerHTML = optionsHTML
	toSelect.innerHTML = optionsHTML
	form.addEventListener( 'input', handleInput )

;```



## modules

```html

	<script src="./scripts.js" type="module"></script>

;```

```js

	//	each file is a module with own scope



	//	named export - as many as you want
	export const last = 'zhao'
	export function returnHi( name ) {
		return `hi ${ name }`
	}
	const name = 'kelvin'
	//	export at bottom
	export { name }

	//	named import
	import { returnHi, last } from './utils.js'
	returnHi( last )
	//	hi zhao

	//	rename as you import
	import { returnHi as sayHi } from './utils.js'

	//	import all
	import * as everything from './utils.js'
	//	kinda like an object
	//	everything.var1
	//	everything.func()



	//	default export - only 1 per module
	const person = {
		name: 'kelvin',
		last: 'zhao'
	}
	export default person

	//	default import - name it as anything
	import kel from './utils.js'



	//	dynamic imports
	//	above imports are all evaluated at load times
	//	below is on demand
	export async function handleButtonClick( e ) {
		const currencies = await import( './currencies.js' )
		console.log( currencies )
	}

;```



## currency modules refactor

```js

	//	elements.js
	export const ...

	//	currencies.js
	const currencies = { ... }
	export default currencies

	//	utils.js
	export function generateOptions( options ) { ... }
	export function formatCurrency( amount, currency ) { ... }

	//	lib.js
	import { fromSelect, toSelect } from './elements.js'
	import { generateOptions } from 'utils.js'
	const endpoint = `...`
	const ratesByBase = `...`
	export async function fetchRates( base = 'USD' ) { ... }
	export async function convert( amount, from, to ) { ... }

	//	handlers.js
	import { convert } from './lib.js'
	import { formatCurrency } from './utils.js'
	import { fromInput, fromSelect, toSelect, toEl } from './elements.js'
	export async function handleInput( e ) { ... }

	//	init.js
	import { fromInput, toSelect } from './elements.js'
	import { generateOptions } from './utils.js'
	import currencies from './currencies.js'
	import { handleInput } from './handlers.js'
	export function init() { ... }

	//	money.js
	import { init } from './init.js'
	const app = document.querySelector( '.app' )
	app.eventlistener( 'mouseenter', init, { once: true } )

;```



## dad jokes modules refactor

```js

	//	data/buttonText.js
	const buttonText = { ... }
	export default buttonText

	//	lib/utils.js
	export function randomItemFromArray( arr, not ) { ... }

	//	lib/handlers.js
	import { fetchJoke } from 'lib/index.js'
	import { loader, jokeHolder, jokeButtonSpan } from './lib/elements.js'
	import { randomItemFromArray } from './lib/utils.js'
	import buttonText from '../data/buttonText.js'
	export async function handleClick( loader ) { ... }

	//	lib/index.js
	export async function fetchJoke( loader ) { ... }

	//	lib/elements.js
	export const jokeButton = '...'
	export const jokeButtonSpan = '...'
	export const jokeHolder = '...'
	export const loader = '...'

	//	jokes.js
	import { handleClick } from './lib/handlers.js'
	import { jokeButton } from '.lib/elements.js'
	//	few ways to modify the click if elements not seperated
	//	& we need to pass in loader to handle click
	jokeButton.addEventListener( 'click', () => handleClick( loader ) )
	jokeButton.addEventListener( 'click', handleClick.bind( null, loader ) )
	jokeButton.addEventListener( 'click', function() {
		handleClick( loader )
	} )
	//	since elements are seperated out now we can just
	jokeButton.addEventListener( 'click', handleClick )

;```



## bundling & building with parcel

```js

	npm init -y
	npm install parcel-bundler -D

	"scripts": {
		"serve": "parcel index.html",
		"build": "parcel build index.html"
	},
	"browserslist": [
		"last 1 chrome versions"
	]

;```



## using open source npm packages

```js

	import wait from 'waait'
	async function go() {
		console.log( 'going' )
		await wait( 200 )
		console.log( 'done' )
	}
	go()



	import faker from 'faker'
	console.log( `Hello ${ faker.name.firstName() }` )
	import { name } from 'faker'
	const fakeNames = Array.from( { length: 10 }, name.firstName )



	import { formatDistance, format } from 'date-fns'
	const diff = formatDistance(
		new Data(),
		new Data( 2020, 3, 4, 10, 32, 0 ),
		{ addSuffix: true }
	)
	console.log( diff )
	const data = new Date()
	const formatted = format( date, `LLLL 'the' do, y` )
	console.log( formatted )



	import axios from 'axios'
	async function getJoke() {
		const res = await axios.get( 'https://icanhazdadjoke.com', {
			headers: {
				Accept: 'application/json'
			}
		} )
		console.log( res )
	}



	import _ from 'lodash'
	const person1 = { name: 'kelvin' }
	const person2 = { name: 'kelvin' }
	console.log( person1 === person2 ) // false
	console.log( _.isEqual( person1, person2 ) ) // true



	import to from 'await-to-js'
	function checkIfNameIsCool( name ) {
		return new Promise( function( res, err ) {
			if ( name === 'kelvin' ) {
				return res( 'cool name' )
			}
			err( new Error( 'bad name' ) )
		})
	}
	async function checkName() {
		const [ err, successValue ] = await to( checkIfNameIsCool( 'snickers' ) )
		if ( err ) {
			// do something with error
		} else {
			// do something with successValue
		}
	}

;```



## security

1. api keys - try not to be in client, but sometimes okay as there is rate limit
2. prices - always double check in server before processing, price can be changed by user in client
3. sanitize html input - users can dump in code to be run to hack site ( xxs )

```js

	import { sanitize } from 'dompurify'
	const clean = sanitize( input.value ) // remove js by default
	const clean = sanitize( input.value, {
		FORBID_ATTR: [ 'width', 'height', 'style' ],
		FORBID_TAGS: [ 'style' ]
	} ) // add options to remove styles too
	output.innerHTML = clean.replace( /\n/g, '<br>' )

;```

4. use https apis as they are encrypted



## web speech colours game

```js

	const colors = {
		black: '#000000',
		...
	}

	const colorsByLength = Object.keys( colors ).sort( ( a, b ) => {
		a.length - b.length
	} )

	function isDark( colorName ) {
		const hex = colors[ colorName ].substring( 1, 7 )
		const r = parseInt( hex.substring( 0, 2 ), 16 )
		const g = parseInt( hex.substring( 2, 4 ), 16 )
		const b = parseInt( hex.substring( 4, 6 ), 16 )
		return r * .299 + g * .587 + b * .114 < 120
	}

	function displayColors( colors ) {
		return colors.map( color => {
			return `<span class="color ${ color } ${ isDark( color ) ? 'dark' : '' }"
					style="background: ${ color };">
						${ color }
					</span>`
		} ).join( '' )
	}

	function isValidColor( word ) {
		//	double bang makes it true or false
		return !!colors[ word ]
	}

	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	function start() {
		if ( !('SpeechRecognition' in window ) ) {
			console.log( 'sorry your browser does not support speech recognition' )
			return
		}

		const recognition = new SpeechRecognition()
		recognition.continuous = true
		recognition.interimResults = true
		recognition.onresult = handleResult
		recognition.start()
	}

	function handleResult( { results } ) {
		const words = results[ results.length - 1 ][ 0 ].transcript
		let color = words.toLowerCase()
		color = color.replace( /\s/g, '' ) // remove spaces
		console.log( color )
		if ( !isValidColor( color ) ) return
		const colorSpan = document.querySelector( `.${ color }` )
		colorSpan.classList.add( 'got' )
		document.body.style.backgroundColor = color
	}


	start()
	displayColors( colorsByLength )

;```



## audio visualization

```js

	import { hslToRgb } from './utils'

	const WIDTH   = 1500
	const HEIGHT  = 1500
	const canvas  = document.querySelector( 'canvas' )
	const ctx     = canvas.getContext( '2d' )

	canvas.width  = WIDTH
	canvas.height = HEIGHT
	let analyser
	let bufferLength

	function handleError( err ) {
		console.log( 'you must give access to your mic to proceed' )
	}

	async function getAudio() {
		const stream = await navigator.mediaDevices
						.getUserMedia( { audio: true } )
						.catch( handleError )
		const audioCtx = new AudioContext()
		analyser = audioCtx.createAnalyser()
		const source = audioCtx.createMediaStreamSource( stream )
		source.connect( analyser )

		//	how much data to collect
		analyser.fftSize = 2 ** 10 // 1024

		//	pull data off audio
		//	8 bits or 1 byte restricted data with Unit8Array
		bufferLength = analyser.frequencyBinCount
		const timeData = new Uint8Array( bufferLength )
		const frequencyData = new Uint8Array( bufferLength )
		drawTimeData( timeData )
		drawFrequency( frequencyData )
	}

	function drawTimeData( timeData ) {
		//	inject time data into timeData array
		analyser.getByteTimeDomainData( timeData )

		//	draw
		ctx.clearRect( 0, 0, WIDTH, HEIGHT )
		ctx.lineWidth = 10
		ctx.strokeStyle = '#ffc600'
		ctx.beginPath()
		const sliceWidth = WIDTH / bufferLength
		let x = 0
		timeData.forEach( ( data, i ) => {
			//	128 is when you say nothing at all
			const v = data / 128
			const y = ( v * HEIGHT ) / 2
			if ( i === 0 ) {
				ctx.moveTo( x, y )
			} else {
				ctx.lineTo( x, y )
			}
			x += sliceWidth
		} )
		ctx.stroke()

		//	call itself as soon as possible
		requestAnimationFrame( () => drawTimeData( timeData ) )
	}

	function drawFrequency( frequencyData ) {
		//	inject frequency data into timeData array
		analyser.getByteFrequencyData( frequencyData )

		//	draw
		// higher end cannot be reached so we cut it off by * 2.5
		const barWidth = ( WIDTH / bufferLength ) * 2.5
		const x = 0
		frequencyData.forEach( amount => {
			//	0 to 255
			const percent = amount / 255
			const [ h, s, l ] = [ 360 / ( percent * 360 ) - .5, .8, .5 ]
			const barHeight = ( HEIGHT * percent ) / 2
			const [ r, g, b ] = hslToRgb( h, s, l )
			ctx.fillStyle = `rgb( ${ r }, ${ g }, ${ b } )`
			ctx.fillRect(
				x,
				HEIGHT - barHeight,
				barWidth,
				barHeight
			)
			x += barWidth + 1
		} )

		//	call itself as soon as possible
		requestAnimationFrame( () => drawFrequency( frequencyData ) )
	}

	getAudio()

;```



---
