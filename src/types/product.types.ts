import { z } from 'zod';

export const productResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  strapSize: z.number(),
  weight: z.number(),
  category: z.string(),
  isNew: z.boolean(),
  isBest: z.boolean(),
  color: z.string().optional(),
  description: z.string().optional(),
});

export const productListResponseSchema = z.object({
  data: z.array(productResponseSchema),
});

export type TProductResponse = z.infer<typeof productResponseSchema>;
export type TProductListResponse = z.infer<typeof productListResponseSchema>;
