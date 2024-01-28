const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");

router.post(
  "/create-product",
  isAuthenticated,
  isAdmin("Admin"),
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const files = req.files;
      let imageUrls = [];

      if (files) {
        imageUrls = files.map((file) => `${file.filename}`);
      }

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
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    console.log('Inside delete product route handler');
    try {
      const product = await Product.findById(req.params.id);
      console.log('Found product:', product);
    
      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      console.log('About to delete product:', product);
      await Product.deleteOne({ _id: req.params.id });
      console.log('Product deleted successfully');

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      console.error('Error occurred while deleting product:', error);
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
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);


      if (!product) {
        return next(new ErrorHandler(`This product has been removed from the store`, 404));
      }
      
      const review = {
        user,
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

// update product by admin
router.put(
  "/admin-update-product/:id",
  isAuthenticated,
  isAdmin("Admin"),
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      const files = req.files;
      let imageUrls = [];

      if (files) {
        imageUrls = files.map((file) => `${file.filename}`);
      }

      const productData = req.body;
      productData.images = imageUrls;

      product = await Product.findByIdAndUpdate(req.params.id, { $set: productData }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Remove a review
router.put(
  "/:productId/review/:reviewId",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      let product = await Product.findById(req.params.productId);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // Find the review in the product's reviews array and remove it
      const reviewIndex = product.reviews.findIndex(review => review._id.toString() === req.params.reviewId);
      if (reviewIndex === -1) {
        return next(new ErrorHandler("Review not found", 404));
      }
      product.reviews.splice(reviewIndex, 1);

      // Save the product with the updated reviews array
      product = await product.save();

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products
router.get(
  "/all-products",
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
