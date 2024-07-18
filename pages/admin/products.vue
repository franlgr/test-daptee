<template>
  <div>
    <div v-if="loader" class="p-3 fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div class=" p-4 flex flex-col items-center">
        <img src="../../assets/Spinner.gif" alt="Loading spinner" class="w-32 h-32">
      </div>
    </div>


    <h1 class="text-2xl mb-4">Productos</h1>
    <Search class="p-5" @update-search="updateProductsSearch" />

    <div v-for="(product, index) in displayedProducts" :key="product.id" class="mb-2 p-4 bg-white shadow-md rounded-md flex justify-between items-center relative">
      <img :src="product.image" class="rounded-full w-12 h-12" alt="">
      <div>{{ product.title }}</div>
      <button @click="toggleOptions(product.id)"><strong class="text-xl">⋮</strong></button>
      <div v-if="options[product.id]" class="absolute bg-white shadow-md rounded-md top-12 right-0 mt-1">
        <button class="m-1 bg-purple-600 p-1 rounded" @click="viewProduct(product)">Ver</button>
        <button class="m-1 bg-red-600 p-1 rounded" @click="deleteProduct(product.id)">Eliminar</button>
      </div>
    </div>
    
    <div class="join">
      <button class="join-item btn" @click="prevPage" :disabled="currentPage === 1">«</button>
      <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ 'join-item btn': true, 'current': page === currentPage }">{{ page }}</button>
      <button class="join-item btn" @click="nextPage" :disabled="currentPage === totalPages">»</button>
    </div>

    <popup v-if="selectedProduct" :product="selectedProduct" @close="selectedProduct = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Search from '../../components/Search.vue';
import { useAuth } from '~/composables/useAuth';
const { checkAuth } = useAuth();

const loader = ref(false);
const products = ref([]);
const options = ref({});
const selectedProduct = ref(null);
const productsSearchQuery = ref('');
const pageSize = 5;
let currentPage = ref(1);

onMounted(async () => {
  loader.value = true;
  checkAuth();
  const response = await axios.get('https://fakestoreapi.com/products');
  products.value = response.data;
  loader.value = false;
});

const filteredProducts = computed(() => {
  return products.value.filter(product => product.title.toLowerCase().includes(productsSearchQuery.value.toLowerCase()));
});

const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredProducts.value.slice(start, start + pageSize);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pageSize);
});

const toggleOptions = (id) => {
  options.value[id] = !options.value[id];
};

const viewProduct = (product) => {
  selectedProduct.value = product;
};

const deleteProduct = (id) => {
  products.value = products.value.filter(product => product.id !== id);
};

const updateProductsSearch = (query) => {
  productsSearchQuery.value = query;
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
