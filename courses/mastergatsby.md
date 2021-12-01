


<https://mastergatsby.com/>



# getting setup



## welcome
## tooling & starter file setup



---



# gatsby basics



## what is gatsby? why is it so awesome?

- static site generator, pre-rendered pages in build phase rather than dynamically load stuff on browser
- splits required css for each page for faster loading
- partial hydration with dynamic app with static html
- lazy load images automatically, compressed, format
- routing easily, automatically
- huge plugin library, ready for use



## pages in gatsby

- *public* folder is what you build into & deploy
- *static* are files to be served without processing
- *pages* folder in src auto generate routes ( index.js )

```code
// index.js

import React from 'react'

export default function HomePage() {
	return (
		<div>
			<p>Im the home page</p>
		</div>
	)
}

;```



## routing & navigation in gatsby

```code
// components > Nav.js

import React from 'react'
import { Link, navigate } from 'gatsby'

// can use arrow format too
// const Nav = () => ()

function goToBeers() {
	// replace true to add to history
	navigate( '/beers', { replace: true } )
}

export default function Nav() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<button type="button" onClick={ goToBeers }>
					Beers
				</button>
			</ul>
		</nav>
	)
}

;```

```code
// index.js

import React from 'react'
import Nav from '../components/Nav'

export default function HomePage() {
	return (
		<div>
			<Nav />
			<p>Im the home page</p>
		</div>
	)
}

;```



## creating layouts in gatsby

```code

// components > Footer.js

import React from 'react'

export default function Footer() {
	return (
		<footer>
			<p>&copy; Slick's slices { new Date().getFullYear() }</p>
		</footer>
	)
}

;```

```code

// components > Layout.js

import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

// export default function Layout( props )
// { props.children }
export default function Layout({ children }) {
	return (
		<div>
			<Nav />
			{ children }
			<Footer />
		</div>
	)
}

;```

```code
// index.js

import React from 'react'
import Nav from '../components/Nav'
import Layout from '../components/Layout'

export default function HomePage() {
	return (
		<Layout>
			<p>Im the home page</p>
		</Layout>
	)
}

;```

```code

// if you want to auto wrap pages in Layout instead of typing it in each page
// root > gatsby-browser.js

import React from 'react'
import Layout from './src/components/Layout'

export function wrapPageElement({ element, props }) {
	return <Layout { ...props }>{ element }</Layout>
}


;```

```code

// for server rendering
// root > gatsby-ssr.js

import React from 'react'
import Layout from './src/components/Layout'

export function wrapPageElement({ element, props }) {
	return <Layout { ...props }>{ element }</Layout>
}


;```



---



# css in gatsby



## global styles

```code

// components > Layout.js

import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import 'normalize.css'
import GlobalStyles from '../styles/GlobalStyles'

// export default function Layout( props )
// { props.children }
export default function Layout({ children }) {
	return (
		<div>
			<GlobalStyles />
			<Nav />
			{ children }
			<Footer />
		</div>
	)
}

;```



## typography

```code

import { createGlobalStyle } from 'styled-components'
import font from '../assets/fonts/frenchfries.woff'

const Typography = createGlobalStyle`
	@font-face {
		font-family: Frechfries;
		src: url( ${ font } )
	}
	html {
		font-family: Frenchfries, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
		color: var( --black );
	}

`

export default Typography

;```



## styling the nav & logo

```code

import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const NavStyles = styled.nav`
	background: red;
`

export default function Nav() {
	return (
		<NavStyles>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<button type="button" onClick={ goToBeers }>
					Beers
				</button>
			</ul>
		</NavStyles>
	)
}

;```



## styling our layout

```code

import Stripes from '../assets/images/stripes.svg'

const SiteBorderStyles = styled.div`
	max-width: 1000px;
	margin: 12rem auto 4rem auto; // in case browser don't support clamp
	margin-top: clamp( 2rem, 10vw, 12rem );
	background: white url( ${ stripes } );
	background-size: 1500px;
	padding: 5px;
	padding: clamp( 5px, 1vw, 25px );
	box-shadow: 0 0 5px 3px rgba( 0, 0, 0, 0.044 );
	border: 5px solid white;
	@media( max-width: 1100px ) {
		margin-left: 1.5rem;
		margin-right: 1.5rem;
	}
