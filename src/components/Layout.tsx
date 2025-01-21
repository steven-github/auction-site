import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='container flex-grow py-6 mx-auto'>{children}</main>
            <Footer />
        </div>
    );
}
