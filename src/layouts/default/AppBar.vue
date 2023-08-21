<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      <router-link to="/">MyAnimeWebSite</router-link>
      <h1>{{ userEmail }}</h1>
      
      
    </v-app-bar-title>
    <div class="appBarButtons">
      <router-link to="/register"><v-btn variant="tonal">Register</v-btn></router-link>
      <router-link to="/login"><v-btn variant="tonal">Login</v-btn></router-link>

    </div>
  </v-app-bar>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue'


const store = useStore();
let userEmail = ref(store.getters.userEmail);
console.log('dentro do appBar');
console.log(userEmail);

</script>

<style>
.appBarButtons {
  width: 150px;
  display: flex;
  justify-content: space-between;
  margin: 0 25px 0 25px
}
</style>
