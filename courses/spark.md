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
	- Specular
		Shininess & highlight color of a surface.
	- Normal
		Create realistic textures like bumps, grooves & rivets without adding extra geometry.
	- Emission
		Illuminate from itself. Won't case rays so it won't affect other objects.
	- Alpha
		Mask the alpha channel, use invert to switch which part is masked.
	- Tile
		Scale textures applied.
	- Offset
		Shift the origin of the textures
	- Render Options/Advance Render Options.
		How material renders in scene
	- Used by
		Where this material is applied to.

*Flat Material*
Flat materials don’t respond to lighting and display color and texture values absolutely. You might use this material if there’s lighting and shadow present in your texture file already or if you’re creating a material for a 2D object.
	...
	- Environment
		add environment texture

*Blended Material*
The blended material includes a blending mode, to mix textures and colors together.
	...
	- Color
		Add color from palette.
	- Blend Mode
		Normal, Add, Multiply.
	- Opacity
		Transparency of material on individual map level.
	- Double-sided
		Displays both sides of a face normal.
	- Cull Mode
		Front - Discard pieces of the mesh that are facing the viewer.
		Back - Discard pieces of the mesh that are facing away from the viewer. Most effects use this mode to improve performance.

*Physically-Based Material (PBR)*
This material is used to create realistic-looking objects in Spark AR Studio. The different properties in this material allow you to add surface roughness, metallic effects, and lighting that mimics real world light.
	...
	- Base Texture
		This forms the base material. To add color & details.
	- ORM Texture
		Define roughness, metallic details, occlusion strength.
	- Normal Map
		Create appearance of real-world texture like bumps, grooves, rivets without adding extra geometry.
	- Occlusion
		Approximates soft shadows based into creased areas of a surface.

*Face Paint Material*
The face paint material is used to create a mask effect that shows the skin and features of the person using the effect, either behind a custom texture or a color. For example, you can use this material to create a tattoo or makeup effect.

## Blend Mode
	- Subtract
		Subtracts pixel values of the source from the destination. In case of negative values, black is displayed.
	- Replace
		The non-transparent pixels of the source replace corresponding pixels of the destination.
	- Alpha
		Linear interpolation between the pixels of the source and destination as specified by the alpha values of the source.
	- Associate Alpha
		Same as alpha blend mode, but for source with RGB channels of each pixel premultiplied by its alpha.
	- Add
		Adds pixel values of the source to the destination.
	- Multiply
		Multiplies the RGB channels of each pixel from the source with the values of the corresponding pixel from the destination.
	- Screen
		Values of each pixel in the source and destination are inverted, multiplied, and then inverted again.

## Skin Retouching
Skin retouching is an effect that can be applied when we want to give a smoother appearance to a face or scene, using a material in Spark AR Studio.

## Working with textures
You can apply one or more textures to a material, then apply the material to an object. Texturing with realistic lighting is difficult to achieve in AR effects and it takes a lot of processing power. To reduce the impact on performance you can do a few things;
	- Bake lighting directly into 3D objects used for decoration in face effects to hint at highlights and shadows.
	- Bake lighting into static (non-moving) objects such as furniture and accessories for a more realistic effect.
	- Use a soft light setup without strong highlights or shadows. Baked lighting works best in environments where the light, intensity, and color don’t change throughout the effect.
	- Use MatCap (material capture) reflection environment textures with flat shaders.
You’re able to make a variety of textures in Spark AR Studio. For example, you can turn the video captured by the camera or the face tracker into a texture. You can also use visual shaders to create color gradients, and signed distance fields (SDF) to create shapes and patterns. You can even use the segmentation texture to separate the user from their background to transform the environment behind them.
	- Compressing textures can make your effects perform better. It’s a good idea to look for opportunities to compress textures in your effects where you can.
	- Max of 1024 * 1024 pixels.
	- When transparency isn’t needed, use lower resolution JPG files instead of PNG files.



# Features of Spark AR studio

## javascript patch bridge
pass info between scripts and the patch by adding shared variables
7 types with differences between them
( patch editor type vs script type )
	- Boolean / Boolean
	- Number / Scalar
	- Pulse / EventSource
	- Text / String
	- Vector 2 / PixelPointSignal
	- Vector 3 / VectorSignal or PointSignal
	- Vector 4 / RgbaSignal



# Adding scene interactivity

