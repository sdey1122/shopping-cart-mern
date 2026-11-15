import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  productSchema,
  type ProductFormValues,
} from "../validation/product.schema";
import { createProduct } from "../services/product.service";
import type { IProduct } from "../types/product";

interface Props {
  onCreated: (product: IProduct) => void;
}

const ProductForm = ({ onCreated }: Props) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
    defaultValues: { stock: 0 },
  });

  const selectedImage = watch("image");

  const onSubmit = async (values: ProductFormValues) => {
    setMessage("");
    setErrorMessage("");

    try {
      const product = await createProduct(values);

      onCreated(product);
      setMessage("Product created successfully.");

      reset({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        image: undefined,
      });

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Product creation failed:", error);

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data as
          | { message?: string; error?: string }
          | undefined;

        setErrorMessage(
          responseData?.message ||
            responseData?.error ||
            `Could not create product (HTTP ${error.response?.status ?? "network error"}).`,
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Could not create product. Please try again.");
      }
    }
  };

  const handleInvalidSubmit = () => {
    setMessage("");
  };

  return (
    <details className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
      <summary className="cursor-pointer font-semibold text-slate-800">
        Add a product (image required, max 5 MB)
      </summary>

      <form
        onSubmit={handleSubmit(onSubmit, handleInvalidSubmit)}
        encType="multipart/form-data"
        className="mt-5 grid gap-4 sm:grid-cols-2"
      >
        <label className="grid gap-1 text-sm font-medium">
          Product name
          <input
            {...register("name")}
            className="rounded-lg border px-3 py-2 font-normal"
            placeholder="Wireless headphones"
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Category
          <input
            {...register("category")}
            className="rounded-lg border px-3 py-2 font-normal"
            placeholder="Electronics"
          />
          {errors.category && (
            <span className="text-xs text-red-600">
              {errors.category.message}
            </span>
          )}
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Price (₹)
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("price")}
            className="rounded-lg border px-3 py-2 font-normal"
          />
          {errors.price && (
            <span className="text-xs text-red-600">{errors.price.message}</span>
          )}
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Stock
          <input
            type="number"
            min="0"
            step="1"
            {...register("stock")}
            className="rounded-lg border px-3 py-2 font-normal"
          />
          {errors.stock && (
            <span className="text-xs text-red-600">{errors.stock.message}</span>
          )}
        </label>

        <label className="grid gap-1 text-sm font-medium sm:col-span-2">
          Description
          <textarea
            rows={3}
            {...register("description")}
            className="rounded-lg border px-3 py-2 font-normal"
          />
          {errors.description && (
            <span className="text-xs text-red-600">
              {errors.description.message}
            </span>
          )}
        </label>

        <div className="grid gap-1 text-sm font-medium sm:col-span-2">
          <label htmlFor="product-image">
            Product image (required, max 5 MB)
          </label>

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => (
              <input
                id="product-image"
                type="file"
                accept="image/*"
                className="rounded-lg border p-2 font-normal"
                name="image"
                ref={(element) => {
                  ref(element);
                  imageInputRef.current = element;
                }}
                onBlur={onBlur}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] ?? undefined;
                  onChange(file);
                }}
              />
            )}
          />

          {selectedImage instanceof File && (
            <span className="text-xs text-slate-500">
              {selectedImage.name} ·{" "}
              {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
            </span>
          )}

          {errors.image && (
            <span className="text-xs text-red-600">{errors.image.message}</span>
          )}
        </div>

        {errorMessage && (
          <p role="alert" className="sm:col-span-2 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {message && (
          <p role="status" className="sm:col-span-2 text-sm text-green-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:opacity-50 sm:col-span-2"
        >
          {isSubmitting ? "Uploading..." : "Create product"}
        </button>
      </form>
    </details>
  );
};

export default ProductForm;
