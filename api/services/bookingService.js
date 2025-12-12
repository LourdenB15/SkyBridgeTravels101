import * as bookingRepository from '../repositories/bookingRepository.js'
import { createRefund } from './paymentService.js'
import { NotFoundError } from '../middlewares/errorHandler.js'

const BOOKING_REF_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const TAX_RATE = 0.12

const generateBookingRef = () => {
  let ref = 'SKY-'
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * BOOKING_REF_CHARS.length)
    ref += BOOKING_REF_CHARS[randomIndex]
  }
  return ref
}

export const calculateTotal = (roomPrice, nights) => {
  const stay = Number(roomPrice) * nights
  const tax = stay * TAX_RATE
  const total = stay + tax
  return { stay, tax, total }
}

export const createBooking = async (data) => {
  const { roomPrice, nights, checkInDate, checkOutDate, ...bookingData } = data
  const { total } = calculateTotal(roomPrice, nights)

  const booking = await bookingRepository.create({
    ...bookingData,
    checkInDate: new Date(checkInDate),
    checkOutDate: new Date(checkOutDate),
    bookingRef: generateBookingRef(),
    totalPrice: total,
    status: 'pending'
  })

  return booking
}

export const getBooking = async (id) => {
  const booking = await bookingRepository.findById(id)

  if (!booking) {
    throw new NotFoundError('Booking not found')
  }

  return booking
}

export const getBookingByRef = async (bookingRef) => {
  const booking = await bookingRepository.findByRef(bookingRef)

  if (!booking) {
    throw new NotFoundError('Booking not found')
  }

  return booking
}

export const getUserBookings = async (userId) => {
  await bookingRepository.markCompletedBookings(userId)
  return bookingRepository.findByUserId(userId)
}

export const updateBookingStatus = async (id, status) => {
  const booking = await bookingRepository.findById(id)

  if (!booking) {
    throw new NotFoundError('Booking not found')
  }

  return bookingRepository.updateStatus(id, status)
}

export const cancelBooking = async (id, userId) => {
  const booking = await bookingRepository.findById(id)

  if (!booking) {
    throw new NotFoundError('Booking not found')
  }

  if (booking.userId !== userId) {
    throw new NotFoundError('Booking not found')
  }

  if (booking.status === 'cancelled') {
    throw new Error('Booking is already cancelled')
  }

  if (booking.status === 'completed') {
    throw new Error('Cannot cancel a completed booking')
  }

  if (booking.status === 'confirmed') {
    const checkInDate = new Date(booking.checkInDate)
    const now = new Date()
    const diffTime = checkInDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 7) {
      throw new Error('Bookings cannot be cancelled within 7 days of check-in date')
    }

    if (booking.paymentId) {
      await createRefund({
        invoiceId: booking.paymentId,
        amount: Number(booking.totalPrice),
        reason: 'REQUESTED_BY_CUSTOMER'
      })
    }
  }

  return bookingRepository.updateStatus(id, 'cancelled')
}
