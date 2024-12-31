import React, { useEffect } from "react";

import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar: React.FC = () => {
    const { isAuthenticated } = useAuth0();

    const { user, error, isLoading } = useUser();

    // Debugging logs
    console.log("isLoading:", isLoading);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("Authenticated user:", user);
        }
    }, [isAuthenticated, user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className='bg-gray-800 text-white py-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <h1 className='text-xl font-bold'>AuctionSite</h1>
                <div className='flex items-center space-x-4'>
                    {user ? (
                        <>
                            <p>Welcome, {user?.name}</p>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <LoginButton />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
