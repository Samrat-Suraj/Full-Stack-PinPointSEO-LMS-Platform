import { Star } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"
import React from 'react';

const CardSkeleton = () => {
    return (
        <div className='p-4 bg-green-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
            <div className=''>
                <Skeleton className='h-48 w-full rounded-lg' />
                <h3 className='mt-4'>
                    <Skeleton className='w-[200px] h-[20px] rounded-md' />
                </h3>

                <div className='mt-2 flex items-center justify-between text-sm text-gray-600'>
                    <Skeleton className='w-[100px] h-[20px] rounded-full' />
                    <div className='flex items-center space-x-1'>
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className='w-4 h-4 rounded-full bg-gray-300' />
                        ))}
                    </div>
                </div>

                <Skeleton className='w-[250px] h-[20px] rounded-md mt-2' />
                <Skeleton className='w-[80px] h-[20px] rounded-full mt-3' />
                <Skeleton className='w-full h-[40px] rounded-lg mt-4' />
            </div>
        </div>
    );
};

export default CardSkeleton;
