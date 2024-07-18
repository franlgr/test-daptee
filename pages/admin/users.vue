<template>
  <div>

    <div v-if="loader" class="p-3 fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div class=" p-4 flex flex-col items-center">
        <img src="../../assets/Spinner.gif" alt="Loading spinner" class="w-32 h-32">
      </div>
    </div>
    
    <h1 class="text-2xl mb-4">Usuarios</h1>
    <Search class="p-5" @update-search="updateUsersSearch" />

    <div v-for="user in displayedUsers" :key="user.id" class="mb-2 p-4 bg-white shadow-md rounded-md flex justify-between items-center relative">
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FProfile.png&f=1&nofb=1&ipt=384c8540ec2537abdec14b9c8dd688c5d0290d6e3eb28731a63fee32acc1e324&ipo=images" class="rounded-full w-12 h-12" alt="Avatar">
      <div>{{ user.name }}</div>
      <button @click="toggleOptions(user.id)"><strong class="text-xl">⋮</strong></button>
      <div v-if="options[user.id]" class="absolute bg-white shadow-md rounded-md top-12 right-0 mt-1">
        <button class="m-1 bg-purple-600 p-1 rounded" @click="viewUser(user)">Ver</button>
        <button class="m-1 bg-red-600 p-1 rounded" @click="deleteUser(user.id)">Eliminar</button>
      </div>
    </div>
    
    <div class="join">
      <button class="join-item btn" @click="prevPage" :disabled="currentPage === 1">«</button>
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ 'join-item btn': true, 'current': page === currentPage }">{{ page }}</button>
      <button class="join-item btn" @click="nextPage" :disabled="currentPage === totalPages">»</button>
    </div>

    <popup v-if="selectedUser" :user="selectedUser" @close="selectedUser = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Search from '../../components/Search.vue';
import { useAuth } from '~/composables/useAuth';
const { checkAuth } = useAuth();

const loader = ref(false);
const users = ref([]);
const options = ref({});
const selectedUser = ref(null);
const usersSearchQuery = ref('');
const pageSize = 5;
let currentPage = ref(1);

onMounted(async () => {
  loader.value = true;
  checkAuth();
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  users.value = response.data;
  loader.value = false;
});

const closeOptions = (event) => {
  const clickedOutside = !event.target.closest('.absolute'); // Ajusta según tu estructura HTML
  if (clickedOutside) {
    Object.keys(options.value).forEach(key => options.value[key] = false); // Cerrar todas las opciones abiertas
  }
};

const filteredUsers = computed(() => {
  return users.value.filter(user => user.name.toLowerCase().includes(usersSearchQuery.value.toLowerCase()));
});

const displayedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredUsers.value.slice(start, start + pageSize);
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / pageSize);
});

const toggleOptions = (id) => {
  options.value[id] = !options.value[id];
};

const viewUser = (user) => {
  selectedUser.value = user;
};

const deleteUser = (id) => {
  users.value = users.value.filter(user => user.id !== id);
};

const updateUsersSearch = (query) => {
  usersSearchQuery.value = query;
  currentPage.value = 1; // Reset to first page on search
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

definePageMeta({
  layout: 'admin'
});
</script>

<style scoped>
/* Estilos Tailwind o personalizados según sea necesario */
.join {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.join-item {
  margin: 0 0.5rem;
}

.current {
  font-weight: bold;
  color: blue;
}
</style>
