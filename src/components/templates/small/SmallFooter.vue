<script setup>
import { ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const showMenu = ref(false);

onBeforeRouteUpdate(() => {
  showMenu.value = false;
});
</script>
<template>
  <div id="footerMenu" :style="{ display: showMenu ? 'block' : 'none' }">
      <router-link to="categorias">
        <i class="icon mdi mdi-view-grid-outline" /> Categorias
      </router-link>
      <router-link :to="{ name: 'marca' }">
        <i class="mdi mdi-car-convertible"/> Marca
      </router-link>
      <router-link :to="{ name: 'acessorio' }">  
         <i class="mdi mdi-star-four-points"/>Acessorio
         </router-link> 
      <router-link :to="{ name: 'cor' }">
        <i class="mdi mdi-spray"/>Cor
        </router-link> 
  </div>
  <div class="icons">
    <router-link to="/">
        <i class="icon mdi mdi-home-outline" /> Home
      </router-link>
      <router-link to="/login">
        <i class="mdi mdi-account-circle-outline" /> Login
      </router-link>
    <div class="hamburger" @click="showMenu = !showMenu">
      <i class="mdi mdi-menu" />
      Menu
    </div>
    
  </div>
</template>
<style scoped>
#footerMenu {
    position: fixed;
    bottom: 10%;
    right: 0%;

    width: 50%;
    border-top: #EEEEEE 1px solid;
    background-color: white;

    display: block;
    padding: 1rem;
}

#footerMenu a {
    display: flex;
    width: 100%;
    justify-content: space-between;
    text-decoration: none;
    color: #282828;
    font-size: 1rem;
    transition: color 0.3s;
}


.icons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.icons a,
.icons .hamburger {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    font-size: 1rem;
    transition: color 0.3s;
}

.hamburger:hover {
    cursor: pointer;
}
</style>