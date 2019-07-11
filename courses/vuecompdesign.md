


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