`

const ContentStyles = styled.div`
	background: white;
	padding: 2rem;
`

;```

**sidenote**

react fragments
<>
...
</>

are similar to vue template
<template>
...
</template>

as root of components need to be single node
these can be used to group them & render into nothing if you don't want to wrap in additional div



---



# headless cms



## setting up our headless

npm install -g @sanity/cli
sanity init
sanity init --reconfigure
npm start

/schemas/pizza.js

```code

export default {
	name: 'pizza',
	title: 'Pizzas',
	type: 'document',
	icon: () => `🍕`,
	fields: [
		{
			name: 'name',
			title: 'Pizza Name',
			type: 'string',
			description: 'Name of the pizza',
		},
		{
			name: 'slug',
			title: 'slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 100,
			},
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'price',
			title: 'Price',
			type: 'number',
			description: 'Price of pizza in cents',
			validation: Rule => Rule.min(1000),
		},
	],
}

;```

/schemas/schema.js

```code

import pizza from './pizza'

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([ pizza ])
})

;```



## creating the toppings content type & custom previews

/schemas/toppings.js

```code

export default {
	name: 'pizza',
	title: 'Pizzas',
	type: 'document',
	icon: () => `🥓`,
	fields: [
		{
			name: 'name',
			title: 'Topping Name',
			type: 'string',
			description: 'What is the name of the topping?',
		},
		{
			name: 'vegetarian',
			title: 'Vegetarian',
			type: 'boolean',
			description: 'Is this vegetarian?',
			options: {
				layout: 'checkbox',
			},
		},
	],
	preview: {
		select: {
			name: 'name',
			vegetarian: 'vegetarian',
		},
		// prepare: fields => ({
		//	title: `${ fields.name } ${ fields.vegetarian ? '🥬' : '🍖' }`,
		// }),
		prepare: ({ name, vegetarian }) => ({
			title: `${ name } ${ vegetarian ? '🥬' : '🍖' }`,
		}),
	},
}

;```

/schemas/schema.js

```code

import pizza from './pizza'
import topping from './topping'

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([ pizza, topping ])
})

;```



## creating data relationships

/schemas/pizza.js

```code

export default {
	name: 'pizza',
	title: 'Pizzas',
	type: 'document',
	icon: () => `🍕`,
	fields: [
		{
			name: 'name',
			title: 'Pizza Name',
			type: 'string',
			description: 'Name of the pizza',
		},
		{
			name: 'slug',
			title: 'slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 100,
			},
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'price',
			title: 'Price',
			type: 'number',
			description: 'Price of pizza in cents',
			validation: Rule => Rule.min(1000),
		},
		{
			name: 'toppings',
			title: 'Toppings',
			type: 'array',
			// of: [{ type: 'string' }],
			of: [{
				type: 'reference',
				to: [{ type: 'topping' }],
			}],
		},
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
			topping0: 'toppings.0.name',
			topping1: 'toppings.1.name',
			topping2: 'toppings.2.name',
			topping3: 'toppings.3.name',
		},
		prepare: ({ title, media, ...toppings }) => {
			// filter undefined toppings
			const tops = Object.values( toppings ).filter( Boolean )
			return {
				title: title,
				media: media,
				subtitle: tops.join( ', ' ),
			}
		},
	},
}

;```



## creating our person data type

/schemas/person.js

```code

export default {
	name: 'person',
	title: 'Slicemasters',
	type: 'document',
	icon: () => `👶🏻`,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 100,
			},
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			description: 'Tell us a bit about this person',
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
	],
}

;```

/schemas/schema.js

```code

import pizza from './pizza'
import topping from './topping'
import person from './person'

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([ pizza, topping, person ])
})

;```



## custom cms inputs in sanity

/components/PriceInput.js

