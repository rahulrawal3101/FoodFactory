import mongoose from "mongoose";
import userSchema from "../schemas/userSchema";

const User = mongoose.models.User || new mongoose.model('User',userSchema);

export default User;