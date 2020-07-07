


<https://javascript30.com/>



# javascript drum kit

```js

function playSound( e ) {
	const audio = document.querySelector( `audio[data-key="${ e.keyCode }"]` )
	const key = document.querySelector( `.key[data-key="${ e.keyCode }"]` )
	if ( !audio ) return
	audio.currentTime = 0
	audio.play()
	key.classList.add( 'playing' )
}

window.addEventListener( 'keydown', playSound )

function removeTransition( e ) {
	if ( e.propertyName !== 'transform' ) return
	this.classList.remove( 'playing' )
}

const keys = document.querySelectorAll( '.key' )
keys.forEach( key => key.addEventListener( 'transitionend', removeTransition ) )

;```



# css + js clock

```css

.hand {
	top: 50%;
	width: 50%;
	height: 6px;
	background: black;
	position: absolute;
	transition: all .05s;
	transform-origin: 100%;
	transform: rotate( 90deg );
	transition-timing-function: cubic-bezier( .1, 2.7, .58, 1 );
}

;```

```js

const secondHand = document.querySelector( '.second-hand' )
const minHand = document.querySelector( '.min-hand' )
const hourHand = document.querySelector( '.hour-hand' )

function setDate() {
	const now = new Date()
	const seconds = now.getSeconds()
	const secondsDegrees = ( seconds / 60 ) * 360 + 90 // 90 to offset the initial css 90
	secondHand.style.transform = `rotate( ${ secondsDegrees }deg )`

	const min = now.getMintes()
	const minDegrees = ( min / 60 ) * 360 + 90
	minHand.style.transform = `rotate( ${ minDegrees }deg )`

	const hour = now.getHours()
	const hourDegrees = ( hour / 24 ) * 360 + 90
	hourHand.style.transform = `rotate( ${ hourDegrees }deg )`
}

setInterval( setDate, 1000 )

//	when it hits 12, it does a full rotate backwards to hit 0
//	to fix let the degrees keep adding instead
//	or remove transition right before it hits 0

;```



# playing with css variables & js

```css

:root {
	--base: #ffc600;
	--spacing: 10px;
	--blur: 10px;
}

img {
	padding: var( --spacing );
	background: var( --base );
	filter: blur( var( --blur ) );
}

;```

```js

const inputs = document.querySelectorAll( '.controls input' )

function handleUpdate() {
	//	data-sizing="px" in input slider
	const suffix = this.dataset.sizing || ''
	//	closer scope --var overrides the root --var
	document.documentElement.style.setProperty( `--${ this.name }`, this.value + suffix )
}

inputs.forEach( input => input.addEventListener( 'change', handleUpdate ) )
inputs.forEach( input => input.addEventListener( 'mousemove', handleUpdate ) )

;```



# array cardio day 1

```js

const inventors = [
	{ first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
	...
]

//	filter
//	get list of inventors born in the 1500s
const fifteen = inventors.filter( inventor => inventor.year >= 1500 && inventor.year < 1600  )

//	map
//	array of first & last name of inventors
const fullNames = inventors.map( inventor => `${ inventor.first } ${ inventor.last }` )

//	sort
//	inventors by birthdate, oldest to youngest
const ordered = inventors.sort( ( a, b ) => a.year > b.year ? 1 : -1 )

//	reduce
//	how many years did all the inventors live
const totalYears = inventors.reduce( ( total, inventor ) => {
	return total + ( inventor.passed - inventor.year )
}, 0 )

//	sort inventors by years lived
const oldest = inventors.sort( ( a, b ) => {
	const lastGuy = a.passed - a.year
	const nextGuy = b.passed - b.year
	return lastGuy > nextGuy ? 1 : -1
})



//	create list of boulevards in paris that contain 'de' in name
//	https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const category = document.querySelector( '.mw-category' )
//	nodelist to array
const links = Array.from( category.querySelectorAll( 'a' ) )
//	alt way to convert using spread
const links = [ ...category.querySelectorAll( 'a' ) ]
const de = links
			.map( link => link.textContent )
			.filter( streetName => streetName.includes( 'de' ) )



const people = [
	'Beck, Glenn',
	...
]

//	sort people by last name
const alpha = people.sort( ( a, b ) => {
	const [ aLast, aFirst ] = a.split( ', ' )
	const [ bLast, bFirst ] = b.split( ', ' )
	return aLast > bLast ? 1 : -1
} )



const data = [
	'car',
	...
]

//	sum up instances of all
const transportation = data.reduce( ( obj, item ) => {
	if ( !obj[ item ] ) obj[ item ] = 0
	obj[ item ]++
	return obj
}, {} )

;```



