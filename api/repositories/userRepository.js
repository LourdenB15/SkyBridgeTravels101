import prisma from '../utils/prisma.js'

export const findByEmail = async (email) => {
  return prisma.user.findFirst({
    where: {
      email: email.toLowerCase(),
      deletedAt: null
    }
  })
}

export const findById = async (id) => {
  return prisma.user.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })
}

export const findByResetToken = async (resetToken) => {
  return prisma.user.findFirst({
    where: {
      resetToken,
      resetTokenExpiry: { gt: new Date() },
      deletedAt: null
    }
  })
}

export const create = async (userData) => {
  return prisma.user.create({
    data: {
      email: userData.email.toLowerCase(),
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName
    }
  })
}

export const updateResetToken = async (id, resetToken, resetTokenExpiry) => {
  return prisma.user.update({
    where: { id },
    data: { resetToken, resetTokenExpiry }
  })
}

export const updatePassword = async (id, password) => {
  return prisma.user.update({
    where: { id },
    data: { password, resetToken: null, resetTokenExpiry: null }
  })
}

export const clearResetToken = async (id) => {
  return prisma.user.update({
    where: { id },
    data: { resetToken: null, resetTokenExpiry: null }
  })
}

export const updateProfile = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName
    }
  })
}

export const deleteUser = async (id) => {
  const timestamp = Date.now()
  return prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      email: `deleted_${timestamp}_${id}`
    }
  })
}
