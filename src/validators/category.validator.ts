import { z } from 'zod';
import { CATEGORY_CODE } from '@/constants/category.constants';

export const categorySchema = z.object({
  code: z.enum([CATEGORY_CODE.TWIN_BAG, CATEGORY_CODE.REMOOD_BAG, CATEGORY_CODE.CLO_BAG, CATEGORY_CODE.MINIMAL_BAG, CATEGORY_CODE.ACCESSORY]),
  name: z.string(),
});

export type TCategoryDto = z.infer<typeof categorySchema>;
