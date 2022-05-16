export default {
    movies(state) {
        return state.movies;
    },
    hasMovies(state) {
        return state.movies && state.movies.length > 0;
    },
};