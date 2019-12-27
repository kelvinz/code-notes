


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


---
