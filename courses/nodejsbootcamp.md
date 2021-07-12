


<https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/>



# 01 - Welcome, Welcome, Welcome!
# 02 - Introduction to Node.js & NPM



## Section Intro
## What Is Node.js & Why Use It
## Running JavaScript Outside the Browser

```js

// enter node
node

// tab to see all global vars

// _ is the previous result

// exit node
.exit // control + D

```



## Using Modules 1 Core Modules

```js

// run script
node index.js

// import modules into your index.js
const fs = require( 'fs' )

// https://nodejs.org/docs

;```



## Reading & Writing Files

```js

const fs = require( 'fs' )

// read
const textIn = fs.readFileSync( './txt/input.txt', 'utf-8' )
console.log( textIn )

// write
const textOut = `This is what we know: ${ textIn }.\n Created on ${ Date.now() }.`
fs.writeFileSync( './txt/output.txt', textOut )

;```



## Blocking & Non-Blocking Asynchronous Nature of Node.js

```js

const fs = require( 'fs' )

// blocking code
const input = fs.readFileSync( 'input.txt', 'utf-8' )
console.log( input )

// non-blocking code
const readFile( 'input.txt', ( err, data ) => console.log( data ) )
console.log( 'reading file...' )

;```



## Reading & Writing Files Asynchronously

```js

const fs = require( 'fs' )

fs.readFile( './txt/start.txt', 'utf-8', ( err, data1 ) => {
	if ( err ) return console.log( '💥' )
	fs.readFile( `./txt/${ data1 }.txt`, 'utf-8', ( err, data2 ) => {
		if ( err ) return console.log( '💥' )
		console.log( data2 )
		fs.readFile( `./txt/append.txt`, 'utf-8', ( err, data3 ) => {
			if ( err ) return console.log( '💥' )
			console.log( data3 )
			fs.writeFile( './txt/final.txt', `${ data2 }\n${ data3 }`, 'utf-8', err => {
				if ( err ) return console.log( '💥' )
				console.log( 'file written' )
			} )
		} )
	} )
} )

;```



## Create a Simple Web Server

```js

const http = require( 'http' )

const server = http.createServer( ( req, res ) => {
	console.log( req )
	res.end( 'hello from server!' )
} )

server.listen( 8000, '127.0.0.1', () => {
	console.log( 'server started listening on port 8000' )
} )

;```



## Routing

```js

const http =  require( 'http' )
const url = require( 'url' )

const server = http.createServer( ( req, res ) => {
	const pathName = req.url

	if ( pathName === '/' || pathName === '/overview' ) {
		res.end( 'overview' )
	} else if ( pathName === '/product' ) {
		res.end( 'product' )
	} else {
		res.writeHead( 404, { 'Content-type': 'text/html' } )
		res.end( '<h1>page not found</h1>' )
	}
} )

server.listen( 8000, '127.0.0.1', () => {
	console.log( 'server started listening on port 8000' )
} )

;```



## Building a (Very) Simple API

```js

const http =  require( 'http' )
const url = require( 'url' )
const fs =  require( 'fs' )

// okay to be synchronous code as it is only run once on server start
const data = fs.readFileSync( `${ __dirname }/dev-data/data.json`, 'utf-8' )
const productData = JSON.parse( data )

const server = http.createServer( ( req, res ) => {
	const pathName = req.url

	if ( pathName === '/' || pathName === '/overview' ) {
		res.end( 'overview' )
	} else if ( pathName === '/product' ) {
		res.end( 'product' )
	} else if ( pathName === '/api' ) {
		// instead of reading file each time there is request, read on top once
		// fs.readFile( `${ __dirname }/dev-data/data.json`, 'utf-8', ( err, data ) => {
		// 	res.writeHead( 200, { 'Content-Type': 'application/json' } )
		// 	res.end( data )
		// } )
		res.writeHead( 200, { 'Content-Type': 'application/json' } )
		res.end( data )
	} else {
		res.writeHead( 404, { 'Content-type': 'text/html' } )
		res.end( '<h1>page not found</h1>' )
	}
} )

server.listen( 8000, '127.0.0.1', () => {
	console.log( 'server started listening on port 8000' )
} )

;```



