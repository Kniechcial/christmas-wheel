import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import InputData from "../components/user_input/InputData.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "HomeView",
			component: HomeView,
		},
		{
			path: "/input",
			name: "InputData",
			component: InputData,
		},
	],
});

export default router;
