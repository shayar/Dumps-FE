import { z } from 'zod';
import { dumpSchema } from './dump';
import { bundleResponseSchema } from './bundle';

const cartSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  totalPrice: z.string(),
  items: z.array(z.union([dumpSchema, bundleResponseSchema])),
});

// Infer types from the common schema
type CartResponse = z.infer<typeof cartSchema>;

export { cartSchema };
export type { CartResponse };
