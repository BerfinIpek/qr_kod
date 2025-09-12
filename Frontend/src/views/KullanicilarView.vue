<template>
  <div>
    <AppNavbar />

    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Admin kontrolü -->
        <div
          v-if="!authStore.isAdmin"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
        >
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            Bu sayfaya erişim yetkiniz bulunmamaktadır. Sadece yöneticiler kullanıcı yönetimi yapabilir.
          </div>
        </div>

        <div v-else>
          <!-- Başlık + Ekle -->
          <div class="mb-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-900">👥 Kullanıcı Yönetimi</h1>
                <p class="mt-2 text-lg text-gray-600">
                  Sistem kullanıcılarını yönetin, yeni kullanıcı ekleyin ve yetkileri düzenleyin
                </p>
              </div>
              <div class="mt-4 sm:mt-0">
                <button
                  type="button"
                  @click="showAddModal = true"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:scale-105 transition-all"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Yeni Kullanıcı Ekle
                </button>
              </div>
            </div>

            <!-- İstatistik Kartları -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <!-- Toplam -->
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-blue-100 text-sm font-medium">Toplam Kullanıcı</p>
                    <p class="text-3xl font-bold">{{ userStats.total }}</p>
                  </div>
                  <div class="bg-blue-400 p-3 rounded-full">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Admin -->
              <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-purple-100 text-sm font-medium">Admin</p>
                    <p class="text-3xl font-bold">{{ userStats.admins }}</p>
                  </div>
                  <div class="bg-purple-400 p-3 rounded-full">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Kullanıcı -->
              <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-green-100 text-sm font-medium">Kullanıcı</p>
                    <p class="text-3xl font-bold">{{ userStats.users }}</p>
                  </div>
                  <div class="bg-green-400 p-3 rounded-full">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Bu Ay Eklenen -->
              <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl text-white shadow-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-yellow-100 text-sm font-medium">Bu Ay Eklenen</p>
                    <p class="text-3xl font-bold">{{ userStats.thisMonth }}</p>
                  </div>
                  <div class="bg-yellow-400 p-3 rounded-full">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gelişmiş Filtreleme -->
           <div class="mb-6 bg-white p-6 rounded-xl shadow-lg border">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">🔍 Gelişmiş Filtreleme</h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                <input
                  v-model="filters.ad_soyad"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Ara..."
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="filters.email"
                  type="email"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  v-model="filters.rol"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">Tümü</option>
                  <option value="admin">Admin</option>
                  <option value="user">Kullanıcı</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Kayıt Tarihi</label>
                <select
                  v-model="filters.created_at"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="">Tümü</option>
                  <option value="today">Bugün</option>
                  <option value="week">Bu Hafta</option>
                  <option value="month">Bu Ay</option>
                  <option value="year">Bu Yıl</option>
                </select>
              </div>
              <div class="flex items-end space-x-2">
                <button
                  @click="fetchKullanicilar"
                  class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center justify-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Filtrele
                </button>
                <button
                  @click="clearFilters"
                  class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
 
          <!-- Toplu işlemler -->
          <div v-if="selectedUsers.length > 0" class="mb-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-blue-800 font-medium">{{ selectedUsers.length }} kullanıcı seçildi</span>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="bulkDelete"
                  class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
                >
                  Seçilenleri Sil
                </button>
                <button
                  @click="clearSelection"
                  class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm"
                >
                  Seçimi Temizle
                </button>
              </div>
            </div>
          </div>

          <!-- Yükleniyor -->
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p class="mt-4 text-gray-500">Kullanıcılar yükleniyor...</p>
          </div>

          <!-- Tablo -->
          <div v-else class="bg-white shadow-xl rounded-xl overflow-hidden">
            <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">Kullanıcı Listesi</h3>
                <div class="flex items-center space-x-3">
                  <span class="text-sm text-gray-500">{{ filteredCount }} kullanıcı görüntüleniyor</span>
                  <button
                    @click="exportUsers"
                    class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Excel'e Aktar
                  </button>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        @change="toggleAll"
                        :checked="isAllSelected"
                        class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </th>

                    <!-- DÜZELTİLDİ: th kapanışı eklendi -->
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      @click="sortBy('ad_soyad')"
                    >
                      <div class="flex items-center space-x-1">
                        <span>Kullanıcı Bilgileri</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>

                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      @click="sortBy('email')"
                    >
                      Email
                    </th>

                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol & Yetki
                    </th>

                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      @click="sortBy('created_at')"
                    >
                      Kayıt Tarihi
                    </th>

                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Son Aktivite
                    </th>

                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="kullanici in paginatedUsers"
                    :key="kullanici._id"
                    :class="selectedUsers.includes(kullanici._id) ? 'bg-blue-50' : 'hover:bg-gray-50'"
                    class="transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        :value="kullanici._id"
                        v-model="selectedUsers"
                        class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-12 w-12">
                          <div class="h-12 w-12 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                            <span class="text-sm font-bold text-white">
                              {{ getInitials(kullanici.ad_soyad) }}
                            </span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-bold text-gray-900">{{ kullanici.ad_soyad }}</div>
                          <div class="text-sm text-gray-500">
                            {{ kullanici.telefon || 'Telefon bilgisi yok' }}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ kullanici.email }}</div>
                      <div class="text-sm text-gray-500">{{ getEmailDomain(kullanici.email) }}</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getRolClass(kullanici.rol)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            :d="getRolIcon(kullanici.rol)"
                          />
                        </svg>
                        {{ getRolText(kullanici.rol) }}
                      </span>
                      <div class="text-xs text-gray-500 mt-1">
                        {{ getRolDescription(kullanici.rol) }}
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{{ formatDate(kullanici.created_at) }}</div>
                      <div class="text-xs text-gray-500">{{ getTimeAgo(kullanici.created_at) }}</div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span class="text-sm text-gray-500">Online</span>
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex space-x-2">
                        <button
                          @click="editKullanici(kullanici)"
                          class="text-indigo-600 hover:text-indigo-900 p-2 rounded hover:bg-indigo-50"
                          title="Düzenle"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        <button
                          @click="viewKullanici(kullanici)"
                          class="text-green-600 hover:text-green-900 p-2 rounded hover:bg-green-50"
                          title="Detaylar"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        <button
                          v-if="kullanici._id !== authStore.user._id"
                          @click="deleteKullanici(kullanici._id, kullanici.ad_soyad)"
                          class="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50"
                          title="Sil"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>

                        <span v-else class="text-gray-400 p-2" title="Kendi hesabınızı silemezsiniz">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="paginatedUsers.length === 0">
                    <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      <p class="text-lg font-medium mb-2">Kullanıcı bulunamadı</p>
                      <p class="text-sm">Filtreleri değiştirmeyi deneyin veya yeni kullanıcı ekleyin.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                  <button
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Önceki
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Sonraki
                  </button>
                </div>

                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      <span class="font-medium">{{ startIndex }}</span> - <span class="font-medium">{{ endIndex }}</span> arası,
                      toplam <span class="font-medium">{{ filteredUsers.length }}</span> kullanıcı
                    </p>
                  </div>

                  <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        @click="prevPage"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                      </button>

                      <button
                        v-for="page in visiblePages"
                        :key="page"
                        @click="goToPage(page)"
                        :class="page === currentPage
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        {{ page }}
                      </button>

                      <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Pagination -->
          </div>
          <!-- /Tablo -->
        </div>
        <!-- /v-else -->
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <form @submit.prevent="submitForm">
            <div class="bg-white px-6 pt-6 pb-4">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl leading-6 font-bold text-gray-900">
                  {{ showEditModal ? '✏️ Kullanıcı Düzenle' : '➕ Yeni Kullanıcı Ekle' }}
                </h3>
                <button
                  type="button"
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                  <input
                    v-model="form.ad_soyad"
                    type="text"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="Kullanıcının tam adı"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <input
                    v-model="form.telefon"
                    type="tel"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="+90 555 123 45 67"
                  />
                </div>

                <div v-if="!showEditModal">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Şifre *</label>
                  <div class="relative">
                    <input
                      v-model="form.sifre"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      minlength="6"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pr-10"
                      placeholder="En az 6 karakter"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg v-if="!showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    </button>
                  </div>
                  <p class="mt-1 text-xs text-gray-500">Güçlü şifre: büyük/küçük harf, sayı ve özel karakter</p>
                </div>

                <div v-if="showEditModal">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre (Opsiyonel)</label>
                  <input
                    v-model="form.sifre"
                    type="password"
                    minlength="6"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="Boş bırakırsanız şifre değişmez"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Rol *</label>
                  <select
                    v-model="form.rol"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="">Rol seçiniz</option>
                    <option value="admin">👑 Admin - Tam yetki</option>
                    <option value="user">👤 Kullanıcı - Kısıtlı yetki</option>
                  </select>
                </div>
              </div>

              <div
                v-if="form.rol"
                class="mt-4 p-4 rounded-lg"
                :class="form.rol === 'admin' ? 'bg-purple-50 border border-purple-200' : 'bg-blue-50 border border-blue-200'"
              >
                <h4
                  class="font-medium text-sm mb-2"
                  :class="form.rol === 'admin' ? 'text-purple-800' : 'text-blue-800'"
                >
                  {{ form.rol === 'admin' ? '👑 Admin Yetkileri:' : '👤 Kullanıcı Yetkileri:' }}
                </h4>
                <ul class="text-xs space-y-1" :class="form.rol === 'admin' ? 'text-purple-700' : 'text-blue-700'">
                  <li v-if="form.rol === 'admin'">✅ Tüm cihazları görüntüleme ve yönetme</li>
                  <li v-if="form.rol === 'admin'">✅ Kullanıcı ekleme, silme ve düzenleme</li>
                  <li v-if="form.rol === 'admin'">✅ Sistem ayarları ve raporlar</li>
                  <li v-if="form.rol === 'admin'">✅ QR kod oluşturma ve yazdırma</li>
                  <li v-if="form.rol === 'user'">✅ Cihaz ekleme ve düzenleme</li>
                  <li v-if="form.rol === 'user'">✅ QR kod okuma</li>
                  <li v-if="form.rol === 'user'">❌ Kullanıcı yönetimi</li>
                  <li v-if="form.rol === 'user'">❌ Sistem ayarları</li>
                </ul>
              </div>

              <div v-if="error" class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-start">
                <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div><strong>Hata:</strong> {{ error }}</div>
              </div>
            </div>

            <div class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                :disabled="submitting"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  v-if="submitting"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                {{ submitting ? 'Kaydediliyor...' : (showEditModal ? 'Güncelle' : 'Kullanıcı Ekle') }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Detay Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-6 pt-6 pb-4">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl leading-6 font-bold text-gray-900">👤 Kullanıcı Detayları</h3>
              <button
                type="button"
                @click="showDetailModal = false"
                class="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div v-if="selectedUserDetail" class="space-y-6">
              <div class="text-center">
                <div class="h-20 w-20 mx-auto rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                  <span class="text-2xl font-bold text-white">{{ getInitials(selectedUserDetail.ad_soyad) }}</span>
                </div>
                <h3 class="mt-4 text-xl font-bold text-gray-900">{{ selectedUserDetail.ad_soyad }}</h3>
                <p class="text-gray-500">{{ selectedUserDetail.email }}</p>
                <span :class="getRolClass(selectedUserDetail.rol)" class="inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium">
                  {{ getRolText(selectedUserDetail.rol) }}
                </span>
              </div>

              <div class="grid grid-cols-1 gap-4">
                <div class="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt class="text-sm font-medium text-gray-500">Email</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedUserDetail.email }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt class="text-sm font-medium text-gray-500">Telefon</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ selectedUserDetail.telefon || 'Belirtilmemiş' }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt class="text-sm font-medium text-gray-500">Rol</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ getRolText(selectedUserDetail.rol) }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt class="text-sm font-medium text-gray-500">Kayıt Tarihi</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ formatDate(selectedUserDetail.created_at) }}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt class="text-sm font-medium text-gray-500">Son Güncelleme</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ formatDate(selectedUserDetail.updated_at) }}</dd>
                </div>
              </div>

              <div class="flex space-x-3 pt-4">
                <button
                  @click="editKullanici(selectedUserDetail); showDetailModal = false"
                  class="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center justify-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Düzenle
                </button>
                <button
                  v-if="selectedUserDetail._id !== authStore.user._id"
                  @click="deleteKullanici(selectedUserDetail._id, selectedUserDetail.ad_soyad); showDetailModal = false"
                  class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import apiClient from '@/plugins/axios'
import AppNavbar from '@/components/AppNavbar.vue'

const authStore = useAuthStore()

// State
const kullanicilar = ref([])
const loading = ref(false)
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDetailModal = ref(false)
const submitting = ref(false)
const error = ref('')
const showPassword = ref(false)
const selectedUsers = ref([])
const selectedUserDetail = ref(null)
const sortColumn = ref('created_at')
const sortDirection = ref('desc')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const editingId = ref(null)

// İstatistik
const userStats = reactive({
  total: 0,
  admins: 0,
  users: 0,
  thisMonth: 0
})

// Filtreler
const filters = reactive({
  ad_soyad: '',
  email: '',
  rol: '',
  created_at: ''
})

// Form
const form = reactive({
  ad_soyad: '',
  email: '',
  telefon: '',
  sifre: '',
  rol: ''
})

// 🟢 İsimden baş harfleri alan fonksiyon
function getInitials(name) {
  if (!name) return ""
  return name
    .split(" ")
    .map(part => part[0]?.toUpperCase())
    .join("")
}
function getEmailDomain(email) {
  if (!email || !email.includes("@")) return "Bilinmiyor"
  return email.split("@")[1]
}
// 🟢 Rol için class
function getRolClass(rol) {
  switch (rol) {
    case "admin":
      return "bg-red-100 text-red-800"
    case "user":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// 🟢 Rol için yazı
function getRolText(rol) {
  switch (rol) {
    case "admin":
      return "Yönetici"
    case "user":
      return "Kullanıcı"
    default:
      return "Bilinmiyor"
  }
}

// Rol açıklaması
  function getRolDescription(rol) {
    switch (rol) {
      case "admin": return "Tüm sistem üzerinde tam yetkilidir."
      case "user": return "Cihaz ekleyebilir, silebilir ve QR kod okutabilir."
      default: return "Rol tanımı bulunamadı."
    }
  }

  // Rol ikon
  function getRolIcon(rol) {
    switch (rol) {
      case "admin": return "Admin"
      case "user": return "Kullanıcı"
      default: return "Bilinmiyor"
    }
  }

  function getTimeAgo(date) {
    if (!date) return "Bilinmiyor"

    const now = new Date()
    const past = new Date(date)
    const diff = Math.floor((now - past) / 1000) // saniye farkı

    if (diff < 60) return `${diff} saniye önce`
    if (diff < 3600) return `${Math.floor(diff / 60)} dakika önce`
    if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`
    if (diff < 2592000) return `${Math.floor(diff / 86400)} gün önce`
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} ay önce`
    
    return `${Math.floor(diff / 31536000)} yıl önce`
  }

// Computed
const filteredUsers = computed(() => {
  let filtered = [...kullanicilar.value]
  if (filters.ad_soyad) filtered = filtered.filter(u => u.ad_soyad?.toLowerCase().includes(filters.ad_soyad.toLowerCase()))
  if (filters.email) filtered = filtered.filter(u => u.email?.toLowerCase().includes(filters.email.toLowerCase()))
  if (filters.rol) filtered = filtered.filter(u => u.rol === filters.rol)
  if (filters.created_at) {
    const now = new Date()
    filtered = filtered.filter(user => {
      const userDate = new Date(user.created_at)
      switch (filters.created_at) {
        case 'today': return userDate.toDateString() === now.toDateString()
        case 'week': return userDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        case 'month': return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear()
        case 'year': return userDate.getFullYear() === now.getFullYear()
        default: return true
      }
    })
  }
  filtered.sort((a, b) => {
    const aVal = a[sortColumn.value]
    const bVal = b[sortColumn.value]
    const mod = sortDirection.value === 'desc' ? -1 : 1
    if (aVal < bVal) return -1 * mod
    if (aVal > bVal) return 1 * mod
    return 0
  })
  return filtered
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))
const filteredCount = computed(() => filteredUsers.value.length)
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredUsers.value.length))
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})
const isAllSelected = computed(() =>
  paginatedUsers.value.length > 0 && paginatedUsers.value.every(u => selectedUsers.value.includes(u._id || u.id))
)

