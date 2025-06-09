import express from 'express'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'

import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/users.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', usersRouter);

export default app;