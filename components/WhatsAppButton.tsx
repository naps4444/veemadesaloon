import Link from 'next/link';
import Image from 'next/image';

const WhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/+2349036682394" // replace with your WhatsApp number in international format, no "+" or leading 0
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999]"
    >
      <Image
        src="/whatsapp.png" 
        alt="Chat on WhatsApp"
        width={50}
        height={50}
        className="hover:scale-110 transition-transform"
      />
    </Link>
  );
};

export default WhatsAppButton;
