import { createRouter, createWebHistory } from 'vue-router';

/* Creating a router object that will be used to navigate between pages. */
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			// eslint-disable-next-line import/no-unresolved
			component: () => import('@/pages/Home.vue')
		}
	]
});

export default router;
