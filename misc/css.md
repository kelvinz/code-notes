
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
