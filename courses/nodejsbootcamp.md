


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




;```



---
