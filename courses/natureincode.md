


<https://courses.edx.org/courses/course-v1:EPFLx+NiC1.0x+3T2016/course/>



# genes



## definitions

evolution
:	the change in allele frequencies in a population over time



allele
:	variant of a gene in population
:	expressed as a fraction or percentage



hardy weinberg principle
:	allele frequencies in population remains constant
:	from generation to generation
:	in the absence of evolutionary influences
:	in infinite population sizes



evolutionary influences

1.	natural selection
2.	genetic drift
3.	migration
4.	mutation

+	mate choice
+	assortative mating
+	sexual selection
+	gene flow
+	meiotic drive
+	genetic hitchhiking
+	population bottleneck
+	founder effect
+	inbreeding



diploid
:	each cell has two copies of genetic material

haploid
:	each cell has one copy of genetic material



eg.
two allele, A1 & A2
we can pack them into a A1/A1 diploid or A2/A2 diploid which will be known as heterozygous
or we can pack them into A1/A2 which is homozygous
they are genotypes

A1A1 : 15%
A1A2 : 50%
A2A2 : 35%
these are genotype frequencies
totals to 100%

A1A1 : 15 * 2 = 30 A1 alleles
A1A2 : 50 = 50 A1, 50 A2 alleles
A2A2 : 35 * 2 = 70 A2 alleles

A1 = 80 = 40%
A2 = 120 = 60%
these are allele frequencies

genotype frequencies can change in one generation
but allele frequencies will remain the same in the absence of evolutionary influences
genotype frequencies will remain constant after the inital change
the frequencies it stays at is known as the hardy weinberg frequencies



```js
		//	genotype frequencies
	var a1a1 = .15,
		a1a2 = .35,
		a2a2 = 1 - ( a1a1 + a1a2 ),

		//	allele frequencies
		p = a1a1 + ( a1a2 / 2 ),
		q = 1 - p

	console.log( 'generation 0:', a1a1, a1a2, a2a2 );

	//	calculate next generation
	a1a1 = p * p
	a1a2 = 2 * p * q
	a2a2 = q * q

	console.log( 'generation 1:', a1a1, a1a2, a2a2 );

```

```js

	//	making things more repeatable via functions & loops
	function create_next_generation() {
		a1a1 = p * p
		a1a2 = 2 * p * q
		a2a2 = q * q
	}

	for ( var i = 0; i < 5; i++ ) {
		create_next_generation()
		console.log( 'generation ' + ( i + 1 ) + ':', a1a1, a1a2, a2a2 );
	}

```

```js

	//	rounding up to x decimals by multiplying by x00 first
	//	then bring it back by dividing by x00
	//	as math.round can't specify the decimals to round to but defaults to 0
	function round_number( value, decimals ) {
		var shifter = Math.pow( 10, decimals )
		return Math.round( value * shifter ) / shifter
	}

```



---



# genetic drift



```js

	//	coin flip
	var coins = 10,
		headds = 0,
		tails = 0

	for ( var i = 0; i < coins; i++ ) {
		if ( Math.random() <= .5 ) {
			heads++
		} else {
			tails++
		}
	}

	console.log( heads, 'heads', tails, 'tails' );

```

```js

	function toss_coins() {
		var coins = 10,
			heads = 0,
			tails = 0

		for ( var i = 0; i < coins; i++ ) {
			Math.random() <= .5 ? heads++ : tails++
		}

		if ( heads === 8 ) {
			return true
		} else {
			return false
		}
	}

	var repeats = 1000000,
		counter = 0

	for ( var i = 0; i < repeats; i++ ) {
		var desired_outcome = toss_coins()
		if ( desired_outcome ) {
			counter++
		}
	}

	console.log( 'Getting 8 heads, 2 tails', ( counter / repeats ) * 100, '% of the time' );

```

```js

	//	if population size is not infinite
	//	we will experience genetic drift

	var
	//	allele frequency
	p = .5,
	//	population size
	N = 1000,
	generations = 1000

	function next_generation() {
		var
		draws = 2 * N,
		a1    = 0,
		a2    = 0

		for ( var i = 0; i < draws; i++ ) {
			Math.random() <= p ? a1++ : a2++
		}

		p = a1 / draws
	}

	function round_number( value, decimals ) {
		var shifter = Math.pow( 10, decimals )
		return Math.round( value * shifter ) / shifter
	}

	for ( var i = 0; i < generations; i++ ) {
		next_generation()
		console.log( 'generation ' + i, round_number( p, 4 ), round_number( 1-p, 4 ) )
		//	fluctuating p & q due to genetic drift
	}

```

```js

	//	using d3 for visualization
	var data = []

	//	during next_generation()
	data.push( p )

	//	at end
	draw_line_chart( data, 'generation', 'p', [ 'population size:', N, 'generations:', generations ] );

```

