# Sanjay Sugumar Portfolio

## Current State
Existing portfolio with lavender background, cinematic beach night scene, glassmorphism UI, multiple hero variants, and resume integration.

## Requested Changes (Diff)

### Add
- Centered desktop monitor UI in hero with white body, #f3e8ff screen, purple text, JS typing animation (letter-by-letter, blinking cursor, loop)
- Projects section: 2 cards (Personal Portfolio Website, Basic Python Programs) each with View on GitHub button and 'View all on GitHub →' link
- Education section: 2 entries (BCA at A.M. Jain College, HSC at Krishnaswamy Higher Secondary School)
- Contact section: LinkedIn, GitHub, Email in that order
- Footer: © 2026 Sanjay Sugumar · Built with ❤️

### Modify
- Full redesign: flat lavender (#E6E6FA) background, no gradients
- Hero: name 'Sanjay Sugumar', subtitle 'Python Full Stack Developer & Web Application Builder'
- Hero buttons: View Resume + Download Resume only (no LinkedIn/GitHub in hero)
- All sections use white boxes, black text, soft shadows, rounded corners
- Clean sans-serif font throughout

### Remove
- Beach night scene, glassmorphism effects, dark theme, all previous hero variants
- LinkedIn/GitHub buttons from hero

## Implementation Plan
1. Replace App.tsx with clean single-page layout
2. Lavender (#E6E6FA) body background, no gradients
3. Fixed navbar: Sanjay Sugumar | Resume | Projects | Education | Contact
4. Hero: monitor UI (white body, #f3e8ff screen, purple typing text), name, subtitle, View Resume + Download Resume buttons
5. Projects section: 2 white cards with tags and View on GitHub buttons, 'View all on GitHub →' link
6. Education section: 2 white cards
7. Contact section: LinkedIn, GitHub, Email links
8. Footer with copyright
9. Hover effects on cards and buttons
10. Responsive layout
