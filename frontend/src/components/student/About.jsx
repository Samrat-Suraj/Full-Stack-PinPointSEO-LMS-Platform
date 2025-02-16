import React from 'react'

const About = () => {
    return (
        <div id="About" className='bg-gray-600 dark:bg-gray-900 p-7 mt-6'>
            <h1 className='text-white text-3xl font-semibold mb-5'>Contact Us</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                <div className='bg-green-500 p-5 shadow-lg'>
                    <h2 className='text-xl font-semibold mb-2'>Comprehensive Course Catalog</h2>
                    <p className='text-white text-sm'>Access a wide variety of courses designed to meet different learning needs, from basic skills to advanced topics in your field.</p>
                </div>
                <div className='bg-green-500 p-5 shadow-lg'>
                    <h2 className='text-xl font-bold mb-2'>User-Friendly Interface</h2>
                    <p className='text-white text-sm'>Our platform is designed to be intuitive, making it easy for students and instructors to navigate, manage coursework, and track progress.</p>
                </div>
                <div className='p-5 bg-green-500 shadow-lg'>
                    <h2 className='text-xl font-bold mb-2'>24/7 Support</h2>
                    <p className='text-white text-sm'>Get help anytime with our dedicated support team. Whether you're a student or instructor, we're here to assist you every step of the way.</p>
                </div>
            </div>
        </div>
    )
}

export default About
