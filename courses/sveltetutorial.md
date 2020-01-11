


<https://svelte.dev/tutorial/>



# introduction



## basics

similar to javascript frameworks like react, vue
except it converts the app at build time
while other frameworks runs/interprets commands at runtime
thus able to ship components as standalone packages that work anywhere
without a framework dependency



## adding data

```html

	<script>
		let name = 'world'
	</script>

	<h1>Hello { name }!</h1>
	<h1>Hello { name.toUpperCase() }!</h1>

;```



## dynamic attributes

```html

	<script>
		let src = 'tutorial/image.gif',
			name = 'A man'
	</script>

	<img src={ src } alt="{ name } dances.">

	<!-- shorthand -->
	<!-- since name & value are the same ie. src={ src } -->
	<img { src } alt="{ name } dances.">

;```



## styling

scoped to component
won't affect others

```html

	<style>
		p {
			color: purple;
		}
	</style>

	<p>This is a paragraph.</p>

;```



## nested components

```html

	<!-- App.svelte -->
	<script>
		import Nested from './Nested.svelte'
	</script>

	<style>
		p {
			color: purple;
		}
	</style>

	<!-- only this p is purple, the nested one is not affected -->
	<p>This is a paragraph.</p>
	<Nested />

	<!-- Nested.svelte -->
	<p>This is another paragraph.</p>

;```



## html tags

svelte doesn't perform any sanitization of expression inside @html
remember to do it yourself or only use for trusted sources

```html

	<script>
		let string = `this string contains some <strong>html!!!</strong>`
	</script>

	<p>{ @html string }</p>

;```



## making an app

build tools to integrate svelte

**rollup**
<https://github.com/rollup/rollup-plugin-svelte>

**webpack**
<https://github.com/sveltejs/svelte-loader>

**parcel**
<https://github.com/DeMoorJasper/parcel-plugin-svelte>



configure text editor to read svelte files

**sublime**
open any .svelte file
view > syntax > open all with current extension as... > html

**vs code**
in settings.json
"files.associations": {
	"*.svelte": "html"
}



the compiler turns each component into regular js
import & instantiate with new

```js

	import App from './App.svelte'

	const app = new App({
		target: document.body,
		props: {
			answer: 42
		}
	})

;```



---



# reactivity



## assignments

```html

	<script>
		let count = 0

		function handleClick() {
			count += 1
		}
	</script>

	<button on:click{ handleClick }>
		Clicked { count } { count === 1 ? 'time' : 'times' }
	</button>

;```



## declarations

reactive vars that will change depending on others

```html

	<script>
		let count = 0
		$: doubled = count * 2

		function handleClick() {
			count += 1
		}
	</script>

	<button on:click{ handleClick }>
		Clicked { count } { count === 1 ? 'time' : 'times' }
	</button>

	<p>{ count } doubled is { doubled }</p>

;```



## statements

not limited to declaring reactive values
can also run arbitary statements reactively

```js

	$: console.log( `the count is ${ count }` )

	$: {
		console.log( `the count is ${ count }` )
		alert( `i said the count is ${ count }` )
	}

	$: if ( count >= 10 ) {
		alert( `count is dangerously high!` )
		count = 9
	}

;```



## updating arrays & objects

svelte's reactivity is triggered by assignments
push & splice, etc won't cause an update
here're some solutions

```js

	function addNumber() {
		numbers.push( numbers.length + 1 )
		numbers = numbers
	}

	function addNumber() {
		numbers = [...numbers, numbers.length + 1 ]
	}

	function addNumber() {
		numbers[ numbers.length ] = numbers.length + 1
	}

;```

a simple rule of thumb:
the name of the updated var must appear on the left hand side of the assignment

```js

	const foo = obj.foo
	foo.bar = 'baz'
	// obj.foo.bar won't be updated unless you follow up with
	obj = obj

;```



---



# props



## declaring props

it is 'getting' the prop through an 'export' statement
as if export means import prop
weird, but essentially an hack svelte created

```html

	<!-- App.svelte -->
	<script>
		import Nested from './Nested.svelte'
	</script>

	<Nested answer={42} />

	<!-- Nested.svelte -->
	<script>
		export let answer
	</script>

	<p>The answer is { answer }</p>

;```



## default values

```html

	<script>
		export let answer = 'a mystery'
	</script>
	<!-- if prop is passed down, it is used else 'a mystery' is used as default -->

;```



## spread props

```html

	<!-- instead of -->
	<Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website} />

	<!-- you can do this -->
	<Info {...pkg} />

;```



---



# logic



## if blocks

