


https://natureofcode.com/book/



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
	newBot.bark();
	//	woof anol

```



## particles with inheritance

```js

	const newState = ( location ) => {
		return {
			location,
			velocity: [ Math.random(), Math.random() ],
			acceleration: [ 0, .5 ]
		}
	}

	const Particle = ( state ) => {
		return {
			run() {
				this.update()
				this.display()
			},
			add( a, b ) {
				a[ 0 ] += b[ 0 ]
				a[ 1 ] += b[ 1 ]
			},
			update() {
				this.add( state.velocity, state.acceleration )
				this.add( state.location, state.velocity )
			},
			display() {
				console.log( state.location )
			}
		}
	}

	const particle = Particle( newState([ 0, 0 ]) )
	particle.run()

	const SpecialParticle = ( state ) => {
		state.location = [ 10, 0 ]

		return Object.assign( Particle( state ), {
			init() {
				state.acceleration = [ 10, 0 ]
			},
			change() {
				this.add( state.location, [ 0, 10 ] )
			},
			run() {
				this.update()
				this.change()
				this.display()
			}
		})
	}

	const specialParticle = SpecialParticle( newState([ 0, 0 ]) )
	specialParticle.init()
	specialParticle.run();

```

## polymorphism basics

polymorphism refers to the treatment of a single instance of an object in multple forms
a dog is certainly a dog, but since dog extends animal, it can also be considered an animal



## particle systems with polymorphism

1.	array of particles
2.	add particles in array
	-	add normal particles
	-	add confetti
3.	loop mutha array
	-	ask particle to do its stuff

this way we have a single particle array to handle
instead of two arrays to hold two different types of arrays



## particle systems with forces

-	apply force function ( pass force in )
	-	loop particles
	-	particle.applyForce( force )



## particle system with repellers

-	apply repeller function ( pass thing to repel )
	-	loop particles
	-	force = thing to repel against particle
	-	particle.applyForce( force )

-	thing to repel against particle
	-	dir = thing location - particle location
	-	d = dir.magnitude
	-	dir.normalize()
	-	d = constrain( d, 5, 100 )
	-	force = -1 * strength / ( d * d )
	-	dir * force
	-	return dir


## image textures & additive blending

-	processing specific thus skip



---



# physics libraries



## what is box2d & when is it useful?

a physics library that can help with complicated real world physics
initially built in C++ but subsequently ported over to various other languages



## getting box2d in processing

js in my case instead of processing

-	https://github.com/kripken/box2d.js
-	https://github.com/shakiba/planck.js

other js physics libraries

-	http://brm.io/matter-js
-	https://github.com/schteppe/p2.js



## box2d basics

basic idea

1.	setup
	-	create everything in our pixel world
	-	translate into box2s world
2.	draw
	-	ask box2d where everything is
	-	translate box2d's answer into pixel world
	-	draw everything

core elements of a box2d world

1.  world
	manages physics simulation
	knows everything about overall coordinates space
	stores lists of every element in world
2.	body
	primary element in box2d world
	has a location
	has velocity
3.	shape
	keeps track of collision geometry attached to a body
4.	fixture
	attaches a shape to a body
	sets properties like density, friction, restitution
5.	joint
	acts as connection between two bodies
	or between body & the world itself
6.	vec2
	describes a vector in the box2d world

learn more here,
http://box2d.org/manual.pdf



## living in a box2d world

-	**gravity**
	start with createWorld()
	a default gravity pointing down will be assigned
	you can reassign using box2d.setGravity( 0, -10 )
	or set it to ( 0, 0 ) if you want to turn off gravity


-	**space**
	box2d ( 0, 0 ) is in the center of screen
	unlike pixel world which is cornered at top left
	thus what we're used to is +y to add gravity
	while box2d -y to add gravity


-	**helpers**
	help convert between pixel world & box2d world
	`coordPixelsToWorld()`
	`coordWorldToPixels()`
	`scalarPixelsToWorld()`
	`scalarWorldToPixels()`



## building a box2d body

body is the primary element
it isn't anything physical
shapes will attach to a body
a body is like a soul

types of body

-	**dynamic**
	use most often
	moves around world, collides, responds to forces

-	**static**
	cannot move
	used for platforms & boundaries

-	**kinematic**
	cannot be moved manually by setting velocity directly
	can be used for user-controlled object
	can only collide with dynamic bodies & not with static or kinematic bodies

```js

	//	define new body
	bd = new BodyDef()

	//	get browser center
	//	convert to box2d world
	Vec2 center = box2d.coordPixelsToWorld( width / 2, height / 2 )

	//	set body position
	bd.position.set( center ) //

	//	body never rotate
	bd.fixedRotation = true

	//	add friction
	bd.linearDamping = 0.8
	bd.angularDamping = 0.9

	//	fast moving objects set as bullets
	//	this tells box2d to check collisions more carefully
	bd.bullet = true

	//	finally create actual body
	body = box2d.createBody( bd )

	//	set other init state if needed
	body.setLinearVelocity( new Vec2( 0, 3 ) )
	body.setAngularVelocity( 1.2 );