# flex panels image gallery

```js

const panels = document.querySelectorAll( '.panel' )

function toggleOpen() {
	this.classList.toggle( 'open' )
}

function toggleActive( e ) {
	if ( e.propertyName.includes( 'flex' ) ) {
		this.classList.toggle( 'open-active' )
	}
}

panels.forEach( panel => panel.addEventListener( 'click', toggleOpen ) )
panels.forEach( panel => panel.addEventListener( 'transitionend', toggleActive ) )

;```



# ajax type ahead

```js

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []

fetch( endpoint )
	.then( res => res.json() )
	.then( data => cities.push( ...data ) )

function findMatches( wordToMatch, cities ) {
	return cities.filter( place => {
		//	g = global, i = insensitive to caps
		const regex = new RegExp( wordToMatch, 'gi' )
		return place.city.match( regex ) || place.state.match( regex )
	} )
}

function numberWithCommas( num ) {
	return num.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
}

function displayMatches() {
	const matchArray = findMatches( this.value, cities )
	const html = matchArray.map( place => {
		const regex = new RegExp( this.value, 'gi' )
		//	highlight the searched term
		const cityName = place.city.replace( regex, `<span class="hl">${ this.value }</span>` )
		const stateName = place.state.replace( regex, `<span class="hl">${ this.value }</span>` )
		return `
			<li>
				<span class="name">${ cityName }, ${ stateName }</span>
				<span class="population">${ numberWithCommas( place.population ) }</span>
			</li>
		`
	} ).join( '' )
	suggestions.innerHTML = html
}

const searchInput = document.querySelector( '.search' )
const suggestions = document.querySelector( '.suggestions' )

searchInput.addEventListener( 'change', displayMatches )
searchInput.addEventListener( 'keyup', displayMatches )

;```



# array cardio day 2

```js

const people = [
	{ name: 'Wes', year: 1988 },
	...
]

const comments = [
	{ text: 'Love this!', id: 523423 },
	...
]



//	some
const isAdult = people.some( person => {
	const currentYear = ( new Date() ).getFullYear()
	return currentYear - person.year >= 19
} )
//	if any 1 is true, isAdult = true



//	every
const isAdult = people.every( person => {
	const currentYear = ( new Date() ).getFullYear()
	return currentYear - person.year >= 19
} )
//	if all is true, isAdult = true



//	find
const comment = comments.find( comment => comment.id === 523423 )
//	finds first 1 that returns true
//	comment = the actual comment item



//	findIndex
const index = comments.findIndex( comment => comment.id === 523423 )
//	returns index of item in array

comments.splice( index, 1 )
//	deletes off the comment in comments array

const newComments = [
	...comments.slice( 0, index ),
	...comments.slice( index + 1 )
]
//	build new array of comments without the comment that was found

;```



# fun with html5 canvas

