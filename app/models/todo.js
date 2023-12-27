import mongoose from "mongoose";
import todoSchema from "../schemas/todoSchema";


const Todo = mongoose.models.Todo || new mongoose.model("Todo",todoSchema)

export default Todo;

