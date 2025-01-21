import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { sign } from "crypto";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
    const { user, error, isLoading } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const saveUserToDB = async () => {
            try {
                const response = await axios.post("/api/saveUser", user);

                if (response.status === 200 && response.data.user) {
                    console.log("User saved to DB:", response.data.user);
                    localStorage.setItem("userId", response.data.user._id);
                    localStorage.setItem("userName", response.data.user.name);
                }
            } catch (error: any) {
                console.error("Error saving user:", error.response?.data || error.message);
                localStorage.removeItem("userId");
            }
        };
        // Dynamically import Flowbite for interactive components
        import("flowbite");
        if (!isLoading) {
            // console.log("Authenticated user:", user);
            saveUserToDB();
        }
    }, [isLoading, user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <nav className='text-white bg-gray-800'>
                <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex items-center'>
                            <Link href='/' className='text-xl font-bold '>
                                AuctionSite
                            </Link>
                        </div>
                        <div className='hidden md:flex space-x-4'>
                            {user ? (
                                <>
                                    <div className='relative'>
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className='flex items-center px-3 py-2 hover:bg-gray-700 rounded-md space-x-3'
                                        >
                                            <Image
                                                src={user.picture ? user.picture : "https://via.placeholder.com/150"}
                                                alt={user.name ? user.name : "Profile Picture"}
                                                width={40}
                                                height={40}
                                                className='rounded-full'
                                            />
                                            <svg
                                                className='w-2.5 h-2.5 ms-3'
                                                aria-hidden='true'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 10 6'
                                            >
                                                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
                                            </svg>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className='absolute right-0 z-10 w-48 mt-2 text-black bg-white shadow-lg rounded-md divide-y divide-gray-100  dark:bg-gray-700 dark:divide-gray-600'>
                                                <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                                                    <div>{user.name}</div>
                                                    <div className='font-medium truncate'>{user.email}</div>
                                                </div>
                                                <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownInformationButton'>
                                                    <li>
                                                        <Link
                                                            href='/dashboard'
                                                            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href='#'
                                                            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                                        >
                                                            Settings
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href='/auctions'
                                                            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                                        >
                                                            Auctions
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href='/profile'
                                                            className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                                        >
                                                            Profile
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <div className='py-2'>
                                                    <Link
                                                        href='/api/auth/logout'
                                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                    >
                                                        Sign out
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href='/api/auth/login' className='px-3 py-2 hover:bg-gray-700 rounded-md'>
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className='flex -mr-2 md:hidden'>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className='inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none'
                            >
                                <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    {isOpen ? (
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                                    ) : (
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className='md:hidden'>
                        {user ? (
                            <>
                                <Link href='/dashboard' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                    Dashboard
                                </Link>
                                <Link href='/option2' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                    Settings
                                </Link>
                                <Link href='/auctions' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                    Auctions
                                </Link>
                                <Link href='/profile' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                    Profile
                                </Link>
                                <Link href='/api/auth/logout' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                    Sign out
                                </Link>
                                {/* <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className='block w-full px-4 py-2 text-sm text-left hover:bg-gray-700'
                                >
                                    Profile
                                </button> */}
                                {isDropdownOpen && (
                                    <div className='bg-gray-800'>
                                        <Link href='/dashboard' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                            Dashboard
                                        </Link>
                                        <Link href='/option2' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                            Settings
                                        </Link>
                                        <Link href='/auctions' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                            Auctions
                                        </Link>
                                        <Link href='/profile' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                            Profile
                                        </Link>
                                        <Link href='/api/auth/logout' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                            Sign out
                                        </Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <Link href='/api/auth/login' className='block px-4 py-2 text-sm hover:bg-gray-700'>
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