```code

import React from 'react'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

function createPatchFrom( value ) {
	return PatchEvent.from( value === '' ? unset() : set( Number( value ) ) )
}

const formatMoney = Intl.NumberFormat( 'en-CA', {
	style: 'currency',
	currency: 'CAD',
}).format

export default function PriceInput({ type, value, onChange, inputComponent }) {
	return (
		<div>
			<h2>{ type.title } - { value ? formatMoney( value / 100 ) : '' }</h2>
			<p>{ type.description }</p>
			<input
				type={ type.name } value={ value }
				onChange={ event => onChange( createPatchFrom( event.target.value ) ) }
				ref={ inputComponent }
			/>
		</div>
	)
}

PriceInput.focus = function() {
	this._inputElement.focus()
}

;```

/schemas/pizza.js

```code

import PriceInput from '../components/PriceInput'

export default {
	name: 'pizza',
	title: 'Pizzas',
	type: 'document',
	icon: () => `🍕`,
	fields: [
		{
			name: 'name',
			title: 'Pizza Name',
			type: 'string',
			description: 'Name of the pizza',
		},
		{
			name: 'slug',
			title: 'slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 100,
			},
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'price',
			title: 'Price',
			type: 'number',
			description: 'Price of pizza in cents',
			validation: Rule => Rule.min(1000),
			inputComponent: PriceInput,
		},
		{
			name: 'toppings',
			title: 'Toppings',
			type: 'array',
			// of: [{ type: 'string' }],
			of: [{
				type: 'reference',
				to: [{ type: 'topping' }],
			}],
		},
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
			topping0: 'toppings.0.name',
			topping1: 'toppings.1.name',
			topping2: 'toppings.2.name',
			topping3: 'toppings.3.name',
		},
		prepare: ({ title, media, ...toppings }) => {
			// filter undefined toppings
			const tops = Object.values( toppings ).filter( Boolean )
			return {
				title: title,
				media: media,
				subtitle: tops.join( ', ' ),
			}
		},
	},
}

;```



---



# getting data into gatsby with graphql



## an intro to gatsby-config & sourcing data

/gatsby-config.js

```code

export default {
	siteMetadata: {
		title: `Slicks Slices`,
		siteUrl: `https://gatsby.pizza`,
		description: `The best pizza place in Hamilton!`,
	},
}

;```

```code

query MyQuery {
	site {
		siteMetadata {
			description
			siteUrl
			description
		}
	}
}

;```



## sourcing sanity data & graphql introduction

/gatsby-config.js

```code

import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
	siteMetadata: {
		title: 'Slicks Slices',
		siteUrl: 'https://gatsby.pizza',
		description: 'The best pizza place in Hamilton!',
	},
	plugins: [
		'gatsby-plugin-styled-components',
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: '0jfvvkkd',
				dataset: 'production',
				watchMode: true,
				token: process.env.SANITY_TOKEN,
			}
		}
	],
}

;```

.env

```code

SANITY_TOKEN=qwertyasdfgh

;```

>sanity graphql deploy production

```code

query MyQuery {
	allSanityPizza {
		nodes {
			name
			price
			slug {
				current
			}
			toppings {
				name
			}
		}
	}
	allSanityPerson {
		nodes {
			name
		}
	}
}

;```



## learning gatsby queries

*page queries*
- can be dynamic with variables
- can only be run on a top level page

*static queries*
- can not be dynamic, no variables can be passed in
- can be run anywhere

```code

import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'

export default function PizzaPage({ data }) {
	const pizzas = data.pizzas.nodes
	return (
		<>
			<PizzaList pizzas={ pizzas } />	
		</>
	)
}

export const query = graphql`
	query PizzaQuery {
		pizzas: allSanityPizza {
			nodes {
				name
				id
				slug {
					current
				}
				toppings {
					id
					name
				}
				image {
					asset {
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}

`

;```

```code

import React from 'react'
import { Link } from 'gatsby'

