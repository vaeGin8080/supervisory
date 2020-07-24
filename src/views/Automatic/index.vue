<template>
  <div class="wrap">
    <div class="header flex justify-between">
      <el-button type="info" @click="back">返回</el-button>
      <el-button type="success" @click="init">重新检测</el-button>
    </div>
    <ul class="list">
      <li
        v-for="(item, index) in tableData"
        :style="[{ animationDelay: (index + 1) * 0.05 + 's' }]"
        :class="[count == index ? 'animation-shake' : '']"
        class="item"
        :key="index"
      >
        <p>{{ item.title }}</p>
        <p>
          <a :href="item.url" target="_blank">{{ item.url }}</a>
        </p>
        <i v-if="item.status == 1" class="el-icon-success success"></i>
        <i v-if="item.status == -1" class="el-icon-loading loading"></i>
        <i v-if="item.status == -2" class="el-icon-error error"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUrlList, checkUrl } from "@/api/url";
export default {
  data() {
    return {
      timer: null,
      tableData: [],
      count: 0,
    };
  },
  mounted() {
    this.init();
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.list = [];
        // 调用相应的接口，渲染数据
        this.init();
      }, 1000 * 60 * 3); //三分钟刷新一次
    }
  },
  methods: {
    init() {
      let that = this;
      this.count = 0;
      getUrlList({ page: 1, pageSize: 100 }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.status = -1;
          return item;
        });
        this.testing(this.count);
      });
    },
    back() {
      this.$router.go(-1);
    },
    testing(count) {
      let item = this.tableData[count];
      let query = {
        id: item.id,
        url: item.url,
        title: item.title,
        email: item.email,
      };
      checkUrl(query)
        .then((res) => {
          if (res.code == "200" && res.status == 1) {
            item.status = 1;
            item.delayTime = res.data.delayTime + res.data.unit;
          } else {
            item.status = -2;
          }
          if (count < this.tableData.length - 1) {
            setTimeout(() => {
              this.count++;
              this.testing(++count);
            }, 500);
          }
          // console.log(this.count);
        })
        .catch((rej) => {
          item.status = -2;
          if (count < this.tableData.length - 1) {
            setTimeout(() => {
              this.count++;
              this.testing(++count);
            }, 500);
          }
        });
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/animate.scss";
.wrap {
  background: #333;
  height: 100%;
  .header {
    padding: 10px;
  }
}
.list {
  width: 100%;
  padding: 20px;
  background: #333;
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
.item {
  width: 23%;
  height: 300px;
  margin: 10px 0;
  border-radius: 20px;
  border: 5px solid #fff;
  background: Linear-gradient(
    rgba(52, 161, 184, 0.3),
    rgba(4, 207, 228, 0.5),
    rgba(52, 161, 184, 1)
  );
  box-shadow: 2px 2px 4px 2px #fff;
  padding: 50px;
  margin: 0 1% 2%;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
    border: 5px solid rgb(15, 120, 146);
  }
}
.item .success {
  margin: 0 auto;
  font-size: 100px;
  color: #67c23a;
}
.item .error {
  margin: 0 auto;
  font-size: 100px;
  color: #f56c6c;
}
.item .loading {
  margin: 20px auto;
  font-size: 50px;
  color: #fff;
}
.item p {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  line-height: 30px;
  width: 100%;
  @include text-overflow();
  a {
    width: 100%;
    word-wrap: break-all;
  }
  cursor: pointer;
}
</style>
