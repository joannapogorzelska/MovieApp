import {
    createRouter,
    createWebHistory,
} from 'vue-router';

import AllMovies from './component/AllMovies.vue';
import ErrorMessage from './component/ErrorMessage.vue';
import MovieForm from './component/MovieForm.vue';
import ShowDescription from './component/ShowDescription.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            redirect: '/movies'
        },
        {
            path: '/movies',
            component: AllMovies
        },
        {
            path: '/movies/form',
            component: MovieForm
        },
        {
            path: '/movies/:id',
            component: ShowDescription,
            props: true,
        },
        {
            path: '/:notFound(.*)',
            component: ErrorMessage,
        },
    ],
})

export default router