function SinglePizza({ pizza }) {
	return <div>
		<Link to={`/pizza/${ pizza.slug.current }` }>
			<h2>{ pizza.name }</h2>
			<p>{ pizza.toppings.map( toppings => topping.name ).join( ', ' ) }</p>
		</Link>
	</div>
}

export default function PizzaList({ pizzas }) {
	return <div>
		{ pizza.map(( pizza ) => (
			<SinglePizza key={ pizza.id } pizza={ pizza } />
		))}
	</div>
}

;```



---



# puttin' in work



## gatsby images

```code

import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

function SinglePizza({ pizza }) {
	return <div>
		<Link to={`/pizza/${ pizza.slug.current }` }>
			<h2>{ pizza.name }</h2>
			<p>{ pizza.toppings.map( toppings => topping.name ).join( ', ' ) }</p>
			<Img fluid={ pizza.image.asset.fluid } alt="{ pizza.name }" />
		</Link>
	</div>
}

export default function PizzaList({ pizzas }) {
	return <div>
		{ pizza.map(( pizza ) => (
			<SinglePizza key={ pizza.id } pizza={ pizza } />
		))}
	</div>
}

;```



## loading in sample data

>sanity dataset import ./sample-data/all-sample-data.gz production --replace



## styling our pizza grid with css subgrid

```code

import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const PizzaGridStyles = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 4rem;
	grid-auto-rows: auto auto 500px;
`

const PizzaStyles = styled.div`
	display: grid;
	@supports not (grid-template-rows: subgrid) {
		--rows: auto auto 1fr;
	}
	grid-template-rows: var(--rows, subgrid);
	grid-row: span 3;
	grid-gap: 1rem;
	h2, p { margin: 0; }
`

function SinglePizza({ pizza }) {
	return <PizzaStyles>
		<Link to={`/pizza/${ pizza.slug.current }` }>
			<h2>{ pizza.name }</h2>
		</Link>
		<p>{ pizza.toppings.map( toppings => topping.name ).join( ', ' ) }</p>
		<Img fluid={ pizza.image.asset.fluid } alt="{ pizza.name }" />
	</PizzaStyles>
}

export default function PizzaList({ pizzas }) {
	return <PizzaGridStyles>
		{ pizza.map(( pizza ) => (
			<SinglePizza key={ pizza.id } pizza={ pizza } />
		))}
	</PizzaGridStyles>
}

;```



## static queries & building the toppings filter

```code

import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 4rem;
	a {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 0 1rem;
		align-items: center;
		padding: 5px;
		background: var(--grey);
		border-radius: 2px;
		.count {
			background: white;
			padding: 2px 5px;
		}
		.active {
			background: var(--yellow);
		}
	}
`

function countPizzasInToppings( pizzas ) {
	pizzas
	.map( pizza => pizza.toppings )
	.flat()
	.reduce( ( acc, topping ) => {
		const existingTopping = acc[ topping.id ]
		if ( existingTopping ) {
			existingTopping.count += 1
		} else {
			acc[ topping.id ] = {
				id: topping.id,
				name: topping.name,
				count: 1
			}
		}
		return acc
	}, {} )
	const sortedToppings = Object.values( counts ).sort( ( a, b ) => b.count - a.count )
	return sortedToppings
}

export default function ToppingsFilter() {
	const { toppings, pizzas } = useStaticQuery( graphql`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
					vegetarian
				}
			}
			pizzas: allSanityPizza {
				nodes {
					toppings {
						name
						id
					}
				}
			}
		}
	` )

	const toppingsWithCounts = countPizzasInToppings( pizzas.nodes )


	return (
		<ToppingsStyles>
			{ toppingsWithCounts.map( topping => (
				<Link to={ `/topping/${ topping.name }` } key={ topping.id }>
					<span classname="name">{ topping.name }</span>
					<span classname="count">{ topping.count }</span>
				</Link>
			) ) }
		</ToppingsStyles>
	)
}

;```

```code

import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'

export default function PizzaPage({ data }) {
	const pizzas = data.pizzas.nodes
	return (
		<>
			<ToppingsFilter />
			<PizzaList pizzas={ pizzas } />	
		</>
	)
}

