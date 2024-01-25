import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from 'bcryptjs'



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

export {
    signUpRouter
}