## HTML Templating Building the Templates
## HTML Templating Filling the Templates

```js

const http =  require( 'http' )
const url = require( 'url' )
const fs =  require( 'fs' )

const tempOverview = fs.readFileSync( `${ __dirname }/templates/template-overview.html`, 'utf-8' )
const tempCard = fs.readFileSync( `${ __dirname }/templates/template-card.html`, 'utf-8' )
const tempProduct = fs.readFileSync( `${ __dirname }/templates/template-product.html`, 'utf-8' )

const data = fs.readFileSync( `${ __dirname }/dev-data/data.json`, 'utf-8' )
const dataObj = JSON.parse( data )


const replacementTemplate = ( temp, product ) => {
	let outout = temp.replace( /{%PRODUCTNAME%}/g, product.productName )
	outout = output.replace( /{%IMAGE%}/g, product.image )
	outout = output.replace( /{%PRICE%}/g, product.price )
	outout = output.replace( /{%FROM%}/g, product.from )
	outout = output.replace( /{%NUTRIENTS%}/g, product.nutrients )
	outout = output.replace( /{%QUANTITY%}/g, product.quantity )
	outout = output.replace( /{%DESCRIPTION%}/g, product.description )
	outout = output.replace( /{%ID%}/g, product.id )
	if ( !product.organic ) output = output.replace( /{%NOT_ORGANIC%}/g, 'not-organic' )
	return output
}

const server = http.createServer( ( req, res ) => {
	const pathName = req.url

	// overview page
	if ( pathName === '/' || pathName === '/overview' ) {
		const cardsHtml = dataObj.map( el => replaceTemplate( tempCard, el ) ).join( '' )
		const output = tempOverview.replace( '{%PRODUCT_CARDS%}', cardsHtml )

		res.writeHead( 200, { 'Content-Type': 'text/html' } )
		res.end( output )

	// product page
	} else if ( pathName === '/product' ) {
		res.end( tempProduct )

	// api
	} else if ( pathName === '/api' ) {
		res.writeHead( 200, { 'Content-Type': 'application/json' } )
		res.end( data )
	} else {
		res.writeHead( 404, { 'Content-type': 'text/html' } )
		res.end( '<h1>page not found</h1>' )
	}
} )

server.listen( 8000, '127.0.0.1', () => {
	console.log( 'listening on port 8000' )
} )

;```



## Parsing Variables from URLs

```js

const http =  require( 'http' )
const url = require( 'url' )
const fs =  require( 'fs' )

const tempOverview = fs.readFileSync( `${ __dirname }/templates/template-overview.html`, 'utf-8' )
const tempCard = fs.readFileSync( `${ __dirname }/templates/template-card.html`, 'utf-8' )
const tempProduct = fs.readFileSync( `${ __dirname }/templates/template-product.html`, 'utf-8' )

const data = fs.readFileSync( `${ __dirname }/dev-data/data.json`, 'utf-8' )
const dataObj = JSON.parse( data )


const replacementTemplate = ( temp, product ) => {
	let outout = temp.replace( /{%PRODUCTNAME%}/g, product.productName )
	outout = output.replace( /{%IMAGE%}/g, product.image )
	outout = output.replace( /{%PRICE%}/g, product.price )
	outout = output.replace( /{%FROM%}/g, product.from )
	outout = output.replace( /{%NUTRIENTS%}/g, product.nutrients )
	outout = output.replace( /{%QUANTITY%}/g, product.quantity )
	outout = output.replace( /{%DESCRIPTION%}/g, product.description )
	outout = output.replace( /{%ID%}/g, product.id )
	if ( !product.organic ) output = output.replace( /{%NOT_ORGANIC%}/g, 'not-organic' )
	return output
}

const server = http.createServer( ( req, res ) => {
	const { query, pathname } = url.parse( req.url, true )

	// overview page
	if ( pathname === '/' || pathname === '/overview' ) {
		const cardsHtml = dataObj.map( el => replaceTemplate( tempCard, el ) ).join( '' )
		const output = tempOverview.replace( '{%PRODUCT_CARDS%}', cardsHtml )
		
		res.writeHead( 200, { 'Content-Type': 'text/html' } )
		res.end( output )

	// product page
	} else if ( pathname === '/product' ) {
		const product = dataObj[ query.id ]
		const output = replaceTemplate( tempProduct, product )

		res.writeHead( 200, { 'Content-Type': 'text/html' } )
		res.end( output )

	// api
	} else if ( pathname === '/api' ) {
		res.writeHead( 200, { 'Content-Type': 'application/json' } )
		res.end( data )
	} else {
		res.writeHead( 404, { 'Content-type': 'text/html' } )
		res.end( '<h1>page not found</h1>' )
	}
} )

server.listen( 8000, '127.0.0.1', () => {
	console.log( 'listening on port 8000' )
} )

;```



