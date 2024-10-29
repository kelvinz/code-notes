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

# Spread Operator for Array/Object Cloning

```
const spells = ['fireball', 'ice storm', 'teleport']
const newSpells = [...spells, 'invisibility']

const wizard = { name: 'Merlin', age: 142 }
const wizardUpdate = { ...wizard, level: 20 }
```

---

# Destructuring Assignment

```
const wizard = { name: 'Merlin', age: 142, tool: 'wand' }
const { name, age } = wizard

console.log(name, age) // Merlin 142
```

---

# Optional Chaining

```
const wizard = {
  spellbook: {
    firstSpell: { name: 'Fireball' }
  }
}

const spell = wizard?.spellbook?.firstSpell?.name
console.log(spell) // 'Fireball'
```

---

# Nullish Coalescing Operator

```
const wizard = { name: 'Merlin' }

const wizardName = wizard.name ?? 'Unknown Wizard'
console.log(wizardName) // 'Merlin'

const wizardAge = wizard.age ?? 'Age unknown'
console.log(wizardAge) // 'Age unknown'
```

---

# Array Methods (map, filter, reduce)

```
const numbers = [1, 2, 3, 4, 5]

const doubled = numbers.map(num => num * 2)
console.log(doubled) // [2, 4, 6, 8, 10]

const evens = numbers.filter(num => num % 2 === 0)
console.log(evens) // [2, 4]

const sum = numbers.reduce((acc, curr) => acc + curr, 0)
console.log(sum) // 15
```

---

# Logical Assignment Operators

```
let wizard = { name: 'Merlin' }

// Assign only if the property is falsy
wizard.age ||= 100

// Assign only if the property is nullish
wizard.tool ??= 'wand'

console.log(wizard) // { name: 'Merlin', age: 100, tool: 'wand' }
```

---

# Array.flat() for Nested Arrays

```
const nestedSpells = ['fireball', ['ice storm', 'lightning bolt'], [['teleport']]]

const flatSpells = nestedSpells.flat(2)
console.log(flatSpells) // ['fireball', 'ice storm', 'lightning bolt', 'teleport']
```

---

# Object.entries() and Object.fromEntries()

```
const wizard = { name: 'Merlin', age: 142, tool: 'wand' }

const entries = Object.entries(wizard)
console.log(entries) // [['name', 'Merlin'], ['age', 142], ['tool', 'wand']]

const newWizard = Object.fromEntries(entries)
console.log(newWizard) // { name: 'Merlin', age: 142, tool: 'wand' }
```

---

# Dynamic Object Property Names

```
const propertyName = 'spell'
const propertyValue = 'Fireball'

const wizard = {
  name: 'Merlin',
  [propertyName]: propertyValue
}

console.log(wizard) // { name: 'Merlin', spell: 'Fireball' }
```

---

