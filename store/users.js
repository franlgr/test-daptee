// store/users.js

export const state = () => ({
    users: [],
    searchQuery: '',
    options: {},
    selectedUser: null
  });
  
  export const mutations = {
    setUsers(state, users) {
      state.users = users;
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
    setSelectedUser(state, user) {
      state.selectedUser = user;
    },
    deleteUser(state, id) {
      state.users = state.users.filter(user => user.id !== id);
    }
  };
  
  export const actions = {
    async fetchUsers({ commit }) {
      try {
        const response = await this.$axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  };
  
  // Funciones exportadas para manejar las acciones y mutaciones desde el componente
  export function fetchUsers(store) {
    store.dispatch('users/fetchUsers');
  }
  
  export function toggleOptions(store, id) {
    store.commit('users/toggleOptions', id);
  }
  
  export function setSelectedUser(store, user) {
    store.commit('users/setSelectedUser', user);
  }
  
  export function deleteUser(store, id) {
    store.commit('users/deleteUser', id);
  }
  
  export function setSearchQuery(store, query) {
    store.commit('users/setSearchQuery', query);
  }
  
  