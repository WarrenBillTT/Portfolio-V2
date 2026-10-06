# Warren Bill: Portfolio V2

A minimalist, typography-driven personal portfolio built with **React**, **TypeScript**, and **Vite**. Features a custom cursor, animated hero text, a canvas-based blob background, and a scroll-reveal project showcase.

![Image](https://github.com/WarrenBillTT/Portfolio-V2/blob/main/preview.png)

🔗 **Live Demo:** https://portfolio-warrenbill.vercel.app/

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)

---

## About the Project

This is the second iteration of my personal portfolio, redesigned with a cleaner, editorial-style aesthetic. It includes:

- **Custom Cursor**: a dot-and-ring cursor that follows the mouse with smooth easing and reacts to hoverable elements
- **Animated Hero**: cycling role/status words (`BUILDING.`, `CRAFTING.`, `SHIPPING.`, etc.) with a live clock and an interactive canvas "blob" background
- **Scroll Reveal**: sections and elements animate into view on scroll via a custom `useReveal` hook
- **Project Showcase**: a grid of project cards with tech stack tags and status badges (live / work-in-progress)
- **Contact Section**: quick links to email, GitHub, LinkedIn, and resume
- **Live Footer Clock**: real-time clock in the footer alongside role and copyright info

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS 3, custom CSS variables |
| Fonts | Playfair Display, Space Grotesk, DM Mono (via Fontsource) |
| Tooling | ESLint, typescript-eslint |

## Project Structure

```
Portofolio-V2-main/
├── public/
│   ├── icons.svg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Background.tsx      # canvas blob background
│   │   └── Contact.tsx
│   ├── data/
│   │   └── projects.ts          # project list data
│   ├── hooks/
│   │   └── useReveal.ts         # scroll-reveal animation hook
│   ├── App.tsx                  # custom cursor, footer, page composition
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/WarrenBillTT/Portofolio-V2.git
   cd Portofolio-V2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview the production build**
   ```bash
   npm run preview
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server with HMR |
| `npm run build` | Type-checks and builds the project for production |
| `npm run lint` | Runs ESLint |
| `npm run preview` | Previews the production build locally |

## Notes

The project cards in `src/data/projects.ts` and the contact links in `src/components/Contact.tsx` currently use placeholder content (e.g. `#` links, a placeholder email). Update these with real project links, your email, GitHub, LinkedIn, and resume before deploying.

## License

This project was built for personal use. Feel free to use it as a reference, but please don't copy it identically for your own portfolio.
