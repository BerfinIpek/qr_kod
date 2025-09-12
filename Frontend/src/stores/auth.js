import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isInitialized: false,
    loading: false,
    error: null,
    users: [],          // Kullanıcı listesi
    selectedUser: null, // Düzenleme için seçilen kullanıcı
  }),

  getters: {
    isAdmin: (state) =>
      state.user?.rol === 'admin' || state.user?.role === 'admin'
  },

  actions: {
    setAuthHeader(token) {
      if (token) {
        localStorage.setItem('auth_token', token)
      }
    },
    clearAuthHeader() {
      localStorage.removeItem('auth_token')
    },

    async loadUserFromStorage() {
      if (this.isInitialized) return
      try {
        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user_data')
        if (token && userData) {
          this.token = token
          this.user = JSON.parse(userData)
          this.isAuthenticated = true
          console.log('[auth] loaded from storage:', this.user?.email)
        }
      } catch (err) {
        console.error('[auth] loadUserFromStorage error', err)
        this.clearAuth()
      } finally {
        this.isInitialized = true
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const res = await authAPI.login(credentials)
        const { access_token, user } = res.data
        this.token = access_token
        this.user = user
        this.isAuthenticated = true
        this.isInitialized = true
        localStorage.setItem('auth_token', access_token)
        localStorage.setItem('user_data', JSON.stringify(user))
        this.setAuthHeader(access_token)
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async register(data) {
      this.loading = true
      this.error = null
      try {
        const res = await authAPI.register(data)
        return { success: true, data: res.data }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        if (this.token) await authAPI.logout()
      } catch (err) {
        console.error('[auth] logout api error', err)
      } finally {
        this.clearAuth()
      }
    },

    // ✅ Profil güncelleme
    async updateProfile(data) {
      const res = await authAPI.updateProfile(data)
      this.user = res.data.user   // güncel user bilgilerini store’a yaz
      return res
    },

    // ✅ Şifre değiştirme
    async changePassword(data) {
      return await authAPI.changePassword(data)
    },

    clearAuth() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      this.error = null
      this.clearAuthHeader()
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      this.isInitialized = true
      console.log('[auth] cleared')
    },

    // -----------------------------
    // Admin CRUD İşlemleri
    // -----------------------------
    
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const res = await authAPI.getUsers()
        this.users = res.data
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        console.error('[auth] fetchUsers error', err)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async searchUsers(query) {
      this.loading = true
      this.error = null
      try {
        const res = await authAPI.getUsers({ q: query })
        this.users = res.data
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        console.error('[auth] searchUsers error', err)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async createUser(data) {
      this.loading = true
      this.error = null
      try {
        const res = await authAPI.createUser(data)
        this.users.push(res.data)
        return { success: true, data: res.data }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        console.error('[auth] createUser error', err)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateUser(id, data) {
      this.loading = true
      this.error = null
      try {
        const res = await authAPI.updateUser(id, data)
        const index = this.users.findIndex(u => u._id === id || u.id === id)
        if (index !== -1) this.users[index] = res.data
        return { success: true, data: res.data }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        console.error('[auth] updateUser error', err)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async deleteUser(id) {
      this.loading = true
      this.error = null
      try {
        await authAPI.deleteUser(id)
        this.users = this.users.filter(u => u._id !== id && u.id !== id)
        return { success: true }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        console.error('[auth] deleteUser error', err)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    }
  }
})
