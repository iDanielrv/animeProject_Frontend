<template>
<h1>OIII</h1>
<h2>https://api.jikan.moe/v4/seasons/2012/spring</h2>


    <div class="mainContent" v-if="isLoading">
      <h1>Loading data</h1>
      <v-progress-linear color="blue-lighten-3" indeterminate :height="7"></v-progress-linear>
    </div>

  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="yearSearch"
            :items="yearItems"
            label="year"
          ></v-select>
        </v-col>

        <v-col cols="6">
          <v-select
            v-model="seasonSearch"
            :items="seasonItems"
            label="season"
          ></v-select>
        </v-col>
      </v-row>
      
      <v-btn @click="searchData" variant="tonal">
        Button
      </v-btn>
    </v-container>
  </v-card>

  <div v-if="!isLoading">
    <div v-for="anime in animesData" :key="anime">
    {{ anime.title }}
    <div class="animeImageContainer">
        <img class="animeImage" :src="anime.images.jpg.image_url" >
      </div>
    </div>
    <div class="text-center">
      <v-pagination
        :disabled="paginationLenght? false : true"
        v-model="page"
        @update:modelValue="changePage"
        :length="paginationLenght"
        :total-visible="4"
      ></v-pagination>
    </div>
  </div>

</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios';

const isLoading = ref(false)


let baseJikanUri = 'https://api.jikan.moe/v4/seasons'
let yearSearch = ref('');
let seasonSearch = ref('');

let animesData = ref([])


let seasonItems = ['winter', 'spring', 'summer', 'fall'];
let yearItems = [];


let todaysYear = new Date().getFullYear() ;
let yearsCalc = () => {
  for (let i = todaysYear; i >= 1990 ; i--) {
    yearItems.push(i)
  }
}
yearsCalc()


let page = ref(1)
let limit = ref(10)
let paginationLenght = ref(null)



let searchData = async () => {
  isLoading.value = true;


  console.log('seasonSearch dentro da função, para ver oq acontece hehe');
  console.log(seasonSearch.value);
  console.log('yearSearch dentro da função, para ver oq acontece hehe');
  console.log(yearSearch.value);

  const response = await axios.get(`${baseJikanUri}/${yearSearch.value}/${seasonSearch.value}?limit=${limit.value}&page=${page.value}&filter=tv`)

  animesData.value = response.data.data

  console.log(response.data.pagination);
  paginationLenght.value = response.data.pagination.last_visible_page


  isLoading.value = false
}


let changePage = async () => {
  searchData()
}


</script>

