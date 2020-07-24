import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist
const whiteName = [];
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);
  // determine whether the user has logged in
  var hasToken = store.getters.isLogin;
  console.log(hasToken);
  if (hasToken) {
    console.log("has token");
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      console.log("if login");
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else {
    if (
      whiteList.indexOf(to.path) !== -1 ||
      whiteName.indexOf(to.name) !== -1
    ) {
      next();
    } else {
      console.log("one else");
      Message.error("请登录");
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
