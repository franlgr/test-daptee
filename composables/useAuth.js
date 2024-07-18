import { ref } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);

export function useAuth() {
  const router = useRouter();

  // Verificar si hay un usuario guardado en localStorage al inicializar
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = storedUser;
    }
  }

  const login = async (username, password) => {
    if (username === 'Daptee' && password === 'Daptee2024') {
      user.value = username;
      localStorage.setItem('user', username);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
    router.push('/site/login');
  };

  const checkAuth = () => {
    if (!user.value && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user.value = storedUser;
      } else {
        router.push('/site/login');
      }
    }
  };

  // Getter para obtener el usuario actual
  const getUser = () => {
    return user.value;
  };

  return {
    user,
    login,
    logout,
    checkAuth,
    getUser // Exportar el getter para acceder al usuario desde otros componentes
  };
}
