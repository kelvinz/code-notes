


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
it's the simplest form of integration but not necessarily the most efficient or accurate
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
	var draw = () => physics.update();

```



## particles & springs in toxiclibs

1.	**VerletSpring**
	springy connection between two particles in space
	properties can be configured to create stiff stick-like or highly elastic
	a particle can also be locked so that only one end of the spring can move

2.	**VerletConstrainedSpring**
	maximum distance can be limited
	can help whole spring system achieve better stability

3.	**VerletMinDistanceSpring**
	only enforces its rest length if current distance is less than rest length
	ensure objects are at least a certain distance from each other



## putting it all together: a simple interactive spring

in box2d, you can't manually change location of object without breaking physics
in toxiclibs you can
but it's generally a good idea to call the lock() function first
lock() is typically used to lock a particle in place
lock it, move it, then unlock it so that it continues to move according to toxiclibs physics simulation

```js

	if ( mousePressed ) {
		p2.lock()
		p2.x = mouseX
		p2.y = mouseY
		p2.unlock()
	}

```



## connected systems, part 1: string

```js

	//	20 particles, 10 pixels apart
	var particles = [],
		numParticles = 20,
		dist = 10

	for ( var i = 0; i < numParticles; i++ ) {
		//	create new particle
		//	spaced apart by dist
		var particle = new Particle( 0, i * dist )

		//	add to world
		physics.addParticle( particle )

		//	add to list
		particles.add( particle )

		//	connect the particles
		if ( i != 0 ) {
			//	find reference to previous particle
			var previous = particles.get( i - 1 )

			//	make spring connection between particles
			var spring = new VerletSpring2D( particle, previous, dist, strength )

			//	add spring to world
			physics.addSpring( spring )
		}
	}

```



## connected systems, part 2: force-directed graph

-	**no node is connected to itself**
	ie. we don't have 0 connected to 0 or 1 connected to 1

-	**don't repeat connections in reverse**
	if 0 is connected to 1, we don't need 1 to connect to 0 since it's already is

```js

	var cluster = () => {
		function create( n, d, center ) {
			var nodes = [],
				//	resting length between nodes
				diameter = d

			for ( var i = 0; i < n; i++ ) {
				//	if all node objects start at same loc it'll have an issue
				//	so add random vector to center so it's slightly offset
				nodes.add( new Node( center.add( Vec2D.randomVector() ) ) )
			}

			for ( var i = 0; i < nodes.size() - 1; i++ ) {
				ni = nodes.get( i )

				for ( var j = i + 1; j < nodes.size(); j++ ) {
					nj = nodes.get( j )

					//	connects nodes ni & nj
					physics.addSpring( new VerletSpring2D( ni, nj, diameter, .01 ) )
				}
			}
		}
	};

```



## attraction & repulsion behaviors

toxiclibs lets us addForce too & even has common forces built-in

```js

	//	add attraction force to a particle
	//	all other particles will be attracted to this particle
	var p = new Particle( new Vec2D( 200, 200 ) ),
		//	how far away will the force be felt by others
		distance = 20,
		//	how strong the force is
		strength = .1,
		behavior = new AttractionBehavior( p, distance, strength )

	physics.addBehavior( behavior );

```

even though toxiclibs doesn't handle collisions
you can create a collision-like effect by using a repulsive behavior
so every particle repels each other
change strength to negative in behavior to create a repulsive force



---



# autonomous agents



## forces from within

-	limited ability to perceive environment
-	proccesses information from its environment & calculates an action
-	has no leader



## vehicles & steering

idealized vehicles has 3 layers

1.	**action selection**
	-	has a goal
	-	can select action based on goal
	-	eg. seek target, avoid obstacle, follow path

2.	**steering**
	-	once action selected, calculate next move
	-	steering force = desired velocity - current velocity

3.	**locomotion**
	-	ie. left leg, right leg, spinning wheels or oscillating paddles?



## the steering force

```js

	const Vehicle = () => {
		let location, velocity, acceleration, r, maxforce, maxspeed

		const init = ( x, y ) => {
			acceleration = new PVector( 0, 0 )
			velocity = new PVector( 0, 0 )
			location = new PVector( x, y )
			r = 3 // size
			maxspeed = 4
			maxforce = .1
		}

		const update = () => {
			velocity.add( acceleration )
			velocity.limit( maxspeed )
			location.add( velocity )
			acceleration.mult( 0 )
		}

		const applyForce = ( force ) => {
			acceleration.add( force )
		}

		const seek = ( target ) => {
			let desired = PVector.sub( target, location )
			desired.normalize()
			desired.mult( maxspeed )

			let steer = PVector.sub( desired, velocity )
			steer.limit( maxforce )
			applyForce( steer )
		}

		const display = () => {
			//	vehicle is a triangle pointing in direction of velocity
			//	since it is drawn pointing up, we rotate it 90 degrees
			let theta = velocity.heading() + PI/2
			fill( 175 )
			stroke( 0 )
			pushMatrix()
			translate( location.x, location.y )
			rotate( theta )
			beginShape()
			vertex( 0, -r*2 )
			vertex( -r, r*2 )
			verlex( r, r*2 )
			endShape( CLOSE )
			popMatrix
		}
	};

