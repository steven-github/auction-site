import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const Dashboard: React.FC = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>{error.message}</div>;

    if (!user) {
        return (
            <div className='flex flex-col items-center justify-center h-100'>
                <h1 className='mb-4 text-2xl font-bold'>Access Denied</h1>
                <p className='text-lg'>You need to log in to access this page.</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center h-100'>
            <h1 className='mb-4 text-2xl font-bold'>Welcome, {user?.name}!</h1>
            <p className='text-lg'>Email: {user?.email}</p>
        </div>
    );
};

export default Dashboard;
