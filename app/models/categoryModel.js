import mongoose from "mongoose";
import categorySchema from "../schemas/categorySchema";

const Categorie = mongoose.models.Categorie || new mongoose.model('Categorie',categorySchema);

export default Categorie;