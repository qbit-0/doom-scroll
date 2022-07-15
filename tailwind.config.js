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
                slidein: {
                    "0%": {
                        transform: "translate(0%, -100%)",
                        visibility: "hidden",
                    },
                    "100%": {
                        transform: "translate(0%, 0%)",
                        visibility: "visible",
                    },
                },
                slideout: {
                    "0%": {
                        transform: "translate(0%, 0%)",
                        visibility: "visible",
                    },
                    "100%": {
                        transform: "translate(0%, -100%)",
                        visibility: "hidden",
                    },
                },
                scrollfade: {
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
                slidein: "slidein 200ms ease forwards",
                slideout: "slideout 200ms ease forwards",
                shake: "shake 100ms linear infinite",
                scrollfade: "scrollfade 2s ease infinite",
            },
        },
    },
    plugins: [],
};
