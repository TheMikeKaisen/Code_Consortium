import express from 'express'
import 'dotenv/config'

// db
import connectDB from '../db/index.js'

const app = express()

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection Failed!!");
})

