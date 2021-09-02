


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



## Middleware & the Request-Response Cycle
## Creating Our Own Middleware

order matters,
each middleware calls next() to go to next middleware,
until res is sent which ends the req

```js

app.use( ( req, res, next ) => {
	console.log( 'hello from middleware' )
	next()
} )

app.use( ( req, res, next ) => {
	req.requestTime = new Data().toISOString()
	next()
} )

const getAllTours = ( req, res ) => {
	const newId = tours[ tours.length - 1 ].id + 1
	const newTour = Object.assign( { id: newId }, req.body )
	tours.push( newTour )
	fs.writeFile( `${__dirname}/dev-data/data/tours-simple.json }`, JSON.stringify( tours ), err => {
		res.status( 201 ).json( {
			status: 'success',
			requestedAt: res.requestTime,
			data: {
				tour: newTour
			}
		} )
	} )
}

;```



## Using 3rd-Party Middleware

npm i morgan

```js

const morgan = require( 'morgan' )

app.use( morgan( 'dev' ) )
// shows req, res, res time, res status in console

;```



## Implementing the Users Routes

```js

// etc etc

app.route( '/api/v1/users' )
	.get( getAllUsers )
	.post( createUsers )

app.route( '/api/v1/users/:id' )
	.get( getUser )
	.patch( updateUser )
	.delete( deleteUser )

;```



## Creating & Mounting Multiple Routers

```js

const tourRouter = express.Router()
const userRouter = express.Router()

tourRouter
	.route( '/' )
	.get( getAllTours )
	.post( createTour )

tourRouter
	.route( '/:id' )
	.get( getTour )
	.patch( updateTour )
	.delete( deleteTour )

userRouter
	.route( '/' )
	.get( getAllUsers )
	.post( createUsers )

userRouter
	.route( '/:id' )
	.get( getUser )
	.patch( updateUser )
	.delete( deleteUser )

app.use( '/api/v1/tours', tourRouter )
app.use( '/api/v1/users', userRouter )

;```



## A Better File Structure

tourController.js

```js

const fs = require( 'fs' )

const tours = JSON.parse(
	fs.readFileSync(readFileSync( `${ __dirname }/../dev-data/data/tours-simple.json` ) )
)

exports.getAllTours = ( req, res ) => {
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

exports.getTour = ( req, res ) => {
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

exports.createTour = ( req, res ) => {
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

exports.updateTour = ( req, res ) => {
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

exports.deleteTour = ( req, res ) => {
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

;```



tourRoutes.js

```js

const express = require( 'express' )
const tourController = require( './../controllers/tourController' )
const router = express.Router()

router
	.route( '/' )
	.get( tourController.getAllTours )
	.post( tourController.createTour )

router
	.route( '/:id' )
	.get( tourController.getTour )
	.patch( tourController.updateTour )
	.delete( tourController.deleteTour )

module.exports = router

;```



app.js

```js

const express =  require( 'express' )
const morgan = require( 'morgan' )
const tourRouter = require( './routes/tourRoutes' )

const app = express()
app.use( morgan( 'dev' ) )
app.use( express.json() )
app.use( (req, res, next ) => {
	req.requestTime = new Date().toISOString()
	next()
} )

app.use( '/api/v1/tours', tourRouter )

module.exports = app

;```



server.js

```js

const app = require( './app' )

const port = 3000
app.listen( port, () => {
	console.log( `app is running on port ${ port }...` )
})

;```



## Param Middleware

```js

router.param( 'id', tourController.checkID )

;```

```js

exports.checkID = ( req, res, next, val ) => {
	if ( val * 1 > tours.length ) {
		return res.status( 400 ).json( {
			status: 'fail',
			message: 'invalid ID'
		} )
	}
	next()
}

;```



## Chaining Multiple Middleware functions

```js

exports.checkBody = ( req, res, next ) => {
	if ( !req.body.name || !req.body.price ) {
		return res.status( 400 ).json( {
			status: 'fail',
			message: 'missing name or price'
		} )
	}
	next()
}

;```

```js

router.
	.route( '/' )
	.get( tourController.getAllTours )
	.post( tourController.checkBody, tourController.createTour )

;```



## Serving Static Files

```js

app.use( express.static( `${ __dirname }/public` ) )

;```



## Environment Variables

config.env

```js

NODE_ENV=development
PORT=8000
USERNAME=kelvin
PASSWORD=123456

;```

npm i dotenv

```js

const dotenv = require( 'dotenv' )
dotenv.config( { path: './config.env' } )

const app = require( './app' )

if ( process.env.NODE_ENV ===  'development' ) app.use( morgan( 'dev' ) )

const port = process.env.PORT || 3000

;```

to change to production instead of normal nodemon server.js to start, use
NODE_ENV=production nodemon server.js



## Setting up ESLint + Prettier in VS Code



