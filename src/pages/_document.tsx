// pages/_document.tsx
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                {/* Meta tags */}
                <meta charSet='UTF-8' />
                <meta name='description' content='An online auction platform for real-time bidding.' />
                <meta name='keywords' content='auction, bidding, online marketplace, real-time auctions' />
                <meta name='author' content='Your Name or Company Name' />

                {/* Favicon */}
                <link rel='icon' href='/favicon.ico' />

                {/* Google Fonts (optional) */}
                <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' rel='stylesheet' />

                {/* Tailwind CSS (if additional customization is needed for fonts or styles) */}
                {/* Additional meta tags for SEO */}
            </Head>
            <body className='text-gray-800 bg-gray-50'>
                {/* Main application entry point */}
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