```



## three's company: bodies & shapes & fixtures

shape class keeps track of collision geometry attached to a body
also has properties like density, friction, restitution( bounciness ) defined through a fixture
can combined different shapes to a body to create complex objects

```js

	//	define new shape
	var ps = new PolygonShape()

	//	set width/height
	//	conver to box2d world
	var box2Dw = box2d.scalarPixelsToWorld( 150 ),
		box2Dh = box2d.scalarPixelsToWorld( 100 )

	//	use setAsBox to define shape as a rectangle
	ps.setAsBox(box2Dw, box2Dh)

	//	define new fixture
	var fd = new FixtureDef()

	//	assign to shape
	fd.shape = ps

	//	coefficient of friction usually between 0 & 1
	fd.friction = 0.3

	//	elasticity usually between 0 & 1
	fd.restitution = 0.5

	//	density in kg/m2
	fd.density = 1.0

	//	creates fixture & attach shape to body
	body.createFixture( fd )

	//	box2d will use defaults if fixture isn't defined
	//	create fixture & attach shape at one go is possible too
	//	below sets density to 1 as it creates fixture
	body.createFixture( ps, 1 );

```

**recap steps**

1.	define body using a BodyDef object ( set any properties, such as location )
2.	create body object from body definition
3.	define shape object using PolygonShape, CircleShape, or any other shape class
4.	define fixture using FixtureDef, assign a shape ( set any properties, such as friction, density, restitution )
5.	Attach the shape to the body



## box2d & processing: reunited & it feels so good

box2d keeps a list of all bodies in the world
called using `getBodyList()`

`box2d.step()` advances the box2d world a step in time
without this function, nothing will happen
box2d sweeps looks at all bodies & figure what to do with them

`var pos = box2d.getBodyPixelCoord( body )`
get pixel coordinates at current point in time

`body.getAngle()` to get angle of body
but rotation of box2d is in opposite direction to pixel world
multiply it by -1 to get pixel rotation

`box2d.destoryBody( body )` to kill object if needed



## fixed box2d objects

`bd.type = BodyType.STATIC`
makes immovable bodies like the ground
can just draw it without checking coords & rotation since it doesn't move



## a curvy boundary

ChainShape, PolygonShape, CircleShape creates different shapes

```js

	//	define body
	var bd = new BodyDef()
	//	body does not need position
	//	EdgeShape will take care of that
	//	does not need type too as it is STATIC by default
	var body = box2d.world.createBody( bd )

	//	define shape
	var chain = new ChainShape()

	//	configure shape
	//	ChainShape is series of connected vertices
	//	specify an array of Vec2
	//	if straight line, ( 0, 150 ) & ( width, 150 )
	//	if a loop is needed, use ChainLoop instead
	var vertices = new Vec2[ 2 ]
	vertices[ 0 ] = box2d.coordPixelsToWorld( 0, 150 )
	vertices[ 1 ] = box2d.coordPixelsToWorld( width, 150 )
	//	to create the chain with vertices
	//	the array is passed into a function called createChain()
	chain.createChain( vertices, vertices.length )

	//	attach shape to body with fixture
	//	shapes must be attached to bodies
	var fd = new FixtureDef()
	fd.shape = chain
	fd.density = 1
	fd.friction = .3
	fd.restitution = .5
	body.createFixture( fd );

