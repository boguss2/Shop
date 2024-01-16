const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");

// create product by admin
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const productData = req.body;
      productData.images = imageUrls;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product by admin
router.delete(
  "/delete-product/:id",
  isAuthenticated,
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      await product.remove();

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product by user
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user: req.user._id,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id.toString() === req.user._id.toString()) {
            (rev.rating = rating), (rev.comment = comment);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
