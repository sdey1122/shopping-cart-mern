import { Router } from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), createProduct);

export default router;
