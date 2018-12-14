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
							<span>(Produce)</span>
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
			    <el-menu :default-active="indexMenu" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
			    	@open="handleOpen" 
			    	@close="handleClose">
			    	<template v-for="(item,index) in menuData">
					    <router-link :to="{path: '/tscg_system/'+item.path}">	
					      <el-menu-item :index="item.path">			      	
						        <i class="el-icon-menu"></i>
						        <span slot="title">{{ item.name }}</span>			        
					      </el-menu-item>
					    </router-link> 
				    </template>
			    </el-menu>
			  </el-col>
			</el-row>
		</div>
		<div class="admin-right-nav">
			<router-view></router-view>
		</div>
		<div class="admin-foot">
			Copyright © 2018 the Stores Consulting Group
		</div>
	</div>
</template>

<script>
  export default {
  	data (){
  		return {
  			menuData: [],
  			indexMenu:'',
  			//leftBoxHeight: window.innerHeight-213,
  			username: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").userName : 'null',
  			storeName: this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").storeNumber : 'null'
  		}
  	},
    methods: {
     initMenu(){
     	let arr = this.$router.options.routes[1].children
     	for(let i in arr) {
     		delete arr[i].component
            let root = arr[i]
			
            let children = []
            if(root.children){
            	for(let j in root.children) {
            		delete root.children[j].component
	                let item = root.children[j]
	 
	                children.push(item)
	            }
            	root.children = children
            }
            
            this.menuData.push(root)           
       }
     },
     returnBack(){
      	window.location.reload()
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
    	let nowIndex = window.location.pathname
    	//console.log(nowIndex.substring(13))
  		this.indexMenu = nowIndex.substring(13)
  		
  		this.initMenu()

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

<style scope>
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
	
/*左侧导航样式	*/

.admin-system .admin-left-nav{
	width: 236px; height: 100%; background-color: #545C64; position: fixed; top: 70px; z-index: 99; overflow-y: auto;
}
.admin-system .admin-left-nav .el-col-12{
	width: 100%;
}
.admin-system .admin-left-nav .el-menu{
	border-right: none; margin-bottom: 30px;
}
.admin-system .admin-left-nav .el-menu li{
	text-align: left;
}
.admin-system .admin-left-nav .el-menu-item.is-active{
	background-color: #434A50!important;
}
/*左侧导航样式end	*/

/*右侧导航样式	*/
.admin-system .admin-right-nav{
	padding: 15px 20px 60px; position: fixed; bottom: 0; overflow: auto; top: 70px; left: 236px; right: 0;
}
/*右侧导航样式end	*/

.admin-system .admin-foot{
	background-color: #F2F2F2; height: 54px; line-height: 54px; text-align: center; position: fixed; bottom: 0px; width: 100%; border-top: 1px solid #E4E4E4;
}

</style>