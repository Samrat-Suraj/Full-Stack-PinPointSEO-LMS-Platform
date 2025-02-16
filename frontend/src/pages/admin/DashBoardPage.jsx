import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetPurchesCourseQuery } from '@/features/purchaseApi'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const DashBoardPage = () => {
  const { data, isLoading, isSuccess, error } = useGetPurchesCourseQuery()
  const { purchaseCourse } = data || {}

  const courseData = purchaseCourse?.map((course) => ({
    name: course.courseId.title,
    price: course.courseId.coursePrice,
  }))
  console.log(courseData)

  const totalRevenue = purchaseCourse?.reduce((acc, element) => acc + (element.amount || 0), 0)
  const totalSell = purchaseCourse?.length

  return (
    <div className="grid gap-6 p-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 dark:bg-gray-900 text-gray-100">

      {/* Total Sales Card with Green Theme */}
      <Card className="text-green-700 bg-green-900 hover:bg-green-800 transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-green-400 text-lg font-semibold">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-extrabold text-green-400">{totalSell}</p>
        </CardContent>
      </Card>

      {/* Total Revenue Card with Teal Gradient */}
      <Card className="transition-shadow duration-300 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:from-teal-600 hover:via-teal-700 hover:to-teal-800">
        <CardHeader>
          <CardTitle className="text-white text-lg font-semibold">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-extrabold text-white">{`₹${totalRevenue?.toFixed(2)}`}</p>
        </CardContent>
      </Card>

      {/* Course Prices Chart with Light Background */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 dark:bg-gray-800 dark:hover:bg-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-green-400">Course Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis
                dataKey="name"
                stroke="#e5e7eb"
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke="#e5e7eb" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#34d399" // Lush Green line
                strokeWidth={3}
                dot={{ stroke: "#34d399", strokeWidth: 2 }} // Green dot
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashBoardPage
