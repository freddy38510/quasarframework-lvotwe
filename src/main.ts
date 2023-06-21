import globalPlugins from '@/components/global';
import App from '@/App.vue';
import router from '@/router';
import '@/css/app.scss';
import { createPinia } from 'pinia';
import GridLayout from 'vue-grid-layout';
import { createApp } from 'vue';

const app = createApp(App);

const pinia = createPinia();

app.use(router).use(pinia).use(globalPlugins).use(GridLayout);

app.mount('#app');
