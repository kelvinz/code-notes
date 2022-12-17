<https://dev.to/heymarkkop/sparkar-certification-cheat-sheet-d48>



# Design Best Practices

	- Focus on a solid use case: focus on a specific goal or task
	- Make it social: Consider multiple faces support
	- Design for different device types: test on multiple mobile devices
	- Design for repeat use: make effects flexible
	- Keep it simple: clear instructions, one or two main interactions
	- Add to the camera experience: keep things recognizable
	- Avoid the edges of the screen: they can be obscured by UI
	- Amount of effort: make main features happen as soon as possible
	- Keep interactions obvious: e.g., pinching changes objects size
	- Avoid system-level command gestures:
		• Switch camera view - double tap.
		• Camera zoom - pinch in/out (except when resizing stickers or 3D objects).
		• Video zoom - touch and hold camera capture button then drag up.
		• Return to Facebook News Feed - swipe left.
	- Be mindful of accessibility concerns: no flashing lights



---

# Assets

	- 2D: png, jpeg, svg
	- 3D: fbx, glTF, collada/dae, obj, dae
	- Audio: Mono M4A, AAC codec (44.1Khz), 16-bit
	- Fonts: TrueType/OpenType



---

# The Patch Editor

## Data Types

	- Boolean Signal: true/false. (eg. Mouth Open port: open/closed)
	- Scalar: one-dimensional value. (eg. Mouth Openness port: half = 0.5)
	- Pulse: event that happens at some point in time
	- 3D Point: three-dimensional signal (rotation, scale or position)
	- 2D Point: two-dimensional signal (rotation, scale or position)
	- Color: RGBA channels. It's indicated by a square with a color
	- Progress: scalar signal w/ 0-1 range. (e.g.: Animation patch)
	- Vector2: for 2D points and 2D texture coordinates
	- Vector3: for 3D points, 3D normals and 3-channel (RGB) color.
	- Vector4: for 4D position and 4-channel (RGBA) color
	- MatrixN: for rotation or affine transformations
	- Texture 2D: typically represents an image and can have 1 to 4 channels.

Some patches can switch their data types to accommodate a creator's needs, as in the case of the 'Value Patch' that can be used as a color or a number



---
