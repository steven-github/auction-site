import type { Config } from "tailwindcss";

import flowbite from "flowbite-react/tailwind";
import lineClamp from "@tailwindcss/line-clamp";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/widgets/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [flowbite.plugin(), lineClamp],
} satisfies Config;
