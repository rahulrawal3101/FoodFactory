import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        trim : true
    },
    desc : {
        type: String,
        required : true,
        trim : true
    },
    image : {
        type: String,
        required : true,
        trim : true
    },
    isCompleted:{
        type:Boolean,
        required:false,
        default:false
    }
},{timestamps:true})

export default todoSchema;