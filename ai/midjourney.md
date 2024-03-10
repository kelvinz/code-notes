
# commands

/tune prompt
create a range of styles
can be used in v5.2

/shorten
analyze prompt
highlight most important words, etc

/describe
analyze image
give 4 possible prompts from image

a {red, green, yellow} bird
a {red, green} bird in the {jungle, desert}
generate multiple at one go
can also be used in parameters
--ar {3:2, 1:1, 2:3, 1:2}

---

# parameters

--ar 16:9
--aspect 16:9
sets aspect ratio

--c 0
--chaos 0
more unexpected grids
default → 0
range → 0 - 100

--no item
don't include item
can use comma to add more

--q 1
--quality 1
soften/sharpen details
time spent generating image
default → 1
range → 0.25 - 5

--r 2
--repeat 2
range → 2-4, 2-10, 2-40
depending on subscription

--seed 0
0-4294967295

--stop 100
default → 100
range → 10 - 100
low steps = blurry/noisier images

--style raw
push towards photorealism
less mj styling
--style random
explore styles in v5.2

--s 100
--stylize 100
default → 100
range → 0 - 1000
tunes mj influence

--tile
make a repeating pattern

--v 6
--version 6
default → 6
range → 1 - 6
--niji 6

---