export const query = graphql`
	query PizzaQuery {
		pizzas: allSanityPizza {
			nodes {
				name
				id
				slug {
					current
				}
				toppings {
					id
					name
				}
				image {
					asset {
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}

`

;```



---



# making gatsby dynamic



## dynamically creating pages with gatsby-node


/gatsby-node.js

```code

import path from 'path'

async function turnPizzasIntoPages({ graphql, actions }) {
	const pizzaTemplate = path.resolve( './src/template/Pizza.js' )

	const { data } = await graphql(`
		query {
			pizzas: allSanityPizza {
				nodes {
					name
					slug {
						current
					}
				}
			}
		}
	`)

	data.pizzas.forEach( pizza => {
		actions.createPage({
			path: `pizza/${ pizza.slug.current }`,
			component: pizzaTemplate,
			context: {
				slug: pizza.slug.current,
			}
		})
	})
}

export async function createPages( params ) {
	await turnPizzasIntoPages( params )
}

;```

/templates/Pizza.js

```code

import React from 'React'
import { graphql } from 'gatsby'

export default function SinglePizzaPage() {

}

export const query = graphql`
	query( $slug: String! ) {
		pizza: sanityPizza( slug: {	current: { eq: $slug } } ) {
			pizza: sanityPizza {
				name
				id
				image {
					asset {
						fluid( maxWidth: 800 ) {
							...GatsbySanityImageFluid
						}
					}
				}
				toppings {
					name
					id
					vegetarian
				}
			}
		}
	}
`

;```



## templating & styling our single pizza page


/templates/Pizza.js

```code

import React from 'React'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const PizzaGrid = styled.div`
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat( auto-fill, minmax( 400px, 1fr ) );
`

export default function SinglePizzaPage({ data: { pizza } }) {
	return (
		<PizzaGrid>
			<Img fluid={ pizza.image.asset.fluid } />
			<div>
				<h2 classname="mark">{ pizza.name }</h2>
				<ul>
					{ pizza.toppings.map( topping => ( 
						<li key={ topping.id }>{ topping.name }</li>
					) ) }
				</ul>
			</div>
		</PizzaGrid>
	)
}

export const query = graphql`
	query( $slug: String! ) {
		pizza: sanityPizza( slug: {	current: { eq: $slug } } ) {
			pizza: sanityPizza {
				name
				id
				image {
					asset {
						fluid( maxWidth: 800 ) {
							...GatsbySanityImageFluid
						}
					}
				}
				toppings {
					name
					id
					vegetarian
				}
			}
		}
	}
`

;```



## dynamically creating toppings pages


/gatsby-node.js

```code

import path from 'path'

async function turnPizzasIntoPages({ graphql, actions }) {
	const pizzaTemplate = path.resolve( './src/template/Pizza.js' )

	const { data } = await graphql(`
		query {
			pizzas: allSanityPizza {
				nodes {
					name
					slug {
						current
					}
				}
			}
		}
	`)

	data.pizzas.forEach( pizza => {
		actions.createPage({
			path: `pizza/${ pizza.slug.current }`,
			component: pizzaTemplate,
			context: {
				slug: pizza.slug.current,
			}
		})
	})
}

async function turnToppingsIntoPages() {
	const toppingTemplate = path.resolve( './src/templates/pizza.js' )
	const { data } = await graphql(`
		query {
			toppings: allSanityTopping {
				nodes {
					name
					id
				}
			}
		}
	`)
	data.toppings.nodes.forEach( topping => {
		actions.createPage({
			path: `topping/${ topping.name }`,
			component: toppingTemplate,
			context: {
				topping: topping.name,
			}
		})
	})
}

export async function createPages( params ) {
	await Promise.all([
		turnPizzasIntoPages( params ),
		turnToppingsIntoPages( params ),
	])
}

;```

```code

import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'

export default function PizzaPage({ data }) {
	const pizzas = data.pizzas.nodes
	return (
		<>
			<ToppingsFilter />
			<PizzaList pizzas={ pizzas } />	
		</>
	)
}

