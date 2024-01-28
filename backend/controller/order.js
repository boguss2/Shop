const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");

const validateCreateOrder = (req, res, next) => {
  const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return next(new ErrorHandler("Invalid cart data", 400));
  }

  if (!shippingAddress || typeof shippingAddress !== "object") {
    return next(new ErrorHandler("Invalid shipping address", 400));
  }

  if (!user || typeof user !== "object" || !user._id) {
    return next(new ErrorHandler("Invalid user data", 400));
  }

  if (isNaN(totalPrice) || totalPrice <= 0) {
    return next(new ErrorHandler("Invalid total price", 400));
  }

  if (!paymentInfo || typeof paymentInfo !== "object") {
    return next(new ErrorHandler("Invalid payment information", 400));
  }

  next();
};


router.post(
  "/create-order",
  isAuthenticated,
  validateCreateOrder,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      const orders = [];

      const order = await Order.create({
        cart,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });

      orders.push(order);

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.get(
  "/get-all-orders/:userId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-order-status/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/get-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;