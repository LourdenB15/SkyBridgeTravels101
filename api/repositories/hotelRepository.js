import prisma from '../utils/prisma.js'

export const findAll = async (sortBy = 'relevance', location = null) => {
  const where = location
    ? { address: { contains: location, mode: 'insensitive' } }
    : {}

  if (sortBy === 'price') {
    const hotels = await prisma.hotel.findMany({
      where,
      include: {
        rooms: {
          where: { available: true },
          orderBy: { pricePerNight: 'asc' },
          take: 1
        }
      }
    })

    return hotels
      .filter(hotel => hotel.rooms.length > 0)
      .sort((a, b) => {
        const priceA = a.rooms[0]?.pricePerNight || Infinity
        const priceB = b.rooms[0]?.pricePerNight || Infinity
        return Number(priceA) - Number(priceB)
      })
      .map(hotel => ({
        ...hotel,
        minPrice: hotel.rooms[0]?.pricePerNight || null
      }))
  }

  const hotels = await prisma.hotel.findMany({
    where,
    include: {
      rooms: {
        where: { available: true },
        orderBy: { pricePerNight: 'asc' },
        take: 1
      }
    },
    orderBy: location ? undefined : { rating: 'desc' }
  })

  if (location) {
    const lowerLocation = location.toLowerCase()
    hotels.sort((a, b) => {
      const aMatch = a.address.toLowerCase().includes(lowerLocation)
      const bMatch = b.address.toLowerCase().includes(lowerLocation)
      if (aMatch && !bMatch) return -1
      if (!aMatch && bMatch) return 1
      return b.rating - a.rating
    })
  }

  return hotels.map(hotel => ({
    ...hotel,
    minPrice: hotel.rooms[0]?.pricePerNight || null
  }))
}

export const findById = async (id) => {
  return prisma.hotel.findUnique({
    where: { id },
    include: {
      rooms: {
        where: { available: true },
        orderBy: { pricePerNight: 'asc' }
      }
    }
  })
}

export const findWithAvailableRooms = async (minGuests = 1, location = null) => {
  const where = {
    rooms: {
      some: {
        available: true,
        maxGuests: { gte: minGuests }
      }
    }
  }

  if (location) {
    where.address = { contains: location, mode: 'insensitive' }
  }

  const hotels = await prisma.hotel.findMany({
    where,
    include: {
      rooms: {
        where: {
          available: true,
          maxGuests: { gte: minGuests }
        },
        orderBy: { pricePerNight: 'asc' }
      }
    }
  })

  return hotels.map(hotel => ({
    ...hotel,
    minPrice: hotel.rooms[0]?.pricePerNight || null
  }))
}
