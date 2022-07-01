module.exports = {
    "tabWidth": 4,
    "useTabs": false,
    "importOrder": ["^components/(.*)$", "^[./]"],
    "importOrderSeparation": true,
    "importOrderSortSpecifiers": true,
    plugins: [require("prettier-plugin-tailwindcss")],
};
