export const ADMIN_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export type AdminPagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type AdminListResponse<T> = {
  success: boolean
  data: T[]
  pagination: AdminPagination
  message?: string
}

export type AdminEntityResponse<T> = {
  success: boolean
  data: T
  message?: string
}

function getAdminToken() {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('token') || ''
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed')
  }

  return payload as T
}

async function adminRequest<T>(path: string, init: RequestInit = {}) {
  const token = getAdminToken()
  const headers = new Headers(init.headers)

  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
    ...init,
    cache: 'no-store',
    headers,
  })

  return parseResponse<T>(response)
}

export function buildQueryString(params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value))
    }
  })

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

export function listResource<T>(path: string, params: Record<string, string | number | undefined> = {}) {
  return adminRequest<AdminListResponse<T>>(`${path}${buildQueryString(params)}`)
}

export function getResource<T>(path: string) {
  return adminRequest<AdminEntityResponse<T>>(path)
}

export function createResource<T>(path: string, body: Record<string, unknown>) {
  return adminRequest<AdminEntityResponse<T>>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateResource<T>(path: string, body: Record<string, unknown>) {
  return adminRequest<AdminEntityResponse<T>>(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deleteResource<T>(path: string) {
  return adminRequest<AdminEntityResponse<T>>(path, {
    method: 'DELETE',
  })
}

export function getAdminSummary() {
  return adminRequest<{
    success: boolean
    data: {
      totalStudents: number
      totalTeachers: number
      totalCourses: number
      totalBatches: number
      totalPlacements: number
    }
  }>('/api/admin/dashboard/summary')
}
