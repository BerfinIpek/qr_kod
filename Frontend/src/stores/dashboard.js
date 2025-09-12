// src/stores/dashboard.js - Dashboard Store
import { defineStore } from 'pinia'
import { dashboardService } from '@/services/api'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: {
      toplamCihaz: 0,
      aktifCihaz: 0,
      pasifCihaz: 0,
      bakimdaCihaz: 0,
      toplamKullanici: 0,
      bugunQRTarama: 0
    },
    recentActivities: [],
    chartData: {
      cihazDurumu: [],
      qrTaramaGrafik: []
    },
    loading: {
      stats: false,
      activities: false,
      charts: false
    },
    error: null,
    initialized: false   // ✅ Sonsuz döngüyü engellemek için eklendi
  }),

  getters: {
    getStatByKey: (state) => (key) => state.stats[key] || 0,
    
    getCihazDurumPercentage: (state) => {
      const total = state.stats.toplamCihaz
      if (total === 0) return { aktif: 0, pasif: 0, bakim: 0 }
      
      return {
        aktif: Math.round((state.stats.aktifCihaz / total) * 100),
        pasif: Math.round((state.stats.pasifCihaz / total) * 100),
        bakim: Math.round((state.stats.bakimdaCihaz / total) * 100)
      }
    },

    getRecentActivitiesCount: (state) => state.recentActivities.length,
    
    isLoading: (state) => Object.values(state.loading).some((l) => l)
  },

  actions: {
    async fetchDashboardStats() {
      try {
        this.loading.stats = true
        this.error = null

        const response = await dashboardService.getStats()
        const d = response.data || {}

        this.stats = {
          toplamCihaz: d.toplam_cihaz || 0,
          aktifCihaz: d.aktif_cihaz || 0,
          pasifCihaz: d.pasif_cihaz || 0,
          bakimdaCihaz: d.bakim_cihaz || 0,
          toplamKullanici: d.toplam_kullanici || 0,
          bugunQRTarama: d.bugun_qr_tarama || 0
        }

        return { success: true }
      } catch (error) {
        this.error = 'Dashboard istatistikleri alınamadı'
        console.error('Dashboard stats hatası:', error)
        return { success: false, error: this.error }
      } finally {
        this.loading.stats = false
      }
    },

    async fetchRecentActivities() {
      try {
        this.loading.activities = true
        const response = await dashboardService.getRecentActivity()
        this.recentActivities = response.data || []
        return { success: true }
      } catch (error) {
        console.error('Recent activities hatası:', error)
        this.recentActivities = []
        return { success: false }
      } finally {
        this.loading.activities = false
      }
    },

    async fetchChartData() {
      try {
        this.loading.charts = true

        this.chartData.cihazDurumu = [
          { name: 'Aktif', value: this.stats.aktifCihaz, color: '#10B981' },
          { name: 'Pasif', value: this.stats.pasifCihaz, color: '#EF4444' },
          { name: 'Bakımda', value: this.stats.bakimdaCihaz, color: '#F59E0B' }
        ]

        // Sadece örnek veri (backend yoksa)
        const currentDate = new Date()
        this.chartData.qrTaramaGrafik = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(currentDate)
          date.setDate(currentDate.getDate() - (6 - i))
          return {
            date: date.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
            tarama: Math.floor(Math.random() * 20) + 5
          }
        })

        return { success: true }
      } catch (error) {
        console.error('Chart data hatası:', error)
        return { success: false }
      } finally {
        this.loading.charts = false
      }
    },

    async initializeDashboard() {
      if (this.initialized) return   // ✅ tekrar tekrar çalışmaz
      await this.fetchDashboardStats()
      await this.fetchRecentActivities()
      await this.fetchChartData()
      this.initialized = true
    },

    updateStat(key, value) {
      if (this.stats.hasOwnProperty(key)) {
        this.stats[key] = value
      }
    },

    addActivity(activity) {
      this.recentActivities.unshift({
        id: Date.now(),
        ...activity,
        timestamp: new Date()
      })
      if (this.recentActivities.length > 10) {
        this.recentActivities = this.recentActivities.slice(0, 10)
      }
    },

    clearError() {
      this.error = null
    },

    resetDashboard() {
      this.stats = {
        toplamCihaz: 0,
        aktifCihaz: 0,
        pasifCihaz: 0,
        bakimdaCihaz: 0,
        toplamKullanici: 0,
        bugunQRTarama: 0
      }
      this.recentActivities = []
      this.chartData = {
        cihazDurumu: [],
        qrTaramaGrafik: []
      }
      this.error = null
      this.initialized = false   // ✅ resetleyince tekrar initialize edilebilir
    }
  }
})
