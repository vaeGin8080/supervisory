import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [{
		path: "/login",
		name: "login",
		component: () => import("../views/Login/login.vue"),
	},
	{
		path: "/",
		name: "Home",
		component: Layout,
		children: [{
				path: "home",
				name: "index",
				meta: {
					title: "首页",
				},
				component: () =>
					import( /* webpackChunkName: "about" */ "../views/Home/index.vue"),
			},
			{
				path: "home/api",
				name: "apiList",
				meta: {
					title: "API列表",
				},
				component: () => import("../views/Api/index.vue"),
			},
			{
				path: "home/personnel",
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
]

const router = new VueRouter({
	mode: "hash",
	scrollBehavior: () => ({
		y: 0
	}),
	routes,
});

// 重写push方法，点击重复path不报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};
export default router;
