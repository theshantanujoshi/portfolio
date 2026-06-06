# Shantanu Joshi — Digital Portfolio

A high-performance, visually immersive digital portfolio built with React and Vite. This application leans heavily into a brutalist, monochromatic aesthetic, utilizing WebGL and canvas-based shaders to create a tactile, interactive experience that feels more like a cinematic application than a standard website.

---

## Key Features

- **Kinetic Typography:** Custom scrolling marquees and physics-based split-text animations.
- **Cinematic Transitions:** Advanced routing mechanics utilizing a "hyperspeed" warp engine between views.
- **Interactive WebGL Backgrounds:**
  - **LineWaves:** A fluid, mouse-reactive waveform canvas.
  - **Waves:** A monochromatic, fluid simulation shader.
  - **DarkVeil:** An atmospheric, high-contrast WebGL background.
  - **DotGrid:** A responsive, inertia-driven physics grid.
  - **Dither & MagnetLines:** Tactile, retro-inspired footer interactions.
- **Lightsaber Timeline:** A dynamic, scroll-linked SVG masking component used for professional history.
- **Split-Screen Journal:** A responsive, dual-pane layout housing personal thoughts and a massive 40+ image masonry gallery.
- **Dynamic Contact:** Interactive clipboard elements and social links.

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Vanilla CSS (for precise token control)
- **Animation & Physics:** 
  - Framer Motion (Declarative routing & springs)
  - GSAP (Scroll triggers and complex timelines)
  - OGL (Lightweight WebGL layer for shaders)
- **Deployment & Tooling:** ESLint, PostCSS

## Running Locally

To run this application locally, you will need [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository**
   ```bash
   git clone https://github.com/theshantanujoshi/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

*Designed and engineered by Shantanu Joshi. 2026.*