## patches to make things more interactive
	- screen pan patch; detects swipe of finger
	- divide patch; manipulate input from screen pan
	- screen pinch patch; change scale
	- screen rotate patch; rotate object

## tap patches
	- screen tap patch; detect screen being tapped
	- object tap patch; detect object being tapped

## movements
	- blink
	- eyebrows lowered
	- eyebrows raised
	- head nod
	- head rotation
	- head shake
	- left eye closed
	- mouth open
	- right eye closed

## gestures
	- happy face
	- kissing face
	- smile
	- surprised face

## face landmarks
	- cheek
	- chin
	- eyeball
	- eyebrow
	- eyelid
	- forehead
	- mouth
	- nose

## native ui
	- picker ui
	- slider ui



# Scene Optimization

## guidelines
	- no more than 50 objects
	- max texture 1024x1024 px
	- <20k vertices per object
	- <50k tri count per object
	- <150k tri count for effect
	- 1 cm - 5 meters
	- remove capabilities not used in effect

## optimisation
	- use spark ar toolkit to optimize objects before exportring from blender
	- for animations, use least number of bones & avoid complex blend shapes
	- make textures as small as possible
	- max 1024x1024 px
	- textures sized to the power of 2 (2x2, 4x4, 16x16, 32x32)
	- avoid long 2d texture sequences

## limitations
	- best at detecting people chest upwards with balanced lighting
	- segmentation works only on newer devices iPhone 6s or later, S6 or later
	- both segmentation & face tracker together don't perform too well

## lights
	- more light sources, more impact on performance
	- lowest to to highest impact light types
	- ambient < directional < point < spot < environment

## optimizing logic
	- group patches
	- avoid duplicating logic
	- when scripting, avoid subscriptions
	- cast vars as const
	- less callbacks
	- less things called every frame

## texture compression
	- automatic; finds best compression format
	- manual; apply additional compression and control settings
	- none; if you already compressed before uploading

## image compression
	- prioritize either file size or in-memory size
	- file size = choose uncompressed and do your own optimisation
	- in-memory size = choose etc
	- etc textures have fixed compression ratio; image can be larger than equivalent png/jpg but will be smaller than full raw image
	- on loading, etc textures remain same size while non compressed png/jpg will expand to full raw image

## tips for saving/sharing files
	- use patch groups / patch assets; shareable / import like normal assets, .arp
	- use project bundles; file > package, quick & easy distribution of your work
	- use ar blocks; share section of project, good for repeat / reuse of parts of your project
		input/output types; pulse, boolean, scalar, vec2/3/4, color, number, text, texture
	- .arfx file size;
		ig = < 4mb
		fb = < 2mb
		fb ads = < 5mb
	- .arexport upload to spark ar hub = < 40mb
	- debug; console logging, signal watching
	- dynamic instantiation can create, destroy, reorder objects dynamically via script
		not displayed in UI by default
		when a dynamic api is called within a script, notification prompts to switch mode
		dynamic objects cannot be edited from ui, exclusively set via script



# Publishing & Effect Management
	1. upload your effect file to the spark ar hub
	2. add your icon & video
	3. submit your effect
	4. allow up to 5 days for acceptance
	5. if accepted, see your effect in action



# Practice: Working with clients



# Glossary

**.arexport**
Final zipped file that is created when you export an effect in Studio. 40 MB limit.

**.arproj**
Project file (zipped JSON + internal assets). Instagram should be 4 MB or less on both iOS, Android and older Android. Facebook should be under 2 MB for the best reach, but they can be up to 10 MB. Facebook Ads should be under 5 MB

**.arp**
File extension used when you make a patch asset.

**audio clips**
Audio clips should be mono M4A, AAC codec, with a sampling frequency of 44.1KHz. You can import your own or choose from a huge range of free, licensed sound effects in the AR Library.

**audio playback controller**
The audio playback controller renders
sound in the scene only after it’s connected to a speaker object. Use it to play sound continuously on a loop in your AR effect, or connect one-shot audio playback to boolean signals in the Patch Editor.

**blend mode**
Sets the blend mode of blend material:
	- Add
	- Associative Alpha
	- Alpha
	- Subtract
	- Multiply
	- Replace
	- Screen

**blended material**
The blended material includes a blending mode, to mix textures and colors together.

**bg influence**
Multiplies a color or texture against a grayscale version of the video feed. Only available in the face paint material.