```js

	//	draw a line function using d3
	function draw_line_chart( data, x_label, y_label, legend_values, x_max, y_max_flex ) {
		var margin = { top: 20, right: 20, bottom: 50, left: 50 },
			width = 700 - margin.left - margin.right,
			height = 400 - margin.top - margin.bottom;

		var version = d3.scale ? 3 : 4;
		var color = ( version == 3 ? d3.scale.category10() : d3.scaleOrdinal( d3.schemeCategory10 ) );

		if ( !x_max ) {
			x_max = data[ 0 ].length > 0 ? data[ 0 ].length : data.length
		}

		var y_max = data[ 0 ].length > 0 ? d3.max( data, function( array ) {
			return d3.max( array );
		} ) : d3.max( data );

		var x = ( version == 3 ? d3.scale.linear() : d3.scaleLinear() )
				.domain( [ 0,x_max ] )
				.range( [ 0, width ] );

		var y = y_max_flex ? ( version == 3 ? d3.scale.linear() : d3.scaleLinear() )
				.domain( [ 0, 1.1 * y_max ] )
				.range( [ height, 0 ] ) : ( version == 3 ? d3.scale.linear() : d3.scaleLinear() )
				.range( [ height, 0 ] );

		var xAxis = ( version == 3 ? d3.svg.axis().scale( x ).orient( "bottom" ) :
		d3.axisBottom().scale( x ) );

		var yAxis = ( version == 3 ? d3.svg.axis().scale( y ).orient( "left" ) :
		d3.axisLeft().scale( y ) );

		var line = ( version == 3 ? d3.svg.line() : d3.line() )
					.x( function ( d, i ) {
						var dat = ( data[ 0 ].length > 0 ? data[ 0 ] : data );
						return x( ( i/( dat.length - 1 ) ) * x_max );
					} )
					.y( function ( d ) {
						return y( d );
					} );

		var svg = d3.select( "body" ).append( "svg" )
					.attr( "width", width + margin.left + margin.right )
					.attr( "height", height + margin.top + margin.bottom )
					.append( "g" )
					.attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

		svg.append( "g" )
			.attr( "class", "x axis" )
			.attr( "transform", "translate(0," + height + ")" )
			.call( xAxis )
			.append( "text" )
			.style( "text-anchor", "middle" )
			.attr( "x", width / 2 )
			.attr( "y", 6 )
			.attr( "dy", "3em" )
			.style( "fill", "#000" )
			.text( x_label );

		svg.append( "g" )
			.attr( "class", "y axis" )
			.call( yAxis )
			.append( "text" )
			.attr( "transform", "rotate(-90)" )
			.attr( "x", - height / 2 )
			.attr( "dy", "-3.5em" )
			.style( "text-anchor", "middle" )
			.style( "fill", "#000" )
			.text( y_label );

		if ( legend_values.length > 0 ) {
			var legend = svg.append( "text" )
						.attr( "text-anchor", "star" )
						.attr( "y", 30 )
						.attr( "x", width - 100 )
						.append( "tspan" ).attr( "class", "legend_title" )
						.text( legend_values[ 0 ] )
						.append( "tspan").attr( "class", "legend_text" )
						.attr( "x", width - 100 ).attr( "dy", 20 ).text( legend_values[ 1 ] )
						.append( "tspan").attr( "class", "legend_title")
						.attr( "x", width - 100 ).attr( "dy", 20 ).text( legend_values[ 2 ] )
						.append( "tspan").attr( "class", "legend_text")
						.attr( "x", width - 100 ).attr( "dy", 20 ).text( legend_values[ 3 ] );
		} else {
			svg.selectAll( "line.horizontalGridY" )
				.data( y.ticks(10)).enter()
				.append( "line" )
				.attr( "x1", 1 )
				.attr( "x2", width )
				.attr( "y1", function( d ) { return y( d ); } )
				.attr( "y2", function( d ) { return y( d ); } )
				.style( "fill", "none" )
				.style( "shape-rendering", "crispEdges" )
				.style( "stroke", "#f5f5f5" )
				.style( "stroke-width", "1px" ;

			svg.selectAll( "line.horizontalGridX" )
				.data( x.ticks( 10 ) ).enter()
				.append( "line" )
				.attr( "x1", function( d, i ) { return x( d ); } )
				.attr( "x2", function( d, i ) { return x( d ); } )
				.attr( "y1", 1 )
				.attr( "y2", height )
				.style( "fill", "none" )
				.style( "shape-rendering", "crispEdges" )
				.style( "stroke", "#f5f5f5" )
				.style( "stroke-width", "1px" );
		}

		d3.select( "body" ).style( "font","10px sans-serif" );
		d3.selectAll( ".axis line" ).style( "stroke", "#000" );
		d3.selectAll( ".y.axis path" ).style( "display", "none" );
		d3.selectAll( ".x.axis path" ).style( "display", "none" );
		d3.selectAll( ".legend_title" )
			.style( "font-size","12px" ).style( "fill", "#555" ).style( "font-weight", "400" );
		d3.selectAll( ".legend_text" )
			.style( "font-size", "20px" ).style( "fill", "#bbb" ).style( "font-weight", "700" );

		if ( data[ 0 ].length > 0 ) {
			var simulation = svg.selectAll( ".simulation" )
			.data( data )
			.enter().append( "g" )
			.attr( "class", "simulation" );

			simulation.append( "path" )
			.attr( "class", "line" )
			.attr( "fill", "none" )
			.attr( "d", function( d ) { return line( d ); } )
			.style( "stroke", function( d, i ) { return color( i ); } );
		} else {
			svg.append( "path" )
			.datum( data )
			.attr( "class", "line" )
			.attr( "fill", "none" )
			.attr( "d", line )
			.style( "stroke", "steelblue" );
		}
		d3.selectAll( ".line" ).style( "fill", "none" ).style( "stroke-width", "1.5px" );
	}

```

```js

	//	setup graph to view multiple sets of generations instead of just one set

	function next_generation( simulation_data ) {
		...
		simulation_data.push( p )
	}

	function simulation( simulation_counter ) {
		//	reset p
		p = .5

		for ( var i = 0; i < generations; i++ ) {
			next_generation( data[ simulation_counter ] )
		}
	}

	for ( var i = 0; i < 10; i++ ) {
		data.push( [ ] )
		simulation( i )
	}

```

observation:
genetic drift will eventually cause genetic variation to go to 0 given enough time

genetic variation is not 0 in real life because there are other factors in action like mutation, etc



---



# mutation



```js



```



---



# migration



```js



```



---



# natural selection



```js



```



---



# epidemics



```js



```



---
