import mongoose from "mongoose";


async function connectDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connection success :) ')
    } catch (error) {
        console.log("There seems to be an error :( ",error)
    }
}

export default connectDB