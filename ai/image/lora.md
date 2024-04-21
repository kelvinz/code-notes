
# Video

<https://www.youtube.com/watch?v=70H03cv57-o>


- use name in caption, e.g. kelvinz, black shirt, white background

- at least 100 steps per image
- final total must be at least 1,500 steps

- the folder structure (100 is the number of steps per image)
	- image
		- 100_kelvinz
			- *your images*

train batch size - 1
epoch - 1
save every N epochs - 1
mixed precision - bf16
number of cpu threads per core - 2
seed - 1234
learning rate - 0.0001
lr scheduler - constant
lr warmup - 0
cache latent - yes
text encoder learning rate - 5e-5
unet learning rate - 0.0001
network rank (dimension) - 128
network alpha - 128
max resolution -  768,768
stop text encoder training - 0
enable buckets - no
gradient accumulate steps - 1
prior loss weight - 1
use 8bit adam - true
use xformers - true
clip skip - 2
