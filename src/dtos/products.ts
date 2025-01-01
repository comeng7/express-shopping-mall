import { PRODUCT_CATEGORY } from '@/constants/products';

export type TProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

export interface ProductResponseDto {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: TProductCategory;
  description: string;
  isNew: boolean;
  isBest: boolean;
  viewCount: number;
  salesCount: number;
  createdAt: Date;
}
