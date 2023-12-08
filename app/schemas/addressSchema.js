import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    recieverName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    landMark: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    defaultAddress: {
        type: Boolean,
        required: false,
        default: false
    },
    mobile:{
        type:Number,
        required:true
    }


}, { timestamps: true });
export default addressSchema;