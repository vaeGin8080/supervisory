import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
	{
		  path: "/",
		  name: "login",
		  component: () => import("../views/Login/login.vue"),
	},
	{
		path: "/home",
		name: "Home",
		component: Layout,
		children: [
			{
				path: "/",
				name: "index",
				meta: {
					title: "首页",
				},
				component: () =>
				import(/* webpackChunkName: "about" */ "../views/Home/index.vue"),
			},
			{
				path: "/home/api",
				name: "apiList",
				meta: {
					title: "API列表",
				},
				component: () => import("../views/Api/index.vue"),
			},
			{
				path: "/home/personnel",
				name: "personnel",
				meta: {
					title: "人员管理",
				},
				component: () => import("../views/Personnel/personnel.vue"),
			}
		],
	},
	{
		path: "/monitor",
		name: "monitor",
		component: () => import("../views/Automatic/index.vue"),
	},
];

const router = new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

export default router;