```js

const canvas = document.querySelector( '#draw' )
const ctx = canvas.getContext( '2d' )
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.strokeStyle = '#BADA55'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = 100

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let dir = true

function draw( e ) {
	if ( !isDrawing ) return
	ctx.strokeStyle = `hsl( ${ hue }, 100%, 50% )`
	ctx.beginPath()
	ctx.moveTo( lastX, lastY )
	ctx.lineTo( e.offsetX, e.offsetY )
	ctx.stroke()
	hue++
	if ( hue >= 360 ) hue = 0
	if ( ctx.lineWidth >= 100 || ctx.lineWidth <= 1 ) {
		dir = !dir
	}
	dir ? ctx.lineWidth++ : ctx.lineWidth--
	lastX = e.offsetX
	lastY = e.offsetY
}

canvas.addEventListener( 'mousemove', draw )
canvas.addEventListener( 'mousedown', e => {
	isDrawing = true
	lastX = e.offsetX
	lastY = e.offsetY
} )
canvas.addEventListener( 'mouseup', () => isDrawing = false )
canvas.addEventListener( 'mouseout', () => isDrawing = false )

;```



# 14 must know dev tools tricks

```js

//	1
//	elements panel, click element you want to inspect
//	right click > break on > attribute modifications
//	now when it changes, code will pause & show where it was modified

//	2 - interpolate strings
console.log( `hello i am ${ myVar }` )

//	3 - styled logs
console.log( '%c hello', 'font-size: 20px; background: red;')

//	4 - warning
console.warn( 'Oh no!' )

//	5 - error
console.error( 'Shit!')

//	6 - info
console.info( 'Some stuff' )

//	7 - testing, will only show if it's wrong
console.assert( 1 === 2 )

//	8 - clear console
console.clear()

//	9 - view dom elements
console.log( p ) // actual element
console.dir( p ) // property / methods on element

//	10/11 - grouping
dogs.forEach( dog => {
	console.groupCollapsed( `${ dog.name }` ) // or just console.group
	console.log( `this is ${ dog.name }` )
	console.log( `he is ${ dog.age } years old` )
	console.groupEnd( `${ dog.name }` )
} )
console.group()

//	12 - counting, shows how many times it was called
console.count( myVar )

//	13 - timing, shows time taken
console.time( 'fetching data' )
// do something
console.timeEnd( 'fetching data' )

//	14 - table
console.table( myArr )

;```



# hold shift to check multiple checkboxes

```js

const checkboxes = document.querySelectorAll( '.inbox input[type="checkboxes"]' )

let lastChecked

function handleCheck( e ) {
	let inBetween = false
	//	if shift key is down & checking checkbox
	if ( e.shiftKey && this.checked ) {
		checkboxes.forEach( checkbox => {
			//	if first or last, top bottom or bottom top
			if ( checkbox === this || checkbox === lastChecked ) {
				inbetween = !inbetween
			}
			if ( inBetween ) {
				checkbox.checked = true
			}
		} )
	}
	lastChecked = this
}

checkboxes.forEach( checkbox => checkbox.addEventListener( 'click', handleCheck ) )

;```



# custom html5 video player

```html

<div class="player">
	<video class="player__video viewer" src="652333414.mp4"></video>

	<div class="player__controls">
		<div class="progress">
			<div class="progress__filled"></div>
		</div>
		<button class="player__button toggle" title="Toggle Play">►</button>
		<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
		<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
		<button data-skip="-10" class="player__button">« 10s</button>
		<button data-skip="25" class="player__button">25s »</button>
	</div>
</div>

;```

