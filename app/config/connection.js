import { MONGU_URL } from "@/constant";
import mongoose from "mongoose";


let connection;

const CONNECT_DATABASE = async () => {
    console.log('hello');
    if (!connection) {
        connection = await mongoose.connect(MONGU_URL);
    }
    console.log('Database connected successfully');
    return connection;

};
export default CONNECT_DATABASE;