


<https://exercism.org/tracks/typescript>



# Hello World

```typescript

export const hello = (): string => 'Hello, World!';

```

`: string` is the return type
type of value return from this function



---

# Two Fer

```typescript

export const twoFer = ( name: string = 'you' ): string => `One for ${ name }, one for me.`

```



---

# Resistor Color

```typescript

const map: { [ x: string ]: number } = {
    'black': 0,
    'brown': 1,
    'red': 2,
    'orange': 3,
    'yellow': 4,
    'green': 5,
    'blue': 6,
    'violet': 7,
    'grey': 8,
    'white': 9,
}

export const colorCode = ( color: string ): number => map[ color ]

export const COLORS: string[] = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
]

```



---

# Resistor Color Duo

```typescript

const map: { [ x: string ]: number } = {
	'black': 0,
	'brown': 1,
	'red': 2,
	'orange': 3,
	'yellow': 4,
	'green': 5,
	'blue': 6,
	'violet': 7,
	'grey': 8,
	'white': 9,
}

export const decodedValue = ( arr: string[] ): number => {
	const a: string = arr[ 0 ]
	const b: string = arr[ 1 ]
	return +`${ map[ a ] }${ map[ b ] }`
}

```



---

# Resistor Color Trio

```typescript

const map: { [ x: string ]: number } = {
    'black': 0,
    'brown': 1,
    'red': 2,
    'orange': 3,
    'yellow': 4,
    'green': 5,
    'blue': 6,
    'violet': 7,
    'grey': 8,
    'white': 9,
}

const getAbc = ( a:string, b: string, c: string ): string => {
  const aNum: number = map[ a ]
  const bNum: number = map[ b ]
  const cNum: number = map[ c ]
  const abcNum: number = +`${ aNum }${ bNum }${ '0'.repeat( cNum ) }`
  return abcNum >= 1000 ? `${ abcNum / 1000 } kilo` : `${ abcNum } `
}

export const decodedResistorValue = ( arr: string[] ): string => {
    const abc:string = getAbc( arr[ 0 ], arr[ 1 ], arr[ 2 ] )
	return `${ abc }ohms`
}

```



---

# Leap

```typescript

export const isLeap = ( year: number ): boolean => {
	if ( year % 4 !== 0 ) return false
	if ( year % 100 !== 0 ) return true
	return year % 400 === 0
}

```



---

# Rna Transcription

```typescript

const dnaToRna: { [ dna: string ]: string } = {
	'G': 'C',
	'C': 'G',
	'T': 'A',
	'A': 'U',
}

export const toRna = ( dna: string ): string => {
	const dnaArr: string[] = dna.split('')
	const rna: string = dnaArr.map( dna => dnaToRna[ dna ] ).join('')
	if ( rna.length === dna.length ) return rna
	throw new Error( 'Invalid input DNA.' )
}

```



---

# Space Age

```typescript

const map: { [ planet: string ]: number } = {
	'mercury': .2408467,
	'venus': .61519726,
	'earth': 1,
	'mars': 1.8808158,
	'jupiter': 11.862615,
	'saturn': 29.447498,
	'uranus': 84.016846,
	'neptune': 164.79132,
}

export const age = ( planet: string, seconds: number ): number => {
	const earthAge: number = seconds / 31557600
	const planetAge: number = earthAge / map[ planet ]
	return +planetAge.toFixed( 2 )
}

```



---

