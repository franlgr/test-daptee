<!-- layouts/site.vue -->
<template>
  <div>
    <header class="bg-gray-800 text-white py-4">
      <nav class="container mx-auto flex justify-between items-center">
        <!-- Logo a la izquierda -->
        <NuxtLink to="/" class="flex items-center">
          <img class="w-20 m-2" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2Fedd%2F2021%2F08%2FFree-Editable-Abstract-Logo-Design-PNG-Transparent-1536x1536.png&f=1&nofb=1&ipt=51e416a2e6307ed3b918bdea22989235ab78438144d0b747b078f6f9d5dd4f37&ipo=images" alt="Logo" />
        </NuxtLink>

        <ul class="flex justify-center space-x-4">
          <li><NuxtLink to="/" class="hover:text-gray-300">Inicio</NuxtLink></li>
          <li><NuxtLink to="/site/market" class="hover:text-gray-300">Market</NuxtLink></li>
          <!-- <li v-if="!usuario"><NuxtLink to="/site/login" class="hover:text-gray-300">Iniciar Sesión</NuxtLink></li> -->
          <li><NuxtLink to="/admin/dash" class="hover:text-gray-300">Admin</NuxtLink></li>
        </ul>

        <div  class="relative">
          <NuxtLink v-if="!usuario" to="/site/login" class="hover:text-gray-300">Iniciar Sesión</NuxtLink>
          <img v-if="usuario" src="https://picsum.photos/id/237/200/300" alt="Avatar" class="w-10 h-10 rounded-full mr-2 cursor-pointer">
          <div v-if="dropdown" ref="dropdownMenu" class="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md z-10">
            <button @click="logout" class="block w-full text-left px-4 py-2">Cerrar Sesión</button>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <div class="flex justify-end">
        <div>
          <a target="_blank" href="https://www.linkedin.com/in/francisco-grillo-518a2125a">
            <img class="w-8" src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="">
          </a>
          
        </div>
      </div>
      <p>© 2024 TestDaptee</p>
    </footer>
  </div>
</template>

<script setup>
  import { useAuth } from '~/composables/useAuth'; 
  
  const { getUser, logout } = useAuth();
  const usuario = getUser(); 
</script>

<style scoped>
header {
  background: #333;
  color: #fff;
  padding: 1rem;
}
nav ul {
  display: flex;
  list-style: none;
}
nav li {
  margin-right: 1rem;
}
nav a {
  color: #fff;
  text-decoration: none;
}
main {
  padding: 2rem;
}
footer {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
