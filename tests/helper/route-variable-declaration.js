import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('@/view/home/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
