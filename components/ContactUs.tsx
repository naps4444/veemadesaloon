import Link from 'next/link';
import Image from 'next/image';

const ContactUs = () => {
    return (
        <>
      <div className='2xl:container mx-auto my-auto py-10 md:py-12 lg:py-16 relative text-black'>
        <div className='text-center text-white'>
        <h1 className='text-3xl font-croissant-one '>Contact Us</h1>

        <p className='font-cinzel-decorative text-center md:w-8/12 mx-auto lg:w-6/12'>Feel free to contact us any time. we will get back to you as soon as we can!</p>

        </div>


        <form className='px-2 md:w-8/12 lg:w-6/12 mx-auto mt-4 font-croissant-one'>

        <div className='md:flex gap-2 md:gap-4'>
            <div className='flex flex-col w-full gap-2 md:gap-4'>
                <input type="text" placeholder="First Name" className="w-full p-2 border border-[#00000080] outline-none" />

                <input type="text" placeholder="Last Name" className="w-full p-2 border border-[#00000080] outline-none" />
            </div>

            <div className='flex flex-col w-full mt-2 md:mt-0 gap-2 md:gap-4'>
                <input type="phone" placeholder="Phone Number" className="w-full p-2 border border-[#00000080] outline-none" />

                <input type="email" placeholder="Email Address" className="w-full p-2 border border-[#00000080] outline-none" />
            </div>

        </div>

            <div className='mt-2 md:mt-4'>
                <textarea placeholder="Your Message" className="w-full p-2 border border-[#00000080] outline-none"></textarea>
            </div>

            <div className='bg-[#B19D60] mx-auto w-[100px] text-center md:mt-2'>
                <button type="submit" className="mx-auto text-white text-center py-2">Submit</button>
            </div>

             
        </form>

        <div className='hidden md:block absolute top-[100px] lg:top-[70px] xl:top-[25px] right-0'>
            <Image src="/conchair.svg" alt="Contact Us veemade" width={500} height={500} className="mx-auto md:w-[150px] lg:w-[250px] xl:w-[270px] mt-4" />
        </div>
        
        
        </div> 
        
        </>

    );

};

export default ContactUs;