---



# 07 - Introduction to MongoDB



## Section Intro
## What is MongoDB

- **document based**
	mongodb stores data in documents, field-value pair data structures

- **scalable**
	very easy to distribute data across multiple machines as your users & amount of data grows

- **flexible**
	no document data schema required, so each document can have different number & type of fields

- **performant**
	embedded data models, indexing, sharding, flexible documents, native duplication

- **free & open source**
	published under SSPL license



## Installing MongoDB on macOS
## Installing MongoDB on Windows
## Creating a Local Database

enter mongo shell, enter commands, exit

> mongo
> use natours-test
> db.tours.insertOne({ name: "The Forest Hiker", price: 297, rating: 4.7 })
> db.tours.find()
> show dbs
> show collection
> quit()



## CRUD Creating Documents

> db.tours.insertMany([ { name: "The Sea Explorer", price: 497, rating: 4.8 }, { name: "The Snow Adventure", price: 997, rating: 4.9, difficulty: "easy" } ])



## CRUD Querying ( Reading ) Documents

> db.tours.find()
> db.tours.find({ name: "The Forest Hiker" })
> db.tours.find({ difficulty: "easy" })
> db.tours.find({ price: { $lte: 500 } })
> db.tours.find({ price: { $lt: 500 }, rating: { $gte: 4.8 } })
> db.tours.find({ $or: [{ price: { $lt: 500 }}, { rating: { $gte: 4.8 } }] })



## CRUD Updating Documents

> db.tours.updateOne({ name:  "The Snow Adventure" }, { $set: { price: 597 } })
> db.tours.updateMany({ price: { $gt: 500 }, rating: { $gte: 4.8 } }, { $set: { premium: true } })
> db.tours.replaceOne({ xxx }})



## CRUD Deleting Documents

> db.tours.deleteMany({ rating: { $lt: 4.8 } })
> db.tours.deleteMany({})
// deletes all if empty object is passed in // careful



## Using Compass App for CRUD Operations
## Creating a Hosted Database with Atlas
## Connecting to Our Hosted Database

NODE_ENV=development
PORT=8000
PASSWORD=123456



---



# 08 - Using MongoDB with Mongoose



## Section Intro
## Connecting Our Database with the Express App

NODE_ENV=development
PORT=8000
DATABASE=mongodb+srv://jonas:<PASSWORD>@cluster0-pwikv.mongodb.net/natours?retryWrites=true
DATABASE_LOCAL=mongodb://localhost:27017/natours
PASSWORD=123456

```js

const mongoose = require( 'mongoose' )
const dotenv = require( 'dotenv' )
const app = require( './app' )

dotenv.config( { path: './config.env' } )

const DB = process.env.DATABASE.replace( '<PASSWORD>', process.env.DATABASE_PASSWORD )
mongoose.connect( DB, {
	useNewUrlParser: true,
	userCreateIndex: true,
	userFindAndModify: false,
} ).then( con => console.log( 'DB connection successful!' ) )

const port = process.env.PORT || 3000
app.listen( port, () => console.log( `App running on port ${ port }...` ) )

;```



## What is Mongoose

- an Object Data Modelling ( ODM ) library for MongoDB & Node.js, a higher level of abstraction
- allows for rapid & simple development of mongoDB database interactions
- schemas to model data & relationships, easy data validation, simple query API, middleware, etc
- Mongoose schema: where we model our data by describing the structure of the data, default values, validation
- Mongoose model: a wrapper for the schema, providing an interface to the database for CRUD operations 



## Creating a Simple Tour Model

```js

const tourSchema = new mongoose.Schema( {
	name: {
		type: String,
		// required: true,
		required: [ true, 'A tour must have a name' ],
		unique: true,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	price: {
		type: Number,
		required: [ true, 'A tour must have a price' ],
	},
} )

const Tour = mongoose.model( 'Tour', tourSchema )

;```



## Creating Documents & Testing the Model

```js

const testTour = new Tour( {
	name: 'The Forest Hiker',
	rating: 4.7,
	price: 497,
} )

testTour
.save()
.then( doc => console.log( doc ) )
.catch( err => console.log( err ) )

;```



## Intro to Back-End Architecture Types of Logic & More

**application logic**

- code that is only concerned about the application's implementation
- not the underlying business problem we're trying to solve ( e.g. showing & selling tours )
- concerned about managing requests & responses
- about the app's more technical aspects
- bridge between model & view layers



**business logic**

- code that actually solves the business problem we set out to solve
- directly related to business rules, how the business works, business needs
	- creating new tours in database
	- checking if user's password is correct
	- validating user input data
	- ensuring only users who bought a tour can review it



**fat model/thin controller**

- offloading as much logic as possible into the models
- keep the controllers as simple & lean as possible



## Refactoring for MVC

tourModels.js

