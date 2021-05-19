```js

//	const x = () => ( { } ) returns an object

const talker = ( state ) => ( {
	talk() { console.log( `${ state.name } is talking` ) }
} )

const walker = ( state ) => ( {
	walk() { console.log( `${ state.name } is walking` ) }
} )

const Person = ( name ) => {
	const state = {
		name
	}

	return {
		...talker( state ),
		...walker( state ),
	}
}

const kelvin = Person( 'kelvin' )
kelvin.talk() // kelvin is talking
kelvin.walk() // kelvin is walking

;```

```js

// optional chaining
const person = {
	address: {
		street: '123'
	}
}

// checks if person exists
// then checks if address exists
// then gets street
// returns undefined if any is missing
// prevents code breaking when part of person.address.street is missing
console.log( person?.address?.street )

// works with functions or arrays too
person.talk?.()
person.hobbies?.[ 0 ]
person.hobbies?.[ 0 ].toLowerCase()

;```

```js

// better way of looping objects
for ( const [ key, value ] of Object.entries( myObj ) ) {

}

;```

```js

const memoize = fn => ( ( cache = {} ) => arg => cache[ arg ] || ( cache[ arg ] = fn( arg ) ) )()

// count fibonacci
const fibo = memoize( n => n <= 2 ? 1 : fibo( n - 1 ) + fibo( n - 2 ) )

fib( 1 ) // 1
fib( 2 ) // 1
fib( 3 ) // 2
fib( 4 ) // 3
fib( 5 ) // 5
fib( 6 ) // 8

;```