// Methods
const fetchKullanicilar = async () => {
  loading.value = true
  try {
    const params = {}
    Object.keys(filters).forEach(k => { if (filters[k]) params[k] = filters[k] })
    const res = await apiClient.get('/admin/users', { params })
    kullanicilar.value = res.data.data || res.data || []
    calculateStats()
  } catch (err) {
    console.error('Kullanıcı listesi alınırken hata:', err)
    kullanicilar.value = []
  } finally {
    loading.value = false
  }
}

const calculateStats = () => {
  userStats.total = kullanicilar.value.length
  userStats.admins = kullanicilar.value.filter(u => u.rol === 'admin').length
  userStats.users = kullanicilar.value.filter(u => u.rol === 'user').length
  const thisMonth = new Date(); thisMonth.setDate(1)
  userStats.thisMonth = kullanicilar.value.filter(u => new Date(u.created_at) >= thisMonth).length
}

const submitForm = async () => {
  submitting.value = true
  error.value = ''
  try {
    if (!form.ad_soyad || !form.email || !form.rol) throw new Error('Lütfen zorunlu alanları doldurunuz')
    if (!showEditModal.value && !form.sifre) throw new Error('Yeni kullanıcı için şifre gereklidir')
    if (form.sifre && form.sifre.length < 6) throw new Error('Şifre en az 6 karakter olmalıdır')

    const data = { ...form }
    if (showEditModal.value && !form.sifre) delete data.sifre

    if (showEditModal.value) {
      await apiClient.put(`/admin/users/${editingId.value}`, data)
    } else {
      await apiClient.post('/admin/users', data)
    }
    closeModal()
    await fetchKullanicilar()
  } catch (err) {
    error.value = err?.response?.data?.message || err?.message || 'Bir hata oluştu'
  } finally {
    submitting.value = false
  }
}

