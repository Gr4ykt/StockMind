import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true, // Porque es PK
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    supplier: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);
