


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



---



# css in gatsby



## global styles
## typography
## styling the nav & logo
## styling our layout



---



# headless cms



## setting up our headless cms
## creating the toppings content type & custom previews
## creating data relationships
## creating our person data type
## custom cms inputs in sanity



---



# getting data into gatsby with graphql



## an intro to gatsby-config & sourcing data
## sourcing sanity data & graphql introduction
## learning gatsby queries



---



# puttin' in work



## gatsby images
## loading in sample data
## styling our pizza grid with css subgrid
## static queries & building the toppings filter



---



# making gatsby dynamic



## dynamically creating pages with gatsby-node
## templating & styling our single pizza page
## dynamically creating toppings pages
## sourcing data from an external api
## querying, displaying & styling the beers page



---



# pages & filtering



## querying & displaying pagination
## paginating data in gatsby
## filtering the data based on pagination
## creating a reuseable pagination component



---



# custom pages + seo



## single slicemaster pages
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
