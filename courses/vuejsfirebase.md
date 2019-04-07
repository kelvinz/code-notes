


<https://www.udemy.com/build-web-apps-with-vuejs-firebase/learn/v4/content/>



# project one - ninja smoothies



## project structure

-	*base file*
-	app.vue ( root component )
	-	*constant component*
	-	navbar.vue ( always visible )
	-	*swappable components*
		-	index.vue ( / )
		-	add-smoothie.vue ( /add-smoothie )
		-	edit-smoothie.vue ( /edit-smoothie )

## pulling data from firestore

```js

	created() {
		db.collection( 'smoothies' ).get()
		.then( snapshot => {
			snapshot.forEach( doc => {
				let smoothie = doc.data()
					smoothie.id = doc.id
				this.smoothies.push( smoothie )
			})
		})
	}

```

## delete smoothie

`@click="deleteSmoothie( smoothie.id )"`

```js

	deleteSmoothie( id ) {
		db.collection( 'smoothies' ).doc( id ).delete()
 		.then( () => {
 			//	take the list of smoothies & filter
			//	if not the smoothie that's clicked
			//	paste it back into smoothie list
			//	the one 'flitered' out is not pasted back
			//	thus it is deleted
			this.smoothies = this.smoothies.filter( smoothie => {
				return smoothie.id != id
			})
		})
		.catch( err => {
			console.log( err )
		})
	}

```

## add smoothie

```js

	addSmoothie() {
		db.collection( 'smoothies' ).add({
			title: this.title,
			ingredients: this.ingredients,
			slug: this.slug
		})
		.then( () => {
			this.$router.push( { name: 'Index' } )
		})
		.catch( err => {
			console.log( err )
		})
	}

```

## edit smoothie

```js

	created() {
		let slug = this.$route.params.smoothie_slug,
			ref = db.collection( 'smoothies' ).where( 'slug', '==', slug )

		ref.get().then( snapshot => {
			snapshot.forEach( doc => {
				this.smoothie = doc.data()
				this.smoothie.id = doc.id
			})
		})
	}

	editSmoothie() {
		this.feedback = null

		//	optional plugin to create slug
		this.slug = slugify( this.smoothie.title, {
			replacement: '-',
			remove: /[$*_+~.()'"!\-:@]/g,
			lower: true
		})

		db.collection( 'smoothies' ).doc( this.smoothie.id ).update({
			title: this.smoothie.title,
			slug: this.slug,
			ingredients: this.smoothie.ingredients
		}).then( () => {
			this.$router.push({ name: 'Index' })
		}).catch(err => {
			console.log( err )
		})
	}

```

### tips & tricks

init data with `xxx = null`
this way you can check if there's data later by doing `if ( xxx ) {}`

use v-if to load element that might be `null` to prevent errors

open two terminal tabs so you can have the dev server up
yet install stuff to project as you go



---



# project two - real-time chat app



## send props thru links with route guard

```js

	//	in link
	this.$router.push({
		name: 'Chat',
		params: {
			name: this.name
		}
	})

	//	in router
	{
		path: '/chat',
		name: 'Chat',
		component: Chat,
		props: true,
		beforeEnter: ( to, from, next ) => {
			if ( to.params.name ) {
				next()
			} else {
				//	if no name passed
				//	send back to welcome page
				next({ name: 'Welcome' })
			}
		}
	}

```

## real-time

```js

	created() {
		let ref = db.collection( 'messages' ).orderBy( 'timestamp' )

		ref.onSnapshot( snapshot => {
			snapshot.docChanges().forEach( change => {
				if ( change.type == 'added' ) {
					let doc = change.doc
					this.messages.push({
						id: doc.id,
						name: doc.data().name,
						content: doc.data().content,
						timestamp: doc.data().timestamp
					})
				}
			})
		})
	}

```

### tips & tricks

use `date.now()` to get current time in seconds

vue-scroll-chat plugin to keep chatbox scrollbars at bottom
momentjs to format dates



---



# project one - geo ninjas


## google maps

in html
`<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIPXfL1rYhDUtvIKw9jIZZKXAChmOA1DY"></script>`

