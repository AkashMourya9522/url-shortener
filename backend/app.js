import express from 'express';
const app = express();
import { nanoid } from 'nanoid';
import connectDB from './src/config/mongoose.config.js';
import dotenv from 'dotenv';
dotenv.config();
import urlSchema from './src/models/shorturl.model.js';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(3000, () => {
    connectDB()
    console.log("Server is running on http://localhost:3000");
});

app.post("/api/create", async (req, res) => {
    const {url} = req.body;
    const short_url = nanoid(7);
    const newUrl = new urlSchema({
        short_url,
        long_url: url,
    });
    await newUrl.save();
    res.status(201).json({ short_url });
});

app.get("/:id",async (req,res)=>{
    const {id} = req.params
    try {
        const dbRes = await urlSchema.findOne({short_url:id})
        res.redirect(dbRes.long_url)
    } catch (error) {
        res.status(404).json({
            "msg":"Some Error has occurred!!"
        })
    }
})
