<template>
    <div class="relative">
      <!-- Botón de menú hamburguesa -->
      <button @click="toggleMenu" class="block absolute top-4 left-4 text-white w-1/4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1z"/>
        </svg>
      </button>
      
      <!-- Menú lateral -->
      <div :class="`w-64 bg-gray-900 text-white flex flex-col justify-center items-center lg:block fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`">
        <NuxtLink to="/" class="block px-4 py-2">
          <img class="w-32" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2Fedd%2F2021%2F08%2FFree-Editable-Abstract-Logo-Design-PNG-Transparent-1536x1536.png&f=1&nofb=1&ipt=51e416a2e6307ed3b918bdea22989235ab78438144d0b747b078f6f9d5dd4f37&ipo=images" alt="Logo" />
        </NuxtLink>
        
        <nav class="flex-grow mt-4">
          <ul>
            <li><NuxtLink to="/admin/users" class="block px-4 py-2">Usuarios</NuxtLink></li>
            <li><NuxtLink to="/admin/products" class="block px-4 py-2">Productos</NuxtLink></li>
          </ul>
        </nav>
      </div>
      
      <!-- Fondo opaco al desplegar el menú en pantallas pequeñas -->
      <div v-if="menuOpen " @click="toggleMenu" class=" fixed inset-0 bg-black opacity-50 z-40"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  const menuOpen = ref(false);
  const screenWidth = ref(window.innerWidth);
  
  // Verificar el tamaño de pantalla al inicio
  const isLargeScreen = computed(() => screenWidth.value >= 780);
  
  // Toggle del menú y verificación para el fondo opaco en pantallas pequeñas
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  
  // Actualizar el tamaño de pantalla al cambiar
  onMounted(() => {
    window.addEventListener('resize', () => {
      screenWidth.value = window.innerWidth;
    });
  });
  
  // Establecer el estado inicial del menú según el tamaño de pantalla
  if (isLargeScreen.value) {
    menuOpen.value = true;
  } else {
    menuOpen.value = false;
  }
  </script>
  
  <style scoped>
  /* Estilos Tailwind CSS o personalizados según sea necesario */
  </style>
  