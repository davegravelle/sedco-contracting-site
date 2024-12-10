/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        "primary-light": "var(--primary-light)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        cta: "var(--cta)",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        title: "",
      },
      textColor: {
        primary: "white",
        primaryHover: 'var(--primary-dark)',
        cta: "var(--primary)",
      },
    },
  },
  plugins: [],
};
