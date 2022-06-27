/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Roboto Flex", "sans-serif"],
            serif: ["Roboto Slab", "serif"],
        },
        extend: {
            keyframes: {
                fadein: {
                    "0%": {
                        transform: "translate(0%, 50%)",
                    },
                    "100%": {
                        transform: "translate(0%, 0%)",
                    },
                },
                fadeintop: {
                    "0%": {
                        opacity: "0%",
                        transform: "translate(0%, -50%)",
                    },
                    "80%": {
                        opacity: "100%",
                    },
                    "100%": {
                        opacity: "0%",
                        transform: "translate(0%, 0%)",
                    },
                },
            },
            animation: {
                fadein: "fadein 200ms linear both",
                fadeintop: "fadeintop 1.5s ease infinite",
            },
        },
    },
    plugins: [],
};
