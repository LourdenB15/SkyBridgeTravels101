import { z } from 'zod'

export const createBookingSchema = z.object({
  hotelId: z.string().uuid({ message: 'Invalid hotel ID format' }),
  roomId: z.string().uuid({ message: 'Invalid room ID format' }),
  guestFirstName: z.string().min(1, { message: 'First name is required' }),
  guestLastName: z.string().min(1, { message: 'Last name is required' }),
  guestEmail: z.string().email({ message: 'Invalid email format' }),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Check-in date must be in YYYY-MM-DD format' }),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Check-out date must be in YYYY-MM-DD format' }),
  numberOfGuests: z.number().int().min(1, { message: 'At least 1 guest is required' }),
  roomPrice: z.number().positive({ message: 'Room price must be positive' }),
  nights: z.number().int().min(1, { message: 'At least 1 night is required' })
}).refine(
  (data) => new Date(data.checkOutDate) > new Date(data.checkInDate),
  { message: 'Check-out date must be after check-in date', path: ['checkOutDate'] }
)

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' })
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(1, { message: 'Password is required' })
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' })
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: 'Reset token is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
})

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' })
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Current password is required' }),
  newPassword: z.string().min(8, { message: 'New password must be at least 8 characters' })
})
