/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
    plugins: [require("daisyui")],
    darkTheme: "chainwarz",
    // DaisyUI theme colors
    daisyui: {
        themes: [
            {
                chainwarz: {
                    primary: "#000000",
                    "primary-content": "#ffffff",
                    secondary: "#FF6644",
                    "secondary-content": "#212638",
                    accent: "#93BBFB",
                    "accent-content": "#212638",
                    neutral: "#f3f3f3",
                    "neutral-content": "#212638",
                    "base-100": "#070123",
                    "base-200": "#f1f1f1",
                    "base-300": "#d0d0d0",
                    "base-content": "#212638",
                    info: "#93BBFB",
                    success: "#34EEB6",
                    warning: "#FFCF72",
                    error: "#FF8863",
                    gray: "#a4a9c7",
                    white: "#fff",
                    black: "#070123",
                    blue: "#3b57ee",
                    "beige-light": "#fbefd6",
                    cyan: "#35d2e2",
                    lilac: "#752ce8",
                    "moderate-pink": "#ec8481",
                    whitesmoke: "#f9f9f9",
                    mediumslateblue: {
                        100: "rgba(59, 87, 238, 0.5)",
                        200: "rgba(59, 87, 238, 0.2)",
                        300: "rgba(59, 87, 238, 0.24)",
                        400: "rgba(59, 87, 238, 0.16)",
                    },
                    lightsteelblue: {
                        100: "rgba(164, 169, 199, 0.32)",
                        200: "rgba(164, 169, 199, 0.24)",
                        300: "rgba(164, 169, 199, 0.16)",
                    },
                    midnightblue: { 100: "#2e226c", 200: "#1d144b", 300: "#11124c" },
                    blueviolet: { 100: "#9a5aff", 200: "rgba(117, 44, 232, 0.16)" },
                    darkturquoise: "rgba(53, 210, 226, 0.24)",
                    "beige-light": "#fbefd6",
                    lavender: "#e1e4f5",
                    steelblue: "rgba(110, 127, 173, 0.25)",
                    darkslateblue: "#333a64",
                    slateblue: "#2a43c7",
                    tomato: "#ff3d3d",

                    "--rounded-btn": "9999rem",

                    ".tooltip": {
                        "--tooltip-tail": "6px",
                    },
                },
            },
        ],
    },
    theme: {
        extend: {
            colors: {
                gray: "#a4a9c7",
                white: "#fff",
                black: "#070123",
                blue: "#3b57ee",
                "beige-light": "#fbefd6",
                cyan: "#35d2e2",
                lilac: "#752ce8",
                "moderate-pink": "#ec8481",
                whitesmoke: "#f9f9f9",
                mediumslateblue: {
                    50: "rgba(59, 87, 238, 0.1)",
                    100: "rgba(59, 87, 238, 0.5)",
                    200: "rgba(59, 87, 238, 0.2)",
                    300: "rgba(59, 87, 238, 0.24)",
                    400: "rgba(59, 87, 238, 0.16)",
                },
                lightsteelblue: {
                    100: "rgba(164, 169, 199, 0.32)",
                    200: "rgba(164, 169, 199, 0.24)",
                    300: "rgba(164, 169, 199, 0.16)",
                },
                midnightblue: { 100: "#2e226c", 200: "#1d144b", 300: "#11124c" },
                blueviolet: { 100: "#9a5aff", 200: "rgba(117, 44, 232, 0.16)" },
                darkturquoise: "rgba(53, 210, 226, 0.24)",
                "beige-light": "#fbefd6",
                lavender: "#e1e4f5",
                steelblue: "rgba(110, 127, 173, 0.25)",
                darkslateblue: "#333a64",
                slateblue: "#2a43c7",
                tomato: "#ff3d3d",
                info: "#93BBFB",
                success: "#86EFAC",
                warning: "#FFCF72",
                error: "#FF8863",
                neutral: "#f3f3f3",
                "neutral-content": "#212638",
                "base-100": "#ffffff",
                "base-200": "#f1f1f1",
                "base-300": "#d0d0d0",
                "base-content": "#212638",

                "--rounded-btn": "9999rem",

                ".tooltip": {
                    "--tooltip-tail": "6px",
                },
            },
            fontFamily: {
                azonix: "Azonix",
                "digital-7-mono": "'Digital-7 Mono'",
                // orbitron: "Orbitron",
                orbitron: ["var(--font-orbitron)"],
            },
            keyframes: {
                grow: {
                    "0%": {
                        width: "0%",
                    },
                    "100%": {
                        width: "100%",
                    },
                },
            },

            animation: {
                grow: "grow 5s linear infinite",
                "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                zoom: "zoom 1s ease infinite",
            },
            borderRadius: {
                "8xs": "5px",
                "13xl": "32px",
                "xl-5": "20.5px",
                "10xs-7": "2.7px",
                "21xl": "40px",
                "141xl": "160px",
                "4xs-9": "8.9px",
                "12xs-5": "0.5px",
                "6xs-9": "6.9px",
            },
            screens: {
                "2xs": "376px",
                // => @media (min-width: 360px) { ... }

                xs: "475px",
                // => @media (min-width: 475px) { ... }

                sm: "640px",
                // => @media (min-width: 640px) { ... }

                md: "768px",
                // => @media (min-width: 768px) { ... }

                lg: "1024px",
                // => @media (min-width: 1024px) { ... }

                xl: "1280px",
                // => @media (min-width: 1280px) { ... }

                "2xl": "1536px",
                // => @media (min-width: 1536px) { ... }

                "3xl": "1736px",
                // => @media (min-width: 1736px) { ... }

                "4xl": "1920px",
                // => @media (min-width: 1920px) { ... }
            },
            flex: {
                2: "2 2 0%",
                3: "3 3 0%",
                4: "4 4 0%",
                5: "5 5 0%",
                6: "6 6 0%",
                7: "7 7 0%",
                8: "8 8 0%",
            },
        },
        fontSize: {
            "3xs": "10px",
            xs: "12px",
            base: "16px",
            xl: "20px",
            "5xl": "24px",
            "7xl": "26px",
            "13xl": "32px",
            "21xl": "40px",
            "27xl": "46px",
            "29xl": "48px",
            "45xl": "64px",
            "46xl-2": "65.2px",
            "53xl": "72px",
            "77xl": "96px",
            "100xl": "118px",
            "101xl": "120px",
            "123xl": "142px",
            "161xl": "180px",
            "227xl": "246px",
        },
    },
    corePlugins: { preflight: false },
};