```css

html {
	box-sizing: border-box;
}

*, *:before, *:after {
	box-sizing: inherit;
}

body {
	margin: 0;
	padding: 0;
	display: flex;
	background: #7A419B;
	min-height: 100vh;
	background: linear-gradient(135deg, #7c1599 0%,#921099 48%,#7e4ae8 100%);
	background-size: cover;
	align-items: center;
	justify-content: center;
}

.player {
	max-width: 750px;
	border: 5px solid rgba(0,0,0,0.2);
	box-shadow: 0 0 20px rgba(0,0,0,0.2);
	position: relative;
	font-size: 0;
	overflow: hidden;
}

/* This css is only applied when fullscreen is active. */
.player:fullscreen {
	max-width: none;
	width: 100%;
}

.player:-webkit-full-screen {
	max-width: none;
	width: 100%;
}

.player__video {
	width: 100%;
}

.player__button {
	background: none;
	border: 0;
	line-height: 1;
	color: white;
	text-align: center;
	outline: 0;
	padding: 0;
	cursor: pointer;
	max-width: 50px;
}

.player__button:focus {
	border-color: #ffc600;
}

.player__slider {
	width: 10px;
	height: 30px;
}

.player__controls {
	display: flex;
	position: absolute;
	bottom: 0;
	width: 100%;
	transform: translateY(100%) translateY(-5px);
	transition: all .3s;
	flex-wrap: wrap;
	background: rgba(0,0,0,0.1);
}

.player:hover .player__controls {
	transform: translateY(0);
}

.player:hover .progress {
	height: 15px;
}

.player__controls > * {
	flex: 1;
}

.progress {
	flex: 10;
	position: relative;
	display: flex;
	flex-basis: 100%;
	height: 5px;
	transition: height 0.3s;
	background: rgba(0,0,0,0.5);
	cursor: ew-resize;
}

.progress__filled {
	width: 50%;
	background: #ffc600;
	flex: 0;
	flex-basis: 50%;
}

/* unholy css to style input type="range" */

input[type=range] {
	-webkit-appearance: none;
	background: transparent;
	width: 100%;
	margin: 0 5px;
}

input[type=range]:focus {
	outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
	background: rgba(255,255,255,0.8);
	border-radius: 1.3px;
	border: 0.2px solid rgba(1, 1, 1, 0);
}

input[type=range]::-webkit-slider-thumb {
	height: 15px;
	width: 15px;
	border-radius: 50px;
	background: #ffc600;
	cursor: pointer;
	-webkit-appearance: none;
	margin-top: -3.5px;
	box-shadow:0 0 2px rgba(0,0,0,0.2);
}

input[type=range]:focus::-webkit-slider-runnable-track {
	background: #bada55;
}

input[type=range]::-moz-range-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
	background: #ffffff;
	border-radius: 1.3px;
	border: 0.2px solid rgba(1, 1, 1, 0);
}

input[type=range]::-moz-range-thumb {
	box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
	height: 15px;
	width: 15px;
	border-radius: 50px;
	background: #ffc600;
	cursor: pointer;
}

;```

```js

const player = document.querySelector( '.player' )
const video = player.querySelector( '.viewer' )
const progress = player.querySelector( '.progress' )
const progressBar = player.querySelector( '.progress__filled' )
const toggle = player.querySelector( '.toggle' )
const skipButtons = player.querySelectorAll( '[data-skip]' )
const ranges = player.querySelectorAll( '.player__slider' )

function togglePlay() {
	const method = video.paused ? 'play' : 'pause'
	video[ method ]()
}

function updateButton() {
	toggle.textContent = this.paused ? '►' : '❚ ❚'
}

function skip() {
	video.currentTime += parseFloat( this.dataset.skip )
}

function handleRangeUpdate() {
	video[ this.name ] = this.value
}

function handleProgress() {
	const percent = video.currentTime / video.duration * 100
	progressBar.style.flexBasis = `${ percent }%`
}

function scrub( e ) {
	const scrubTime = e.offsetX / progress.offsetWidth * video.duration
	video.currentTime = scrubTime
}

video.addEventListener( 'click', togglePlay )
video.addEventListener( 'play', updateButton )
video.addEventListener( 'pause', updateButton )
video.addEventListener( 'timeupdate', handleProgress )

toggle.addEventListener( 'click', togglePlay )
skipButtons.forEach( button => button.addEventListener( 'click', skip ) )
ranges.forEach( range => range.addEventListener( 'change', handleRangeUpdate ) )
ranges.forEach( range => range.addEventListener( 'mousemove', handleRangeUpdate ) )

let mousedown = false
progress.addEventListener( 'click', scrub )
progress.addEventListener( 'mousedown', () => mousedown = true )
progress.addEventListener( 'mouseup', () => mousedown = false )
progress.addEventListener( 'mousemove', e => mousedown && scrub( e ) )

;```