```



## arriving behavior

because the vehicle always moves as fast as possible towards target
it will keep overshooting target
may never arrive
what we want is for it to slow down as it approaches
stops when arrived

```js

	const arrive = ( target ) => {
		let desired = PVector.sub( target, location )

		//	distance is the magnitude of the vector pointing from location to target
		let d = desired.mag()
		desired.normalize()

		//	if we're closer than 100 pixels
		if ( d < 100 ) {
			//	set the magnitude according to how close we are
			let m = map( d, 0, 100, 0, maxspeed )
			desired.mult( m )
		} else {
			desired.mult( maxspeed )
		}

		//	usual steering
		let steer = PVector.sub( desired, velocity )
		steer.limit( maxforce )
		applyForce( steer )
	};

```



## your own desires: disired velocity

wandering is not simply random motion
its more moving in one direction for a while before wandering to the next & so on
how to achieve it:

-	draw a circle with radius r in front of vehicle with fixed distance away
-	pick random point along circumference of circle
-	random point moves randomly around the circle in each frame
-	random point is vehicle's target, its desired vector pointing in that direction

it keeps the motion from looking jittery & random
more like wandering around

-	if vehicle comes within distance d of wall
-	move at maximum speed in opposite direction of wall

```js

	if ( location.x > 25 ) {
		let desired = new PVector( maxspeed, velocity.y ),
			steer = PVector.sub( desired, velocity )

		steer.limit( maxforce )
		applyForce( steer )
	}

```



## flow fields

a grid with cells, cells with arrows pointing in direction, aka vector
as a vehicle moves around the screen, it checks what cell/arrow is it on
moves with that as desired velocity

```js

	const FlowField = ( r ) => {
		let resolution = r,
			cols = width / resolution,
			rows = height / resolution,
			field = new PVector[ cols ][ rows ]

		let xoff = 0
		for ( let i = 0; i < cols; i++ ) {
			let yoff = 0
			for ( let j = 0; j < rows; j++ ) {
				//	apply perlin noise
				let theta = map( noise( xoff, yoff ), 0, 1, TWO_PI )
				field[ i ][ j ] = new PVector( cos( theta ), sin( theta ) )
				yoff += .1
			}
			xoff += .1
		}

		//	return the vector at location
		const lookup = ( lookup ) => {
			//	constrain so it doesn't look outside the FlowField
			const column = int( constrain( lookup.x / resolution, 0, cols - 1 ) ),
			row = int( constrain( lookup.y / resolution, 0, rows - 1 ) )
			return field[ column ][ row ].get()
		}
	}

	const Vehicle = () => {

		const follow = ( flow ) => {
			//	what vector is at my location
			let desired = flow.lookup( location )

			desired.mult( maxspeed )
			//	steering is desired minus velocity
			let steer = PVector.sub( desired, velocity )
			steer.limit( maxforce )
			applyForce( steer )
		}
	};

```



## the dot product

```js

	//	if
	a = ( -3, 5 )
	b = ( 10, 1 )
	//	then
	a.b = ( -3 * 10 ) + ( 5 * 1 ) = -30 + 5 = 35

	// implemented using
	let a = new PVector( -3, 5 ),
		b = new PVector( 10, 1 )

	n = a.dot( b );

