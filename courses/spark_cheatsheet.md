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



## Main Patches

	- Shader Render Pass: frame delays, glows, blur
	- Audio Playback Controller: controls audio clips
	- Animation: play animation once
	- Loop Animation: play animation in a loop
	- Frame Transition: control frames in an animation sequence
	- Screen Tap: make something happen when the screen is tapped
	- Object Tap: make something happen when someone taps a specific object
	- Screen Pan: detects a swipe of the finger across the device screen (use it with Divide patch)
	- Screen Pinch: use to change scales
	- Screen Rotate: use to rotate an object
	- Gallery Picker: user can add an image as texture from the gallery
	- Picker UI: pick up to 10 options
	- Slider UI: change a value with a slider (not visible on the simulator)
	- Global Transform: relative to the scene
	- Local Transform: relative to its parent object



## Patch Editor Tips and Tricks

	- Use a nullObject0 as a container to avoid changing the properties of an object
	- Create a fade transition with the Mix Patch
	- Both Multiply Patch and Negate Patch can be used to invert values
	- An AND Patch can be used as a data passthrough (stoping it or continuing)



---

# Materials

## Standard

The standard material adds realistic depth to 3D objects using a lighting system called the Phong model.

	- Diffuse: define the base color and pattern
	- Specular: shininess
	- Normal: realistic textures (bumps, grooves,...)
	- Emission: illuminate from itself
	- Alpha: mask the alpha channel
	- Tile: scale textures
	- Offset: shift the texture origin
	- Render Options: how the material renders
	- Used By: the object this material is applied to



## Flat

Flat materials don't respond to lighting and display color and texture values absolutely

	- Diffuse: add a color from the palette to your material
	- Environment: check this box to add an environment texture to your material.



## Blended

The blended material includes a blending mode to mix textures and colors.

	- Texture: texture file
	- Color: from the palette
	- Blend Mode: Normal/Add/Multiply
	- Opacity: transparency
	- Double-sided: both sides of a face normal
	- Cull Mode: front / back (back improves performance)



## Physically-Based Material (PBR)

Used to create realistic-looking objects
in Spark AR Studio. The different properties in this material allow you to add surface roughness, metallic effects, and lighting that mimics real-world light.

Needs:

	- A base texture: base with color and details
	- An ORM texture: roughness, metallic details and occlusion strength
	- A Difussion map: for the pattern
	- A Specular map: for shininess
	- A Normal map: for realistic textures (bumps, grooves,...)



## Face Paint

It is used to create a mask effect that shows the skin and features of the person using the effect, either behind a custom texture or a color.



---

# Blend Modes

	- Subtract: subtracts pixel values of the source from the destination. In the case of negative values, black is displayed.
	- Replace: the non-transparent pixels of the source replaces the corresponding pixels of the destination.
	- Alpha: linear interpolation between the pixels of the source and destination as specified by the alpha values of the source.
	- Associate_Alpha: same as alpha blend mode, but for source with RGB channels of each pixel premultiplied by its alpha.
	- Add: adds pixel values of the source to the destination.
	- Multiply: multiplies the RGB channels of each pixel from the source with the values of the corresponding pixel from the destination.
	- Screen: values of each pixel in the source and destination are inverted, multiplied, and then inverted again



---

# Textures

A texture is an image file used to help define the appearance of an object in your scene.



## Lighting

To optimize realistic lighting:

	- Bake lighting directly into 3D objects used for decoration in face effects to hint at highlights and shadows.
	- Bake lighting into static (non-moving) objects such as furniture and accessories for a more realistic effect.
	- Use a soft light setup without strong highlights or shadows. Baked lighting works best in environments where the light, intensity, and color don't change throughout the effect.
	- Use MatCap (material capture) reflection environment textures with flat shaders.



## Things to consider

	- Only PNG and JPG files
	- Use JPG when transparency is not needed
	- Up to 1024 x 1024 pixels in size
	- Merge material as much as possible
	- For repeating patterns, use a lower resolution image and apply visual shaders with texture tiling



---

# Shaders

A shader is a set of algorithms that determines the appearance of a 3D object's surface. Shaders are particularly useful for applying complex changes to the material.



## Visual Shader Patches

	- Consumer Patch: property of a material (position, scale, ...)
	- Texture Asset: applies a texture to the material
	- Blend: blend two colors or textures
	- Color Space: outputs a texture's RGB, HSV and HSL color values. (useful for isolating colors)
	- Composition: outputs two combined functions as a data stream
	- Fallback: fallback value when you disconnect the main value.
	- Fragment Stage: processes each fragment instead of at the vertices
	- Function: identity function, outputs the its argument
	- Gradient: creates a grayscale gradient (use w/ Mix to create a color gradient)
	- Gradient Step: defines each color to be used in a color gradient
	- Reder Target Size: useful to get the exact pixel size, like when pixel blurring
	- Shader Derivative: captures standard derivatives
	- Texture Sampler: samples a texture at the specified coordinates
	- Texture Transform: scale, rotate, pivot and reposition a 2D texture on a 2D or 3D object
	- Vertex Attribute: provides the value of the selected vertex attribute among a selection of parameters
	- Vertex Transform: provides a vertex transformation matrix from a dropdown



---

# Camera

	- It represents the camera in the device showing your effect
	- It can't be removed from a project
	- Children objects move with the camera



## Properties

	- Transformations: Position, Scale and Rotation can't be edited
	- Texture Extraction: when extracted, it appears in the Assets panel as cameraTexture0
	- Segmentation: separates part of the scene



---

# Segmentation

