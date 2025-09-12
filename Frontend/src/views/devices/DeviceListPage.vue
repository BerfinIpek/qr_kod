<template>
  <div class="space-y-6">
    <!-- Sayfa Başlığı -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Cihaz Yönetimi</h1>
        <p class="text-gray-600">Sistemdeki tüm cihazları görüntüle ve yönet</p>
      </div>
      <!-- Yeni Cihaz Ekle Butonu -->
  <button
        type="button"
        @click.prevent="openCreateModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <span>Yeni Cihaz</span>
      </button>
    </div>

    <!-- Filtreler -->
     <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            v-model="filters.search"
            @input="applyFilters"
            type="text"
            placeholder="Cihaz adı, seri no ara..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            v-model="filters.category"
            @change="applyFilters"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tüm Kategoriler</option>
            <option value="bilgisayar">Bilgisayar</option>
            <option value="yazici">Yazıcı</option>
            <option value="telefon">Telefon</option>
            <option value="tablet">Tablet</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
        <div>
          <select
            v-model="filters.location"
            @change="applyFilters"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tüm Lokasyonlar</option>
            <option value="ofis">Ofis</option>
            <option value="depo">Depo</option>
            <option value="fabrika">Fabrika</option>
            <option value="saha">Saha</option>
          </select>
        </div>
        <div>
          <select
            v-model="filters.status"
            @change="applyFilters"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tüm Durumlar</option>
            <option value="aktif">Aktif</option>
            <option value="bakim">Bakım</option>
            <option value="bozuk">Bozuk</option>
            <option value="pasif">Pasif</option>
          </select>
        </div>
      </div>
    </div> 

    <!-- Hata Mesajı -->
    <div v-if="deviceStore.error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <div class="text-red-800">{{ deviceStore.error }}</div>
      </div>
    </div>

    <!-- Cihaz Listesi -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Yükleme durumu -->
      <div v-if="deviceStore.loading" class="p-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Cihazlar yükleniyor...</p>
      </div>

      <!-- Cihaz tablosu -->
      <div v-else-if="deviceStore.hasDevices" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cihaz Bilgileri
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lokasyon
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="device in deviceStore.devices" :key="device.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ device.ad }}</div>
                  <div class="text-sm text-gray-500">{{ device.seri_no }}</div>
                  <div v-if="device.marka" class="text-xs text-gray-400">{{ device.marka }} - {{ device.model }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ device.kategori }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ device.konum }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(device.durum)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ getStatusText(device.durum) }}
                </span>
              </td>
               <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                 <button
                  @click="downloadQR(device.id)"
                  class="text-green-600 hover:text-green-900"
                  title="QR Kod İndir"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </button>
                <button
                  @click="editDevice(device)"
                  class="text-blue-600 hover:text-blue-900"
                  title="Düzenle"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="deleteDevice(device.id, device.ad)"
                  class="text-red-600 hover:text-red-900"
                  title="Sil"
                > 
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td> 
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Boş durum -->
      <div v-else class="p-8 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Henüz cihaz yok</h3>
        <p class="mt-2 text-gray-500">İlk cihazınızı ekleyerek başlayın</p>
        <button 
          @click="showCreateModal = true"
          class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Cihaz Ekle
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="deviceStore.pagination && deviceStore.pagination.last_page > 1" class="flex justify-center">
      <nav class="flex space-x-2">
        <button
          @click="changePage(deviceStore.pagination.current_page - 1)"
          :disabled="deviceStore.pagination.current_page <= 1"
          class="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Önceki
        </button>
        
        <span class="px-3 py-2 text-sm bg-blue-600 text-white rounded-md">
          {{ deviceStore.pagination.current_page }} / {{ deviceStore.pagination.last_page }}
        </span>
        
        <button
          @click="changePage(deviceStore.pagination.current_page + 1)"
          :disabled="deviceStore.pagination.current_page >= deviceStore.pagination.last_page"
          class="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Sonraki
        </button>
      </nav>
    </div>

    <!-- Cihaz Ekleme/Düzenleme Modal -->
    <DeviceFormModal
      v-if="showCreateModal || showEditModal"
      :show="showCreateModal || showEditModal"
      :device="selectedDevice"
      @close="closeModals"
      @saved="handleDeviceSaved"
    />
    <!--<DeviceFormModal v-if="showCreateModal" @close="showCreateModal = false" />-->


    <!-- Silme Onay Modal -->
    <ConfirmModal
      v-if="showDeleteModal"
      :show="showDeleteModal"
      :title="'Cihaz Sil'"
      :message="`'${deviceToDelete.name}' cihazını silmek istediğinizden emin misiniz?`"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useDeviceStore } from '@/stores/device'
import DeviceFormModal from '@/components/DeviceFormModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const deviceStore = useDeviceStore()


// Reactive state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedDevice = ref(null)
const deviceToDelete = ref({ id: null, name: '' })

// Component methods
onMounted(async () => {
  await loadDevices()
})

const loadDevices = async () => {
  await deviceStore.fetchDevices()
}
// Filtreler

const filters = reactive({
  search: '',
  category: '',
  location: '',
  status: ''
})

const applyFilters = async () => {
  deviceStore.setFilter('arama', filters.search)
  deviceStore.setFilter('kategori', filters.category)
  deviceStore.setFilter('konum', filters.location)
  deviceStore.setFilter('durum', filters.status)
  
  await deviceStore.fetchDevices()
}

const changePage = async (page) => {
  if (page >= 1 && page <= deviceStore.pagination.last_page) {
    await deviceStore.fetchDevices({ page })
  }
}

const downloadQR = async (deviceId) => {
  const result = await deviceStore.downloadQR(deviceId)
  if (result.success) {
    console.log('QR kod indirildi')
  }
}

const editDevice = (device) => {
  selectedDevice.value = device
  showEditModal.value = true
}

const deleteDevice = (deviceId, deviceName) => {
  deviceToDelete.value = { id: deviceId, name: deviceName }
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  const result = await deviceStore.deleteDevice(deviceToDelete.value.id)
  if (result.success) {
    showDeleteModal.value = false
    deviceToDelete.value = { id: null, name: '' }
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedDevice.value = null
}

const handleDeviceSaved = () => {
  closeModals()
  loadDevices()
}

// Helper functions
const getStatusClass = (status) => {
  const classes = {
    'aktif': 'bg-green-100 text-green-800',
    'bakim': 'bg-yellow-100 text-yellow-800',
    'bozuk': 'bg-red-100 text-red-800',
    'pasif': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    'aktif': 'Aktif',
    'bakim': 'Bakımda',
    'bozuk': 'Bozuk',
    'pasif': 'Pasif'
  }
  return texts[status] || status
}
function openCreateModal () {
  // emin olmak için önce kapat, sonra aç
  showEditModal.value = false
  selectedDevice.value = null
  showCreateModal.value = true
  // console.log('Create modal açıldı') // istersen debug için koy
}

function openEditModal (device) {
  showCreateModal.value = false
  selectedDevice.value = device
  showEditModal.value = true
}

</script>