```html

	{ #if user.loggedIn }
		<button on:click={toggle}>
			Log out
		</button>
	{ /if }

	{ #if !user.loggedIn }
		<button on:click={toggle}>
			Log in
		</button>
	{ /if }

;```



## else blocks

```html

	{ #if user.loggedIn }
		<button on:click={toggle}>
			Log out
		</button>
	{ :else }
		<button on:click={toggle}>
			Log in
		</button>
	{ /if }

;```



## else-if blocks

```html

	{ #if x > 10 }
		<p>{ x } is greater than 10</p>
	{ :else if 5 > x }
		<p>{ x } is less than 5</p>
	{ :else }
		<p>{ x } is between 5 & 10</p>
	{ /if }

;```



## each blocks

```html

	{ #each cats as cat }
		{ cat.name }
	{ /each }

	<!-- or -->

	{ #each cats as { id, name } }
		{ name } with { id }
	{ /each }

	<!-- or -->

	{ #each [ ...cats ] as cat }
		{ cat.name }
	{ /each }

	<!-- or -->

	{ #each cats as cat, i }
		{ i + 1 }: { cat.name }
	{ /each }

	<!-- or -->

	{ #each cats as { id, name }, i }
		{ i + 1 }: { name } with { id }
	{ /each }

	<!-- or -->

	{ #each [ ...cats ] as cat, i }
		{ i + 1 }: { cat.name }
	{ /each }

;```



## keyed each blocks

ensure that if the array changes
the prop is re-passed in for everything inside

```html

	{ #each things as thing ( thing.id ) }
		<Thing current={thing.color} />
	{ /each }

;```



## await blocks

```html
	<script>
		let promise = getRandomNumber()

		async function getRandomNumber() {
			const res = await fetch( `tutorial/random-number` )
			const text = await res.text()

			if ( res.ok ) {
				return text
			} else {
				throw new Error( text )
			}
		}

		function handleClick() {
			promise = getRandomNumber()
		}
	</script>

	<button on:click={handleClick}>
		generate random number
	</button>

	{ #await promise }
		<p>...waiting</p>
	{ :then number }
		<p>The number is { number }</p>
	{ :catch error }
		<p>{ error.message }</p>
	{ /await }

	<!-- or -->

	{ #await promise then value }
		<p>the value is { value }</p>
	{ /await }

;```



---



# events



## dom events

```html

	<script>
		let m = { x: 0, y: 0 }

		function handleMousemove( e ) {
			m.x = e.clientX
			m.y = e.clientY
		}
	</script>

	<div on:mousemove={handleMousemove}>
		The mouse position is { m.x } x { m.y }
	</div>

;```



## inline handlers

```html

	<script>
		let m = { x: 0, y: 0 }
	</script>

	<div on:mousemove="{ e => m = { x: e.clientX, y: e.clientY } }">
		The mouse position is { m.x } x { m.y }
	</div>

;```



## event modifiers

```html

	<button on:click|once={handleClick}>Click</button>
	<button on:click|once|capture|stopPropagation={handleClick}>Click</button>

;```

-	*preventDefault*
	stops default action like submit form

-	*stopPropagation*
	prevents event reaching next element

-	*passive*
	improves scrolling performance on touch/wheel events
	svelte will add this automatically when its safe to do so

-	*capture*
	fires during capture phase instead of the usual bubbling phase
	<https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture>

-	*once*
	removes handler after first time it runs

-	*self*
	only trigger if event target is the element itself



## component events

```html

	<!-- App.svelte -->
	<script>
		import Inner from './Inner.svelte'

		function handleMessage( event ) {
			alert( event.detail.text )
		}
	</script>

	<Inner on:message={handleMessage} />

	<!-- Inner.svelte -->
	<script>
		import { createEventDispatcher } from 'svelte'

		const dispatch = createEventDispatcher()

		function sayHello() {
			dispatch( 'message', {
				text: 'Hello!'
			} )
		}
	</script>

	<button on:click={sayHello}>
		Click to say hello
	</button>

;```



## event forwarding

unlike dom events, component events don't bubble
components must forward events if they need to be reaching elsewhere

```html

	<script>
		function forward( event ) {
			dispatch( 'message', event.detail )
		}
	</script>

	<Inner on:message={forward} />

	<!-- or shorthand to forward all message events -->
	<Inner on:message />

;```



## dom event forwarding

works on dom events too

```html

	<button on:click>Click me</button>

;```



---



# bindings



## text inputs

generally data flow is top down
unless you bind data

```html

	<script>
		let name = 'world'
	</script>

	<input bind:value={name}>

	<h1>Hello { name }!</h1>

;```



## numeric inputs

