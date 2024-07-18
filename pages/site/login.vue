<template>
  <div class="flex h-screen justify-center">
    <!-- Spinner -->
    <div v-if="loader" class="p-3 fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div class=" p-4 flex flex-col items-center">
        <img src="../../assets/Spinner.gif" alt="Loading spinner" class="w-32 h-32">
      </div>
    </div>

    <!-- Mitad Izquierda -->
    <div class="w-1/2 flex items-center justify-center">
      <form @submit.prevent="handleLogin" class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl text-gray-800 font-bold mb-4">Iniciar Sesión</h2>
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Usuario</label>
          <input v-model="username" id="username" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Contraseña</label>
          <input v-model="password" id="password" type="password" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div class="flex justify-center">
          <button type="submit" class="w-1/4 py-2 text-gray-700 font-bold rounded-md">Ingresar</button>
        </div>
        <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
      </form>
    </div>

    <!-- Mitad Derecha -->
    <div class="w-1/2 bg-cover bg-center" :style="{ backgroundImage: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2Fedd%2F2021%2F08%2FFree-Editable-Abstract-Logo-Design-PNG-Transparent-1536x1536.png&f=1&nofb=1&ipt=51e416a2e6307ed3b918bdea22989235ab78438144d0b747b078f6f9d5dd4f37&ipo=images)' }">

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const username = ref('');
const password = ref('');
const error = ref('');
const loader = ref(false); // Ref para controlar el estado del loader
const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  // Mostrar el loader al iniciar sesión
  loader.value = true;

  const success = await login(username.value, password.value);
  if (success) {
    setTimeout(() => {
      // Ocultar el loader después de 2.5 segundos (2500 ms)
      loader.value = false;
      router.push('/admin/dash');
    }, 2500);
  } else {
    // Mostrar error si las credenciales son incorrectas
    error.value = 'Credenciales incorrectas';
    // Ocultar el loader en caso de error
    loader.value = false;
  }
};

definePageMeta({
  layout: 'site' 
});
</script>

  
  <style scoped>

  </style>
  