## Using Modules 2 Our Own Modules

```js

// replaceTemplate.js
module.exports = ( temp, product ) => {
	let outout = temp.replace( /{%PRODUCTNAME%}/g, product.productName )
	outout = output.replace( /{%IMAGE%}/g, product.image )
	outout = output.replace( /{%PRICE%}/g, product.price )
	outout = output.replace( /{%FROM%}/g, product.from )
	outout = output.replace( /{%NUTRIENTS%}/g, product.nutrients )
	outout = output.replace( /{%QUANTITY%}/g, product.quantity )
	outout = output.replace( /{%DESCRIPTION%}/g, product.description )
	outout = output.replace( /{%ID%}/g, product.id )
	if ( !product.organic ) output = output.replace( /{%NOT_ORGANIC%}/g, 'not-organic' )
	return output
}

// index.js
// dont have to use __dirname for require
// ./ will do
const replaceTemplate = require( './modules/replaceTemplate' )

;```



## Introduction to NPM & the package.json File
## Types of Packages & Installs

<!-- tab to autocomplete in terminal -->

<!-- shorthand for install is i -->
npm i slugify

<!-- shorthand for save-dev is -D -->
npm i nodemon -D

```js

"scripts": {
	"start": "nodemon index.js"
}

;```



## Using Modules 3 3rd Party Modules

```js

const slugify = require( 'slugify' )
const slugs = dataObj.map( el => slugify( el.productName ), { lowercase: true } )

;```



## Package Versioning & Updating

**semantic version notation**
* allow all version
^ allow all minor updates
~ allow only patch updates
1 - major ( breaking change )
0 - minor ( no breaking change )
0 - patch ( fixes )



**updating packages**
npm i slugify@1.0.0
npm outdated
npm update slugify
npm uninstall slugify



## Setting up Prettier in VS Code
## Recap & What's Next



---



# 03 - Introduction to Back-End Web Development



## Section Intro
## An Overview of How the Web Works

client -request-> server
client <-response- server

protocol - http/https
domain name - google.com
resource - /maps
ip address - 216.58.211.206
port number - :443 ( default for https ) :80 ( default for http )
https - uses tls or ssl to encrypt packets sent/recieved

1. dns lookup converts domain name to ip address
2. tcp/ip socket connection ( opens/alive till all packets transferred )
3. http request ( get/post )
4. https response ( with status code like 404, 200 )
5. html/css/js renders



## HTTP in Action
## Front-End vs Back-End Web Development

**front-end**

- on browser
- html/css/js
- frameworks/libraries - vue/react/angular



**back-end**

- on web server
- http server/app/files/database
- nodejs/mongodb



## Static vs Dynamic vs API

**static**

- html/css/js
- already rendered
- heavy work happens on browser



**dynamic**

- database
- rendered on server before sending to browser
- server side rendered



**api**

- database
- json to browser
- browser renders site as it loads



---



# 04 - How Node.js Works A Look Behind the Scenes



## Section Intro
## Node, V8, Libuv & C++

V8 engine to interpret Javascript ( written in C++ & JavaScript )
Libuv for event loop, thread pool ( written in C++ )



## Processes, Threads & the Thread Pool

