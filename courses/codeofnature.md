


# introduction



## random walks

imagine flipping a coin twice & taking a step in a direction
heads heads - step forward
heads tails - step right
tails heads - step left
tails tails - step backward



## random walker class

```js

	function Walker() {
		const self = {
			let x, y

			function init() {
				x = width / 2
				y = height / 2
			}

			function display() {
				stroke( 0 )
				point( x, y )
			}

			// up, down, left, right
			function step() {
				const choice = Math.floor( Math.random() * 4 )

				if ( choice == 0 ) {
					x++
				} else if ( choice == 1 ) {
					x--
				} else if ( choice == 2 ) {
					y++
				} else {
					y--
				}
			}

			// up, down, left, right, diagonal, stay still
			function stepAdvanced() {
				const stepX = Math.floor( Math.random() * 3 ),
					stepY = Math.floor( Math.random() * 3 )

				x += stepX
				y += stepY
			}
		}

		return self
	}

```



## probability

40% chance of walking right

```js

	// up, down, left, right
	function step() {
		const choice = Math.random()

		if ( choice < .4 ) { // 40% chance of moving right
			x++
		} else if ( choice < .6 ) {
			x--
		} else if ( choice < .8 ) {
			y++
		} else {
			y--
		}
	}

```


## normal distribution of random numbers

random in real life doesn't occur so evenly distributed as random() does

gaussian distribution
:	distribution of values that cluster around an average
:	creates a bell curve

mean
:	average
:	total sum of all values / total number of values

difference from mean
:	current value - mean

variance
:	difference from mean * difference from mean

average variance
:	total sum of variance / total number of variance

standard deviation
:	square root of average variance



## custom distribution of random numbers

higher the random number, the higher chance it will be picked

```js

	function montecarlo() {
		while ( true ) {
			const r1 = Math.random(),
				probability = r1,
				r2 = Math.random()

			if ( r2 < probability ) {
				return r1
			}
		}
	}

```



## perlin noise

smooth, organic like randomness in sequence
pass in time value to get num at time
greater the difference in time, the greater the randomness/jumps
always results between 0 & 1
map it to other range if you need different output

if you require two different incrementing numbers
grab it from two drastic different time inputs
else they will be too similar to each other



---



# vectors



## vectors, you complete me

combine info about x, y into a single item
combine xSpeed, ySpeed into a single item
= vector
v( 19, 82 )

euclidean vector
:	geometric vector
:	an entity that has both magnitude & direction
:	difference between two points

scalar
:	single value used to scale vectors



## vectors for programmers

difference between two points

at every frame
`location = location + velocity`
new location = velocity applied to current location
location vector( 0, 0 ) + velocity vector( 3, 4 )

vector is just a convenient way to store two values ( or 3 in 3D examples )



## vector addition

```js

	function add( vector ) {
		y = y + vector.y
		x = x + vector.x
	}

```



## more vector math

```js

	function sub( vector ) {
		y = y - vector.y
		x = x - vector.x
	}

	function mul( num ) {
		y = y * num
		x = x * num
	}

```



## vector magnitude

magnitude
:	the length of the vector
:	square root of ( a squared plus B squared )
:	`Math.sqrt( a * a + b * b )`



## normalizing vectors

take a vector of any length
keep it pointing in the same direction
change its length to a fixed size ie. 1
turning it into what is called a unit vector

e.g. vector( 3, 4 ) = magnitude of 5
if we want the magnitude to be 1
5/5 = 1
thus
3/5 & 4/5 will give us the unit vector
divide points A & B by magnitude



## velocity

motion 101

1.	add velocity to location
2.	draw object at location



## acceleration

acceleration
:	is the rate of change of velocity
:	is added to the velocity vector
:	a = force / mass

speed
:	magnitude of velocity

`velocity.add( acceleration )`
`location.add( velocity )`



## static vs non-static functions

`PVector.add( v, u )`
static
:	called from the class name
:	results in a new vector

`v.add( u )`
not static
:	called from an object instance
:	results in vector v modified



## interactivity with acceleration

