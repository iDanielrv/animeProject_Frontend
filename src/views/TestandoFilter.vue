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
          
        <v-checkbox
            v-model="selected"
            @update:modelValue="filtrandoAnimes"
            label="Action"
            value="Action"
        ></v-checkbox>
        <v-checkbox
            v-model="selected"
            @update:modelValue="filtrandoAnimes"
            label="Adventure"
            value="Adventure"
        ></v-checkbox>

          <v-btn 
          @click="searchData" 
          variant="tonal"
          :disabled="seasonSearch && yearSearch? false : true"
          >
            Button
          </v-btn>
        </v-container>
      </v-card>
    
      <div v-if="!isLoading">
        <div v-for="anime in animesDataFiltered" :key="anime">
            <div>
                {{ anime.title }}
                <div class="animeImageContainer">
                <img class="animeImage" :src="anime.images.jpg.image_url" >
                </div>
                <div v-for="genre in anime.genres" :key="genre">
                {{ genre.name }}
        </div>
            </div>
        </div>
        <div class="text-center">
          <v-pagination
            :disabled="paginationLenght? false : true"
            v-model="page"
            @update:modelValue="changePage"
            :length="paginationLenght"
            :total-visible="6"
          ></v-pagination>
        </div>
      </div>
    
      {{ selected.value }}
    </template>
    
    
    <script setup>
    import { ref } from 'vue'
    import axios from 'axios';
    
    const isLoading = ref(false)
    
    
    let baseJikanUri = 'https://api.jikan.moe/v4/seasons'
    let yearSearch = ref('');
    let seasonSearch = ref('');
    let lastYearSearch = ref('');
    let lastSeasonSearch = ref('')


    let selected = ref([]);
    
    let animesData = ref([]);
    let animesDataFiltered = ref([]);
    

    
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
    let allAnimes = ref([])
    
    
    
    let searchData = async () => {
      isLoading.value = true;
    
      const response = await axios.get(`${baseJikanUri}/${yearSearch.value}/${seasonSearch.value}?limit=${limit.value}&page=${page.value}&filter=tv`)
      paginationLenght.value = response.data.pagination.last_visible_page
    
    
      for (let index = 0; index < paginationLenght.value; index++) {
        const multipleResponse = await axios.get(`${baseJikanUri}/${yearSearch.value}/${seasonSearch.value}?limit=${25}&page=${index+1}&filter=tv`)
        allAnimes.value = [...allAnimes.value,...multipleResponse.data.data]
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        console.log(allAnimes.value);
    }


      animesData.value = response.data.data
      
      if (!selected.value.length) {
          animesDataFiltered.value = animesData.value 
        } else {
            filtrandoAnimes()
        }
        
        if (yearSearch.value !== lastYearSearch.value || seasonSearch.value !== lastSeasonSearch.value) {
        page.value = 1;
      }
        
        
        console.log(response.data.pagination);
        
      lastYearSearch.value = yearSearch.value
      lastSeasonSearch.value = seasonSearch.value

      isLoading.value = false
    }



    
    let mudandoData = () => {
        console.log('mudandoData function');
        console.log(animesDataFiltered.value);

    }

    let filtrandoAnimes = () => {
        console.log(selected.value);
            animesDataFiltered.value = animesData.value.filter((anime, index) => {
            console.log(`anime numero ${index}`);
            console.log(anime.genres);
            let existeGenero = true
            selected.value.forEach((pegueigene) => {
                if (!anime.genres.some((genre) => genre.name.includes(pegueigene))) {
                    existeGenero = false
                }
            })
            return existeGenero
        })
        mudandoData();
    }


    let changePage = async () => {
      console.log('asdasdasdasdas');
      console.log(lastSeasonSearch.value, lastYearSearch.value);
      searchData()
    }
    
    
    </script>
    
    