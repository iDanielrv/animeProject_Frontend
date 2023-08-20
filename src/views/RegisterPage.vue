<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <h1>Register</h1>
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

        <!-- <v-text-field
          v-model="confirm_password"
          :rules="[required]"
          clearable
          type="password"
          label="Confirm your password"
          placeholder="Password"
        ></v-text-field> -->

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
      <h3 class="goToLogin">Caso já tenha uma conta clique <router-link to="/login">aqui</router-link> </h3>
    
    </v-card>
  </v-sheet>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import router from '../router/index'

  let form = ref(false);
  let email = ref(null);
  let password = ref(null);
  let loading = ref(false);


  const required = (v) => {
    return !!v || 'Field is required'
  }

  const onSubmit = () => {
    let formData = {
      email: email.value,
      password: password.value
    }
    axios.post('http://localhost:4000/register', formData)
      .then((res) => {
        Cookies.set('jwt', res.data)
        console.log('res ponto dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        console.log(res.data);
        router.push('/login')
      })
      .catch((err) => console.log(err))
  }
  
</script>

<style>
.goToLogin {
  font-size: 12px;
  margin-top: 15px;
}
</style>