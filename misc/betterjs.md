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
