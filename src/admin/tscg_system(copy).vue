<template>
	<div class="admin-system">
		<div class="admin-header">
			<div class="header">
				<div class="float-left logo-admin">					
					<span class="red-font">tSCG</span> Production Planning Management System
				</div>
				<div class="header-right-list float-right">
					<ul>
						<li>
							<i class="el-icon-third-31shoucangdedianpu1" style="font-size: 30px;"></i>
							<span>{{ storeName }}</span>
							<span>(Bakeries)</span>
						</li>
						<li>
							<!--<i class="el-icon-third-yonghu1" style="font-size: 25px;"></i>
							<span>{{ username }}</span>-->
							<el-dropdown trigger="hover">
						      <span class="el-dropdown-link">
						      	<i class="el-icon-third-yonghu1" style="font-size: 25px;"></i>
						        {{ username }}
						        <i class="el-icon-arrow-down el-icon--right"></i>
						      </span>
						      <el-dropdown-menu slot="dropdown">
						        <el-dropdown-item>Change Password</el-dropdown-item>
						        <el-dropdown-item>
						        	<div @click="logout">Log Out</div>
						        </el-dropdown-item>
						      </el-dropdown-menu>
						    </el-dropdown>
						</li>
						<!--<li>
							<a href="javascript:void(0)">
								<span @click="logout">Log Out</span>
							</a>
						</li>-->
					</ul>
				</div>
			</div>
		</div>
		<div class="admin-left-nav float-left">			
			<el-row class="tac">			  
			  <el-col :span="12">
<!-----------------------------------------------------------store user------------------------------------------------------->			  	
			    <el-menu :default-active="indexMenu" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
			    	@open="handleOpen" 
			    	@close="handleClose">
			    <router-link :to="{path: '/tscg_system/balanceOnHand'}">	
			      <el-menu-item index="balanceOnHand">			      	
				        <i class="el-icon-menu" title="Balance on Hand"></i>
				        <span slot="title">Balance on Hand</span>			        
			      </el-menu-item>
			    </router-link> 
			    <!--<router-link :to="{path: '/tscg_system/dailyProductionAmount'}">	
			      <el-menu-item index="dailyProductionAmount">			      	
				        <i class="el-icon-menu"></i>
				        <span slot="title">Daily Production Amount</span>			        
			      </el-menu-item>
			    </router-link>-->
			    <router-link :to="{path: '/tscg_system/productForecast'}">	
			      <el-menu-item index="productForecast">			      	
				        <i class="el-icon-menu" title="Product Forecast"></i>
				        <span slot="title">Product Forecast</span>			        
			      </el-menu-item>
			    </router-link>
			    <router-link :to="{path: '/tscg_system/salesData'}">	
			      <el-menu-item index="salesData">			      	
				        <i class="el-icon-menu" title="Sales Data"></i>
				        <span slot="title">Sales Data</span>			        
			      </el-menu-item>
			    </router-link> 
<!-----------------------------------------------------------administrator------------------------------------------------------->
			    <router-link :to="{path: '/tscg_system/storeManagement'}">	
			      <el-menu-item index="storeManagement">			      	
				        <i class="el-icon-menu" title="Store Managementa"></i>
				        <span slot="title">Store Management</span>			        
			      </el-menu-item>
			    </router-link>
			    <router-link :to="{path: '/tscg_system/productStandard'}">	
			      <el-menu-item index="productStandard">			      	
				        <i class="el-icon-menu" title="Product Standard"></i>
				        <span slot="title">Product Standard</span>			        
			      </el-menu-item>
			    </router-link> 
			    <router-link :to="{path: '/tscg_system/productManagement'}">	
			      <el-menu-item index="productManagement">			      	
				        <i class="el-icon-menu" title="Product Management"></i>
				        <span slot="title">Product Management</span>			        
			      </el-menu-item>
			    </router-link> 
			    <router-link :to="{path: '/tscg_system/salesDataManagement'}">	
			      <el-menu-item index="salesDataManagement">			      	
				        <i class="el-icon-menu" title="Sales Data Management"></i>
				        <span slot="title">Sales Data Management</span>			        
			      </el-menu-item>
			    </router-link> 
			    </el-menu>
			  </el-col>
			</el-row>
			<div class="take-up-box pointer" @click="takeUp">
				<i v-show="takeIconLeft" class="el-icon-caret-left"></i>
				<i v-show="takeIconRight" class="el-icon-caret-right"></i>
			</div>
		</div>		
		<div class="admin-right-nav" :width=rightBoxWidth>
			<router-view></router-view>
		</div>
		<!--<div class="admin-foot">
			Copyright © 2018 the Stores Consulting Group
		</div>-->
	</div>
</template>

