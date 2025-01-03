import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  imageUrl: z.string().url(),
  categoryId: z.number().positive(),
  description: z.string(),
  isNew: z.boolean().optional(),
  isBest: z.boolean().optional(),
  color: z.string(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = Partial<CreateProductDto>;
