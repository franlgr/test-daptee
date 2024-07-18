// store/products.js
import { useStore } from 'vuex';

export const state = () => ({
  products: [],
  searchQuery: '',
  options: {},
  selectedProduct: null
});

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setSearchQuery(state, query) {
    state.searchQuery = query;
  },
  toggleOptions(state, id) {
    if (state.options[id]) {
      state.options[id] = !state.options[id];
    } else {
      state.options[id] = true;
    }
  },
  setSelectedProduct(state, product) {
    state.selectedProduct = product;
  },
  deleteProduct(state, id) {
    state.products = state.products.filter(product => product.id !== id);
  }
};

export const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await this.$axios.get('https://fakestoreapi.com/products');
      commit('setProducts', response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
};

export default {
  setup() {
    const store = useStore();

    // Aquí puedes utilizar el store y sus métodos si es necesario
    // Normalmente no necesitas declarar nada aquí para Vuex, solo configurar el state, mutations y actions como se muestra arriba
  }
};
