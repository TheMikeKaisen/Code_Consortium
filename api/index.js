import 'dotenv/config'
import express from 'express'
import app from './app.js'
// db
import connectDB from './db/index.js'

express.json()

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection Failed!!");
})

