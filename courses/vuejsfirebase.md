


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


---



# project two - real-time chat app



-



---



# project one - geo ninjas



-



---
