<template>
  <div>
    <AppNavbar />
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Header -->
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-2xl font-semibold text-gray-900">Cihaz Yönetimi</h1>
            <p class="mt-2 text-sm text-gray-700">
              Sistemdeki tüm cihazları görüntüleyin ve yönetin
            </p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              @click="showAddModal = true"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
            >
              Yeni Cihaz Ekle
            </button>
          </div>
        </div>

        <!-- Filtreler -->
        <div class="mt-6 bg-white p-4 rounded-lg shadow">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Cihaz Adı</label>
              <input
                v-model="filters.ad"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Cihaz adı ara..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Kategori</label>
              <select
                v-model="filters.kategori"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Tümü</option>
                <option value="Bilgisayar">Bilgisayar</option>
                <option value="Monitör">Monitör</option>
                <option value="Yazıcı">Yazıcı</option>
                <option value="Telefon">Telefon</option>
                <option value="Tablet">Tablet</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Durum</label>
              <select
                v-model="filters.durum"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Tümü</option>
                <option value="aktif">Aktif</option>
                <option value="pasif">Pasif</option>
                <option value="bakim">Bakımda</option>
              </select>
            </div>
            <div class="flex items-end">
              <button
                @click="fetchCihazlar"
                class="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Filtrele
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="mt-6 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p class="mt-2 text-sm text-gray-500">Cihazlar yükleniyor...</p>
        </div>

        <!-- Cihaz Listesi -->
        <div v-else class="mt-6">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cihaz Bilgileri
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QR Kod
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="cihaz in cihazlar" :key="cihaz._id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ cihaz.ad }}</div>
                      <div class="text-sm text-gray-500">{{ cihaz.marka }} - {{ cihaz.model }}</div>
                      <div class="text-xs text-gray-400">SN: {{ cihaz.seri_no }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {{ cihaz.kategori }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getDurumClass(cihaz.durum)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                      {{ getDurumText(cihaz.durum) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      @click="downloadQR(cihaz.qr_kod, cihaz.ad)"
                      class="text-primary-600 hover:text-primary-900"
                    >
                      QR İndir
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="editCihaz(cihaz)"
                      class="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Düzenle
                    </button>
                    <button
                      @click="deleteCihaz(cihaz._id, cihaz.ad)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
                <tr v-if="cihazlar.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                    Cihaz bulunamadı
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="submitForm">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                {{ showEditModal ? 'Cihaz Düzenle' : 'Yeni Cihaz Ekle' }}
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Cihaz Adı *</label>
                  <input
                    v-model="form.ad"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Marka *</label>
                    <input
                      v-model="form.marka"
                      type="text"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Model *</label>
                    <input
                      v-model="form.model"
                      type="text"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Seri No *</label>
                  <input
                    v-model="form.seri_no"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Kategori *</label>
                    <select
                      v-model="form.kategori"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Bilgisayar">Bilgisayar</option>
                      <option value="Monitör">Monitör</option>
                      <option value="Yazıcı">Yazıcı</option>
                      <option value="Telefon">Telefon</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Durum *</label>
                    <select
                      v-model="form.durum"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="">Seçiniz</option>
                      <option value="aktif">Aktif</option>
                      <option value="pasif">Pasif</option>
                      <option value="bakim">Bakımda</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Açıklama</label>
                  <textarea
                    v-model="form.aciklama"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {{ error }}
              </div>
            </div>
            
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                :disabled="submitting"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {{ submitting ? 'Kaydediliyor...' : (showEditModal ? 'Güncelle' : 'Kaydet') }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppNavbar from '@/components/AppNavbar.vue'
import apiClient from '@/plugins/axios'

const authStore = useAuthStore()

// State
const cihazlar = ref([])
const loading = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const submitting = ref(false)
const error = ref('')

// Filters
const filters = reactive({
  ad: '',
  kategori: '',
  durum: ''
})

// Form
const form = reactive({
  ad: '',
  marka: '',
  model: '',
  seri_no: '',
  kategori: '',
  durum: '',
  aciklama: ''
})

const editingId = ref(null)

// Methods
const fetchCihazlar = async () => {
  try {
    loading.value = true
    const params = {}
    
    if (filters.ad) params.ad = filters.ad
    if (filters.kategori) params.kategori = filters.kategori
    if (filters.durum) params.durum = filters.durum

    const response = await apiClient.get('/cihazlar', { params })
    cihazlar.value = response.data.data || []
  } catch (err) {
    console.error('Cihaz listesi alınırken hata:', err)
    cihazlar.value = []
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  try {
    submitting.value = true
    error.value = ''

    if (showEditModal.value) {
      await apiClient.put(`/cihazlar/${editingId.value}`, form)
    } else {
      await apiClient.post('/cihazlar', form)
    }

    closeModal()
    await fetchCihazlar()
  } catch (err) {
    error.value = err.response?.data?.message || 'Bir hata oluştu'
  } finally {
    submitting.value = false
  }
}

const editCihaz = (cihaz) => {
  editingId.value = cihaz._id
  form.cihaz_adi = cihaz.cihaz_adi
  form.marka = cihaz.marka
  form.model = cihaz.model
  form.seri_no = cihaz.seri_no
  form.kategori = cihaz.kategori
  form.durum = cihaz.durum
  form.aciklama = cihaz.aciklama || ''
  showEditModal.value = true
}

const deleteCihaz = async (id, ad) => {
  if (!confirm(`"${ad}" isimli cihazı silmek istediğinizden emin misiniz?`)) {
    return
  }

  try {
    await apiClient.delete(`/cihazlar/${id}`)
    await fetchCihazlar()
  } catch (err) {
    alert('Silme işlemi başarısız: ' + (err.response?.data?.message || 'Bilinmeyen hata'))
  }
}

const downloadQR = async (qrCode, cihazAd) => {
  try {
    const response = await apiClient.get(`/cihazlar/qr/${qrCode}`, {
      responseType: 'blob'
    })
    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${cihazAd}_QR.png`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    alert('QR kod indirme başarısız')
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingId.value = null
  error.value = ''
  
  // Form reset
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
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

onMounted(() => {
  fetchCihazlar()
})
</script>