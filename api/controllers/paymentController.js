import * as bookingService from '../services/bookingService.js'
import * as paymentService from '../services/paymentService.js'
import * as bookingRepository from '../repositories/bookingRepository.js'

export const createInvoice = async (req, res, next) => {
  try {
    const { bookingId } = req.body

    const booking = await bookingService.getBooking(bookingId)

    const invoice = await paymentService.createInvoice({
      bookingId: booking.id,
      amount: Number(booking.totalPrice),
      email: booking.guestEmail,
      description: `Booking ${booking.bookingRef} - ${booking.hotel.name}`,
      bookingRef: booking.bookingRef
    })

    await bookingRepository.updatePaymentId(booking.id, invoice.invoiceId)

    res.status(201).json({
      invoiceId: invoice.invoiceId,
      invoiceUrl: invoice.invoiceUrl,
      expiryDate: invoice.expiryDate,
      status: invoice.status
    })
  } catch (error) {
    next(error)
  }
}

export const handleWebhook = async (req, res, next) => {
  try {
    const callbackToken = req.headers['x-callback-token']
    const expectedToken = process.env.XENDIT_WEBHOOK_TOKEN

    if (expectedToken && callbackToken !== expectedToken) {
      return res.status(401).json({ error: 'Invalid callback token' })
    }

    const { external_id: bookingId, status, paid_at: paidAt } = req.body

    let bookingStatus
    switch (status) {
      case 'PAID':
      case 'SETTLED':
        bookingStatus = 'confirmed'
        break
      case 'EXPIRED':
        bookingStatus = 'expired'
        break
      case 'FAILED':
        bookingStatus = 'failed'
        break
      default:
        bookingStatus = 'pending'
    }

    await bookingService.updateBookingStatus(bookingId, bookingStatus)

    res.status(200).json({ received: true })
  } catch (error) {
    next(error)
  }
}
