<template>
  <div class="headers">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/monitor">监控中心</el-menu-item>
      <el-menu-item index="4">动态趋势</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.headers {
  padding-left: 200px;
  background: #545c64;
}
</style>
