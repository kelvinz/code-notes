


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

