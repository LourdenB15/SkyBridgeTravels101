import { Router } from 'express'
import * as bookingController from '../controllers/bookingController.js'

const router = Router()

router.post('/', bookingController.createBooking)
router.get('/ref/:bookingRef', bookingController.getBookingByRef)
router.get('/user/:userId', bookingController.getUserBookings)
router.get('/:id', bookingController.getBooking)

export default router
