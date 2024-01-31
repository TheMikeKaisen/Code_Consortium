import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'

const verifyToken = async(req, res, next) => {
    try {
        const token = req.cookies?.access_token || req.header("Authorization").replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(400, "token not found!")
        }
    
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
        
    
        if(!decodedToken){
            throw new ApiError(500, "token could not be decoded!")
        }
    
        const user = await User.findById(decodedToken._id)
    
        if(!user){
            throw new ApiError(400, "User with the given token could not be found!")
        }
        
    
        req.user = user
        next();
    } catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
            errors: error.errors || [],
        });
    }
}

export {verifyToken}