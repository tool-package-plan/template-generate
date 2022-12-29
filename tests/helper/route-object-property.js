import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/home',
      component: () => import('@/view/home/index.vue'),
    },
  ],
});
export default router;
