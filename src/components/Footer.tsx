import React from "react";

const Footer = () => {
    return (
        <footer className='py-6 mt-10 text-white bg-gray-900'>
            <div className='container mx-auto text-center'>
                <p>&copy; {new Date().getFullYear()} AuctionSite.</p>
                <p className='text-sm text-gray-400'>All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
