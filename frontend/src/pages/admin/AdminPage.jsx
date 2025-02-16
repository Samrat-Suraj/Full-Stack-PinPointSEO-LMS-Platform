import AdminSideBar from '@/components/admin/AdminSideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
    return (
        <div className='flex w-full'>
            <AdminSideBar />
            <div className='flex-1 w-full h-screen bg-green-50 dark:bg-gray-900 overflow-scroll hideScroll '>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPage