// app/layout.tsx
import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar'; // Adjust path if different
import Footer from '@/components/Footer'; // Adjust path if different

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
      <body className="bg-black text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
