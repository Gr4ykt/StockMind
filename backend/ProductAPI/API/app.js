import express from 'express'

import productRouter from "./routes/product.routes.js";

const app = express();

app.use('/api', productRouter);

export default app;