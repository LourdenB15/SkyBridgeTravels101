import { z } from 'zod'

export const createBookingSchema = z.object({
  hotelId: z.string().uuid({ message: 'Invalid hotel ID format' }),
  roomId: z.string().uuid({ message: 'Invalid room ID format' }),
  clerkUserId: z.string().min(1, { message: 'User ID is required' }),
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
