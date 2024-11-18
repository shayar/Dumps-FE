import { z } from 'zod';

const bundleSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  discountedPrice: z.string().min(1, 'Discounted Price is required'),
  productIds: z
    .string()
    .array()
    .min(2, 'Bundle should have at least 2 products.'),
});

// Infer types from the common schema
type BundleDetails = z.infer<typeof bundleSchema>;

export { bundleSchema };
export type { BundleDetails };
