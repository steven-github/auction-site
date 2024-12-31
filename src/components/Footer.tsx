import React from "react";

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white py-6 mt-10'>
            <div className='container mx-auto text-center'>
                <p>&copy; {new Date().getFullYear()} AuctionSite.</p>
                <p className='text-sm text-gray-400'>All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
