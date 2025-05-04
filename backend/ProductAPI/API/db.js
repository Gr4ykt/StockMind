import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://root:root123.@mongo_api:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin" // importante para auth con root
        });
        console.log("[*] DB conectada");
    } catch (error) {
        console.error("[!] Error de conexión a MongoDB:", error);
    }
};