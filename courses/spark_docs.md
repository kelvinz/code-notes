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

