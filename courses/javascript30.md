


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



;```



# playing with css variables & js

```js



;```



# array cardio day 1

```js



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
