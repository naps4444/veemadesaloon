import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'Vee Made It',
  description: 'Unisex Saloon Booking App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Paystack */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />

        {/* Lottie files */}
        <Script
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js"
          type="module"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EG4W8J0J6Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EG4W8J0J6Z');
          `}
        </Script>
      </head>
      <body className="bg-black text-white border-[#291f1993]">
        {/* Layout container with full height */}
        <div className="min-h-screen flex flex-col justify-between">
          {/* Navbar at the top */}
          <Navbar />

          {/* Main content area */}
          <main className="flex-grow">{children}</main>

          {/* Footer at the bottom */}
          <Footer />
        </div>

        {/* Floating WhatsApp button */}
        <WhatsAppButton />

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
