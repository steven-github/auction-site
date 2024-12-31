// import { useAuth0 } from "@auth0/auth0-react";

const useAuth = () => {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

    const login = () => loginWithRedirect();
    const logoutUser = () =>
        logout({
            returnTo: window.location.origin,
        });

    return {
        isAuthenticated,
        user,
        login,
        logout: logoutUser,
    };
};

export default useAuth;
