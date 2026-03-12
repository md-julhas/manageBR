import { body } from "express-validator"

export const uploadProductValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product name must be 3–100 characters"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required")
    .isAlphanumeric()
    .withMessage("SKU must be alphanumeric")
    .isLength({ min: 3 })
    .withMessage("SKU must be at least 3 characters"),

  body("category").notEmpty().withMessage("Category is required"),

  body("brand").optional().isString().withMessage("Brand must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("costPrice")
    .notEmpty()
    .withMessage("Cost price is required")
    .isFloat({ gt: 0 })
    .withMessage("Cost price must be a number greater than 0"),

  body("sellingPrice")
    .notEmpty()
    .withMessage("Selling price is required")
    .isFloat({ gt: 0 })
    .withMessage("Selling price must be a number greater than 0"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("sold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sold must be a non-negative integer"),

  body("unit").optional().isString().withMessage("Unit must be a string"),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be a number ≥ 0"),
]

export const userValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("User name must be 3-50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "password must be at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)"
    ),

  body("role")
    .optional()
    .isIn(["user", "employee", "administrator"])
    .withMessage("Invalid role"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long"),

  body("phone").notEmpty().withMessage("Phone number is required"),
]

export const userLoginValidatonRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "password must be at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)"
    ),
]
