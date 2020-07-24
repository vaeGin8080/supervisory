<template>
	<div class="content">
		<div class="bg"></div>
		<div class="login">
			<h3>比安缇网站在线监测</h3>
			<el-form rel="form" :model="form" :rules="rules">
				<el-form-item prop="username">
					<el-input
					    placeholder="请输入用户名"
					    prefix-icon="el-icon-user"
					    v-model="form.username">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input
					    placeholder="请输入密码"
					    prefix-icon="el-icon-unlock"
					    v-model="form.passward"
						show-password>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { getlogin } from "@/api/login.js"
	export default {
		data(){
			return{
				form:{
					username: '',
					passward: ''
				},
				rules:{
					// username: [
					// 	{ required: true, message: '请输入用户名', trigger: 'blur' },
					// 	{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					// ],
				}
			}
		},
		methods:{
			onSubmit(){
				let query = {
					userName: this.form.username,
					passWord: this.form.passward
				}
				console.log(query);
				getlogin(query).then((res) => {
					console.log(res);
					if(res.status == 1){
						this.$router.push({path: '/home'});
					}else{
						this.$message({
						        showClose: true,
						        message: '登录失败请检查账号密码',
						        type: 'error'
							});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		.login{
			width:640px;
			height:100%;
			background:rgba(255,255,255,1);
			box-shadow:1px 2px 6px 0px rgba(0,42,45,0.56);
			display: flex;
			flex-direction:column;
			padding: 80px;
			h3{
				font-size:36px;
				font-family:PingFangSC-Semibold,PingFang SC;
				font-weight:600;
				text-align: left;
				color:rgba(0,93,163,1);
				line-height:50px;
				margin-bottom:80px;
			}
			form{
				width: 350px;
			}
		}
		.bg{
			flex: 1;
			height: 100%;
			background: url(../../static/img/59f5b645dad014aa902f3b206930439.png);
		}
		.el-button{
			width: 350px !important;
			margin-top: 30px;
		}
	}
</style>
