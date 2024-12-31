import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className='bg-gray-900 text-white py-6 mt-10'>
            <div className='container mx-auto text-center'>
                <p>&copy; {new Date().getFullYear()} AuctionSite. All rights reserved.</p>
                <p className='text-sm text-gray-400'>Built with Next.js and Tailwind CSS.</p>
            </div>
        </footer>
    );
};

export default Footer;
