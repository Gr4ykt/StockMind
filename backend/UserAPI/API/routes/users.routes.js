import { Router } from "express";
import { profile, getUsers, getUser, deleteUser, updateUser, registerUser } from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/auth.middlewares.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { isAdmin } from "../middlewares/auth.admin.middlewares.js";

const usersRouter = Router();

// NO AUTH

// WITH AUTH
usersRouter.get('/get-users', authRequired, isAdmin, getUsers);
usersRouter.get('/profile', authRequired, profile);

// CRUD API REST DE USUARIO ADMINISTRADOR
usersRouter.delete('/user/:id', authRequired, isAdmin, deleteUser);
usersRouter.put('/user/:id', authRequired, isAdmin, updateUser);
usersRouter.post('/user', authRequired, isAdmin, registerUser);
usersRouter.get('/user/:id', authRequired, isAdmin, getUser);

export default usersRouter;