```



## complex forms

PolygonShape can also be generated from an array

```js

	var vertices = new Vec2[ 4 ]
	vertices[ 0 ] = box2d.vectorPixelsToWorld( new Vec2( -15, 25 ) )
	vertices[ 1 ] = box2d.vectorPixelsToWorld( new Vec2( 15, 0 ) )
	vertices[ 2 ] = box2d.vectorPixelsToWorld( new Vec2( 20, -15 ) )
	vertices[ 3 ] = box2d.vectorPixelsToWorld( new Vec2( -10, -10 ) )

	var ps = new PolygonShape()
	ps.set( vertices, vertices.length );

```

things to note

-	**order of vertices**
	if you're thinking in terms of pixels
	it should be defined in counterclockwise order
	when it's translated to box2d
	they will be flipped & thus become clockwise

-	**convex shapes only**
	box2d does not support concave shapes
	aka shapes that curves inwards
	if concave is needed, use multiple convex shapes merged

to build a body with multiple shapes

1.	define body
2.	create body
3.	define shape
4.	attach shape to body
repeat 3, 4 as many times as needed
5.	finalise body's mass

by default shape is attached to middle of body
offset it to adjust accordingly using variable called m_p

```js

	//	set offset in pixels
	var offset = new Vec2( 0, -h/2 )
	//	convert to box2d
	offset = box2d.vectorPixelsToWorld( offset )
	//	set location of circle
	circle.m_p.set( offset.x, offset.y );

```



## feeling attached - box2d joints

1.	**distance joints**
	connect two bodies with a fixed length
	attached to each body at specified anchor point relative to body's center

```js

	var p1 = new Particle()
	var p2 = new Particle()

	//	define joint
	var djd = new DistanceJointDef()

	//	tell joint which two bodies it connects
	djd.bodyA = p1.body
	djd.bodyB = p2.body

	//	setup length
	djd.length = box2d.scalarPixelsToWorld( 10 )

	//	frequency of harmoic oscillation
	//	usually values 1 to 5
	djd.frequencyHz = 1

	//	dampens spring
	//	usually values 0 to 1
	djd.dampingRatio = 1

	//	create joint
	var dj = ( DistanceJoint ) box2d.world.createJoint( djd );

```

2.	**revolute joints**
	connects two bodies at a common anchor point
	like a hinge
	joint has angle that describes relative rotation of each body

```js

	var box1 = new Box()
	var box2 = new Box()

	//	define joint
	var rjd = new RevoluteJointDef()

	//	init two bodies & where they are connected
	rjd.initialize( box1.body, box2.body, box1.body.getWorldCenter() )
	//	3rd arguement gets center of box1 body

	//	add motor to spin it autonomously if needed
	rjd.enableMotor = true
	rjd.motorSpeed = PI * 2	// how fast
	rjd.maxMotorTorque = 1000 // how powerful

	//	can be constrained between two angles
	rjd.enableLimit = true
	rjd.lowerAngle = -PI / 8
	rjd.upperAngle = PI / 8

	//	create joint
	var joint = ( RevoluteJoint ) box2d.world.createJoint( rjd );