```js

const mongoose = require( 'mongoose' )

const tourSchema = new mongoose.Schema( {
	name: {
		type: String,
		// required: true,
		required: [ true, 'A tour must have a name' ],
		unique: true,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	price: {
		type: Number,
		required: [ true, 'A tour must have a price' ],
	},
} )

const Tour = mongoose.model( 'Tour', tourSchema )

module.exports = Tour

;```



tourController.js

```js

const Tour = require( './../models/tourModel' )

;```



## Another Way of Creating Documents

```js

exports.createTour = async ( req, res ) => {
	try {
		const newTour = await Tour.create( req.body )
		res.status( 201 ).json( {
			status: 'success',
			data: {
				tour: newTour,
			}
		} )
	} catch ( err ) { 
		res.status( 400 ).json( {
			status: 'error',
			message: 'invalid data sent!',
		} )
	}
}

;```



## Reading Documents

```js

exports.getAllTours = async ( req, res ) => {
	try {
		const tours = await Tour.find()
		res.status( 200 ).json( {
			status: 'success',
			results: tours.length,
			data: {
				tours
			}
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

exports.getTour = async ( req, res ) => {
	try {
		const tour = await Tour.findById( req.params.id )
		res.status( 200 ).json( {
			status: 'success',
			data: {
				tour
			}
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

;```



## Updating Documents

```js

exports.updateTour = async ( req, res ) => {
	try {
		const tour = await Tour.findByIdAndUpdate( req.params.id, req.body, {
			new: true,
			runValidators: true,
		} )
		res.status( 200 ).json( {
			status: 'success',
			data: {
				tour
			}
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

;```



## Deleting Documents

```js

exports.deleteTour = async ( req, res ) => {
	try {
		await Tour.findByIdAndDelete( req.params.id )
		res.status( 204 ).json( {
			status: 'success',
			data: null,
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

;```



## Modelling the Tours

```js

const tourSchema = new mongoose.Schema( {
	name: {
		type: String,
		// required: true,
		required: [ true, 'A tour must have a name' ],
		unique: true,
		trim: true
	},
	duration: {
		type: Number,
		required: [ true, 'A tour must have a duration' ],
	},
	maxGroupSize: {
		type: Number,
		required: [ true, 'A tour must have a group size' ],
	},
	difficulty: {
		type: String,
		required: [ true, 'A tour must have a difficulty' ],
	},
	ratingsAverage: {
		type: Number,
		default: 4.5,
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	price: {
		type: Number,
		required: [ true, 'A tour must have a price' ],
	},
	priceDiscount: Number,
	summary: {
		type: String,
		trim: true,
		required: [ true, 'A tour must have a summary' ]
	},
	description: {
		type: String,
		trim: true,
	},
	imageCover: {
		type: String,
		required: [ true, 'A tour must have a cover image' ],
	},
	images: [ String ],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	startDate: [ Date ],
} )

;```



## Importing Development Data

```js

const fs = require( 'fs' )
const mongoose = require( 'mongoose' )
const dotenv = require( 'dotenv' )
const Tour = require( './../../models/tourModel' )

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace( '<PASSWORD>', process.env.DATABASE_PASSWORD )
mongoose.connect( DB, {
	useNewUrlParser: true,
	userCreateIndex: true,
	userFindAndModify: false,
} ).then( con => console.log( 'DB connection successful!' ) )

const tours = JSON.parse( fs.readFileSync( `${ __dirname }/tours-simple.json`, 'utf-8' ) )
const importData = async () => {
	try {
		await Tour.create( tours )
		console.log( 'data loaded successfully' )
		process.exit()
	} catch ( err ) {
		console.log( err )
	}
}

const deleteData = async () => {
	try {
		await Tour.deleteMany()
		console.log( 'data deleted successfully' )
		process.exit()
	} catch ( err ) {
		console.log( err )
	}	
}

if ( process.argv[ 2 ] === '--import' ) {
	importDat()
} else if ( process.argv[ 2 ] === '--delete' ) {
	deleteData()
}

;```



## Making the API Better - Filtering

```js

exports.getAllTours = async ( req, res ) => {
	try {
		// build query
		const queryObj = { ...req.query }
		const excludedFields = [ 'page', 'sort', 'limit', 'fields' ]
		excludedFields.forEach( el => delete queryObj[ el ] )

		const query = Tour.find( queryObj )

		// execute query
		const tours = await query

		// send response
		res.status( 200 ).json( {
			status: 'success',
			results: tours.length,
			data: {
				tours
			}
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

;```



## Making the API Better - Advanced Filtering

