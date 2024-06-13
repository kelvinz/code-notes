
# define:vars
define:vars={...} can pass server-side variables from your component frontmatter into the client <script> or <style> tags.
Any JSON-serializable frontmatter variable is supported, including props passed to your component through Astro.props.
Values are serialized with JSON.stringify().

```
---
const foregroundColor = "rgb(221 243 228)";
const backgroundColor = "rgb(24 121 78)";
const message = "Astro is awesome!";
---
<style define:vars={{ textColor: foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--textColor);
  }
</style>

<script define:vars={{ message }}>
  alert(message);
</script>
```

---

# Pass frontmatter variables to scripts
In Astro components, the code in the frontmatter between the --- fences runs on the server and is not available in the browser.
To send variables from the server to the client, we need a way to store our variables and then read them when JavaScript runs in the browser.
One way to do this is to use data-* attributes to store the value of variables in your HTML output.
Scripts, including custom elements, can then read these attributes using an element’s dataset property once your HTML loads in the browser.
In this example component, a message prop is stored in a data-message attribute, so the custom element can read this.dataset.message and get the value of the prop in the browser.

```
---
const { message = 'Welcome, world!' } = Astro.props;
---

<!-- Store the message prop as a data attribute. -->
<astro-greet data-message={message}>
  <button>Say hi!</button>
</astro-greet>

<script>
  class AstroGreet extends HTMLElement {
    constructor() {
      super();

      // Read the message from the data attribute.
      const message = this.dataset.message;
      const button = this.querySelector('button');
      button.addEventListener('click', () => {
        alert(message);
      });
    }
  }

  customElements.define('astro-greet', AstroGreet);
</script>
```
