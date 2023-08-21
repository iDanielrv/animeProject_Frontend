import { createStore } from 'vuex';

const store = createStore ({
    state() {
        return {
            isAuthenticated: false,
            email: null,
        };
    },
    mutations: {
        SET_AUTHENTICATED(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        SET_EMAIL(state, email) {
            state.email = email;
        }
    },
    actions: {
        login({ commit }, { email }) {
            commit('SET_AUTHENTICATED', true);
            commit('SET_EMAIL', email);
        },
        logout({ commit }) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_EMAIL', null);
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        userEmail(state) {
            return state.email;
        }
    }
})

export default store;