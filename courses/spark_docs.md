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

