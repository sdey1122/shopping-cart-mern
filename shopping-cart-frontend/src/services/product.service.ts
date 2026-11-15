import api from "./api";
import type {
  IProduct,
  IProductResponse,
  IProductsResponse,
} from "../types/product";

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await api.get<IProductsResponse>("/products");
  return response.data.products;
};

export interface ICreateProductPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: File;
}

export const createProduct = async (
  payload: ICreateProductPayload,
): Promise<IProduct> => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("price", String(payload.price));
  formData.append("category", payload.category);
  formData.append("stock", String(payload.stock));
  formData.append("image", payload.image, payload.image.name);

  // Let the browser/Axios generate the multipart boundary automatically.
  const response = await api.post<IProductResponse>("/products", formData);

  return response.data.product;
};
