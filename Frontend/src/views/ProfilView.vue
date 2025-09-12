<template>
  <div>
    <AppNavbar />
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">👤 Profilim</h1>
          <p class="mt-2 text-lg text-gray-600">
            Kişisel bilgilerinizi görüntüleyin ve güncelleyin
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Profile Card -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="text-center">
                <div class="h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                  <span class="text-2xl font-bold text-white">
                    {{ getInitials(authStore.userName) }}
                  </span>
                </div>
                <h3 class="mt-4 text-xl font-bold text-gray-900">{{ authStore.userName }}</h3>
                <p class="text-gray-500">{{ authStore.userEmail }}</p>
                <span :class="getRoleClass()" class="inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium">
                  {{ getRoleText() }}
                </span>
              </div>

              <!-- Quick Stats -->
              <div class="mt-6 border-t pt-6">
                <h4 class="font-medium text-gray-900 mb-4">Hesap Bilgileri</h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Kayıt Tarihi:</span>
                    <span class="text-gray-900">{{ formatDate(userProfile.created_at) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Son Güncelleme:</span>
                    <span class="text-gray-900">{{ formatDate(userProfile.updated_at) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Son Giriş:</span>
                    <span class="text-gray-900">{{ formatDate(userProfile.last_login) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Profil Bilgileri</h3>
              
              <form @submit.prevent="updateProfile" class="space-y-6">
                <!-- Success/Error Messages -->
                <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ successMessage }}
                  </div>
                </div>

                <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ error }}
                  </div>
                </div>

                <!-- Form Fields -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                    <input
                      v-model="profileForm.ad_soyad"
                      type="text"
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      v-model="profileForm.email"
                      type="email"
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      v-model="profileForm.telefon"
                      type="tel"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="+90 555 123 45 67"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                    <input
                      :value="getRoleText()"
                      readonly
                      class="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm cursor-not-allowed"
                    />
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Sıfırla
                  </button>
                  <button
                    type="submit"
                    :disabled="authStore.loading"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ authStore.loading ? 'Güncelleniyor...' : 'Profili Güncelle' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Password Change -->
            <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Şifre Değiştir</h3>
              
              <form @submit.prevent="changePassword" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre *</label>
                    <input
                      v-model="passwordForm.currentPassword"
                      type="password"
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre *</label>
                    <input
                      v-model="passwordForm.newPassword"
                      type="password"
                      required
                      minlength="6"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre (Tekrar) *</label>
                    <input
                      v-model="passwordForm.confirmPassword"
                      type="password"
                      required
                      minlength="6"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    :disabled="authStore.loading"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ authStore.loading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { authAPI } from '@/services/api'
import AppNavbar from '@/components/AppNavbar.vue'

const authStore = useAuthStore()

// State
const userProfile = ref({})
const successMessage = ref('')
const error = ref('')

// Forms
const profileForm = reactive({
  ad_soyad: '',
  email: '',
  telefon: ''
})
// Durum mesajları
const state = reactive({
  successMessage: '',
  error: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Methods
const loadProfile = () => {
  if (authStore.user) {
    userProfile.value = { ...authStore.user }
    profileForm.ad_soyad = authStore.user.ad_soyad || ''
    profileForm.email = authStore.user.email || ''
    profileForm.telefon = authStore.user.telefon || ''
  }
}


const updateProfile = async () => {
  console.log("updateProfile tetiklendi") // Event çalışıyor mu kontrolü
  try {
    const res = await authAPI.updateProfile(profileForm)
    state.successMessage = res.data.message || 'Profil güncellendi'
    state.error = null
    console.log('Profil güncellendi:', res.data)
  } catch (err) {
    state.error = err.response?.data?.error || 'Profil güncellenemedi'
    state.successMessage = null
    console.error('Profil güncelleme hatası:', err.response?.data || err)
  }
}
const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    error.value = 'Yeni şifreler uyuşmuyor'
    return
  }

  try {
    const res = await authStore.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
      newPassword_confirmation: passwordForm.confirmPassword
    })
    successMessage.value = res.data.message
    error.value = null

    // Formu sıfırla
    Object.assign(passwordForm, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  } catch (err) {
    error.value = err.response?.data?.error || 'Şifre değiştirilemedi'
  }
}



const resetForm = () => {
  loadProfile()
  error.value = ''
  successMessage.value = ''
}

// Utility functions
const getInitials = (name) => {
  if (!name) return '??'
  return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2)
}

const getRoleClass = () => {
  return authStore.isAdmin 
    ? 'bg-purple-100 text-purple-800' 
    : 'bg-blue-100 text-blue-800'
}

const getRoleText = () => {
  return authStore.isAdmin ? 'Yönetici' : 'Kullanıcı'
}

const formatDate = (date) => {
  if (!date) return 'Bilinmiyor'
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Clear messages after some time
let messageTimeout
const clearMessages = () => {
  if (messageTimeout) clearTimeout(messageTimeout)
  messageTimeout = setTimeout(() => {
    successMessage.value = ''
    error.value = ''
  }, 5000)
}

// Watch for message changes
const watchMessages = () => {
  if (successMessage.value || error.value) {
    clearMessages()
  }
}

onMounted(() => {
  loadProfile()
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

/* Form hover effects */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Profile card styling */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Responsive design */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .space-x-3 > :not([hidden]) ~ :not([hidden]) {
    margin-left: 0;
    margin-top: 0.75rem;
  }
  
  .flex {
    flex-direction: column;
  }
}
</style>