```

dot product used to find the angle between two vectors
A dot B is equal to the magnitude of A times magnitude of B time cosine of theta
with theta defined as the angle between two vectors A & B
thus
theta = inverse cos of ( a.dot( b ) ) / ( magnitude of a * magnitude of b )
`let theta = acos( a.dot( b ) / ( a.mag() * b.mag() ) )`

note:

-	if two vectors are orthogonal, ie. perpendicular, the dot product of a & b is 0
-	if two vectors are unit vector, the dot product is simply cosine of angle, ie. if a.mag() & b.mag() is = 1



## path following

**what**
path following, not path finding
a path is a series of connected points
path has a radius like a road has width
smaller radius, vehicle follows closer
bigger radius, vehicle able to stray more

**how**
assuming constant velocity
we want to predict where the vehicle would be in the future
find distance from path - predicted vs current
if it's far, steer back, if close, keep going

**distance between point & line**
length of normal between point & line
normal is a vector that extends from point perpendicular to line

```js

	const follow = ( p ) => {
		//	step 1
		//	predict vehicle's future location
		const predict = vel.get()
		predict.normalize()
		predict.mult( 25 )
		const predictLoc = PVector.add( loc, predict )

		//	step 2
		//	find normal point along path
		const a = p.start,
			b = p.end,
			normalPoint = getNormalPoint( predictLoc, a, b )

		//	step 3
		//	move a little further along path & set target
		const dir = PVector.sub( a, b )
		dir.normalize()
		dir.mult( 10 )
		const target = PVector.add( normalPoint, dir )

		//	step 4
		//	if off path, seek target to stay on path
		const distance = PVector.dist( normalPoint, predictLoc )
		if ( distance > p.radius ) {
			seek( target )
		}
	}

	const getNormalPoint = ( p, a, b ) => {
		//	vector that points from a to p
		const ap = PVector.sub( p, a )
		//	vector that points from a to b
		const ab = PVector.sub( b, a )

		//	using dot product for scalar projection
		ab.normalize()
		ab.mult( ap.dot( ab ) )
		//	find normal point along the line segment
		const normalPoint = PVector.add( a, ab )

		return normalPoint
	};

```



## path following with multiple segments

pick closet point
previously we find the normal for one line segment
now we find the normals for all the line segments in a loop

```js

	//	start with a very high record that can be easily beaten
	let worldRecord = 1000000


	for ( let i = 0; i < p.points.size() - 1; i++ ) {
		const a = p.points.get( i )
		const b = p.points.get( i + 1 )

		let normalPoint = getNormalPoint( predictLoc, a, b )

		if ( normalPoint.x < a.x || normalPoint.x > b.x ) {
			//	use the end point of our segment if can't find one
			normalPoint = b.get()
		}

		const distance = PVector.dist( predictLoc, normalPoint )

		//	if we beat the world record
		//	this is the target
		if ( distance < worldRecord ) {
			worldRecord = distance
			target = normalPoint.get()
		}
	}

```



## complex systems

-	**simple units with short-range relationships**
	vehicles with limited perception of their environment

-	**simple units operate in parallel**
	every draw loop, each unit will decide how it moves
	giving the appearance of them all working in parallel

-	**system as a whole exhibits emergent phenomena**
	out of interactions between simple units emerges
		-	complex behavior
		-	patterns
		-	intelligence

1.	**non-linearity**
	casually referred to as 'butterfly effect'
	a small change in initial conditions massively changes outcome
	even though there isn't a linear relationship between cause & effect
	non-linear systems are a superset of chaotic systems

2.	**competition & cooperation**
	happens in living complex systems
	not in non-living complex systems like weather
	two key components to make complex systems tick
	eg. competing for space yet cooperating to stay or move together

3.	**feedback**
	feedback loop where output of system is fed back to the system
	which will in turn influence its behavior in a positive or negative direction
	ie. in human complex systems
	everyone drive to work as price of gas is low
	this causes demand to rise, thus price of gas grows
	thus some start to take public transport
	demand drops, price of gas drops, so on & so forth



## group behaviors or: let's not run into each other

same as before except we are adding a seperate function
where all vehicles will be passed in
so each vehicle will check & seperate from all other vehicles
ie. a vector pointing away from other vehicle
seperation is the average of all these vectors

```js

	//	pass in vehicles array
	const seperate = ( vehicles ) => {
		//	how close before it's too close
		//	based on size of vehicle
		const desiredSeperation = r * 2

		let sum = new PVector()
		let count = 0

		for ( vehicle in vehicles ) {
			//	what's the distance between me & other vehicle
			const d = PVector.dist( location, other.location )

			//	if too close
			if ( d > 0 && d < desiredSeperation ) {
				//	vector pointing away
				let diff = PVector.sub( location, other.location )
				diff.normalize()
				//	what's the magnitude of vector pointing away
				//	the closer it is, the more we should flee
				//	thus we divide by distance to weight it accordingly
				diff.div( d )
				sum.add( diff )
				count++
			}
		}

		//	if we have more than 1 vehicle too close
		//	we find the average vector
		if ( count > 0 ) {
			sum.div( count )

			//	scale average to maxspeed
			//	this becomes desired
			sum.setMag( maxspeed )

			//	reynold's steering formula
			//	desired minus current velocity
			let steer = PVector.sub( sum, vel )
			steer.limit( maxforce )
			applyForce( steer )
		}
	};

