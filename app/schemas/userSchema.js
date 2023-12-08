import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image: {
        type: String,
        required: false,
        default:'/uploads/abc.png'
    },
    isActive:{
        type:Boolean,
        required:false,
        default:true
    }

},{timestamps:true});
export default userSchema