export const query = graphql`
	query PizzaQuery( $topping: [ String ] ) {
		pizzas: allSanityPizza( filter: {
			toppings: {
				elemMatch: {
					name: {
						in: $topping
					}
				}
			}
		} ) {
			nodes {
				name
				id
				slug {
					current
				}
				toppings {
					id
					name
				}
				image {
					asset {
						fluid(maxWidth: 400) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}

`

;```



## sourcing data from an external api


```code

import fetch from 'isomorphic-fetch'

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
	const res = await fetch( 'https://sampleapis.com/beers/api/ale' )
	const beers = await res.json()
	for ( const beer of beers ) {
		const nodeMeta = {
			id: createNodeId( `beer-${ beer.name }` ),
			parent: null,
			children: [],
			internal: {
				type: 'Beer',
				mediaType: 'application/json',
				contentDigest: createContentDigest( beer ),
			}
		}
	}
	actions.createNode({
		...beer,
		...nodeMeta
	})
}

export async function sourceNodes( params ) {
	await Promise.all([
		fetchBeersAndTurnIntoNodes( params )
	])
}

;```



## querying, displaying & styling the beers page


```code

import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

const BeerGridStyles = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: repeat( auto-fit, minmax( 200px, 1fr ) );
`

const SingleBeerStyles = styled.div`
	border: 1px solid var( --grey );
	padding: 2rem;
	text-align: center;
	img {
		width: 100%;
		height: 200px;
		object-fit: contain;
		display: grid;
		align-items: center;
	}
`

export default function BeersPage({ data }) {
	return(
		<>
			<h2>
				We have { data.beers.nodes.length } beers available. Dine in only!
			</h2>
			<BeerGridStyles>
				{
					data.beers.nodes.map( beer => {
						const rating = Math.round( beer.rating.average )
						return (
							<SingleBeerStyles key={ beer.id }>
								<img src={ beer.image } alt={ beer.name } />
								<h3>{ beer.name }</h3>
								{ beer.price }
								<p title={ `${ rating } out of 5 stars` }>
									{ `⭐️`.repeat( rating ) }
									<span style={{ filter: `grayscale(100%)` }}>
										{ `⭐️`.repeat( 5 - rating ) }
									</span>
									<span>({ beer.rating.reviews })</span>
								</p>
							</SingleBeerStyles>
						)
					})
				}
			</BeerGridStyles>
		</>
	)
}

export const query = graphql`
	query {
		beers: allBeer {
			nodes {
				id
				name
				price
				image
				rating {
					average
					reviews
				}
			}
		}
	}
`

;```



---



# pages & filtering



## querying & displaying pagination

```code

import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const SlicemasterGrid = styled.div`
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat( auto-fill, minmax( 250px, 1fr ) );
`

const SlicemasterStyles = styled.div`
	a {
		text-decoration: none;
	}

	.gatsby-image-wrapper {
		height: 400px;
	}

	h2 {
		transform: rotate( -2deg );
		text-align: center;
		font-size: 4rem;
		margin-bottom: -2rem;
		position: relative;
		z-index: 2;
	}
	.description {
		background: var(--yellow);
		padding: 1rem;
		margin: 2rem;
		margin-top: -6rem;
		z-index: 2;
		position: relative;
		transform: rotate( 1deg );
		text-align: center;
	}
