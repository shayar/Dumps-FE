import { z } from 'zod';
import { dumpSchema } from './dump';
import { bundleResponseSchema } from './bundle';

const cartSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  totalPrice: z.string(),
  items: z.array(z.union([dumpSchema, bundleResponseSchema])),
});

const addToCartSchema = z.object({
  productId: z.string().optional(),
  bundleId: z.string().optional(),
});

// Infer types from the common schema
type CartResponse = z.infer<typeof cartSchema>;
type AddToCartRequest = z.infer<typeof addToCartSchema>;

export { cartSchema, addToCartSchema };
export type { CartResponse, AddToCartRequest };
