// src/stores/device.js
import { defineStore } from 'pinia'
import { deviceAPI } from '@/services/api'


export const useDeviceStore = defineStore('device', {
  state: () => ({
    devices: [],
    currentDevice: null,
    loading: false,
    error: null,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0
    },
    filters: {
      search: '',
      category: '',
      location: '',
      status: ''
    },
    initialized: false // Sonsuz döngüyü engellemek için
  }),

  getters: {
    deviceCount: (state) => state.devices.length,
    hasDevices: (state) => state.devices.length > 0,
    isLoading: (state) => state.loading
  },

  actions: {
    async fetchDevices(params = {}) {
      if (this.loading) return // Önceki fetch bitmeden yenisi başlamasın

      this.loading = true
      this.error = null

      try {
        const queryParams = { ...this.filters, ...params }
        const response = await deviceAPI.getDevices(queryParams)

        // Laravel pagination uyumu
        const data = response.data.data || response.data
        this.devices = data.data || data

        // Pagination bilgileri
        if (data.meta) {
          this.pagination = {
            current_page: data.meta.current_page || 1,
            last_page: data.meta.last_page || 1,
            per_page: data.meta.per_page || 15,
            total: data.meta.total || this.devices.length
          }
        }

        this.initialized = true
        return { success: true, data: this.devices }
      } catch (error) {
        console.error('Cihaz fetch hatası:', error)
        this.error = error.response?.data?.message || error.message || 'Cihazlar getirilirken hata oluştu'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async createDevice(deviceData) {
      if (this.loading) return
      this.loading = true
      this.error = null

      try {
        const response = await deviceAPI.createDevice(deviceData)
        if (response.data.success) {
          await this.fetchDevices() // Listeyi yenile
          return { success: true, data: response.data }
        } else {
          throw new Error(response.data.message || 'Cihaz oluşturulamadı')
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Cihaz oluşturma hatası'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateDevice(id, deviceData) {
      if (this.loading) return
      this.loading = true
      this.error = null

      try {
        const response = await deviceAPI.updateDevice(id, deviceData)
        if (response.data.success) {
          await this.fetchDevices()
          return { success: true, data: response.data }
        } else {
          throw new Error(response.data.message || 'Cihaz güncellenemedi')
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Cihaz güncelleme hatası'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async deleteDevice(id) {
      if (this.loading) return
      this.loading = true
      this.error = null

      try {
        const response = await deviceAPI.deleteDevice(id)
        if (response.data.success) {
          await this.fetchDevices()
          return { success: true, data: response.data }
        } else {
          throw new Error(response.data.message || 'Cihaz silinemedi')
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Cihaz silme hatası'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async getDeviceById(id) {
      if (this.loading) return
      this.loading = true
      this.error = null

      try {
        const response = await deviceAPI.getDeviceById(id)
        if (response.data.success) {
          this.currentDevice = response.data.data
          return { success: true, data: response.data }
        } else {
          throw new Error(response.data.message || 'Cihaz bulunamadı')
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Cihaz getirme hatası'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async downloadQR(id) {
      if (this.loading) return
      this.loading = true
      this.error = null

      try {
        const response = await deviceAPI.downloadQR(id)
        const blob = new Blob([response.data], { type: 'image/png' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `device-${id}-qr.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'QR kod indirme hatası'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async scanQR(qrCode) {
      if (this.loading) return
      this.loading = true
      this.error = null

      try {
        const response = await deviceAPI.scanQR(qrCode)
        if (response.data.success) {
          return { success: true, data: response.data }
        } else {
          throw new Error(response.data.message || 'QR kod okunamadı')
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'QR kod okuma hatası'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    setFilter(key, value) {
      this.filters[key] = value
    },

    clearFilters() {
      this.filters = {
        search: '',
        category: '',
        location: '',
        status: ''
      }
    },

    clearError() {
      this.error = null
    },

    clearCurrentDevice() {
      this.currentDevice = null
    },

    async initializeDevices() {
      if (this.initialized) return
      await this.fetchDevices()
      this.initialized = true
    }
  }
})
