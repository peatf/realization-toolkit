# Component Specifications

This document provides detailed specifications for each component in the Realization Toolkit website, including HTML structure, CSS styling, and JavaScript animations.

## Table of Contents

1. [The Opening: Tuning In](#the-opening-tuning-in)
2. [The Quiz: Attune to Your Rhythm](#the-quiz-attune-to-your-rhythm)
3. [Membership Benefits](#membership-benefits)
4. [Testimonial Carousel](#testimonial-carousel)
5. [Tool Showcases](#tool-showcases)
6. [Pricing](#pricing)

---

## The Opening: Tuning In

### Component Overview
The opening section creates an immersive first impression with a ripple text effect, fracturing screen transition, and radial menu. It sets the tone for the entire website experience.

### HTML Structure

```jsx
<section className="min-h-screen flex flex-col items-center justify-center relative">
  {/* Background elements */}
  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-violet-900"></div>
  <div className="absolute inset-0 opacity-20">
    {/* Decorative orbs */}
  </div>
  
  {/* Main content */}
  <div className="container mx-auto px-4 text-center z-10">
    <div className="mb-6">
      <span className="font-mono text-violet-300 tracking-widest uppercase text-sm">Begin Your Journey</span>
    </div>
    
    <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-8 leading-tight">
      <span className="block">The Realization</span>
      <span ref={rippleTextRef} className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
        Toolkit
      </span>
    </h1>
    
    <p className="max-w-2xl mx-auto text-violet-100 text-lg mb-12">
      Attune to your rhythm and discover tools for personal transformation. 
      Our immersive experience guides you through a digital ritual of self-discovery.
    </p>
    
    {/* Radial Menu */}
    <div className="relative w-64 h-64 mx-auto mt-12">
      {/* Center button */}
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full">
        Begin
      </button>
      
      {/* Orbit items */}
      {/* Mapped from array of options */}
    </div>
  </div>
  
  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
    {/* Scroll indicator animation */}
  </div>
</section>
```

### CSS Styling

- Background gradient from indigo to violet
- Custom ripple effect for text
- Radial menu with orbiting elements
- Floating orbs with blur effect for depth
- Translucent elements with backdrop blur

### JavaScript Animations

#### Ripple Text Effect
```javascript
// Create ripple text effect by splitting into individual spans
const createRippleTextEffect = (element) => {
  if (!element) return;
  
  const text = element.innerText;
  element.innerHTML = '';
  
  // Create spans for each character
  Array.from(text).forEach((char) => {
    const charSpan = document.createElement('span');
    charSpan.className = 'inline-block transition-all duration-300 hover:scale-110';
    charSpan.innerText = char === ' ' ? '\u00A0' : char;
    
    // Add event listener for ripple effect
    charSpan.addEventListener('mouseenter', (e) => {
      const target = e.currentTarget;
      createRippleOnElement(target);
    });
    
    element.appendChild(charSpan);
  });
};

// Create ripple animation on element
const createRippleOnElement = (element) => {
  const ripple = document.createElement('span');
  ripple.className = 'absolute w-full h-full bg-white/20 rounded-full scale-0 origin-center';
  
  element.style.position = 'relative';
  element.appendChild(ripple);
  
  gsap.to(ripple, {
    scale: 3,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => {
      ripple.remove();
    }
  });
};
```

#### Radial Menu Animation
```javascript
// Position orbiting elements in a circle
const initRadialMenu = () => {
  const options = ['Discover', 'Learn', 'Connect', 'Transform'];
  const radius = 100;
  
  options.forEach((text, index) => {
    const angle = (index * Math.PI * 2) / options.length;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Create orbit item
    const item = document.createElement('button');
    item.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full';
    item.textContent = text;
    item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    
    // Add to orbit container
    orbitContainer.appendChild(item);
    
    // Animate entrance
    gsap.from(item, {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      delay: 0.8 + index * 0.1,
      ease: "back.out(1.7)"
    });
  });
};
```

#### Screen Fracture Transition
```javascript
// Create screen fracture effect for transitions
const createScreenFractureEffect = (container, onComplete) => {
  const numPieces = 12;
  const fractureContainer = document.createElement('div');
  fractureContainer.className = 'absolute inset-0 z-50 pointer-events-none';
  document.body.appendChild(fractureContainer);
  
  // Take screenshot using html2canvas
  html2canvas(container).then(canvas => {
    const width = canvas.width;
    const height = canvas.height;
    
    // Create fracture pieces
    for (let i = 0; i < numPieces; i++) {
      const piece = document.createElement('div');
      // Position and clip piece
      // ...
      
      // Animate pieces flying off
      gsap.to(piece, {
        x: gsap.utils.random(-500, 500),
        y: gsap.utils.random(-500, 500),
        rotation: gsap.utils.random(-180, 180),
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: i * 0.05
      });
    }
    
    // Call completion callback
    setTimeout(() => {
      fractureContainer.remove();
      if (onComplete) onComplete();
    }, 2000);
  });
};
```

---

## The Quiz: Attune to Your Rhythm

### Component Overview
The Quiz section features a "Frequency Discovery Console" that helps users discover their unique resonance pattern. It includes an interactive quiz interface with animated entrance and transitions.

### HTML Structure

```jsx
<section className="py-20 md:py-32 bg-gradient-to-b from-violet-900 to-indigo-900 relative">
  {/* Background elements */}
  <div className="absolute inset-0">
    {/* Background patterns and decorative elements */}
  </div>
  
  <div className="container mx-auto px-4 relative z-10">
    {/* Section header */}
    <div className="max-w-3xl mx-auto text-center mb-16">
      <span className="font-mono text-violet-300 tracking-widest uppercase text-sm block mb-4">
        Attune to Your Rhythm
      </span>
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
        Frequency Discovery Console
      </h2>
      <p className="text-violet-200 text-lg">
        Take our interactive quiz to discover your unique resonance pattern
        and receive personalized recommendations.
      </p>
    </div>
    
    {/* Quiz interface */}
    <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
      {/* Quiz content - steps, questions, progress */}
      <div className="quiz-container">
        {/* Dynamic quiz content */}
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        <button className="quiz-button-prev">Previous</button>
        <button className="quiz-button-next">Next</button>
      </div>
    </div>
  </div>
</section>
```

### CSS Styling

- Glass morphism effect for quiz container
- Progress indicators with gradient fills
- Input styling with custom focus states
- Transition effects between questions
- Subtle hover animations for interactive elements

### JavaScript Animations

#### Quiz Container Entrance Animation
```javascript
const animateQuizEntrance = () => {
  const tl = gsap.timeline();
  
  tl.from('.quiz-container', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
  
  // Stagger entrance of quiz elements
  tl.from('.quiz-item', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out"
