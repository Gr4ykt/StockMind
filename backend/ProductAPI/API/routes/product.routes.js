import { Router } from "express";
import { hello, createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

import { authRequired } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { isAdmin } from "../middlewares/auth.admin.middlewares.js";
import { flowiseRequired } from "../middlewares/flowise.middlewares.js";

const productRouter = Router();

// Rutas normales con autenticación
productRouter.get('/hello', authRequired, hello);
productRouter.get('/get-products', authRequired, getProducts);
productRouter.get('/product/:id', authRequired, getProduct);
productRouter.post('/product/', authRequired, createProduct);
productRouter.put('/product/:id', authRequired, updateProduct);
productRouter.delete('/product/:id', authRequired, deleteProduct);

// Rutas específicas para Flowise (sin autenticación normal, solo validación de origen)
productRouter.get('/flowise/get-products', flowiseRequired, getProducts);
productRouter.get('/flowise/product/:id', flowiseRequired, getProduct);
//productRouter.post('/flowise/product/', flowiseRequired, createProduct);
//productRouter.put('/flowise/product/:id', flowiseRequired, updateProduct);
//productRouter.delete('/flowise/product/:id', flowiseRequired, deleteProduct);

export default productRouter;