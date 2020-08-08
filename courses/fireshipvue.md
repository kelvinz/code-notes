


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

