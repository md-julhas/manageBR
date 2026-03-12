import { Schema, model } from "mongoose"

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be minimun 3 characters"],
      maxlength: [100, "Product name cannot exceed 100 characters"],
      index: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
      default: "Generic",
    },
    description: {
      type: String,
      default: "",
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    unit: {
      type: String,
      default: "pcs",
    },
    discount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    cloudinaryId: {
      type: String,
    },
  },
  { timestamps: true },
)

const Product = model("products", productSchema)

export default Product
