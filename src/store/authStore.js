import { createStore } from 'vuex';



 //recuperar,  se existir, no localstorage  (GET)
//email getemail
// let localstorage = localStorage.getItem()

let checkLS = JSON.parse(localStorage.getItem('logado'));

const store = createStore ({
    state() {
        return {
            isAuthenticated: (checkLS) ? true: false,
            email: null,
        };
    },
    actions: {
        login({ commit }, { email }) {
            console.log('valor actions login: ',email);
            commit('SET_AUTHENTICATED', { email, isLogged:true});
        },
        logout({ commit }) {
            commit('SET_AUTHENTICATED', null);
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        userEmail(state) {
            return state.email;
        }
    },
    mutations: {
        SET_AUTHENTICATED(state, payload) {
            if(!payload){
                state.isAuthenticated = false;
                state.email ='aq testando para ver se é null';
                console.log(state.email);
                 //deletar no localstorage (REMOVE)
                 localStorage.removeItem('logado')
                return
            }
            console.log('ddddddddddddddddddddddddddddddddddddddddddd');
            console.log(payload);
            state.isAuthenticated = payload.isLogged;
            state.email = payload.email;
            //salvar no localstorage (SET)
            localStorage.setItem('logado', true)
        },
        SET_EMAIL(state, email) {
            state.email = email;
        }
    },
})

//ent basicamente funciona assim, eu declaro os states que são as variaveis que serão utilizadas
// dps eu faço as ACTIONS, que serão os methods que vou usar para modificar algo, pego essa data e passo por um commit ( que chama as mutations)
// nas mutations eu atribuo o valor que eu quero para o state, e dps eu adiciono os getters para poder chamar la no front por exemplo ( com um computed)

export default store;