const editKullanici = (k) => {
  editingId.value = k._id || k.id
  Object.assign(form, { ad_soyad: k.ad_soyad, email: k.email, telefon: k.telefon || '', rol: k.rol, sifre: '' })
  showEditModal.value = true
}

const viewKullanici = (k) => {
  selectedUserDetail.value = k
  showDetailModal.value = true
}

const deleteKullanici = async (id, adSoyad) => {
  if (!confirm(`"${adSoyad}" isimli kullanıcıyı silmek istediğinizden emin misiniz?\nBu işlem geri alınamaz!`)) return
  try { await apiClient.delete(`/admin/users/${id}`); await fetchKullanicilar() }
  catch (err) { alert('Silme işlemi başarısız: ' + (err?.response?.data?.message || 'Bilinmeyen hata')) }
}

const bulkDelete = async () => {
  if (selectedUsers.value.length === 0) return
  if (!confirm(`Seçilen ${selectedUsers.value.length} kullanıcıyı silmek istediğinizden emin misiniz?\nBu işlem geri alınamaz!`)) return
  try {
    await Promise.all(selectedUsers.value.map(id => apiClient.delete(`/admin/users/${id}`)))
    selectedUsers.value = []
    await fetchKullanicilar()
  } catch (err) {
    alert('Toplu silme işlemi başarısız: ' + (err?.response?.data?.message || 'Bilinmeyen hata'))
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingId.value = null
  error.value = ''
  showPassword.value = false
  Object.keys(form).forEach(k => form[k] = '')
}

const clearFilters = () => {
  Object.keys(filters).forEach(k => filters[k] = '')
  currentPage.value = 1
  fetchKullanicilar()
}

const sortBy = (col) => {
  if (sortColumn.value === col) sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
  else { sortColumn.value = col; sortDirection.value = 'desc' }
}

const toggleAll = () => {
  if (isAllSelected.value) selectedUsers.value = []
  else selectedUsers.value = paginatedUsers.value.map(u => u._id || u.id)
}

const clearSelection = () => { selectedUsers.value = [] }
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const goToPage = (p) => { currentPage.value = p }

const exportUsers = () => {
  const headers = ['Ad Soyad','Email','Telefon','Rol','Kayıt Tarihi']
  const csvData = [headers.join(','), ...filteredUsers.value.map(u => [
    `"${u.ad_soyad}"`, `"${u.email}"`, `"${u.telefon||''}"`, `"${u.rol}"`, `"${formatDate(u.created_at)}"`
  ].join(','))].join('\n')
  const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `kullanicilar_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Utils
const formatDate = (date) => !date ? '-' : new Date(date).toLocaleDateString('tr-TR', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' })

// Lifecycle
onMounted(() => { if (authStore.isAdmin) fetchKullanicilar() })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.hover-scale:hover { transform: scale(1.02); }
tbody tr:hover { background-color: rgba(59,130,246,0.05); }
@media (max-width: 768px) { .table-container { overflow-x: auto; -webkit-overflow-scrolling: touch; } }
</style>
