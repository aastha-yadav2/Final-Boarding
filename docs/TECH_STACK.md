# Technology Stack: FINAL BOARDING

---

## 1. Core Runtime & Frameworks

| Technology | Version | Purpose in Application |
| :--- | :--- | :--- |
| **React** | `^19.0.0` | Declarative component UI model, custom hooks, and concurrent DOM rendering. |
| **TypeScript** | `^5.7.3` | Strict static typing, type safety, interface contracts, and build-time verification. |
| **Vite** | `^6.2.0` | Ultra-fast HMR development server, optimized ESM bundling, and tree-shaking. |
| **Tailwind CSS** | `^4.0.9` | Next-generation utility styling engine powered by `@tailwindcss/vite` and `@theme` tokens. |

---

## 2. Supporting Libraries & APIs

| Library / API | Version | Purpose |
| :--- | :--- | :--- |
| **Lucide React** | `^1.16.0` | Clean, accessible SVG flight and control icons (`PlaneTakeoff`, `Clock`, `Radio`, etc.). |
| **Canvas Confetti** | `^1.9.4` | Physics-based particle celebration effect upon milestone gate completion. |
| **Web Audio API** | Native Browser | Zero-latency synthesis of airport announcement chimes and mechanical flap clicks. |
| **Browser LocalStorage** | Native Browser | Offline-first client-side data persistence with JSON serialization guards. |

---

## 3. Tooling & Development Infrastructure

- **Bundler Plugin:** `@vitejs/plugin-react` (Fast Refresh and JSX transform).
- **CSS Plugin:** `@tailwindcss/vite` (Zero-config CSS scanning and instant compilation).
- **Type Checking:** `tsc -b` (TypeScript Project References build mode with `noUnusedLocals` and `strict: true`).
- **Typography:** Google Fonts (`Plus Jakarta Sans` for clean UI readability, `Chivo Mono` for digital split-flap flight numbers, `Syne` for bold terminal branding).
