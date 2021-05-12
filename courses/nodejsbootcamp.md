


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






---
