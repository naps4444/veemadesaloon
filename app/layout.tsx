import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'react-hot-toast';
import ClientLayoutWrapper from './ClientLayoutWrapper';

export const metadata = {
  title: 'VeeMade Salon and Spa | Luxury Beauty in Lekki',
  description:
    'VeeMade Salon and Spa in Lekki offers premium unisex beauty and wellness services, from luxury hair treatments and spa therapies to professional grooming. Experience modern relaxation and top-tier style at VeeMade.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Disable browser scroll restoration early */}
        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) history.scrollRestoration = 'manual';`}
        </Script>

        {/* Paystack Integration */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="beforeInteractive"
        />

        {/* Lottie Animations */}
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
        {/* Client-side wrapper to handle scroll + visibility */}
        <ClientLayoutWrapper>
          <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>

          <WhatsAppButton />

          {/* Toast Notifications */}
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
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