**Nodejs process** ( instance of a program in execution on a computer )



**Single thread** ( sequence of instructions )

- initialize program
- execute top level code
- require modules
- register event callbacks
- start event loop



**Thread pool**

- 4 additional threads
- offload work from the event loop
- handle heavy ( expensive ) tasks
	- file system API
	- cryptography
	- compression
	- DNS lookups



## The Node.js Event Loop

**Event loop**

- all application code that is inside callback functions ( non-top-level code )
- nodejs is built around callback functions
- event-driven architecture
	- events are emitted
	- event loop picks them up
	- callbacks are called
- event loop does 



**4 main phases in one cycle**

1. expired timer callbacks => callback q
2. i/o polling & callbacks => callback q
3. setImmediate callbacks => callback q
4. close callbacks => callback q

- minor phases
	- process.nexttick() q
	- other microtasks q ( resolved promises )
	- happens inbetween 4 main phases



**don't block the event loop**

- don't use sync versions of functions in fs, crypto, zlib modules in your callback functions
- don't perform complex calculations ( eg. loop inside loops )
- be careful with JSON in large objecs
- don't use too complex regular expressions ( eg. nested quantifiers )



## The Event Loop in Practice

```js

const fs = require( 'fs' )
const crypto = require( 'crypto' )

const start = Date.Date.now()
process.env.UV_THREADPOOL_SIZE = 4 // default, can remove if not changing threadpool

// out of event loop
setTimeout( () => console.log( 'Timer 1 finished' ), 0 )
setImmediate( () => console.log( 'Immediate 1 finished' ) )

fs.readFile( 'text-file.txt', () => {
	console.log( 'i/o finished' )

	// within event loop
	setTimeout( () => console.log( 'Timer 2 finished' ), 0 )
	setTimeout( () => console.log( 'Timer 3 finished' ), 3000 )
	setImmediate( () => console.log( 'Immediate 2 finished' ) )

	process.nextTick( () => console.log( 'process.nextTick' ) )

	crypto.pbkdf2( 'password', 'salt', 100000, 1024, 'sha152', () => {
		console.log( Date.now() - start, 'password encrypted' )
	} )
} )

console.log( 'hello from top-level code' )

// hello from top-level code
// timer 1 finished
// immediate 1 finished
// i/o finished

// process.nextTick
// immediate 2 finished
// timer 2 finished
// 1855 password encrypted
// timer 3 finished

;```



## Events & Event-Driven Architecture

event emitter => emit events => event listener => calls => callback function

```js

// event emitter on server
// request 127.0.0.1:8000

// event listener
const server = http.createServer()
server.on( 'request', ( req, res ) => {
	console.log( 'request received' )
	res.end( 'request recieved' )
} )

// results
// display 'request received'

;```



## Events in Practice

```js

const EventEmitter = require( 'events' )

const myEmitter = new EventEmitter()

myEmitter.on( 'newSale', () => {
	console.log( 'new sale!' )
} )

myEmitter.on( 'newSale', () => {
	console.log( 'cx name jonas' )
})

myEmitter.on( 'newSale', stock => {
	console.log( ${ stock } )
} )

myEmitter.emit( 'newSale', 9 )

;```

```js

const EventEmitter = require( 'events' )

class Sales extends EventEmitter {
	constructor() {
		super()
	}
}

const myEmitter = new Sales()

;```

```js

const server = http.createServer()

server.on( 'request', ( req, res ) => {
	console.log( 'request received' )
	res.end( 'request received' )
} )

server.on( 'close', () => {
	console.log( 'server closed' )
} )

server.listen( 8000, '127.0.0.1', () => {
	console.log( 'waiting for requests...' )
} )

;```



## Introduction to Streams

used to process ( read & write ) data piece by piece ( chunks )
without completing the whole read or write operation
therefore without keeping all the data in memory



**readable streams**

*description*

- streams from which we can read ( consume ) data

*example*

- http requests
- fs read streams

*important events*

- data
- end

*important functions*

- pipe()
- read()



**writable streams**

*description*

- streams from which we can write data

*example*

