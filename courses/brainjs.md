


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



hiddenLayers are layers inbetween the input & output layers

```js

	//	have two hidden layers with two nodes each
	const net = new brain.NeuralNetwork({
		hiddenLayers: [ 2, 2 ]
	});

	//	no hard & fast rule to how many to use
	//	more doesn't = better
	//	more does mean more processing power needed though

	//	this is where experimentation & trial & error comes into play
	//	find the best amount of layers & nodes for your dataset

	//	one way is to use it like a funnel 4, 3, 2, 1
	//	but not always good too

```

in feedforward neural networks
`activate(( inputWeights * inputs ) + biases )`
these are the lines connecting each node in each layer to the next
starting off with random inputWeights & biases
& slowly tweaking thru back propagation to find optimal numbers



---



# working with objects



```js

	//	input: { red, gree, blue }
	//	output: { light, neutral, dark }

	//	in brain.js you don't have to input all props
	//	if it's not given, 0 is used for that prop

	const colors = [
		{ green: 0.2, blue: 0.4 },
		{ green: 0.4, blue: 0.6 },
		{ red: 0.2, green: 0.8, blue: 0.8 },
		{ green: 1, blue: 1 },
		{ red: 0.8, green: 1, blue: 1 },
		{ red: 1, green: 1, blue: 1 },
		{ red: 1, green: 0.8, blue: 0.8 },
		{ red: 1, green: 0.6, blue: 0.6 },
		{ red: 1, green: 0.4, blue: 0.4 },
		{ red: 1, green: 0.31, blue: 0.31 },
		{ red: 0.8 },
		{ red: 0.6, green: 0.2, blue: 0.2 }
	]

	const brightnesses = [
		{ dark: 0.8 },
		{ neutral: 0.8 },
		{ light: 0.7 },
		{ light: 0.8 },
		{ light: 0.9 },
		{ light: 1 },
		{ light: 0.8 },
		{ neutral: 0.7, light: 0.5 },
		{ dark: 0.5, neutral: 0.5 },
		{ dark: 0.6, neutral: 0.3 },
		{ dark: 0.85 },
		{ dark: 0.9 }
	]

	const trainingData = []

	for ( let i = 0; i < colors.length; i++ ) {
		trainingData.push({
			input: colors[ i ],
			output: brightnesses[ i ]
		})
	}

	const net = new brain.NeuralNetwork({
		hiddenLayers: [ 3 ]
	})

	const stats = net.train( trainingData )
	console.log( stats )
	//	{ error: 0.004993456424713213, iterations: 1223 }

	console.log(
		net.run({ red: .9 })
	);
	//	{ dark: 0.9345750212669373, neutral: 0.022973598912358284, light: 0.0027336380444467068 }

```



if we want it the other way?
use dark, light, to get colors instead

```js

	const invertedTrainingData = []

	for ( let i = 0; i < colors.length; i++ ) {
		invertedTrainingData.push({
			input: brightnesses[ i ],
			output: colors[ i ]
		})
	}

	const invertedNet = new.brain.NeuralNetwork({ hiddenLayers: [ 3 ] })

	const invertedStats = invertedNet.train( invertedTrainingData );

```



---



# learning more than numbers



```js

	//	which restaurant to go to on which day
	const restaurants = {
		"Brilliant Yellow Corral": "Monday",
		"Penny’s": "Tuesday",
		"Right Coast Wings": "Wednesday",
		"The Delusion Last Railway Car": "Thursday",
		"Fun Day Inn": "Friday",
		"JHOP": "Saturday",
		"Owls": "Sunday"
	}

	// input: { Monday, Tuesday, Wednesday, etc. }
	// output: { Restaurant1, Restaurant2 }

	const trainingData = []

	for ( let restaurantName in restaurants ) {
		const dayOfWeek = restaurants[ restaurantName ]
		trainingData.push({
			input: { [ dayOfWeek ]: 1 },
			output: { [ restaurantName ]: 1 }
		});
	}

	const net = new brain.NeuralNetwork({ hiddenLayers: [ 3 ] })

	const stats = net.train( trainingData )

	console.log( stats )
	//	{ error: 0.004999649141397284, iterations: 1978 }

	console.log(
		net.run({ 'Monday': 1 })
	);
	//	{ Brilliant Yellow Corral: 0.8856178522109985, Penny’s: 0.0613485723733902, Right Coast Wings: 0.06930675357580185, The Delusion Last Railway Car: 0.013687257654964924, Fun Day Inn: 0.0006127985543571413, JHOP: 0.019557546824216843, Owls: 0.042483992874622345 }

```



if we want to get just one result instead of probability of all

```js

	function restaurantForDay( dayOfWeek ) {
		const result = net.run({ [ dayOfWeek ]: 1 })
		let highestValue = 0,
			highestRestaurantName = ''

		for ( let restaurantName in result ) {
			if ( result[ restaurantName ] in result ) {
				if ( result[ restaurantName ] > highestValue ) {
					highestValue = result[ restaurantName ]
					highestRestaurantName = restaurantName
				}
			}
		}

		return highestRestaurantName
	}

	console.log( restaurantForDay( 'Monday' ));
	//	Brilliant Yellow Corral

```



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
