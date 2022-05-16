import {
    createStore
} from "vuex"

import MovieModule from './module/index.js'

const store = createStore({
    modules: {
        movies: MovieModule,
    },
    state() {
        return {
            showForm: false,
        }
    },
    mutations: {
        showFormMovie(state) {
            state.showForm = true;
        },
        hideFormMovie(state) {
            state.showForm = false;
        },
    },
    actions: {
        showFormMovie(context) {
            context.commit('showFormMovie');
        },
        hideFormMovie(context) {
            context.commit('hideFormMovie');
        },
    },
    getters: {
        movieId(state) {
            return state.movieId
        },
        isFormSend(state) {
            return state.showForm
        }
    }
})

export default store;