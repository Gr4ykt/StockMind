import { Router } from "express";
import { hello, register, login, verifyToken, logout } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { loginSchema, registerSchema } from "../schemas/user.schemas.js";

const authRouter = Router();

// NO AUTH
authRouter.get('/hello', hello);
authRouter.post('/register', validateSchema(registerSchema), register);
authRouter.post('/login', validateSchema(loginSchema), login);
authRouter.get('/verify', verifyToken);
authRouter.post('/logout', logout);

// WITH AUTH


export default authRouter;