
# some interesting css effects

---

<!-- grain effect -->

```css

main::before {
	animation: grain 8s steps(10) infinite;
	background-image: url(../img/noise.png);
	content: '';
	height: 300%;
	left: -50%;
	opacity: 0.6;
	position: fixed;
	top: -100%;
	width: 300%;
}

@keyframes grain {
	0%, 100% { transform:translate(0, 0); }
	10% { transform:translate(-5%, -10%); }
	20% { transform:translate(-15%, 5%); }
	30% { transform:translate(7%, -25%); }
	40% { transform:translate(-5%, 25%); }
	50% { transform:translate(-15%, 10%); }
	60% { transform:translate(15%, 0%); }
	70% { transform:translate(0%, 15%); }
	80% { transform:translate(3%, 35%); }
	90% { transform:translate(-10%, 10%); }
}

```



---

<!-- b-roll effect -->

```css

@keyframes marquee {
    0% {
        transform: translateX(100%);
    }
    to {
        transform: translateX(-100%);
    }
}

@keyframes marquee2 {
    0% {
        transform: translateX(0);
    }
    to {
        transform: translateX(-200%);
    }
}

.partners-section .scrolling-container {
    overflow: hidden;
    white-space: nowrap;
}

.partners-section .partner-container {
    animation: marquee 90s linear infinite;
    animation-delay: -45s;
}
.partners-section .dupe-partner-container {
    animation: marquee2 90s linear infinite;
    animation-delay: 0;
}

```



---

<!-- text from top down -->

```css

.vertical-rl {
	writing-mode: vertical-rl;
}

;```



---

<!-- hexagon clipmask -->

```html

<svg viewBox="0 0 1 1" width="0" height="0"><defs><clipPath clipPathUnits="objectBoundingBox" id="hex-shape"><path d="M.966.37A1.73 1.73 0 0 0 .84.135L.823.112A.225.225 0 0 0 .655.008L.627.005a1.495 1.495 0 0 0-.254 0L.345.008a.225.225 0 0 0-.168.104L.16.135A1.73 1.73 0 0 0 .034.37L.022.396a.256.256 0 0 0 0 .208L.034.63C.07.712.113.79.16.865l.016.023c.038.06.1.098.168.104l.028.003c.084.007.17.007.254 0L.655.992A.225.225 0 0 0 .823.888L.84.864A1.73 1.73 0 0 0 .966.63L.978.603a.256.256 0 0 0 0-.207L.966.37Z"></path></clipPath></defs></svg>

```

```css

.image {
	clip-path: url(#hex-shape);
}

```

---
