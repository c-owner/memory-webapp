/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        screens: {
            ...defaultTheme.screens,
            xs: { max: '465px' }
        },
        extend: {
            screens: {
                ...defaultTheme,
                xs: { max: '465px' }
            }
        }
    },
    darkMode: ['media', '.apple-dark'],
    plugins: [require('@tailwindcss/typography')]
};
