import express from 'express'
import * as paymentController from '../controllers/paymentController.js'
import { requireAuthentication } from '../middlewares/auth.js'

const router = express.Router()

router.post('/create-invoice', requireAuthentication, paymentController.createInvoice)
router.post('/webhook', paymentController.handleWebhook)

export default router
