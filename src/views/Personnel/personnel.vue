<template>
  <el-container class="wrap">
    <div class="line"></div>
    <el-main>
      <el-row style="border: 1px solid #EBEEF5;" class="flex justify-between">
        <el-col :span="6">
          <el-input
            v-model="search"
            placeholder="请输入内容"
            @keydown.enter.native="init"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="init">搜索</el-button>
        </el-col>
        <el-col>
          <div class="flex justify-end">
            <el-button
              type="primary"
              @click="
                show = true;
                type = 'add';
				input = false;
				form = { };
              "
              >新增用户</el-button
            >
            <!-- <el-button type="danger" @click="BatchBatchTestingHandler"
              >批量删除</el-button
            > -->
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

        <el-table-column prop="userName" label="用户名"> </el-table-column>
        <el-table-column label="操作" width="150">
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
    <Dialog v-if="show" :show.sync="show">
      <el-form ref="ruleForm" :model="form" label-width="120px">
        <el-form-item label="用户名：">
          <el-input v-model="form.userName" :disabled="input"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.passWord"></el-input>
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
import {
  getUserList,
  getUserUpdate,
  getUserDelete,
  getUserInsert,
} from "@/api/user.js";
import md5 from "js-md5";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      search: "",
      show: false,
      type: "add",
      form: {
        userName: "",
		passWord: "",
      },
      count: 0,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
	  input: '',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let query = {
        title: this.search,
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
      };
      getUserList(query).then((res) => {
		  console.log(res);
        this.tableData = res.data.data.map((item) => {
          item.status = -1;
          return item;
        });
        this.total = res.data.page.total;
      });
    },
    searchButton() {},
    handleCheck(row, count) {},
    submit() {
      let type = this.type;
      let query = {
		id: this.form.id,
        userName: this.form.userName,
		passWord: md5(this.form.passWord),
      };
	  console.log(query);
      if (type == "add") {
        getUserInsert(query)
          .then((res) => {
            if (res.status == 1) {
              this.init();
              this.$message({
                message: "添加成功",
                type: "success",
              });
            } else {
              this.$message.error("添加失败");
            }
          })
          .catch((rej) => {});
      } else {
        getUserUpdate(query)
          .then((res) => {
			console.log(res);
            if (res.status == 1) {
              this.init();
              this.$message({
                message: "修改成功",
                type: "success",
              });
            }
          })
          .catch((rej) => {});
      }
      this.show = false;
      this.form = {};
    },

    //批量检测
    // BatchBatchTestingHandler() {
      // if (this.multipleSelection.length <= 0) {
      //   this.$message.error("请选择你要检测的接口");
      //   return;
      // }

      // this.multipleSelection = this.multipleSelection.map((item) => {
      //   item.status = -1;
      //   return item;
      // });
      // this.count = 0;
    //   // this.handleCheck(this.multipleSelection, this.count);
    // },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    // 编辑
    handleEdit(index, row) {
      console.log("编辑");
      console.log(index);
      this.type = "edit";
      let data = index;
      this.show = true;
      this.form = { ...index };
	  this.input = true;
    },

    // 删除
    handleDelete(index, row) {
      console.log(index.id);
      let id = index.id;
      this.$confirm("是否删除?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        getUserDelete(id).then((res) => {
          if (res.status == 1) {
            this.init();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error("删除失败");
          }
        });
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    close() {
      this.show = false;
      this.$refs["ruleForm"].resetFields();
      this.form = {};
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
.el-select {
  width: 100%;
}
</style>
