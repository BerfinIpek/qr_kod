<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="bg-white w-64 shadow-lg">
      <div class="p-4">
        <h1 class="text-xl font-bold text-gray-800">QR Stok Sistemi</h1>
      </div>
      <nav class="mt-8">
        <div class="px-4 pb-4">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Ana Menü</p>
        </div>
        <router-link
          to="/dashboard"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.name === 'DashboardPage' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0a2 2 0 002-2h6l2 2h6a2 2 0 012 2z" />
          </svg>
          Kontrol Paneli
        </router-link>
        <router-link
          to="/dashboard/devices"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.name === 'DeviceList' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          Cihazlar
        </router-link>
        <router-link
          to="/dashboard/qr-tarama"
          class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.name === 'QRScan' }"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          QR Okut
        </router-link>

        <!-- Admin Menüsü -->
        <template v-if="authStore.isAdmin">
          <div class="px-4 pb-4 pt-8">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</p>
          </div>
          
          <router-link
            to="/dashboard/kullanicilar"
            class="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.name === 'UserManagement' }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Kullanıcılar
          </router-link>
        </template>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="flex justify-between items-center px-6 py-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">{{ getPageTitle() }}</h2>
          </div>
          
          <!-- User Menu -->
          <div class="relative" ref="userMenuRef">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg px-3 py-2"
            >
              <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  <!--{{ authStore.userName.charAt(0).toUpperCase() }}-->
                </span>
              </div>
              <div class="text-left">
                <p class="text-sm font-medium">{{ authStore.userName }}</p>
                <p class="text-xs text-gray-500">{{ authStore.isAdmin ? 'Admin' : 'Kullanıcı' }}</p>
              </div>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
            >
              <a href="/dashboard/profil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profil
              </a>
              <a href="/dashboard/ayarlar" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Ayarlar
              </a>
              <hr class="my-1">
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const showUserMenu = ref(false)
const userMenuRef = ref(null)

// Close user menu when clicking outside
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const getPageTitle = () => {
  const titles = {
    'Dashboard': 'Kontrol Paneli',
    'DeviceList': 'Cihaz Yönetimi',
    'QRScan': 'QR Kod Okuma',
    'UserManagement': 'Kullanıcı Yönetimi',
  }
  return titles[route.name] || 'QR Stok Sistemi'
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/auth/login')
}
</script>