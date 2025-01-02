import { PRODUCT_CATEGORY } from '@/constants/products';

export type TProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

export interface ProductResponseDto {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category_name: string;
  is_new: boolean;
  is_best: boolean;
  color: string;
  description: string;
}
