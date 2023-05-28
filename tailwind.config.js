/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#E58D27",
                secondary: {
                    100: "#1E1F25",
                    900: "#131517",
                },
            },
            screens: {
                'sr-only': {'raw': '(screen-reader-only)'},
              },
        },
    },
    plugins: [],
}