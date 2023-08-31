import { createRouter, createWebHistory } from "vue-router";

import AboutUs from './pages/AboutUs.vue';
import HomePage from './pages/HomePage.vue';
import Projects from './pages/Projects.vue';

const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            name : 'homepage',
            component : HomePage,
        },

        {
            path: '/about-us',
            name : 'about',
            component : AboutUs,
        },

        {
            path: '/projects',
            name : 'projects',
            component : Projects,
        },

    ]
})

export {router};