


<https://fireship.io/courses/vue/>



# firebase setup

npm install vuefire firebase

```js

// main.js
import { firestorePlugin } from 'vuefire'

Vue.use( firestorePlugin )



// firebase.js
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
	...
}

firebase.initializeApp( firebaseConfig )

export const db      = firebase.firestore()
export const auth    = firebase.auth()
export const storage = firebase.storage()



// App.vue
import { auth } from './firebase'

console.log( auth )

;```



---

# your first component

npm install vue-router

```js

// main.js
import VueRouter from 'vue-router'
Vue.use( VueRouter )

import Home from './components/Home'
const router = new VueRouter( {
	routes: [
		{ path: '/', component: Home }
	]
} )

;```

```html

<!-- Home.vue -->
<template>
	<div>
		<h3>Home</h3>
	</div>
</template>



<!-- App.vue -->
<template>
	<div id="app">
		<header>
			<h1>Vue Voxer</h1>
			<p>Realtime Voice Chat</p>
		</header>
	</div>
	<router-view></router-view>
</template>

;```



---

