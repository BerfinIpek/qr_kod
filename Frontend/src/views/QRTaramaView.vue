<template>
  <div>
    <AppNavbar />
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">QR Kod Okuyucu</h1>
          <p class="mt-2 text-lg text-gray-600">
            Cihazın QR kodunu kamera ile okutarak bilgilerine ulaşın
          </p>
        </div>

        <!-- QR Scanner Section -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Kamera Bölümü -->
            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-900">Kamera ile QR Kod Okut</h2>
              
              <!-- Kamera Container -->
              <div class="relative bg-gray-100 rounded-lg overflow-hidden" style="height: 400px;">
                <!-- Video Element -->
                <video
                  ref="videoElement"
                  v-show="isScanning && !cameraError"
                  autoplay
                  playsinline
                  muted
                  class="w-full h-full object-cover"
                ></video>
                
                <!-- Canvas for QR Detection (Hidden) -->
                <canvas
                  ref="canvasElement"
                  style="display: none;"
                  width="640"
                  height="480"
                ></canvas>
                
                <!-- Loading State -->
                <div v-if="cameraLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                    <p class="text-gray-600 text-lg">Kamera hazırlanıyor...</p>
                    <p class="text-gray-500 text-sm mt-2">Lütfen kamera izni verin</p>
                  </div>
                </div>

                <!-- Error State -->
                <div v-if="cameraError" class="absolute inset-0 flex items-center justify-center bg-red-50">
                  <div class="text-center p-6">
                    <div class="text-red-500 text-6xl mb-4">📷</div>
                    <p class="text-red-600 font-medium mb-2">Kamera Hatası</p>
                    <p class="text-red-600 text-sm">{{ cameraError }}</p>
                    <button
                      @click="retryCamera"
                      class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Tekrar Dene
                    </button>
                  </div>
                </div>

                <!-- Scanning Overlay -->
                <div v-if="isScanning && !cameraError" class="absolute inset-0 pointer-events-none">
                  <!-- QR Frame -->
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                    <!-- Corner borders -->
                    <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500"></div>
                    <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500"></div>
                    <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500"></div>
                    <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500"></div>
                    
                    <!-- Scanning line -->
                    <div class="absolute inset-x-0 top-0 h-1 bg-primary-500 animate-ping"></div>
                  </div>
                  
                  <!-- Instructions -->
                  <div class="absolute bottom-4 left-0 right-0 text-center">
                    <div class="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg inline-block">
                      QR kodunu çerçeveye hizalayın
                    </div>
                  </div>
                </div>

                <!-- Success Animation -->
                <div v-if="qrDetected" class="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-90">
                  <div class="text-center text-white">
                    <div class="text-6xl mb-4">✅</div>
                    <p class="text-xl font-bold">QR Kod Okundu!</p>
                    <p class="text-sm mt-2">Cihaz bilgileri getiriliyor...</p>
                  </div>
                </div>
              </div>

              <!-- Kamera Kontrolleri -->
              <div class="flex gap-4 justify-center flex-wrap">
                <button
                  v-if="!isScanning"
                  @click="startScanning"
                  :disabled="cameraLoading"
                  class="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ cameraLoading ? 'Hazırlanıyor...' : 'Kamerayı Aç' }}
                </button>
                
                <button
                  v-if="isScanning"
                  @click="stopScanning"
                  class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                  </svg>
                  Kamerayı Kapat
                </button>

                <button
                  @click="resetScanner"
                  class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Sıfırla
                </button>

                <button
                  v-if="isScanning"
                  @click="switchCamera"
                  class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                  Kamera Değiş
                </button>
              </div>

              <!-- Scanner Status -->
              <div class="text-center">
                <div v-if="isScanning && !cameraError" class="flex items-center justify-center space-x-2 text-green-600">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-sm font-medium">Tarama aktif - QR kod arıyor...</span>
                </div>
                <div v-else-if="!isScanning && !cameraError" class="text-gray-500 text-sm">
                  Tarama durduruldu
                </div>
              </div>
            </div>

            <!-- Sonuç Bölümü -->
            <div class="space-y-6">
              <h2 class="text-xl font-semibold text-gray-900">Cihaz Bilgileri</h2>
              
              <!-- Cihaz Bilgi Kartı -->
              <div v-if="cihazBilgi" class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border border-blue-200 transform transition-all duration-500">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h3 class="text-2xl font-bold text-gray-900">{{ cihazBilgi.ad }}</h3>
                    <span :class="getDurumClass(cihazBilgi.durum)" class="px-3 py-1 rounded-full text-sm font-semibold">
                      {{ getDurumText(cihazBilgi.durum) }}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg shadow-sm">
                      <span class="font-semibold text-gray-600">Marka:</span>
                      <p class="text-gray-900 font-medium">{{ cihazBilgi.marka }}</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm">
                      <span class="font-semibold text-gray-600">Model:</span>
                      <p class="text-gray-900 font-medium">{{ cihazBilgi.model }}</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm">
                      <span class="font-semibold text-gray-600">Seri No:</span>
                      <p class="text-gray-900 font-medium">{{ cihazBilgi.seri_no }}</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm">
                      <span class="font-semibold text-gray-600">Kategori:</span>
                      <p class="text-gray-900 font-medium">{{ cihazBilgi.kategori }}</p>
                    </div>
                  </div>
                  
                  <div v-if="cihazBilgi.aciklama" class="bg-white p-3 rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-600">Açıklama:</span>
                    <p class="text-gray-900 mt-1">{{ cihazBilgi.aciklama }}</p>
                  </div>
                  
                  <div class="bg-white p-3 rounded-lg shadow-sm border-t">
                    <span class="font-semibold text-gray-600">QR Kod:</span>
                    <p class="text-gray-900 font-mono text-sm">{{ lastScannedQR.value }}</p>
                  </div>
                  
                  <div class="bg-white p-3 rounded-lg shadow-sm">
                    <span class="font-semibold text-gray-600">Kayıt Tarihi:</span>
                    <p class="text-gray-900">{{ formatDate(cihazBilgi.created_at) }}</p>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex gap-3 pt-2">
                    <router-link
                      :to="'/dashboard/cihazlar'"
                      class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Cihazı Düzenle
                    </router-link>
                    <button
                      @click="downloadQRCode"
                      :disabled="downloadingQR"
                      class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm flex items-center gap-2 disabled:opacity-50"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      {{ downloadingQR ? 'İndiriliyor...' : 'QR İndir' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Manuel QR Kod Girişi -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Manuel QR Kod Girişi</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">QR Kod Değeri</label>
                    <input
                      v-model="manuelQrKod"
                      type="text"
                      placeholder="QR kod değerini girin (örn: QR-ABC123456)"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      @keyup.enter="manuelArama"
                    />
                  </div>
                  <button
                    @click="manuelArama"
                    :disabled="!manuelQrKod.trim() || searching"
                    class="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg v-if="searching" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ searching ? 'Aranıyor...' : 'Cihazı Ara' }}
                  </button>
                </div>
              </div>

              <!-- Messages -->
              <div class="space-y-3">
                <!-- Error Message -->
                <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                  <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <strong>Hata:</strong> {{ error }}
                  </div>
                </div>

                <!-- Success Message -->
                <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <strong>Başarılı:</strong> {{ successMessage }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Son QR Okumalar -->
        <div v-if="sonOkumalar.length > 0" class="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Son QR Okumalar</h2>
          <div class="space-y-2">
            <div
              v-for="(okuma, index) in sonOkumalar"
              :key="index"
              class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              @click="loadPreviousRead(okuma)"
            >
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <span class="font-medium text-gray-900">{{ okuma.cihaz.cihaz_adi }}</span>
                  <div class="text-sm text-gray-500">
                    {{ okuma.cihaz.marka }} {{ okuma.cihaz.model }} - {{ okuma.qrCode }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-500">{{ formatTime(okuma.zaman) }}</div>
                <div class="text-xs text-gray-400">{{ formatTimeAgo(okuma.zaman) }}</div>
              </div>
            </div>
          </div>
          
          <button
            v-if="sonOkumalar.length >= 5"
            @click="clearHistory"
            class="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            Geçmişi Temizle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import apiClient from '@/plugins/axios'


// QR Code library (jsQR) - CDN'den yüklenir
let jsQR = null

// State
const videoElement = ref(null)
const canvasElement = ref(null)
const isScanning = ref(false)
const cameraLoading = ref(false)
const cameraError = ref('')
const cihazBilgi = ref(null)
const manuelQrKod = ref('')
const searching = ref(false)
const error = ref('')
const successMessage = ref('')
const sonOkumalar = ref([])
const qrDetected = ref(false)
const lastScannedQR = ref('')
const downloadingQR = ref(false)

let stream = null
let scanInterval = null
let currentFacingMode = 'environment' // 'user' for front camera, 'environment' for back camera

// Load jsQR library
const loadJsQR = async () => {
  if (window.jsQR) {
    jsQR = window.jsQR
    return
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'
    script.onload = () => {
      jsQR = window.jsQR
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// Methods
const startScanning = async () => {
  try {
    cameraLoading.value = true
    cameraError.value = ''
    error.value = ''
    qrDetected.value = false

    // Load jsQR library if not loaded
    if (!jsQR) {
      await loadJsQR()
    }

    // Request camera access
    const constraints = {
      video: {
        facingMode: currentFacingMode,
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 }
      }
    }

    stream = await navigator.mediaDevices.getUserMedia(constraints)

    await nextTick()
    
    if (videoElement.value) {
      videoElement.value.srcObject = stream
      await videoElement.value.play()
    }

    isScanning.value = true
    cameraLoading.value = false

    // Start QR code detection
    startQRDetection()
    
  } catch (err) {
    cameraLoading.value = false
    
    if (err.name === 'NotAllowedError') {
      cameraError.value = 'Kamera erişimi reddedildi. Lütfen tarayıcı ayarlarından kamera iznini etkinleştirin.'
    } else if (err.name === 'NotFoundError') {
      cameraError.value = 'Kamera bulunamadı. Cihazınızda kamera bulunduğundan emin olun.'
    } else if (err.name === 'NotSupportedError') {
      cameraError.value = 'Tarayıcınız kamera erişimini desteklemiyor.'
    } else {
      cameraError.value = 'Kameraya erişim sağlanamadı: ' + (err.message || 'Bilinmeyen hata')
    }
    
    console.error('Camera error:', err)
  }
}

const startQRDetection = () => {
  if (!canvasElement.value || !videoElement.value) return

  const canvas = canvasElement.value
  const ctx = canvas.getContext('2d')
  const video = videoElement.value

  const detectQR = () => {
    if (!isScanning.value) return

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      if (jsQR) {
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        })

        if (code && code.data) {
          handleQRDetected(code.data)
          return
        }
      }
    }

    // Continue scanning
    scanInterval = requestAnimationFrame(detectQR)
  }

  detectQR()
}

const handleQRDetected = async (qrData) => {
  if (qrDetected.value) return; // Önceki taramayı engelle
  qrDetected.value = true;
  lastScannedQR.value = qrData;

  // Visual feedback
  setTimeout(() => { qrDetected.value = false }, 2000);

  // Cihazı ara
  await searchDeviceByQR(qrData);

  // Tarama durdur
  setTimeout(() => { stopScanning() }, 1500);
}

const stopScanning = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
  
  if (scanInterval) {
    cancelAnimationFrame(scanInterval)
    scanInterval = null
  }
  
  isScanning.value = false
  cameraLoading.value = false
  qrDetected.value = false
}

