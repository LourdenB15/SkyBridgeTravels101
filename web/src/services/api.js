import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
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

export default api
