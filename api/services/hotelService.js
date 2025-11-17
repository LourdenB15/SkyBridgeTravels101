import * as hotelRepository from '../repositories/hotelRepository.js'
import { NotFoundError } from '../middlewares/errorHandler.js'

export const getAllHotels = async (sortBy = 'relevance', location = null) => {
  return hotelRepository.findAll(sortBy, location)
}

export const getHotelById = async (id) => {
  const hotel = await hotelRepository.findById(id)

  if (!hotel) {
    throw new NotFoundError('Hotel not found')
  }

  return hotel
}

export const searchHotels = async (guests = 1, sortBy = 'relevance', location = null) => {
  const hotels = await hotelRepository.findWithAvailableRooms(guests, location)

  if (sortBy === 'price') {
    return hotels.sort((a, b) => {
      const priceA = a.minPrice || Infinity
      const priceB = b.minPrice || Infinity
      return Number(priceA) - Number(priceB)
    })
  }

  if (location) {
    const lowerLocation = location.toLowerCase()
    return hotels.sort((a, b) => {
      const aMatch = a.address.toLowerCase().includes(lowerLocation)
      const bMatch = b.address.toLowerCase().includes(lowerLocation)
      if (aMatch && !bMatch) return -1
      if (!aMatch && bMatch) return 1
      return b.rating - a.rating
    })
  }

  return hotels.sort((a, b) => b.rating - a.rating)
}
