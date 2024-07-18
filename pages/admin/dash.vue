<template>
    <div>Bienvenido al panel de gestión

      <NuxtRouteAnnouncer />
      <NuxtWelcome />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useAuth } from '~/composables/useAuth';
  const { checkAuth } = useAuth();
  
  onMounted(() => {
    checkAuth();
  });

  definePageMeta({
  layout: 'admin'
})
  </script>
  
  <style scoped>

  </style>
  