<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="email"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[required]"
          clearable
          type="password"
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>
        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
      <h3 class="goToRegister">Caso não tenha uma conta clique <router-link to="/register">aqui</router-link> </h3>
            <!-- Exemplo de uso da Composable para verificar autenticação -->
            <div v-if="isAuthenticated">Você está logado.</div>
            <div v-else>Você não está logado.</div>
            {{ $store.getters.userEmail }}
    </v-card>
  </v-sheet>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue'
import Cookies from 'js-cookie';
import router from '@/router';
import { useStore } from 'vuex';

const store = useStore();
let password = ref(null);
let email = ref(null);

  const required = (v) => {
    return !!v || 'Field is required'
  }

let isAuthenticated = ref(!!Cookies.get('jwt'));

const onSubmit = () => {
  console.log(email.value, password.value);
  
  const formData = {
    email: email.value,
    password: password.value
  }

  axios.post('http://localhost:4000/login', formData)
  .then((res) => {
    Cookies.set('jwt', res.data.token)
    console.log('res.data.email');
    console.log(res.data.email);
    store.dispatch('login', { email: res.data.email})
    console.log(isAuthenticated.value);
    router.push('/')
  })
}


</script>

<style>
.goToRegister {
  font-size: 12px;
  margin-top: 15px;
}
</style>