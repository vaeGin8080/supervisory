<template>
  <el-container>
    <div class="line"></div>
    <el-main>
      <!-- 		<div class="operation">
				<div style="width: 20%;">
					<el-input v-model="search" placeholder="请输入内容"></el-input>
				</div>
				<div class="searchBut">
					<el-button type="primary"
					@click="searchButton">搜索</el-button>
				</div>
				<el-button type="primary" style="float: right;">新增监控</el-button>
				<el-button type="danger" style="float: right;">批量删除</el-button>
			</div> -->
      <el-row style="border: 1px solid #EBEEF5;">
        <el-col :span="6">
          <el-input v-model="search" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="searchButton">搜索</el-button>
        </el-col>
        <el-col :span="4" :offset="12">
          <div class="flex-ali">
            <el-button type="primary">新增监控</el-button>
            <el-button type="danger" @click="BatchDeleteHandler"
              >批量删除</el-button
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
        <el-table-column label="更新时间" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="站名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { getUrlList } from "@/api/url";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      search: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getUrlList().then((res) => {
        console.log(res);
        this.tableData = res.data.result;
      });
    },
    searchButton() {},
    BatchDeleteHandler() {
      if (this.multipleSelection.length == length) return;
      let that = this;
      this.$confirm("此操作将永久删除该组数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 开始删除动作
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
  },
};
</script>
<style>
body {
  background: #ffffff;
}
.el-header {
  padding: 0 !important;
}
.el-row {
  padding: 20px;
  margin-bottom: 20px;
}
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
</style>
