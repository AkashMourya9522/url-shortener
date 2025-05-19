import mongoose from "mongoose";

const shortUrlSchema = mongoose.Schema({
    short_url:{
        type:String,
        required:true,
        index:true
    },
    long_url:{
        type:String,
        required:true
    },
    clicks:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

const shortUrl = mongoose.model('shortUrl',shortUrlSchema)

export default shortUrl
