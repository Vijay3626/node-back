import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DBURL);
        console.log("Database connected successfully...");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
