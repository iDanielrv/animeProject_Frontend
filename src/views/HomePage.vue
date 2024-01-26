<template>

  <div v-if="isLoading">
    <v-progress-linear color="blue-lighten-3" indeterminate :height="7"></v-progress-linear>
    <img src="https://media.tenor.com/c-PH8z9rZHYAAAAi/chika.gif" alt="">
    <!-- https://media.tenor.com/IjX29sgxJVAAAAAi/sleeping-cute.gif -->
  </div>
  <div v-else>
    <v-carousel
      height="600"
      class="carouselBoxEdit"
      cycle="10s"
      show-arrows
      hide-delimiter-background
      hide-delimiters
    >
      <template v-slot:prev="{ props }">
        <v-btn
          variant="elevated"
          @click="props.onClick"
        >&lt;</v-btn>
      </template>
      <template v-slot:next="{ props }">
        <v-btn
          variant="elevated"
          @click="props.onClick"
        >&gt;</v-btn>
      </template>
      <v-carousel-item
        v-for="(banner, i) in carouselImgVar "
        :key="i"
      >
          <div >
            <img 
            class="carouselImg"
            :src="banner" alt=""> 
          </div>
      </v-carousel-item>
    </v-carousel>
    <!-- 
      https://pbs.twimg.com/media/FvssMuiaEAEgetv?format=jpg&name=large
      https://sportshub.cbsistatic.com/i/2021/09/08/e23e97f1-4f4e-4129-afeb-a7ca6fd3f316/one-piece.png?auto=webp&width=1210&height=628&crop=1.927:1,smart
      https://criticalhits.com.br/wp-content/uploads/2022/04/sword_art_online.jpg
     -->

     <div class="slideGrupContainer">
       <h2 class="slideGrupTitle">Maratone agora!</h2>
       <h3 class="slideGroupText">Assista alguns dos nossos títulos mais populares</h3>
     </div>
    <v-sheet
    class="mx-auto"
    max-width="100%"
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
        color="black"
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
                  height="317"
                  width="225"
                  lazy-src="https://img.quizur.com/f/img5f0c80e0bd9d08.31973740.jpg?lastEdited=1594654954"
                 :src="anime.entry.images.webp.image_url"></v-img>
              </div>
          </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  
    <div class="renTgirlfriendAd">
      <img 
      class="rentGfImg"
      src="https://static.crunchyroll.com/fms/desktop_large/1050x350/57c4b4c7-fa62-409a-9039-7fbd812b5433.png" alt="">
    </div>
    
  
    <div class="topAnimesContainerTitle">
       <h2 class="slideGrupTitle">Em alta!</h2>
       <h3 class="slideGroupText">Veja os animes que estão bombando</h3>
     </div>
    
    <div class="topAnimesContainer">
      <div class="topAnimesBox">
          <h2 class="topAnimesContainerTitle">Airing now</h2>
          <div v-for="anime in topAnimeData" :key="anime">
            <v-divider></v-divider>
            <div class="topAnimesContent">
              <img
              class="topAnimesImg"
              lazy-src="https://picsum.photos/id/11/100/60"
              :src="anime.images.jpg.small_image_url"
              >
              <div class="topAnimesText">
                <h4 class="topAnimesTextTitle">{{ anime.title }}</h4>
                <h5 class="topAnimesTextInformation">EP:{{anime.episodes}}  {{ anime.duration }}</h5>
              </div>
            </div>
        </div>
        <v-divider></v-divider>
      </div>
      <div class="topAnimesDivider" ></div>
      <div class="topAnimesBox">
        <h2 class="topAnimesContainerTitle">Upcoming</h2>
      <div v-for="anime in topAnimeData" :key="anime">
        <v-divider></v-divider>
        <div class="topAnimesContent">
          <img
          class="topAnimesImg"
          lazy-src="https://picsum.photos/id/11/100/60"
          :src="anime.images.jpg.small_image_url"
          >
          <div class="topAnimesText">
            <h4 class="topAnimesTextTitle">{{ anime.title }}</h4>
            <h5 class="topAnimesTextInformation">EP:{{anime.episodes}}  {{ anime.duration }}</h5>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      </div>
  </div>


  </div>
    <!-- <img src="https://9animetv.to/images/footer-icon.png" alt=""> -->
