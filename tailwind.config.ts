import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', ...fontFamily.sans],
        body: ['var(--font-body)', ...fontFamily.mono]
      },
      colors: {
        shark: {
          50: "#F4F4F4",
          100: "#E9E9E9",
          200: "#C8C8C8",
          300: "#A7A7A7",
          400: "#666666",
          500: "#242424",
          600: "#202020",
          700: "#161616",
          800: "#101010",
          900: "#0B0B0B",
        },
        "dark-fern": {
          50: "#F3F6F3",
          100: "#E6ECE6",
          200: "#C1D0C1",
          300: "#9BB39B",
          400: "#517B51",
          500: "#064206",
          600: "#053B05",
          700: "#042804",
          800: "#031E03",
          900: "#021402",
        },

        asparagus: {
          50: "#F8FAF8",
          100: "#F2F6F0",
          200: "#DEE8DA",
          300: "#C9DBC4",
          400: "#A1BF98",
          500: "#79A46C",
          600: "#6D9461",
          700: "#496241",
          800: "#364A31",
          900: "#243120",
        },
        "well-read": {
          50: "#FBF5F5",
          100: "#F7EAEB",
          200: "#EBCCCC",
          300: "#DFADAD",
          400: "#C86F70",
          500: "#B03133",
          600: "#9E2C2E",
          700: "#6A1D1F",
          800: "#4F1617",
          900: "#350F0F",
        },

        geraldine: {
          50: "#FEF9F9",
          100: "#FEF3F4",
          200: "#FCE1E2",
          300: "#F9CFD1",
          400: "#F5AAAF",
          500: "#F1868C",
          600: "#D9797E",
          700: "#915054",
          800: "#6C3C3F",
          900: "#48282A",
        },
        lonestar: {
          50: "#F8F3F3",
          100: "#F1E6E6",
          200: "#DCC1C2",
          300: "#C69B9D",
          400: "#9C5053",
          500: "#710509",
          600: "#660508",
          700: "#440305",
          800: "#330204",
          900: "#220203",
        },
        "outer-space": {
          50: "#F4F5F5",
          100: "#E9EBEC",
          200: "#C8CCCE",
          300: "#A7AEB1",
          400: "#667177",
          500: "#24343C",
          600: "#202F36",
          700: "#161F24",
          800: "#10171B",
          900: "#0B1012",
        },
        "picton-blue": {
          50: "#F7FAFD",
          100: "#F0F6FA",
          200: "#D8E8F4",
          300: "#C1D9ED",
          400: "#93BDDF",
          500: "#64A1D1",
          600: "#5A91BC",
          700: "#3C617D",
          800: "#2D485E",
          900: "#1E303F",
        },
        "pattens-blue": {
          50: "#FDFEFE",
          100: "#FCFDFE",
          200: "#F6FBFC",
          300: "#F1F9FB",
          400: "#E7F4F7",
          500: "#DCEFF4",
          600: "#C6D7DC",
          700: "#848F92",
          800: "#636C6E",
          900: "#424849",
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
