// pages/index.tsx
import React from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";

const Home: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (user) {
        router.push("/dashboard");
    }

    return (
        <div className='flex flex-col items-center justify-center h-100'>
            <h1 className='mb-4 text-2xl font-bold'>Welcome to the AuctionSite!</h1>
            <p className='text-lg'>Please log in to access your dashboard.</p>
        </div>
    );
};

export default Home;
