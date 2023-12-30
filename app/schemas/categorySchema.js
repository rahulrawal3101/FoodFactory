import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
        // default:'/uploads/abc.png'
    },
    isAvailable:{
        type:Boolean,
        required:false,
        default:false
    },
    mid:{
        type:String,
        required:true
    }

}, { timestamps: true });

export default categorySchema;