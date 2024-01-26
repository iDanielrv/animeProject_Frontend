    <template>
    <v-container class="appbarContainer fixedAppBar">
        <div class="iconPageContainer">
            <v-icon icon="mdi-circle-slice-4" />
            <router-link class="iconPageContainerText" to="/"><h1>MAWlist</h1></router-link>

        </div>
       
        <div class="moveToButtonContainer">
            <router-link class="moveToButton" to="/seasonSearch"><button>seasons</button></router-link>
            <router-link class="moveToButton" to="/testandohehe"><button @click="showLupa">calendar</button></router-link>
        </div>

        <div :class="['searchBoxContainer',]">
            <button
            @click="searchBarSatus"
            >
                <v-icon :class="[searchBarOppned? 'searchIconOpened': 'searchIconClosed']">mdi-magnify</v-icon> 
            </button>
            <input 
            type="text"
            v-model="searchInputText"
            @input="logModel"
            placeholder="Search anime"
            :class="[searchBarOppned? 'inputSearchBar' : 'hideSomething']"
            >
                    <div v-show="show">
                        <v-expand-transition v-if="(searchInputText.length >= 1)? show = true : show = false">
                            <v-virtual-scroll
                                :height="400"
                                :items="animesData"
                            >
                            <!-- esse v-slot:default funciona como um v-for, mas como eu uso o v-for normalmente e para fins didaticos eu vou continuar usando o v-for :) -->
                            <template v-slot:default="{ item }">
                                <v-card>
                                            <div v-for="anime in animesData" :key="anime">
                                                <v-divider :thickness="1" class="border-opacity-25"></v-divider>
                                                <div class="animeSearchContainer">
                                                    <div>
                                                        <v-img
                                                            :src="anime.images.jpg.image_url" alt=""
                                                            height="320"
                                                            width="225"
                                                        >
                                                        <template v-slot:placeholder>
                                                            <div>
                                                                <v-progress-circular
                                                                color="grey-lighten-4"
                                                                indeterminate
                                                                ></v-progress-circular>
                                                            </div>
                                                            </template>
                                                        </v-img>
                                                    </div>
                                                    <div class="searchTextContent">
                                                        <h2 class="searchTextContentTitle">{{ anime.title }}</h2>
                                                        <div class="asdhasdh">
                                                            <h6>{{ anime.status }}</h6>
                                                            <h6>{{ anime.duration }}</h6>
                                                        </div>
                                                        <br>
                                                        <h4>{{ anime.aired.string }}</h4>
                                                        <div class="searchAnimeGenres">
                                                            <div v-for="genre in anime.genres" :key="genre">
                                                                <v-chip class="genreChipBackground">
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
                        <!-- </v-col>
                        </v-row> -->
                    </div>
        </div>
        <div>
        <div class="appBarButtons" v-if="!checkLogado">
            <router-link to="/register"><v-btn>Register</v-btn></router-link>
            <router-link to="/login"><v-btn>Login</v-btn></router-link>
        </div>
        <div class="appBarButtons" v-else>
            <v-btn @click="handleLogOut" >
            Logout
            </v-btn>
        </div>
        </div>
    </v-container>
<!-- :class="['inputSearchBar', (searchInputText.length >= 1) ? 'expandSearch2' : '']" -->
    {{ searchInputText }}
    </template>
  
  <script setup>
  import router from '@/router';
  import Cookies from 'js-cookie';
  import { useStore } from 'vuex';
  import { computed, ref } from 'vue'
  import axios from 'axios'
  
  const store = useStore()
  console.log('storess',store.state.isAuthenticated);
  let checkLogado = computed(() => {
    return store.state.isAuthenticated
  })
  console.log('dentro do appBar');
  
  
  let handleLogOut = () => {
    Cookies.remove('jwt')
    store.dispatch('logout')
    router.push('/')
  }
  
  
  




  let searchBarOppned = ref(false)
  
  let searchBarSatus = () => {
    searchBarOppned.value = !searchBarOppned.value
    searchInputText.value = ''
    if (searchBarOppned.value) {
        console.log('searchbar aberto');
    } else {
        console.log('fechado');
    }
  }

  









  
  
  
  let show = ref(false)
  
  let animesData = ref([]);
  let searchInputText = ref('')
  
  
  let logModel = async () => {
      console.log(searchInputText.value);
      let response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchInputText.value}&type=tv`)
      /* animesData.value = response.data.data */
      animesData.value = response.data.data
   
  
      console.log(animesData.value);
  }
  
  
/*   let animeFunction = async () => {
      let response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchInputText.value}`)
      animesData.value = response.data.data
  } */
  
  
/*   onMounted(()  => {
      animeFunction()
  }) */
  
  
  
  
  
  </script>
  
  <style scoped >

/* CONTAINER GLOBAL */
.appbarContainer {
    height: 50px;
    width: 100%;
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    background-color: #23252b;
    padding: 0;
    align-items: center;
}
.fixedAppBar {
    position: fixed;
    z-index: 800;
}

/* ################################################## */

.hideSomething {
    visibility: hidden;
    opacity: 0;
    width: 0px;
    transition: 1s;
}

.searchIconOpened {
    color: #c9e866 ;
}
.searchIconClosed {
    color: #ffffff ;
}

.searchBoxContainer {
    width: 500px;
    position: relative;
    z-index:700;
    height: 25px;
}



  



.inputSearchBar {
    width: 476px;
    transition: 1s;
    background-color: rgb(74, 74, 74);
    border-radius: 5px;
    color: white;
    padding-left: 10px;
    transition: 0.5s;
}
.inputSearchBar:focus {
    outline: none;
}






  
/* LOGO  */
.iconPageContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #c9e866;

}

.iconPageContainerText {
    color: #c9e866;
    text-decoration: none;

}


/* ROUTER BUTTONS */
.moveToButtonContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #23252b;
    margin-right: 15px;
    margin-left: 15px;

}

.moveToButton {
    display: flex;
    background-color: #23252b;
    color: white;
    height: 100%;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    padding: 0px 15px 0px 15px;
}
.moveToButton:hover{
    background-color: #ffffff18;
    height: 100%;
    color: #c9e866;
}




.animeSearchContainer {
    display: flex;
    width: 100%;
    height: 320px;
    background-color: #2a2b30;
}
.animeSearchContainer:hover {
    background-color: #2a2b30e1;
}










.v-virtual-scroll {
    height: 400px!important;
}





/* APP BAR AUTH BUTTONS  */
  .appBarButtons {
    display: flex;
    justify-content: space-between;
    border-radius: 15PX;
    height: 30px;
    flex-grow: initial;
    position: absolute;
    top: 13px;
    right:0;
  }
  
  .appBarButtons { .v-btn {
    background-color: #c9e866;
    font-size: 12px;
    height: 80%;
    border-radius: 15PX;
    margin-right: 15PX;
    color: rgb(0, 0, 0);
    font-weight: 800;
  }
  }

  .appBarButtons { .v-btn:hover {
    background-color: rgb(135, 197, 80);
  }
  }










  .searchAnimeGenres {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
  }

  .genreChipBackground {
    background-color: #c9e866;
    color: black;
    font-weight: 800;
  }
  
  .asdhasdh {
      display: flex;
      flex-direction: row;
  }
  
  .searchTextContent {
    width: 100%;
    color: white;
    padding-left: 15px;
  }


  .searchTextContentTitle {
    max-width: 300px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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

  .v-input__details { .v-messages {
    height: 0px;
  }}


  </style>
  