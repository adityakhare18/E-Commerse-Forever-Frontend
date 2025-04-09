import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js"; // Middleware to check if the user is an admin

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
); // Route to add a product

productRouter.get("/list", adminAuth, listProducts); // Route to list all products
productRouter.post("/remove", removeProduct); // Route to remove a product by ID
productRouter.post("/single", singleProduct); // Route to get a single product by ID

export default productRouter;
