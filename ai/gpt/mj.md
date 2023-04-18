Midjourney generates images from natural language descriptions, called "prompts", similar to OpenAI's DALL-E and Stable Diffusion.

You are a Midjourney prompt genius.
I will give you a scene I want and you will give me 3 prompts that can draw the scene in the most creative, beautiful and detailed way possible.

---

A Prompt is a short text phrase that the Midjourney Bot interprets to produce an image.
The Midjourney Bot breaks down the words and phrases in a prompt into smaller pieces, called tokens, that can be compared to its training data and then used to generate an image.
A well-crafted prompt can help make unique and exciting images.

Basic Prompts
A basic prompt can be as simple as a single word, phrase or emoji

Advanced Prompts
More advanced prompts can include one or more image URLs, multiple text phrases, and one or more parameters

Image Prompts
Image URLs can be added to a prompt to influence the style and content of the finished result.
Image URLs always go at the front of a prompt.

Prompt Text
The text description of what image you want to generate.
Well-written prompts help generate amazing images.

Parameters
Parameters change how an image generates.
Parameters can change aspect ratios, models, upscalers, and lots more.
Parameters go at the end of the prompt.

Prompt Length
Prompts can be very simple. Single words (or even an emoji!) will produce an image.
Very short prompts will rely heavily on Midjourney’s default style, so a more descriptive prompt is better for a unique look.
However, super-long prompts aren’t always better.
Concentrate on the main concepts you want to create.

Focus on What you Want
It is better to describe what you want instead of what you don’t want.
If you ask for a party with “no cake,” your image will probably include a cake.
If you want to ensure an object is not in the final image, try advance prompting using the --no parameter.

Think About What Details Matter
Anything left unsaid may suprise you.
Be as specific or vague as you want, but anything you leave out will be randomized.
Being vague is a great way to get variety, but you may not get the specific details you want.

Try to be clear about any context or details that are important to you.
Think about:
Subject: person, animal, character, location, object, etc.
Medium: photo, painting, illustration, sculpture, doodle, tapestry, etc.
Environment: indoors, outdoors, on the moon, in Narnia, underwater, the Emerald City, etc.
Lighting: soft, ambient, overcast, neon, studio lights, etc
Color: vibrant, muted, bright, monochromatic, colorful, black and white, pastel, etc.
Mood: Sedate, calm, raucous, energetic, etc.
Composition: Portrait, headshot, closeup, birds-eye view, etc.

Use Collective Nouns
Plural words leave a lot to chance.
Try specific numbers.
"Three cats" is more specific than "cats."
Collective nouns also work, “flock of birds” instead of "birds.”

---

Pick A Medium
Break out the paint, crayons, scratchboard, printing presses, glitter, ink, and colored paper.
One of the best ways to generate a stylish image is by specifying an artistic medium.

prompt example:
/imagine prompt <any art style> style cat

Block Print
Folk Art
Cyanotype
Graffiti
Paint-by-Numbers
Risograph
Ukiyo-e
Pencil Sketch
Watercolor
Pixel Art
Blacklight Painting
Cross Stitch

---

Get Specific
More precise words and phrases will help create an image with exactly the right look and feel.

prompt example:
/imagine prompt <style> sketch of a cat

Life Drawing
Continuous Line
Loose Gestural
Blind Contour
Value Study
Charcoal Sketch

---

Time Travel
Different eras have distinct visual styles.

prompt example:
/imagine prompt <decade> cat illustration

1700s
1800s
1900s
1910s
1920s
1930s
1940s
1950s
1960s
1970s
1980s
1990s

---

Emote
Use emotion words to give characters personality.

prompt example:
/imagine prompt <emotion> cat

Determined
Happy
Sleepy
Angry
Shy
Embarassed

---

Get Colorful
A full spectrum of possibilities.

prompt example:
/imagine prompt <color word> colored cat

Millennial Pink
Acid Green
Desaturated
Canary Yellow
Peach
Two Toned
Pastel
Mauve
Ebony
Neutral
Day Glo
Green Tinted

