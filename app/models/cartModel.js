import mongoose from "mongoose";
import cartSchema from "../schemas/cartSchema";

const Cart = mongoose.models.Cart || new mongoose.model('Cart' ,cartSchema);

export default Cart;