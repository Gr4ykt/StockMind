import express from 'express'

import authRouter from "./routes/auth.routes.js";

const app = express();

app.use('/api', authRouter);

export default app;