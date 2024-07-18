<template>
  <div class="relative">
    <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="Buscar..." class="p-2 pl-8 pr-2 rounded-md">
    <div class="absolute inset-y-0 m-1 flex items-center pr-3 pointer-events-none">
      <img class="w-5" src="https://www.svgrepo.com/show/450294/search.svg" alt="Search Icon">
    </div>
  </div>  
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['update-search']);
const searchQuery = ref('');

const handleSearch = () => {
  emits('update-search', searchQuery.value);
};
</script>

<style scoped>
/* Estilos personalizados según sea necesario */
</style>