```



## combinations

adjust seek & seperate functions so they return the force
this way we can adjust the strength & allow combinations of different effects

```js

	const seek = ( target ) => {
		let desired = PVector.sub( target, loc )
		desired.normalize()
		desired.mult( maxspeed )
		let steer = PVector.sub( desired, vel )
		steer.limit( maxForce )

		return steer
	}

	const applyBehaviors = ( vehicles ) => {
		let seperate = seperate( vehicles ),
			seek = seek( new PVector( mouseX, mouseY ) )

		seperate.mult( 1.5 )
		seek.mult( .5 )

		applyForce( seperate )
		applyForce( seek )
	};

```



## flocking

bringing various concepts together

1.	use steering force formula to implement rules of flocking
	steer = desired - velocity

2.	these forces will be group behaviors & require each vehicle to look at all other vehicles

3.	combine & weight multiple forces

4.	result will be a complex system
	intelligent group behavior emerging from these simple rules without a centralized system or leader

rules to flocking

1.	**seperation** also known as avoidance
	steer to avoid colliding with neighbors

2.	**alignment** also known as copy
	steer in same direction as neighbors

3.	**cohesion** also known as center
	steer towards center of neighbors, stay with group

boids are another name we're using for vehicles

```js

	const flock = ( boids ) => {
		let sep = seperate( boids ),
			ali = align( boids ),
			coh = cohesion( boids )

		sep.mult( 1.5 )
		ali.mult( 1.0 )
		coh.mult( 1.0 )

		applyForce( sep )
		applyForce( ali )
		applyForce( coh )
	}

	const align = ( boids ) => {
		const neighbordist = 50
		let sum = new PVector( 0, 0 ),
			count = 0

		//	find average velocity
		for ( boid in boids ) {
			if ( d < 0 && d < neighbordist ) {
				sum.add( boid.velocity )
				count++
			}
		}
		if ( count > 0 ) {
			sum.div( count )
			sum.normalize()
			//	go in that direction at maxspeed
			sum.mult( maxspeed )

			//	steering formula
			let steer = PVector.sub( sum, velocity )
			steer.limit( maxForce )
			return steer
		} else {
			return new PVector( 0, 0 )
		}
	}

	const cohesion = ( boids ) => {
		const neighbordist = 50
		let sum = new PVector( 0, 0 ),
			count = 0

		for ( boid in boids ) {
			d = PVector.dist( location, boid.location )
			if ( d > 0 && d < neighbordist ) {
				sum.add( boid.location )
				count++
			}
		}

		if ( count > 0 ) {
			sum.div( count )
			return seek( sum )
		} else {
			return new PVector( 0, 0 )
		}
	};

```



## algorithmic efficiency

problem with what we're doing currently is
for x number of birds in our flock
we have to loop x * x times for each cycle to check for neighbors

solution: divide the screen into a grid
only loop birds in a grid to check for neighbors
aka bin-lattice spatial subdivision

```js

	//	loop thru boids & add them into a grid
	let column = boid.x / resolution,
		row = boid.y / resolution
	grid[ column ][ row ].add( boid )

	//	when it comes to check neighbors, check in grid
	let column = boid.x / resolution,
		row = boid.y / resolution
	boid.flock( grid[ column ][ row ] );

