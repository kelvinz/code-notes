


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



;```



# ajax type ahead

```js



;```



# array cardio day 2

```js



;```



# fun with html5 canvas

```js



;```



# 14 must know dev tools tricks

```js



;```



# hold shift to check multiple checkboxes

```js



;```



# custom html5 video player

```js



;```



# key sequence detection ( konami code )

```js



;```



# slide in on scroll

```js



;```



# object & arrays - reference vs copy

```js



;```



# localstorage & event delegation

```js



;```



# css text shadow mouse move effect

```js



;```



# sorting band names without articles

```js



;```



# tally string times with reduce

```js



;```



# unreal webcam fun

```js



;```



# native speech recognition

```js



;```



# geolocation based speedometer & compass

```js



;```



# follow along links

```js



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