```js

	//	in component
	renderMap() {
		const map = new google.maps.Map( document.getElementById( 'map' ), {
			center: { lat: this.lat, lng: this.lng },
			zoom: 6,
			maxZoom: 15,
			minZoom: 3,
			streetViewControl: false
		})
	}

```

## signup

```js

	signup() {
		if ( this.alias && this.email && this.password ) {
			this.slug = slugify( this.alias, {
				replacement: '-',
				remove: /[$*_+~.()'"!\-:@]/g,
				lower: true
			})

			let ref = db.collection( 'users' ).doc( this.slug )

			ref.get().then( doc => {
				if ( doc.exists ) {
					this.feedback = 'This alias already exists'
				} else {
					firebase.auth().createUserWithEmailAndPassword( this.email, this.password )
					.then( cred => {
						ref.set({
							alias: this.alias,
							geolocation: null,
							user_id: cred.user.id
						})
						.then( () => {
							this.$router.push({ name: 'GMap' })
						})
					})
					.catch( err => {
						this.feedback = err.message
					})
				}
			})
		} else {
			this.feedback = 'Please fill in all fields'
		}
	}

```

## wrapping vue instance
this is to prevent the vue instance from loading before auth inits

```js

	import firebase from 'firebase'

	let app = null

	firebase.auth().onAuthStateChanged( () => {
		//	init app if not alreday created
		if ( !app ) {
			app = new Vue({
				el: '#app',
				router,
				components: { App },
				template: '<App/>'
			})
		}
	});

```

## log out

```js

	logout() {
		firebase.auth().signOut().then( () => {
			this.$router.push({ name: 'Signup' })
		})
	}

```

## log in

```js

	login (){
		if ( this.email && this.password ){
			this.feedback = null
			firebase.auth().signInWithEmailAndPassword( this.email, this.password )
			.then( cred => {
				this.$router.push({ name: 'GMap' })
			}).catch( err => {
				this.feedback = err.message
			})
		} else {
			this.feedback = 'Please fill in both fields'
		}
	}

```

## get geolocation

```js

	// get current user
	let user = firebase.auth().currentUser

	//get current location
	if ( navigator.geolocation ){
		navigator.geolocation.getCurrentPosition( pos => {
			this.lat = pos.coords.latitude
			this.lng = pos.coords.longitude

			// find the user record & then update geocoords
			db.collection( 'users' ).where( 'user_id', '==', user.uid ).get()
			.then( snapshot => {
				snapshot.forEach( doc => {
					db.collection( 'users' ).doc( doc.id ).update({
						geolocation: {
							lat: pos.coords.latitude,
							lng: pos.coords.longitude
						}
					})
				})
			}).then( () => {
				this.renderMap()
			})

		}, ( err ) => {
			console.log( err )
			this.renderMap()
		}, {
			//	3rd param for getCurrentPosition
			//	find cached geolocation of user in last hour 60000 ms if there is
			//	if timeout passes, error will happen, which is handled above
			maximumAge: 60000,
			timeout: 3000
		})
	} else {
		//	position centre by default values
		this.renderMap()
	}

```

## route guard next level

```js

	//	instead of normal export new router
	//	we store it into a variable
	const router = new Router({
		routes: [
			{
				path: '/',
				name: 'GMap',
				component: GMap,
				meta: {
					requiresAuth: true
				}
			},
			{
				path: '/signup',
				name: 'Signup',
				component: Signup
			},
			{
				path: '/login',
				name: 'Login',
				component: Login
			}
		]
	})

	//	router guards
	router.beforeEach(( to, from, next ) => {

		//	check to see if route has auth guard
		if( to.matched.some( rec => rec.meta.requiresAuth )) {

			//	check auth state of user
			let user = firebase.auth().currentUser
			if ( user ) {
				//	User is signed in
				//	proceed to route
				next()
			} else {
				//	no user is signed in
				//	redirect to login
				next({
					name: 'Login'
				})
			}
		} else {
			//	if route is not guarded by auth, proceed
			next()
		}
	})

	export default router

```
---
