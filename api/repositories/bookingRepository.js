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

export const findByUserId = async (clerkUserId) => {
  return prisma.booking.findMany({
    where: { clerkUserId },
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
