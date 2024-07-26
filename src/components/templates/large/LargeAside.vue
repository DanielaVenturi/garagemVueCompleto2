<script setup>
import LogoTitle from '@/components/templates/LogoTitle.vue';
</script>
<template>
  <div class="logo_and_menu">
    <logo-title class="mb-2" />
    <div class="divider" />
    <div class="menu">
      <router-link to="/">
        <i class="icon mdi mdi-home-outline" /> Home
      </router-link>
      <hr>
      <router-link to="categorias">
        <i class="icon mdi mdi-view-grid-outline" /> Categorias
      </router-link>
      <hr>
      <router-link :to="{ name: 'marca' }">
        <i class="mdi mdi-car-convertible"/> Marca
      </router-link>
      <hr>
      <router-link :to="{ name: 'acessorio' }">  
         <i class="mdi mdi-star-four-points"/>Acessorio
         </router-link> 
         <hr>
      <router-link :to="{ name: 'cor' }">
        <i class="mdi mdi-spray"/>Cor
        </router-link> 
        <hr>
      <!-- <div v-if="authStore.loggedIn">
    <router-link  to="/logout">Logout</router-link> |
      {{ authStore.user.email }}
    </div>
    <router-link v-else to="/login">
        <i class="icon mdi mdi-account" /> Login
    </router-link> -->

   
    </div>
  
  </div>
  <logo-title />
</template>
<style scoped>
.mb-2 {
  margin-bottom: 1.5rem;
}
.icons {
  display: flex;
  gap: 1rem;
 color: #eeeeee;
  font-size: 3rem;
 
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
  color: #ffffff;
  gap: 1rem;
  font-size: 1.3rem;
  margin-top: 2.2rem;
}
</style>      