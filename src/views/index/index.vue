<template>
	<div class="content">
		<div class="bg"></div>
		<div class="login">
			<h3>比安缇网站在线监测</h3>
			<el-form rel="form" :model="form">
				<el-form-item>
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
					    v-model="form.passward">
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
	export default {
		data(){
			return{
				form:{
					username: '',
					passward: ''
				}
			}
		},
		methods:{
			onSubmit(){
				
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
