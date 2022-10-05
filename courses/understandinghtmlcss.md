

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



**section**
The section element represents a *generic section of a document* or application.
A section, in this context, is a thematic grouping of content, typically with a heading.

```html

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Resume of Tony Alicea</title>
	</head>
	<body>
		Resume
        <section>
            Tony Alicea
            Coder, UX Designer, and Instructor
            Website: google.com
            Phone: 555-555-1111
            Twitter: @anthonypalicea
        </section>

        <article>
            Hi! I'm Tony Alicea and I'm happy to have you as a student in my courses. Don't imitate, understand!
        </article>

        <section>
            Services
            Web Development
            App Development
            Training
        </section>

        <section>
            Skills
            HTML
            Markup your content with semantic HTML.
            CSS
            Layout your content visually for multiple devices.
            JavaScript
            Make your content more interactive, and build web applications.
        </section>

        <section>
            Work History
            UX/UI Designer
            XYZ Corp
            3 years
        
            Web Developer
            ABC Corp
            5 years
        
            Carpet Cleaner
            123 Inc.
            2 years
        </section>

        <section>
            Portfolio
        </section>

        <section>
            Testimonials
            I love Tony's courses!
            Tony's courses helped me get a job.
        </section>

        <section>
            Mailing Address
            111 Main St.
            Somewhere, NY 33333
        </section>
	</body>
</html>

```



**Aside**
The aside element represents a section of a page that consists of content that is *tangentially related* to the content around the aside element, and which could be *considered seperate* from that content. Such sections are often represented as sidebars in printed typography.

```html

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Resume of Tony Alicea</title>
	</head>
	<body>
		Resume
        <section>
            Tony Alicea
            Coder, UX Designer, and Instructor
            Website: google.com
            Phone: 555-555-1111
            Twitter: @anthonypalicea
        </section>

        <article>
            Hi! I'm Tony Alicea and I'm happy to have you as a student in my courses. <aside>Don't imitate, understand!</aside>
        </article>

        <section>
            Services
            Web Development
            App Development
            Training
        </section>

        <section>
            Skills
            HTML
            Markup your content with semantic HTML.
            CSS
            Layout your content visually for multiple devices.
            JavaScript
            Make your content more interactive, and build web applications.
        </section>

        <section>
            Work History
            UX/UI Designer
            XYZ Corp
            3 years
        
            Web Developer
            ABC Corp
            5 years
        
            Carpet Cleaner
            123 Inc.
            2 years
        </section>

        <section>
            Portfolio
        </section>

        <section>
            Testimonials
            I love Tony's courses!
            Tony's courses helped me get a job.
        </section>

        <section>
            Mailing Address
            111 Main St.
            Somewhere, NY 33333
        </section>
	</body>
</html>

```



**Headings and Rank**
Heading content defines the *heading of a section* (whether *explicitly marked up* using sectioning content elements, or *implied* by the heading content itself).
These elements have a rank given by the number in their name.
The h1 element is said to have the highest rank, the h6 element has the lowest rank, and two elements with the same name have equal rank.
Subsequent headings of *equal or higher rank* start new (implied) sections, headings of *lower rank start implied subsections* that are part of the previous one.

```html

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Resume of Tony Alicea</title>
	</head>
	<body>
		<h1>Resume</h1>
        <section>
            <h2>Tony Alicea</h2>
            Coder, UX Designer, and Instructor
            Website: google.com
            Phone: 555-555-1111
            Twitter: @anthonypalicea
        </section>

        <article>
            Hi! I'm Tony Alicea and I'm happy to have you as a student in my courses. <aside>Don't imitate, understand!</aside>
        </article>

        <section>
            <h2>Services</h2>
            Web Development
            App Development
            Training
        </section>

        <section>
            <h2>Skills</h2>
            HTML
            Markup your content with semantic HTML.
            CSS
            Layout your content visually for multiple devices.
            JavaScript
            Make your content more interactive, and build web applications.
        </section>

        <section>
            <h2>Work History</h2>
            UX/UI Designer
            XYZ Corp
            3 years
        
            Web Developer
            ABC Corp
            5 years
        
            Carpet Cleaner
            123 Inc.
            2 years
        </section>

        <section>
            <h2>Portfolio</h2>
        </section>

        <section>
            <h2>Testimonials</h2>
            I love Tony's courses!
            Tony's courses helped me get a job.
        </section>

        <section>
            <h2>Mailing Address</h2>
            111 Main St.
            Somewhere, NY 33333
        </section>
	</body>
</html>

```



**Headers and Footers**
A header element is intented to usually *contain the section's heading* (an h1-h6 element or an hgroup element), but this is not required. The header element can also be used to wrap a section's *table of contents, a search form, or any relevant logos*.
The footer element represents a *footer for its nearest ancestor* sectioning content or sectioning root element.
A footer typically contains *information about its section such as who wrote it*, links to related documents, copyright data, and the like.
When the footer element contains entire sections, they represent *appendices, indexes, long colophons, verbose license agreements, and other such content*.

