import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


import userRoute from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js';

app.use('/api/user/', userRoute);
app.use('/api/auth/', authRoute);

export default app;
