import mongoose from "mongoose";
import shopSchema from "../schemas/ShopSchema";


const Shop = mongoose.models.Shop ||new mongoose.model('Shop',shopSchema);
export default Shop;