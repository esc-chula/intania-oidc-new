/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    tabWidth: 4,
    plugins: ["prettier-plugin-tailwindcss"],
    endOfLine: "lf",
    singleQuote: false,
    trailingComma: "all",
    useTabs: false,
    overrides: [
        {
            files: ["**/*.yaml", "**/*.yml"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};

export default config;
