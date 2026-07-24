import axios from 'axios'

const TOKEN_STORAGE_KEY = 'token'
const USER_STORAGE_KEY = 'user'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface AuthUser {
  _id?: string
  id?: string
  name?: string
  email?: string
  role?: string
  [key: string]: any
}

export interface StoredAuth {
  token: string
  user: AuthUser | null
}

export function getStoredAuth(): StoredAuth | null {
  if (typeof window === 'undefined') return null

  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY)
  const userRaw = window.localStorage.getItem(USER_STORAGE_KEY)

  if (!token) return null

  return {
    token,
    user: userRaw ? (JSON.parse(userRaw) as AuthUser) : null,
  }
}

export function setStoredAuth(token: string, user: AuthUser | null) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user || {}))
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  window.localStorage.removeItem(USER_STORAGE_KEY)
}

export async function fetchCurrentUser(token?: string): Promise<AuthUser | null> {
  const activeToken = token || getStoredAuth()?.token

  if (!activeToken) {
    throw new Error('Missing auth token')
  }

  const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${activeToken}`,
    },
  })

  return response?.data?.user || null
}
