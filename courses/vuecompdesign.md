


<https://adamwathan.me/advanced-vue-component-design/>



Lession 1
# building controlled components



## toggle parent

template

```html

	<!--
		v-model is a shortcut for two events, output, input
		:value="email"
		@input="email = $event.target.value"
	-->

	<toggle-input
		:value="receiveNewsletter"
		@input="( newValue) => { receiveNewsletter = newValue }"
	>
	</toggle-input>

	<!--
		as we're using default names like value, input
		we can apply v-model as a shortcut by default
		vue will recongise & allow the bindings
	-->
	<toggle-input v-model="receiveNewsletter"></toggle-input>

```

script

```js

	import ToggleInput from './components/ToggleInput.vue'

	export default {
		components: {
			ToggleInput
		},
		data() {
			receiveNewsletter: false
		}
	}

```



## toggle component

template

```html

	<span
		role="checkbox"
		tabindex="0"
		:aria-checked="value.toString()"
		click="toggle"
		@keydown.space.prevent="toggle"
	>
	</span>

```

script

```js

	export default {
		props: [ 'value' ],
		methods: {
			toggle() {
				this.$emit( 'input', !this.value )
			}
		}
	}

```



Lession 2
# customizing controlled component bindings



## toggle component

template

```html

	<!--
		if we want to use custom names instead of the default value, input
		we can use model to specify the prop & event we want to take in & pass out
	-->

	<span
		role="checkbox"
		tabindex="0"
		:aria-checked="toggled.toString()"
		click="toggle"
		@keydown.space.prevent="toggle"
	>
	</span>

```

script

```js

	export default {
		model: {
			prop: 'toggled',
			event: 'toggle'
		},
		props: [ 'toggled' ],
		methods: {
			toggle() {
				this.$emit( 'toggle', !this.toggled )
			}
		}
	}

```



---



Lession 3
# wrapping external libraries



## parent

template

```html

	<!-- note:
		when passing in strings a normal variable like format will do
		when passing in objects we need a : infront of it
	-->
	<date-picker
		v-model="date"
		format="YYYY-MM-DD"
		:options="{ firstDay: 1 }"
	>
	</date-picker>

```

script

```js

	import Pikaday from 'pikaday'
	import DatePicker from './components/DatePicker.vue'

	export default {
		data() {
			return {
				date: '2019-07-07'
			}
		}
	}

```

## component

template

```html

	<input
		:value="value"
		type="text"
		ref="input"
		placeholder="YYYY-MM-DD"
	/>

```

script

```js

	import Pikaday from 'pikaday'

	export default {
		props: {
			value: { required: true },
			format: { default: 'YYYY-MM-DD' },
			options: { default: {} }
		},
		mounted() {
			const picker = new Pikaday({
				field: this.$refs.input,
				format: this.format,
				onSelect: () => {
					this.$emit( 'input', picker.toString() )
				},
				...this.options
			})
		}
	}

```



---



Lession 4
# encapsulating behavior - global events



**option 1**

-	add tabindex to make modal focusable
-	add css to hide focus outline of modal
-	watch for state change to focus on modal
-	use nexttick to wait for dom change to activate focus

## parent

template

```html

	<button type="button" @click="modalOpen = true">Open Modal</button>

	<announcement-modal
		:show="modalOpen"
		@close="modalOpen = false"
	>
	</announcement-modal>

```

script

```js

	import AnnouncementModal from './components/AnnouncementModal.vue'

	export default {
		components: {
			AnnouncementModal
		},
		data() {
			return {
				modalOpen: false
			}
		}
	}

```

## component

template

```html

	<div class="modal" ref="modal" @keydown.esc="dismiss" tabindex="0">
		<h1>Lorem ipsum.</h1>
		<button @click="dismiss" type="button"></button>
	</div>

```

script

```js

	export default {
		props: [ 'show' ],
		watch: {
			show( show ) {
				if ( show ) {
					this.$nextTick( () => {
						this.$refs.modal.focus()
					})
				}
			}
		},
		methods: {
			dismiss() {
				this.$emit( 'close' )
			}
		}
	}

```

css

```css

	.modal: focus {
		outline: 0;
	}

```



**option 2**

-	use global event listener in modal

## component

template

```html

	<div class="modal">
		<h1>Lorem ipsum.</h1>
		<button @click="dismiss" type="button"></button>
	</div>

```

script

```js

	export default {
		props: [ 'show' ],
		created() {
			this.escapeHandler = ( e ) => {
				if ( e.key === 'Escape' && this.show ) {
					this.dismiss()
				}
			}

			document.addEventListener( 'keydown', this.escapeHandler )
		},
		destroyed() {
			document.removeEventListener( 'keydown', this.escapeHandler )
		},
		methods: {
			dismiss() {
				this.$emit( 'close' )
			}
		}
	}

```

