<!-- src/App.vue -->
<template>
    <!-- Basit, minimal layout. Render döngüsünü tetikleyecek hiçbir reactive veya store-init yok -->
  <router-view />
</template>

<script setup>
// Boş: store init veya router navigation burada olmasın.
// Tüm initialization main.js içinde yapılıyor.
</script>

<style>
/* İstersen burada global küçük stiller ekle */
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%; /* Tam ekran yüksekliği */
}
</style>
