

import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar'; // Adjust path if different
import Footer from '@/components/Footer'; // Adjust path if different
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Vee Made It',
  description: 'Unisex Saloon Booking App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />
      </head>
      <body className="bg-black text-white border-[#291f1993]">
        <Navbar />
        <Toaster
  position="top-center"
  toastOptions={{
    duration: 4000, // time toast stays visible
    style: {
      background: '#223728',
      color: '#fff',
      fontSize: '12px',
      fontFamily: 'Cinzel, serif',
      borderRadius: '8px',
    },
    success: {
      iconTheme: {
        primary: '#B19D60',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#D9534F',
        secondary: '#fff',
      },
    },
  }}
/>

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
