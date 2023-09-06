<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      <router-link to="/">MAWlist</router-link>      
    </v-app-bar-title>





    <v-card class="searchBoxContainer">
    <v-text-field
            v-model="userName"
            :rules="rules"
            label="anime name"
            @update:modelValue="logModel"
            width="500"
    ></v-text-field>
    <v-expand-transition v-if="(userName.length >= 1)? show = true : show = false">
        <v-virtual-scroll
            :height="400"
            :items="animesData"
        >
        <!-- esse v-slot:default funciona como um v-for, mas como eu uso o v-for normalmente e para fins didaticos eu vou continuar usando o v-for :) -->
        <template v-slot:default="{ item }">
            <h1>{{ item.title }}</h1>
            <v-card>
                        <div v-for="anime in animesData" :key="anime">
                            <v-divider :thickness="1" class="border-opacity-25"></v-divider>
                            <div class="searchBoxContent">
                                <div>
                                    <v-img :src="anime.images.jpg.image_url" alt=""
                                        height="320"
                                        width="225"
                                    >
                                    </v-img>
                                </div>
                                <div class="searchTextContent">
                                    <h2>{{ anime.title }}</h2>
                                    <div class="asdhasdh">
                                        <h6>{{ anime.status }}</h6>
                                        <h6>{{ anime.duration }}</h6>
                                    </div>
                                    <br>
                                    <h4>{{ anime.aired.string }}</h4>
                                    <div class="searchAnimeGenres">
                                        <div v-for="genre in anime.genres" :key="genre">
                                            <v-chip class="bg-lime-accent-4">
                                            <span class="genreChip">
                                                {{ genre.name }} 
                                            </span>
                                            </v-chip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>    
                </v-card>

        </template>
        </v-virtual-scroll>


            
    </v-expand-transition>
</v-card>













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
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'

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










let show = ref(false)

let animesData = ref([]);
let userName = ref('')


let logModel = async () => {
    console.log(userName.value);
    let response = await axios.get(`https://api.jikan.moe/v4/anime?q=${userName.value}&type=tv`)
    /* animesData.value = response.data.data */
    animesData.value = response.data.data
 

    console.log(animesData.value);
}


let animeFunction = async () => {
    let response = await axios.get(`https://api.jikan.moe/v4/anime?q=${userName.value}`)
    animesData.value = response.data.data
}


onMounted(()  => {
    animeFunction()
})





</script>

<style scoped >
.appBarButtons {
  width: 150px;
  display: flex;
  justify-content: space-between;
  margin: 25px,
}












.searchBoxContainer {
    width: 450px!important;
    max-height: 650px;
}

.searchBoxContent {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    max-height: 50%;
}

.searchBoxContent:hover {
    background-color: #414248;
}

.searchAnimeGenres {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.asdhasdh {
    display: flex;
    flex-direction: row;
}

.searchTextContent {
    margin-top: 20px;
    margin-left: 15px;
}

.searchBox {
    display: flex;
    flex-direction: column;
}

.testDiv {
    width: 100%;
    margin-left: 32.5%;
}

.testImg {
    object-fit: fill;
    width: 35%;
    height: 50%!important;
    max-height: 550px;
}

.v-img__img--contain {
  object-fit: fill!important;
}





</style>
