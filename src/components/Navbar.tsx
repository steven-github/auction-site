import React, { useEffect } from "react";

import Image from "next/image";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
    const { isAuthenticated } = useAuth0();

    const { user, error, isLoading } = useUser();

    // Debugging logs
    console.log("isLoading:", isLoading);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);
    console.log("error:", error);

    useEffect(() => {
        if (!isLoading) {
            console.log("Authenticated user:", user);
        }
    }, [isLoading, user]);

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
                            <div className='flex items-center space-x-3'>
                                <Image
                                    src={user.picture ? user.picture : "https://via.placeholder.com/150"}
                                    alt={user.name ? user.name : "Profile Picture"}
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                                <LogoutButton />
                            </div>
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
