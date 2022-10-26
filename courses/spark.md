<https://facebook.widen.net/s/pfdqkbk7xc/sparkar_final2>



# Introduction to Spark AR Studio

## What can you do on the Spark AR platform?
	- Build with or without code
	- Import objects & sounds
	- Publish effects to Instagram



# Design & Concepting

## Best Practices
	- Focus on a solid use case
	- Make it social
	- Design for different device types
	- Design for repeat use
	- Keep it simple
		- add clear instructions
		- make sure interactions are intuitive
		- focus on 1 or 2 main interactions
	- Add to the camera experience
		- avoid taking over lots of the camera view
		- or making people completely unrecongnizable
	- Avoid the edges of the screen
	- Give people something to capture with the lowest amount of effort
	- Keep interactions obvious
	- Avoid using gestures that conflict with system-level commands
		- switch camera = double tap
		- camera zoom = pinch (except when resizing stickers or objects)
		- video zoom = touch/hold camera capture button & drag up
		- return to Fb news feed = swipe left
		- keep interactions to a minimum
	- Be mindful of accessibility concerns
		- if your effect contains flashing lights, consider giving a warning

## Filetypes
	- 2D Assets
		- PNG
		- JPEG
		- SVG
	- 3D Models
		- FBX
		- gITF
		- COLLADA / DAE
		- OBJ
		- DAE
	- Audio
		- Mono M4A
		- AAC codec 44.1KHz
	- Fonts
		- TrueType/OpenType

## Patch Editor Data types
	- Boolean Signal
	- Scalar
	- Pulse
	- 3D Point
	- 2D Point
	- Color
	- Progress
	- Vector
	- Matrix
	- Texture 2D

## Types of Patches
	- Interaction
	- Face Landmarks
	- Facial Gesture Patches
	- Animation Patches
	- Audio Patches
	- Shaders
	- Math
	- Logic Patches
	- Utility Patches
	- User Interface Patches

## What's a Shader
A set of algorithms that determines the appearance of a 3D object's surface.
Shaders are particularly useful for applying complex changes to a material.
Experienced creators can use Shader Code Asset to write custom shaders in Spark AR Studio.
Or you can use Patch Editor to create & connect a group of patches called a visual shader.
	- Consumer Patch
		Visually represents a property of a material, like its position or scale. usually appears at the end of a graph to specify how the material appears in the effect
	- Texture Asset
		a producer patch that applies a texture to the material
	- Blend
		blends two colors or textures together
	- Color Space
		outputs a texture’s RGB, HSV, and HSL color values. useful for isolating the color values to change the texture’s appearance
	- Composition
		outputs two combined functions as a single data stream
	- Fallback
		automatically outputs a fallback value when you disconnect the main value. for example, a color could be used as a fallback value for an image
	- Fragment Stage
		processes each fragment in a texture individually instead of processing a texture at the vertices
