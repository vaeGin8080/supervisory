import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "index",
        meta: {
          title: "首页",
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Home/index.vue"),
      },
      {
        path: "home/api",
        name: "apiList",
        meta: {
          title: "API列表",
        },
        component: () => import("../views/Api/index.vue"),
      },
    ],
  },
  {
	  path: "/monitor",
	  name: "monitor",
	  component: () => import("../views/Automatic/index.vue"),
  },
  {
	  path: "/login",
	  name: "login",
	  component: () => import("../views/login/login.vue"),
  }
];

const router = new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

export default router;
