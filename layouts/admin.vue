<template>
    <div class="flex h-screen">
      <Menu v-if="usuario"/>
      <div class="flex flex-col flex-grow">
        <Header v-if="usuario"/>
        <div class="p-4 flex-grow">
          <NuxtPage />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Menu from '~/components/Menu.vue';
  import Header from '~/components/Header.vue';
  import { useAuth } from '~/composables/useAuth'; // Ajusta la ruta según la estructura de tu proyecto
  import { onMounted } from 'vue';

  const { getUser, logout, checkAuth } = useAuth();
  const usuario = getUser(); 

  onMounted(() => {

  });
  </script>
  
  <style scoped>

  </style>
  