import mongoose from "mongoose";
import addressSchema from "../schemas/addressSchema";

const Addres = mongoose.models.Addres || new mongoose.model('Addres', addressSchema);

export default Addres;