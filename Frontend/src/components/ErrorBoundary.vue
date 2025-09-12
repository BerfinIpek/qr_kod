<template>
  <div v-if="hasError" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto h-24 w-24 text-red-500 mb-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Oops! Bir hata oluştu
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ userFriendlyMessage }}
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <div v-if="isDevelopment && errorDetails" class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Hata Detayları (Development)</h3>
              <div class="mt-2 text-sm text-red-700">
                <p class="font-mono text-xs bg-red-100 p-2 rounded border">{{ errorDetails.message }}</p>
                <details class="mt-2">
                  <summary class="cursor-pointer text-red-600 hover:text-red-800">Stack Trace</summary>
                  <pre class="mt-2 text-xs bg-red-100 p-2 rounded border whitespace-pre-wrap">{{ errorDetails.stack }}</pre>
                </details>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-3">
          <button
            @click="retryOperation"
            :disabled="retrying"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="retrying" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {{ retrying ? 'Yeniden deneniyor...' : 'Tekrar Dene' }}
          </button>

          <button
            @click="goHome"
            class="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Ana Sayfaya Dön
          </button>

          <button
            @click="reloadPage"
            class="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Sayfayı Yenile
          </button>
        </div>

        <div class="text-center">
          <button
            @click="reportError"
            class="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Hata Bildir
          </button>
        </div>

        <div class="text-center">
          <p class="text-xs text-gray-400">
            Hata ID: {{ errorId }}
          </p>
          <p class="text-xs text-gray-400 mt-1">
            Destek için bu kodu belirtin
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <slot />
  </div>
</template>

<script setup>
/*
  Düzenlemeler:
  - performanceMonitor çağrıları güvenli şekilde (try/catch) sarıldı.
  - global event listener'lar onUnmounted ile temizleniyor.
  - retryOperation artık güvenilir şekilde sayfayı yeniliyor (window.location.reload()).
  - error message kontrolü daha sağlam yapıldı (message var mı diye kontrol).
*/

import { ref, computed, onErrorCaptured, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import performanceMonitor from '@/utils/performance' // varsa kullanılır; yoksa try/catch'le korunacak

const router = useRouter()

// State
const hasError = ref(false)
const errorDetails = ref(null)
const errorId = ref('')
const retrying = ref(false)
const retryCount = ref(0)
const maxRetries = ref(3)

// Props
defineProps({
  fallbackComponent: {
    type: Object,
    default: null
  }
})

// Computed
const isDevelopment = computed(() => import.meta.env.DEV)

const userFriendlyMessage = computed(() => {
  if (!errorDetails.value || !errorDetails.value.message) return 'Beklenmeyen bir hata oluştu.'
  const msg = String(errorDetails.value.message || '')

  if (msg.includes('ChunkLoadError') || msg.includes('Loading chunk')) {
    return 'Uygulama güncellemesi mevcut. Lütfen sayfayı yenileyin.'
  }
  if (msg.includes('Network Error') || msg.includes('fetch')) {
    return 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.'
  }
  if (msg.includes('Unexpected token') || msg.includes('JSON')) {
    return 'Veri formatında bir sorun oluştu. Lütfen tekrar deneyin.'
  }
  if (msg.includes('timeout')) {
    return 'İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.'
  }
  if (msg.includes('Unauthorized') || msg.includes('401')) {
    return 'Oturumunuz sona erdi. Lütfen tekrar giriş yapın.'
  }
  if (msg.includes('Forbidden') || msg.includes('403')) {
    return 'Bu işlem için yetkiniz bulunmuyor.'
  }
  if (msg.includes('Not Found') || msg.includes('404')) {
    return 'Aradığınız sayfa bulunamadı.'
  }
  return 'Bir sorun oluştu. Lütfen tekrar deneyin.'
})

// Safe wrapper for performance monitor usage
const safeTrackError = (err, ctx = {}) => {
  try {
    if (performanceMonitor && typeof performanceMonitor.trackError === 'function') {
      performanceMonitor.trackError(err, ctx)
    }
  } catch (e) {
    // If even logging fails, swallow to avoid infinite error loops
    console.warn('performanceMonitor.trackError failed:', e)
  }
}

const safeGetPerfReport = () => {
  try {
    if (performanceMonitor && typeof performanceMonitor.getPerformanceReport === 'function') {
      return performanceMonitor.getPerformanceReport()
    }
  } catch (e) {
    console.warn('performanceMonitor.getPerformanceReport failed:', e)
  }
  return {}
}

// Error boundary
onErrorCaptured((error, instance, info) => {
  console.error('Vue Error Boundary caught error:', error, info)
  try {
    handleError(error, {
      component: instance?.type?.name || instance?.$options?.name || 'Unknown',
      info,
      type: 'vue-error-boundary'
    })
  } catch (e) {
    // Çok dikkat: handleError içinde herhangi bir hata oluşursa burada yakalayarak
    // sonsuz hata-işleme döngüsünü engelliyoruz.
    console.error('Error while handling error in ErrorBoundary:', e)
  }

  // false döndürerek hatanın üst komponentlere yayılmasını engelle (fallback UI göstereceğiz)
  return false
})

// Methods
const handleError = (error, context = {}) => {
  try {
    hasError.value = true
    errorDetails.value = {
      message: error?.message ? String(error.message) : String(error),
      stack: error?.stack || String(error),
      name: error?.name || 'Error'
    }

    errorId.value = generateErrorId()

    // Güvenli tracking
    safeTrackError(error, context)

    if (isDevelopment.value) {
      console.error('Application Error (handled):', error)
      console.error('Context:', context)
    }
  } catch (e) {
    // Eğer burası bile hata verirse, hata yakalayıcıya zarar vermesin
    console.error('handleError failed:', e)
    // Ensure we still show a minimal fallback UI
    hasError.value = true
    errorDetails.value = {
      message: 'Beklenmeyen bir hata oluştu (error boundary failure).',
      stack: String(e),
      name: 'ErrorBoundaryFailure'
    }
    errorId.value = generateErrorId()
  }
}

const generateErrorId = () => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 5)
  return `ERR-${timestamp}-${random}`.toUpperCase()
}