<br>
<br>

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


let carouselImgVar = [
  'https://static.crunchyroll.com/fms/landscape_large/94/png/a5bac8ac-8bf6-4a78-9674-4730fac66ab6.webp',
  'https://pbs.twimg.com/media/FvssMuiaEAEgetv?format=jpg&name=large',
  'https://criticalhits.com.br/wp-content/uploads/2022/04/sword_art_online-910x569.jpg',
  'https://static.crunchyroll.com/fms/landscape_large/94/png/0f64543f-c57d-4271-9750-8e84ddc3aa9d.webp',
  'https://static.crunchyroll.com/fms/landscape_large/94/png/2a0393cd-5f74-4114-9db4-20f291326337.webp',
  'https://static.crunchyroll.com/fms/landscape_large/94/png/b92e0337-7d7c-4db0-86bc-f94352af72a9.webp',
]


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


topAnimeData.value = response.data.data.slice(0,5)
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

// let corAaa = ref('#212121ff')
// let corBbb = ref('#A8EB12')
//let corBbb = ref('#212121ff')
//let corBbb = ref('#A8EB12')


</script>

<style>

* {
  box-sizing: border-box;
}


.iconImg {
  height: 80px;
  width: 50px;
  background-color: black;
  color: #c8e662;
}

.v-img__img {
  height: 320px;
}

.v-slide-group-settings {
  background-color: #121315;
  color: white;

}

h3 {
  font-size: 25px;
  overflow: hidden!important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  padding-bottom: 60px;
}

.testandooTitle {
  height: 100%;
  writing-mode: tb-rl;
  transform: rotate(180deg);
  max-width: 30px;
  padding: 0;
  overflow: hidden!important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  font-size: 25px !important;
  align-items: center;
  background: linear-gradient(180deg, rgba(18,18,18,1) 75%, rgba(168, 235, 18, 0.962) 100%);
  color: white;
  transition: 0.5s;
  padding-top: 15px!important;


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
  background: linear-gradient(180deg, rgba(18,18,18,1) 75%, rgba(255,255,255,0.9617822128851541) 100%);
  color: rgb(255, 255, 255);
  transition: 0.6s;
}
.testandoo {
  display: flex;
  flex-direction: row;
  justify-content: end;
  max-width: 255px;
  max-height: 317px;
  background: #121315;
}

.v-img__img--contain {
  object-fit: fill!important;
}

.carouselImg {
  object-fit: contain!important;
  height: 100%;
  width: 100%;
}







.topAnimesContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}

.topAnimesBox {
  display: flex;
  flex-direction: column;
  color: white;
  background-color: #202125;
  width: 40%;
}

.topAnimesContainerTitle {
  text-align: center;
  color: #c8e662;
  margin-bottom: 10px;
}


.topAnimesContent {
  display: flex;
  flex-direction: row;
}

.topAnimesImg {
  width: 42px;
  height: 60px;
}

.topAnimesText {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  width: 80%;
}

.topAnimesTextTitle {
  font-size: 15px;
  text-overflow: ellipsis!important;
  white-space: nowrap!important;
  overflow: hidden!important;
}

.topAnimesTextInformation {
  font-size: 11px;

}



.vaiParaBaixo {
  margin-top: 70px;
}

.v-window__controls {.v-btn {
  background-color: #c9e866;
}
} 

.slideGrupContainer {
  margin-top: 15px;
  margin-left: 50px;
}
.slideGrupTitle {
  color: white;
  font-size: 40px;
}
.slideGroupText {
  color: white;
  font-size: 15px;
  padding: 0;
}

.renTgirlfriendAd {
  margin-top: 50px;
  justify-content: center;
  display: flex;
  margin-bottom: 30px;
}
.rentGfImg {
  max-height: 170px!important;
  max-width: 800px!important;
}


/* .v-window__controls {
  flex-direction: column;
  align-items: end;
  justify-content: end;
  margin-bottom: 15px;
  object-fit: fill!important;
}

.v-window__controls {.v-btn {
  font-size: 30px;
  background-color: green!important;
  margin-bottom: 20px;
}
} */


</style>

