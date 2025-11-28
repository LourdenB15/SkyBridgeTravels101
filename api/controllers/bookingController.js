import * as bookingService from '../services/bookingService.js'

export const createBooking = async (req, res, next) => {
  try {
    const bookingData = {
      ...req.body,
      clerkUserId: req.auth.userId
    }
    const booking = await bookingService.createBooking(bookingData)
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
    const bookings = await bookingService.getUserBookings(req.auth.userId)
    res.json(bookings)
  } catch (error) {
    next(error)
  }
}