**camera texture**
A texture that extracts live video as it’s being captured by the device camera. The camera texture can be combined with segmentation to separate someone from their background. You can also manipulate the pixels in the texture to modify the image.

**canvas**
A container for laying out 2D objects and making them responsive to the size of the device screen.

**color luts; color lookup textures**
Color LUTs (Lookup Textures) are tables of RGB color values. In Spark AR, you can use color LUTs to quickly create color-graded effects across the entire scene.

**cull mode**
Describes how material is culled:
	- Front
		Discard pieces of the mesh that face the viewer.
	- Back
		Discard pieces of the mesh that face away from the viewer.
		Most effects use this mode to improve performance.

**occluders**
Occluders make AR effects more realistic by hiding things that wouldn’t be visible in real life. Occluders are made by using an object and a material.

**segmentation**
Used to identify and separate parts of the camera input. For example, to separate someone’s hair from the rest of the scene so you can change the color without changing anything else in the effect.

**shader asset**
A material type resulted from shader code.

**signals**
Signals are special objects that contain a value that changes over time.

**speaker**
The speaker is an object in Spark AR Studio that renders sound in your effect. You can add multiple speakers to a project to render different audio clips.

**uv map**
A UV map is a 2D representation of the surface of your 3D object.

**visual shaders**
A shader is a set of algorithms that determines the appearance of a 3D object’s surface. They’re particularly useful for applying complex changes to a material.



---

# Spark AR Curriculum

## Where you can publish to
	- Instagram
		- Organic
			- Post-capture
			- Stories
			- Reels
	- Facebook
		- Organic
		- AR Ads
	- Facebook Messenger
		- Real Time Chat
	- Portal
		- Real Time Chat
		- Storytime

## Helper assets
	- Blender Toolkit
	- Adobe Substance Template & Export Settings
	- Texture Packer Template
	- Adobe Photoshop Facepaint Template
	- Face Reference Assets
	- Face Deformation Pack

## Design Thinking steps
	1. Empathise
	2. Define
	3. Ideate
	4. Prototype
	5. Test

## Power of 2
Use square images in the power of 2
512 x 512, 1024 x 1024
for best optimisation
else spark will resize to square and then back down again
wasting resources

## Tri count
<50k each object
<150k for scene

## Exports
.arexport - for uploading to hub, just the effect (to publish)
.arproj - everything, including unused thing (your personal working folder)
.arprojpkg - master copy, with all stuff critical to project (to share with collaborators)

## Policies
Effects
	- performance; responsive, no stuttering or lag, load in a reasonable amount of time
	- functionality; no hidden, unexpected features or functionality
	- logos; to appear as natural part of effect
	- text; don't prompt them to navigate away from platform
	- controls; don't use custom controls
	- photos; don't use people, real or fictional (even if you have approval)
	- capabilities; use those permitted for platform only
	- media library support; suitable for both vertical & horizontal photo/video
Metadata & Media
	- name; should not be duplicated for your own account or include your account name
	- demo video; accurately demostrate your effect. no screencast/stock/recordings, must be live captured
	- categories; should accurately represent the contents of the effect, spark ar may change the categories if it feels it's better suited for other categories
AR Content Standards
	- comply to community standards, laws, statutes, regulations
	- no shocking, sensational, disrespectful, excessive violent content
	- don't promote illegal products, services or activities, or inappropriate or unsafe
	- not promote alcohol, tobacco, marijuana, pharmaceutical medical products, nor brands associated with such products
	- no adult, sexual content; nudity, depictions of people in explicit or suggestive positions
	- content must not discriminate against, harass, provoke, disparage people
	- not promote the use or depict the sale of potentially dangerous cosmetic procedures
	- not promote online gambling, online games of skill that use real money or online lotteries
	- content must not be spammy, misleading or deceptive
	- no tags or links off the platform (hashtags, urls, qr codes, other scannable codes)
	- okay to have social media handles with no call to action or urls that form a company's name
	- no content that has intellectual property infringement


## Tips to Publishing
	1. make original effects
	2. build your brand
	3. use related keywords
	4. use good icons

## Misc
	- icon
		Best practices must be followed for the icon to upload successfully.
		Your image must have square, not have rounded corners.
		Don't crop your image into a circle or oval shape.
		Your image mustn't be too small.
		Dimensions must be at least 200 x 200 pixels.
