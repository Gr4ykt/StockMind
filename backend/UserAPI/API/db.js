import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://root:root123.@localhost:27018"); 
        console.log("[*] DB Conectada")
    } catch (error) {
        console.log(error);
    }
};
