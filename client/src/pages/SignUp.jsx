import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
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
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            {/* username */}
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>

            {/* email */}
            <div>
              <Label value="Your email" />
              <TextInput type="text" placeholder="Email" id="email" />
            </div>

            {/* password */}
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>

            {/* Button */}
            <Button gradientDuoTone='purpleToPink' type="submit">
                Sign Up
            </Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
                Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