<script>
  export default {
  	data (){
  		return {
  			indexMenu:'',
  			takeIconLeft: true,
  			takeIconRight: false,
  			//leftBoxHeight: window.innerHeight-213,
  			rightBoxWidth: window.innerWidth-295,
  			username: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").userName : 'null',
  			storeName: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").storeNumber : 'null'
  		}
  	},
    methods: {
     returnBack(){
      	window.location.reload()
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      takeUp(){
      	if($(".admin-left-nav").css("width") == "236px"){
      		$(".admin-left-nav").css('width','10px')
      		$(".admin-right-nav").css('width','100%')
      		$(".admin-right-nav").css('left','0')
      		this.takeIconLeft = false
      		this.takeIconRight = true
      	}else{
      		$(".admin-left-nav").css('width','236px')
      		$('.admin-right-nav').css('width',window.innerWidth-295+60)
      		$(".admin-right-nav").css('left','236px')
      		this.takeIconLeft = true
      		this.takeIconRight = false
      	}     	
      },
      logout(){
      	let _this = this
      	
      	this.$confirm('Are you sure you want to log out?', 'Log Out', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          
          	_this.common.LStorage.removeItem("token")
          	_this.common.LStorage.removeItem("userInfo")
	      	_this.$message({
	          message: 'You have been successfully logged out!',
	          type: 'success'
	        })
			setTimeout(function(){
	       		_this.$router.push('/')
				window.location.reload()
	        },700)
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Log out request has been cancelled!'
          });          
        });      			
      },
    },
    created (){
    	
    },
    mounted(){    	
    	
    	//设置右侧显示区域宽度自适应
    		//$('.admin-right-nav').css('width',window.innerWidth-295)
    	//$('.admin-left-nav').css('height',window.innerHeight-70)
    	//console.log('右侧显示区宽度'+window.innerWidth-295) 
    	
    	let nowIndex = window.location.pathname
    	//console.log(nowIndex.substring(13))
  		this.indexMenu = nowIndex.substring(13)
  		
  		if(nowIndex.indexOf('tscg_system') > -1){
  			$('.cms-admin').css('background-color','#fff!important')
  		}
  		
  		//二级菜单页面刷新导航能正确显示
  		/*if(nowIndex.indexOf('userShenpiList') > -1 || nowIndex.indexOf('userShenpiInfo') > -1){
  			this.indexMenu = 'userShenpiList'
  		}else if(nowIndex.indexOf('platformCompanyManage') > -1 || nowIndex.indexOf('platformCompanyInfo') > -1){
  			this.indexMenu = 'platformCompanyManage'
  		}else if(nowIndex.indexOf('roleAuthorityMmanage') > -1 || nowIndex.indexOf('roleAuthorityMmanageUpdate') > -1){
  			this.indexMenu = 'roleAuthorityMmanage'
  		}*/
    }
  }	
</script>

<style scoped>
html,body{
	height: 100%;
}	
</style>

<style>
/*.cms-admin{
	background-color: #fff!important;
}*/	
.admin-system{
	height: 100%;
}	
.admin-system .prompt-info{	/*提示字体颜色*/
	color: #999;
}
.admin-system .el-pagination{  /*分页样式显示*/
	margin: 20px 0;
}
.admin-system .el-dropdown{  /*右侧导航菜单*/
	color: #fff; cursor: pointer;
}
.admin-system .el-table .cell i:hover{
	color: deepskyblue; cursor: pointer; font-size: 18px;
}
.admin-system .el-table .cell i{
	cursor: pointer; font-size: 18px;
}
.admin-system .content-nav{
	border-bottom: 1px dashed #C9C9C9; padding-bottom: 5px; color: #909399; text-align: left; overflow: hidden;
}
.admin-system .content-nav ul li{
	float: left; margin-right: 5px;
}
/*右侧导航样式	*/
.admin-system .admin-right-nav{
	padding: 15px 20px 60px; position: fixed; bottom: 0; overflow: auto; top: 70px; left: 236px; right: 0; box-sizing: border-box;
}
/*右侧导航样式end	*/
	
/*左侧导航样式	*/

.admin-system .admin-left-nav{
	width: 236px; height: 100%; background-color: #545C64; position: fixed; top: 70px; z-index: 99; overflow-y: auto;
}
.admin-system .admin-left-nav .el-col-12{
	width: 100%;
}
.admin-system .admin-left-nav .el-menu{
	border-right: none; margin-bottom: 86px;
}
.admin-system .admin-left-nav .el-menu li{
	text-align: left; padding: 0 10px!important;
}
.admin-system .admin-left-nav .el-menu-item.is-active{
	background-color: #434A50!important;
}
.take-up-box{
	background-color: #D7D7D7; height: 100%; width: 10px; position: absolute; top: 0px; right: 0px;
}
.take-up-box:hover{
	background-color: #C4C4C4;
}
.take-up-box i{
	position: relative; left: -4px; top: 40%;
}
/*左侧导航样式end	*/
	
