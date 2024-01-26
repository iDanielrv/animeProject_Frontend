<template>
  <MinhaAppBar />
  <div class="spacer"></div>
  <router-view />
  <MyFooter />
</template>

<script setup>
import MinhaAppBar from './components/MinhaAppBar.vue';
import MyFooter from './components/MyFooter.vue';
//
</script>

<style>
body {
  background-color: #121315;
}

.spacer {
  padding-top: 50px;
}

* {
  font-family: "Assistant";
}
</style>