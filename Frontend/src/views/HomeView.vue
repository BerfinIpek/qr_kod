<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <div class="bg-primary-600 p-2 rounded-lg">
                <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <h1 class="text-2xl font-bold text-gray-900">QR Stok</h1>
                <p class="text-sm text-gray-500">Kontrol Sistemi</p>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              v-if="!authStore.isAuthenticated"
              to="/login"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Giriş Yap
            </router-link>
            <router-link
              v-else
              to="/dashboard"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span class="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              QR Stok
            </span>
            <br />
            <span class="text-4xl md:text-5xl">Kontrol Sistemi</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Cihazlarınızı QR kod ile kolayca yönetin, takip edin ve kontrol edin. 
            Modern, hızlı ve güvenli stok yönetimi çözümü.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              v-if="!authStore.isAuthenticated"
              to="/login"
              class="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Hemen Başla
            </router-link>
            <router-link
              v-else
              to="/dashboard"
              class="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Dashboard'a Git
            </router-link>
            <button
              @click="scrollToFeatures"
              class="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-primary-300 hover:bg-gray-50 transition-all duration-200"
            >
              Özellikler
            </button>
          </div>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-50 animate-bounce" style="animation-delay: 0s;"></div>
      <div class="absolute top-40 right-20 w-16 h-16 bg-purple-100 rounded-full opacity-50 animate-bounce" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-40 left-20 w-12 h-12 bg-blue-100 rounded-full opacity-50 animate-bounce" style="animation-delay: 2s;"></div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Güçlü Özellikler</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            QR Stok Kontrol Sistemi ile cihaz yönetiminizi daha verimli hale getirin
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- QR Kod Yönetimi -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
            <div class="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">QR Kod Yönetimi</h3>
            <p class="text-gray-600 leading-relaxed">
              Her cihaz için benzersiz QR kodları otomatik oluştur, yazdır ve kolayca yönet.
            </p>
          </div>

          <!-- Hızlı Tarama -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
            <div class="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Hızlı Tarama</h3>
            <p class="text-gray-600 leading-relaxed">
              Mobil cihazınızla QR kodları saniyeler içinde okut ve cihaz bilgilerine anında ulaş.
            </p>
          </div>

          <!-- Kullanıcı Yönetimi -->
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
            <div class="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Kullanıcı Rolleri</h3>
            <p class="text-gray-600 leading-relaxed">
              Admin ve kullanıcı rolleri ile güvenli erişim kontrolü sağla.
            </p>
          </div>

          <!-- Cihaz Takibi -->
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
            <div class="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Cihaz Takibi</h3>
            <p class="text-gray-600 leading-relaxed">
              Tüm cihazlarını merkezi bir noktadan takip et, durumlarını güncelle.
            </p>
          </div>

          <!-- Raporlama -->
          <div class="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
            <div class="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Detaylı Raporlar</h3>
            <p class="text-gray-600 leading-relaxed">
              Cihaz durumu, kullanım geçmişi ve istatistikler ile detaylı raporlama.
            </p>
          </div>

          <!-- Güvenlik -->
          <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
            <div class="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Güvenli Erişim</h3>
            <p class="text-gray-600 leading-relaxed">
              JWT token tabanlı kimlik doğrulama ile güvenli veri erişimi.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-24 bg-gradient-to-r from-primary-600 to-purple-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">Güvenilir Performans</h2>
          <p class="text-xl text-primary-100">Binlerce kullanıcının tercih ettiği sistem</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-5xl font-bold text-white mb-2">99.9%</div>
            <div class="text-primary-100">Sistem Uptime</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-white mb-2">< 1s</div>
            <div class="text-primary-100">QR Okuma Hızı</div>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-white mb-2">256-bit</div>
            <div class="text-primary-100">Güvenlik Şifreleme</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">
          Hemen Başlayın
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          QR Stok Kontrol Sistemi ile cihazlarınızı daha verimli yönetin
        </p>
        <router-link
          v-if="!authStore.isAuthenticated"
          to="/login"
          class="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Ücretsiz Deneyin
        </router-link>
        <router-link
          v-else
          to="/dashboard"
          class="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Dashboard'a Dön
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center mb-4">
            <div class="bg-primary-600 p-2 rounded-lg mr-3">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <span class="text-2xl font-bold">QR Stok Kontrol</span>
          </div>
          <p class="text-gray-400 mb-8">
            Modern cihaz yönetimi için güvenilir çözüm
          </p>
          <div class="border-t border-gray-800 pt-8">
            <p class="text-gray-500">
              © 2024 QR Stok Kontrol Sistemi. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Kullanıcı verilerini localStorage'dan yükle
authStore.loadUserFromStorage()

const scrollToFeatures = () => {
  document.getElementById('features').scrollIntoView({ 
    behavior: 'smooth' 
  })
}
</script>