- http responses
- fs write streams

*important events*

- drain
- finish

*important functions*

- write()
- end()



**duplex streams**

*description*

- streams that are both readable & writable

*example*

- net web socket



**transform streams**

*description*

- transform data as it is written or read

*example*

- zlip gzip creation



## Streams in Practice

```js

const fs = require( 'fs' )
const server = require( 'http' ).createServer()

server.on( 'request', ( req, res ) => {
	// solution 1 ( wait till all done )
	fs.readFile( 'test-file.txt', ( err, data ) => {
		if ( err ) console.log( err )
		res.end( data )
	})

	// solution 2: streams ( send in chunks, may overwhelm if read is faster than ability to write )
	const readable = fs.createReadStream( 'test-file.txt' )
	readable.on( 'data', chunk => {
		res.write( chunk )
	} )
	readable.on( 'end', () => {
		res.end()
	} )
	readable.on( 'error', err => {
		console.log( err )
		res.statusCode( 500 )
		res.end( 'file not found' )
	} )

	// solution 3: pipe stream ( handle stream smoothly )
	const readable = fs.createReadStream( 'test-file.txt' )
	readable.pipe( res )

} )

server.listen( 8000, '127.0.0.1', () => {
	console.log( 'listening...' )
} )

;```



## How Requiring Modules Really Works

- each js file is treated as a separate module
- nodejs uses commonjs module system: require(), exports or module.exports
- es module system is used in browsers: import/export
- there has been attempts to bring es modules to nodejs ( .mjs )

resolving & loading => wrapping => execution => returning exports => caching



## Requiring Modules in Practice

```js

module.exports = class {
	add( a, b ) {
		return a + b
	}

	multiply( a, b ) {
		return a * b
	}

	divide( a, b ) {
		return a / b
	}
}

;```

```js

const C = require( './test-module-1' )
const calc1 = new C()

console.log( calc1.add( 2, 5 ) )

;```

```js

exports.add = ( a, b ) => a + b
exports.multiply = ( a, b ) => a * b
exports.divide = ( a, b ) => a / b

;```

```js

// calc2 object
const calc2 = require( './test-module-2' )
console.log( calc2.multiply( 2, 5 ) )

// destructured
const { add, multiply, divide } = require( './test-module-2' )
console.log( divide( 2, 5 ) )

;```



---



# 05 - Asynchronous JavaScript Promises & AsyncAwait
# 06 - Express Let's Start Building the Natours API!



## Section Intro
## What is Express

- minimal nodejs framework
- contains robust set of features like complex routing, easier handling of req, res, server side rendering, etc
- allows rapid development
- easier to organize into mvc architecture



## Installing Postman
## Setting up Express & Basic Routing

npm i express
app.js

```js

const express = require( 'express' )

const app = express()

app.get( '/', ( req, res ) => {
	// res.status( 200 ).send( 'hello from server' )
	res.status( 200 )
		.json( {
			app: 'Natours',
			messages: 'hello from server'
		} )
} )

app.post( '/', ( req, res ) => {
	res.send( 'you can post to this endpoint...' )
} )

const port = 3000
app.listen( port, () => {
	console.log( 'app is running...' )
} )

;```



## APIs & RESTful API Design

1. seperate API into logical resources
2. expose structured, resource-based URLs ie. tours
3. use http methods ( verbs ) ie. POST/GET/PUT/PATCH/DELETE ( CRUD = CREATE/READ/UPDATE/DELETE )
4. send data as JSON
5. be stateless



## Starting our API Handling GET Requests

```js

const fs = require( 'fs' )

const tours = JSON.parse(
	fs.readFileSync( `${__dirname}/dev-data/data/tours-simple.json }` )
)

app.get( '/api/v1/tours', ( req, res ) => {
	res.status( 200 ).json( {
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	} )
} )

;```



## Handling POST Requests

