import { CATEGORY_CODE } from '@/constants/category.constants';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, '상품명은 필수입니다'),
  price: z.number().positive('가격은 양수여야 합니다'),
  imageUrl: z.string().url('올바른 이미지 URL을 입력해주세요'),
  categoryCode: z.enum([CATEGORY_CODE.TWIN_BAG, CATEGORY_CODE.REMOOD_BAG, CATEGORY_CODE.CLO_BAG, CATEGORY_CODE.MINIMAL_BAG, CATEGORY_CODE.ACCESSORY]),
  description: z.string().optional(),
  isNew: z.boolean().optional(),
  isBest: z.boolean().optional(),
  color: z.string().min(1, '색상은 필수입니다'),
});
export const updateProductSchema = createProductSchema.partial();

export type TCreateProductDto = z.infer<typeof createProductSchema>;
export type TUpdateProductDto = z.infer<typeof updateProductSchema>;
