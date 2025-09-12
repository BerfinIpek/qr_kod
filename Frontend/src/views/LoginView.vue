<template>
  <div class="w-screen h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center mb-6">
          <div class="bg-primary-600 p-3 rounded-full">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          QR Stok Kontrol
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Hesabınıza giriş yapın
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <!-- Error Message -->
        <div v-if="authStore.error || error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ authStore.error || error }}
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ successMessage }}
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="form.email"
              required
              :disabled="authStore.loading"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Email adresiniz"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <div class="relative">
              <input
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.sifre"
                required
                :disabled="authStore.loading"
                class="mt-1 appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Şifreniz"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                :disabled="authStore.loading"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="!showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading || isSubmitting"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg v-if="authStore.loading || isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="authStore.loading || isSubmitting">Giriş yapılıyor...</span>
            <span v-else>Giriş Yap</span>
          </button>
        </div>
        <!-- Demo Credentials -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// State
const form = ref({
  email: '',
  sifre: ''
})

const showPassword = ref(false)
const error = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

// Methods
const handleLogin = async () => {
  if (isSubmitting.value || authStore.loading) return
  
  try {
    isSubmitting.value = true
    error.value = ''
    successMessage.value = ''
    
    console.log('🔑 Starting login process...')
    
    // Form validation
    if (!form.value.email || !form.value.sifre) {
      error.value = 'Email ve şifre gereklidir'
      return
    }

    if (!form.value.email.includes('@')) {
      error.value = 'Geçerli bir email adresi giriniz'
      return
    }

    if (form.value.sifre.length < 6) {
      error.value = 'Şifre en az 6 karakter olmalıdır'
      return
    }

    // Attempt login
    const result = await authStore.login(form.value)
    
    if (result.success) {
      successMessage.value = 'Giriş başarılı! Yönlendiriliyorsunuz...'
      
      // Wait a moment for user feedback
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Get redirect path from query params or default to dashboard
      const redirectPath = route.query.redirect || '/dashboard'
      
      console.log('🎯 Redirecting to:', redirectPath)
      
      // Force navigation with replace to prevent back button issues
      await router.replace(redirectPath)
      
    } else {
      error.value = result.error || 'Giriş başarısız'
      console.error('❌ Login failed:', result.error)
    }
    
  } catch (err) {
    console.error('❌ Login error:', err)
    error.value = 'Beklenmeyen bir hata oluştu'
  } finally {
    isSubmitting.value = false
  }
}

const fillDemo = (type) => {
  if (type === 'admin') {
    form.value.email = 'admin@gmail.com'
    form.value.sifre = '123456'
  } else {
    form.value.email = 'user@gmail.com'
    form.value.sifre = '123456'
  }
}

// Clear messages after some time
const clearMessages = () => {
  setTimeout(() => {
    error.value = ''
    successMessage.value = ''
  }, 5000)
}

// Watch for message changes
const watchMessages = () => {
  if (error.value || successMessage.value) {
    clearMessages()
  }
}

// Lifecycle
onMounted(async () => {
  console.log('🔄 LoginView mounted')
  
  // Clear any existing auth errors
  authStore.error = null
  
  // If already authenticated, redirect
  if (authStore.isAuthenticated) {
    console.log('👤 Already authenticated, redirecting...')
    const redirectPath = route.query.redirect || '/dashboard'
    await router.replace(redirectPath)
  }
})

// Watch for auth errors
const unwatchError = authStore.$subscribe((mutation, state) => {
  if (state.error && !error.value) {
    watchMessages()
  }
})
</script>

<style scoped>
/* Loading animation improvements */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Button hover effects */
button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Form focus effects */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Demo button styling */
.demo-button {
  transition: all 0.2s ease;
}

.demo-button:hover {
  background-color: rgba(59, 130, 246, 0.1);
}
</style>