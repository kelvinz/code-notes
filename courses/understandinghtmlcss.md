

<https://www.udemy.com/course/understanding-html-and-css/>



# introduction



---

# trees

**Data Structure**
A particular way to organize and store data so that a computer can quickly and efficiently access and modify it

- Doubly Linked List
- Linked Lists
- Arrays
- Trees



**The Language of Trees**

- root
- ancestors
- parent
- siblings
- children
- descendants
- node



**Traversal and Search**
A way of moving around the tree structure to find data



---

# html

**Agent**
Something that acts on someone else's behalf
*User Agent:* software that acts on the user's behalf



**User Agents**
We want to help user agents do their job successfully

- browsers
- screen readers
- googlebots



**Tags**
Start and End tag

- a way to 'markup' the document that is friendly to user agents
- and easy for humans to read and write
- the 'markup' describes the document
- by 'marking up' a document you are attempting to add meaning



**Language**

- consistent vocabulary
- can convey meaning clearly
- exists to facilitate communication
- when learning, can go to a dictionary and look it up!



**Tags** - give meaning to content
**Attributes** - related pieces of information or instructions
**Elements** - Tags + Attributes



**Specification**
A standard of precise requirements
Internet technologies are governed by many specifications
Somtimes we just call it the 'spec'
<https://html.spec.whatwg.org/>



**HTML**
HTML is the World Wide Web's core markup language.
Originally, HTML was primarily designed as a language for *semantically describing* scientific *documents*.
Its general design, however, has enabled it to be adapted, over the subsequent years, *to describe a number of other types of documents and even applications*.



**Content Model**
A description of the element's intented contents
<element>What we agree is allowed to go here?</element>



---

# the document



**DOCTYPEs**
DOCTYPEs are required for legacy reasons.
When omitted, browsers tend to use a different *rendering mode that is incompatible with some specifications*.
Including the DOCTYPE in a document ensures that the browser makes a best-effort attempt at following the relevant specifications.

```html

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Resume of Tony Alicea</title>
	</head>
	<body>
	</body>
</html>

```



---

# document sections



**Sectioning Root**
A node in the tree that represents the root of a new section of the document.
We can look at a tree and think of a portion of the tree (a sub-tree) as having its own root.



**article**
The article element represents a *complete, or self-contained, composition* in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication.
*This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.*
When article elements are nested, the inner article elements represent articles that are in principle related to the contents of the outer article. For instance, a blog entry on a site that accepts user-submitted comments could represent the comments as article elements nested within the article element for the blog entry.

```html

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Resume of Tony Alicea</title>
	</head>
	<body>
		<article>
			Hi! I'm Tony Alicea and I'm happy to have you as a student in my courses. Don't imitate, understand!
		</article>
	</body>
</html>

```



---

# grouping things



---

# text itself



---

# the browser & the dom



---

# accessibility



---

# interactivity



---

# javascript frameworks



---

# stylesheets & querying trees



---

# box model



---

# box position



---

# painting & images



---

# flow



---

# flexbox



---

# grid



---

# fonts, colors, & more



---

# responsiveness & querying media



---

# saving time & effort



---

# css frameworks



---

# conclusion



---
