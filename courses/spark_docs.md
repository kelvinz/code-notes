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

