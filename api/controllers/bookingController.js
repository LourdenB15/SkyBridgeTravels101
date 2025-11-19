import * as bookingService from '../services/bookingService.js'

export const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body)
    res.status(201).json(booking)
  } catch (error) {
    next(error)
  }
}

export const getBooking = async (req, res, next) => {
  try {
    const { id } = req.params
    const booking = await bookingService.getBooking(id)
    res.json(booking)
  } catch (error) {
    next(error)
  }
}

export const getBookingByRef = async (req, res, next) => {
  try {
    const { bookingRef } = req.params
    const booking = await bookingService.getBookingByRef(bookingRef)
    res.json(booking)
  } catch (error) {
    next(error)
  }
}

export const getUserBookings = async (req, res, next) => {
  try {
    const { userId } = req.params
    const bookings = await bookingService.getUserBookings(userId)
    res.json(bookings)
  } catch (error) {
    next(error)
  }
}
