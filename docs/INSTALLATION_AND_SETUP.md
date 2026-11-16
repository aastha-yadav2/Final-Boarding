# Installation & Setup Guide: FINAL BOARDING

---

## 1. Prerequisites

Before installing FINAL BOARDING, verify your environment meets these requirements:

- **Node.js:** v18.0.0 or higher (Tested and verified on Node.js v24.13.0)
- **Package Manager:** npm v9.0.0+ (or pnpm / yarn)
- **Web Browser:** Modern evergreen browser with Web Audio API support (Chrome, Firefox, Safari, Edge)

---

## 2. Quickstart Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/aastha-yadav2/Final-Boarding.git
   cd Final-Boarding
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Launch the Local Development Server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## 3. Available Scripts

The following scripts are defined in `package.json`:

```bash
# Start Vite development server with Hot Module Replacement (HMR)
npm run dev

# Run TypeScript type-checker and compile production bundle to dist/
npm run build

# Preview the local production build
npm run preview
```

---

## 4. Environment Variables

> **Note:** FINAL BOARDING v1.0.0 is an offline-first, client-side application. It **does not require any `.env` file** or secret keys to function out of the box. All configuration is managed via the in-app **Avionics Config** settings and persisted to browser `localStorage`.
