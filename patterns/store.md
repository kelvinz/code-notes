```ts

import { createGlobalState, useStorage } from '@vueuse/core'


interface State {
	score: number
}

export const reset = (): State => ( {
	score: 0,
} )

export const storeState = createGlobalState(
	() => useStorage<State>( 'my-state', reset() )
)

```

```ts

import { storeState } from '@/lib/store'

const state = storeState()

state.value.score = 1

```
