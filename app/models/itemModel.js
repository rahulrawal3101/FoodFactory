import mongoose from "mongoose";
import itemSchema from "../schemas/itemSchema";

const Item = mongoose.models.Item || new mongoose.model('Item',itemSchema )

export default Item;