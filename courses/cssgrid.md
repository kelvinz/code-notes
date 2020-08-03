


<https://cssgrid.io/>



# css grid fundamentals

```css

.container {
	display: grid;

	/* 4 columns with different sizes */
	grid-template-columns: 100px auto 200px 100px;

	/* 5 columns with 100px each */
	grid-template-columns: repeat( 5, 100px );

	/* 3 rows with 100px each */
	grid-template-rows: 100px 100px 100px

	grid-gap: 20px;
}

;```



# css grid dev tools

firefox console, layout tab

- display line numbers
- display area names
- extend lines infinitely

dashed line - explicit track
dotted line - implicit track
diagonal dashed line - gap
solid line - end of explicit grid



# css grid implicit vs explicit tracks

```css

.container {
	display: grid;
	grid-gap: 20px;

	/* the two columns are explicit */
	grid-template-columns: 200px 400px;

	/* if there are left over elements that wrap */
	/* those elements are implicit */

	/* implicit rows size */
	grid-auto-rows: 300px;
}

;```



# css grid-auto-flow explained

```css

.container {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: 400px 200px;

	/* by default extra divs will wrap to next row */
	/* change it to wrap to column instead */
	grid-auto-flow: column;
}

;```



# sizing tracks in css grid

```css

.container {
	display: grid;
	grid-gap: 20px;

	/* if you use % width it doesn't consider gap */
	/* so 100% may exceed size & cause scroll */
	/* fr units takes leftover space after gap is counted */
	grid-template-columns: 200px 200px 1fr;

	/* 2fr is twice of 1fr of leftover space */
	grid-template-columns: 200px 2fr 1fr;

	/* column 1 - auto will take up it's own content size for column 1 */
	grid-template-columns: auto 1fr;
}

;```



# css grid repeat function

```css

.container {
	display: grid;
	grid-gap: 20px;

	/* 4 columns with 1fr size each */
	grid-template-columns: repeat( 4, 1fr );

	/* 8 columns with 1fr 2fr sized columns repeated */
	grid-template-columns: repeat( 4, 1fr 2fr );
}

;```



# sizing grid items

```css

.container {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat( 5, 1fr );
}

.item-9 {
	/* span col pr row to size it according to grid */
	grid-column: span 2;
	grid-row: span 2;
}

;```



# placing grid items

```css

.container {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat( 5, 1fr );
}

.item-9 {
	grid-column-start: 2;
	grid-column-end: 5;

	/* shorthand */
	grid-column: 2 / 5;

	/* where to start & how big */
	grid-column: 2 / span 3;

	/* where to end & how big */
	grid-column: span 3 / 5;

	/* end at last col */
	grid-column: 1 / -1;
}

;```



# spanning & placing cardio

```css

.container {
	display: grid;
	grid-gap: 20px;

	grid-template-columns: repeat( 5, 1fr, 2fr );

	grid-template-rows: repeat( 10, 50px );
}

.item1 {
	grid-column: 3 / 5;
}

.item2 {
	grid-column: 5 / -1;
}

.item5 {
	grid-column: span 2;
	grid-row: span 2;
}

.item8 {
	grid-row: span 2;
}

.item15 {
	grid-column: 1 / -1;
}

.item18 {
	grid-column: span 4 / 9;
}

.item20 {
	grid-row: 4 / span 3;
}

;```



# auto-fit & auto-fill

```css

.container {
	display: grid;
	grid-gap: 20px;

	/* number of cols will expand according to content */
	grid-template-columns: repeat( auto-fill, 150px );

	/* number of cols will contract according to content */
	grid-template-columns: repeat( auto-fit, 150px );
}

;```



# using minmax() for responsive grids