-	alternative way to handle removeEventListener
-	using this.$once to only run it one time
-	during when destroyed hook runs
-	since it's in same scope, we can use const variable
-	instead of this.var which is a component data prop

script

```js

	export default {
		props: [ 'show' ],
		created() {
			const escapeHandler = ( e ) => {
				if ( e.key === 'Escape' && this.show ) {
					this.dismiss()
				}
			}

			document.addEventListener( 'keydown', escapeHandler )

			this.$once( 'hook:destroyed', () => {
				document.removeEventListener( 'keydown', escapeHandler )
			})
		},
		methods: {
			dismiss() {
				this.$emit( 'close' )
			}
		}
	}

```


---



Lession 5
# encapsulating behavior - direct dom manipulation



script

```js

	export default {
		props: {
			show: { required: true },
			preventBgScroll: { default: true }
		}
		watch: {
			show( show ) {
				if ( show ) {
					this.preventBgScroll && document.body.style.setProperty( 'overflow', 'hidden' )
				} else {
					this.preventBgScroll && document.body.style.removeProperty( 'overflow' )
				}
			}
		}
	}

```

-	watcher doesn't run on start
-	only when value changes
-	so if eg. modal is open by default
-	the preventBgScroll doesn't get activated like it should
-	to solve it
-	make the watcher an object
-	pass immediate to true ( it's default was false )

script

```js

	export default {
		props: {
			show: { required: true },
			preventBgScroll: { default: true }
		}
		watch: {
			show: {
				immediate: true,
				handler: function( show ) {
					if ( show ) {
						this.preventBgScroll && document.body.style.setProperty( 'overflow', 'hidden' )
					} else {
						this.preventBgScroll && document.body.style.removeProperty( 'overflow' )
					}
				}
			}
		}
	}

```



---



Lession 6
# encapsulating behavior - portals



-	npm install portal-vue
-	render children of a component into difference place on dom hierarchy

## main.js

```js

	import PortalVue from 'portal-vue'

	Vue.use( PortalVue );

```

## parent

template

```html

	<user-settings-form
		:account-id="accountId"
	>
	</user-settings-form>

	<portal-target name="modals"></portal-target>

```

script

## component

template

```html

	<button>
		...
		<portal to="modals">
			<confirm-delete-modal
				...
			>
			</confirm-delete-modal>
		</portal>
	</button>

```



---



Lession 7
# encapsulating behavior - reusing portals



-	portal targets can only hold one content at a time
-	conditionally render component to solve this issue


## component

template

```html

	<!-- only render portal into target if... -->
	<portal to="modals" v-if="showAnnouncement">
		...
	</portal>

	<!-- only render portal into target if... -->
	<portal to="modals" v-if="confirmDeleteModalOpen">
		...
	</portal>

```



---



Lession 8
# injecting content using slots



## parent

template

```html

	<primary-button>
		Download
	</primary-button>

```

## component

template

```html

	<button type="button">
		<slot></slot>
	</button>

```

## parent

template

```html

	<media-card>
		<img src="..." slot="image">
		<template slot="heading">
			Heading text
		</template>
		<p>Body text</p>
	</media-card>

```

## component

template

```html

	<div class="media-card">
		<slot name="image"></slot>
		<h4 class="heading">
			<slot name="heading">
				Dedault heading if no heading passed in
			</slot>
		</h4>
		<div class="body">
			<slot></slot>
		</div>
	</div>

```



---



Lession 9
# native-style buttons using slots & class merging



-	vue will merge the parent's component class
-	into the actual component
-	so you can style the imported component from above

## parent

template

```html

	<delete-account-button class="text-red-dark">
		Cancel Account
	</delete-account-button>

```

## component

template

```html

	<button type="button" class="hover:underline">
		<slot></slot>
	</button>

```



---



Lession 10
# extending components using composition



## parent

template

```html

	<modal-dialog :show="show" @close="dismiss">
		<h1>Exciting new features are here!</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis placeat, obcaecati fuga laboriosam. Totam reiciendis dicta assumenda dolorem, dolores iure nemo repellendus officia deserunt id quas qui saepe, voluptas voluptates.</p>
		<button @click="dismiss" type="button">Dismiss</button>
	</modal-dialog>

```

script

```js

	import ModalDialog from './ModalDialog.vue'

	export default {
		components: {
			ModalDialog
		},
		props: [ 'show' ],
		methods: {
			dismiss() {
				this.$emit( 'close' )
			}
		}
	}

```

## component

template

```html

	<div class="modal-backdrop" v-show="show">
		<div class="modal">
			<slot></slot>
		</div>
	</div>

```

script

```js

	export default {
		props: [ 'show' ],
		watch: {
			show: {
				immediate: true,
				handler: ( show ) => {
					if ( show ) {
						document.body.style.setProperty( 'overflow', 'hidden' )
					} else {
						document.body.style.removeProperty( 'overflow' )
					}
				}
			}
		},
		methods: {
			cancel() {
				this.$emit( 'close' )
			}
		},
		created() {
			const escapeHandler = ( e ) => {
				if ( e.key === 'Escape' && this.show ) {
					this.cancel()
				}
			}

			document.addEventListener( 'keydown', escapeHandler )
			this.$once( 'hook:destroyed', () => {
				document.removeEventListener( 'keydown', escapeHandler )
			})
		}
	}

```



---



Lession 11
# passing data up using scoped slots



## parent

**option 1**

template

```html

	<!-- pass pseudo-slot as a prop down which is a function which can be run in component -->
	<contact-list
		:pseudo-slot="( contact ) => contact.name.first"
	>
	</contact-list>

	<!-- 1b option -->
	<contact-list
		:pseudo-slot="( prop ) => prop.contact.name.first"
	>
	</contact-list>

	<!-- using es6 destructuring -->
	<contact-list
		:pseudo-slot="({ contact }) => contact.name.first"
	>
	</contact-list>

```

## component

template

```html

	<!-- pass contact data from component up by running pseudo slot ( prop ) function -->
	<!-- which in turns pass the results back down -->
	<div>
		{{ pseudoSlot( contact ) }}
	</div>

	<!-- 1b option -->
	<div>
		{{ pseudoSlot({ contact: contact }) }}
	</div>

```

script

```js

	export default {
		props: [ 'pseudoSlot']
	}

```



**option 2**

template

```html

	<contact-list>
		<a slot-scope="props" :href="`/contact/${ props.contact.id }`">
			{{ contact.name.first }}
		</a>
	</contact-list>

	<!-- using es6 destructuring -->
	<contact-list>
		<a slot-scope="{ contact }" :href="`/contact/${ contact.id }`">
			{{ contact.name.first }}
		</a>
	</contact-list>

```

## component

template

```html

	<!-- passing up a key/value pair -->
	<slot :contact="contact"></slot>

```



---



Lession 12
# render functions 101



## parent

template

```html

	<!--
		to render this span template below
		we can use instead use the render function too
		thus we don't need the span below
	-->

	<span class="text-xl text-blue font-bold">
		Hello world!
	</span>

```

script

```js

	export default {
		render( createElement ) {
			//	( element, attributes, children )
			return createElement( 'span', {
				attrs: {
					class: 'text-xl text-blue font-bold'
				}
			}, 'Hello world!' )
		}
	}

```



**the use for this**

## parent

template

```html

	<hello-world tag="button"></hello-world>

```

script

```js

	import HelloWorld from './components/HelloWorld.vue'

	export default {
		components: {
			HelloWorld
		}
	}

```

## component

template

```html

	<!-- no need html template in this case -->

```

script

```js

	export default {
		props: [ 'tag' ],
		render( createElement ) {
			return createElement( this.tag, {
				attrs: {
					class: 'blue'
				}
			}, 'Hello world!' )
		}
	}

```



**adding event handlers**

## parent

template

```html

	<hello-world tag="button"></hello-world>

```

script

```js

	import HelloWorld from './components/HelloWorld.vue'

	export default {
		components: {
			HelloWorld
		}
	}

```

## component

template

```html

	<!-- no need html template in this case -->

```

script

```js

	export default {
		props: [ 'tag' ],
		render( createElement ) {
			//	this.tag comes from top & determines the tag holding the template content
			return createElement( this.tag, {
				attrs: {
					class: 'blue'
				},
				//	emitting a click $event
				on: {
					click: () => alert( 'Clicked!' )
				}
			}, 'Hello world!' )
		}
	}

```



---



Lession 13
# render functions & components



## parent

script

```js

	import PrimaryButton from './PrimaryButton.vue'

	export default {
		render( createElement ) {
			return createElement( PrimaryButton, {
				//	native browser click
				nativeOn: {
					click: () => alert( 'Clicked!' )
				}
			}, 'Hello world!' )
		}
	}

```



**another example**

## parent

script

```js

	import ToggleInput from './ToggleInput.vue'

	export default {
		data() {
			return {
				toggled: true
			}
		},
		render( createElement ) {
			return createElement( ToggleInput, {
				props: {
					value: this.toggled
				},
				on: {
					input: ( newValue ) => this.toggled = newValue
				}
			})
		}
	}

```

## component

template

```html

	<span
		class="toggle"
		role="checkbox"
		tableindex="0"
		@click="toggle"
		@keydown.space.prevent="toggle"
		:aria-checked="value.toString()"
	>
	</span>

```

script

```js

	export default {
		props: [ 'value' ],
		methods: {
			toggle() {
				this.$emit( 'input', !this.value )
			}
		}
	}

```



---



Lession 14
# render functions & children



## parent

script

```js
	import contacts from '../contacts.json'

	export default {
		data() {
			return {
				contacts
			}
		}
		render( createElement ) {
			return createElement( 'div', {}, [
				createElement( 'h1', {}, 'Your Contacts' ),
				createElement( 'ul', {}, this.contacts.map( contact => {
					return createElement( 'li', {}, `${ contact.name.first } ${ contact.name.last }` )
				}))
			])
		}
	}

```



---



Lession 15
# render functions & slots



## parent

template

```html

	<hello-world>
		hello universe
	</hello-world>

```

script

```js

	import HelloWorld from './components/HelloWorld.vue'

	export default {
		components: {
			HelloWorld
		}
	}

```

## component

script

```js

	export default {
		render( createElement ) {
			return createElement( 'span', {
				attrs: {
					class: 'text-xl text-blue font-bold'
				}
			}, [
				this.$slots.default
			])
		}
	}

```



**scoped slot**

## parent

template

```html

	<hello-world>
		<template slot-scope="{ subject }">
			hello {{ subject }}
		</template>
	</hello-world>

```

script

```js

	import HelloWorld from './components/HelloWorld.vue'

	export default {
		components: {
			HelloWorld
		}
	}

```

## component

script

```js

	export default {
		render( createElement ) {
			return createElement( 'span', {
				attrs: {
					class: 'text-xl text-blue font-bold'
				}
			}, [
				this.$scopedSlots.default({
					subject: 'universe'
				})
			])
		}
	}

```



**scoped slot simplier**

## parent

template

```html

	<hello-world>
		<strong slot-scope="{ subject }">
			hello {{ subject }}
		</strong>
	</hello-world>

```

script

```js

	import HelloWorld from './components/HelloWorld.vue'

	export default {
		components: {
			HelloWorld
		}
	}

```

## component

script

```js

	export default {
		render( createElement ) {
			return this.$scopedSlots.default({
				subject: 'universe'
			})
		}
	}

```



---



Lession 16
# data provider components



## parent

template

```html

	<fetch-json url="/contacts.json">
		<div class="card" slots-scope="{ json: contacts, loading }">
			<div v-if="loading">Loading...</div>
			<div v-else>
				<div v-for="contact in contacts" :key="contact.id">
					{{ contact.name.first }}
				</div>
			</div>
		</div>
	</fetch-json>

```

script

```js

	import FetchJson from './components/FetchJson.vue'

	export default {
		components: {
			FetchJson
		}
	}

```

## component

script

```js

	export default {
		props: [ 'url' ],
		data() {
			return {
				json: null,
				loading: true
			}
		},
		created() {
			fetch( this.url )
				.then( response => response.json() )
				.then( json => {
					this.json = json
					this.loading = false
				})
		},
		render() {
			return this.$scopedSlots.default({
				json: this.json,
				loading: this.loading
			})
		}
	}

```



---



Lession 17
# getting started with renderless components



## parent

template

```html

	<renderless-tag-input>
		<div slot-scope="{ }">

		</div>
	</renderless-tag-input>

```

script

```js

	import RenderlessTagInput from './components/RenderlessTagInput.vue'

	export default {
		components: {
			RenderlessTagInput
		},
		data() {
			return {
				tags: [ 'awesome', 'excellent', 'amazing' ]
			}
		}
	}

```

## component

script

```js

	export default {
		render() {
			return this.$scopedSlots.default({

			})
		}
	}

```



---



Lession 18
# passing data props



## parent

template

```html

	<renderless-tag-input v-model="tags">
		<div slot-scope="{ tags }">
			<span v-for="tag in tags" :key="tag">
				{{ tag }}
			</span>
		</div>
	</renderless-tag-input>

```

script

```js

	import RenderlessTagInput from './components/RenderlessTagInput.vue'

	export default {
		components: {
			RenderlessTagInput
		},
		data() {
			return {
				tags: [ 'awesome', 'excellent', 'amazing' ]
			}
		}
	}

```

## component

script

```js

	export default {
		model: {
			prop: 'tags',
			event: 'update'
		},
		props: [ 'tags' ],
		render() {
			return this.$scopedSlots.default({
				tags: this.tags
			})
		}
	}

```



---



Lession 19
# passing action props



## parent

template

```html

	<renderless-tag-input v-model="tags">
		<div slot-scope="{ tags, removeTag }">
			<span v-for="tag in tags" :key="tag">
				{{ tag }}
				<button @click="removeTag( tag )">
				</button>
			</span>
		</div>
	</renderless-tag-input>

```

script

```js

	import RenderlessTagInput from './components/RenderlessTagInput.vue'

	export default {
		components: {
			RenderlessTagInput
		},
		data() {
			return {
				tags: [ 'awesome', 'excellent', 'amazing' ]
			}
		}
	}

```

## component

script

```js

	export default {
		model: {
			prop: 'tags',
			event: 'update'
		},
		props: [ 'tag' ],
		methods: {
			removeTag( tag ) {
				this.$emit( 'update', this.tags.filter( t => t !=== tag ) )
			}
		},
		render() {
			return this.$scopedSlots.default({
				tags: this.tags,
				removeTag: this.removeTag
			})
		}
	}

```



---



Lession 20
# passing binding props



-	these 3 are the same
	-	:value="inputValue"
	-	v-bind:value="inputValue"
	-	v-bind="{ value: inputValue }"

## parent

template

```html

	<renderless-tag-input v-model="tags">
		<div slot-scope="{ tags, removeTag, inputProps, inputEvents }">
			<span v-for="tag in tags" :key="tag">
				{{ tag }}
				<button @click="removeTag( tag )"></button>
			</span>
			<input placeholder="Add tag..."
				v-bind="inputProps"
				v-on="inputEvents"
			>
		</div>
	</renderless-tag-input>

```

script

```js

	import RenderlessTagInput from './components/RenderlessTagInput.vue'

	export default {
		components: {
			RenderlessTagInput
		},
		data() {
			return {
				tags: [ 'awesome', 'excellent', 'amazing' ]
			}
		}
	}

```

## component

script

```js

	export default {
		model: {
			prop: 'tags',
			event: 'update'
		},
		props: [ 'tag' ],
		data() {
			return {
				input: ''
			}
		},
		computed: {
			newTag() {
				return this.input.trim()
			}
		},
		methods: {
			removeTag( tag ) {
				this.$emit( 'update', this.tags.filter( t => t !=== tag ) )
			},
			addTag() {
				if ( this.newTag.length === 0 || this.tags.includes( this.newTag ) ) {
					return
				}
				this.$emit( 'update', [ ...this.tags, this.newTag ] )
				this.clearInput()
			},
			clearInput() {
				this.input = ''
			},
			handleBackspace( e ) {
				if ( this.newTag.length === 0 ) {
					this.$emit( 'update', this.tags.slice( 0, -1 ) )
				}
			}
		},
		render() {
			return this.$scopedSlots.default({
				tags: this.tags,
				removeTag: this.removeTag,
				inputProps: {
					value: this.input
				},
				inputEvents: {
					input: e => this.input = e.target.value,
					keydown: e => {
						if ( e.key === 'Backspace' ) {
							this.handleBackspace()
						}

						if ( e.key === 'Enter' ) {
							e.preventDefault()
							this.addTag()
						}
					}
				}
			})
		}
	}

```



---



Lession 21
# using functions as binding props



-	const barker = () => ({ bark: () => console.log( 'woof' ) })
-	is the same as
-	const barker = () => { return { bark: () => console.log( 'woof' ) } }

## parent

template

```html

	<renderless-tag-input v-model="tags">
		<div slot-scope="{ tags, removeTag, removeButtonEvents, inputProps, inputEvents }">
			<span v-for="tag in tags" :key="tag">
				{{ tag }}
				<button v-on="removeButtonEvents( tag )"></button>
			</span>
			<input placeholder="Add tag..."
				v-bind="inputProps"
				v-on="inputEvents"
			>
		</div>
	</renderless-tag-input>

```

script

```js

	import RenderlessTagInput from './components/RenderlessTagInput.vue'

	export default {
		components: {
			RenderlessTagInput
		},
		data() {
			return {
				tags: [ 'awesome', 'excellent', 'amazing' ]
			}
		}
	}

```

## component

script

```js

	export default {
		model: {
			prop: 'tags',
			event: 'update'
		},
		props: [ 'tag' ],
		data() {
			return {
				input: ''
			}
		},
		computed: {
			newTag() {
				return this.input.trim()
			}
		},
		methods: {
			removeTag( tag ) {
				this.$emit( 'update', this.tags.filter( t => t !=== tag ) )
			},
			addTag() {
				if ( this.newTag.length === 0 || this.tags.includes( this.newTag ) ) {
					return
				}
				this.$emit( 'update', [ ...this.tags, this.newTag ] )
				this.clearInput()
			},
			clearInput() {
				this.input = ''
			},
			handleBackspace( e ) {
				if ( this.newTag.length === 0 ) {
					this.$emit( 'update', this.tags.slice( 0, -1 ) )
				}
			}
		},
		render() {
			return this.$scopedSlots.default({
				tags: this.tags,
				removeTag: this.removeTag,
				removeButtonEvents: ( tag ) => ({
					click: () => {
						this.removeTag( tag )
					}
				}),
				inputProps: {
					value: this.input
				},
				inputEvents: {
					input: e => this.input = e.target.value,
					keydown: e => {
						if ( e.key === 'Backspace' ) {
							this.handleBackspace()
						}

						if ( e.key === 'Enter' ) {
							e.preventDefault()
							this.addTag()
						}
					}
				}
			})
		}
	}

```



---



Lession 22
# implementing alternate layouts with renderless components



-	you can essentially use any layout with this renderless component
-	by passing in the layout as a slot

## parent

template

```html

	<renderless-tag-input v-model="tags">
		<div class="stacked-tag-input"
			slot-scope="{ tags, addTag, removeButtonEvents, inputProps, inputEvents }"
		>
			<div class="stacked-tag-input-form">
				<input class="form-input" placeholder="Add tag..."
					v-bind="inputProps"
					v-on="inputEvents"
				>
				<button class="btn btn-indigo"
					@click="addTag"
				>
					Add Tag
				</button>
			</div>
			<ul class="stacked-tag-list">
				<li v-for="tag in tags" :key="tag">
					{{ tag }}
					<button type="button" class="stacked-tag-link"
						v-on="removeButtonEvents( tag )"
					>
						Remove
					</button>
				</li>
			</ul>
		</div>
	</renderless-tag-input>

```

script

```js

	import RenderlessTagInput from './components/RenderlessTagInput.vue'

	export default {
		components: {
			RenderlessTagInput
		},
		data() {
			return {
				tags: [ 'awesome', 'excellent', 'amazing' ]
			}
		}
	}

```

## component

script

```js

	export default {
		model: {
			prop: 'tags',
			event: 'update'
		},
		props: [ 'tag' ],
		data() {
			return {
				input: ''
			}
		},
		computed: {
			newTag() {
				return this.input.trim()
			}
		},
		methods: {
			removeTag( tag ) {
				this.$emit( 'update', this.tags.filter( t => t !=== tag ) )
			},
			addTag() {
				if ( this.newTag.length === 0 || this.tags.includes( this.newTag ) ) {
					return
				}
				this.$emit( 'update', [ ...this.tags, this.newTag ] )
				this.clearInput()
			},
			clearInput() {
				this.input = ''
			},
			handleBackspace( e ) {
				if ( this.newTag.length === 0 ) {
					this.$emit( 'update', this.tags.slice( 0, -1 ) )
				}
			}
		},
		render() {
			return this.$scopedSlots.default({
				tags: this.tags,
				removeTag: this.removeTag,
				addTag: this.addTag,
				removeButtonEvents: ( tag ) => ({
					click: () => {
						this.removeTag( tag )
					}
				}),
				inputProps: {
					value: this.input
				},
				inputEvents: {
					input: e => this.input = e.target.value,
					keydown: e => {
						if ( e.key === 'Backspace' ) {
							this.handleBackspace()
						}

						if ( e.key === 'Enter' ) {
							e.preventDefault()
							this.addTag()
						}
					}
				}
			})
		}
	}

```



---



Lession 23
# configuring renderless components



## parent

template

```html

	<renderless-tag-input v-model="tags" :remove-on-backspace="false">
		<div class="stacked-tag-input"
			slot-scope="{ tags, addTag, removeButtonEvents, inputProps, inputEvents }"
		>
			<div class="stacked-tag-input-form">
				<input class="form-input" placeholder="Add tag..."
					v-bind="inputProps"
					v-on="inputEvents"
				>
				<button class="btn btn-indigo"
					@click="addTag"
				>
					Add Tag
				</button>
			</div>
			<ul class="stacked-tag-list">
				<li v-for="tag in tags" :key="tag">
					{{ tag }}
					<button type="button" class="stacked-tag-link"
						v-on="removeButtonEvents( tag )"
					>
						Remove
					</button>
				</li>
			</ul>
		</div>
	</renderless-tag-input>

```

script

```js

	import RenderlessTagInput from './components/RenderlessTagInput.vue'

	export default {
		components: {
			RenderlessTagInput
		},
		data() {
			return {
				tags: [ 'awesome', 'excellent', 'amazing' ]
			}
		}
	}

```

## component

script

```js

	export default {
		model: {
			prop: 'tags',
			event: 'update'
		},
		props: {
			tags: { required: true },
			removeOnBackspace: { default: true }
		},
		data() {
			return {
				input: ''
			}
		},
		computed: {
			newTag() {
				return this.input.trim()
			}
		},
		methods: {
			removeTag( tag ) {
				this.$emit( 'update', this.tags.filter( t => t !=== tag ) )
			},
			addTag() {
				if ( this.newTag.length === 0 || this.tags.includes( this.newTag ) ) {
					return
				}
				this.$emit( 'update', [ ...this.tags, this.newTag ] )
				this.clearInput()
			},
			clearInput() {
				this.input = ''
			},
			handleBackspace( e ) {
				if ( this.newTag.length === 0 ) {
					this.$emit( 'update', this.tags.slice( 0, -1 ) )
				}
			}
		},
		render() {
			return this.$scopedSlots.default({
				tags: this.tags,
				removeTag: this.removeTag,
				addTag: this.addTag,
				removeButtonEvents: ( tag ) => ({
					click: () => {
						this.removeTag( tag )
					}
				}),
				inputProps: {
					value: this.input
				},
				inputEvents: {
					input: e => this.input = e.target.value,
					keydown: e => {
						if ( e.key === 'Backspace' && this.removeOnBackspace ) {
							this.handleBackspace()
						}

						if ( e.key === 'Enter' ) {
							e.preventDefault()
							this.addTag()
						}
					}
				}
			})
		}
	}

```



---



Lession 24
# wrapping renderless components



-	component inside component

## parent

template

```html

	<stacked-tag-input v-model="tags"></stacked-tag-input>

```

script

```js

	import StackedTagInput from './components/StackedTagInput.vue'

	export default {
		components: {
			StackedTagInput
		},
		data() {
			return {
				tags: [ 'awesome', 'excellent', 'amazing' ]
			}
		}
	}

```

## component

template

```html

	<renderless-tag-input
		:tags="tags"
		@update="(newTags) => $emit('update', newTags)"
		:remove-on-backspace="false"
	>
		<div class="stacked-tag-input"
			slot-scope="{ tags, addTag, removeButtonEvents, inputProps, inputEvents }"
		>
			<div class="stacked-tag-input-form">
				<input class="form-input" placeholder="Add tag..."
					v-bind="inputProps"
					v-on="inputEvents"
				>
				<button class="btn btn-indigo"
					@click="addTag"
				>
					Add Tag
				</button>
			</div>
			<ul class="stacked-tag-list">
				<li v-for="tag in tags" :key="tag">
					{{ tag }}
					<button type="button" class="stacked-tag-link"
						v-on="removeButtonEvents( tag )"
					>
						Remove
					</button>
				</li>
			</ul>
		</div>
	</renderless-tag-input>

```

script

```js

	import RenderlessTagInput from "./RenderlessTagInput.vue"

	export default {
		components: {
			RenderlessTagInput
		},
		model: {
			prop: "tags",
			event: "update"
		},
		props: {
			tags: { required: true }
		}
	}

```



---



Lession 25
# building an element query component



-	element resize detector library

## parent

template

```html

	<width-dimensions>
		<div
			slot-scope="{ width }"
			class="profile-card"
			:class="{ 'profile-card--horizontal': width >= 400 }"
		>
			... stuff
		</div>
	</width-dimensions>

```

script

```js
	import WidthDimensions from './components/WidthDimensions.vue'

	export default {
		components: {
			WidthDimensions
		}
	}

```

## component

script

```js
	import elementResizeDetectorMaker from 'element-resize-detector'

	const erd = elementResizeDetectorMaker({ strategy: 'scroll' })

	export default {
		data() {
			width: null,
			height: null
		},
		mounted() {
			erd.listenTo( this.$el, ( el ) => {
				this.width = el.offsetWidth
				this.height = el.offsetHeight
			})
		},
		render() {
			return this.$scopedSlots.default({
				width: this.width,
				height: this.height
			})
		}
	}

```



---



Lession 26
# compound components & provideInject



## parent

template

```html

	<accordion-list>
		<accordion-item :item-id="1">
			<template slot="header">Item A</template>
			<template slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</template>
		</accordion-item>
		<accordion-item :item-id="2">
			<template slot="header">Item B</template>
			<template slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</template>
		</accordion-item>
		<accordion-item :item-id="3">
			<template slot="header">Item C</template>
			<template slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</template>
		</accordion-item>
	</accordion-list>

```

## component : accordion-list

template

```html

	<div class="accordion-list">
		<slot></slot>
	</div>

```

script

```js

	export default {
		provide() {
			return {
				accordionListState: this.sharedState
			}
		},
		data() {
			return {
				//	return an object to make it reactive
				//	returning activeItem on its on as per usual data, non reactive
				sharedState: {
					activeItem: 1
				}
			}
		}
	}

```

## component : accordion-item

template

```html

	<div class="accordion-item">
		<div @click="toggle" role="button" class="accordion-item-header">
			<slot name="header"></slot>
			<svg class="icon" :class="{ 'rotate-90': active }">...</svg>
		</div>
		<div class="accordion-item-body" v-show="active">
			<slot name="content"></slot>
		</div>
	</div>

```

script

```js

	export default {
		inject: [ 'accordionListState' ],
		props: [ 'itemId' ],
		computed: {
			active() {
				return this.accordionListState.activeItem === this.itemId
			}
		},
		methods: {
			toggle() {
				this.accordionListState.activeItem = this.active ? null : this.itemId
			}
		}
	}

```



---



Lession 27
# building a compound sortable list component



-	draggable library

## parent

template

```html

	<sortable-list v-model="contacts" item-class="something-else" handle-class="if-i-want">
		<div class="contact-list" slot-scope="{ items: contacts }">
			<sortable-item v-for="contact in contacts" :key="contact.id">
				<div class="contact-list-item">
					<div class="contact-list-contact">
						<img :src="contact.avatar" class="contact-list-avatar">
						<div>
							<div class="contact-list-name">
								{{ contact.name }}
							</div>
							<div class="contact-list-email">
								{{ contact.email }}
							</div>
						</div>
					</div>
					<sortable-handle>
						<svg class="contact-list-handle">...</svg>
					</sortable-handle>
				</div>
			</sortable-item>
		</div>
	</sortable-list>

```

script

```js
	import SortableList from './components/SortableList.vue'
	import SortableItem from './components/SortableItem.vue'
	import SortableHandle from './components/SortableHandle.vue'

	export default {
		components: {
			SortableList,
			SortableItem,
			SortableHandle
		},
		data() {
			return {
				contacts: [
					{ ... },
					{ ... }
				]
			}
		}
	}

```

## component : sortable-list

script

```js

	import { Sortable } from '@shopify/draggable'

	//	helper function
	function move( items, oldIndex, newIndex ) {
		const itemRemovedArray = [
			...items.slice( 0, oldIndex ),
			...items.slice( oldIndex, + 1, items.length )
		]

		return [
			...itemRemovedArray.slice( 0, newIndex ),
			items[ oldIndex ],
			...itemRemovedArray.slice( newIndex, itemRemovedArray.length )
		]
	}

	export default {
		props: {
			value: {
				required: true
			},
			itemClass: {
				default: 'sortable-list-item'
			},
			handleClass: {
				default: 'sortable-list-handle'
			}
		},
		provide() {
			return {
				sortableListItemClass: this.itemClass,
				sortableListHandleClass: this.handleClass
			}
		},
		mounted() {
			new Sortable( this.$el, {
				draggable: `.${ this.itemClass }`,
				handle: `.${ this.handleClass }`,
				mirror: {
					constrainDimensions: true
				}
			}).on( 'sortable:stop', ({ oldIndex, newIndex })=> {
				this.$emit( 'input', move( this.value, oldIndex, newIndex ) )
			})
		},
		render() {
			return this.$scopedSlots.default({
				items: this.value
			})
		}
	}

```

## component : sortable-item

script

```js

	export default {
		inject: [ 'sortableListItemClass' ],
		mounted() {
			this.$el.classList.add( this.sortableListItemClass )
		},
		render() {
			return this.$slots.default[ 0 ]
		}
	}

```

## component : sortable-handle

script

```js

	export default {
		inject: [ 'sortableListHandleClass' ],
		mounted() {
			this.$el.classList.add( this.sortableListHandleClass )
		},
		render() {
			return this.$slots.default[ 0 ]
		}
	}

```



---



Lession 28
# building a search select - data bindings



## component

template

```html

	<div class="search-select" :class="{ 'is-active': isOpen }">
		<button @click="open" type="button" class="search-select-input">
			<span v-if="value !== null">{{ value }}</span>
			<span v-else class="search-select-placeholder">Select a band...</span>
		</button>
		<div v-show="isOpen" class="search-select-dropdown">
			<input class="search-select-search">
			<ul class="search-select-options">
				<li
					class="search-select-option"
					v-for="option in options"
					:key="option"
					@click="select( option )"
				>
					{{ option }}
				</li>
			</ul>
		</div>
	</div>

```

script

```js

	export default {
		data() {
			return {
				isOpen: false,
				value: null,
				options: [
					'...',
					'...'
				]
			}
		},
		methods: {
			open() {
				this.isOpen = true
			},
			close() {
				this.isOpen = false
			},
			select( option ) {
				this.value = option
				this.close()
			}
		}
	}

```



---



Lession 29
# building a search select - filtering



## component

template

```html

	<div class="search-select" :class="{ 'is-active': isOpen }">
		<button @click="open" type="button" class="search-select-input">
			<span v-if="value !== null">{{ value }}</span>
			<span v-else class="search-select-placeholder">Select a band...</span>
		</button>
		<div v-show="isOpen" class="search-select-dropdown">
			<input v-model="search" class="search-select-search">
			<ul v-show="filteredOptions.length > 0" class="search-select-options">
				<li
					class="search-select-option"
					v-for="option in filteredOptions"
					:key="option"
					@click="select( option )"
				>
					{{ option }}
				</li>
			</ul>
			<div v-show="filteredOptions.length === 0" class="search-select-empty">
				No results found for "{{ search }}"
			</div>
		</div>
	</div>

```

