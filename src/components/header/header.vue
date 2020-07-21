<template>
	<el-menu :default-active="activeIndex"
	class="el-menu-demo"
	mode="horizontal"
	@select="handleSelect"
	background-color="#409EFF"
	text-color="#FFFFFF">
		<el-menu-item index="1">首页</el-menu-item>
		<el-menu-item index="3">监控中心</el-menu-item>
		<el-menu-item index="4">动态趋势</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		data(){
			return{
				activeIndex: '1',
				activeIndex2: '1'
			}
		},
		methods:{
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	};
</script>

<style>
	.el-header{
		padding: 0 !important;
	}
</style>