in dom everything is a string
when dealing with numeric inputs
you'll have to coerce the value before using it
but binding, svelte would take care of it

```html

	<script>
		let a = 1
		let b = 2
	</script>

	<label>
		<input type="number" value={a} min="0" max="10">
		<input type="range" value={a} min="0" max="10">
	</label>

	<p>{ a }</p>

;```



## checkbox inputs

```html

	<script>
		let yes = false
	</script>

	<label>
		<input type="checkbox" bind:checked={yes}>
		Yes! Send me regular email spam
	</label>

	{ #if yes }
		<p>Thank you.</p>
	{ :else }
		<p>Opt in to continue.</p>
	{ /if }

	<button disabled={!yes}>
		Subscribe
	</button>

;```



## group inputs

```html

	<input type=radio bind:group={scoops} value={1}>
	<input type=radio bind:group={scoops} value={2}>
	<input type=radio bind:group={scoops} value={3}>

;```



## textarea inputs

```html

	<textarea bind:value={value}></textarea>

	<!-- shorthand -->
	<textarea bind:value></textarea>

;```



## select bindings

values are objects in options

```html

	<script>
		let questions = [
			{ id: 1, text: `Where did you go to school?` },
			{ id: 2, text: `What is your mother's name?` },
			{ id: 3, text: `What is another personal fact that an attacker could easily find?` }
		]

		let selected
		let answer = ''

		function handleSubmit() {
			alert( `answered question ${ selected.id } ( ${ selected.text } ) with '${ answer }'` )
		}
	</script>

	<h2>Insecurity questions</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<select bind:value={selected} on:change="{() => answer = ''}">
			{ #each questions as question }
				<option value={question}>
					{ question.text }
				</option>
			{ /each }
		</select>

		<input bind:value={answer}>

		<button disabled={!answer} type=submit>
			Submit
		</button>
	</form>

	<p>selected question {selected ? selected.id : '[ waiting... ]'}</p>

;```



## select multiple

for selects with a multiple attribute
it will populate an array rather than a single value

```html

	<select multiple bind:value={flavours}>
		{ #each menu as flavour }
			<option value={flavour}>
				{ flavour }
			</option>
		{ /each }
	</select>

;```



## conteneditable bindings

elements with a contenteditable="true" attribute support textContent & innerHTML bindings

```html

	<div
		contenteditable="true"
		bind:innerHTML={html}
	></div>

;```



## each block bindings

```html

	{ #each todos as todo }
		<div class:done={todo.done}>
			<input
				type=checkbox
				bind:checked={todo.done}
			>

			<input
				placeholder="What needs to be done?"
				bind:value={todo.text}
			>
		</div>
	{ /each }

;```



## media elements

```html

	<video
		poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
		src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
		on:mousemove={handleMousemove}
		on:mousedown={handleMousedown}
		bind:currentTime={time}
		bind:duration
		bind:paused
	></video>

;```

**readonly**

-	*duration*
	the total duration of the video, in seconds

-	*buffered*
	an array of {start, end} objects

-	*seekable*
	ditto

-	*played*
	ditto

-	*seeking*
	boolean

-	*ended*
	boolean

-	*videoWidth*
	*videoHeight*

**two-way**

-	*currentTime*
	the current point in the video, in seconds

-	*playbackRate*
	how fast to play the video, where 1 is 'normal'

-	*paused*
	this one should be self-explanatory

-	*volume*
	a value between 0 & 1



## dimensions

every block-level element has

-	clientWidth
-	clientHeight
-	offsetWidth
-	offsetHeight

1.	they are readonly
2.	has some overhead, not recommended for large number of elements
3.	display: inline elements cannot be measured this way
4.	elements that can't contain other elements like canvas can't be measured too
5.	use a wrapper to contain them if needed



## this

readonly to get reference to rendered elements
will be undefined until component has mounted
put it inside onMount lifecycle function

```html

	<script>
		import { onMount } from 'svelte'
		let canvas

		onMount( ()=> {
			const ctx = canvas.getContext( '2d' )
			let frame

			( function loop() {
				frame = requestAnimationFrame( loop )
				const imageData = ctx.getImageData( 0, 0, canvas.width, canvas.height )

				for ( let p = 0; p < imageData.data.length; p += 4 ) {
					const i = p / 4
					const x = i % canvas.width
					const y = i / canvas.height >>> 0
					const t = window.performance.now()
					const r = 64 + ( 128 * x / canvas.width ) + ( 64 * Math.sin( t / 1000 ) )
					const g = 64 + ( 128 * y / canvas.height ) + ( 64 * Math.cos( t / 1000 ) )
					const b = 128

					imageData.data[ p + 0 ] = r
					imageData.data[ p + 1 ] = g
					imageData.data[ p + 2 ] = b
					imageData.data[ p + 3 ] = 255
				}

				ctx.putImageData( imageData, 0, 0 )
			}() )

			return () => {
				cancelAnimationFrame( frame )
			}
		} )
	</script>

	<canvas
		bind:this={canvas}
		width={32}
		height={32}
	></canvas>

;```



## component bindings

bind to component props
value in the parent component is immediately updated
but
use component bindings sparingly
difficult to track the flow of data around your application if you have too many of them
if there is no 'single source of truth'

```html

	<!-- App.svelte -->
	<script>
		import Keypad from './Keypad.svelte'

		let pin
		$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin'

		function handleSubmit() {
			alert( `submitted ${ pin }` )
		}
	</script>

	<h1 style="color: { pin ? '#333' : '#ccc' }">{ view }</h1>
	<Keypad on:submit={handleSubmit} />

	<!-- Keypad.svelte -->
	<script>
		import { createEventDispatcher } from 'svelte'
		export let value = ''

		const dispatch = createEventDispatcher()
		const select = num => () => value += num
		const clear  = () => value = ''
		const submit = () => dispatch( 'submit' )
	</script>

	<div class="keypad">
		<button on:click={select(1)}>1</button>
		<button on:click={select(2)}>2</button>
		<button on:click={select(3)}>3</button>
		<button on:click={select(4)}>4</button>
		<button on:click={select(5)}>5</button>
		<button on:click={select(6)}>6</button>
		<button on:click={select(7)}>7</button>
		<button on:click={select(8)}>8</button>
		<button on:click={select(9)}>9</button>

		<button disabled={!value} on:click={clear}>clear</button>
		<button on:click={select(0)}>0</button>
		<button disabled={!value} on:click={submit}>submit</button>
	</div>

;```



---



# lifecycle



## onMount

recommended to put fetch in onMount rather than top level script

```html

	<script>
		import { onMount } from 'svelte'

		let photos = []

		onMount( async () => {
			const res = await fetch( `https://jsonplaceholder.typicode.com/photos?_limit=20` )
			photos = await res.json()
		} )
	</script>

;```



## onDestroy

```html

	<script>
		import { onDestroy } from 'svelte'

		let seconds = 0
		const interval = setInterval( () => seconds += 1, 1000 )

		onDestroy( () => clearInterval( interval ) )
	</script>

;```

we can also abstract the interval logic into a helper function

```html

	<!-- App.svelte -->
	<script>
		import { onInterval } from './utils.js'

		let seconds = 0
		onInterval( () => seconds += 1, 1000 )
	</script>

	<!-- utils.js -->
	<script>
		import { onDestroy } from 'svelte'

		export function onInterval( callback, milliseconds ) {
			const interval = setInterval( callback, milliseconds )

			onDestroy( () => {
				clearInterval(interval)
			} )
		}
	</script>

;```



## beforeUpdate & afterUpdate

```html

	<script>
		import Eliza from 'elizabot'
		import { beforeUpdate, afterUpdate } from 'svelte'

		let div
		let autoscroll

		beforeUpdate( () => {
			autoscroll = div && ( div.offsetHeight + div.scrollTop ) > ( div.scrollHeight - 20 )
		} )

		afterUpdate( () => {
			if ( autoscroll ) div.scrollTo( 0, div.scrollHeight )
		} )

		const eliza = new Eliza()

		let comments = [
			{ author: 'eliza', text: eliza.getInitial() }
		]

		function handleKeydown( event ) {
			if ( event.which === 13 ) {
				const text = event.target.value
				if ( !text ) return

				comments = comments.concat( {
					text,
					author: 'user'
				} )

				event.target.value = ''

				const reply = eliza.transform( text )

				setTimeout( () => {
					comments = comments.concat( {
						text: '...',
						author: 'eliza',
						placeholder: true
					} )

					setTimeout( () => {
						comments = comments.filter( comment => !comment.placeholder ).concat( {
							text: reply,
							author: 'eliza'
						} )
					}, 500 + Math.random() * 500 )
				}, 200 + Math.random() * 200 )
			}
		}
	</script>

	<style>
		.chat {
			height: 100%;
			display: flex;
			max-width: 320px;
			flex-direction: column;
		}

		.scrollable {
			flex: 1 1 auto;
			overflow-y: auto;
			margin: 0 0 0.5em 0;
			border-top: 1px solid #eee;
		}

		article {
			margin: 0.5em 0;
		}

		.user {
			text-align: right;
		}

		span {
			padding: 0.5em 1em;
			display: inline-block;
		}

		.eliza span {
			background-color: #eee;
			border-radius: 1em 1em 1em 0;
		}

		.user span {
			color: white;
			word-break: break-all;
			background-color: #0074D9;
			border-radius: 1em 1em 0 1em;
		}
	</style>

	<div class="chat">
		<h1>Eliza</h1>

		<div class="scrollable" bind:this={div}>
			{ #each comments as comment }
				<article class={comment.author}>
					<span>{ comment.text }</span>
				</article>
			{ /each }
		</div>

		<input on:keydown={handleKeydown}>
	</div>

;```



## tick

can be called anytime
a promise that resolves as soon as there're any state changes to DOM

```html

	<script>
		import { tick } from 'svelte'
		let text = `Select some text & hit the tab key to toggle uppercase`

		async function handleKeydown(event) {
			if (event.which !== 9) return

			event.preventDefault()

			const { selectionStart, selectionEnd, value } = this
			const selection = value.slice(selectionStart, selectionEnd)

			const replacement = /[a-z]/.test(selection)
				? selection.toUpperCase()
				: selection.toLowerCase()

			text = (
				value.slice(0, selectionStart) +
				replacement +
				value.slice(selectionEnd)
			);

			await tick()
			// this has no effect, because the DOM hasn't updated yet
			// but await tick will cause that to run after tick
			this.selectionStart = selectionStart
			this.selectionEnd = selectionEnd
		}
	</script>

	<textarea value={text} on:keydown={handleKeydown}></textarea>

;```



---



# stores



## writable stores

```html

	<!-- App.svelt -->
	<script>
		import { count } from './stores.js'
		import Incrementer from './Incrementer.svelte'
		import Decrementer from './Decrementer.svelte'
		import Resetter from './Resetter.svelte'

		let count_value;

		const unsubscribe = count.subscribe( value => {
			count_value = value
		} )
	</script>

	<h1>The count is { count_value }</h1>

	<Incrementer />
	<Decrementer />
	<Resetter />

	<!-- stores.js -->
	import { writable } from 'svelte/store'

	export const count = writable( 0 )

	<!-- Incrementer.svelte -->
	<script>
		import { count } from './stores.js'

		function increment() {
			count.update( n => n + 1 )
		}
	</script>

	<button on:click={increment}>+</button>

	<!-- Decrementer.svelte -->
	<script>
		import { count } from './stores.js'

		function decrement() {
			count.update( n => n - 1 )
		}
	</script>

	<button on:click={decrement}>-</button>

	<!-- Resetter.svelte -->
	<script>
		import { count } from './stores.js'

		function reset() {
			count.set( 0 )
		}
	</script>

	<button on:click={reset}>reset</button>

;```



## auto-subscriptions

the app in the previous example works
but there's a subtle bug
the unsubscribe function never gets called
if the component was instantiated & destroyed many times
this would result in a memory leak

```html

	<script>
		import { onDestroy } from 'svelte'
		import { count } from './stores.js'

		let count_value

		const unsubscribe = count.subscribe( value => {
			count_value = value
		} )

		onDestroy( unsubscribe )
	</script>

;```

auto subscribe by prefixing the store name with $
any name beginning with $ is assumed to refer to a store value
it's effectively a reserved character
svelte will prevent you from declaring your own variables with a $ prefix

```html

	<script>
		import { count } from './stores.js'
	</script>

	<h1>The count is { $count }</h1>

;```



## readable stores

the first argument to readable is an initial value
which can be null or undefined if you don't have one yet
the second argument is a start function that takes a set callback & returns a stop function
the start function is called when the store gets its first subscriber;
stop is called when the last subscriber unsubscribes

```js

	import { readable } from 'svelte/store'

	export const time = readable( new Date(), function start( set ) {
		const interval = setInterval( () => {
			set( new Date() )
		}, 1000 )

		return function stop() {
			clearInterval( interval )
		}
	} )

;```



## derived stores

```js

	import { readable, derived } from 'svelte/store'

	export const time = readable( new Date(), function start( set ) {
		const interval = setInterval( () => {
			set( new Date() )
		}, 1000 )

		return function stop() {
			clearInterval( interval )
		}
	})

	const start = new Date()

	export const elapsed = derived(
		time,
		$time => Math.round( ( $time - start ) / 1000 )
	)

;```



## custom stores

```js

	import { writable } from 'svelte/store'

	function createCount() {
		const { subscribe, set, update } = writable( 0 )

		return {
			subscribe,
			increment: () => update( n => n + 1 ),
			decrement: () => update( n => n - 1 ),
			reset: () => set( 0 )
		}
	}

	export const count = createCount()

;```




---
