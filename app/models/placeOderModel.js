import mongoose from "mongoose";
import placeOrderSchema from "../schemas/placeOrderSchema";

const PlaceOrder = mongoose.models.PlaceOrder || new mongoose.model('PlaceOrder', placeOrderSchema);
export default PlaceOrder;