


<https://scrimba.com/g/gneuralnetworks>



# course introduction



`npm install brain.js`

or

`<script src="https://cdn.rawgit.com/BrainJS/brain.js/master/browser.js"></script>`



---



# our first neural net



XOR

```js

	const net = new brain.NeuralNetwork({
		hiddenLayers: [ 3 ]
	})

	const trainingData = [
		{ input: [ 0, 0 ], output: [ 0 ] },
		{ input: [ 0, 1 ], output: [ 1 ] },
		{ input: [ 1, 0 ], output: [ 1 ] },
		{ input: [ 1, 1 ], output: [ 0 ] }
	]

	net.train( trainingData )

	console.log( net.run([ 0, 0 ] ));
	//	[ 0.058586411117811203 ]

```



---



# how they learn - propagation



---



# how they learn - structure



---



# how they learn - layers



---



# working with objects



---



# learning more than numbers



---



# example: counter



---



# normalization



---



# example: stock price predictor



---



# predicting multiple steps



---



# example: a recurrent neural network



---



# example: number detector



---



# example: writing a children's book



---



# example: sentiment detection



---



# rnn inputs & outputs



---



# example: simple reinforcement



---



# example: recommendation engine



---



# closing thoughts



---
