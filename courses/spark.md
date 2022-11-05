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
	- Function
		used as an identity function. it always returns the same value as its argument
	- Gradient
		creates a grayscale gradient. can be used with a Mix patch to create a color gradient
	- Gradient Step
		defines each color you want to use in a color gradient. use this patch multiple times to add multiple colors
	- Render Target Size
		outputs the render target size. useful for building effects using shaders requiring the exact pixel size, like pixel blurring
	- Shader Derivative
		captures standard derivatives
	- Texture Sampler
		samples a texture at the specified coordinates
	- Texture Transform
		used with a 2D Transform Pack patch to scale, rotate, pivot and reposition a 2D texture on a 2D or 3D object
	- Vertex Attribute
		provides the value of the selected vertex attribute among a selection of parameters
	- Vertex Transform
		provides a vertex transformation matrix from a dropdown

## Real-World Scale
	- Enable Real-World Scale in the Inspector
		Your object appears realistically scaled but only after real-scale signal is detected. This means the user sees the object abruptly change size at some point after opening the effect.
	- Enable Real-World Scale in the Inspector & Add Further Logic via Patch Editor or Scripting
		This method allows you to hide the object until a real-scale signal is detected. This means the user only sees the object once it’s realistically scaled. Keep in mind that the number of triangles in a 3D object’s mesh (or the ‘triangle count) impacts performance, so it’s a good idea to keep the triangle count as low as possible. The Spark AR Blender toolkit was developed with this in mind so that creators could optimize their 3D objects. The maximum number of triangles per object should be below 50,000. Keep the total triangle count for all objects in an effect below 150,000.

## AR Targets
	- high contrast
	- high resolution (at least 300x300px)
	- sharp
	- asymmetrical
	- complex
	- flat
	- clear
	- avoid blank space
	- focus on placement

## Material Types
*Standard Material*
The standard material adds realistic depth to 3D objects, using a lighting system called the Phong model. When you create a material in Spark AR Studio it will generally be a standard material, unless you create it for a 2D object.
	- Diffuse
		Base color & pattern. You can use color + texture to create variations in the texture map.
