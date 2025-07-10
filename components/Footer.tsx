import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <>
        <div className='bg-[#1B1217] md:px-2 py-6'>

            <div className=' text-white flex flex-col md:flex-row gap-4 p-3 md:px-4 py-6 2xl:container mx-auto justify-between md:text-center font-croissant-one'>
            <div className='text-[14px]'>
                <h1 className='text-[18px] '>SAY HELLO</h1>
                <p className='mt-2'>Phone +234-814-861-1561</p>
                <p>Email: info@mysite.com</p>

                <div className='flex justify-between md:mx-auto mt-1 w-[80px]'>
                    <Image src="fb.svg" alt='icon veemade facebook' width={20} height={20} className='' />

                    <Image src="ig.svg" alt='icon veemade facebook' width={20} height={20} className='' />

                    <Image src="wa.svg" alt='icon veemade facebook' width={20} height={20} className='' />
                </div>
            </div>

            <div className='text-[14px] md:w-4/12'>
                <h1 className='text-[18px]'>OUR ADDRESS</h1>
                <p className='mt-2 '>400 Terry Francine Street Lekki Ajah Lagos</p>

            </div>

            <div className='text-[14px]'>
                <h1 className='text-[18px]'>OPENING HOURS</h1>
                <p className='mt-2'>Mon - Fri 7am - 10pm</p>
                <p>Saturday 8am - 10pm</p>
                <p>Sunday 8am - 11pm</p>
            </div>

            </div>
        
        </div>        
        
        </>

    );

};

export default Footer;
