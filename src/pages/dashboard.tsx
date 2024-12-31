import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard: React.FC = () => {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>You need to log in to access this page.</p>
                <button onClick={() => loginWithRedirect()} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                    Log In
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome, {user?.name}!</h1>
            <p>Email: {user?.email}</p>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
        </div>
    );
};

export default Dashboard;
