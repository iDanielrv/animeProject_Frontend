<template>
<h1>123</h1>
<div v-for="anime in listaAnimes" :key="anime">
<h2>{{ anime.title }}</h2>
<img :src="anime.images.jpg.large_image_url" alt="">
<img :src="anime.images.webp.large_image_url" alt="">
<img :src="anime.images.jpg.image_url" alt="">
<img :src="anime.images.webp.image_url" alt="">
<img :src="anime.images.jpg.small_image_url" alt="">
<img :src="anime.images.webp.small_image_url" alt="">
</div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';


const listaAnimes = ref([]);
//const isLoading = ref(true)

const upcomingAnimesFunction = async () => {
    let dataAPi	 = await axios.get('https://api.jikan.moe/v4/seasons/upcoming?filter=tv')
    listaAnimes.value = dataAPi.data.data
    console.log(listaAnimes.value);
}

onMounted(() => {
    upcomingAnimesFunction()
})

</script>