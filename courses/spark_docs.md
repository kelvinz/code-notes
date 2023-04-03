<https://sparkar.facebook.com/ar-studio/learn/patch-editor/audio-patches/bit-crusher-patch#output>



# patches

## animation patches

*animation patch*
Use the Animation patch to drive an animation triggered by an Interaction patch or logic that plays once.
	play + reverse + reset + stop + duration => progress + completed

*animation player patch*
Use the Animation Player patch to drive more than one animation in a procedural animation.
	animation asset + progress => animation

*frame transition patch*
Use the Frame Transition patch to control the frames in an animation sequence.
	progress + frames + first frame => current frame

*loop animation patch*
Use the Loop Animation patch to drive animations that play on a loop.
	enable + duration + reset + mirrored => progress + looped

*progress patch*
Use the Progress patch to convert an input value to a normalized value between 0 to 1.
	value + start value + end value => progress

*transition patch*
Use the Transition patch to transition something from one state to another depending on the data type selected. For example, you could transition an object from one position to another or from one color to another.
	progress + start + end + curve => value



## audio patches

*audio player patch*
Use the Audio Player patch to combine the audio clip in your project with either the Single or Multi-Clip Controller, to play audio in your scene.
	audio clip + controller => audio

*multi-clip controller patch*
Use this patch to play an audio clip multiple times in response to triggers, without stopping the clip when a new clip starts to play.
	controller => controller

*single-clip controller patch*
Play, stop or loop a single audio clip at a time based on a specific trigger.
	play + stop + loop => controller

*audio analyzer patch*
Use this patch to estimate the bandwidth and full-band signal power (loudness) in a range between 0 (silence) and 1 (max). Stereo signals will be mixed together and treated as mono.
	audio => audio + band 1...8

*audio delay patch*
Use this patch to add a decaying echo effect to audio in your Spark AR Studio effects.
	audio + active + time + feedback + dry(source) + wet(delay) + bypass => audio

*bit crusher patch*
Use the Bit Crusher patch to add low-fidelity distortion to an audio source by simulating a low sample rate and low bit resolution rate. For example, with the Bit Crusher patch you can simulate an 8kHz/6bit signal even if the audio is actually of better quality. This patch is useful for creating robotic or crackly voice effects.
	audio + mix + sample rate + bits + bypass => audio

*denoiser patch*
Use the Denoiser patch to remove background noise from an audio source.
	audio + amount + bypass => audio

*distortion patch*
Use the Distortion patch to distort the sound of an audio source, for example to add a gritty or fuzzy sound effect.
	audio + drive + grain + mix + bypass => audio

*energy meter patch*
Use this patch to estimate the signal power (loudness) of an audio input in a range between 0 (silence) and 1 (max).
	audio + window + cut-off => audio + energy + energy left + energy right

*energy meter patch (next gen)*
This patch outputs a numerical value between 0-1 that corresponds to the signal power (loudness) of an audio input. You can use this output signal to drive something in your effect, like an animation.

The Energy Meter (Next Gen) is a more flexible and customizable version of the Energy Meter patch. For example, you can set the dynamic range and minimum and maximum frequencies that you want to output.
	audio + energy floor (dB) + dynamic range (dB) + min frequency (Hz) + max frequency (Hz) + snapshot => energy + raw

*instagram music patch*
Use the Instagram Music patch to let people play tracks from the Instagram Music Library in an AR effect. People using the effect will be able to choose the track.

Combining this patch with the Energy Meter and Audio Analyzer patches can make things happen in an effect in response to the music - for example trigger animations. Follow this tutorial to build an effect that responds to audio with the Energy Meter and Audio Analyzer patches.

The Instagram Music patch should only be connected to the Energy Meter and Audio Analyzer patches or the Audio input in a patch representing Speaker. You can't for example use it with audio effect patches like the Reverb or Distortion patches.
	audio => audio

