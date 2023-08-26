import { createStore } from 'vuex';

 //recuperar,  se existir, no localstorage  (GET)
//email getemail
// let localstorage = localStorage.getItem()

let checkls = localStorage.getItem('logado')

const store = createStore ({
    state() {
        return {
            isAuthenticated: (checkls) ? true: false,
            email: null,
            user:{}
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
                state.email ='';
                 //deletar no localstorage (REMOVE)
                return
            }
            state.isAuthenticated = payload.isLogged;
            state.email = payload.email;
            //salvar no localstorage (SET)
        },
        SET_EMAIL(state, email) {
            state.email = email;
        }
    },
})

export default store;