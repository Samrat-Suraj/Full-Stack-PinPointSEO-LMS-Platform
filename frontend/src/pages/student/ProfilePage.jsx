import ProfileCoursesCards from '@/components/student/ProfileCoursesCards'
import ProfileSideBar from '@/components/student/ProfileSideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ProfilePage = () => {
  return (
    <div className='flex'>
      <ProfileSideBar />
      <div className='overflow-scroll h-screen w-full hideScroll mt-3'>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfilePage