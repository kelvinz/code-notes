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
