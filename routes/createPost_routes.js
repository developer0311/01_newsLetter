import express from "express";
import { upload } from "../middlewares/multer.js"; // adjust path as needed
import { createPost, updatePost } from "../controllers/createPosts_controllers.js"

const router = express.Router();

router.post("/posts/create", upload.single("image"), createPost);
router.post("/posts/update/:id", upload.single("image"), updatePost);


export default router;