```js

app.use( express.json() )

app.post( 'api/v1/tours', ( req, res ) => {
	const newId = tours[ tours.length - 1 ].id + 1
	const newTour = Object.assign( { id: newId }, req.body )
	tours.push( newTour )
	fs.writeFile( `${__dirname}/dev-data/data/tours-simple.json }`, JSON.stringify( tours ), err => {
		res.status( 201 ).json( {
			status: 'success',
			data: {
				tour: newTour
			}
		} )
	} )
} )

;```



## Responding to URL Parameters

```js

app.get( '/api/v1/tours/:id', ( req, res ) => {
	const id = req.params * 1
	const tour = tours.find( el => el.id === id )

	if ( !tour ) {
		return res.status( 404 ).json( {
			status: 'fail',
			message: 'invalid id'
		} )
	}

	res.status( 200 ).json( {
		status: 'success',
		data: {
			tour
		}
	} )
} )

;```



## Handling PATCH Requests

```js

app.patch( '/api/v1/tours/:id', ( req, res ) => {
	const id = req.params * 1
	const tour = tours.find( el => el.id === id 

	if ( !tour ) {
		return res.status( 404 ).json( {
			status: 'fail',
			message: 'invalid id'
		} )
	}

	res.status( 200 ).json( {
		status: 'success',
		data: {
			tour: '<dummy function not working for now>'
		}
	} )
} )

;```



## Handling DELETE Requests

```js

app.delete( '/api/v1/tours/:id', ( req, res ) => {
	const id = req.params * 1
	const tour = tours.find( el => el.id === id 

	if ( !tour ) {
		return res.status( 404 ).json( {
			status: 'fail',
			message: 'invalid id'
		} )
	}

	res.status( 204 ).json( {
		status: 'success',
		data: null
	} )
} )

;```



## Refactoring Our Routes

```js

const getAllTours = ( req, res ) => {
	const newId = tours[ tours.length - 1 ].id + 1
	const newTour = Object.assign( { id: newId }, req.body )
	tours.push( newTour )
	fs.writeFile( `${__dirname}/dev-data/data/tours-simple.json }`, JSON.stringify( tours ), err => {
		res.status( 201 ).json( {
			status: 'success',
			data: {
				tour: newTour
			}
		} )
	} )
}

const getTour = ( req, res ) => {
	const id = req.params * 1
	const tour = tours.find( el => el.id === id )

	if ( !tour ) {
		return res.status( 404 ).json( {
			status: 'fail',
			message: 'invalid id'
		} )
	}

	res.status( 200 ).json( {
		status: 'success',
		data: {
			tour
		}
	} )
}

const createTour = ( req, res ) => {
	const newId = tours[ tours.length - 1 ].id + 1
	const newTour = Object.assign( { id: newId }, req.body )
	tours.push( newTour )
	fs.writeFile( `${__dirname}/dev-data/data/tours-simple.json }`, JSON.stringify( tours ), err => {
		res.status( 201 ).json( {
			status: 'success',
			data: {
				tour: newTour
			}
		} )
	} )
}

const updateTour = ( req, res ) => {
	const id = req.params * 1
	const tour = tours.find( el => el.id === id 

	if ( !tour ) {
		return res.status( 404 ).json( {
			status: 'fail',
			message: 'invalid id'
		} )
	}

	res.status( 200 ).json( {
		status: 'success',
		data: {
			tour: '<dummy function not working for now>'
		}
	} )
}

const deleteTour = ( req, res ) => {
	const id = req.params * 1
	const tour = tours.find( el => el.id === id 

	if ( !tour ) {
		return res.status( 404 ).json( {
			status: 'fail',
			message: 'invalid id'
		} )
	}

	res.status( 204 ).json( {
		status: 'success',
		data: null
	} )
}

// api.get( '/api/v1/tours', getAllTours )
// app.get( '/api/v1/tours/:id', getTour )
// app.post( 'api/v1/tours', createTour )
// app.patch( '/api/v1/tours/:id', updateTour )
// app.delete( '/api/v1/tours/:id', deleteTour )

app.route( '/api/v1/tours' )
	.get( getAllTours )
	.post( createTour )

app.route( '/api/v1/tours/:id' )
	.get( getTour )
	.patch( updateTour )
	.delete( deleteTour )

;```



---
