import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice'
import {  useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

function SignIn() {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const { loading, error: errorMessage } = useSelector((state) => state.user);

    //navigate
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            dispatch(signInStart())
            const res = await fetch('http://localhost:3000/api/v1/user/sign-in', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            console.log(data)
            if(data.success === false){
                return dispatch(signInFailure(data.message))
            }
            // navigating to sign-up page
            if(data.success === true) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error.message)
            dispatch(signInFailure(error.message))
        }
    }
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* left */}
                <div className="flex-1">
                    {/* Logo */}
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
                            Coder's
                        </span>
                        Consortium
                    </Link>

                    <p className="text-sm mt-5">
                        This is a demo project. You can sign up with your email
                        and password or with Google.
                    </p>
                </div>

                {/* right */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        
                        {/* email */}
                        <div>
                            <Label value="Your email" />
                            <TextInput
                                onChange={handleChange}
                                type="text"
                                placeholder="Email"
                                id="email"
                            />
                        </div>

                        {/* password */}
                        <div>
                            <Label value="Your Password" />
                            <TextInput
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                id="password"
                            />
                        </div>

                        {/* Button */}
                        <Button 
                        gradientDuoTone="purpleToPink" 
                        type="submit"
                        disabled={loading}
                        >
                            {/* Loader */}
                            {loading ? (
                                <>
                                <Spinner size='sm' />
                                <span>Loading...</span>
                                </>
                            ) : ('Sign In')}

                        </Button>
                        {/* Google OAuth */}
                        <OAuth />
                    </form>
                    <div className="flex gap-2 mt-5 text-sm">
                        <span>Do not have an account?</span>
                        <Link to="/sign-up" className="text-blue-500">
                            Sign Up
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignIn
