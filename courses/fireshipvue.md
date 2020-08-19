


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

# email password auth

```html

<!-- Login.vue -->
<template>
	<aside>
		<h3>Sign in Anonymously</h3>
		<button @click="auth.signInAnonymously()">Sign In</button>

		<div v-if="newUser">
			<h3>Sign Up for a New Account</h3>
			<a href="#" @click="newUser = false">Returning User?</a>
		</div>

		<label for="email">Email</label><br>
		<input v-model="email" placeholder="email" type="email">

		<label for="password">Password</label><br>
		<input v-model="password" type="password">

		<br>
		<button :class="{ 'is-loading' : loading ">
			{{ newUser ? 'Sign up' : 'Login' }}
		</button>

		<p v-if="errorMessage">{{ errorMessage }}</p>
	</aside>
</template>

;```

```js

import { auth } from '../firebase'

export default {
	data() {
		return {
			auth,
			newUser: false,
			email: '',
			password: '',
			loading: false,
			errorMessage ='',
		}
	},
	methods: {
		async signInOrCreateUser() {
			this.loading = true
			this.errorMessage = ''
			try {
				if ( this.newUser ) {
					await auth.createUserWithEmailAndPassword( this.email, this.password )
				} else {
					await auth.signInWithEmailAndPassword( this.email, this.password )
				}
			} catch ( err ) {
				this.errorMessage = err.message
			}
			this.loading = false
		}
	},
}

;```



---

# create chat rooms

create database in firebase dashboard
start with a single 'chat' collection

```html

<!-- Home.vue -->
<template>
	<div>
		<h3>Home</h3>

		<User v-slot:user="{ user }">
			<div v-if="user">
				<UserProfile :user="user" />
				<ChatList :uid="user.uid" />
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
import ChatList from './ChatList'

export default {
	components: {
		Login,
		User,
		UserProfile
	}
}

;```

```html

<!-- ChatList.vue -->
<template>
	<div>
		<button @click="createChatRoom()">Create New Chat Room</button>
	</div>
</template>

;```

```js

import { db } from '../firebase'

export default {
	methods: {
		async createChatRoom() {
			const newChat = await db.collection( 'chats' ).add( {
				createdAt: Date.now(),
				owner: this.uid,
				members: [ this.uid ],
			} )
		}
	},
	props: [ 'uid' ]
}

;```



---

# query chat rooms

```html

<!-- ChatList.vue -->
<template>
	<div>

		<ul>
			<li v-for="chat of chats" :key="chat.id">
				{{ chat.id }}
			</li>
		</ul>

		<button @click="createChatRoom()">Create New Chat Room</button>
	</div>
</template>

;```

```js

import { db } from '../firebase'

export default {
	data() {
		return {
			chats: []
		}
	},
	firestore() {
		return {
			chats: db.collection( 'chats' ).where( 'owner', '==', this.uid )
		}
	},
	methods: {
		async createChatRoom() {
			const newChat = await db.collection( 'chats' ).add( {
				createdAt: Date.now(),
				owner: this.uid,
				members: [ this.uid ],
			} )
		}
	},
	props: [ 'uid' ]
}

;```



---

# dynamic routing

```js

// main.js
import Home from './components/Home'
import ChatRoom from './components/ChatRoom'

const router = new VueRouter( {
	routes: [
		{ path: '/', component: Home },
		{ path: '/chats/:id', component: ChatRoom }
	]
} )

;```

```html

<!-- ChatList.vue -->
<template>
	<div>

		<ul>
			<li v-for="chat of chats" :key="chat.id">
				<router-link :to="{ name: 'chat', params: { id: chat.id } }">
					{{ chat.id }}
				</router-link>
			</li>
		</ul>

		<button @click="createChatRoom()">Create New Chat Room</button>
	</div>
</template>

;```

```html

<!-- ChatRoom.vue -->
<template>
	<main>
		<h3>Welcome to ChatRoom {{ chatId }}</h3>
	</main>
</template>

;```

```js

export default {
	computed: {
		chatId() {
			return this.$route.params.id
		}
	}
}

;```



---

# query messages

```html

<!-- ChatRoom.vue -->
<template>
	<main>
		<h3>Welcome to ChatRoom {{ chatId }}</h3>
		<User :user="{ user }">

			<ul>
				<li v-for="message of messages" :key="message.id">
					{{ message.text }}
				</li>
			</ul>

			<input v-model="newMessageText" />

			<button
				:disabled="!newMessageText || loading"
				@click="addMessage( user.uid )"
			>

			</button>
		</User>
	</main>
</template>

;```

```js

import User from './User'
import { db } from '../firebase'

export default {
	components: {
		User,
	},
	data() {
		return {
			newMessageText: '',
			loading: false,
		}
	},
	computed: {
		chatId() {
			return this.$route.params.id
		},
		messagesCollection() {
			return db.doc( `chats/${ this.chatId }` ).collection( 'messages' )
		}
	},
	firestore() {
		return {
			messages: this.messagesCollection.orderBy( 'createdAt' ).limitToLast( 10 )
		}
	},
	methods: {
		async addMessage( uid ) {
			this.loading = true
			const { id: messageId } = this.messagesCollection.doc()
			await this.messagesCollection.doc( messageId ).set( {
				text: this.newMessageText,
				sender: uid,
				createdAt: Date.now(),
			} )
			this.loading = false
			this.newMessageText = ''
		}
	}
}

;```



---

# message ui

```html

<!-- ChatRoom.vue -->
<template>
	<main>
		<h3>Welcome to ChatRoom {{ chatId }}</h3>
		<User :user="{ user }">

			<ul>
				<li v-for="message of messages" :key="message.id">
					<ChatMessage
						:message="message"
						:owner="user.uid === message.sender"
					/>
				</li>
			</ul>

			<input v-model="newMessageText" />

			<button
				:disabled="!newMessageText || loading"
				@click="addMessage( user.uid )"
			>

			</button>
		</User>
	</main>
</template>

;```

```js

import User from './User'
import ChatMessage from './ChatMessage'
import { db } from '../firebase'

export default {
	components: {
		User,
		ChatMessage
	},
	data() {
		return {
			newMessageText: '',
			loading: false,
			messages: [],
		}
	},
	computed: {
		chatId() {
			return this.$route.params.id
		},
		messagesCollection() {
			return db.doc( `chats/${ this.chatId }` ).collection( 'messages' )
		}
	},
	firestore() {
		return {
			messages: this.messagesCollection.orderBy( 'createdAt' ).limitToLast( 10 )
		}
	},
	methods: {
		async addMessage( uid ) {
			this.loading = true
			const { id: messageId } = this.messagesCollection.doc()
			await this.messagesCollection.doc( messageId ).set( {
				text: this.newMessageText,
				sender: uid,
				createdAt: Date.now(),
			} )
			this.loading = false
			this.newMessageText = ''
		}
	}
}

;```

```html

<!-- ChatMessage.vue -->
<template>
	<div :class="{ 'from-user' : owner }">
		{{ message.text }}
		<br>
		<span>from UID {{ message.sender }}</span>
	</div>
</template>

;```

```js

export default {
	props: [ 'message', 'owner' ]
}

;```



---

