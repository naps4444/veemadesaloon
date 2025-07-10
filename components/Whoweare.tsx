import Link from 'next/link';
import Image from 'next/image';

const Whoweare = () => {
    return (
        <>
        <div className=' xl:container mx-auto  pb-4'>
            <div>
                <Image src="/line.svg" alt="veemade" width={100} height={100} className=' w-10/12 lg:w-8/12 mx-auto mt-4 h-4' />
            </div>

            <div className='flex justify-center gap-5 items-center w-10/12 mx-auto '>
                <div>
                    <Image src="/scsleft.svg" alt="veemade scissors left" width={100} height={100} className='w-6 my-auto mt-[5px]'/>
                </div>

                <div>
                    <h1 className='text-center text-[19px] md:text-[26px] font-croissant-one '>Who We Are</h1>
                </div>

                <div>
                    <Image src="/scsright.svg" alt="veemade scissors right" width={100} height={100} className='w-6 my-auto mt-[5px]'/>
                </div>
            </div>

            <div>
                <p className='text-center text-[16px] md:text-[20px] mx-auto w-10/12 md:w-8/12 lg:w-6/12 mt-3 font-dancing-script'>“We’re not just cutting hair—we’re crafting confidence. With years of experience, modern tools, and a love for the craft, our team delivers sharp results in a chill, professional setting.”</p>
            </div>
            
        </div>

        </>
    );

};

export default Whoweare;
