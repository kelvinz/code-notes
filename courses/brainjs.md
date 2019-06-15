


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



**train**

-	*forward propagation*
	ball -> goal
	first kick, where it lands
	it's forward propagation, prediction

-	*back propagation*
	measuring the difference ( error ) between your prediction & goal
	then lean from that, it's the second step of back propagation
	train till error is low enough



**run**
it's forward propagation without the back propagation
as it has finished learning & giving our final prediction


```js

	net.train( trainingData, {
		log: ( error ) => console.log( error ),
		logPeriod: 100
	});

	//	iterations: 10, training error: 0.25920388766887914
	//	iterations: 20, training error: 0.2590921901300203
	//	iterations: 30, training error: 0.2590564667464985
	//	...
	//	iterations: 4440, training error: 0.0051130363734514
	//	iterations: 4450, training error: 0.0050576161805913344
	//	iterations: 4460, training error: 0.005003281905073809

```



---



# how they learn - structure



```js

	//	give it inputs & outputs
	( inputs ) => outputs;

	//	starts off with random values
	Math.random();

	//	ends with an activation e.g. 'relu'
	value < 0 ? 0 : value;

```

<https://en.wikipedia.org/wiki/Activation_function>
<https://github.com/BrainJS/brain.js/blob/9595fe1d0069939ba271b25c1e7db785edd11936/src/neural-network.js#L227>
<https://github.com/BrainJS/brain.js/blob/9595fe1d0069939ba271b25c1e7db785edd11936/src/neural-network.js#L527>



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
