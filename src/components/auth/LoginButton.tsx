import Link from "next/link";
import React from "react";

const LoginButton = () => {
    return <Link href='/api/auth/login'>Login</Link>;
};

export default LoginButton;
