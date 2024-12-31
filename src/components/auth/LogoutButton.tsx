import Link from "next/link";
import React from "react";

const LogoutButton = () => {
    return <Link href='/api/auth/logout'>Logout</Link>;
};

export default LogoutButton;
