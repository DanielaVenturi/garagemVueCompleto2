<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const getUserInfo = async () => {
  try {
    const authToken = localStorage.getItem('psg_auth_token');
    const passageUser = new PassageUser(authToken);
    const user = await passageUser.userInfo(authToken);
    if (user) {
      await authStore.setToken(authToken);
    } else {
      authStore.unsetToken();
    }
  } catch (error) {
    authStore.unsetToken();
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
  <div class="home">
    <h1>Bem-vindo à Página Home</h1>
    <p>Esta é uma página inicial simples criada por mim :)</p>
    <div class="links">
      <router-link to="/">
        <i class="icon mdi mdi-home-outline" />
      </router-link>

      <router-link to="categorias">
        <i class="icon mdi mdi-view-grid-outline" />
      </router-link>

      <router-link :to="{ name: 'marca' }">
        <i class="mdi mdi-car-convertible" />
      </router-link>

      <router-link :to="{ name: 'acessorio' }">
        <i class="mdi mdi-star-four-points" />
      </router-link>

      <router-link :to="{ name: 'cor' }">
        <i class="mdi mdi-spray" />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #f4f4f4;
}

.links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  color: #42b983;
}

.router-link {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.router-link:hover {
  color: #35495e;
}
</style>