1.  calculate a vector that points from the object to the target location ( mouse )
2.  normalize that vector ( reducing its length to 1 )
3.  scale that vector to an appropriate value ( by multiplying it by some value )
4.  assign that vector to acceleration

accelerating towards mouse

+	find direction by mousexy - currentxy
+	normalize direction
+	scale it by a number, ie. 0.5
+	= acceleration
+	velocity add acceleration
+	this location add velocity

then loop

accelerating towards point might cause it to overshoot
then on trying to get back to point, overshoots again
in later chapters will explore slowing down to hit/arrive at target point



---



# forces



## forces & newton's law of motion

force
:	is a vector that causes an object with mass to accelerate

newton's first law
> An object’s velocity will only remain constant in the absence of any forces or if the forces that act on it cancel each other out, i.e. the net force adds up to zero. This is often referred to as equilibrium. The falling ball will reach a terminal velocity (that stays constant) once the force of air resistance equals the force of gravity.

newton's third law
> Forces always occur in pairs. The two forces are of equal strength, but in opposite directions.

mass
:	amount of matter in an object - measured in kg

weight
:	force of gravity on an object aka mass * gravity - measured in newtons
:	because weight is a force, thus mass * acceleration

density
:	amount of mass per unit volume



## newton's second law as a function

newton's second law
> Force equals mass times acceleration.

```js

	move.applyForce( wind )
	move.applyForce( gravity )

	function applyForce( force ) {
		acceleration = force
	}

```



## force accumulation

net force equals mass times acceleration
thus to update previous function to be accumulative

```js

	function applyForce( force ) {
		acceleration.add( force )
	}

```

updating frames

+	velocity add acceleration
+	location add velocity
+	acceleration reset aka * 0



## dealing with mass

> Acceleration is directly proportional to force & inversely proportional to mass. This means that if you get pushed, the harder you are pushed, the faster you’ll move (accelerate). The bigger you are, the slower you’ll move.

divide by mass before adding
aka
acceleration += ( force / mass )

```js

	function applyForce( force ) {
		force.div( mass )
		acceleration.add( force )
	}

```


## creating forces

1.	make up a force
	experiment with different numbers
	manipulate your world

2.	model a force
	forces exist in the real world
	physics textbooks often contain formulas for these forces
	take these formulas, translate them into source code
	model real-world forces



## gravity & modeling force

give arbitary number, say, v( 0, 0.1 )
scale gravity by mass to b more accurate

gravity = v( 0, 0.1 * mass )



## friction

friction
:	dissipative force
:	total energy of a system decreases when an object is in motion

+	c = coefficient of friction aka strength aka arbitary number
+	friction magnitude = c * normal force aka perpendicular force to object's motion along surface
+	thus friction = normalize( velocity * -1 ) * friction magnitude

```js

	const c = 0.01;
	const friction = movers[ i ].velocity.get()

	friction.mult( -1 )
	friction.normalize()
	friction.mult( c )

	movers[ i ].applyForce( friction );

```



## air & fluid resistance ( drag )

+	c = coefficient of friction aka strength aka arbitary number
+	speed = magnitude of velocity
+	drag magnitude = c * speed * speed
+	drag = normalize( velocity * -1 ) * drag magnitude



## gravitational attraction

+	force = vector that points from objLoc1 to objLoc2
+	distance = magnitude of force
+	G = universal gravitational constant aka arbitary number
+	ga = normalize( force ) * ( G * mass1 * mass2 ) / ( distance * distance )



## everything attracts or repels everything

