import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'



const signUpRouter = asyncHandler(async(req, res) => {
    try {
        const {username, email, password} = req.body
    
        // validation
        if(!username || !email || !password){
            throw new ApiError(400, "Field not provided!")
        }
        if(
            [username, email, password].some((field)=>field?.trim()==="")
        ){
            throw new ApiError(400, "All fields are required !")
        }
         
        // check if user already exist
        const userExists = await User.findOne({
            $or: [{username}, {email}]
        })
    
        if(userExists){
            throw new ApiError(400, "Username or email already exists.")
        }
    
    
        const hashedPassword = await bcryptjs.hash(password, 10)
    
        const user = await User.create({
            username: username.toLowerCase(), 
            email, 
            password: hashedPassword
        })
    
        const createdUser = await User.findById(user._id).select('-password')
    
        if(!createdUser){
            throw new ApiError(500, "server error!")
        }
    
        return res.status(200).json(
            new ApiResponse(200, createdUser, "User created successfully!")
        )
    } catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            errors: error.errors || [],
        });
    }

    
})

const signInRouter = asyncHandler(async(req, res) => {
    try {
        const {email, password} = req.body
    
        if(!email || (email.trim()==="")){
            throw new ApiError(404, "Email not provided!")
        }
        if(!password || (password.trim()==="")){
            throw new ApiError(404, "Enter password!")
        }
    
        const user = await User.findOne({email})
    
        if(!user){
            throw new ApiError(404, "User not found")
        }
    
        const isPasswordCorrect = await bcryptjs.compareSync(password, user.password)
    
        if(!isPasswordCorrect){
            throw new ApiError(400, "Password Incorrect")
        }
    
        const token = await jwt.sign({
            _id: user._id, 
        }, process.env.JWT_SECRET)
        let options = {
            httpOnly: true, 
            secure: true
        }

        const loggedInUser = await User.findById(user._id).select('-password')
        res.status(200)
        .cookie('token', token, options)
        .json(
            
            new ApiResponse(
                200, 
                loggedInUser,
                "Sign In successful"
            )
            
        )
    } catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            errors: error.errors || [],
        });
    }

})

const google = asyncHandler(async(req, res)=>{
    const {name, email, googlePhotoUrl} = req.body
    
    try {
        // finding if the user already exists
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET)
    
            const options = {
                httpOnly: true,
                secured: true
            }
    
            const loggedInUser = await User.findById(user._id).select("-password")
    
            res.status(200)
            .cookie("token", token, options)
            .json(
                new ApiResponse(200, loggedInUser, "sign in successful")
            )
        }else{
            const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
    
            const hashedPassword = await bcryptjs.hashSync(generatedPassword, 10)
    
            const newUser = await User.create({
                username: name.toLowerCase().split(' ').join('') +
                Math.random().toString(9).slice(-4), 
                email, 
                password: hashedPassword,
                photoUrl: googlePhotoUrl 
            })
            const token = jwt.sign({
                id: newUser._id
            }, process.env.JWT_SECRET)
    
            const options = {
                httpOnly: true,
                secured: true
            }
    
            const loggedInUser = await User.findById(newUser._id).select("-password")
    
            res.status(200)
            .cookie("token", token, options)
            .json(
                new ApiResponse(200, loggedInUser, "Sign In successful")
            )
        }
    } catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            errors: error.errors || [],
        });
    }
})

const updateUser = asyncHandler(async(req, res)=>{

    try {
        const {username, email, password} = req.body
    
        // updated username validation
        if(username){
            const usernameAlreadyExist = await User.findOne({username: username})
            if(usernameAlreadyExist){
                throw new ApiError(400, "Username already exists!")
            }
            if(username.trim().length === 0){
                throw new ApiError(400, "username cannot be empty")
            }
            if(username.toLowerCase() !== username){
                throw new ApiError(400, "username must be in lowercase")
            }
            if(username.includes(" ")){
                throw new ApiError(400, "username cannot contain spaces!")
            }
        }
    
        // updated password validation
        if(password){
            if(password.trim() === ""){
                throw new ApiError(400, "password cannot be empty")
            }
            if(password.length < 7 || password.length >20){
                throw new ApiError(400, "length of the password should be greater than 7 and smaller than 20")
            }
            
            if(password.includes(" ")){
                throw new ApiError(400, "password should not contain any spaces!")
            }
        }
    
        if(email){
            const emailAlreadyExists = await User.findOne({email})
            if(emailAlreadyExists){
                throw new ApiError(400, "Email already exists!")
            }
            if(email.trim().length === 0){
                throw new ApiError(400, "password cannot be empty")
            }
    
        }
    
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                username, 
                email, 
                password
            }
        }, {new: true})
    
        const showUpdatedUser = await User.findById(req.user._id).select("-password")
        
        res.status(200)
        .json(
            new ApiResponse(200, showUpdatedUser, "User successfully updated")
        )
    } catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            errors: error.errors || [],
        });
    }


})
export {
    signUpRouter,
    signInRouter,
    google,
    updateUser
}



