


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






---
