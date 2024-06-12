
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
