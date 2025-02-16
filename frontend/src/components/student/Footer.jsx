import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <div id='Footer' className='bg-gray-600 dark:bg-gray-950 mt-7 flex flex-col relative lg:h-[60vh] md:h-[60vh] h-[55vh]'>
      <div className='px-4'>
        <p className='w-full mt-16 max-w-3xl m-auto text-green-500 text-sm font-semibold mb-4 text-center'>
          Welcome to PinPointSEO, your go-to destination for seamless and interactive learning experiences. Our platform is designed to provide quality education, expert-led courses, and real-time interaction to help you achieve your goals.
        </p>
        <div className='flex gap-3 items-center justify-center text-white'>
          <a href="https://facebook.com" aria-label="Facebook">
            <Facebook className='bg-green-600 p-2 rounded-full' width={50} height={30} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <Linkedin className='bg-green-600 p-2 rounded-full' width={50} height={30} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <Instagram className='bg-green-600 p-2 rounded-full' width={50} height={30} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <Twitter className='bg-green-600 p-2 rounded-full' width={50} height={30} />
          </a>
        </div>

        <div>
          <ul className='flex justify-center gap-11 mt-3 text-white flex-wrap'>
            <li><a href="#menu" className='hover:text-green-500 transition duration-300'>Menu</a></li>
            <li><a href="#about" className='hover:text-green-500 transition duration-300'>About</a></li>
            <li><a href="#course" className='hover:text-green-500 transition duration-300'>Course</a></li>
            <li><a href="#contact" className='hover:text-green-500 transition duration-300'>Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='bg-green-500 flex justify-center items-center absolute bottom-0 z-10 h-[20vh] md:h-[15vh] w-full'>
        <div className='container mx-auto text-center text-white'>
          <p>&copy; 2025 <span className='text-gray-950 font-bold'>P</span>inPointSE<span className='text-orange-400 font-bold'>O</span>. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