```html

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Resume of Tony Alicea</title>
	</head>
	<body>
		<h1>Resume</h1>
        <section>
            <h2>Tony Alicea</h2>
            Coder, UX Designer, and Instructor
            Website: google.com
            Phone: 555-555-1111
            Twitter: @anthonypalicea
        </section>

        <article>
        	<header>
        		<h2>About me</h2>
        	</header>
            Hi! I'm Tony Alicea and I'm happy to have you as a student in my courses. <aside>Don't imitate, understand!</aside>
            <footer>
            	Contact me
            </footer>
        </article>

        <section>
            <h2>Services</h2>
            Web Development
            App Development
            Training
        </section>

        <section>
            <h2>Skills</h2>
            HTML
            Markup your content with semantic HTML.
            CSS
            Layout your content visually for multiple devices.
            JavaScript
            Make your content more interactive, and build web applications.
        </section>

        <section>
            <h2>Work History</h2>
            UX/UI Designer
            XYZ Corp
            3 years
        
            Web Developer
            ABC Corp
            5 years
        
            Carpet Cleaner
            123 Inc.
            2 years
        </section>

        <section>
            <h2>Portfolio</h2>
        </section>

        <section>
            <h2>Testimonials</h2>
            I love Tony's courses!
            Tony's courses helped me get a job.
        </section>

        <section>
            <h2>Mailing Address</h2>
            111 Main St.
            Somewhere, NY 33333
        </section>
	</body>
</html>

```



**Addresses**
The address element must not be used to represent arbitrary addresses (e.g. postal addresses), unless those addresses are in fact the relevant contact information. (The p element is the appropriate element for marking up postal addresses in general.)
The address element must not contain information other than contact information.

```html

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Resume of Tony Alicea</title>
	</head>
	<body>
		<h1>Resume</h1>
        <section>
            <h2>Tony Alicea</h2>
            Coder, UX Designer, and Instructor
            Website: google.com
            Phone: 555-555-1111
            Twitter: @anthonypalicea
        </section>

        <article>
        	<header>
        		<h2>About me</h2>
        	</header>
            Hi! I'm Tony Alicea and I'm happy to have you as a student in my courses. <aside>Don't imitate, understand!</aside>
            <footer>
            	Contact me
            </footer>
        </article>

        <section>
            <h2>Services</h2>
            Web Development
            App Development
            Training
        </section>

        <section>
            <h2>Skills</h2>
            HTML
            Markup your content with semantic HTML.
            CSS
            Layout your content visually for multiple devices.
            JavaScript
            Make your content more interactive, and build web applications.
        </section>

        <section>
            <h2>Work History</h2>
            UX/UI Designer
            XYZ Corp
            3 years
        
            Web Developer
            ABC Corp
            5 years
        
            Carpet Cleaner
            123 Inc.
            2 years
        </section>

        <section>
            <h2>Portfolio</h2>
        </section>

        <section>
            <h2>Testimonials</h2>
            I love Tony's courses!
            Tony's courses helped me get a job.
        </section>

        <section>
            <h2>Mailing Address</h2>
            <address>
            	111 Main St.
            	Somewhere, NY 33333
            </address>
        </section>
	</body>
</html>

```



---

# grouping things



**paragraphs**
A paragraph is typically a run of phrasing content that forms a block of text with one or more sentences that discuss a particular topic, as in typography, but can also be used for more general thematic grouping. For instance, an address is also a paragraph, as is a part of a form, a byline, or a stanza in a poem.



**quotes**
The blockquote element represents a section that is quoted from another source.

```html

<blockquote>
    <p>Lorem, ipsum dolor sit amet, consectetur adipisicing elit. Aperiam facere culpa distinctio earum labore assumenda, velit temporibus, repudiandae ex. Accusantium corrupti deleniti perferendis. Qui nobis quasi recusandae animi! Molestiae, natus.</p>
</blockquote>
<p>- Kelvin Zhao</p>

```



**unordered lists**
The ul element represents a list of items, where the order of the items is not important - that is, where changing the order would not materially change the meaning of the document.

```html

<ul>
    <li>Web Development</li>
    <li>App Development</li>
    <li>Training</li>
</ul>

```



**ordered lists**
The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.

The reversed attribute is a boolean attribute. If present, it indicates that the list is a descending list.
The start attribute, if present, must be a valid integer. It is used to determine the starting value of the list.

```html

<ol reversed>
    <li>
        UX/UI Designer
        XYZ Corp
        3 Years
    </li>
    <li>
        Web Developer
        ABC Corp
        5 Years
    </li>
</ol>

```



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