```css

.container {
	display: grid;
	grid-gap: 20px;

	/* min of 150px, if can't fit, it will be 1fr */
	/* will maintain 150px if it has more width */
	grid-template-columns: repeat( auto-fill, minmax( 150px, 1fr ) );

	/* min of 150px, if can't fit, it will be 1fr */
	/* will stretch to fill if it has more width */
	grid-template-columns: repeat( auto-fit, minmax( 150px, 1fr ) );

	/* if auto might stretch to way bigger than you want */
	/* fit-content is auto but with a max width */
	grid-template-columns: fit-content( 100px ) 150px 150px 150px;
}

;```



# grid template areas

```css

.container {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: 1fr 10fr 1fr;
	grid-template-rows: 150px 150px 100px;

	grid-template-areas:
		"sidebar-1	content		sidebar-2"
		"sidebar-1	content		sidebar-2"
		"footer		footer		footer";

	.footer {
		grid-area: footer;
	}

	.item1 {
		grid-area: sidebar-1;
	}

	.item2 {
		grid-area: content;
	}

	.item3 {
		grid-area: sidebar-2;
	}

	@media ( max-width: 700px ) {
		.container {
			grid-template-areas:
				"content	content		content"
				"sidebar-1	sidebar-1	sidebar-2"
				"footer		footer		footer";
		}
	}
}

;```

```css

.container {
	display: grid;
	grid-gap: 20px;
	grid-template-areas:
		"👋👋👋💩💩💩"
		"👋👋👋💩💩💩"
		"👋👋👋💩💩💩";
}

.item3 {
	grid-column: 👋-start / 💩-end;
	grid-row-end: 💩-end;
}

.item-4 {
	grid-column: 💩-start / 💩-end;
}

;```



# naming lines in css grid

```css

.container {
	display: grid;
	grid-gap: 20px;

	grid-template-columns:
		[sidebar-start site-left] 1fr [sidebar-end content-start] 500px [content-end] 1fr [side-right];

	grid-template-rows:
		[content-top] repeat( 10, auto ) [content-bottom];
}

.item3 {
	grid-column: content-start;
	grid-row: content-top / content-bottom;
}

;```



# grid-auto-flow dense block fitting

```css

.container {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat( 10, 1fr );
	grid-auto-flow: dense;
}

.item:nth-child( 6n ) {
	grid-column: span 6;
}

.item:nth-child( 8n ) {
	grid-column: span 2;
}

.item:nth-child( 9n ) {
	grid-row: span 2;
}



;```



# css grid alignment + centering

**justify - x axis**
**align - y axis**

```css

.container {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat( 10, 1fr );
	grid-template-rows: repeat( 5, 100px );

	justify-items: center;
	align-items: center;

	/* shorthand, not supported for all browsers */
	place-item: center center;

	justify-content: space-between;
	align-content: space-between;
}

.itm5 {
	justify-self: center;
	align-self: center;
}

;```



# re-ordering grid items

```css

.container {
	display: grid;
	grid-column: 20px;
	grid-template-columns: repeat( 10, 1fr );
}

.logo {
	grid-column: span 2;
	order: 2;
}

.nav {
	grid-column: span 8;
	order: 1;
}

.content {
	grid-column: 1 / -1;
	order: 3;
}

;```



# nesting grid with album layouts

```css

.albums {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat( auto-fit, minmax( 400px, 1fr ) );
}

.album {
	padding: 20px;

	display: grid;
	grid-gap: 10px;
	grid-template-columns: 150px 1fr;

	align-items: center;
}

.album__artwork {
	width: 100%;
}

;```



# css grid image gallery

