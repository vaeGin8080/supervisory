<template>
  <el-container class="h-100">
    <el-header><Header></Header></el-header>

    <el-container>
      <Sidebar></Sidebar>
      <!-- out-in：当前元素先进行过渡，完成之后新元素过渡进入。 -->
      <transition name="fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
    </el-container>
    <div
      class="root-bg"
      :style="{
        backgroundImage: `url(${rootBG})`,
        backgroundSize: 'cover',
      }"
    ></div>
  </el-container>
</template>

<script>
// import Sticky from "@/components/Sticky";
import Header from "./header";
import Sidebar from "./Sidebar";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      visibleHead: true,
      bg: "https://wallpaper.infinitynewtab.com/wallpaper/342.jpg",
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
    ...mapGetters(["rootBG"]),
  },
  mounted() {},
  methods: {
    init() {},
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  background-attachment: fixed;
  overflow: auto;
  height: 100%;
}

.root-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
