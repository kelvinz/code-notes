


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

# anonymous auth

firebase dashboard enable anonymous

```html

<!-- Home.vue -->
<template>
	<div>
		<h3>Home</h3>
		<Login />
	</div>
</template>

;```

```js

import Login from './Login'

export default {
	components: {
		Login
	}
}

;```

```html

<!-- Login.vue -->
<template>
	<aside>
		<h3>Sign in Anonymously</h3>
		<button @click="auth.signInAnonymously()">Sign In</button>
	</aside>
</template>

;```

```js

import { auth } from '../firebase'

export default {
	data() {
		return {
			auth,
		}
	}
}

;```



---

# realtime auth state

npm i @vue/composition-api

```js

// main.js
import VueCompositionApi from '@vue/composition-api'
Vue.use( VueCompositionApi )

;```

```html

<!-- User.vue -->
<template>
	<div>
		<slot name="user" v-bind:user="user"></slot>
	</div>
</template>

;```

```js

import { ref } from '@vue/composition-api'

export default {
	setup() {
		const user = ref( null )
		const unsubscribe = auth.onAuthStateChanged(
			firebaseUser => user.value = firebaseUser
		)

		return {
			user,
			unsubscribe,
		}
	},
	destoryed() {
		this.unsubscribe()
	}
}

;```

```html

<!-- Home.vue -->
<template>
	<div>
		<h3>Home</h3>

		<User v-slot:user="{ user }">
			<div v-if="user">
				Logged in as {{ user.uid }}
			</div>
			<Login v-else />
		</User>
	</div>
</template>

;```

```js

import Login from './Login'
import User from './User'

export default {
	components: {
		Login,
		User
	}
}

;```



---

# user profile

```html

<!-- UserProfile.vue -->
<template>
	<div>
		Logged in as {{ user.uid }}

		<button @click="auth.signOut()">Sign Out</button>
	</div>
</template>

;```

```js

import { auth } from '../firebase'

export default {
	data() {
		return {
			auth
		}
	},
	props: [ 'user' ]
}

;```

```html

<!-- Home.vue -->
<template>
	<div>
		<h3>Home</h3>

		<User v-slot:user="{ user }">
			<div v-if="user">
				<UserProfile :user="user" />
			</div>
			<Login v-else />
		</User>
	</div>
</template>

;```

```js

import Login from './Login'
import User from './User'
import UserProfile from './UserProfile'

export default {
	components: {
		Login,
		User,
		UserProfile
	}
}

;```



---