``` js

	// Demonstration of multiple force acting on
	// bodies (Mover class)
	// Bodies experience gravity continuously
	// Bodies experience fluid resistance when in "water"

	// Five moving bodies
	var movers = [];

	// Liquid
	var liquid;

	function setup() {
		createCanvas( 640, 360 );
		reset();
		// Create liquid object
		liquid = new Liquid( 0, height / 2, width, height / 2, 0.1 );
	}

	function draw() {
		background( 127 );

		// Draw water
		liquid.display();

		for ( var i = 0; i < movers.length; i++ ) {

		// Is the Mover in the liquid?
		if ( liquid.contains( movers[ i ] ) ) {
			// Calculate drag force
			var dragForce = liquid.calculateDrag( movers[ i ] );
			// Apply drag force to Mover
			movers[ i ].applyForce( dragForce );
		}

		// Gravity is scaled by mass here!
		var gravity = createVector( 0, 0.1 * movers[i].mass );
		// Apply gravity
		movers[ i ].applyForce( gravity );

		// Update & display
		movers[ i ].update();
		movers[ i ].display();
		movers[ i ].checkEdges();
		}

	}


	function mousePressed() {
		reset();
	}

	// Restart all the Mover objects randomly
	function reset() {
		for ( var i = 0; i < 9; i++ ) {
			movers[ i ] = new Mover( random( 0.5, 3 ), 40 + i * 70, 0 );
		}
	}

	var Liquid = function( x, y, w, h, c ) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = c;
	};

	// Is the Mover in the Liquid?
	Liquid.prototype.contains = function( m ) {
		var l = m.position;
		return l.x > this.x && l.x < this.x + this.w &&
				l.y > this.y && l.y < this.y + this.h;
	};

	// Calculate drag force
	Liquid.prototype.calculateDrag = function( m ) {
		// Magnitude is coefficient * speed squared
		var speed = m.velocity.mag();
		var dragMagnitude = this.c * speed * speed;

		// Direction is inverse of velocity
		var dragForce = m.velocity.copy();
		dragForce.mult( -1 );

		// Scale according to magnitude
		// dragForce.setMag(dragMagnitude);
		dragForce.normalize();
		dragForce.mult( dragMagnitude );
		return dragForce;
	};

	Liquid.prototype.display = function() {
		noStroke();
		fill( 50 );
		rect( this.x, this.y, this.w, this.h );
	};

	function Mover( m, x, y ) {
		this.mass = m;
		this.position = createVector( x, y );
		this.velocity = createVector( 0, 0 );
		this.acceleration = createVector( 0, 0 );
	}

	// Newton's 2nd law: F = M * A
	// or A = F / M
	Mover.prototype.applyForce = function( force ) {
		var f = p5.Vector.div( force, this.mass );
		this.acceleration.add( f );
	};

	Mover.prototype.update = function() {
		// Velocity changes according to acceleration
		this.velocity.add( this.acceleration );
		// position changes by velocity
		this.position.add( this.velocity );
		// We must clear acceleration each frame
		this.acceleration.mult( 0 );
	};

	Mover.prototype.display = function() {
		stroke( 0 );
		strokeWeight( 2 );
		fill( 255, 127 );
		ellipse( this.position.x, this.position.y, this.mass * 16, this.mass * 16 );
	};

	// Bounce off bottom of window
	Mover.prototype.checkEdges = function() {
		if ( this.position.y > ( height - this.mass * 8 ) ) {
			// A little dampening when hitting the bottom
			this.velocity.y *= -0.9;
			this.position.y = ( height - this.mass * 8 );
		}
	};

```



### to note

whenever we need to divide stuff
ask - could that number be 0
that would cause errors

special note for ga too, constrain distance by a range
else when it gets too near the force could be too strong
or too far, it's not worth to calculate as it's too weak
ie. constrain to between 5, 50



---



# oscillation



## angles

degrees
:	0 to 360
:	degrees = radians * 180 / PI

radians
:	ratio of length of arc of circle to radius of circle
:	1 radian = an angle when that ratio equals 1
:	radians = degrees * PI / 180

PI
:	ratio of circle's circumference to its diameter



## angular motion

location = location + velocity
velocity = velocity + acceleration

angle = angle + angular velocity
angular velocity = angular velocity + angular acceleration



## trigonometry

soh
:	sine = opposite / hypotenuse

cah
:	cosine = adjacent / hypotenuse

toa
:	tangent = opposite / adjacent



## pointing in the direction of movement

if
`tangent( angle ) = velocityY / velocityX`

then
`angle = arctangent( velocityY / velocityX )`

where
`arctangent = atan`

