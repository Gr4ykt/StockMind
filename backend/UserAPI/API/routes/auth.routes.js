import { Router } from "express";
import { hello } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get('/hello', hello);

export default authRouter;