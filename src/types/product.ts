export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  mainImageUrl?: string;
  gallery?: { imageUrl: string }[];
  category: string;
  price: number;
  stockQuantity: number;
  discountPrice?: number;
  sizes?: string[];
  colors?: string[];
  description?: string | any[];
  isFeatured?: boolean;
  createdAt?: string;
};