const resetScanner = () => {
  stopScanning()
  cihazBilgi.value = null
  error.value = ''
  successMessage.value = ''
  cameraError.value = ''
  lastScannedQR.value = ''
  manuelQrKod.value = ''
}

const switchCamera = async () => {
  currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment'
  
  if (isScanning.value) {
    stopScanning()
    await nextTick()
    startScanning()
  }
}

const retryCamera = () => {
  cameraError.value = ''
  startScanning()
}

async function searchDeviceByQR(qrCode) {
  try {
    const response = await apiClient.post('/cihazlar/qr-scan', {
       qr_data: qrCode 
    });

    console.log('QR search success:', response.data);

    if (response.data.success) {
      cihazBilgi.value = response.data.data;
      successMessage.value = response.data.message;
      error.value = '';
      
      // Son okumalara ekle
      addToHistory({ qrCode, cihaz: response.data.data, zaman: new Date() });
    }

    return response.data;

  } catch (err) {
    if (err.response) {
      console.error('QR search error:', err.response.data);
      error.value = err.response.data.error || 'Cihaz bulunamadı';
    } else {
      console.error('QR search error:', err.message);
      error.value = err.message;
    }
  }
}

const manuelArama = async () => {
  if (!manuelQrKod.value.trim()) return;
  await searchDeviceByQR(manuelQrKod.value.trim());
  manuelQrKod.value = '';
}