# key sequence detection ( konami code )

```html

<script type="text/javascript" src="http://www.cornify.com/js/cornify.js"></script>

;```

```js

const pressed = []
const code = 'kelvinzhao'

window.addEventListener( 'keyup', e => {
	pressed.push( e.key )
	pressed.splice( -code.length - 1, pressed.length - code.length )
	if ( pressed.join( '' ).includes( code ) ) {
		console.log( 'code entered!' )
		cornify_add()
	}
} )

;```



# slide in on scroll

```js

const sliderImages = document.querySelectorAll( '.slide-in' )

function debounce( fn, delay, immediate ) {
	let timer
	return ( ...args ) => {
		const myFn = fn.bind( this, ...args )
		clearTimeout( timer )
		if ( immediate && !timer ) myFn()
		const callFn = immediate ? () => { timer = null } : myFn
		timer = setTimeout( callFn, delay )
	}
}

function checkSlide( e ) {
	sliderImages.forEach( slideImage => {
		//	halfway of image
		const slideInAt = ( window.scrollY + window.innerHeight ) - sliderImage.height / 2
		const imageBottom = sliderImage.offsetTop + sliderImage.height
		const isHalfShown = slideInAt > sliderImage.offsetTop
		const isNotScrolledPast = window.scrollY < imageBottom
		if ( isHalfShown && isNotScrolledPast ) {
			sliderImage.classList.add( 'active' )
		} else {
			sliderImage.classList.remove( 'active' )
		}
	} )
}

window.addEventListener( 'scroll', debounce( checkSlide, 100 ) )

;```



# object & arrays - reference vs copy

```js

let age = 100
let age2 = age
console.log( age, age2 ) // 100, 100
age = 200
console.log( age, age2 ) // 200, 100

const players = [ 'kelvin', 'alan', 'irene' ]
const team = players
console.log( players, team ) // [ 'kelvin', 'alan', 'irene' ], [ 'kelvin', 'alan', 'irene' ]
team[ 3 ] = 'xh'
console.log( players, team ) // [ 'kelvin', 'alan', 'xh' ], [ 'kelvin', 'alan', 'xh' ]
//	arrays => reference, not copy

//	ways to copy instead of reference
const team2 = players.slice()
const team3 = [].concat( players )
const team4 = [ ...players ]
const team5 = Array.from( players )


const person = {
	name: 'kelvin',
	age: 18
}
//	objects => reference, not copy

//	ways to copy instead of reference
const cap = Object.assign( {}, person ) // copy
const cap2 = Object.assign( {}, person, { age: 38 } ) // copy + update stuff
//	but it's a shallow copy, 1 level, deeper nested ones are still referenced, not copied
const cap3 = JSON.parse( JSON.stringify( person ) )	// cheap way of deep clone, but not recommended
//	best, use lodash/underscore to do deep clone if needed

;```



# localstorage & event delegation