```

but this still has an issue
what if all boids congregate in a corner?
wouldn't it the same as previously looping x * x times?
we'll have to use other optimization methods that are more sophisticated



## a few last notes: optimization tricks

1.	magnitude squared or distance squared
	`const mag = ()=> sqrt( x * x + y * y )`
	square root is a heavy process
	if we can skip running that
	we'll save on processing power
	eg. if we just need to know the relative magnitude of a vector
	`if ( v.mag() > 10 ) {}`
	is the same as
	`if ( v.magSq() > 100 ) {}`
	where
	`const magSq = ()=> x * x + y * y`

2.	sine & cosine lookup tables
	sine, cosine, tangent are all heavy proccesses
	if we can stop them from running too many times aka in huge loops
	it'll save processing power
	build an array to store sine & cosine at angles between 0 & TWO_PI (359 degrees) that you can use later on

```js

	const sinvalues[] = new float[ 360 ]
	const cosvalues[] = new float[ 360 ]
	for ( let i = 0; i < 360; i++ ) {
		sinvalues[ i ] = sin( radians( i ) )
		cosvalues[ i ] = cos( radians( i ) )
	}

	//	use the table
	const angle = int( degrees( PI ) )
	let answer = sinvalues[ angle ];

```

3.	making gajillions of unnecessary PVector objects

```js

	//	instead of
	const draw = () => {
		for ( vehicle in vehicles ) {
			const mouse = new PVector( mouseX, mouseY )
			v.seek( mouse )
		}
	}

	//	do this
	const mouse = new PVector()
	const draw = () => {
		mouse.x = mouseX
		mouse.y = mouseY
		for ( vehicle in vehicles ) {
			v.seek( mouse )
		}
	}

	//	instead of
	let desired = PVector.sub( target, location )
	desired.normalize()
	desired.mult( maxspeed )
	let steer = PVector.sub( desired, velocity )
	steer.limit( maxforce )
	return steer

	//	do this
	let desired = PVector.sub( target, location )
	desired.normalize()
	desired.mult( maxspeed )
	desired.sub( velocity )
	desired.limit( maxforce )
	return desired

```



---



# cellular automata



## what is a cellular automation?

a model of 'cell' objects with the following characteristics

-	cells live on a **grid**
-	each cell has a **state**
-	each cell has a **neighborhood**



## elementary cellular automata

simplest form

1.	**grid**
	one dimensional - a line of cells

2.	**states**
	two states - 0 or 1

3.	**neighborhood**
	the cell itself & its left, right cell

ca living over a period of time = generation or frame count
how do we compute states for all cells at generation 1, generation 2 & so on
`CELL state at time t = f( CELL neighborhood at time t - 1 )`
a cell's new state is a function of all the states in the cell's neighborhood at the previous moment in time
aka we calculate a new state by looking at all the previous neighbor states

eg. if we look at a 3 cell neighborhood with 0 or 1 states there is 8 possible outcomes
000   001   010   011   100   101   110   111
we can then define an outcome for each of the neighborhood configuration
 0     1     0     1     1     0     1     0
using this simple setup we can generate outcomes for generations starting with just a grid of 0s & a single 1
it can create interesting patterns like the sierpinski triangle from the above setup



## how to program an elementary ca

```js

	//	CA factory
	const CA = () => {
		let cells = [],
			ruleset = []

		const init = () => {
			//	arbitarily starting with rule 90
			//	its in reverse order for the parseInt to pass 111 correctly as 0
			//	see below in rules function
			ruleset = { 0, 1, 0, 1, 1, 0, 1, 0 }

			for ( let i = 0; i < cells.length; i++ ) {
				cells[ i ] = 0
			}
			//	all cells start with 0, except center cell has state 1
			cells[ cells.length / 2 ] = 1
		}
	}

	const generate = () => {
		//	store new cells array so that after changing a cell
		//	it wouldn't after the i++ loop to read off wrong info
		//	aka after i changed, i + 1
		//	when looking for the cell on left sees changed cell instead of old one
		let nextgen = []

		//	loop ignores first & last cell as they don't fit into our 3 cell neighborhood system
		for ( let i = 1; i < cells.length - 1; i++ ) {
			let left = cells[ i - 1 ],
				me = cells[ i ],
				right = cells[ i + 1 ]

			nextgen[ i ] = rules( left, me, right )
		}

		cells = nextgen
	}

	//	lookup new state from ruleset
	const rules = ( a, b, c ) => {
		//	combine 3 cells into a 3 digit number
		let s = "" + a + b + c,
			//	2 indicates we want to parse a binary number of base 2
			index = Integer.parseInt( s, 2 )
			return ruleset[ index ]
	};

	//	parseInt( '000', 2 ) = 0
	//	parseInt( '001', 2 ) = 1
	//	parseInt( '010', 2 ) = 2
	//	parseInt( '011', 2 ) = 3
	//	parseInt( '100', 2 ) = 4
	//	parseInt( '101', 2 ) = 5
	//	parseInt( '110', 2 ) = 6
	//	parseInt( '111', 2 ) = 7

