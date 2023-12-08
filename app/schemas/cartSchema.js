import mongoose from "mongoose";

const cartSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cid:{
        type:String,
        required:true
    },
    mid:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required: true
    },
    mrp:{
        type:Number,
        required:true
    },
    srp:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    isAvailable:{
        type:Boolean,
        required:true
    },
    foodType:{
        type:String,
        required:true
    },
    isPopular:{
        type:Boolean,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
            type:Number,
            required:true  
    },
    uid:{
        type:String,
        required:true
    }


},{timestamps:true});

export default cartSchema;