```js

const addItems = document.querySelector( '.add-items' )
const itemsList = document.querySelector( '.plates' )
const items = JSON.parse( localStorage.getItem( 'items' ) ) || []

function addItem( e ) {
	e.preventDefault()
	const text = ( this.querySelector( '[name=item]' ) ).value
	const item = {
		text,
		done: false
	}
	items.push( item )
	populateList( items, itemsList )
	localStorage.setItem( 'items', JSON.stringify( items ) )
	this.reset() // all forms have a default reset function
}

function populateList( plates = [], platesList ) {
	platesList.innerHTML = plates.map( ( plate, i ) => {
		return `
			<li>
				<input
					type="checkbox"
					data-index=${ i }
					id="item${ i }"
					${ plate.done ? 'checked' : '' } />
				<label for="item${ i }">${ plate.text }</label>
			</li>
		`
	} ).join( '' ) // always join to make big string instead of array which map gives
}

//	can't listen to checkboxes itself as they are refreshed/recreated on addItems, etc
//	so they don't exists when you try to attach eventlisteners
function toggleDone( e ) {
	if ( !e.target.matches( 'input' ) ) return; // skip this unless it's an input
	const el = e.target
	const index = el.dataset.index
	items[ index ].done = !items[ index ].done
	localStorage.setItem( 'items', JSON.stringify( items ) )
	populateList( items, itemsList )
}

addItems.addEventListener( 'submit', addItem )
itemsList.addEventListener( 'click', toggleDone )

populateList( items, itemsList )

;```



# css text shadow mouse move effect

```js

const hero = document.querySelector( '.hero' )
const text = hero.querySelector( 'h1' )
const walk = 100

function shadow( e ) {
	// const width = hero.offsetWidth
	// const height = hero.offsetHeight
	// const x = e.offsetX
	// const y = e.offsetY
	const { offsetWidth: width, offsetHeight: height } = hero
	let { offsetX: x, offsetY: y } = e

	if ( this !== e.target ) {
		x = x + e.target.offsetLeft
		y = y + e.target.offsetTop
	}

	//	if walk 100, xWalk - 50 to 50
	const xWalk = ( x / width * walk ) - ( walk / 2 )
	const yWalk = ( y / height * walk ) - ( walk / 2 )

	text.style.textShadow = `${ xWalk }px ${ yWalk }px 0 red`
}

hero.addEventListener( 'mousemove', shadow )

;```



# sorting band names without articles

```js

const bands = [ 'The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog' ]

function strip( bandName ) {
	return bandName.replace( /^(a |the |an )/i, '' ).trim()
}

const sortedBands = bands.sort( ( a, b ) => strip( a ) > strip( b ) ? 1 : -1 )

document.querySelector( '#bands' ).innerHTML = sortedBands.map( band => `<li>${ band }</li>` ).join( '' )

;```



# tally string times with reduce

```js

const timeNodes = [ ...document.querySelectorAll( '[data-time]' ) ]
const seconds = timeNodes
					.map( node => node.dataset.time )
					.map( timeCode => {
						const [ mins, secs ] = timeCode.split( ':' ).map( parseFloat ) // strings to num
						return ( min * 60 ) + secs
					} )
					.reduce( ( total, vidSeconds ) => total + vidSeconds )
let secondsLeft = seconds
const hours = Math.floor( secondsLeft / 3600 )
secondsLeft = secondsLeft % 3600
const mins = Math.floor( secondsLeft / 60 )
secondsLeft = secondsLeft % 60

console.log( hours, mins, secondsLeft )

;```



# unreal webcam fun

