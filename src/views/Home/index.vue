<template>
  <el-container class="wrap">
    <div class="line"></div>
    <el-main>
      <el-row
        style="border: 1px solid #EBEEF5;"
        class="search-wrap flex justify-between"
      >
        <el-col class="seach-top flex">
          <el-input
            v-model="title"
            placeholder="请输入内容"
            style="width:200px;margin-right:10px"
            @keydown.enter.native="init"
          ></el-input>
          <el-button type="primary" @click="init">搜索</el-button>
        </el-col>
        <el-col>
          <div class="search-bottom flex justify-end">
            <el-button
              type="primary"
              @click="
                show = true;
                type = 'add';
              "
              >新增监控</el-button
            >
            <!-- <el-button type="danger" @click="BatchDeleteHandler"
              >批量删除</el-button
            > -->
            <el-button type="success" @click="handleMultapie"
              >批量检测</el-button
            >
          </div>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="title" label="网站名称"> </el-table-column>
        <el-table-column prop="url" label="网站地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="邮箱" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status == -1">待检测 </span>
            <span v-else-if="scope.row.status == 0"
              >正在检测
              <el-button icon="el-icon-loading" circle size="mini"></el-button>
            </span>
            <span class="success" v-else-if="scope.row.status == 1"
              >连接通畅
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                size="mini"
                style="margin: 0 5px;"
              ></el-button>
              <span>{{ scope.row.delayTime }}</span>
            </span>
            <span class="error" v-else>连接失败 </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row, scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row, scope.$index)"
              >删除</el-button
            >
            <el-button
              type="success"
              size="mini"
              @click="handleCheck(scope.row)"
              >检测</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="init"
        />
      </div>
    </el-main>
    <Dialog v-if="show" :show.sync="show" @close="close">
      <el-form ref="ruleForm" :model="form" label-width="120px">
        <el-form-item label="网站名称：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="网站地址：">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <div class="flex justify-end">
          <el-button type="danger" @click="close">取消</el-button>
          <el-button type="primary" @click="submit">{{
            type == "add" ? "提交" : "更新"
          }}</el-button>
        </div>
      </el-form>
    </Dialog>
  </el-container>
</template>

<script>
// @ is an alias to /src
import {
  getUrlList,
  checkUrl,
  getUrlInsert,
  getUrlUpdate,
  getUrlDelete,
} from "@/api/url";

export default {
  components: {},
  data() {
    return {
      title: "",
      tableData: [],
      multipleSelection: [],
      search: "",
      show: false,
      type: "add",
      form: {
        title: "",
        url: "",
        email: "",
      },
      count: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化请求数据
    init() {
      let query = {
        title: this.title,
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
      };
      getUrlList(query).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.status = -1;
          return item;
        });
        this.total = res.data.page.total;
      });
    },
    searchButton() {},
    // 检测
    handleCheck(row, count) {
      /**
       * 如果有count，就是递归检测
       *  */
      if (typeof count == "number") {
        row = this.multipleSelection[count];
      }
      row.status = 0;
      let query = {
        id: row.id,
        url: row.url,
        title: row.title,
        email: row.email,
      };
      checkUrl(query)
        .then((res) => {
          if (res.code == "200" && res.status == 1) {
            row.status = 1;
            row.delayTime = res.data.delayTime + res.data.unit;
          } else {
            row.status = -2;
          }
          if (count < this.multipleSelection.length - 1) {
            this.handleCheck(row, ++this.count);
          }
        })
        .catch((rej) => {
          row.status = -2;
        });
    },
    // 批量检测
    handleMultapie() {
      if (this.multipleSelection.length <= 0) {
        this.$message.error("请先选择需要检查的网站");
        return;
      }
      /**
       * 检测之前清楚count和需要检测的状态
       *  */
      this.multipleSelection = this.multipleSelection.map((item) => {
        item.status = -1;
        return item;
      });
      this.count = 0;
      this.handleCheck(this.multipleSelection, this.count);
    },
    close() {
      this.show = false;
      this.$refs["ruleForm"].resetFields();
      this.form = {};
    },
    // 提交
    submit() {
      let type = this.type;
      let query = {
        id: this.form.id,
        url: this.form.url,
        title: this.form.title,
        email: this.form.email,
      };
      if (type == "add") {
        getUrlInsert(query)
          .then((res) => {
            console.log(1);
            if (res.status == 1) {
              this.$message.success("新增成功");
              this.init();
            }
          })
          .catch((rej) => {});
      } else {
        getUrlUpdate(query)
          .then((res) => {
            if (res.status == 1) {
              this.$message.success("更新成功");
              this.init();
            }
          })
          .catch((rej) => {});
      }

      this.show = false;
      this.form = {};
    },
    // 批量删除
    BatchDeleteHandler() {
      if (this.multipleSelection.length == length) return;
      let that = this;
    },
    // 删除
    handleDelete(row, index) {
      let self = this;
      this.$confirm("是否删除?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 开始删除动作
        let query = {
          id: row.id,
        };
        getUrlDelete(query).then((res) => {
          if (res.status == 1) {
            this.$message.success("删除成功");
            self.tableData = self.tableData.filter((item) => item.id != row.id);
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
    // 编辑
    handleEdit(row, index) {
      this.show = true;
      this.type = "edit";
      this.form = { ...row };
    },
    // 选择表格项
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },
  },
};
</script>
<style lang="scss" scoped>
.operation {
  display: flex;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #ebeef5;
}
.searchBut {
  width: 100px;
  margin-right: 10px;
}
@media (max-width: 450px) {
  .search-wrap {
    flex-direction: column;
  }
  .seach-top {
    margin-bottom: 10px;
  }
  .search-bottom {
    justify-content: flex-start;
  }
}
</style>
