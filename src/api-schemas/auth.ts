import { z } from 'zod';

// Define a common schema for login
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .trim()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const registerSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  lastName: z.string().trim().min(1, 'Last Name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .trim()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

// Infer types from the common schema
type LoginDetails = z.infer<typeof loginSchema>;
type RegisterDetails = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema };
export type { LoginDetails, RegisterDetails };
