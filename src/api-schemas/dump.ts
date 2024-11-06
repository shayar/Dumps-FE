import { z } from 'zod';

const dumpSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  price: z.string().min(1, "Price is required"),
  discount: z.string().min(1, "Discount is required"),
  pdfFile: z.any().optional(),
});

// Infer types from the common schema
type DumpDetails = z.infer<typeof dumpSchema>;

export { dumpSchema };
export type { DumpDetails };
