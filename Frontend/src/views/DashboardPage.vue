<template>
  <div class="space-y-6">
    <!-- Sayfa Başlığı -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">KONTROL PANELİ</h1>
      <p class="text-gray-600">QR Stok Kontrol Sistemi - Genel Bakış</p>
    </div>

    <!-- İstatistik Kartları -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Toplam Cihaz -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Toplam Cihaz</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalDevices }}</p>
          </div>
        </div>
      </div>

      <!-- Aktif Cihaz -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Aktif Cihaz</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.activeDevices }}</p>
          </div>
        </div>
      </div>

      <!-- Bakımda Cihaz -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Bakımda</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.maintenanceDevices }}</p>
          </div>
        </div>
      </div>

      <!-- Kullanıcı Sayısı (Sadece Admin) -->
      <div v-if="authStore.isAdmin" class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Toplam Kullanıcı</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Hoş Geldin Mesajı -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold">
            Hoş geldin, {{ authStore.userName }}! 👋
          </h2>
          <p class="text-blue-100 mt-2">
            {{ authStore.isAdmin ? 'Admin' : 'Kullanıcı' }} olarak sisteme giriş yaptınız.
            {{ getGreeting() }}
          </p>
        </div>
        <div class="hidden md:block">
          <svg class="w-20 h-20 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Hızlı İşlemler -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Cihaz Ekle -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="text-center">
          <div class="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Cihaz Ekle</h3>
          <p class="text-gray-600 text-sm mb-4">Sisteme yeni cihaz ekle</p>
          <router-link 
            to="/dashboard/devices"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-block"
          >
            Cihazlara Git
          </router-link>
        </div>
      </div>

      <!-- QR Okut -->
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="text-center">
          <div class="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">QR Kod Okut</h3>
          <p class="text-gray-600 text-sm mb-4">Cihaz QR kodunu okut</p>
          <router-link 
            to="/dashboard/qr-tarama"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-block"
          >
            QR Okut
          </router-link>
        </div>
      </div>

      <!-- Kullanıcı Yönetimi (Sadece Admin) -->
      <div v-if="authStore.isAdmin" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div class="text-center">
          <div class="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Kullanıcı Yönetimi</h3>
          <p class="text-gray-600 text-sm mb-4">Kullanıcıları yönet</p>
          <router-link 
            to="/dashboard/kullanicilar"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-block"
          >
            Kullanıcılar
          </router-link>
        </div>
      </div>
    </div>

    <!-- Son Eklenen Cihazlar -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Son Eklenen Cihazlar</h3>
          <router-link 
            to="/dashboard/devices"
            class="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Tümünü Gör →
          </router-link>
        </div>
      </div>
      
      <!-- Yükleme durumu -->
      <div v-if="loading" class="p-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Yükleniyor...</p>
      </div>

      <!-- Cihaz listesi -->
      <div v-else-if="recentDevices.length > 0" class="p-6">
        <div class="space-y-4">
          <div 
            v-for="device in recentDevices" 
            :key="device.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ device.ad }}</h4>
                <p class="text-sm text-gray-500">{{ device.seri_no }} - {{ device.kategori }}</p>
              </div>
            </div>
            <span :class="getStatusClass(device.durum)" class="px-2 py-1 text-xs font-semibold rounded-full">
              {{ getStatusText(device.durum) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Boş durum -->
      <div v-else class="p-8 text-center">
        <p class="text-gray-500">Henüz cihaz eklenmemiş</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { deviceAPI } from '@/services/api'

const authStore = useAuthStore()

// Reactive data
const loading = ref(true)
const stats = ref({
  totalDevices: 0,
  activeDevices: 0,
  maintenanceDevices: 0,
  totalUsers: 0
})
const recentDevices = ref([])

onMounted(async () => { 
  await loadDashboardData()
})

const loadDashboardData = async () => {
  loading.value = true
  
  try {
    // Son cihazları getir
    const devicesResponse = await deviceAPI.getDevices({ 
      page: 1, 
      per_page: 5,
      sort: 'created_at',
      order: 'desc'
    })
    
    if (devicesResponse.data.success) {
      const devices = devicesResponse.data.data.data || devicesResponse.data.data
      recentDevices.value = devices

      // İstatistikleri hesapla
      const allDevicesResponse = await deviceAPI.getDevices()
      if (allDevicesResponse.data.success) {
        const allDevices = allDevicesResponse.data.data.data || allDevicesResponse.data.data
        
        stats.value.totalDevices = allDevices.length
        stats.value.activeDevices = allDevices.filter(d => d.durum === 'aktif').length
        stats.value.maintenanceDevices = allDevices.filter(d => d.durum === 'bakim').length
      }
    }
  } catch (error) {
    console.error('Dashboard data yüklenirken hata:', error)
  } finally {
    loading.value = false
  }
}

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Günaydın! ☀️'
  if (hour < 18) return 'İyi günler! 🌤️'
  return 'İyi akşamlar! 🌙'
}

const getStatusClass = (status) => {
  const classes = {
    'aktif': 'bg-green-100 text-green-800',
    'bakim': 'bg-yellow-100 text-yellow-800',
    'bozuk': 'bg-red-100 text-red-800',
    'pasif': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    'aktif': 'Aktif',
    'bakim': 'Bakımda',
    'bozuk': 'Bozuk',
    'pasif': 'Pasif'
  }
  return texts[status] || status
}
</script>