problem occurs when two vectors pointing in opposite directions
they solve with same degrees
V1 ⇒ angle = atan( -4 / 3 ) = atan( -1.25 ) = -0.9272952 radians = -53 degrees
V2 ⇒ angle = atan( 4 / -3 ) = atan( -1.25 ) = -0.9272952 radians = -53 degrees

thus, use `atan2()` instead



## polar vs cartesian coordinates

Cartesian coordinate—the x,y components of a vector
Polar coordinate—the magnitude ( length ) & direction ( angle ) of a vector

angle is sometimes referred to as theta
magnitude ( length ) is r

sine( theta )   = y / r   →   y = r * sine( theta )
cosine( theta ) = x / r   →   x = r * cosine( theta )



## oscillation amplitude & period

amplitude
:	the distance from the center of motion to either extreme

period
:	the amount of time it takes for one complete cycle of motion

`x = amplitude * cos( 2 * PI * frameCount / period )`

frequency
:	1 / period



## oscillation with angular velocity

if we don't need to be precise we can pass a generic angle in cos()

```js

	let angle = 0,
		aVelocity = 0.05,
		amplitude = 100

	function loop() {
		x = amplitude * cos( angle )
		angle += aVelocity
	}

```



## waves

```js

	let angle = 0,
		aVelocity = 0.2,
		amplitude = 100

	for ( x = 0; x <= width; x += 24 ) {
		loop()
	}

	function loop() {
		y = amplitude * sin( angle )
		angle += aVelocity
	}

```


## trigonometry & forces: pendulum

pendulum angular acceleration = acceleration due to gravity * sin( angle )


```js

	let damping = .995,
		gravity = .4,
		aAcceleration = 0,
		angle = PI / 4, // start with 45 degrees
		aVelocity = 0

	function updateAngle() {
		aAcceleration = ( -1 * gravity / length ) * sin( angle )

		aVelocity += aAcceleration
		angle += aVelocity

		aVelocity *= damping
	}

	function drawPoints() {
		location.set( length * sin( angle ), length * cos( angle ), 0 )
		location.add( origin )

		line( origin.x, origin.y, location.x, location.y ) // draw line
		fill( 175 )
		ellipse( location.x, location.y, 16, 16 ) // draw bob
	}

```



## spring forces

the force of the spring is directly proportional to the extension of the spring

Force of spring = -k * x
where
k is a constant that determines if spring is highly elastic or rigid
x is the displacement of spring, difference between current length vs resting length



---



# particle systems



## a single particle

emitter
:	usually used in particle systems
:	source of particles
:	controls init settings
:	a particle is born here

lifespan
:	let old particles die
:	x amount
:	-- every frame
:	if < 0, dead



## the arraylist

place particles into an array to loop thru
remove dead particles from array

1.	iterate array backwards so deleting items off won't cause it to skip next no.
2.	use an iterator ( not sure if this is useful in javasript )



## the particle system class

move the loops & functions into a class or factory
easier to control multiple systems & overall cleaner



## a system of systems

add systems into an array
loop array
tell each system to run, do it's stuff



## inheritance & polymorphism

to prevent copy & pasting things like variables & functions across systems
we use inheritance to share common stuff between them

polymorphism allow objects with different types to be stored together



## inheritance basics

my own preference
use factory functions instead

```js

	const barker = ( state ) => ({
		bark() {
			console.log( 'woof ' + state.name )
		}
	})

	const driver = ( state ) => ({
		drive() {
			state.position = state.position + state.speed
		}
	})

	barker({ name: 'karo' }).bark()
	//	woof karo

	const murderRobotDog = ( name ) => {
		let state = {
			name,
			speed: 100,
			position: 0
		}

		return Object.assign({},
			barker( state ),
			driver( state )
		)
	}

	murderRobotDog( 'sniffles' ).bark()
	//	woof sniffles

	const newBot = murderRobotDog( 'anol' )
	newBot.bark()
	//	woof anol

```



## particles with inheritance

-



## polymorphism basics

-



## particle systems with polymorphism

-



## particle systems with forces

-



## particle system with repellers

-



## image textures & additive blending

-



---



# physics libraries



---



# autonomous agents



---



# cellular automata



---



# fractals



---



# the evolution of code



---



# neural networks



---
