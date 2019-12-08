


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
	<Nested/>

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

	<!-- app.svelte -->
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
	<Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/>

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
		<p>{ x } is between 5 and 10</p>
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





---
