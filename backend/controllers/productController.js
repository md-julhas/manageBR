import createHttpError from "http-errors"

import { streamUpload } from "../utils/cloudinaryStreamUpload.js"
import { successReponse } from "../utils/responseHandlers.js"
import Product from "../models/productModel.js"

const uploadProduct = async (req, res, next) => {
  try {
    const {
      name,
      sku,
      category,
      brand,
      description,
      costPrice,
      sellingPrice,
      stock,
      unit,
    } = req.body

    // Check for duplicate product name or SKU
    const [existingName, existingSKU] = await Promise.all([
      Product.findOne({ name }),
      Product.findOne({ sku }),
    ])
    if (existingName) throw createHttpError(409, "Product name already exists")
    if (existingSKU) throw createHttpError(409, "Proudct SKU already exists")

    // Check if image is provided
    if (!req.file?.buffer) {
      throw createHttpError(400, "Image file is required")
    }

    // Check image size (limit to 1MB)
    if (req.file.buffer.length > 1 * 1024 * 1024) {
      throw createHttpError(400, "Product image must be less than 1MB")
    }

    // Upload image
    let uploadResult
    try {
      uploadResult = await streamUpload(req.file.buffer, "manageBR/products")
    } catch (err) {
      throw createHttpError(500, "Failed to upload image")
    }

    // Destructure secure_url and public_id from uploadResult
    const { secure_url, public_id } = uploadResult || {} // Fallback to empty object {} if uploadResult is undefined
    if (!secure_url || !public_id) {
      throw createHttpError(
        500,
        "Image upload failed: missing secure_url or public_id",
      )
    }

    // Create and save new product
    const newProduct = await Product.create({
      name,
      sku: sku.toUpperCase(),
      category,
      brand,
      description,
      costPrice: parseFloat(costPrice),
      sellingPrice: parseFloat(sellingPrice),
      stock,
      unit,
      image: secure_url,
      cloudinaryId: public_id,
    })

    // Send success response
    return successReponse(res, {
      statusCode: 201,
      message: "Product uploaded successfully",
      payload: newProduct,
    })
  } catch (error) {
    next(error)
  }
}

export { uploadProduct }