```

3.	**mouse joints**
	to move a body with the mouse
	or used to drag an object around the screen

	note:
	if you directly set an object's position it will break the physics of box2d
	as if object is teleporting, box2d no longer knows how to compute it
	a mouse joint is as if a rope is tied to an object & dragged around
	thus the physics still works

```js

	//	define joint
	var md = new MouseJointDef()

	//	getGroundBody is to make as if the screen is like the ground
	//	the object is joint to the screen
	//	the point of the joint is a moving target aka the mouse on the screen
	md.bodyA = box2d.getGroundBody()
	//	attach the box body
	md.bodyB = box.body

	//	set properties
	md.maxForce = 5000
	md.frequencyHz = 5
	md.dampingRatio = .9

	//	create joint
	var mouseJoint = ( MouseJoint )
	box2d.world.createJoint( md );

	//	we'll need to update target location continually
	var mouseWorld = box2d.coordPixelsToWorld( mouseX, mouseY )
	mouseJoint.setTarget( mouseWorld );

```

another way to move an object to mouse
is to set a body to be a KINEMATIC type
they can be controlled by setting velocity directly
eg. if you want an object to follow a target like the mouse
create a vector that points from body's location to a target

```js

	var bd = new BodyDef()
	bd.type = BodyType.KINEMATIC

	var pos = body.getWorldCenter()
	var target = box2d.coordPixelsToWorld( mouseX, mouseY )
	var v = target.sub( pos ) // vector pointing to mouse

	//	assign body's velocity directly
	//	overriding physics
	body.setLinearVelocity( v );
	//	can also do the same with angular velocity
	//	kinematic bodies do not collide with other kinematic or static bodies
	//	in those cases a mouse joint is preferable

```



## bringing it all back home to forces

`body.applyForce( force, pos )`
box2d allows us to specify where the force is applied on the body

when we created our own applyForce function previously
it simply applies on to the center



## collision events

box2d alerts you to moments of collision with something called an 'interface'
start with `box2d.listenForCollisions()`

types of collision event callbacks

1.	**beginContact()**
	when two shapes first come into contact with each other

2.	**endContact()**
	over & over again as long as shapes continue to be in contact

3.	**preSolve()**
	before box2d solves the outcome of collision
	ie. before beginContact()
	can be used to disable collision if needed

4.	**postSolve()**
	after outcome of collision is solved
	allows you to gather information about the 'solution'
	which is known as 'impulse'



## a brief interlude - integration methods

**differentiation** is the process of finding a 'derivative'

location is a point in space
velocity is change in location over time
thus, velocity can be described as the 'derivative' of location

acceleration is change in velocity over time
thus, accelaration is the 'derivative' of velocity

**integration** is the inverse of the derivative

integral of object's velocity over time tells us object's new location when time period ends

location is integral of velocity
velocity is integral of acceleration

integration figures out where the object is at x time
we've been doing integration like so
`velocity.add( acceleration )`
it's a methodology known as Euler integration or the Euler method
it's the simpleset form of integration but not necessarily the most efficient or accurate
in real life location is a continuous integration, while Euler integrates at fixed points
thus outputting a series of line segments rather than a smooth curve
one option to overcome this is to use smaller segments/time
but it isn't practical as it will cause too much processing to take place

box2d uses symplectic Euler or semi-explict Euler, a slight modification of Euler



## verlet physics with toxiclibs

an alternative to box2d
when to use?

-	collisions needed
	multiple shaped objects knocking each other around
	= *use box2d*
	toxiclibs does not handle collisions

-	particles flying around
	attract or repel each other
	connected with springs
	= *use toxiclibs*
	simplier to use than box2d
	suited for connected particle systems
	high performance due to verlet integration algorithm ( & ignores collisions )

translating box2d world to verlet physics
**core elements**
World   => VerletPhysics
Body    => VerletParticle
Shape   => n/a
Fixture => n/a
Joint   => VerletSpring

```js

	//	create world
	var physics = new VerletPhysics2D()

	//	set global properties
	physics.setWorldBounds( new Rect( 0, 0, width, height ) )

	//	add gravity - how strong, which direction
	physics.addBehavior( new GravityBehavior( new Vec2D( 0, .5 ) ) )

	//	to calculate call update() on every draw
	var draw = ()=> physics.update();

```



## particles & springs in toxiclibs



## putting it all together: a simple interactive spring



## connected systems, part 1: string



## connected systems, part 2: force-directed graph



## attraction & repulsion behaviors



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