/*头部样式	*/
.admin-system .header{
	height: 70px; border-bottom: 1px solid #B1B4B5; line-height: 70px;
}
.admin-system .header .logo-admin{
	height: 100%; color: #FFFFFF; padding-left: 30px;
}
.admin-system .header-right-list{
	height: 70px;
}
.admin-system .header-right-list ul{
	height: 70px; line-height: 70px; 
}
.admin-system .header-right-list ul li{
	float: left; margin-right: 15px; padding-right: 15px; color: #fff;
}
.admin-system .header-right-list ul li i{
	position: relative; top: 3px;
}
.admin-system .header-right-list ul li:after{
	content: '|'; position: relative; left: 14px; font-size: 23px;
}
.admin-system .header-right-list ul li:last-child:after{
	content: '';
}
.admin-system .header-right-list ul li a{
	color: #fff;
}
.admin-system .header-right-list ul li a:hover{
	color: dodgerblue;
}
.admin-system .header-right-list ul li:last-child{
	border-right: none;
}
.admin-system .admin-header{
	position: fixed;
    width: 100%;
    z-index: 99;
}
.admin-system .admin-header .header{
	background-color: #333333;
}
/*头部样式end	*/

.admin-system .admin-foot{
	background-color: #F2F2F2; height: 54px; line-height: 54px; text-align: center; position: fixed; bottom: 0px; width: 100%; border-top: 1px solid #E4E4E4;
}

/*全局样式*/
*{padding:0;margin:0;}
div,dl,dt,dd,form,h1,h2,h3,h4,h5,h6,img,ol,ul,li,table,th,td,p,span,a{border:0px solid red;}
img,input{border:none; vertical-align:middle; outline:medium;}
body{font-family:微软雅黑; font-size:16px; text-align:center; background:#fff;}
html{overflow-y:auto;}
ul li{list-style-type:none;}
a{text-decoration:none; color:#333;}
a:hover{text-decoration:none; color: #1BB1FE;}
textarea{resize:none;}

.layui-form-item input::-webkit-input-placeholder,.layui-form-item textarea::-webkit-input-placeholder{ /*WebKit browsers*/
	color: #c2bfbf;	
}
.layui-form-item input::-moz-input-placeholder,.layui-form-item textarea::-moz-input-placeholder{ /*Mozilla Firefox*/
	color: #c2bfbf;	
}
.layui-form-item input::-ms-input-placeholder,.layui-form-item textarea::-ms-input-placeholder{ /*Internet Explorer*/ 
	color: #c2bfbf;	
}
input::-webkit-input-placeholder,.layui-form-item textarea::-webkit-input-placeholder{ /*WebKit browsers*/
	color: #c2bfbf;	
}
input::-moz-input-placeholder,.layui-form-item textarea::-moz-input-placeholder{ /*Mozilla Firefox*/
	color: #c2bfbf;	
}
input::-ms-input-placeholder,.layui-form-item textarea::-ms-input-placeholder{ /*Internet Explorer*/ 
	color: #c2bfbf;	
}

.float-left{float:left;}
.float-right{float:right;}
.clear:after{content: ' '; clear: both; display: block;}
.pointer{cursor: pointer;}
.red-font{color: #E02B20;}
.blue-font{color: #00BFFF;}
.gray-font{color: #333333;}
.yellow-font{color: #E6A23C;}

.font-22{font-size: 22px;}
.font-20{font-size: 20px;}
.font-18{font-size: 18px;}
.font-16{font-size: 16px;}
.font-13{font-size: 13px;}
.font-12{font-size: 12px;}
.font-10{font-size: 10px;}
.font-weight{font-weight: bold;}

.line-1{
	overflow:hidden; 
	text-overflow:ellipsis;	
	display:-webkit-box; 	
	/* autoprefixer: off */  
  -webkit-box-orient: vertical;  
  /* autoprefixer: on */
 -webkit-line-clamp:1;	
}
.line-2{
	overflow:hidden; 
	text-overflow:ellipsis;	
	display:-webkit-box; 	
	/* autoprefixer: off */  
  -webkit-box-orient: vertical;  
  /* autoprefixer: on */	
	-webkit-line-clamp:2; 
}
.line-3{
	overflow:hidden; 
	text-overflow:ellipsis;	
	display:-webkit-box; 	
	/* autoprefixer: off */  
  -webkit-box-orient: vertical;  
  /* autoprefixer: on */	
	-webkit-line-clamp:3; 
}

.anchorBL,.BMap_noprint{display:none;} 

/*所有页面表头表单通用样式*/
.table-head ul{
	margin: 10px 0;
}
.table-head ul li{
	float: left; margin-right: 10px;
}
.search-but{
	margin-bottom: 10px;
}

.tb-edit .el-input {
    display: none
}
.tb-edit .current-row .el-input {
    display: block
}
.tb-edit .current-row .el-input+span {
    display: none
}

</style>