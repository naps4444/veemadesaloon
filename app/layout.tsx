import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
        <Script
  src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
  type="module"
/>

      </head>
      <body className="bg-black text-white border-[#291f1993]">
        {/* Layout container with full height */}
        <div className="min-h-screen flex flex-col justify-between">
          {/* Navbar at the top */}
          <Navbar />

          {/* Main content area that grows and allows loader centering */}
          <main className="flex-grow">{children}</main>

          {/* Footer at the bottom */}
          <Footer />
        </div>

        {/* Toast notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
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
      </body>
    </html>
  );
}
