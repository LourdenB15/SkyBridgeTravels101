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

export async function createBooking(data, token) {
  const response = await api.post('/bookings', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export async function getBookingByRef(bookingRef) {
  const response = await api.get(`/bookings/ref/${bookingRef}`)
  return response.data
}

export async function getUserBookings(token) {
  const response = await api.get('/bookings/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default api
