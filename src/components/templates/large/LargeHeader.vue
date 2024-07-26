<script setup></script>

<template>
  <div class="icons">
     <router-link to="/login">
        <i class="mdi mdi-account-circle-outline" /> Login
      </router-link>
  </div>
</template>

<style scoped>
.icons {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 3rem;
  color: #ffffff;

}
.link a {
  text-decoration: none;
  color: #ffffff;
}



</style>