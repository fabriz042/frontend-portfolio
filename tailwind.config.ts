import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorOscuro: "var(--colorOscuro)", // Corrección de nomenclatura
        textBlanco: "var(--colorBlanco)",
        textLink: "var(--colorLink)",
        fondoBlanco: "var(--fondoBlanco)",
      },
      fontSize: {
        titlo: "30px",
        grande: "var(--fontSizeGrande)",
      },
      keyframes: {
        slide: {
          "0%": { left: "0%", transform: "scaleX(1)" },
          "49.9%": { transform: "scaleX(1)" },
          "50%": { left: "calc(100% - 180px)", transform: "scaleX(-1)" },
          "100%": { left: "0%", transform: "scaleX(-1)" },
        },
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        slide: "slide 15s linear infinite",
        scroll: "scroll 15s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
