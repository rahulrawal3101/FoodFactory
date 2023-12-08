import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default:'/uploads/abc.png'
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    offPercentage: {
        type: Number,
        required: true
    },
    foodFormany: {
        type: Number,
        required: true
    },
    foodForCost: {
        type: Number,
        required: true

    },
    delivery: {
        type: Number,
        required: true
    },
    mobileShop: {
        type: Number,
        required: true
    },
    emailShop: {
        type: String,
        required: true
    },
    shopAddress: {
        type: String,
        required: true
    },
    walletBal: {
        type: Number,
        default: 0,
        required: false
    },
    isShopOpen: {
        type: Boolean,
        default: false,
        required: false
    },
    isShopBanned: {
        type: Boolean,
        default: false,
        required: false
    },
    isPopular: {
        type: Boolean,
        default: false,
        required: false
    },
    isTrending: {
        type: Boolean,
        default: false,
        required: false
    }

}, { timestamps: true });

export default shopSchema;