*ring modulator patch*
Use the Ring Modulator patch to create an oscillating sound effect with varying pitches. Modulation is often used as an experimental audio effect and is found in many synthesizers.
	audio + frequency + mix + bypass => audio

*parametric equalizer patch*
A three-band parametric equalizer. Use this patch to shape audio in your Spark AR effects by boosting or cutting areas of frequency.
type - notch: Removes a focused range of frequencies from the audio source.
type - peak: Passes a narrow band of frequencies and stops all other frequencies.
type - low shelf: Increases or reduces frequencies below the shelf frequency value.
type - high shelf: Increases or reduces frequencies above the shelf frequency value.
	audio + band 1...3 ( type + frequency + quality + grain ) + bypass => audio

*pitch shifter patch*
Use the Pitch Shifter patch to make the pitch of an audio source in Spark AR Studio deeper or higher, for example to create cartoon style voice effects like a monster or chipmunk.
	audio + semitone adjustment + bypass => audio

*reverb patch*
Use the Reverb patch to add a sense of space or depth to audio in your Spark AR Studio effects. You can simulate anything from sound in a tiny box to a large concert hall.
	audio + mix + early reflections gain + diffusion gain + room size + reflectivity + reflectivity high + reflectivity low + early reflections + bypass => audio



## body landmark patches

*head 2d patch*
Use the Head 2D patch to position an object on specific parts of a user's head.
	body => chin + top head + nose + left eye + right eye + left ear + right ear

*left/right arm 2d*
Use the Left/Right Arm 2D patch to position an object on a specific part of a user's left arm.
	body => left/right shoulder + left/right elbow + left/right wrist

*left/right leg 2d*
Use the Left Leg 2D patch to position an object on a specific part of a user's leg.
	body => left/right hip + left/right knee + left/right ankle

*neck 2d patch*
Use the Neck 2D patch to position an object on a user's neck.
	body => neck



## device patches

*device motion patch*
The device motion patch outputs the device's gyroscope rotation relative to the world coordinate system.
	=> 3d rotation

*locale patch*
Use the Locale patch to retrieve the user's device language or region as a string signal, allowing you to customize your effect for users in different regions.

The device language is provided as an ISO 639-1 formatted code, while the device region is provided as an ISO 3166-1 formatted code.
	=> language + region



## face landmark patches

*cheek patch*
Use the Cheek patch to position an object on a precise location on the user’s cheeks, such as the center of a cheek or a cheekbone.
	face => left/right center + left/right cheekbone

*chin patch*
Use the Chin patch to position an object on the tip of the user’s chin.
	face => chin tip

*eyeball patch*
Use the Eyeball patch to position an object on a precise location on the user’s eyes. This patch is used for iris tracking.
	face => left/right iris + left/right eyeball center + left/right eyeball rotation

*eyebrow patch*
Use the Eyebrow patch to position an object on a precise location on the user’s eyebrows, such as the middle of an eyebrow.
	face => left/right inside end + left/right outside end + left/right top

*eyelid patch*
Use the Eyelid patch to position an object on a precise location on the user’s eyelid, such as the inside or outside corner of an eye. This patch also allows you to track the degree the eye is open.
	face => left/right center position + left/right inside corner position + left/right outside corner position + left/right lower eyelid center position + left/right upper eyelid center position + left/right openness

*forehead patch*
Use the Forehead patch to position an object on the center or top of the user’s forehead.
	face => center + top

*mouth patch*
Use the Mouth patch to detect a specific part of someone's mouth.
	face => upper/lower lip center + left/right corner

*nose patch*
Use the Nose patch to position an object on a precise location on the user’s nose, such as a nostril or the tip of the nose.
	face => bridge + left/right nostril + nose tip



## interaction patches

*screen tap*
Use the Screen Tap patch to make something happen when the screen is tapped.
	enabled => gesture state + 2D position

*object tap*
Use the Object Tap patch to make something happen to an object when it’s tapped on the screen.
	object + enabled => tap

