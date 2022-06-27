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
                        transform: "translate(0%, -25%)",
                    },
                    "90%": {
                        opacity: "100%",
                    },
                    "100%": {
                        opacity: "0%",
                        transform: "translate(0%, 0%)",
                    },
                },
                shake: {
                    "0%": {
                        transform: "translate(0.1rem, 0.1rem)",
                    },
                    "25%": {
                        transform: "translate(-0.1rem, 0.1rem)",
                    },
                    "50%": {
                        transform: "translate(0.1rem, -0.1rem)",
                    },
                    "75%": {
                        transform: "translate(-0.1rem, -0.1rem)",
                    },
                    "100%": {
                        transform: "translate(0.1rem, 0.1rem)",
                    },
                },
            },
            animation: {
                fadein: "fadein 200ms linear both",
                fadeintop: "fadeintop 2s ease infinite",
                shake: "shake 100ms linear infinite",
            },
        },
    },
    plugins: [],
};
