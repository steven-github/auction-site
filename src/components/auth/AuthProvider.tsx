import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
            authorizationParams={{
                redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
            }}
        >
            {children}
        </Auth0Provider>
    );
};

export default AuthProvider;
