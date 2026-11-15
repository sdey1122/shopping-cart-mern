import * as yup from "yup";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const productSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be 100 characters or fewer")
    .required("Product name is required"),
  description: yup
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters")
    .max(2000, "Description must be 2000 characters or fewer")
    .required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  category: yup
    .string()
    .trim()
    .min(2, "Category must be at least 2 characters")
    .max(80, "Category must be 80 characters or fewer")
    .required("Category is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .integer("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  image: yup
    .mixed<File>()
    .required("Product image is required")
    .test("file-size", "Image must be 5 MB or smaller", (file) => {
      if (!file) return false;
      return typeof file.size === "number" && file.size <= MAX_IMAGE_SIZE;
    })
    .test("file-type", "Please select an image file", (file) => {
      if (!file) return false;
      return typeof file.type === "string" && file.type.startsWith("image/");
    }),
});

export type ProductFormValues = yup.InferType<typeof productSchema>;