const downloadQRCode = async () => {
  if (!cihazBilgi.value) return

  try {
    downloadingQR.value = true
    
    const response = await apiClient.get(`/cihazlar/${encodeURIComponent(lastScannedQR.value)}/qr-download`, {
      responseType: 'blob'
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${cihazBilgi.value.ad}_QR.png`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    
    successMessage.value = 'QR kod başarıyla indirildi!'
    
  } catch (err) {
    error.value = 'QR kod indirme başarısız: ' + (err.response?.data?.message || 'Bilinmeyen hata')
  } finally {
    downloadingQR.value = false
  }
}

const addToHistory = (reading) => {
  // Check if already exists
  const exists = sonOkumalar.value.some(item => 
    item.qrCode === reading.qrCode && 
    item.cihaz._id === reading.cihaz._id
  )
  
  if (!exists) {
    sonOkumalar.value.unshift(reading)
    
    // Keep maximum 10 readings
    if (sonOkumalar.value.length > 10) {
      sonOkumalar.value = sonOkumalar.value.slice(0, 10)
    }
    
    // Save to localStorage
    localStorage.setItem('qr_scan_history', JSON.stringify(sonOkumalar.value))
  }
}

const loadPreviousRead = (okuma) => {
  cihazBilgi.value = okuma.cihaz
  lastScannedQR.value = okuma.qrCode
  successMessage.value = 'Önceki okuma yüklendi'
  error.value = ''
}

const clearHistory = () => {
  sonOkumalar.value = []
  localStorage.removeItem('qr_scan_history')
}

const loadHistoryFromStorage = () => {
  try {
    const stored = localStorage.getItem('qr_scan_history')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        sonOkumalar.value = parsed.map(item => ({
          ...item,
          zaman: new Date(item.zaman)
        }))
      }
    }
  } catch (err) {
    console.error('History loading error:', err)
  }
}

const getDurumClass = (durum) => {
  const classes = {
    'aktif': 'bg-green-100 text-green-800',
    'pasif': 'bg-red-100 text-red-800',
    'bakim': 'bg-yellow-100 text-yellow-800'
  }
  return classes[durum] || 'bg-gray-100 text-gray-800'
}

const getDurumText = (durum) => {
  const texts = {
    'aktif': 'Aktif',
    'pasif': 'Pasif',
    'bakim': 'Bakımda'
  }
  return texts[durum] || durum
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const formatTimeAgo = (date) => {
  if (!date) return '-'
  
  const now = new Date()
  const diff = now - new Date(date)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'Az önce'
  if (minutes < 60) return `${minutes} dk önce`
  if (hours < 24) return `${hours} sa önce`
  if (days < 7) return `${days} gün önce`
  
  return formatDate(date)
}

// Auto-clear messages after 5 seconds
let messageTimeout = null

const clearMessages = () => {
  if (messageTimeout) {
    clearTimeout(messageTimeout)
  }
  
  messageTimeout = setTimeout(() => {
    if (!searching.value && !cameraLoading.value) {
      successMessage.value = ''
      error.value = ''
    }
  }, 5000)
}

// Watch for message changes
const watchMessages = () => {
  if (successMessage.value || error.value) {
    clearMessages()
  }
}

// Lifecycle hooks
onMounted(async () => {
  // Check camera support
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraError.value = 'Bu tarayıcı kamera desteği sağlamıyor. Lütfen güncel bir tarayıcı kullanın.'
    return
  }

  // Load scan history
  loadHistoryFromStorage()

  // Load jsQR library
  try {
    await loadJsQR()
  } catch (err) {
    console.error('jsQR loading error:', err)
    cameraError.value = 'QR kod okuma kütüphanesi yüklenemedi. İnternet bağlantınızı kontrol edin.'
  }

  // Check if there's a QR code in URL params (for deep linking)
  const urlParams = new URLSearchParams(window.location.search)
  const qrParam = urlParams.get('qr')
  if (qrParam) {
    manuelQrKod.value = qrParam
    await manuelArama()
  }
})

onUnmounted(() => {
  stopScanning()
  if (messageTimeout) {
    clearTimeout(messageTimeout)
  }
})

// Global test function for development
if (import.meta.env.DEV) {
  window.testQRScan = (qrValue) => {
    console.log('Testing QR scan with value:', qrValue)
    handleQRDetected(qrValue)
  }
  
  window.testDevices = () => {
    const testDevices = [
      'QR_LAPTOP_001',
      'QR_MONITOR_002', 
      'QR_PRINTER_003',
      'QR_PHONE_004',
      'QR_TABLET_005'
    ]
    
    console.log('Test QR kodları:')
    testDevices.forEach(qr => console.log(`window.testQRScan('${qr}')`))
  }
  
  console.log('🔧 Development mode: QR Test fonksiyonları yüklendi')
  console.log('📱 window.testQRScan("QR_KOD") - QR kod test et')
  console.log('📋 window.testDevices() - Test QR kodlarını listele')
}

// Watch for message changes to auto-clear
let successWatcher, errorWatcher

onMounted(() => {
  successWatcher = () => watchMessages()
  errorWatcher = () => watchMessages()
})
</script>

<style scoped>
/* Custom animations */
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(400px); }
}

.scan-line {
  animation: scan-line 2s ease-in-out infinite;
}

/* Responsive video container */
@media (max-width: 640px) {
  .video-container {
    height: 300px;
  }
}

/* QR frame styling */
.qr-frame-corner {
  width: 20px;
  height: 20px;
  position: absolute;
}

.qr-frame-corner::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: currentColor;
}

.qr-frame-corner::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 100%;
  background-color: currentColor;
}

/* Loading animation for QR detection */
.qr-loading {
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
  animation: qr-scan 2s infinite;
}

@keyframes qr-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>