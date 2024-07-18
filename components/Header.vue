<template>
    <header class="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div class="flex items-center">
        <span style="margin-left: 100px">{{ usuario }}</span>
      </div>
      <div class="relative" @click="toggleDropdown">
        <img src="https://picsum.photos/id/237/200/300" alt="Avatar" class="w-10 h-10 rounded-full mr-2 cursor-pointer">
        <div v-if="dropdown" ref="dropdownMenu" class="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md z-10">
          <button @click="logout" class="block w-full text-left px-4 py-2">Cerrar Sesión</button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useAuth } from '~/composables/useAuth'; // Ajusta la ruta según la estructura de tu proyecto
  
  const { getUser, logout } = useAuth();
  const usuario = getUser(); 
  const dropdown = ref(false);
  
  const toggleDropdown = () => {
    dropdown.value = !dropdown.value;
  };
  
  // Manejar clic fuera del dropdown
  const clickOutsideHandler = (event) => {
    const dropdownMenu = $refs.dropdownMenu; // Accedemos al elemento ref
    if (dropdownMenu && !dropdownMenu.contains(event.target)) {
      dropdown.value = false;
    }
  };
  
  // Escuchar el evento de clic para cerrar el dropdown
  onMounted(() => {
    document.addEventListener('click', clickOutsideHandler);
  });
  
  // Limpia para evitar problemas de memoria
  onUnmounted(() => {
    document.removeEventListener('click', clickOutsideHandler);
  });
  </script>
  
  <style scoped>
  /* Estilos para el dropdown y otros elementos si es necesario */
  </style>
  