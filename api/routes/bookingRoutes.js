import { Router } from 'express'
import * as bookingController from '../controllers/bookingController.js'
import { validate } from '../middlewares/validate.js'
import { createBookingSchema } from '../utils/validationSchemas.js'
import { requireAuthentication } from '../middlewares/auth.js'

const router = Router()

router.post('/', requireAuthentication, validate(createBookingSchema), bookingController.createBooking)
router.get('/ref/:bookingRef', bookingController.getBookingByRef)
router.get('/user', requireAuthentication, bookingController.getUserBookings)
router.get('/:id', bookingController.getBooking)
router.patch('/:id/cancel', requireAuthentication, bookingController.cancelBooking)

export default router
