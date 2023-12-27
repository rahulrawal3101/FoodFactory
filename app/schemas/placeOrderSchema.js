import mongoose from "mongoose";

const placeOrderSchema =  new mongoose.Schema({
    subTotal:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    delchrg:{
        type:Number,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    toPay:{
        type:Number,
        required:true
    },
    items:[Array],
    orderStatus:{
        type:String,
        required:false,
        default:'Placed'
    },
    payment:{
        type:String,
        required:true
    },
    addres:{},
    
},{timestamps:true});
export default placeOrderSchema;