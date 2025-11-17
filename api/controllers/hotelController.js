import * as hotelService from '../services/hotelService.js'

export const getHotels = async (req, res, next) => {
  try {
    const { sort = 'relevance', location } = req.query
    const hotels = await hotelService.getAllHotels(sort, location || null)
    res.json(hotels)
  } catch (error) {
    next(error)
  }
}

export const getHotel = async (req, res, next) => {
  try {
    const { id } = req.params
    const hotel = await hotelService.getHotelById(id)
    res.json(hotel)
  } catch (error) {
    next(error)
  }
}

export const searchHotels = async (req, res, next) => {
  try {
    const { guests = '1', sort = 'relevance', location } = req.query
    const guestCount = parseInt(guests, 10) || 1
    const hotels = await hotelService.searchHotels(guestCount, sort, location || null)
    res.json(hotels)
  } catch (error) {
    next(error)
  }
}
