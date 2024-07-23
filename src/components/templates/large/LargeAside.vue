<script setup>
import LogoTitle from '@/components/templates/LogoTitle.vue';
</script>
<template>
  <header>
    
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link to="/categorias">Categorias</router-link> |
    <router-link :to="{ name: 'cor' }">Cor</router-link> |
    <router-link :to="{ name: 'marca' }">Marca</router-link> |
    <router-link :to="{ name: 'acessorio' }">Acessorio</router-link> |
    <div v-if="authStore.loggedIn">
    <router-link  to="/logout">Logout</router-link> |
      {{ authStore.user.email }}
    </div>
    <router-link v-else to="/login">Login</router-link>
  </header>
  <logo-title />
</template>
<style scoped>
.mb-2 {
  margin-bottom: 1.5rem;
}

.icon {
  font-size: 2rem;
  align-self: center;
}

.divider {
  margin-top: 1rem;
  border-top: 1px solid #eeeeee;
}

.menu {
  padding: 3rem;
}

.menu a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  gap: 1rem;
  font-size: 1.3rem;
  margin-top: 2.2rem;
}
</style>