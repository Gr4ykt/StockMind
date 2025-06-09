import { Router } from "express";
import { profile, getUsers, getUser, deleteUser, updateUser, registerUser } from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/auth.admin.middlewares.js";

const usersRouter = Router();

// NO AUTH

// WITH AUTH
usersRouter.get('/profile', authRequired, profile);
usersRouter.post('/user', authRequired, registerUser);
usersRouter.get('/user/:id', authRequired, getUser);
usersRouter.put('/user/:id', authRequired, updateUser);

// CRUD API REST DE USUARIO ADMINISTRADOR
usersRouter.get('/get-users', authRequired, isAdmin, getUsers);
usersRouter.delete('/user/:id', authRequired, isAdmin, deleteUser);

export default usersRouter;