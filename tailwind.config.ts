
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Medical system colors with new palette
        medical: {
          primary: '#003366',   // Dark Navy Blue
          secondary: '#30CFCF', // Teal Green
          accent: '#FFFFFF',    // White
          background: '#003366',
          foreground: '#FFFFFF',
          text: '#FFFFFF',
          border: '#30CFCF',
          'soft-background': 'rgba(48, 207, 207, 0.1)', // Soft teal background
        },
        // Maintain existing color structure with new medical colors
        background: 'hsl(210 100% 20%)',   // Dark Navy Blue
        foreground: 'hsl(0 0% 100%)',      // White
        primary: {
          DEFAULT: 'hsl(160 100% 40%)',    // Teal Green
          foreground: 'hsl(0 0% 100%)'     // White
        },
        secondary: {
          DEFAULT: 'hsl(210 100% 20%)',    // Dark Navy Blue
          foreground: 'hsl(0 0% 100%)'     // White
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem"
      },
      boxShadow: {
        'medical': '0 4px 6px rgba(48, 207, 207, 0.2)',  // Teal green shadow
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FFFFFF',
            a: {
              color: '#30CFCF',
              '&:hover': {
                color: '#FFFFFF',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;

