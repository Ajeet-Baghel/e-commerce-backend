// controller/orderController.js
const orderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");
const { isValid } = require("./validator");

// Place Order
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { shippingAddress } = req.body;

    if (!isValid(shippingAddress)) {
      return res.status(400).json({ msg: "Shipping address is required" });
    }

    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Your cart is empty" });
    }

    const order = await orderModel.create({
      userId,
      items: cart.items,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      shippingAddress,
    });

    // Clear the cart
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json({ msg: "Order placed successfully", order });
  } catch (error) {
    console.error("Place Order Error:", error);
    return res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await orderModel
      .find({ userId })
      .populate("items.productId", "productName price productImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({ msg: "Orders fetched", orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    return res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { orderId } = req.params;

    console.log("Cancel Order Request:", { orderId, userId });

    const order = await orderModel.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    if (order.orderStatus === "cancelled") {
      return res.status(400).json({ msg: "Order already cancelled" });
    }

    order.orderStatus = "cancelled";
    await order.save();

    return res.status(200).json({ msg: "Order cancelled successfully" });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    return res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  cancelOrder,
};
