# Event Delegation

```
document.addEventListener( 'click', function ( event ) {

	// If the clicked element doesn't have the .click class, ignore it
	if ( !event.target.matches( '.click' ) ) return

	console.log( 'You clicked a button' )

} )
```

---

# Early Return Pattern

```
function handleClick (event) {

	// Make sure clicked element has the .save-data class
	if (!event.target.matches('.save-data')) return;

	// Get the value of the [data-id] attribute
	let id = event.target.getAttribute('data-id');
	if (!id) return;

	// Get the user token from localStorage
	let token = localStorage.getItem('token');
	if (!token) return;

	// Save the ID to localStorage
	localStorage.setItem(`${token}_${id}`, true);

}
```

---

# Multiple Selectors

```
let all = document.querySelectorAll( '.tuna, .turkey, .mayo' )
```

---

# Data Attribute Selectors

```
let form = document.querySelector( '[data-submit="login"]' )
form.addEventListener( 'submit', function ( event ) {
	event.preventDefault()
	alert( 'You logged in!' )
} )
```

```
let handlers = {

	sayHi () {
		alert( '🎉 Hello!' )
	},

	sayBye () {
		alert( '👋 See you next time...' )
	}

}

document.addEventListener( 'click', function ( event ) {

	// Get the function to run
	let fn = event.target.getAttribute( 'data-click' )
	if ( !fn ) return

	// Run the function
	handlers[ fn ]( event )

} )
```

---

# Object To Query

```
let merlin = {
	job: 'Wizard',
	tool: 'Wand',
	age: 142,
	signatureSpell: 'Dancing Teacups'
}

let queryString = new URLSearchParams( merlin ).toString()
```

---

# Remove Duplicates

```
let wizards = [
	'Merlin',
	'Ursula',
	'Gandalf',
	'Merlin',
	'Morgana',
	'Radagast',
	'Ursula'
]

let deduped = Array.from( new Set( wizards ) )
```

---

# Generate Random IDs

```
let id = crypto.randomUUID()
```

---

# True Type Checking

```
// returns [object Array]
Object.prototype.toString.call( [] )
```

---

# Numeric Separators

```
// Numeric separators make big numbers easier to read
let num = 1_234_567_890_987_654_321
```

---

# Looping Over Objects

```
let merlin = {
	job: 'Wizard',
	tool: 'Wand',
	age: 142,
	signatureSpell: 'Dancing Teacups'
}

// 🦄 The new way!
for ( let [ key, value ] of Object.entries( merlin ) ) {
	console.log( key )
	console.log( value )
}
```

---

# Object Property Shorthands

```
let name = 'Merlin'
let tool = 'wand'
let age = 142

// 🦄 The new way!
let obj2 = { name, tool, age }
```

---

# Simpler Boolean Returns

```
// The verbose way
function isBig ( num ) {
	if ( num > 10 ) {
		return true
	} else {
		return false
	}
}

// 🦄 A simpler way
function isBig ( num ) {
	return num > 10
}
```

---
