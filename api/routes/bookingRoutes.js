import { Router } from 'express'
import * as bookingController from '../controllers/bookingController.js'
import { validate } from '../middlewares/validate.js'
import { createBookingSchema } from '../utils/validationSchemas.js'

const router = Router()

router.post('/', validate(createBookingSchema), bookingController.createBooking)
router.get('/ref/:bookingRef', bookingController.getBookingByRef)
router.get('/user/:userId', bookingController.getUserBookings)
router.get('/:id', bookingController.getBooking)

export default router