```



## drawing an elementary ca

```js

	//	same as above, but keep track of generations
	//	generations = 0, then during generate generation++

	//	size of each cell
	const w = 10

	for ( let i = 0; i < cells.length; i++ ) {
		cells[ i ] === 1 ? fill( 0 ) : fill( 255 )
		rect( i * w, generation * w, w, w )
	}

```



## wolfram classification

majority of elementary ca rulesets produce uninspiring results
some though results in complex patterns like those found in nature
wolfram's classification for cellular automata of the range of outcomes

1.	**uniformity**
	class 1 cas end up after some number of generations with every cell constant
	after running long enough, every cell turns black
	ie. ruleset 222

2.	**repetition**
	class 2 cas remain stable, but cells states are not constant
	they oscillate in a regular pattern back & forth
	ie. ruleset 190

3.	**random**
	class 3 cas appear random & has no easily discernible pattern
	is used as a random number generator in Wolfram's Mathematica software
	ie. ruleset 30

4.	**complexity**
	class 4 is a mix between class 2 & 3
	one can find repetitive & oscillating patterns but they appear unpredicatable & seemingly random
	ie. ruleset 110



## the game of life

two dimensional cellular automata
for a neighborhood of 3 cells, we have 8 possible configurations
but for a 2D ca with 9 cell neighborhoods, we have 512 possible configurations
which is impractical to manually define an outcome for each
thus we use rules instead

+	**death**
	if a cell is alive ( state = 1 ) it will die ( state becomes 0 ) under the following circumstances
		+	*overpopulation*
			if a cell has four or more alive neighbors, it dies
		+	*loneliness*
			if a cell has one or fewer alive neighbors, it dies

+	**birth**
	if a cell is dead it will come to life if it has exactly 3 alive neighbors ( no more, no less )

+	**stasis**
	in all other cases, cell state does not change
		+	*staying alive*
			if a cell is alive & has exactly 2 or 3 live neighbors, it stays alive
		+	*staying dead*
			if a cell is dead & has anything other than 3 living neighbors, it stays dead



## programming the game of life

```js
	const
	columns = 10,
	rows = 10,
	board = [],	// current board
	next = []	// next board

	//	looping but skipping edge cells
	for ( let x = 1; x < columns - 1; x++ ) {
		for ( let y = 1; y < rows - 1; y++ ) {
			//	count total states of neighbors
			//	since 1 is alive, total will know total alive
			let neighbors = 0

			//	loop thru up down left right of cell
			for ( let i = -1; i <= 1; i++ ) {
				for ( let j = -1; j <= 1; j++ ) {
					neighbors += board[ x + i ][ y + j ]
				}
			}

			//	subtract own cell state as it's not part of neighbors
			neighbors -= board[ x ][ y ]

			//	set next board states
			if ( board[ x ][ y ] === 1 && neighbors < 2 ) {
				next[ x ][ y ] = 0
			} else if ( board[ x ][ y ] === 1 && neighbors > 3 ) {
				next[ x ][ y ] = 0
			} else if ( board[ x ][ y ] === 0 && neighbors === 3 ) {
				next[ x ][ y ] = 1
			} else {
				next[ x ][ y ] = board[ x ][ y ]
			}
		}
	}

```



## object-oriented cells

```js

	const cell = () => {
		let x, y, w, state, previous

		const display = () => {
			if ( previous === 0 && state === 1 ) {
				fill( 0, 0, 255 ) // cell born, color it blue
			} else if ( state === 1 ) {
				fill( 0 )
			} else if ( previous === 1 && state === 0 ) {
				fill( 255, 0, 0 ) // cell dies, color it red
			} else {
				fill( 255 )
			}
			rect( x, y, w, w )
		}
	}

	for ( let x = 1; x < columns - 1; x++ ) {
		for ( let y = 1; y < rows - 1; y++ ) {
			let neighbors = 0

			for ( let i = -1; i <= 1; i++ ) {
				for ( let j = -1; j <= 1; j++ ) {
					neighbors += board[ x + i ][ y + j ].previous
				}
			}
			neighbors -= board[ x ][ y ].previous

			if ( board[ x ][ y ].state === 1 && neighbors < 2 ) {
				board[ x ][ y ].newState( 0 )
			} else if ( board[ x ][ y ].state === 1 && neighbors > 3 ) {
				board[ x ][ y ].newState( 0 )
			} else if ( board[ x ][ y ].state === 0 && neighbors === 3 ) {
				board[ x ][ y ].newState( 1 )
			}
		}
	}

