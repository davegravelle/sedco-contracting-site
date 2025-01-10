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
        "cta-hover": "var(--cta-hover)",
      },
      border: {
        primary: "var(--primary)",
      },
      fontFamily: {
        title: ['var(--font-title)', 'Felix'],
        serif: ["Merriweather", "serif"],
      },
      textColor: {
        primary: 'var(--primary)',
        primaryHover: 'var(--primary-dark)',
        cta: "var(--primary)",
      },
    },
  },
  plugins: [],
};
