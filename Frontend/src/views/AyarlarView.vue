<template>
  <div>
    <AppNavbar />
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">⚙️ Ayarlar</h1>
          <p class="mt-2 text-lg text-gray-600">
            Uygulama tercihlerinizi ve ayarlarınızı yönetin
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Settings Sidebar -->
          <div class="lg:col-span-1">
            <nav class="space-y-1">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="activeTab === tab.id 
                  ? 'bg-primary-100 text-primary-700 border-primary-500' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
                class="w-full text-left px-3 py-2 text-sm font-medium rounded-md border-l-4 border-transparent transition-colors"
              >
                <div class="flex items-center">
                  <component :is="tab.icon" class="w-5 h-5 mr-3" />
                  {{ tab.name }}
                </div>
              </button>
            </nav>
          </div>

          <!-- Settings Content -->
          <div class="lg:col-span-3">
            <!-- General Settings -->
            <div v-if="activeTab === 'general'" class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Genel Ayarlar</h3>
              
              <div class="space-y-6">
                <!-- Language -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                  <select
                    v-model="settings.language"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <!-- Theme -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input
                        v-model="settings.theme"
                        type="radio"
                        value="light"
                        class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                      />
                      <span class="ml-2 text-sm text-gray-700">Açık Tema</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="settings.theme"
                        type="radio"
                        value="dark"
                        class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                      />
                      <span class="ml-2 text-sm text-gray-700">Koyu Tema</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="settings.theme"
                        type="radio"
                        value="system"
                        class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                      />
                      <span class="ml-2 text-sm text-gray-700">Sistem Ayarı</span>
                    </label>
                  </div>
                </div>

                <!-- Auto-logout -->
                <div>
                  <label class="flex items-center">
                    <input
                      v-model="settings.autoLogout"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Otomatik çıkış (30 dakika inaktiflik)</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Notifications -->
            <div v-if="activeTab === 'notifications'" class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Bildirim Ayarları</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="flex items-center">
                    <input
                      v-model="notifications.emailNotifications"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Email bildirimleri</span>
                  </label>
                </div>

                <div>
                  <label class="flex items-center">
                    <input
                      v-model="notifications.pushNotifications"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Push bildirimleri</span>
                  </label>
                </div>

                <div>
                  <label class="flex items-center">
                    <input
                      v-model="notifications.systemAlerts"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Sistem uyarıları</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Security -->
            <div v-if="activeTab === 'security'" class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Güvenlik Ayarları</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="flex items-center">
                    <input
                      v-model="security.twoFactorAuth"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">İki faktörlü doğrulama</span>
                  </label>
                </div>

                <div>
                  <label class="flex items-center">
                    <input
                      v-model="security.sessionTimeout"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Oturum zaman aşımı</span>
                  </label>
                </div>

                <div>
                  <button
                    @click="showActiveSessions"
                    class="text-sm text-primary-600 hover:text-primary-800 underline"
                  >
                    Aktif oturumları görüntüle
                  </button>
                </div>
              </div>
            </div>

            <!-- Data & Privacy -->
            <div v-if="activeTab === 'privacy'" class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Veri ve Gizlilik</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="flex items-center">
                    <input
                      v-model="privacy.dataCollection"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Kullanım verilerinin toplanmasına izin ver</span>
                  </label>
                </div>

                <div>
                  <label class="flex items-center">
                    <input
                      v-model="privacy.analytics"
                      type="checkbox"
                      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Analitik veriler</span>
                  </label>
                </div>

                <div class="pt-4 border-t">
                  <button
                    @click="exportData"
                    class="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-3"
                  >
                    Verilerimi İndir
                  </button>
                  <button
                    @click="deleteAccount"
                    class="text-sm bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Hesabımı Sil
                  </button>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="mt-6 flex justify-end">
              <button
                @click="saveSettings"
                :disabled="saving"
                class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                <svg v-if="saving" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ saving ? 'Kaydediliyor...' : 'Ayarları Kaydet' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, h } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppNavbar from '@/components/AppNavbar.vue'

const authStore = useAuthStore()

// State
const activeTab = ref('general')
const saving = ref(false)

// Settings data
const settings = reactive({
  language: 'tr',
  theme: 'light',
  autoLogout: true
})

const notifications = reactive({
  emailNotifications: true,
  pushNotifications: false,
  systemAlerts: true
})

const security = reactive({
  twoFactorAuth: false,
  sessionTimeout: true
})

const privacy = reactive({
  dataCollection: true,
  analytics: false
})

// Tabs
const tabs = [
  {
    id: 'general',
    name: 'Genel',
    icon: () => h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
      }),
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      })
    ])
  },
  {
    id: 'notifications',
    name: 'Bildirimler',
    icon: () => h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M15 17h5l-5 5v-5zM15 17H9a4 4 0 01-4-4V7a9 9 0 1118 0v6a4 4 0 01-4 4h-6z'
      })
    ])
  },
  {
    id: 'security',
    name: 'Güvenlik',
    icon: () => h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      })
    ])
  },
  {
    id: 'privacy',
    name: 'Gizlilik',
    icon: () => h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      })
    ])
  }
]

