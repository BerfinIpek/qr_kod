<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-gray-900">
          {{ isEditing ? 'Cihaz Düzenle' : 'Yeni Cihaz Ekle' }}
        </h3>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600" type="button">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="errors.length" class="bg-red-50 border border-red-200 rounded-md p-4">
          <ul class="list-disc list-inside text-red-800 text-sm space-y-1">
            <li v-for="e in errors" :key="e">{{ e }}</li>
          </ul>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Cihaz Adı -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Cihaz Adı <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.cihaz_adi"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cihaz adını girin"
            />
          </div>

          <!-- Seri No -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Seri No <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.seri_no"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seri numarası"
            />
          </div>

          <!-- Kategori -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kategori <span class="text-red-500">*</span></label>
            <select v-model="form.kategori" required class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Kategori Seçin</option>
              <option value="bilgisayar">Bilgisayar</option>
              <option value="yazici">Yazıcı</option>
              <option value="telefon">Telefon</option>
              <option value="tablet">Tablet</option>
              <option value="diger">Diğer</option>
            </select>
          </div>

          <!-- Marka -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Marka</label>
            <input v-model="form.marka" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

          <!-- Model -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input v-model="form.model" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>

          <!-- Lokasyon -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lokasyon <span class="text-red-500">*</span></label>
            <select v-model="form.lokasyon" required class="w-full px-3 py-2 border rounded-md">
              <option value="">Lokasyon Seçin</option>
              <option value="ofis">Ofis</option>
              <option value="depo">Depo</option>
              <option value="fabrika">Fabrika</option>
              <option value="saha">Saha</option>
            </select>
          </div>

          <!-- Durum -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Durum <span class="text-red-500">*</span></label>
            <select v-model="form.durum" required class="w-full px-3 py-2 border rounded-md">
              <option value="">Durum Seçin</option>
              <option value="aktif">Aktif</option>
              <option value="bakim">Bakımda</option>
              <option value="bozuk">Bozuk</option>
              <option value="pasif">Pasif</option>
            </select>
          </div>

          <!-- Tarih/Fiyat/Sorumlu -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alım Tarihi</label>
            <input v-model="form.alim_tarihi" type="date" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Garanti Bitiş Tarihi</label>
            <input v-model="form.garanti_bitis_tarihi" type="date" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL)</label>
            <input v-model="form.fiyat" type="number" step="0.01" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sorumlu Kişi</label>
            <input v-model="form.sorumlu_kisi" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <!-- Açıklama -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
          <textarea v-model="form.aciklama" rows="3" class="w-full px-3 py-2 border rounded-md"></textarea>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-2 pt-4 border-t">
          <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 rounded-lg">İptal</button>
          <button type="submit" :disabled="loading" class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
            <span v-if="loading" class="flex items-center">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Kaydediliyor...
            </span>
            <span v-else>{{ isEditing ? 'Güncelle' : 'Kaydet' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useDeviceStore } from '@/stores/device'

const props = defineProps({
  show: Boolean,
  device: Object
})
const emit = defineEmits(['close', 'saved'])

const deviceStore = useDeviceStore()
const loading = ref(false)
const errors = ref([])

const isEditing = computed(() => !!props.device)

const form = reactive({
  cihaz_adi: '',
  seri_no: '',
  qr_degeri: '',
  kategori: '',
  marka: '',
  model: '',
  lokasyon: '',
  durum: '',
  alim_tarihi: '',
  garanti_bitis_tarihi: '',
  fiyat: '',
  sorumlu_kisi: '',
  aciklama: ''
})

watch(() => props.device, (device) => {
  if (device) {
    Object.keys(form).forEach(k => { form[k] = device[k] ?? '' })
    if (device.alim_tarihi) form.alim_tarihi = device.alim_tarihi.split(' ')[0]
    if (device.garanti_bitis_tarihi) form.garanti_bitis_tarihi = device.garanti_bitis_tarihi.split(' ')[0]
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm () {
  Object.keys(form).forEach(k => { form[k] = '' })
  errors.value = []
}

async function handleSubmit () {
  loading.value = true
  errors.value = []
  try {
    const result = isEditing.value
      ? await deviceStore.updateDevice(props.device.id, form)
      : await deviceStore.createDevice(form)

    if (result?.success) {
      emit('saved')
      resetForm()
    } else {
      errors.value = [result?.error || 'Kayıt başarısız']
    }
  } catch (e) {
    errors.value = ['Bir hata oluştu: ' + (e?.message || e)]
  } finally {
    loading.value = false
  }
}

function closeModal () {
  resetForm()
  emit('close')
}
</script>
