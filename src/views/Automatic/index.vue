<template>
	<ul class="list">
		<li v-for="item in multipleSelection" class="item">
			<p>{{item.title}}</p>
			<p>{{item.url}}</p>
			<i v-if="item.status == 1" class="el-icon-success success"></i>
			<i v-if="item.status == 0" class="el-icon-loading loading"></i>
			<i v-if="item.status == -2" class="el-icon-error error"></i>
		</li>
	</ul>
</template>

<script>
	import {
	  getUrlList,
	  checkUrl,
	} from "@/api/url";
	export default{
		data(){
			return{
				timer: 0,
				list:[],
				multipleSelection:[],
				count: 0,
			}
		},
		mounted() {
			this.init();
			if(this.timer){      
				clearInterval(this.timer)    
			}else{      
				this.timer = setInterval(()=>{
				 // 调用相应的接口，渲染数据        
					this.init();
				},30000)//三分钟刷新一次
			}  
		},
		methods:{
			init(){
				this.multipleSelection = [];
				let that = this;
				getUrlList().then((res) => {
					console.log(res);
					res.data.data.map((item) => {
						item.status = -1;
						that.list.push(item);
					});
					this.count = 0;
					this.testing(this.count);
				});
			},
			testing(count){
				console.log(count);
				let item;
				if (typeof count == "number") {
					item = this.list[count];
					this.multipleSelection.push(this.list[count]);
					console.log(this.list.length)
				}
				item.status = 0;
				console.log(item);
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
					if (count < this.list.length - 1) {
					  this.testing(++this.count);
					}
				  })
				  .catch((rej) => {
				    item.status = -2;
				  });
			}
		},
		destroyed(){    
		    clearInterval(this.timer)  
		},
	}
</script>

<style>
	html{
		background: #FFFFFF;
	}
	.list{
		width: 90%;
		height: 100%;
		margin: 0 auto;
		/* display: flex;
		list-style-type: none;
		justify-content: space-between;
		flex-wrap: wrap; */
	}
	.item{
		float: left;
		width: 300px;
		height: 300px;
		margin: 15px;
		background: #FFFFFF;
		border-radius: 20px;
		border: 1px solid #13CE66;
		padding: 50px;
	}
	.item .success{
		margin: 0 auto;
		font-size: 100px;
		color: #67C23A;
	}
	.item .error{
		margin: 0 auto;
		font-size: 100px;
		color: #F56C6C;
	}
	.item .loading{
		margin: 0 auto;
		font-size: 100px;
		color: #909399;
	}
	.item p{
		width: 100%;
		font-size: 16px;
		font-family: PingFangSC, PingFangSC-Semibold;
		font-weight: 600;
		text-align: center;
		color: #333333;
		line-height: 30px;
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
	}
</style>
