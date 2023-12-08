import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cid: {
        type: String,
        required: true
    },
    mid: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
        default:'/uploads/abc.png'
    },
    mrp: {
        type: Number,
        required: true 
    },
    srp: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: false,
        default: false
    },
    foodType: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
        required:false,
        default: false
    },
    rating: {
        type: Number,
        required:false,
        default: 0
    },
    review: {
        type: Number,
        required: false,
        default: 0
    }

}, { timestamps: true });

export default itemSchema;