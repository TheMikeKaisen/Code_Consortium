import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

function SignUp() {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false);

    //navigate
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setErrorMessage(null)
            const res = await fetch('http://localhost:3000/api/v1/user/sign-up', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            setLoading(false)
            console.log(data)
            if(data.success === false){
                return setErrorMessage(data.message)
            }
            // navigating to sign-in page
            if(data.success === true) {
                navigate('/sign-in')
            }
        } catch (error) {
            console.log(error.message)
            setErrorMessage("An error occured.")
            setLoading(false)
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
                        {/* username */}
                        <div>
                            <Label value="Your Username" />
                            <TextInput
                                onChange={handleChange}
                                type="text"
                                placeholder="Username"
                                id="username"
                            />
                        </div>

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
                            ) : ('Sign Up')}

                        </Button>
                        {/* google OAuth */}
                        <OAuth />
                    </form>
                    <div className="flex gap-2 mt-5 text-sm">
                        <span>Have an account?</span>
                        <Link to="/sign-in" className="text-blue-500">
                            Sign In
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

export default SignUp
