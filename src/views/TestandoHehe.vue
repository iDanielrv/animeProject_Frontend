<template>
    <div v-for="genre in genreList" :key="genre">
        <h2>{{ genre.name }}</h2>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue'

let genreList = ref([])


let animesFunction = async () => {
    const apiData = await axios.get('https://api.jikan.moe/v4/genres/anime?filter=genres&filter=explicit_genres');
    genreList.value = apiData.data.data
    
}

onMounted(() => {
    animesFunction()
})

</script>