const retryOperation = async () => {
  if (retryCount.value >= maxRetries.value) {
    alert(`Maksimum ${maxRetries.value} deneme yapıldı. Lütfen sayfayı yenileyin.`)
    return
  }

  retrying.value = true
  retryCount.value++

  try {
    await new Promise(resolve => setTimeout(resolve, 800))

    // Clear error state
    hasError.value = false
    errorDetails.value = null
    errorId.value = ''

    // Güvenilir yeniden yükleme
    // Router yerine doğrudan sayfa yenileme kullanıyoruz, router.go(0) bazen beklenmedik davranışlara sebep olur.
    window.location.reload()
  } catch (error) {
    console.error('Retry failed:', error)
    handleError(error, { type: 'retry-failed', attempt: retryCount.value })
  } finally {
    retrying.value = false
  }
}

const goHome = () => {
  hasError.value = false
  errorDetails.value = null
  errorId.value = ''
  router.push('/').catch(() => {})
}

const reloadPage = () => {
  window.location.reload()
}

const reportError = async () => {
  const perf = safeGetPerfReport()
  const report = {
    errorId: errorId.value,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    error: errorDetails.value,
    performanceData: perf
  }

  try {
    // Kopyala -> panoya
    await navigator.clipboard.writeText(JSON.stringify(report, null, 2))
    alert('Hata raporu panoya kopyalandı. Destek ekibiyle paylaşabilirsiniz.')
  } catch {
    // Fallback: dosya indir
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `error-report-${errorId.value}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

// Global error handlers + cleanup
let onErrorHandler = null
let onUnhandledRejection = null

onMounted(() => {
  onErrorHandler = (event) => {
    try {
      const err = event.error || new Error(event.message || 'Unknown global error')
      handleError(err, {
        type: 'global-error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    } catch (e) {
      console.error('Error in global error handler:', e)
    }
  }

  onUnhandledRejection = (event) => {
    try {
      const reason = event.reason
      const err = reason instanceof Error ? reason : new Error(String(reason))
      handleError(err, { type: 'unhandled-promise-rejection' })
    } catch (e) {
      console.error('Error in unhandledrejection handler:', e)
    }
  }

  window.addEventListener('error', onErrorHandler)
  window.addEventListener('unhandledrejection', onUnhandledRejection)
})

onUnmounted(() => {
  if (onErrorHandler) window.removeEventListener('error', onErrorHandler)
  if (onUnhandledRejection) window.removeEventListener('unhandledrejection', onUnhandledRejection)
})

// Expose for parent usage
defineExpose({
  handleError,
  clearError: () => {
    hasError.value = false
    errorDetails.value = null
    errorId.value = ''
  }
})
</script>

<style scoped>
/* (Aynı stiller) */
.error-boundary {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  .max-w-md {
    max-width: 90%;
  }

  .space-y-6 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1rem;
  }

  .py-3 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>
