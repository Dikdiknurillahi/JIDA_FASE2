import { object, string } from 'zod';

export const SignInSchema = object({
  email: string()
    .email({ message: 'Invalid email address' }),
  password: string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must not exceed 100 characters' })
});

export const RegisterSchema = object({
  name: string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  email: string()
    .email({ message: 'Invalid email address' }),
  password: string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must not exceed 100 characters' }),
  ConfirmPassword: string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must not exceed 100 characters' }),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: 'Passwords do not match',
  path: ['ConfirmPassword']
});