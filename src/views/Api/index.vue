<template>
  <el-container class="wrap">
    <div class="line"></div>
    <el-main>
      <el-row style="border: 1px solid #EBEEF5;">
        <el-col :span="6">
          <el-input v-model="search" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="searchButton">搜索</el-button>
        </el-col>
        <el-col :span="4" :offset="12">
          <div class="flex-ali">
            <el-button type="primary" @click="show = true; type = 'add' ">新增监控</el-button>
            <el-button type="success" @click="BatchBatchTestingHandler"
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

        <el-table-column prop="title" label="名称"> </el-table-column>
        <el-table-column prop="url" label="接口地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="methods" label="请求方式" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="params" label="参数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
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
    </el-main>
    <Dialog v-if="show" :show.sync="show">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="名称：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="接口地址：">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="请求方式: ">
          <el-select v-model="form.methods" placeholder="请求方式">
            <el-option label="post" value="post"></el-option>
            <el-option label="get" value="get"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="headers：">
          <el-input v-model="form.headers"></el-input>
        </el-form-item>
        <el-form-item label="参数：">
          <el-input v-model="form.params"></el-input>
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
import {
  getapiList,
  checkApi,
  getapiInsert,
  getapiRemove,
  getapiUpdate,
} from "@/api/api.js";
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
        title: "",
        url: "",
        params: "",
        methods: "",
        headers: "",
        email: "",
        id: "",
      },
	  count: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getapiList().then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.status = -1;
          return item;
        });
      });
    },
    searchButton() {},
    handleCheck(row ,count) {
		
		if(typeof count == "number"){
			row = this.multipleSelection[count];
		}
		row.status = 0;
		let query = {
			id: row.id,
			url: row.url,
			title: row.title,
			email: row.email,
			params: row.params
		};
		checkApi(query)
			.then((res) => {
			console.log(res);
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
    submit() {
		let type = this.type;
		let query = {
			url: this.form.url,
			title: this.form.title,
			params: this.form.params,
			methods: this.form.methods,
			headers: this.form.headers,
			email: this.form.email,
			id: this.form.id,
		};
      if (type == "add") {
        getapiInsert(query)
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
        getapiUpdate(query).then((res) => {
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
    BatchBatchTestingHandler() {
		if(this.multipleSelection.length <= 0){
			this.$message.error("请选择你要检测的接口");
			return;
		}
		
		this.multipleSelection = this.multipleSelection.map((item) => {
			item.status = -1;
			return item;
		});
		this.count = 0;
		this.handleCheck(this.multipleSelection, this.count);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    // 编辑
    handleEdit(index, row) {
      console.log("编辑");
      console.log(index);
	  this.type = "edit"
      let data = index;
      this.show = true;
      this.form = { ...index };
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
			getapiRemove(id).then((res) => {
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
	close(){
		this.show = false;
		this.$refs["ruleForm"].resetFields();
		this.form = {};
	}
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
