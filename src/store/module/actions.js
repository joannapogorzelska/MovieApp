export default {
    async loadMovies(context) {
        const response = await fetch('https://vue-movies-app-d3268-default-rtdb.europe-west1.firebasedatabase.app/movies.json')
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Fail to fetch')
            throw error
        }
        const movies = [];
        for (const id in data) {
            const movie = {
                id: id,
                title: data[id].title,
                year: data[id].year,
                description: data[id].description,
            };
            movies.push(movie);
        }
        context.commit('setMovies', movies)
    },
    async loadUpdateMovies(context, {
        id,
        editData
    }) {
        const movieChangeData = {
            id: editData.id,
            title: editData.title,
            year: editData.year,
            description: editData.description,
        };
        console.log(movieChangeData)

        const response = await fetch(`https://vue-movies-app-d3268-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(movieChangeData)
        })
        console.log(editData, id)
        if (!response.ok) {
            const error = new Error(editData.message || 'Fail to fetch')
            throw error
        }
        context.commit('editMovieItem', movieChangeData);
    },
    async newMovie(context, data) {
        const movieData = {
            id: new Date().toISOString(),
            title: data.title,
            year: data.year,
            description: data.description,
        };
        const response = await fetch('https://vue-movies-app-d3268-default-rtdb.europe-west1.firebasedatabase.app/movies.json', {
            method: 'POST',
            body: JSON.stringify(movieData)
        })
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(data.message || 'Fail to fetch')
            throw error
        }
        movieData.id = responseData.title
        context.commit('newMovie', movieData)
    },

    removeMovie(context, id) {
        fetch(`https://vue-movies-app-d3268-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`, {
            method: 'DELETE',
        }).then(response => {
            return response.json()
        })
        context.commit('removeMovieItem', id);
        console.log(id)

    }
}