


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



;```



# spanning & placing cardio

```css



;```



# auto-fit & auto-fill

```css



;```



# using minmax() for responsive grids

```css



;```



# grid template areas

```css



;```



# naming lines in css grid

```css



;```



# grid-auto-flow dense block fitting

```css



;```



# css grid alignment + centering

```css



;```



# re-ordering grid items

```css



;```



# nesting grid with album layouts

```css



;```



# css grid image gallery

```css



;```



# flexbox vs css grid

```css



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