```js

const video = document.querySelector( '.player' )
const canvas = document.querySelector( '.photo' )
const ctx = canvas.getContext( '2d' )
const strip = document.querySelector( '.strip' )
const snap = document.querySelector( '.snap' )

function getVideo() {
	navigator.mediaDevices.getUserMedia( { video: true, audio: false } )
		.then( localMediaStream => {
			video.src = window.URL.createObjectURL( localMediaStream )
			video.play()
		} )
		.catch( err => {
			console.error( err )
		} )
}

function paintToCanvas() {
	const width = video.videoWidth
	const height = video.videoHeight
	canvas.width = width
	canvas.height = height

	return setInterval( () => {
		ctx.drawImage( video, 0, 0, width, height )
		const pixels = ctx.getImageData( 0, 0, width, height )

		// pixels = redEffect( pixels )
		// pixels = rgbSplit( pixels )
		// ctx.globalAlpha = .1
		pixels = greenScreen( pixels )

		ctx.putImageData( pixels, 0, 0 )
	}, 16 )
}

function takePhoto() {
	snap.currentTime = 0
	snap.play()

	const data = canvas.toDataURL( 'image/jpeg' )
	const link = document.createElement( 'a' )
	link.href = data
	link.setAttribute( 'download', 'handsome' )
	link.innerHTML = `<img src="${ data }" alt="Handsome Man" />`
	strip.insertBefore( link, strip.firstChild )
}

function redEffect( pixels ) {
	for ( let i = 0; i < pixels.data.length; i += 4 ) {
		pixels.data[ i + 0 ] += 100 // r
		pixels.data[ i + 1 ] -= 50 // g
		pixels.data[ i + 2 ] *= .5 // b
		// pixels[ i + 3 ] = alpha
	}
	return pixels
}

function rgbSplit( pixels ) {
	for ( let i = 0; i < pixels.data.length; i += 4 ) {
		pixels.data[ i - 150 ] = pixels.data[ i + 0 ] // r
		pixels.data[ i + 100 ] = pixels.data[ i + 1 ] // g
		pixels.data[ i - 150 ] = pixels.data[ i + 2 ] // b
		// pixels[ i + 3 ] = alpha
	}
	return pixels
}

function greenScreen( pixels ) {
	const levels = {}

	document.querySelectorAll( '.rgb input' ).forEach( input => {
		levels[ input.name ] = input.value
	} )

	for ( i = 0; i < pixels.data.length; i += 4 ) {
		let red   = pixels.data[ i + 0 ]
		let green = pixels.data[ i + 1 ]
		let blue  = pixels.data[ i + 2 ]
		let alpha = pixels.data[ i + 3 ]

		if ( red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin
			&& red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax ) {
			pixels.data[ i + 3 ] = 0
		}
	}
	return pixels
}

getVideo()

video.addEventListener( 'canplay', paintToCanvas )

;```



# native speech recognition

```js

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.interimResults = true

let p = document.createElement( 'p' )
const words = document.querySelector( '.words' )
words.appendChild( p )

recognition.addEventListener( 'result', e => {
	const transcript = Array.from( e.results )
							.map( result => result[ 0 ] )
							.map( result => result.transcript )
							.join( '' )
	p.textContent = transcript
	if ( e.results[ 0 ].isFinal ) {
		p = document.createElement( 'p' )
		words.appendChild( p )
	}

	if ( transcript.includes( 'get the weather' ) ) {
		console.log( 'getting the weather...' )
	}
} )

recognition.addEventListener( 'end', recognition.start )
recognition.start()

;```



# geolocation based speedometer & compass

```js

const arrow = document.querySelector( '.arrow' )
const speed = document.querySelector( '.speed-value' )

navigator.geolocation.watchPosition( data => {
	speed.textContent = data.coords.speed
	arrow.style.transform = `rotate( ${ data.coords.heading } )`
}, err => {
	console.log( err )
} )

;```



# follow along links

```js

const triggers = document.querySelectorAll( 'a' )
const highlight = document.createElement( 'span' )
highlight.classList.add( 'highlight' )
document.body.append( highlight )

function highlightLink() {
	const linkCoords = this.getBoundingClientRect()

	const coords = {
		width: linkCoords.width,
		height: linkCoords.height,
		top: linkCoords.top + window.scrollY,
		left: linkCoords.left + window.scrollX
	}

	highlight.style.width = `${ coords.width }px`
	highlight.style.height = `${ coords.height }px`
	highlight.style.transform = `translate( ${ coords.left }px, ${ coords.top }px )`
}

triggers.forEach( a => a.addEventListener( 'mouseenter', highlightLink ) )

;```



# speech synthesis

```js



;```



# sticky nav

```js



;```



# event capture, propagation, bubbling & once

```js



;```



# stripe follow along dropdown

```js



;```



# click & drag to scroll

```js



;```



# video speed controller ui

```js



;```



# countdown clock

```js



;```



# whack a mole game

```js



;```
