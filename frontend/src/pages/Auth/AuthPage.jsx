import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLoggedInUserMutation, useRegisterUserMutation } from '@/features/authApi'
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const AuthPage = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false)
    const [inputError, setInputError] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactNumber: "",
    })
    const [registerUser, { data: RegisterData, isSuccess: RegisterSuccess, error: RegisterError, isLoading: RegisterIsLoading }] = useRegisterUserMutation()
    const [loggedInUser, { data: LoginData, isSuccess: LoginSuccess, error: LoginError, isLoading: LoginIsLoading }] = useLoggedInUserMutation()

    const onChangeHandler = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const toggleCheckedHandler = () => {
        setIsChecked(!isChecked)
    }

    const validateForm = () => {
        setInputError("");
        if (!isLogin) {
            if (!inputData.firstName) {
                setInputError("First Name is required.");
                return false;
            }
            if (!inputData.lastName) {
                setInputError("Last Name is required.");
                return false;
            }
        }

        if (!inputData.email) {
            setInputError("Email Address is required.");
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(inputData.email)) {
            setInputError("Please enter a valid email address.");
            return false;
        }

        if (!isLogin && !inputData.contactNumber) {
            setInputError("Phone Number is required.");
            return false;
        }

        if (!isLogin && inputData.contactNumber.length !== 10) {
            setInputError("Phone number must be 10 digits.");
            return false;
        }

        if (!inputData.password) {
            setInputError("Password is required.");
            return false;
        }

        if (inputData.password.length < 6) {
            setInputError("Password must be at least 6 characters.");
            return false;
        }

        if (!isLogin && !isChecked) {
            setInputError("Please agree to the Terms of Service and Privacy Policy");
            return false;
        }

        return true;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsLoading(true)

        try {
            if (isLogin) {
                loggedInUser(inputData)
            } else {
                registerUser(inputData)
            }
        } catch (error) {
            setIsLoading(false)
            setInputError("An error occurred. Please try again.")
        }
    }

    useEffect(() => {
        if (RegisterSuccess && RegisterData) {
            navigate("/")
            toast.success(RegisterData?.message)
        }
        if (LoginSuccess && LoginData) {
            navigate("/")
            toast.success("User Login Successfully")
        }
        if (LoginError) {
            toast.success(LoginError?.data?.message || "Something went wrong with registration.")
        }
        if (RegisterError) {
            toast.success(RegisterError?.data?.message || "Something went wrong with registration.")
        }
    }, [RegisterData, RegisterSuccess, RegisterError, RegisterIsLoading, LoginData, LoginSuccess, LoginError, LoginIsLoading])

    return (
        <div className='w-full bg-green-100 dark:bg-gray-800 h-screen flex lg:flex-row md:flex-row flex-col justify-center items-center'>
            <div className='lg:w-1/2 md:w-1/2 w-full flex justify-center items-center'>
                <motion.img
                    className='lg:w-[90%] md:w-[85%] w-[80%]'
                    src="/aboutuss.png"
                    alt="About Us"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
            </div>
            <motion.div
                className='lg:w-1/2 md:w-1/2 w-full flex justify-center items-center'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.form
                    onSubmit={onSubmitHandler}
                    className='flex gap-2 flex-col bg-white dark:bg-gray-700 p-6 w-[470px] rounded-lg shadow-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className='text-3xl font-semibold text-green-600 dark:text-white'>{isLogin ? "Login" : "Let's Know Now"}</h1>

                    {!isLogin && (
                        <div className="flex w-full lg:flex-row md:flex-row flex-col gap-2 items-center">
                            <div className="flex flex-col w-full">
                                <label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    onChange={onChangeHandler}
                                    value={inputData.firstName}
                                    placeholder='Enter Your First Name'
                                    className={`border-2 p-2 text-sm rounded-md outline-none focus:border-green-600 dark:bg-gray-600 dark:text-white ${inputError.includes("First Name") ? 'border-red-500' : 'border-green-400'}`}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    onChange={onChangeHandler}
                                    value={inputData.lastName}
                                    placeholder='Enter Your Last Name'
                                    className={`border-2 p-2 text-sm rounded-md outline-none focus:border-green-600 dark:bg-gray-600 dark:text-white ${inputError.includes("Last Name") ? 'border-red-500' : 'border-green-400'}`}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={onChangeHandler}
                            value={inputData.email}
                            placeholder='Enter Your Email'
                            className={`border-2 p-2 text-sm rounded-md outline-none focus:border-green-600 dark:bg-gray-600 dark:text-white ${inputError.includes("Email") ? 'border-red-500' : 'border-green-400'}`}
                        />
                    </div>

                    {!isLogin && (
                        <div className="flex flex-col">
                            <label htmlFor="contactNumber" className="text-gray-700 dark:text-gray-300">Contact Number</label>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                onChange={onChangeHandler}
                                value={inputData.contactNumber}
                                placeholder='Enter Your Phone Number'
                                className={`border-2 p-2 text-sm rounded-md outline-none focus:border-green-600 dark:bg-gray-600 dark:text-white ${inputError.includes("Phone") ? 'border-red-500' : 'border-green-400'}`}
                            />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={onChangeHandler}
                            value={inputData.password}
                            placeholder='Enter Password'
                            className={`border-2 p-2 text-sm rounded-md outline-none focus:border-green-600 dark:bg-gray-600 dark:text-white ${inputError.includes("Password") ? 'border-red-500' : 'border-green-400'}`}
                        />
                    </div>

                    {!isLogin && (
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked={isChecked} onChange={toggleCheckedHandler} />
                            <label className='text-sm dark:text-gray-300'>I agree to the Terms of Service and Privacy Policy</label>
                        </div>
                    )}

                    {inputError && <p className='text-sm bg-red-500 p-2 text-white rounded-sm text-center'>{inputError}</p>}

                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full p-2 flex items-center justify-center text-white rounded-lg mt-3 ${isLoading ? 'bg-gray-500' : 'bg-green-600'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {LoginIsLoading && RegisterIsLoading ? <Loader2 className=' animate-spin h-5 w-5 ' /> : (isLogin ? "Login" : "Join Us Now")}
                    </motion.button>

                    {isLogin ? (
                        <p className='text-center mt-2 dark:text-gray-300'>Don't have an account? <span onClick={() => setIsLogin(false)} className='text-green-500 cursor-pointer'>Sign up</span></p>
                    ) : (
                        <p className='text-center mt-2 dark:text-gray-300'>Already have an account? <span onClick={() => setIsLogin(true)} className='text-green-500 cursor-pointer'>Log in</span></p>
                    )}
                </motion.form>
            </motion.div>
        </div>
    )
}

export default AuthPage
