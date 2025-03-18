/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Teal/turquoise theme
          primary: "#0e7490",        // Teal
          secondary: "#10b981",      // Green
          background: "#f0fdfa",     // Light teal background
          foreground: "#0f172a",     // Dark text
          muted: "#94a3b8",          // Muted text
          border: "#cbd5e1",         // Border color
          card: "#ffffff",           // Card background
          "card-foreground": "#0f172a", // Card text
        },
        borderRadius: {
          lg: "0.5rem",
          md: "0.375rem",
          sm: "0.25rem",
        },
      },
    },
    plugins: [],
  }