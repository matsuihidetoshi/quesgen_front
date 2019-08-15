import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './src/components/questions/index.vue';
import Show from './src/components/questions/show.vue';
import New from './src/components/questions/new.vue';
import Edit from './src/components/questions/edit.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/questions/index', component: Index, name: 'questions', },
    { path: '/questions/show', component: Show, name: 'question' },
    { path: '/questions/new', component: New, name: 'new_question' },
    { path: '/questions/edit', component: Edit, name: 'edit_question' },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;