<https://www.facebookblueprint.com/student/collection/288527/path/247681/activity/247676>



## Types

	- Person Segmentation
	- Hair Segmentation
	- Skin Segmentation



## Optimization

	- From the chest upwards on immediate foreground
	- Balanced lighting settings
	- Only works on newer devices (iPhone 6S+, Galaxy S6+, ...)
	- Avoid Face Tracker when using segmentation



---

# Audio and Music

	- Instagram Music is not supported globally (use trimmed audio files instead)



---

# Trackers

## Face Tracker

	- Multiple face trackers impact on performance
	- Can be used with Face Landmark patches



## Target Tracker

It is made of two textures:

	- A semi-transparent preview of the target image
	- A texture provided by Spark AR Studio that looks like a frame.

A good target has/is:

	- High contrast (avoid pastel colors)
	- High Resolution (> 300x300 pixels)
	- Sharp (no soft edges and gradients)
	- Asymmetrical
	- Complex
	- Flat (no curved surfaces)
	- Clear
	- No blank space (around the actual image



## Plane Tracker

	- Only visible through the back camera
	- Make sure to add instructions



---

# Techniques

## Occlusion

It is used to make something appear behind another thing.

For example, for a ball orbiting a head effect, you would do the following:

	- Download Face References assets <https://sparkar.facebook.com/ar-studio/learn/articles/people-tracking/face-reference-assets/>
	- Add Asset > Import From Library > headOccluder.dae
	- Move it into faceTracker0 object
	- Scale it to match the head
	- Reduce its material opacity and change Blend Mode to Alpha to see it through
	- Add a new layer
	- Select the headOccluder object and change its layer to the new one
	- Change the order of the layers
	- Change the opacity to zero
	- Add a face mash to the face tracker
	- Set it to the same layer as the occluder
	- Uncheck eyes and mouth
	- Set its material to the same one used in the headOccluder
	- <https://www.facebookblueprint.com/student/collection/288527/path/247681/activity/247677>



## Custom animation transitions

	- Add an Animation Patch
	- Add a Keyframe Patch and attach it the Animation Patch
	- Open the Keyframe Patch and change its keyframes
	- Connect the Animation Patch with its trigger (eg. Mouth Open)
	- Connect the Keyframe Patch with the property you want to change (eg. Scale)



## Zoom Effect

	- Extract the Camera Texture and use it in the Patch Editor
	- Create a rectangle canvas and it's Material in the Patch Editor
	- Connect the Texture RGBA output to a Texture Transform Patch
	- Connect the Texture Transform Patch output to the material patch
	- Add a Face Tracker and move it to the Patch Editor
	- Connect it to a Mouth Open => Add => 2D Transform Pack patch
	- Connect the 2D Transform Pack output to the Texture Transform Patch
	- <https://sparkar.facebook.com/ar-studio/learn/tutorials/face-interactions-and-logic/#adding-the-mouth-open-patch>



---

# Platforms and Capabilities

## Facebook

	- Can't use Gallery Picker / Media Library Component



## Scripting

	- Persistence module is used as data storage
	- Diagnostics is used for console logging (log() and watch())
	- To monitor a signal, a subscribe() from a .getPulse() is used
	- Reactive Programming helps with performance and treats values as signals
	- Use val() from ReactiveModule to explicitly convert data to a signal
	- To retrieve the value of a signal use pinLastValue()
	- To use math operators on signals, use methods from ReactiveModule and ScalarSignal



## Patch Editor Type <-> Script Type

	- Boolean <-> Boolean
	- Number <-> Scalar
	- Pulse <-> EventSource
	- Text <-> String
	- Vector2 <-> PixelPointSignal
	- Vector3 <-> VectorSignal or PointSignal
	- Vector4 <-> RgbaSignal



---

# Publishing

	- Platform Requirements: 4MB Insta / 10MB face / 5MB face ads
	- View Assets Summary > File size breakdown for optimization
	- Unique name up to 20 characters
	- Squared icon in jpeg format and at least 200 x 200 pixels
	- Up to 5 business days for review and acceptance
	- Effects are supported for six months after release
	- Demo video should be recorded using Face/Insta/SparkAR app



---

# Policies

	- General user base is age 13 and above
	- Must not be shocking, sensational, disrespectful or excessively violent
	- Must not promote illegal, inappropriate or unsafe stuff
	- Must not promote any legal or illegal drugs
	- Must not be of an adult or sexual nature
	- Must not discriminate against people
	- Must not promote cosmetic procedures



---

# Project Files

	- .arproj: editor file
	- .arexport: the effect to be published on SparkAR Hub (< 40MB)
	- .arprojpkg: a bundle meant to be shared between creators (most complete)
	- .arp: a patch asset file



---

# Layers and Render Options

	- Layer in the bottom is rendered first
	- Transparent objects rendered first might occlude other objects
	- Use Write to Depth Buffer to always draw objects over other objects unless they also have this option enabled.
	- You can use layers to change how lights affect objects



---

# Optimization

	- No more than 50 objects in a scene
	- Max 20k vertices per object
	- Max 50k triangle count per object
	- Max 150k triangle count for all objects
	- Heigh between 1cm and 5m
	- Remove any capabilities that aren't used in a project
	- Use the least number of bones when modeling 3D objects
	- Make textures as small as you can
	- Textures must be up to 1024x1024
	- Textures must be squared and sized the power of 2 (2x2, 4x4,...)
	- Avoid 24 or 30 FPS sequences
	- Remove the ambient light that is auto-included in a project
	- Group patches
	- Avoid using subscription, constants and callbacks when scripting
	- Compress files

---
