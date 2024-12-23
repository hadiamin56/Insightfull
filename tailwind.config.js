/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "alert-color": "var(--alert-color)",
        "danger-color": "var(--danger-color)",
        "dark-background-color": "var(--dark-background-color)",
        "disabled-element-color": "var(--disabled-element-color)",
        "hover-color": "var(--hover-color)",
        "light-background-color": "var(--light-background-color)",
        "light-text-color": "var(--light-text-color)",
        "muted-color": "var(--muted-color)",
        "primary-color": "var(--primary-color)",
        "second-text-color": "var(--second-text-color)",
        "secondary-color-1": "var(--secondary-color-1)",
        "secondary-color-2": "var(--secondary-color-2)",
        "success-color": "var(--success-color)",
        "text-color": "var(--text-color)",
      },
      fontFamily: {
        "btn-text": "var(--btn-text-font-family)",
        "h-1": "var(--h-1-font-family)",
        "h-2": "var(--h-2-font-family)",
        "h-3": "var(--h-3-font-family)",
        "h-4": "var(--h-4-font-family)",
        "h-5": "var(--h-5-font-family)",
        "h-6": "var(--h-6-font-family)",
        link: "var(--link-font-family)",
        list: "var(--list-font-family)",
        "mobile-menu": "var(--mobile-menu-font-family)",
        paragraph: "var(--paragraph-font-family)",
      },
      boxShadow: {
        dramatic: "var(--dramatic)",
        "light-dropshadow": "var(--light-dropshadow)",
        SHADOW: "var(--SHADOW)",
        "text-shadow": "var(--text-shadow)",
      },
      animation: {
        marquee: 'marquee 15s linear infinite', // Custom marquee animation duration
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' }, // Start off-screen to the right
          '100%': { transform: 'translateX(-100%)' }, // End off-screen to the left
        },
      },
    },
  },
  plugins: [],
};
