import Product from '../models/product.model.js';

export const hello = async (req, res) => {
    res.status(200);
    res.json({"message":"Hello World from PRODUCTS API"});
};

// Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('user', 'username email');
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Obtener un solo producto por ID
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user', 'username email');
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { code, name, quantity, supplier } = req.body;

        const existing = await Product.findOne({ code });
        if (existing) return res.status(400).json({ message: "Code already exists" });

        const newProduct = new Product({
            code,
            name,
            quantity,
            supplier,
            user: req.user.id // suponiendo que tienes un middleware de auth que mete `req.user`
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar un producto por ID
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar un producto por ID
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
