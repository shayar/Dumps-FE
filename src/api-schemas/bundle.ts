import { z } from 'zod';
import { dumpSchema } from './dump';

// Create a separate schema for creating/updating bundle
const bundleRequestSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  discountedPrice: z.string().min(1, 'Discounted Price is required'),
  productIds: z
    .string()
    .array()
    .min(2, 'Bundle should have at least 2 products.'),
});

// Schema for fetched bundle with full product details
const bundleResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  discountedPrice: z.string(),
  products: z.array(dumpSchema),
});

// Infer types from schemas
type BundleRequest = z.infer<typeof bundleRequestSchema>;
type BundleResponse = z.infer<typeof bundleResponseSchema>;

export { bundleRequestSchema, bundleResponseSchema };
export type { BundleRequest, BundleResponse };
