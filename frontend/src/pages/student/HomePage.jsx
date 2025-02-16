import About from '@/components/student/About'
import Contact from '@/components/student/Contact'
import CoursesCards from '@/components/student/CoursesCards'
import Hero from '@/components/student/Hero'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <h1 className='text-4xl font-bold mt-4 dark:text-white text-gray-800 mb-8'>
        Explore Our Courses
      </h1>
      <CoursesCards />
      <About/>
      <Contact/>
    </div>
  )
}

export default HomePage