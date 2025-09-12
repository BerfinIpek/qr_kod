import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

console.log('[main] uygulama başlatılıyor...')

const app = createApp(App)
const pinia = createPinia()
app.use(pinia) // Pinia önce kullanılmalı (store importları için)

// async initialize
const initializeApp = async () => {
  try {
    const { useAuthStore } = await import('@/stores/auth')
    const authStore = useAuthStore()

    console.log('[main] loadUserFromStorage çağırılıyor...')
    await authStore.loadUserFromStorage() // burada await ile bekle

    console.log('[main] auth yüklendi:', {
      isAuthenticated: authStore.isAuthenticated,
      isInitialized: authStore.isInitialized,
      user: authStore.user?.email || null
    })

    app.use(router)
    await router.isReady()

    app.mount('#app')
    console.log('[main] app mounted')
  } catch (err) {
    console.error('[main] initializeApp hata:', err)
    try {
      app.use(router)
      await router.isReady()
    } catch (innerErr) {
      console.error('[main] router hazır olma hatası:', innerErr)
    }
    app.mount('#app')
  }
}

initializeApp()
