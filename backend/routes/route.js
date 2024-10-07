import express from "express"
import { userSignup, userLogin } from "../controller/userController.js";
import { getProducts, getProductById } from "../controller/productController.js";
import { deleteMany, fetchCart, removeCartItem, updateCart } from "../controller/cartController.js";
import { paymentSuccess } from "../controller/paymentController.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/products", getProducts);
router.get("/productDetail/:id", getProductById);
router.get("/cart", fetchCart);
router.post("/cart/update", updateCart);
router.post("/cart/remove", removeCartItem);
router.post("/order", paymentSuccess);
router.delete("/cart/clear", deleteMany);
export default router;