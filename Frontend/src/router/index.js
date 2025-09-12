// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Views - Lazy loading
const LoginView = () => import('@/views/LoginView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const DashboardPage = () => import('@/views/DashboardPage.vue')
const DeviceListPage = () => import('@/views/devices/DeviceListPage.vue')
const QRTaramaView = () => import('@/views/QRTaramaView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const KullanicilarView = () => import('@/views/KullanicilarView.vue')
const CihazlarView = () => import('@/views/CihazlarView.vue')
const ProfilView = () => import('@/views/ProfilView.vue')
const AyarlarView = () => import('@/views/AyarlarView.vue')

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/auth',
    meta: { requiresGuest: true },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginView
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardPage
      },
      {
        path: 'home',
        name: 'HomePage',
        component: HomeView
      },
      {
        path: 'devices',
        name: 'DeviceList',
        component: DeviceListPage
      },
      {
        path: 'qr-tarama',
        name: 'QRTarama',
        component: QRTaramaView
      },
      {
        path: 'profil',
        name: 'UserProfile',
        component: ProfilView,
        //meta: { requiresAuth: true }
      },
      {
        path: 'ayarlar',
        name: 'Settings',
        component: AyarlarView,
        //meta: { requiresAuth: true }
      },
      {
        path: 'cihazlar',
        name: 'DeviceManagement',
        component: CihazlarView,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'kullanicilar',
        name: 'UserManagement',
        component: KullanicilarView,
        meta: { requiresAuth: true, requiresAdmin: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // bilinmeyen rotalar root’a gitsin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  try {
    const { useAuthStore } = await import('@/stores/auth')
    const authStore = useAuthStore()

    const isAuth = authStore.isAuthenticated
    const isAdmin = authStore.isAdmin

    console.log('[guard]', {
      to: to.path,
      from: from.path,
      isAuth,
      isAdmin,
      isInitialized: authStore.isInitialized
    })

    // Root yönlendirme mantığı
    if (to.path === '/') {
      if (isAuth) return next('/dashboard')
      else return next('/auth/login')
    }

    // Auth gerekli ama giriş yapılmamışsa
    if (to.meta.requiresAuth && !isAuth) {
      return next('/auth/login')
    }

    // Admin yetkisi gerekli ama yoksa
    if (to.meta.requiresAdmin && (!isAuth || !isAdmin)) {
      return next('/dashboard')
    }

    // Misafir sayfası ama kullanıcı zaten giriş yapmışsa
    if (to.meta.requiresGuest && isAuth) {
      return next('/dashboard')
    }

    // Her şey yolunda
    next()
  } catch (error) {
    console.error('Navigation guard hatası:', error)
    next('/auth/login')
  }
})

export default router
