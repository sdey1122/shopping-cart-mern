export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export interface IProductResponse {
  success: boolean;
  product: IProduct;
}

export interface IProductsResponse {
  success: boolean;
  products: IProduct[];
}
