import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, '상품명은 필수입니다'),
  price: z.number().positive('가격은 양수여야 합니다'),
  imageUrl: z.string().url('올바른 이미지 URL을 입력해주세요'),
  categoryId: z.number().positive('유효한 카테고리를 선택해주세요'),
  description: z.string().min(1, '상품 설명은 필수입니다'),
  isNew: z.boolean().optional(),
  isBest: z.boolean().optional(),
  color: z.string().min(1, '색상은 필수입니다'),
});

export const updateProductSchema = createProductSchema.partial();
