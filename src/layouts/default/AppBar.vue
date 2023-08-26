<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      <router-link to="/">MAWlist</router-link>
      <h1>check: {{ checkLogado }}</h1>
      
      
    </v-app-bar-title>
    <div>
      <div class="appBarButtons" v-if="!checkLogado">
        <router-link to="/register"><v-btn variant="tonal">Register</v-btn></router-link>
        <router-link to="/login"><v-btn variant="tonal">Login</v-btn></router-link>
      </div>
      <div class="appBarButtons" v-else>
        <v-btn @click="handleLogOut" variant="tonal" >
          Logout
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import router from '@/router';
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import { computed } from 'vue'

const store = useStore()
console.log('storess',store.state.isAuthenticated);
let checkLogado = computed(() => {
  return store.state.isAuthenticated
})
console.log('dentro do appBar');
console.log();


let handleLogOut = () => {
  Cookies.remove('jwt')
  store.dispatch('logout')
  router.push('/')
}

</script>

<style>
.appBarButtons {
  width: 150px;
  display: flex;
  justify-content: space-between;
  margin: 25px,
}
</style>
