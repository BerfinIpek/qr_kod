import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Request interceptor: token ekle
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: 401 olursa logout ve login yönlendirme
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('[api] 401 Unauthorized')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  getProfile: () => apiClient.get('/auth/user-profile'),
  updateProfile: (data) => apiClient.put('/auth/update-profile', data),
  changePassword: (data) => apiClient.put('/auth/change-password', data),
  getUsers: () => apiClient.get('/admin/users'),
  createUser: (data) => apiClient.post('/admin/users', data),
  updateUser: (id, data) => apiClient.put(`/admin/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`)
}

export const deviceAPI = {
  getDevices: (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v != null)
    )
    console.log('[api] getDevices:', cleanParams)
    return apiClient.get('/cihazlar', { params: cleanParams })
  },

  scanQR: (qrCode) => apiClient.post('/cihazlar/qr-scan', { qr_code: qrCode }),
  getDeviceById: (id) => apiClient.get(`/cihazlar/${id}`),
  createDevice: (data) => apiClient.post('/cihazlar', data),
  updateDevice: (id, data) => apiClient.put(`/cihazlar/${id}`, data),
  deleteDevice: (id) => apiClient.delete(`/cihazlar/${id}`),
  downloadQR: (id) => apiClient.get(`/cihazlar/${encodeURIComponent(id)}/qr-download`, {
    responseType: 'blob'
  })
}

export default apiClient