```



## variations of traditional ca

1.	**non-rectangular grids**
	instead of square cells like what we've been doing
	try other shapes like hexagon

2.	**probabilistic**
	rules of ca doesn't have to define an exact outcome
	if more than 4 alive neighbors, 80% chance of dying

3.	**continuous**
	so far the states are all & 0
	it could also be a floating point number between 0 & 1 instead

4.	**image processing**
	blurring an image is creating a pixel out of the average of its neighbors
	or ink dispersing on paper or water rippling ontop of image can all be done with ca rules

5.	**historical**
	we are currenly only tracking current & previous
	what if we keep an array of states to create complex adaptive systems that learn from history

6.	**moving cells**
	currently all cells are on a fixed grid
	we can also have a ca with cells moving around on screen

7.	**nesting**
	eg. a city is a complex system of people, a person is a complex system of organs,
	an organ is a complex system of cells, etc



---



# fractals



## what is a fractal

fractal is latin for broken
a rough or fragmented geometric shape that can be split into parts
each of which is ( at least approximately ) reduced-size copy of the whole

like a tree branching off
or stock market data where zoomed out & zoomed in might look similar visually

*stochastic* fractal means that it is built out of probabilities & randomness



## recursion

functions that call themselves are recursive & good for solving certain problems
eg. calculating a factorial

4! = 4 * 3 * 2 * 1
3! = 3 * 2 * 1

therefore

4! = 4 * 3!

or

n! = n * ( n - 1 )!
1! = 1

```js

	const factorial = ( n ) => {
		if ( n === 1 ) {
			return 1
		} else {
			return n * factorial( n - 1 )
		}
	};

```

**recursive circles 1**
drawCircle() draws a ellipse based on a set of parameters it receives as arguments
it then calls itself with those same parameters, adjusting slightly
note that it only calls itself if the radius is greater than 2
as with iteration, all recursive functions must have an exit condition
else your program will crash in an infinite loop

```js

	const drawCircle = ( x, y, radius ) => {
		ellipse( x, y, radius, radius )
		if ( radius > 2 ) {
			radius *= .75
			drawCircle( x, y, radius )
		}
	};

```

**recursion twice**

```js

	const setup = () => {
		size( 640, 360 )
	}

	const draw = () => {
		background( 255 )
		drawCircle( width / 2, height / 2, 200 )
	}

	const drawCircle = ( x, y, radius ) => {
		stroke( 0 )
		noFill()
		ellipse( x, y, radius, radius )
		if ( radius > 2 ) {
			//	drawCircle() calls itself twice, creating a branching effect
			//	for every circle, a smaller circle is drawn to the left & right
			drawCircle( x + radius / 2, y, radius / 2 )
			drawCircle( x - radius / 2, y, radius / 2 )
		}
	};

```

**recursion four times**

```js

	const drawCircle = ( x, y, radius ) => {
		ellipse( x, y, radius )
		if ( radius > 8 ) {
			drawCircle( x + radius / 2, y, radius / 2 )
			drawCircle( x - radius / 2, y, radius / 2 )
			drawCircle( x, y + radius / 2, radius / 2 )
			drawCircle( x, y - radius / 2, radius / 2 )
		}
	};

```



## the cantor set with a recursive function

cantor set, line that keeps dividing down smaller

```js

	const cantor = ( x, y, len ) => {
		//	draw line
		line( x, y, x + len, y )

		//	move down
		y += 20

		//	draw two lines
		//	1/3 length of initial line
		//	at each side
		line( x, y, x + len / 3, y ) // start to 1/3
		line( x + len * 2 / 3, y, x + len, y ) // 2/3 to end
	}

	//	make cantor loop
	const cantor = ( x, y, len ) => {
		if ( len >= 1 ) {
			line( x, y, x + len, y )
			y += 20
			cantor( x, y, len / 3 )
			cantor( x + len * 2 / 3, y, len / 3 )
		}
	};

```



## the koch curve & the arraylist technique

//



## trees

//



## l-systems

//



---



# the evolution of code



---



# neural networks



---
