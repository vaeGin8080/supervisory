<template>
  <div class="headers flex justify-between align-center">
    <el-menu
      class="el-menu-demo"
      :default-active="activeMenu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#012D5E"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/monitor">监控中心</el-menu-item>
      <!-- <el-menu-item index="4">动态趋势</el-menu-item> -->
    </el-menu>
    <el-dropdown @command="handleCommand" trigger="click">
      <div class="el-dropdown-link flex-center">
        <img
          class="header-img"
          :src="(userInfo && userInfo.headerImg) || defaultImg"
        />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="c">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
      defaultImg: require("@/assets/image/default-avatar.svg"),
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      console.log(path);
      return path;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(commend) {
      console.log(commend);
      if (commend == "c") {
        this.$store.commit("user/removeLogin");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.headers {
  padding-left: 200px;
  background: #012d5e;
  padding-right: 40px;
  .header-img {
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