```css

.gallery {
	display: grid;
	grid-auto-rows: 100px;
	grid-auto-flow: dense;
	grid-template-columns: repeat( auto-fill, 100px );
}

.item {
	overflow: hidden;

	display: grid;
	grid-template-rows: 1;
	grid-template-columns: 1;
}

.item img {
	width: 100%;
	height: 100%;
	object-fit: cover;

	grid-row: 1 / -1;
	grid-column: 1 / -1;
}

.item__overlay {
	grid-row: 1 / -1;
	grid-column: 1 / -1;

	position: relative;

	display: grid;
	align-items: center;
	justify-items: center;

	transition: .2s;
	transform: translateY( 100% );
}

.overlay {
	position: fixed;
	background: rgba( 0, 0, 0, .7 );
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: none;
	z-index: 2;
}

.overlay.open {
	display: grid;
	align-items: center;
	justify-items: center;
}

.item:hover .item__overlay {
	transform: translateY( 0 );
}

.item.v2 {
	grid-row: span 2;
}

.item.v3 {
	grid-row: span 3;
}

.item.v4 {
	grid-row: span 4;
}

.item.v2 {
	grid-column: span 2;
}

.item.v3 {
	grid-column: span 3;
}

.item.v4 {
	grid-column: span 4;
}

;```

```js

const gallery = document.querySelector( '.gallery' )
const overlay = document.querySelector( '.overlay' )
const overlayImage = overlay.querySelector( 'img' )
const overlayClose = overlay.querySelector( '.close' )

function generateHTML( [ h, v ] ) {
	return `
		<div class="item h${ h } v${ v }">
			<img src="images/${ randomNumber( 12 ) }.jpg">
			<div class="item__overlay">
				<button>View ></button>
			</div>
		</div>
	`
}

function randomNumber( limit ) {
	return Math.floor( Math.random() * limit ) + 1
}

function handleClick( e ) {
	const src = e.currentTarget.querySelector( 'img' ).src
	overlayImage.src = src
	overlay.classList.add( 'open' )
}

function close() {
	overlay.classList.remove( 'open' )
}

const digits = Array.from( { length: 50 }, () => [ randomNumber( 4 ), randomNumber( 4 ) ] )
					.concat( [ [ 1, 1 ], [ 1, 1 ], [ 1, 1 ], [ 1, 1 ], [ 1, 1 ], [ 1, 1 ], [ 1, 1 ] ] )

const html = digits.map( generateHTML ).join( '' )
gallery.innerHTML = html

const items = document.querySelectorAll( '.item' )

items.forEach( item => item.addEventListenser( 'click', handleClick ) )
overlayClose.addEventListenser( 'click', close )

;```



# flexbox vs css grid

```css

/* axis flipping */
.flipper {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat( auto-fit, minmax( 50px, 1fr ) );
}

.flipper.flip {
	grid-template-columns: 1fr;
}



/* controls on the right */
.track {
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 1fr;
}



/* flex on items */
.controls {
	display: flex;
	align-items: center;
}

.scrubber {
	min-width: 100px;
	flex: 1;
}

.controls {
	display: grid;
	grid-template-columns: auto auto auto 1fr auto auto;
}

.scrubber {
	min-width: 100px;
}



/* perfect center */
.hero {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.hero {
	display: grid;
	justify-items: center;
	align-content: center;
}



/* self control */
.corners {
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr 1fr;
	/* grid-template: 1fr 1fr / 1fr 1fr; */
	align-items: end;
	justify-items: end;
}

.corner:nth-child( 1 ),
.corner:nth-child( 2 ) {
	align-self: start;
}

.corner:nth-child( 1 ),
.corner:nth-child( 3 ) {
	justify-self: start;
}



/* self control stack */
.stacked {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}



/* unknown content size */
.known {
	display: grid;
	grid-gap: 20px;
	justify-content: center;
	grid-template-columns: repeat( 5, auto );
}



/* unknown number of items */
.unknown {
	display: grid;
	grid-gap: 20px;
	grid-template-columns: repeat( auto-fit, minmax( 50px, 1fr ) );
}



/* variable width on each row */
.flex-container {
	display: flex;
	flex-wrap: wrap;
}

.flex-container>* {
	flex: 1;
}

;```



# recreating codepen

```css



;```



# bootstrappy grid with css variables

```css



;```



# responsive website

```css



;```



# full bleed blog layout

```css



;```
