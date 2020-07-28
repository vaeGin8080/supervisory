<template>
  <el-menu
    :default-active="activeMenu"
    background-color="#012D5E"
    text-color="#fff"
    active-text-color="#FCDF49"
    style="width: 201px"
    router
  >
    <el-submenu index="1">
      <template slot="title"
        ><i class="el-icon-s-promotion"></i>网站列表</template
      >
      <el-menu-item-group>
        <el-menu-item index="/home">网址列表</el-menu-item>
        <el-menu-item index="/home/api">API列表</el-menu-item>
        <el-menu-item index="/home/personnel">人员管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
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
};
</script>

<style></style>
