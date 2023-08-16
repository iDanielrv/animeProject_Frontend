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

    </v-card>
  </v-sheet>
</template>
<script>
  export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
    }),
    methods: {
      required (v) {
        console.log(v);
        console.log(!v);
        console.log(!!v);
        return !!v || 'Field is required'
      },
    },
  }
</script>

<style>
.goToRegister {
  font-size: 12px;
  margin-top: 15px;
}
</style>