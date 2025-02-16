import { useCreateCheckOutSessionMutation } from '@/features/purchaseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const BuyCourseButton = ({ id }) => {
  const [createCheckOutSession, { data, isLoading, isSuccess, error }] = useCreateCheckOutSessionMutation()

  const purchesCourseHander = async () => {
    await createCheckOutSession(id)
  }

  useEffect(() => {
    if (isSuccess) {
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error("Invaild Response From Server")
      }
    }
    if (error) {
      toast.error(error?.data?.message || "Failed")
    }
  }, [data, isLoading, isSuccess, createCheckOutSession, error])

  return (
    <div className='text-center' onClick={purchesCourseHander}> {isLoading ? <Loader2 className='h-7 w-7 text-center animate-spin' /> : "Buy This Course"}</div>
  )
}

export default BuyCourseButton