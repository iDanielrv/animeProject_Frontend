<template>

  <div v-if="isLoading">
    <v-progress-linear color="blue-lighten-3" indeterminate :height="7"></v-progress-linear>
  </div>
  <div v-else>
    <v-carousel
      height="600"
      class="carouselBoxEdit"
      show-arrows
      hide-delimiter-background
      hide-delimiters
    >
      <template v-slot:prev="{ props }">
        <v-btn
          variant="elevated"
          color="success"
          @click="props.onClick"
        >&lt;</v-btn>
      </template>
      <template v-slot:next="{ props }">
        <v-btn
          variant="elevated"
          color="info"
          @click="props.onClick"
        >&gt;</v-btn>
      </template>
      <v-carousel-item
        v-for="(anime, i) in topAnimeData "
        :key="i"
      >
        <v-sheet
          height="100%"
        >
          <div class="d-flex fill-height justify-center align-center">
            <v-img src="https://www.animenewsnetwork.com/hotlink/thumbnails/crop1200x630gKH/encyc/A24085-2135932930.1663150644.jpg" eager></v-img>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>



    <v-sheet
    class="mx-auto"
    max-width="90%"
  >
  <!-- class="bg-green" -->
    <v-slide-group
      v-model="model"
      class="v-slide-group-settings"

    
      center-active
      show-arrows
    >
      <v-slide-group-item
        v-for="anime in popularEpisodes"
        :key="anime"
        v-slot="{ isSelected, toggle }"

      >
        <v-card
          :color="isSelected ? corBbb : corAaa"
          class="ma-4 v-card-settings"
          @click="toggle"
        >
          <div>
            <v-scale-transition>
              <div class="testandoo">
                <!-- class="d-flex fill-height align-center justify-center" -->
                <div :class="isSelected ? 'testandooTitle' : 'testandooTitle2'">
                  <h3>{{ anime.entry.title }}</h3>
                </div>
                <v-img
                class="imageSttings"
                  height="320"
                  width="225"
                 :src="anime.entry.images.webp.image_url"></v-img>
              </div>
          </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  
  
    <h2>Trending</h2>
  
    <div v-for="anime in topAnimeData" :key="anime">
    <h2>{{ anime.title }}</h2>
    <img :src="anime.images.jpg.large_image_url" alt="">
    </div>
  </div>





</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

let model = ref(null);

let popularEpisodes = ref([]);
let watchedEpisodes = ref([]);


let topAnimeData = ref([]);
let topAnimeDataImages = ref([]);
let isLoading = ref(true)

let animeFunction = async () => {
let response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=airing&type=tv');


const response2 = await axios.get("https://api.jikan.moe/v4/watch/episodes/popular")
  console.log(response.data.data);

  popularEpisodes.value = await response2.data.data.filter((animes) => {
    if(animes.region_locked === false) {
      return true
    }
  })
  console.log(popularEpisodes.value);


  const response3 = await axios.get("https://api.jikan.moe/v4/watch/episodes");
  watchedEpisodes.value = response3.data.data.filter((animes) => {
    if (animes.region_locked === false) {
      return true
    }
  })
  console.log('##############################################################################################');
  console.log(watchedEpisodes.value);
isLoading.value = false


topAnimeData.value = response.data.data.slice(0,7)
console.log(topAnimeData.value);
topAnimeDataImages.value = topAnimeData.value.images.jpg.large_image_url
/* topAnimeData.forEach(images => {
  images.images.jpg
}); */

console.log('oia as imagi');
console.log(topAnimeDataImages);
}


onMounted(() =>{
  animeFunction()
})

let corAaa = ref('#212121ff')
let corBbb = ref('#A8EB12')


</script>

<style>

.v-img__img {
  height: 320px;
}

.v-slide-group-settings {
  background-color: #121212ff;
}

h3 {
  font-size: 25px;
  overflow: hidden!important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  padding-bottom: 60px;
}

.testandooTitle {
  writing-mode: tb-rl;
  transform: rotate(180deg);
  width: 30px;
  max-width: 30px;
  padding: 0;
  overflow: hidden!important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  font-size: 25px !important;
  align-items: center;
  background: linear-gradient(180deg, rgba(18,18,18,1) 75%, rgba(255,255,255,0.3617822128851541) 100%);
  color: white;
  transition: 0.5s;

}
.testandooTitle2 {
  writing-mode: tb-rl;
  transform: rotate(180deg);
  width: 30px;
  max-width: 30px;
  overflow: hidden!important;
  text-overflow: ellipsis!important;
  white-space: nowrap!important;
  font-size: 25px;
  align-items: center;
  background: linear-gradient(180deg, rgba(18,18,18,1) 75%, rgba(255,255,255,0.3617822128851541) 100%);
  padding-top: 15px!important;
  color: rgb(255, 255, 255);
  transition: 0.6s;
}
.testandoo {
  display: flex;
  flex-direction: row;
  justify-content: end;
  max-width: 255px;
  height: 317px;
}

.v-img__img--contain {
  object-fit: fill!important;
}







.vaiParaBaixo {
  margin-top: 70px;
}

.carouselBoxEdit

.v-window__controls {
  flex-direction: column;
  align-items: end;
  justify-content: end;
  margin-bottom: 15px;

  background: radial-gradient(circle, rgba(63,94,251,0) 40%, rgba(0,0,0,1) 80%)!important;
}

.v-window__controls {.v-btn {
  font-size: 30px;
  background-color: green!important;
  margin-bottom: 20px;
}
}

</style>

