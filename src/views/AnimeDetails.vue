<template>
    <div>
        <h1>Anime com id de rota: {{ $route.params.id }} Details page</h1>
    </div>
    <div class="container" v-if="isLoading">
        <h1>Content is Loading...</h1>
    </div>
    <div class="container " v-else>
        <h1>titulo: {{ dataAnime.title }}</h1>
        <h2>rank: {{ dataAnime.rank }}</h2>
            <h3>status: {{ dataAnime.status }}</h3>
            <h3>broadcast: {{ dataAnime.broadcast.day }}</h3>
            <h3>year: {{ dataAnime.year }}</h3>
            <h3>season: {{ dataAnime.season }}</h3>
        
            <img :src="dataAnime.images.jpg.large_image_url" alt="" srcset="">
            <h2>episodes: {{ dataAnime.episodes }}</h2>
            <h2>duration: {{ dataAnime.duration }}</h2>
            <h3>synopsis: {{ dataAnime.synopsis }}</h3>
            <h2>studio: {{ dataAnime.studios[0].name }}</h2>



        <h2>members: {{ dataAnime.members }}</h2>
        <h2>favorites: {{ dataAnime.favorites }}</h2>
        <h2>popularity: {{ dataAnime.popularity }}</h2>
        <h2>score: {{ dataAnime.score }}</h2>
        <h2>scored by: {{ dataAnime.scored_by }}</h2>


        <iframe width="900" height="600"
            :src="dataAnime.trailer.embed_url">
        </iframe>
    </div>

</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const dataAnime = ref({});
const isLoading = ref(true)
const route = useRoute();

onMounted(async () => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${route.params.id}`)
    const data = response.data.data
    dataAnime.value = data
    console.log(data);
    isLoading.value = false
})

</script>

<style scoped>
.airingInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    margin-left: 5px;
    margin-bottom: 30px;
}
.sideImageContent {
    display: grid;
    grid-auto-flow: column;

}
</style>