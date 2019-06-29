


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



reccurent = depth/time sequence
find out what's next

```js

	const trainingData = [
		[ 1, 2, 3, 4, 5 ],
		[ 5, 4, 3, 2, 1 ]
	]

	const net = new brain.recurrent.LSTMTimeStep()

	net.train(trainingData)

	console.log( net.run([ 1, 2, 3, 4 ] ))
	console.log( net.run([ 5, 4, 3, 2 ] ));
	//	4.984043121337891
	//	1.0050597190856934

```



---



# normalization



scaling data to between 0 & 1
easier for machines to digest

```js

	//	rawData = [{ open: number, high: number, low: number, close: number }]

	//	lowest data in the example list is 138

	//	normalize
	function scaleDown( step ) {
		return {
			open: step.open / 138,
			high: step.high / 138,
			low: step.low / 138,
			close: step.close / 138
		}
	}

	console.log( scaleDown( rawData[ 0 ] ))
	//	{ open: 1.0222579710144928, high: 1.0224739130434783, low: 1.0056246376811593, close: 1.0129695652173913 }

	//	denormalize
	function scaleUp( step ) {
		return {
			open: step.open * 138,
			high: step.high * 138,
			low: step.low * 138,
			close: step.close * 138
		}
	}

	console.log( scaleUp( scaleDown( rawData[ 0 ] )));
	//	{ open: 141.07160000000002, high: 141.1014, low: 138.7762, close: 139.7898 }

```

a more generalized approach

```js

	//	open: ( step.open - lowest ) / ( highest - lowest ),
	//	open: ( 140 - 138 ) / ( 147 - 138 )
	//	actually equals:
	//	140 - 138 = 2
	//	147 - 138 = 9
	//	2 / 9 = 0.22222222

```



---



# example: stock price predictor


continue from above

```js

	const scaledData = rawData.map( scaleDOwn )

	const trainingData = [
		scaledData.slice( 0, 5 ),
		scaledData.slice( 5, 10 ),
		scaledData.slice( 10, 15 ),
		scaledData.slice( 15, 20 )
	]

	const net = new brain.reccurent.LSTMTimeStep({
		inputSize: 4,
		hiddenLayers: [ 8, 8 ],
		outputSize: 4
	})

	net.train( trainingData, {
		learningRate: 0.005,
		errorThresh: 0.02,
	})

	console.log( net.run( trainingData[ 0 ] ))
	//	{ open: 1.0385923385620117, high: 1.0430594682693481, low: 1.0190941095352173, close: 1.0272064208984375 }

	//	denormalize result
	console.log( scaleUp( net.run( trainingData[ 0 ] )));
	//	{ open: 143.26656889915466, high: 144.82152271270752, low: 143.62225341796875, close: 145.2148139476776 }


```



---



# predicting multiple steps



continue from above
instead of just predicting the next step
we will try to predict multiple steps

```js

	//	get next 3 steps
	console.log( net.forecast([
		trainingData[ 0 ][ 0 ],
		trainingData[ 0 ][ 1 ]
	], 3 ).map( scaleUp ));

	//	[{ open: 141.25500440597534, high: 142.67968368530273, low: 140.4848563671112, close: 142.29841804504395 }, { open: 142.92139649391174, high: 144.16087174415588, low: 142.50964736938477, close: 143.6745343208313 }, { open: 143.55654859542847, high: 145.03005409240723, low: 143.25207567214966, close: 144.46179127693176 }]

```



---



# example: a recurrent neural network



feed strings to learn math

```js

	const trainingData = [
		'0+0=0',
		'0+1=1',
		'0+2=2',
		'0+3=3',
		'0+4=4',
		'0+5=5',

		'1+0=1',
		'1+1=2',
		'1+2=3',
		'1+3=4',
		'1+4=5',
		'1+5=6',

		'2+0=2',
		'2+1=3',
		'2+2=4',
		'2+3=5',
		'2+4=6',
		'2+5=7',

		'3+0=3',
		'3+1=4',
		'3+2=5',
		'3+3=6',
		'3+4=7',
		'3+5=8',

		'4+0=4',
		'4+1=5',
		'4+2=6',
		'4+3=7',
		'4+4=8',
		'4+5=9',

		'5+0=5',
		'5+1=6',
		'5+2=7',
		'5+3=8',
		'5+4=9',
		'5+5=10',
	]

	//	recurrent neural network works with an input map
	//	which is like an array
	//	it maps a value that is coming in to a neuron via an index
	//	pulling out unique values to for the input map
	const inputMap = [ '0', '+', '=', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

	//	if we send in
	//	0 + 0 = 0
	//	it will be mapped to
	[ 1,0,0,0,0,0,0,0,0,0,0,0 ];
	[ 0,1,0,0,0,0,0,0,0,0,0,0 ];
	[ 1,0,0,0,0,0,0,0,0,0,0,0 ];
	[ 0,0,1,0,0,0,0,0,0,0,0,0 ];
	[ 1,0,0,0,0,0,0,0,0,0,0,0 ];
	//	this is done internally, aka, we don't have to worry about it
	//	notice how the index tallies up with the characters passed in

	const net = new brain.recurrent.LSTM({ hiddenLayers: [ 20 ] })
	net.train( trainingData, { errorThresh: 0.025, log: ( stats ) => console.log( stats ) })
	//	iterations: 0, training error: 0.1668389986723721
	//	...
	//	iterations: 230, training error: 0.025011789954705422

	console.log( net.run( '0+1=' ) )
	//	1
	console.log( net.run( '4+1=' ) )
	//	5
	console.log( net.run( '2+1=' ) );
	//	3

```