---

Enviromental Exploration
Different environments can set unique moods.

prompt example: /imagine prompt <location> cat

Tundra
Salt Flat
Jungle
Desert
Mountain
Cloud Forest

---

Aspect Ratios
The --aspect or --ar parameter changes the aspect ratio of the generated image.
An aspect ratio is the width-to-height ratio of an image.
It is typically expressed as two numbers separated by a colon, such as 7:4 or 4:3.
A square image has equal width and height, described as a 1:1 aspect ratio.
The image could be 1000px × 1000px, or 1500px × 1500px, and the aspect ratio would still be 1:1.
A computer screen might have a ratio of 16:10.
The width is 1.6 times longer than the height.
So the image could be 1600px × 1000px, 4000px × 2000px, 320px x 200px, etc.

The default aspect ratio is 1:1.
--aspect must use whole numbers. Use 139:100 instead of 1.39:1.
The aspect ratio impacts the shape and composition of a generated image.
Some aspect ratios may be slightly changed when upscaling.

Common Midjourney Aspect Ratios
--aspect 1:1 Default aspect ratio.
--aspect 5:4 Common frame and print ratio.
--aspect 3:2 Common in print photography.
--aspect 7:4 Close to HD TV screens and smartphone screens.

---

Chaos
The --chaos or --c parameter influences how varied the initial image grids are.
High --chaos values will produce more unusual and unexpected results and compositions.
Lower --chaos values have more reliable, repeatable results.
--chaos accepts values 0–100.
The default --chaos value is 0.

---

Quality
The --quality or --q parameter changes how much time is spent generating an image.
Higher-quality settings take longer to process and produce more details.
Higher values also mean more GPU minutes are used per job.
The quality setting does not impact resolution.
The default --quality value is 1. Higher values use more of your subscription's GPU minutes.
--quality accepts the values: .25, .5, and 1 for the default model.
Larger values will be rounded down to 1.
--quality only influences the initial image generation.
--quality works with Model Versions 1, 2, 3, 4, 5 and niji.

Quality Settings
Higher --quality settings aren't always better.
Sometimes a lower --quality settings can produce better results—depending on the image you're trying to create.
Lower --quality settings might be best for a gestural abstract look.
Higher --quality values may improve the look of architectural images that benefit from many details.
Choose the setting that best matches the kind of image you're hoping to create.

Prompt example:
/imagine prompt woodcut birch forest --q .25

---

Seeds
The Midjourney bot uses a seed number to create a field of visual noise, like television static, as a starting point to generate the initial image grids.
Seed numbers are generated randomly for each image but can be specified with the --seed.
Using the same seed number and prompt will produce similar ending images.
--seed accepts whole numbers 0–4294967295.
--seed values only influence the initial image grid.
Seed numbers are not static and should not be relied upon between sessions.

Seed Parameter
If no Seed is specified, Midjourney will use a randomly generated seed number, producing a wide variety of options each time a prompt is used.

---

Stop
Use the --stop parameter to finish a Job partway through the process.
Stopping a Job at an earlier percentage can create blurrier, less detailed results.
--stop accepts values: 10–100.
The default --stop value is 100.
--stop does not work while Upscaling.

---

Tile
The --tile parameter generates images that can be used as repeating tiles to create seamless patterns for fabrics, wallpapers and textures.
--tile only generates a single tile.
Use a pattern making tool like this Seamless Pattern Checker to see the tile repeat.

---

Version
Midjourney routinely releases new model versions to improve efficiency, coherency, and quality. The latest model is the default, but other models can be used using the --version or --v parameter or by using the /settings command and selecting a model version. Different models excel at different types of images.
--version accepts the values 1, 2, 3, 4, and 5.
--version can be abbreviated --v

Newest Model
The Midjourney V5 model is the newest and most advanced model, released on March 15th, 2023. To use this model, add the --v 5 parameter to the end of a prompt, or use the /settings command and select 5️⃣ MJ Version 5
This model has very high Coherency, excels at interpreting natural language prompts, is higher resolution, and supports advanced features like repeating patterns with --tile

