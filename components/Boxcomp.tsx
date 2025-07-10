import Link from 'next/link';
import Image from 'next/image';

const Boxcomp = () => {
    return (
        <>
        <div className='w-full 2xl:container mx-auto'>

            <div className='bg-[#291F19] w-full'>
                <div className='flex flex-col-reverse md:grid md:grid-cols-2'>
                    <div className='text-center flex flex-col justify-center items-center bg-[#1C1D1F] text-[#FFFFFF] p-4'>
                        <h1 className='font-cormorant-upright text-[22px]'>EXPERIENCE</h1>

                        <Image src="/lined.svg" alt="line svg veemade" width={100} height={100} className='  mx-auto mt-2 h-1' />

                        <p className='lg:w-11/12 mx-auto xl:w-10/12 mt-2 font-cormorant-upright'>With years behind the blade, our barbers bring deep skill and unmatched attention to detail. Every cut, every trim, every shave reflects the mastery earned through hands-on work and dedication to the craft.</p>
                    </div>
                    <div>
                        <Image src="/eximag.svg" alt="veemade box image" width={100} height={100} className='mx-auto w-full' />
                    </div>
                </div>

                <div className='flex flex-col md:grid md:grid-cols-2'>
                    <div>
                        <Image src="/bladeimg.svg" alt="veemade box image" width={100} height={100} className='mx-auto w-full' />
                    </div>
                    <div className='text-center flex flex-col justify-center items-center bg-[#223728] text-[#FFFFFF] p-4'>
                        <h1 className='font-cormorant-upright text-[22px]'>CLEAN ENVIRONMENT</h1>

                        <Image src="/lined.svg" alt="line svg veemade" width={100} height={100} className='mx-auto mt-2 h-1' />

                        <p className='lg:w-11/12 mx-auto xl:w-10/12 mt-2 font-cormorant-upright'>Your comfort and safety come first. We maintain a spotless space from tools to chairs ensuring every client enjoys a fresh, hygienic, and relaxing experience, every single time.</p>
                    </div>
                </div>                
            </div>

            <div className='bg-[url("/hairdo.svg")] bg-cover bg-center flex justify-center items-center w-full h-[300px] '>

            <div className='text-[#B19D60] mx-auto text-center px-4 lg:w-7/12 py-10 bg-[#1E1E1E73]'>
                <h1 className='font-cormorant-upright text-[22px]'>CERTIFIED BARBERS</h1>

                <p className=' mx-auto mt-2 font-cormorant-upright'>Our team is made up of trained, licensed professionals who know their art. From modern trends to classic cuts, we deliver styles with confidence, precision, and professionalism.
                </p>

            </div>


            </div>
            
        </div>      
        
        </>

    );

};

export default Boxcomp;


