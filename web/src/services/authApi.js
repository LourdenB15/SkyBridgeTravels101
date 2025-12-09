import axios from 'axios'

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export async function register(email, password, firstName, lastName) {
  const response = await authApi.post('/auth/register', {
    email,
    password,
    firstName,
    lastName
  })
  return response.data
}

export async function login(email, password) {
  const response = await authApi.post('/auth/login', {
    email,
    password
  })
  return response.data
}

export async function logout() {
  const response = await authApi.post('/auth/logout')
  return response.data
}

export async function forgotPassword(email) {
  const response = await authApi.post('/auth/forgot-password', { email })
  return response.data
}

export async function resetPassword(token, password) {
  const response = await authApi.post('/auth/reset-password', {
    token,
    password
  })
  return response.data
}

export async function getCurrentUser() {
  const response = await authApi.get('/auth/me')
  return response.data
}

export async function updateProfile(firstName, lastName) {
  const response = await authApi.put('/auth/profile', {
    firstName,
    lastName
  })
  return response.data
}

export async function changePassword(currentPassword, newPassword) {
  const response = await authApi.put('/auth/change-password', {
    currentPassword,
    newPassword
  })
  return response.data
}

export async function deleteAccount(password) {
  const response = await authApi.delete('/auth/account', {
    data: { password }
  })
  return response.data
}

export default authApi
