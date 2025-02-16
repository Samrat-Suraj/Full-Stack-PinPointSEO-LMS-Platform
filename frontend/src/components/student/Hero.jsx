import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div id='Hero' className='h-[90vh] w-full flex justify-center items-center mt-2 bg-green-100 dark:bg-gray-900'>
            <div className='w-full md:w-1/2 flex items-center justify-center p-10'>
                <div>
                    <p className='text-red-400 dark:text-red-300'>
                        <span className='p-1 bg-red-500 text-white text-sm rounded-full'>50% Off</span> LEARN FOR TODAY
                    </p>
                    <h1 className='text-4xl md:text-5xl font-bold mt-5 text-gray-900 dark:text-white'>The Best Way For</h1>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>Your Learning</h1>
                    <p className='mt-4 text-gray-600 dark:text-gray-300'>
                        Experience the best way to learn, with interactive courses and personalized guidance. Take your skills to the next level today!
                    </p>
                    <Link to={"/explore"}>
                        <button className='mt-6 px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-600 transition duration-300'>
                            Explore Course
                        </button>
                    </Link>
                </div>
            </div>
            <div className='hidden md:block w-1/2 lg:flex items-center justify-center'>
                <img
                    src="Student1.png"
                    alt="Student"
                    className='object-cover'
                />
            </div>
        </div>
    );
};

export default Hero;
