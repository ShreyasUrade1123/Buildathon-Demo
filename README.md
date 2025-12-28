# MegaLLM Buildathon 2025

A high-performance, visually immersive frontend experience for the MegaLLM Buildathon, built with React, Three.js, and Tailwind CSS.

## 🚀 Features

### Immersive Visuals
- **Fluid Background**: A highly optimized GPGPU fluid simulation running in the background (`FluidBackground.jsx`).
- **Splash Cursor**: An interactive WebGL mouse trail effect that reacts to user input with a vibrant red/orange dye simulation.
- **Cinematic Hero**: Custom `Hero` component with Framer Motion entrance animations and "glitch" text effects.

### Interactive 3D Elements
- **Physics-Based Success Card**: Upon registration, a 3D "Participant Pass" drops from the top of the screen using Rapier Physics (`@react-three/rapier`).
    - The card features a **Double-Sided** custom texture.
    - Reacts to mouse interaction (drag and drop).
- **React Three Fiber**: All 3D elements are rendered performantly using `react-three/fiber` and `@react-three/drei`.

### Design & Typography
- **Premium aesthetic**: Dark mode default with gold/beige accents (`#e8cfa8`).
- **Sophisticated Typography**: 
    - **Header**: *Space Grotesk* for technical modernity.
    - **Hero**: *Playfair Display Italic* for elegant contrast.
    - **Body/General**: *Inter* for readability.
    - **Register Page**: *Neue Haas Grotesk* for clean, Swiss-style headers.

### Performance Optimized ⚡
- **Smart DPR Clamping**: Canvas pixel ratios are clamped to a maximum of `2` to ensure 60fps performance on High-DPI/Retina displays (4K+).
- **Resolution Tuning**: Fluid simulation dye resolutions are optimized (1024px) to balance visual fidelity with GPU memory bandwidth.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D / WebGL**: 
    - [Three.js](https://threejs.org/)
    - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
    - [Drei](https://github.com/pmndrs/drei)
    - [Rapier Physics](https://rapier.rs/) (`@react-three/rapier`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: `react-router-dom`

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/megallm-buildathon.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

- `src/components/`
    - `FluidBackground.jsx`: The background liquid simulation.
    - `SplashCursor.jsx`: The interactive mouse trail.
    - `SuccessCard.jsx`: The 3D physics card component.
    - `Hero.jsx`: The main landing page hero section.
    - `Header.jsx` / `Footer.jsx`: Global navigation and footer.
- `src/pages/`
    - `Home.jsx`: Landing page.
    - `Register.jsx`: Registration form.
    - `Success.jsx`: Post-registration success page with the 3D card drop.
- `public/Fonts/`: Custom font files (Neue Haas Grotesk, etc.).

## 🎨 Implementation Details

### Performance Strategy
To prevent lag on deployment:
- Both `FluidBackground` and `SplashCursor` run on separate optimized logic.
- We explicitly use `dpr={[1, 2]}` on the `Canvas` to prevent the simulations from rendering at excessive resolutions on mobile/high-end screens.
- `useEffect` hooks manage WebGL context creation and cleanup to prevent memory leaks.
