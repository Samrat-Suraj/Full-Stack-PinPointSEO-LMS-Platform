import { Mail, MapPinIcon, PhoneCall } from 'lucide-react'
import React from 'react'

const Contact = () => {
    return (
        <div id='Contact' className='bg-green-600 dark:bg-gray-900  p-7 mt-6'>
            <h1 className='text-white text-3xl font-semibold mb-5'>Contact Us</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                
                <div className='p-5 flex justify-center shadow-lg'>
                    <div className='flex flex-col gap-3 items-center'>
                        <MapPinIcon size={50} className='text-white' />
                        <h1 className='text-white'>Address</h1>
                        <p className='text-white text-center'>
                            123 MG Road, <br />
                            Mumbai, Maharashtra, <br />
                            India - 400001
                        </p>
                    </div>
                </div>
                
                
                <div className='p-5 flex justify-center shadow-lg'>
                    <div className='flex flex-col gap-3 items-center'>
                        <PhoneCall size={50} className='text-white'  />
                        <h2 className='text-white'>Phone</h2>
                        <p className='text-white'>
                            +91 9876543210
                        </p>
                    </div>
                </div>
                
                
                <div className='p-5 flex justify-center shadow-lg'>
                    <div className='flex flex-col gap-3 items-center'>
                        <Mail size={50} className='text-white'  />
                        <h2 className='text-white'>Email</h2>
                        <p className='text-white'>
                            contact@example.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
