import { setCheckData } from '@/features/filterSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const categories = [
    'Next.js',
    'React.js',
    'Full Stack Web Development',
    'Data Science',
    'Node.js',
    'Vue.js',
    'Python',
    'JavaScript',
    'Angular',
    'Ruby on Rails',
    'Machine Learning',
    'AI',
    'Blockchain',
    'UX/UI Design',
    'Cloud Computing',
];

const Filter = () => {
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        dispatch(setCheckData(category))
    };

    return (
        <div className="w-[18vw] p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="mb-3"></div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-green-700 dark:text-green-400">Filter</h1>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-medium text-green-800 dark:text-green-300 mb-3">Category</h2>
                <div className="space-y-3">
                    {categories.map((category, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`category-${index}`}
                                name="category"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={() => handleCategoryChange(category)}
                                className="mr-2 h-4 w-4 text-green-500 dark:text-green-400 border-green-300 dark:border-green-600 rounded"
                            />
                            <label
                                htmlFor={`category-${index}`}
                                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 lg:text-sm md:text-sm text-[8px] cursor-pointer"
                            >
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filter;