// Methods
const saveSettings = async () => {
  try {
    saving.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Save to localStorage
    localStorage.setItem('app_settings', JSON.stringify({
      settings,
      notifications,
      security,
      privacy
    }))
    
    // Show success message
    const notification = document.createElement('div')
    notification.innerHTML = `
      <div class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animation-fade-in">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Ayarlar başarıyla kaydedildi!
        </div>
      </div>
      <style>
        .animation-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 3000)
    
  } catch (error) {
    console.error('Settings save error:', error)
    alert('Ayarlar kaydedilirken hata oluştu')
  } finally {
    saving.value = false
  }
}

const loadSettings = () => {
  try {
    const saved = localStorage.getItem('app_settings')
    if (saved) {
      const parsed = JSON.parse(saved)
      Object.assign(settings, parsed.settings || {})
      Object.assign(notifications, parsed.notifications || {})
      Object.assign(security, parsed.security || {})
      Object.assign(privacy, parsed.privacy || {})
    }
  } catch (error) {
    console.error('Settings load error:', error)
  }
}

const showActiveSessions = () => {
  const modal = document.createElement('div')
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" onclick="this.parentElement.parentElement.remove()">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center mb-4">
              <svg class="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Aktif Oturumlar</h3>
            </div>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <div class="font-medium text-gray-900">Mevcut Oturum</div>
                    <div class="text-sm text-gray-500">${navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Browser'} - ${navigator.platform}</div>
                    <div class="text-xs text-gray-400">${new Date().toLocaleString('tr-TR')}</div>
                  </div>
                </div>
                <span class="text-green-600 text-sm font-medium">Aktif</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                  <div>
                    <div class="font-medium text-gray-900">Mobil Cihaz</div>
                    <div class="text-sm text-gray-500">Safari - iOS</div>
                    <div class="text-xs text-gray-400">2 saat önce</div>
                  </div>
                </div>
                <button onclick="alert('Oturum sonlandırıldı')" class="text-red-600 text-sm hover:text-red-800 font-medium">Sonlandır</button>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                  <div>
                    <div class="font-medium text-gray-900">Tablet</div>
                    <div class="text-sm text-gray-500">Chrome - Android</div>
                    <div class="text-xs text-gray-400">1 gün önce</div>
                  </div>
                </div>
                <button onclick="alert('Oturum sonlandırıldı')" class="text-red-600 text-sm hover:text-red-800 font-medium">Sonlandır</button>
              </div>
            </div>
            <div class="mt-4 p-3 bg-blue-50 rounded-lg">
              <p class="text-sm text-blue-800">
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Şüpheli bir aktivite fark ederseniz hemen tüm oturumları sonlandırın ve şifrenizi değiştirin.
              </p>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onclick="this.closest('.fixed').remove()" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 sm:ml-3 sm:w-auto sm:text-sm">
              Tamam
            </button>
            <button type="button" onclick="alert('Tüm oturumlar sonlandırıldı'); this.closest('.fixed').remove()" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
              Tüm Oturumları Sonlandır
            </button>
          </div>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(modal)
}

const exportData = () => {
  const data = {
    user: authStore.user,
    settings: { settings, notifications, security, privacy },
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `qr-stok-user-data-${Date.now()}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  // Show success notification
  const notification = document.createElement('div')
  notification.innerHTML = `
    <div class="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        Verileriniz başarıyla indirildi!
      </div>
    </div>
  `
  document.body.appendChild(notification)
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 3000)
}

const deleteAccount = () => {
  const modal = document.createElement('div')
  modal.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" onclick="this.parentElement.parentElement.remove()">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Hesabı Sil</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinecektir.
                  </p>
                  <div class="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p class="text-sm text-yellow-800">
                      <strong>Silinecek veriler:</strong>
                    </p>
                    <ul class="text-sm text-yellow-700 mt-1 list-disc list-inside">
                      <li>Profil bilgileriniz</li>
                      <li>Cihaz kayıtlarınız</li>
                      <li>QR kod geçmişiniz</li>
                      <li>Uygulama ayarlarınız</li>
                    </ul>
                  </div>
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Onaylamak için "HESABI SIL" yazın:
                    </label>
                    <input type="text" id="confirmDelete" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="HESABI SIL">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onclick="
              const input = document.getElementById('confirmDelete');
              if(input.value === 'HESABI SIL') {
                alert('Hesap silme işlemi için destek ekibiyle iletişime geçin: support@qrstok.com');
                this.closest('.fixed').remove();
              } else {
                alert('Lütfen onay metnini doğru yazın');
              }
            " class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm">
              Hesabı Sil
            </button>
            <button type="button" onclick="this.closest('.fixed').remove()" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm">
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(modal)
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Tab styling */
.border-l-4 {
  border-left-width: 4px;
}

/* Form elements */
input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

input[type="radio"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Shadow effects */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Responsive design */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .lg\:col-span-1,
  .lg\:col-span-3 {
    grid-column: span 1;
  }
  
  nav {
    display: flex;
    overflow-x: auto;
    gap: 0.25rem;
  }
  
  nav button {
    flex-shrink: 0;
    white-space: nowrap;
  }
}

/* Custom scrollbar for mobile nav */
nav::-webkit-scrollbar {
  display: none;
}

nav {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>