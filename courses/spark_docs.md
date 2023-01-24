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