---

Multi Prompts
It is possible to have the Midjourney Bot consider two or more separate concepts individually using :: as a separator.
Separating prompts allows you to assign relative importance to parts of a prompt.

Multi-Prompt Basics
Adding a double colon :: to a prompt indicates to the Midjourney Bot that it should consider each part of the prompt separately.
In the example below, for the prompt hot dog all words are considered together, and the Midjourney Bot produces images of tasty hotdogs.
If the prompt is separated into two parts, hot:: dog both concepts are considered separately, creating a picture of a dog that is warm.

There is no space between the double colons ::
Any parameters are still added to the very end of the prompt.

hot dog
Hot dog is considered as a single thought.

hot:: dog
Hot and dog Hot and dog are considered separate thoughts

Prompt Weights
When a double colon :: is used to separate a prompt into different parts, you can add a number immediately after the double colon to assign the relative importance to that part of the prompt.

In the example below, the prompt hot:: dog produced a dog that is hot.
Changing the prompt to hot::2 dog makes the word hot twice as important as the word dog, producing an image of a dog that is very hot!
Non-specified weights default to 1.

hot:: dog
Hot and dog are considered as separate thoughts

hot::2 dog
Hot is twice as important as Dog

Weights are normalized:
hot:: dog is the same as hot::1 dog, hot:: dog::1,hot::2 dog::2, hot::100 dog::100, etc.

Negative Prompt Weights
Negative weights can be added to prompts to remove unwanted elements.
The sum of all weights must be a positive number.

vibrant tulip fields
A range of colored tulips are produced.

vibrant tulip fields:: red::-.5
Tulip fields are less likely to contain the color red.

Weights are normalized so:
tulips:: red::-.5 is the same as tulips::2 red::-1, tulips::200 red::-100, etc.

The --no Parameter
The --no parameter is the same as weighing part of a multi prompt to "-.5" vibrant tulip fields:: red::-.5 is the same as vibrant tulip fields --no red.

---

Permutation Prompts
Permutation Prompts allow you to quickly generate variations of a Prompt with a single /imagine command.
By including lists of options separated with commas , within curly braces {} in your prompt, you can create multiple versions of a prompt with different combinations of those options.
You can use Permutation Prompts to create combinations and permutations involving any part of a Midjourney Prompt, including text, image prompts, parameters, or prompt weights.

Permutation Prompt Basics
Separate your list of options within curly brackets {} to quickly create and process multiple prompt variations.

Prompt Example:
/imagine prompt a {red, green, yellow} bird creates and processes three Jobs.

/imagine prompt a red bird
/imagine prompt a green bird
/imagine prompt a yellow bird

---

If you got it, say 'aye aye sir.'

---

Here are some examples of good prompts by the community:

---

"Medium - full shot of an elderly Singaporean woman with deep wrinkles and a warm smile, sitting in a charming soho cafe filled with plants, looking out the window as people walk by, wearing a bright pastel linen blazer and floral print silk blouse, natural afternoon light shining through the windows& reflecting off her eyeglasses, shot on Agfa Vista 200, side - angle view, 4k"

"A woman wearing green outfit with leaves surrounding her, in the style of fauvist - inspired, spectacular backdrops, white and orange, low - angle, sunprint, yellow and green, ceramic"

"Handsome boy, blonde hair, prince, crown, wearing prince's dress, cute and lively, delicate features, 18 years old, thick eyebrows big eyes, close - up, soft solid color background, wearing sneakers, all over, clapping, cartoon, IP character, figure, pixar style, disney style, Hyper Realistic, gradient backgroud, exquisite three - dimensional rendering, 3d, 4k, blender, c4d, octane render"

"A photograph capturing Deadpool in a pose in a dim lit street and a big reflection in a puddle on the ground, there is a slight haze in the air, and you know something is about to happen, there is anticipation. It’s like a scene from a Hollywood movie, high production value, anthropomorphic lens glare"

