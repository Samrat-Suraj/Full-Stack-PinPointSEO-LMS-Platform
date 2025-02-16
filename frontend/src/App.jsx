import React, { useEffect } from 'react'
import NavBar from './components/student/NavBar'
import Footer from './components/student/Footer'
import HomePage from './pages/student/HomePage'
import { Route, Routes, useLocation } from 'react-router-dom'
import ProfilePage from './pages/student/ProfilePage'
import ProfileCoursesCards from './components/student/ProfileCoursesCards'
import EditProfile from './components/student/EditProfile'
import AuthPage from './pages/Auth/AuthPage'
import AdminPage from './pages/admin/AdminPage'
import CoursePage from './pages/admin/CoursePage'
import DashBoardPage from './pages/admin/DashBoardPage'
import AddCourse from './components/admin/AddCourse'
import EditCourse from './components/admin/EditCourse'
import AddLeacture from './components/admin/AddLeacture'
import EditLeacture from './components/admin/EditLeacture'
import CourseDetails from './components/student/CourseDetails'
import PageNotFound from './components/student/PageNotFound'
import CourseProgress from './components/student/CourseProgress'
import ExplorePage from './pages/student/ExplorePage'
import { AdminRoute, AuthenticatedUser, ProtectRoute, PurchesCourseProtectRoute } from './components/ProtectRoute/ProtectRoute'
import { useLoadUserQuery } from './features/authApi'

const App = () => {
  const { data: userData, isLoading: userLoading, refetch } = useLoadUserQuery()
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth"
  return (
    <div className='m-auto w-[90%]'>
      {
        isAuthPage ? <></> : <NavBar />
      }
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthenticatedUser><AuthPage /></AuthenticatedUser>} />
        <Route path='/course-progress/:id' element={<ProtectRoute><PurchesCourseProtectRoute><CourseProgress /></PurchesCourseProtectRoute></ProtectRoute>} />
        <Route path='/course-details/:id' element={<ProtectRoute><CourseDetails /></ProtectRoute>} />
        <Route path='/explore' element={<ProtectRoute><ExplorePage /></ProtectRoute>} />
        <Route path='/profile' element={<ProtectRoute><ProfilePage /></ProtectRoute>}>
          <Route path="course" element={<ProfileCoursesCards />} />
          <Route path="edit" element={<EditProfile />} />
        </Route>
        <Route path='/admin' element={<AdminRoute><AdminPage /></AdminRoute>} >
          <Route path='course' element={<CoursePage />} />
          <Route path='dashboard' element={<DashBoardPage />} />
          <Route path='add' element={<AddCourse />} />
          <Route path='course/:id' element={<EditCourse />} />
          <Route path='course/:id/lecture' element={<AddLeacture />} />
          <Route path='course/:id/lecture/:lectureId' element={<EditLeacture />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {
        isAuthPage ? <></> : <Footer />
      }
    </div>
  )
}

export default App