import express from "express";
import { createShortUrl, redirectUrl } from "../controllers/shortUrl.controller.js";
const router = express.Router()


router.post("/",createShortUrl)
router.get("/:id",redirectUrl)


export default router