*screen rotate*
The Screen Rotate patch enables two-finger, rotation gestures. These gestures can be used to rotate objects in your effect or as a trigger for other interactivity.
	reset + enabled => state + rotation

*screen pan*
Use the Screen Pan patch to make something happen when you move your finger across the screen in any direction.

Panning the screen returns a value based on the 2D X and Y coordinates of the finger movements. The value returned differs depending on the size of the screen used.
	reset + enabled => gesture state + 2d offset + 2d position

*screen tap and hold*
Use the Screen Tap and Hold patch to make something happen while the screen is pressed for over half a second.
	enabled => gesture state + 2d position*

*Screen Pinch*
Use the Screen Pinch patch to make something happen while the screen is pinched.
	reset + enabled => gesture state + scale

*Head Rotation*
Use the Head Rotation patch to make something happen while the user’s head moves in a certain direction.
	face => left/right turn state + left/right lean state + forward/back lean state

*Head Nod*
Use the Head Nod patch to make something happen when the user nods.
	face => nod

*Head Shake*
Use the Head Shake patch to make something happen when the user moves their head from left to right or right to left and returns to the center.
	face => shake

*Mouth Open*
Use the Mouth Open patch to make something happen in an effect while the user's mouth is open.
	face => mouth open + mouth openness

*Blink*
Use the Blink patch to make something happen when the user blinks.
	face => blink

*Eyebrows Raised*
Use the Eyebrows Raised patch to make something happen while the user’s eyebrows are raised.
	face => raised

*Eyebrows Lowered*
Use the Eyebrows Lowered patch to make something happen while the user’s eyebrows are lowered.
	face => output

*Left/Right Eye Closed*
Use the Left Eye Closed patch to make something happen while the user’s left eye is closed.
	face => closed state

*Kissing Face*
Use the Kissing Face patch to make something happen while the user brings the corners of the mouth together to make a kissing face.
	face => output

*Smile*
Use the Smile patch to make something happen while the user smiles.
	face => gesture state

*Happy Face*
Use the Happy Face patch to make something happen while the user makes a happy face. The Happy Face patch detects movements across the face, such as the movement of the corners of the mouth and raising eyebrows.
	face => output

*Surprised Face*
Use the Surprised Face patch to make something happen while the user makes a surprised face.
	face => output



## logic patches

*And Patch*
Use the And patch to make something happen when two conditions are met at the same time like the user’s mouth being open and eyebrows raised.
	first boolean + second boolean => output

*Equals Patch*
Use the Equals patch to make something happen when the value coming from the input patch is within a close range or around a certain number. For example, if you want the user to face roughly a certain point on an axis to make something happen.
	first number + second number + tolerance => equal

*Equals Exactly Patch*
Use the Equals Exactly patch to make something happen when the value coming from the input patch is an exact number.
	first number + second number => exactly equal

*Greater Than Patch*
Use the Greater Than patch to make something happen if the value coming from the input patch is greater than a preset value.
	first input + second input => greater than

*Greater or Equal Patch*
Use the Greater or Equal patch to make something happen when the value coming from the input patch is greater than or equal to a preset value.
	first input + second input => greater or equal

*If Then Else Patch*
Use the If Then Else patch to switch between two states in response to something depending on the data type selected.
	condition + then + else => output

*Less Or Equal Patch*
Use the Less or Equal patch to make something happen when the value coming from the input patch is less than or equal to a preset value.
	first input + second input => less or equal

*Less Than Patch*
Use the Less Than patch to make something happen when the value coming from the input patch is less than a preset value.
	first input + second input => less than

*Not Patch*
Use the Not patch to reverse the signal coming from a patch. For example, if a true boolean signal is being sent from a patch, the Not patch makes the boolean signal false.
	signal => reverse signal

*Or Patch*
Use the Or patch to make something happen when one of two conditions are met like a tap or a long press on the device screen.
	first boolean + second boolean => output



## math patches

Math patches can be used to perform math operations on inputted patches.

