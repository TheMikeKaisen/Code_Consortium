import mongoose from 'mongoose'


const connectDB = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("Connected to the DataBase");
    } catch (error) {
        console.log("MongoDB connection Failed!!", error);
    }
}

export default connectDB