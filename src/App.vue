<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

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

.el-table .cell{
	word-break: normal!important; 
	overflow:hidden; 
	text-align: center;
}
.el-popover__title{
	background-color: #E4E4E4;
    padding: 5px;
}

/*所有页面表头表单通用样式*/
.table-head > ul{
	margin: 10px 0;
}
.table-head ul li{
	float: left; margin-right: 10px;
}
.search-but button{
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

.balanceOnHand .el-table th>.cell{
	white-space: pre-wrap;
}
.balanceOnHand .el-table thead th{
	    padding: 5px 0;
}
.el-table .cell{
	word-break: normal; 
	overflow:hidden; 
	text-align: center;
}
.el-popover__title{
	background-color: #E4E4E4;
  padding: 5px;
}
/*页面导航、搜索等通用样式*/
.nav-list{
	border-bottom: 1px solid #E4E4E4; text-align: left; padding-bottom: 3px;
}
.nav-list span:first-child{
	margin-right: 5px;
}
.nav-list span:last-child{
	margin-left: 5px;
}	
.nav-head, .nav-head-one{
	border-bottom: 1px solid #E4E4E4; margin-top: 10px; padding-left: 10px;
}
/*单菜单样式*/
.nav-head-one ul li{
	float: left; 
	padding: 10px 15px; 
	border-top: 5px solid #E02B20; 
	border-left: 1px solid #BCBCBC; 
	border-right: 1px solid #BCBCBC; 
	border-bottom: 1px solid #fff;
    position: relative;
    top: 1px;
	cursor: pointer;
}
/*多菜单样式*/
.nav-head ul li{
	float: left; 
	padding: 10px 15px; 
	margin-right: 10px;
	border-top: 1px solid #BCBCBC; 
	border-left: 1px solid #BCBCBC; 
	border-right: 1px solid #BCBCBC; 
  position: relative;
  top: 5px;
	cursor: pointer;
}
.nav-head ul li.active{
	border-top: 5px solid #E02B20; 
	border-bottom: 1px solid #fff;
	color: #E02B20;
	font-weight: bold;
    position: relative;
    top: 1px;
}
.search-but{
	text-align: right; /*padding-right: 15%;*/
}
.demo-input-suffix{
	/*line-height: 40px;*/
}
.demo-input-suffix > span{	
	display: inline-block; width: 100px; text-align: right; padding-right: 10px; float: left;
}
.demo-input-suffix > span.oneline{
	height: 40px; line-height: 40px;
}
.table-head ul li{
	margin-bottom: 10px;
}
.table-body{
	max-width: 1600px;
}

.table-top-set{
	background-color: #F5F7FA; padding: 5px;
}
.table-column-set{
	width: 180px; background-color: #fff; border: 1px solid #C9C9C9; cursor: pointer;
}
.check-column li{
	border-bottom: 1px solid #D7D7D7;
}
.day-of-week{
	display: inline-block; margin: 10px 0 10px 20px;
}
.day-of-week li{
	border: 1px solid #BCBCBC; padding: 2px 10px;
}
.day-of-week li:hover{
	background-color: #E02B20; color: #fff; border: 1px solid #E02B20;
}
.day-of-week li.active{
	background-color: #E02B20; color: #fff; border: 1px solid #E02B20;
}
/*页面导航、搜索等通用样式end*/
</style>
