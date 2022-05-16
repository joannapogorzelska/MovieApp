export default {
    setMovies(state, payload) {
        state.movies = payload
    },
    newMovie(state, payload) {
        const movieData = payload;
        const newItem = {
            id: movieData.id,
            title: movieData.title,
            year: movieData.year,
            description: movieData.description,
        }
        state.movies.push(newItem);
    },
    removeMovieItem(state, id) {
        let movieIndex = state.movies.findIndex(
            m => m.id === id
        );
        console.log(movieIndex)
        state.movies.splice(movieIndex, 1);

    },
    editMovieItem(state, movie) {
        let movieUpdateIndex = state.movies.findIndex(m => m.id === movie.id)
        console.log(movieUpdateIndex)
        let editItem = {
            title: movie.title,
            year: movie.year,
            description: movie.description,
            id: movie.id,
        }

        state.movies.splice(movieUpdateIndex, 1, editItem);
        console.log(editItem, movieUpdateIndex)
    }
}