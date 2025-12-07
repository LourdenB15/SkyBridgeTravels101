import prisma from '../utils/prisma.js'

export const create = async (bookingData) => {
  return prisma.booking.create({
    data: bookingData,
    include: {
      hotel: true,
      room: true
    }
  })
}

export const findById = async (id) => {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      hotel: true,
      room: true
    }
  })
}

export const findByRef = async (bookingRef) => {
  return prisma.booking.findUnique({
    where: { bookingRef },
    include: {
      hotel: true,
      room: true
    }
  })
}

export const findByUserId = async (userId) => {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      hotel: true,
      room: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const updateStatus = async (id, status) => {
  return prisma.booking.update({
    where: { id },
    data: { status },
    include: {
      hotel: true,
      room: true
    }
  })
}

export const updatePaymentId = async (id, paymentId) => {
  return prisma.booking.update({
    where: { id },
    data: { paymentId },
    include: {
      hotel: true,
      room: true
    }
  })
}

export const markCompletedBookings = async (userId) => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  return prisma.booking.updateMany({
    where: {
      userId,
      status: 'confirmed',
      checkOutDate: { lt: now }
    },
    data: { status: 'completed' }
  })
}
