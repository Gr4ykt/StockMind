import { Router } from "express";
import { hello, createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

import { authRequired } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { isAdmin } from "../middlewares/auth.admin.middlewares.js";

const productRouter = Router();

productRouter.get('/hello', authRequired, hello);

productRouter.get('/get-products', authRequired, getProducts);
productRouter.get('/product/:id', authRequired, getProduct);
productRouter.post('/product/', authRequired, createProduct);
productRouter.put('/product/:id', authRequired, updateProduct);
productRouter.delete('/product/:id', authRequired, deleteProduct);

export default productRouter;