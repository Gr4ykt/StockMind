import { Router } from "express";
import { hello } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get('/hello', hello);

export default productRouter;