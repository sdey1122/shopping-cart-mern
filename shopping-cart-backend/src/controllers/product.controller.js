import { Product } from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";
import { productSchema } from "../validators/product.validator.js";

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "shopping-cart/products", resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });

export const getProducts = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
      convert: true,
    });

    if (error) {
      res.status(400).json({
        success: false,
        message: "Product validation failed",
        errors: error.details.map((detail) => detail.message),
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Product image is required",
      });
      return;
    }

    const imageUrl = await uploadToCloudinary(req.file);
    const product = await Product.create({ ...value, image: imageUrl });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};
