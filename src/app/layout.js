import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Mantle Clothing | Premium Sustainable Apparel",
  description: "Discover Mantle Clothing's premium sustainable apparel. Shop our collection of eco-friendly, ethically-made clothing for conscious consumers.",
  keywords: "sustainable clothing, eco-friendly apparel, ethical fashion, Mantle Clothing, outdoor apparel, rain collection, range collection",
  metadataBase: new URL('https://mantleclothing.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mantle Clothing | Premium Sustainable Apparel",
    description: "Discover Mantle Clothing's premium sustainable apparel. Shop our collection of eco-friendly, ethically-made clothing for conscious consumers.",
    url: 'https://mantleclothing.com',
    siteName: 'Mantle Clothing',
    images: [
      {
        url: '/images/banner-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Mantle Clothing - Sustainable Apparel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mantle Clothing | Premium Sustainable Apparel",
    description: "Discover Mantle Clothing's premium sustainable apparel. Shop our collection of eco-friendly, ethically-made clothing for conscious consumers.",
    images: ['/images/banner-1.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#9CB24D" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body style={{ 
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: '#F8F8F8',
        color: '#171717',
        margin: 0,
        padding: 0,
        overflowX: 'hidden', // Prevent horizontal scrolling
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <div style={{ flex: '1 0 auto' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
