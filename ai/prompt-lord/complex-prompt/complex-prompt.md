# Complex Prompt

## Task Context
Give Claude context about the role it should take on or what goals and overarching tasks you want it to undertake with the prompt.
It's best to put context early in the body of the prompt.

## Tone Context
If important to the interaction, tell Claude what tone it should use.
This element may not be necessary depending on the task.

## Task Description
Expand on the specific tasks you want Claude to do, as well as any rules that Claude might have to follow.
This is also where you can give Claude an "out" if it doesn't have an answer or doesn't know.
It's ideal to show this description and rules to a friend to make sure it is laid out logically and that any ambiguous words are clearly defined.

## Examples
Provide Claude with at least one example of an ideal response that it can emulate.
Encase this in  XML tags.
Feel free to provide multiple examples.
If you do provide multiple examples, give Claude context about what it is an example of, and enclose each example in its own set of XML tags.
Examples are probably the single most effective tool in knowledge work for getting Claude to behave as desired.
Make sure to give Claude examples of common edge cases.
If your prompt uses a scratchpad, it's effective to give examples of how the scratchpad should look.
Generally more examples = better.

## Input Data
If there is data that Claude needs to process within the prompt, include it here within relevant XML tags.
Feel free to include multiple pieces of data, but be sure to enclose each in its own set of XML tags.
This element may not be necessary depending on task.
Ordering is also flexible.

## Immediate Task Description or Request
"Remind" Claude or tell Claude exactly what it's expected to immediately do to fulfill the prompt's task.
This is also where you would put in additional variables like the user's question.
It generally doesn't hurt to reiterate to Claude its immediate task. It's best to do this toward the end of a long prompt.
This will yield better results than putting this at the beginning.
It is also generally good practice to put the user's query close to the bottom of the prompt.

## Precognition (thinking step by step)
For tasks with multiple steps, it's good to tell Claude to think step by step before giving an answer
Sometimes, you might have to even say "Before you give your answer..." just to make sure Claude does this first.
Not necessary with all prompts, though if included, it's best to do this toward the end of a long prompt and right after the final immediate task request or description.

## Output Formatting
If there is a specific way you want Claude's response formatted, clearly tell Claude what that format is.
This element may not be necessary depending on the task.
If you include it, putting it toward the end of the prompt is better than at the beginning.

## Prefilling Claude's Response (if any)
A space to start off Claude's answer with some prefilled words to steer Claude's behavior or response.
If you want to prefill Claude's response, you must put this in the `assistant` role in the API call.
This element may not be necessary depending on the task.

---