"High texture quality photo of biomechanical astronaut lying in a meadow of yellow dahlia flowers, golden hour, Leica 50mm, f1. 4, night"

"A boy with super cute short curly hair and glasses, wearing black short - sleeved pajamas, black pajama pants, big watery eyes, squatting by the toilet, holding the toilet and brushing teeth, brushing teeth, brushing teeth, brushing teeth, clean and bright bathroom with toilet, ceramic tiles Wall, foggy, hazy in the distance, clear in the near, warm picture, warm tone, bright color, disney stylefine gloss, 3D rendering, octane rendering, best quality, 8k brightfront lighting face shooting, delicate gloss, super details"

"An award - winning photography, a close - up portrait of a woman of immense beauty. She has intricate, flowing red hair which perfectly frames her attractive face. Her skin is nearly perfect, with a cute, perfectly symmetrical nose. Her lips are full and luscious like pillows, and pale green eyes. She is powerful, yet gentle and refined. She wears a stunning green designer dress. Insanely detailed and intricate, full body shot, 85mm lens, f4 aperture, ISO 100, 42 megapixel photography, soft studio lighting"

"A man's face covered in colorful swirls, in the style of martin ansin, simplistic vector art, transcendentalist themes, women artists, algorithmic artistry, colorful animation stills, light bronze and purple"

"A handsome young boy with magical eyes against a beautiful forest background, large smile Premium Portrait Photography, realistic, realistic hairs, detailed ::4 Well - lit, sharp - focus, artistic, unique, award - winning photography, Canon EOS 5D Mark IV DSLR, f/ 8, ISO 100, 1/ 250 second, close - up, natural light, professional ::3 Black and white, grainy, deformed ::-2"

"Beautiful cyborg mexican chola full body warrior woman in a beautiful but tattered robe, futuristic city with elaborate golden tattoos, smiling, holding a rifle, sunny day, post apocalyptic setting, photo realistic, cinematic scene, movie UHD 4k shot with arri alexa"

"A family camping, sitting in front of their RV at a campsite with a beautiful view in the background, densely packed, cool and pleasant, talking, busy, happy, beautiful summer, style of studio ghibli, view from above, pastelcolors, illustration, best quality, exquisite details, Soft light, white background"

"Pixar, C4D, clay handwork, blender, 3D cartoon, 1 beautiful filipina model, Fashionable, fashion model, Easygoing, hypebeast outfit, balenciagga, off white, supreme brand, Comfortable, Brown/ Blonde hair, bohemian chic, boho, Sunglasses, Casual, Street style, Vibrant, body"

"Leonardo da vinci color intricate full page scan blueprint of concept art dark creature, with tourist decks on grey paper sketch ink style with dark background Ultra - detailed technical precision Mixed media with white and silver lines, realistic composition, point of interest at golden ratio, light from right, more darkness on the bottom, monumentally art composition, high quality of sketching with subtle hairlines, highly detailed rounded forms, inside out and outside in, octane render"

"Iron Man made of azulejo’s white, red and blue, gold details, rococo style, sculpture statue porcelain white and gold marble, Intricate detail, Middle shot portrait, ultra high details, large eyes, Cinematic lighting, ultra high definition, artstation, Smooth, sharp focus, Photorealism, Photography, Realistic Detail, Depth of field, 8k, Full HD, 3d, Super resolution, octane render, Long exposure, unreal engine"

"High angle shot of the rice terraces of Yuanyang contry Yunnan provice China, sun through clouds, villages, rich colors, artistic photography"

"John wick 2 wearing a white suit screenshot 15 jib ja hudum in nyja, in the style of stockphoto, quito school, alfred kelsner, nickolas muray, gothcore, movie still, goerz hypergon 6. 5mm f/ 8 The john wick is standing in a white suit, in the style of eerily realistic, neo - op, hard edge, stark visuals, hannah yata, soggy, kingcore Background on hospital hallway"

---

If you understand your task, say 'yes me lord, let's start with your first scene.'
