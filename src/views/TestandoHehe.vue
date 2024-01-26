<template >
    <v-card class="bg-white">
        <!-- <v-tabs bg-color="deep-purple-darken-4" 
        center-active
        v-model="tab">
            <v-tab
            v-for="text, index in tabText"
            :key="text"
            :value="text" :text="tabText[index]"></v-tab>

        </v-tabs>

        <v-window v-model="tab">
            <v-window-item
                v-for="item, index in teste"
                :key="item"
                :value="item.broadcast.day" :text="tabText[index]"
            >
            {{ item.title }}
                <v-card>
                </v-card>
            </v-window-item>
    </v-window> -->

    </v-card>
    <h1 class="classContainer">/////////////////////////</h1>
    <div class="classContainer">{{ tab }} hehe</div>
    <div v-for="anime in teste" :key="anime">
        <h1 class="classContainer">{{ anime.title }}</h1>
        <h1 class="classContainer">{{ anime.broadcast.time }}</h1>

    </div>
</template>

<script setup>
import axios from 'axios';
import { set } from 'mongoose';
import { onMounted } from 'vue';
import { ref } from 'vue'

let daysOfTheWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday",]

let tab = ref(null);

let allData = ref([]);

let schedules = ref([])
let teste = ref([]);

async function getSchedules() {

    // daysOfTheWeek.forEach((day, index) => {
    //         setTimeout(async () => {
    //             const apiData = await axios.get(`https://api.jikan.moe/v4/schedules?filter=${daysOfTheWeek[index]}`);
    //             allData.value.push(apiData)
    //         }, "5000");

    // });
}


let animesFunction = async () => {

    getSchedules();

    console.log('vamos veeeeeeeeeeeeeeeeeeeeeeeeeeeeer');
    console.log(allData.value);

    schedules.value = apiData.data

    console.log('olha o calendarioooo');
    console.log(schedules.value);
    teste.value = schedules.value.data

    console.log('aaaaaaaaaaaaaaaaa');
    console.log(teste.value);
    console.log(teste.value[0].title);

}


function testandoTime() {
    let i = 0
    for (i; i < daysOfTheWeek.length; i++) {
        setTimeout(() => {
            console.log(i);
            
        }, 1000);
    }
}



onMounted(() => {
    animesFunction()
    testandoTime()
})

</script>


<style scoped>
.classContainer {
    color: white;
}
</style>