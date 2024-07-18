<template>
  <div>

    <div v-if="loader" class="p-3 fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div class=" p-4 flex flex-col items-center">
        <img src="../../assets/Spinner.gif" alt="Loading spinner" class="w-32 h-32">
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-4 p-4">
      <!-- Renderiza los productos de la página actual -->
      <div v-for="product in paginatedProducts" :key="product.id" class="card glass w-96">
        <figure class="w-80 h-64">
          <img class="w-32 h-32" :src="product.image" alt="car!" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ product.title }}</h2>
          <p>{{ product.description }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Learn now!</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Renderiza los botones de paginación -->
     <div class="flex justify-center">
      <div class="join " style="margin-bottom: 100px">
        <button class="join-item btn" @click="prevPage" :disabled="currentPage === 1">«</button>
        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="{ 'join-item btn': true, 'current': page === currentPage }">{{ page }}</button>
        <button class="join-item btn" @click="nextPage" :disabled="currentPage === totalPages">»</button>
      </div>
     </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import store from '../../store'; // Ajusta la ruta según la estructura de tu proyecto
import { onMounted } from 'vue';

// Accede a la lista de productos desde el store Vuex

const products = computed(() => store.state.products);

const loader = ref(true);
// Llama a las acciones para cargar usuarios y productos al montar el componente
onMounted(() => {
  store.dispatch('fetchUsers'); // No es necesario si solo muestras productos
  store.dispatch('fetchProducts');
  loader.value = false;
});

// Define metadatos de la página
definePageMeta({
  layout: 'site' 
});

// Lógica de paginación
const currentPage = ref(1);
const itemsPerPage = 3;

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return products.value.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

const visiblePages = computed(() => {
  const pageCount = Math.min(totalPages.value, 5); // Mostrar máximo 5 páginas de navegación
  const startPage = Math.max(1, currentPage.value - 2); // Ajusta para no mostrar páginas negativas
  return Array.from({ length: pageCount }, (_, index) => startPage + index);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>




<style scoped>
/* Estilos específicos para el componente pueden ir aquí */
.card {
  max-width: 100%;
  /* Asegura que las tarjetas no superen el ancho máximo */
}

.card img {
  width: 100%;
  height: auto;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  cursor: pointer;
  background-color: #3182ce;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
}

.btn:hover {
  background-color: #2c5282;
}
</style>