`

export default function SlicemastersPage() {
	const slicemasters = data.slicemasters.nodes
	return (
		<>
			<SlicemasterGrid>
			{ slicemasters.map( person => (
				<SlicemasterStyles>
					<Link to={ `/slicemaster/${ person.slug.current }` }>
						<h2>{ person.name }</h2>
					</Link>
					<Img fluid={ person.image.asset.fluid } />
					<p classname="description">{ person.description }</p>
				</SlicemasterStyles>
			))}
			</SlicemasterGrid>
		</>
	)
}

export const query = graphql`
	query {
		slicemasters: allSanityPerson {
			totalCount
			nodes {
				name
				id
				slug {
					current
				}
				description
				image {
					asset {
						fluid( maxWidth: 410 ) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`

;```



## paginating data in gatsby

```code

async function turnSlicemastersIntoPages({ graphql, actions }) {
	const { data } = await graphql(`
		query {
			slicemasters: allSanityPerson {
				totalCount
				nodes {
					name
					id
					slug {
						current
					}
				}
			}
		}

	)`
	const pageSize = 4
	const pageCount = Math.ceil( data.slicemasters.totalCount / pageSize )
	Array.from({ length: pageCount }).forEach(( _, i ) => {
		actions.createPage({
			path: `/slicemaster/${ i + 1 }`,
			component: path.resolve( './src/pages/slicemasters.js' )
			context: {
				skip: i * pageSize,
				currentPage: i + 1,
				pageSize,
			}
		})
	})
}

;```



## filtering the data based on pagination

```code

export const query = graphql`
	query( $skip: Int = 0, $pageSize: Int = 4 ) {
		slicemasters: allSanityPerson( limit: $pageSize, skip: $skip ) {
			totalCount
			nodes {
				name
				id
				slug {
					current
				}
				description
				image {
					asset {
						fluid( maxWidth: 410 ) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}
	}
`

;```



## creating a reuseable pagination component

```code

import React from 'react'

export default function Pagination({ perPage, totalCount, currentPage, skip, base }) {
	const totalPages = Math.ceil( totalCount / perPage )
	const prevPage = currentPage - 1
	const nextPage = currentPage + 1
	const hasPrevPage = prevPage <= totalPages
	const hasNextPage = nextPage <= totalPages
	return (
		<div>
			<Link disabled={ !hasPrevPage } to={ `${ base }/${ prevPage }` }>← Prev</Link>
			{
				Array.from({ length: totalPages }).map( ( _, i ) => {
					<Link to={ `${ base }/${ i > 0 ? i + 1 : '' }` }>{ i + 1 }</Link>
				} )
			}
			<Link disabled={ !hasNextPage } to={ `${ base }/${ nextPage }` }>Next →</Link>
		</div>
	)
}

;```

```code

<Pagination
	pageSize={ 4 }
	totalCount={ data.slicemasters.totalCount }
	currentPage={ pageContext.currentPage || 1 }
	skip={ pageContext.skip }
	base="/slicemasters"
/>

;```



---



# custom pages + seo



## single slicemaster pages

```code

data.slicemasters.nodes.forEach( slicemaster => {
	actions.createPage({
		component: resolve( './src/templates/Slicemaster.js' ),
		path: '/slicemaster/${ slicemaster.slug.current }',
		context: {
			name: slicemaster.person,
			slug: slicemaster.slug.current,
		}
	})
})

;```

```code

export default function SlicemastersPage({ data: { person } }) {
	return (
		<div>
			<Img fluid={ person.image.asset.fluid } />
			<h2>{ person.name }</h2>
			<p>{ person.description }</p>
		</div>
	)
}

export const query = graphql`
	query( $slug: String! ) {
		person: sanityPerson( slug: { current: { eq: $slug } } ) {
			name
			id
			description
			image {
				asset {
					fluid( maxWidth: 1000, maxHeight: 750 ) {
						...GatsbySanityImageFluid
					}
				}
			}
		}
	}
`

;```



## gatsby seo & head tags



---



# order form, custom hooks & state management



## creating the order page with custom hooks
## styling our order form
## custom hook for our order form
## calculating our order total



---



# serverless functions



## moving our order state to react context with a custom provider
## an intro to serverless functions
## modifying our custom hook to send the order data
## coding our serverless function
## setting error, loading & success states
## creating a honey pot to defend against bots
## creating a one-off store settings page
## custom hook for client side data fetching



---



# client side data



## creating a skeleton screen while loading items
## displaying the home page data



---



# building, deployment & responsive design



## building & deploying our headless sanity cms
## building our gatsby site
## deploying to netlify
## hosting the gatsby website on your own server
## making the website responsive
## deploying to vercel



---
