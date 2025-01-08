import "../styles/globals.css";

import React, { useEffect } from "react";

import { AppProps } from "next/app";
import Layout from "../components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        // Dynamically import Flowbite to initialize its scripts
        import("flowbite");
    }, []);
    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
};

export default MyApp;
