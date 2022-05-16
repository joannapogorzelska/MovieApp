import {
    createApp
} from 'vue';



import App from "./App.vue";
import router from "./router.js";
import ErrorMessage from './component/ErrorMessage.vue';
import store from './store/index.js';


const app = createApp(App);

app.component(ErrorMessage);

app.use(router);
app.use(store);
app.mount('#app');