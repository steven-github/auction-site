import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        domains: ["lh3.googleusercontent.com", "via.placeholder.com", "flowbite.com", "placehold.co"],
    },
};

export default nextConfig;
