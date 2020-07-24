<template>
  <div class="content">
    <div class="bg"></div>
    <div class="login">
      <h3>比安缇网站在线监测</h3>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="userName">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-model="form.userName"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-unlock"
            v-model="form.passWord"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="background: #005DA3"
            type="primary"
            @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { getLogin } from "@/api/user";
export default {
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名至少输入3位",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            message: "长度在最小为6位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let query = {
            userName: this.form.userName,
            passWord: md5(this.form.passWord),
          };
          getLogin(query).then((res) => {
            console.log(res);
            if (res.status == 1) {
              this.$store.dispatch("user/getUserInfo", res.data).then((r) => {
                this.$router.push({
                  path: "/monitor",
                });
                this.$message.success(res.message);
              });
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  .login {
    display: flex;
    flex-direction: column;
    z-index: 6;
    padding: 150px 80px 0;
    background: rgba(255, 255, 255, 1);
    h3 {
      font-size: 36px;
      font-weight: 600;
      text-align: left;
      color: #005da3;
      line-height: 50px;
      margin-bottom: 50px;
    }
    h5 {
      font-size: 32px;
      font-weight: 600;
      text-align: left;
      color: #005da3;
      line-height: 50px;
      margin-bottom: 50px;
    }
    form {
      width: 350px;
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    background: url("../../assets/image/bg.png") no-repeat;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
  }
  .el-button {
    width: 350px !important;
    margin-top: 30px;
  }
}
@media (max-width: 475px) {
  .login {
    width: 100%;
    padding: 100px 10px !important;
  }
}
</style>
