import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className="flex flex-col items-center justify-center">
        <Loader className='animate-spin text-green-600 h-20 w-20' />
        <div className="mt-4 text-lg font-semibold text-gray-700">
          Loading...
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
