import express from 'express';
const app = express();
import { nanoid } from 'nanoid';
import cors from 'cors'
import connectDB from './src/config/mongoose.config.js';
import dotenv from 'dotenv';
dotenv.config();
import urlSchema from './src/models/shorturl.model.js';
import shortUrlRoute from './src/routes/shorturl.route.js';
import { redirectUrl } from './src/controllers/shortUrl.controller.js';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.listen(3000, () => {
    connectDB()
    console.log("Server is running on http://localhost:3000");
});

app.use("/api/create", shortUrlRoute);
app.use("/api/redirect",shortUrlRoute)
