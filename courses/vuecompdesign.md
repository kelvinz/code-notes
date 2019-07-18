


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



