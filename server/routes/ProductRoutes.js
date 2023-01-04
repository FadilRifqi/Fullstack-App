import express from "express";
import {
  createProduct,
  deleteProduct,
  getMyProduct,
  getProductById,
  getProducts,
  searchProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/Products", verifyUser, getProducts);
router.get("/products/me", verifyUser, getMyProduct);
router.get("/Products/:id", verifyUser, getProductById);
router.get("/search/:id", verifyUser, searchProduct);
router.post("/Products", verifyUser, createProduct);
router.patch("/Products/:id", verifyUser, updateProduct);
router.delete("/Products/:id", verifyUser, deleteProduct);

export default router;
