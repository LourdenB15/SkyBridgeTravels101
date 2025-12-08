import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export async function getHotels(sort = 'relevance', location) {
  const params = { sort }
  if (location) {
    params.location = location
  }
  const response = await api.get('/hotels', { params })
  return response.data
}

export async function getHotel(id) {
  const response = await api.get(`/hotels/${id}`)
  return response.data
}

export async function searchHotels(guests, sort = 'relevance', location) {
  const params = { guests, sort }
  if (location) {
    params.location = location
  }
  const response = await api.get('/hotels/search', { params })
  return response.data
}

export async function createBooking(data) {
  const response = await api.post('/bookings', data)
  return response.data
}

export async function getBookingByRef(bookingRef) {
  const response = await api.get(`/bookings/ref/${bookingRef}`)
  return response.data
}

export async function getUserBookings() {
  const response = await api.get('/bookings/user')
  return response.data
}

export async function createPaymentInvoice(bookingId) {
  const response = await api.post('/payments/create-invoice', { bookingId })
  return response.data
}

export async function cancelBooking(bookingId) {
  const response = await api.patch(`/bookings/${bookingId}/cancel`, {})
  return response.data
}

export default api