```js

exports.getAllTours = async ( req, res ) => {
	try {
		// build query
		const queryObj = { ...req.query }
		const excludedFields = [ 'page', 'sort', 'limit', 'fields' ]
		excludedFields.forEach( el => delete queryObj[ el ] )

		let queryStr = JSON.stringify( queryObj )
		// add $ to these 4 query gte, gt, lte, lt
		// so it matches mongo query command
		queryStr = queryStr.replace( /\b(gte|gt|lte|lt)\b/g, match => `$${ match }` )

		const query = Tour.find( JSON.parse( queryStr ) )

		// execute query
		const tours = await query

		// send response
		res.status( 200 ).json( {
			status: 'success',
			results: tours.length,
			data: {
				tours
			}
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

;```



## Making the API Better - Sorting

```js

exports.getAllTours = async ( req, res ) => {
	try {
		// build query
		const queryObj = { ...req.query }
		const excludedFields = [ 'page', 'sort', 'limit', 'fields' ]
		excludedFields.forEach( el => delete queryObj[ el ] )

		let queryStr = JSON.stringify( queryObj )
		// add $ to these 4 query gte, gt, lte, lt
		// so it matches mongo query command
		queryStr = queryStr.replace( /\b(gte|gt|lte|lt)\b/g, match => `$${ match }` )

		let query = Tour.find( JSON.parse( queryStr ) )

		if ( req.query.sort ) {
			const sortBy = req.query.sort.split( ',' ).join( ' ' )
			query = query.sort( sortBy )
		} else {
			query = query.sort( '-createdAt' )
		}

		// execute query
		const tours = await query

		// send response
		res.status( 200 ).json( {
			status: 'success',
			results: tours.length,
			data: {
				tours
			}
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

;```



## Making the API Better - Limiting Fields

```js

exports.getAllTours = async ( req, res ) => {
	try {
		// build query
		const queryObj = { ...req.query }
		const excludedFields = [ 'page', 'sort', 'limit', 'fields' ]
		excludedFields.forEach( el => delete queryObj[ el ] )

		let queryStr = JSON.stringify( queryObj )
		// add $ to these 4 query gte, gt, lte, lt
		// so it matches mongo query command
		queryStr = queryStr.replace( /\b(gte|gt|lte|lt)\b/g, match => `$${ match }` )

		let query = Tour.find( JSON.parse( queryStr ) )

		if ( req.query.sort ) {
			const sortBy = req.query.sort.split( ',' ).join( ' ' )
			query = query.sort( sortBy )
		} else {
			query = query.sort( '-createdAt' )
		}

		if ( req.query.fields ) {
			const fields = req.query.fields.split( ',' ).join( ' ' )
			query = query.select( fields )
		} else {
			//	exclude mongo's default __v field
			query = query.select( '-__v' )
		}

		// execute query
		const tours = await query

		// send response
		res.status( 200 ).json( {
			status: 'success',
			results: tours.length,
			data: {
				tours
			}
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

;```



## Making the API Better - Pagination

```js

exports.getAllTours = async ( req, res ) => {
	try {
		// build query
		const queryObj = { ...req.query }
		const excludedFields = [ 'page', 'sort', 'limit', 'fields' ]
		excludedFields.forEach( el => delete queryObj[ el ] )

		let queryStr = JSON.stringify( queryObj )
		// add $ to these 4 query gte, gt, lte, lt
		// so it matches mongo query command
		queryStr = queryStr.replace( /\b(gte|gt|lte|lt)\b/g, match => `$${ match }` )

		let query = Tour.find( JSON.parse( queryStr ) )

		if ( req.query.sort ) {
			const sortBy = req.query.sort.split( ',' ).join( ' ' )
			query = query.sort( sortBy )
		} else {
			query = query.sort( '-createdAt' )
		}

		if ( req.query.fields ) {
			const fields = req.query.fields.split( ',' ).join( ' ' )
			query = query.select( fields )
		} else {
			//	exclude mongo's default __v field
			query = query.select( '-__v' )
		}

		const page = req.query.page * 1 || 1
		const limit = req.query.limit * 1 || 100
		const skip = ( page - 1 ) * limit
		query = query.skip( skip ).limit( limit )

		if ( req.query.page ) {
			const numTours = await Tour.countDocuments()
			if ( skip >= numTours ) throw new Error( 'This page does not exist' )
		}

		// execute query
		// query is now query.sort().fields().skip()... etc
		const tours = await query

		// send response
		res.status( 200 ).json( {
			status: 'success',
			results: tours.length,
			data: {
				tours
			}
		} )
	} catch ( err ) {
		res.status( 404 ).json( {
			status: 'error',
			message: err,
		} )
	}
}

;```



## Making the API Better - Aliasing

```js

router
.route( '/top-5-cheap' )
.get( tourController.aliasTopTours, tourController.getAllTours )

;```

```js

exports.aliasTopTours = ( req, res, next ) => {
	req.query.limit = '5'
	req.query.sort = '-ratingsAverage,price'
	req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
	next()
}

;```



---
