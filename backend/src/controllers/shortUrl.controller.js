import { nanoid } from "nanoid";
import urlSchema from "../models/shorturl.model.js";

export const createShortUrl = async (req, res) => {
    const {url} = req.body;
    const short_url = nanoid(7);
    const newUrl = new urlSchema({
        short_url,
        long_url: url,
    });
    await newUrl.save();
    res.status(201).json({ short_url });
}

export const redirectUrl = async (req,res)=>{
    const {id} = req.params
    try {
        const dbRes = await urlSchema.findOne({short_url:id})
        res.redirect(dbRes.long_url)
    } catch (error) {
        res.status(404).json({
            "msg":"Some Error has occurred!!"
        })
    }
}