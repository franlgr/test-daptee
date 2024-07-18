import { createStore } from 'vuex';
import axios from 'axios'; // Asegúrate de haber instalado axios en tu proyecto

export default createStore({
  state: () => ({
    users: [],
    products: []
  }),
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        commit('setProducts', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
});
