import { Invoice } from 'xendit-node'

let invoiceClient = null

const getInvoiceClient = () => {
  if (!invoiceClient) {
    invoiceClient = new Invoice({
      secretKey: process.env.XENDIT_SECRET_KEY
    })
  }
  return invoiceClient
}

const FRONTEND_URL = process.env.CORS_ORIGIN || 'http://localhost:5173'

export const createInvoice = async ({ bookingId, amount, email, description, bookingRef }) => {
  const invoice = await getInvoiceClient().createInvoice({
    data: {
      externalId: bookingId,
      amount: amount,
      payerEmail: email,
      description: description,
      currency: 'PHP',
      invoiceDuration: 86400,
      successRedirectUrl: `${FRONTEND_URL}/confirmation/${bookingRef}`,
      failureRedirectUrl: `${FRONTEND_URL}/booking/failed/${bookingRef}`
    }
  })

  return {
    invoiceId: invoice.id,
    invoiceUrl: invoice.invoiceUrl,
    expiryDate: invoice.expiryDate,
    status: invoice.status
  }
}

export const getInvoice = async (invoiceId) => {
  const invoice = await getInvoiceClient().getInvoiceById({
    invoiceId: invoiceId
  })

  return {
    invoiceId: invoice.id,
    invoiceUrl: invoice.invoiceUrl,
    externalId: invoice.externalId,
    status: invoice.status,
    amount: invoice.amount,
    paidAt: invoice.paidAt
  }
}