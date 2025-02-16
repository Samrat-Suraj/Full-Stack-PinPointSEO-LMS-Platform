import React from 'react';
import 'animate.css';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full text-black">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold mb-6 animate__animated animate__bounceInDown">Oops!</h1>
        <p className="text-3xl font-medium mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Looks like you've wandered off the beaten path.
        </p>
        <p className="text-sm mb-8 animate__animated animate__fadeIn animate__delay-2s">
          The page you're looking for is lost in space. Maybe try one of the links below?
        </p>
        <div className="flex justify-center gap-8">
          <a href="/" className="py-2 px-6 rounded-full text-lg font-semibold transition">
            Go to Homepage
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-300">
          Error Code: 404. It happens to the best of us. 😅
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
