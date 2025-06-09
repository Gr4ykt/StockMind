import express from 'express'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'


import productRouter from "./routes/product.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', productRouter);

export default app;