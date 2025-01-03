import { PRODUCT_CATEGORY } from '@/constants/products';

export type TProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: TProductCategory;
  is_new: boolean;
  is_best: boolean;
  color: string;
  description: string;
}
