<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded shadow-md w-1/2">
        <h2 class="text-2xl mb-4">Detalles</h2>
        <div v-if="user">
          <p><strong>Nombre:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Teléfono:</strong> {{ user.phone }}</p>
        </div>
        <div v-if="product">
          <p><strong>Nombre:</strong> {{ product.title }}</p>
          <p><strong>Precio:</strong> {{ product.price }}</p>
          <p><strong>Descripción:</strong> {{ product.description }}</p>
        </div>
        <button @click="close" class="mt-4 py-2 px-4 bg-blue-500 text-white rounded">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    user: Object,
    product: Object
  });
  
  const visible = ref(true);
  
  watch(() => props.user, () => {
    visible.value = !!props.user;
  });
  
  watch(() => props.product, () => {
    visible.value = !!props.product;
  });
  
  const close = () => {
    visible.value = false;
    emit('close');
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS Styles */
  </style>
  