*delay*
Delays a value by some time.

*Exponential Smoothing*
Returns a smoothed signal based on a damping factor measured in milliseconds.

*Arccosine*
Calculates the arccosine of an argument.

*Arcsine*
Calculates the arcsine of an argument.

*Arctangent*
Calculates the angle of a triangle given its X and Y dimensions.

*Cosine*
Calculates the cosine of an argument.

*Exponential*
Calculates the natural exponentiation of an argument.

*Logarithm*
Calculates the natural logarithm of an argument.

*Power*
Calculates the value of the first parameter raised to the power of the second.

*Sine*
Calculates the sine of an argument.

*Square Root*
Calculates the square root of a value.

*Tangent*
Calculates the tangent of an argument.

*Add*
Adds two value together.

*Ceiling*
Rounds up a value.

*Divide*
Divides one value by another value.

*Floor*
Rounds down a value.

*Maximum*
Returns the greater of two values.

*Minimum*
Returns the lesser of two values.

*Modulo*
Calculates remainder when two values are divided.

*Multiply*
Multiplies two values.

*Round*
Rounds a number to the nearest integer.

*Subtract*
Subtracts one value from another value.

*Absolute*
Calculates the absolute value of an argument.

*Clamp*
Constrains a value between a minimum and maximum limit.

*From Range*
Maps a value from a specified range to the [0,1] range.

*Mix*
Perfom linear interpolation between two values modulated by an alpha value.

*Negate*
Change a value from positive to negative or from negative to positive.

*Sign*
Extracts the sign of a value. The output is -1 for negative, 0 for zero and +1 for positive.

*Smooth Step*
Performs Hermite interpolation between two values.

*Step*
Generates a step function by comparing two values.

*To Range*
Maps a value from the [0,1] range to a specified range.

*Cross Product*
Calculates the cross product of two vectors.

*Distance*
Calculates the distance between two points.

*Dot Product*
Calculates the dot product of two vectors.

*Length*
Calculates the length (or magnitude) of a value.

*Normalize*
Calculates the unit value in the same direction as the original value.

*Reflect*
Calculates the unit value in the same direction as the original value.



## multipeer patches

Use multipeer patches to build effects that can be applied to a group on a video call.

For example, you could create an effect where one participant tapping the screen triggers something else to happen in other instances of the effect, like changing the other participants’ background. This type of effect is called a group effect in Meta Spark Studio.

Group effects:
Run separately on each participant’s device.
Can communicate with other instances of the effect, within the same video call.



## shader patches - visual shaders

A shader is a set of algorithms that determines the appearance of a 3D object's surface. They're particularly useful for applying complex changes to a material.



## shader patches - signed distance fields (SDFs)

Use signed distance fields (SDFs) to create procedural textures like shapes and patterns.

You can use SDFs in place of large custom textures to keep your effect size to a minimum. Using SDFs can also help overcome aliasing issues like jagged edges on scaled-up textures.



## time patches

Use the Runtime patch to track the number of seconds an effect is running. You can use this patch with a Logic patch to make something happen after an effect has been running for a specific length of time.



## user interface patches

*Picker UI Patch*
Use the Picker UI patch to input up to 10 uncompressed textures and display them as icons on the user’s device screen. When a user selects an option on screen it triggers an option update in the Picker UI patch and changes an element in the effect.
	visible + start index + texture 1...10 => selected option index + selected texture

*Slider UI Patch*
The Slider UI patch creates a sliding bar that users can interact with to change elements in an effect. For example, connecting the Slider UI patch to a patch representing the intensity property of a light in the scene lets users adjust the light with an on-screen slider.
	visible + start value => slider value



## utility patches

*3D Transform Pack Patch/3D Inverse Transform Pack*
Use the 3D Transform Pack to generate a 3D transform defined by position, scale and rotation input values. The 3D Inverse Transform Pack generates an inverse 3D transform by inverting position, rotation and scale input values.
	translation + scale + rotation => 3d transform

