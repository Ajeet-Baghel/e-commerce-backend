const express = require("express");
const Route = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userModel = require("../models/userModel");

// Controllers
const {
  addUsers,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  googleLoginUser,
} = require("../controllers/userController");

const {
  addProducts,
  getAllProducts,
  getProductById,
  getProductsByQuery,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  addToCart,
  getCart,
  updateCart,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cartController");

const {
  placeOrder,
  getMyOrders,
  cancelOrder,
} = require("../controllers/orderController");

const { generateProductContent } = require("../controllers/aiController");

// USER Routes
Route.post("/addUser", addUsers);
Route.get("/getAllUsers", authMiddleware, getUsers);
Route.put("/updateUser/:id", authMiddleware, updateUser);
Route.delete("/deleteUser/:id", authMiddleware, deleteUser);
Route.post("/login", loginUser);
Route.post("/auth/google", googleLoginUser);

// PROFILE Route
Route.get("/user/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// PRODUCT Routes
Route.post("/addProducts", authMiddleware, addProducts);
Route.get("/getAllProducts", getAllProducts);
Route.get("/getProductById/:id", getProductById);
Route.get("/getProductsByQuery", getProductsByQuery);
Route.put("/updateProduct/:id", authMiddleware, updateProduct);
Route.delete("/deleteProduct/:id", authMiddleware, deleteProduct);

// AI Routes
Route.post("/ai/product-content", authMiddleware, generateProductContent);

// CART Routes
Route.post("/addToCart", authMiddleware, addToCart);
Route.get("/getCart", authMiddleware, getCart);
Route.put("/updateCart", authMiddleware, updateCart);
Route.delete("/removeItem/:productId", authMiddleware, removeItemFromCart);
Route.delete("/clearCart", authMiddleware, clearCart);

// ORDER Routes
Route.post("/placeOrder", authMiddleware, placeOrder);
Route.get("/getMyOrder", authMiddleware, getMyOrders);
Route.delete("/cancelOrder/:id", authMiddleware, cancelOrder);
Route.get("/hello", (req, res) => res.send("Hello World!"));

module.exports = Route;
