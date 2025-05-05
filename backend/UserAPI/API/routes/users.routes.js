import { Router } from "express";
import { profile } from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";

const usersRouter = Router();

// NO AUTH

// WITH AUTH
usersRouter.get('/profile', authRequired, profile)

export default usersRouter;