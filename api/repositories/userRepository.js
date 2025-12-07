import prisma from '../utils/prisma.js'

export const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  })
}

export const findById = async (id) => {
  return prisma.user.findUnique({
    where: { id }
  })
}

export const findByResetToken = async (resetToken) => {
  return prisma.user.findFirst({
    where: {
      resetToken,
      resetTokenExpiry: { gt: new Date() }
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
