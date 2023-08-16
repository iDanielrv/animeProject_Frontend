<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
    
      <div>
      <h1>Esta Season:</h1>  
      </div>
      <div class="mainContent" v-if="isLoading">
        <h1>Loading data</h1>
        <v-progress-linear color="blue-lighten-3" indeterminate :height="7"></v-progress-linear>
      </div>
      <div v-else class="animesBox">
        <div class="animeCard" v-for="anime in listaAnimes" :key="anime">
          <div class="animeCardContent">
            <h1 class="animeTitle">{{ anime.title }}</h1>
            <div class="animeImageContainer">
              <img class="animeImage" :src="anime.images.jpg.image_url" >
            </div>
          </div>
        </div>
      </div> 
    
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


const listaAnimes = ref([]);
const isLoading = ref(true)


const animesFunction = async () => {
  try {
    const dataAPi = await axios.get('https://api.jikan.moe/v4/seasons/now')
      const data = dataAPi.data.data
      console.log(data);
      listaAnimes.value = data
      isLoading.value = false
  } catch (error) {
    console.log(error);
  }

}
onMounted(() => {
  animesFunction()
})
</script>

<style>
  .animesBox {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
  }
.animeCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.animeCardContent {
  display: flex;
  flex-direction: column;
  flex: 1; /* Preenchimento flexível para acomodar tamanho do título */
  justify-content: space-between; /* Alinha o conteúdo verticalmente */
  text-align: center;
  align-items: center;
  padding: 10px;
}
.animeTitle {
  font-size: 16px;
  max-width: 256px;
  margin: 0;
  overflow: hidden; /* Impede que o título ultrapasse a largura da imagem */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limite de duas linhas */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;

}
.animeImage {
  max-width: 100%; /* Garante que a imagem não exceda a largura do contêiner */
  max-height: 100%; /* Aumenta o tamanho da imagem */
}

.animeImageContainer {
  height: 300px; /* Defina a altura fixa para o contêiner da imagem */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Impede que as imagens excedam o contêiner */
}

</style>

