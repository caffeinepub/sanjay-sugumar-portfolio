# Sanjay Sugumar Portfolio – Ultra-Premium Redesign

## Current State
The portfolio is a clean lavender site with a static workspace hero image, card-based sections, and typing animation. It has sections for Summary, Skills, Projects, Education, Additional Info, and Contact. An ATS resume page exists at `/resume`.

## Requested Changes (Diff)

### Add
- Glassmorphism UI cards (backdrop-blur + transparency + soft borders)
- Mouse parallax effect on hero section
- Scroll-triggered fade-in animations for all sections
- 3D card hover lift effect (perspective transform)
- Dark mode toggle with smooth transition
- Floating monitor animation in hero (subtle CSS float)
- Glow/shimmer hover effect on buttons
- Blinking cursor in typing animation loop
- Circular profile image displayed on the monitor screen
- Depth blur effect on background for premium feel
- LinkedIn contact link
- "View My Work" button scrolling to projects
- "Download Resume" button linked to PDF

### Modify
- Hero: Replace static image with SVG/CSS 3D desk scene featuring monitor + keyboard + mouse. Monitor screen shows circular profile photo + typing animation.
- All cards: Apply glassmorphism (bg-white/10, backdrop-blur, border-white/20)
- Navbar: Add dark mode toggle button
- Buttons: Add glow animation on hover
- Typing text: Change to "Hi and hello! I'm Sanjay Sugumar — glad you're here."
- Hero title/subtitle: Remove from above monitor, show inline on monitor screen

### Remove
- Plain opaque card backgrounds
- Static workspace image in hero

## Implementation Plan
1. Redesign `index.css` with glassmorphism tokens, dark mode CSS variables, float/glow keyframes
2. Rewrite `App.tsx` with:
   - Dark mode state + toggle in Navbar
   - Hero section: SVG/CSS 3D desk scene, floating animation, mouse parallax via JS
   - Monitor screen: circular profile photo + typing loop
   - All sections: IntersectionObserver fade-in on scroll
   - Glassmorphism SectionCard with 3D hover lift
   - Buttons with glow animation
   - Updated contact with LinkedIn
3. Generate new 3D workspace hero image