---



# example: number detector



```js

	function toArray( string ) { // normalize
		if ( string.length !== 7 * 7 ) throw new Error( 'string in wrong size' )
		return string.split('').map( toNumber )
	}

	function toNumber( character ) {
		return character === '#' ? 1 : 0
	}

	const zero = toArray(
		'#######' +
		'#     #' +
		'#     #' +
		'#     #' +
		'#     #' +
		'#     #' +
		'#######'
	)

	const one = toArray(
		'   #   ' +
		'   #   ' +
		'   #   ' +
		'   #   ' +
		'   #   ' +
		'   #   ' +
		'   #   '
	)

	const two = toArray(
		'#######' +
		'#     #' +
		'      #' +
		'     # ' +
		'   #   ' +
		' #     ' +
		'#######'
	)

	const three = toArray(
		'#######' +
		'      #' +
		'      #' +
		' ######' +
		'      #' +
		'      #' +
		'#######'
	)

	const four = toArray(
		'#     #' +
		'#     #' +
		'#     #' +
		'#######' +
		'      #' +
		'      #' +
		'      #'
	)

	const five = toArray(
		'#######' +
		'#      ' +
		'#      ' +
		'#######' +
		'      #' +
		'      #' +
		'#######'
	)

	const six = toArray(
		'      #' +
		'    #  ' +
		'  #    ' +
		' ######' +
		'#     #' +
		'#     #' +
		'#######'
	)

	const seven = toArray(
		'#######' +
		'     # ' +
		'    #  ' +
		'   #   ' +
		'  #    ' +
		' #     ' +
		'#      '
	)

	const eight = toArray(
		'#######' +
		'#     #' +
		'#     #' +
		'#######' +
		'#     #' +
		'#     #' +
		'#######'
	)

	const nine = toArray(
		'#######' +
		'#     #' +
		'#     #' +
		'###### ' +
		'    #  ' +
		'   #   ' +
		' #     '
	)

	const net = new brain.NeuralNetwork()
	const trainingData = [
		{ input: zero, output: { zero: 1 } },
		{ input: one, output: { one: 1 } },
		{ input: two, output: { two: 1 } },
		{ input: three, output: { three: 1 } },
		{ input: four, output: { four: 1 } },
		{ input: five, output: { five: 1 } },
		{ input: six, output: { six: 1 } },
		{ input: seven, output: { seven: 1 } },
		{ input: eight, output: { eight: 1 } },
		{ input: nine, output: { nine: 1 } }
	]

	net.train(trainingData, { log: ( stats ) => console.log( stats ) })
	//	iterations: 10, training error: 0.09078126809058898
	//	...
	//	iterations: 190, training error: 0.005342570493631855

	const result = net.run( toArray(
		'#######' +
		'#     #' +
		'#     #' +
		'#######' +
		'#     #' +
		'#     #' +
		'#######'
	))

	console.log( result )
	//	{ zero: 0.12005739659070969, one: 0.002535067265853286, two: 0.007020252291113138, three: 0.07957419753074646, four: 0.09392401576042175, five: 0.10396166145801544, six: 0.07308097928762436, seven: 0.003825594438239932, eight: 0.7266772985458374, nine: 0.028500506654381752 }

	const result = brain.likely( toArray(
		'#######' +
		'#     #' +
		'#     #' +
		'#######' +
		'#     #' +
		'#     #' +
		'#######'
	), net )

	console.log(result);
	//	eight

```



---



# example: writing a children's book



```js

	const trainingData = [
		'Jane saw Doug.',
		'Doug saw Jane.',
		'Spot saw Doug and Jane looking at each other.',
		'It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all.'
	]

	const net = new brain.recurrent.LSTM();
	net.train( trainingData, {
		iterations: 1500,
		errorThresh: 0.011
	})

	console.log( net.run( 'Jane' ) );
	//	saw Doug and Jane looking at each other.
	console.log( net.run( 'It was' ) );
	//	love at first sight, and Spot had a frontrow seat. It was a very special moment for all.

```



---



# example: sentiment detection



```js

	const trainingData = [
		{ input: 'I am super happy!', output: 'happy' },
		{ input: 'What a pill!', output: 'sarcastic' },
		{ input: 'I am super unhappy!', output: 'sad' },
		{ input: 'Are we there yet?', output: 'excited' }
	]

	const net = new brain.recurrent.LSTM()
	net.train( trainingData, {
		iterations: 100,
		erroThresh: 0.011
	})

	console.log( net.run( 'I am unhappy!' ) );
	//	sad
	console.log( net.run( 'I am happy!' ) );
	//	happy

```



---



# rnn inputs & outputs



how does rnn work?

```js

	const trainingData = [
		{ input: '1', output: '2' }
	]

	const net = new brain.recurrent.LSTM()

	const inputMap = [ '1', 'NEW IDEA', '2' ];

	[ 1, 0, 0 ]
	[ 0, 1, 0 ]
	[ 0, 0, 1 ]

	// training data look like, if we start with input of '2', and end with output of '1'
	// { input: '2', output: '1' }
	[ 0, 0, 1 ]
	[ 0, 1, 0 ]
	[ 1, 0, 0 ]

```



---



# example: simple reinforcement



---



# example: recommendation engine



---



# closing thoughts



---
