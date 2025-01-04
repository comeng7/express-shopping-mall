import { z } from 'zod';
import { createProductSchema, updateProductSchema } from '@/validators/product.validator';

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
