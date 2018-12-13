<template>
	<div class="salesData">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font">Sales Data Management</span>
		</div>
		<div>
			<div class="nav-head">
				<ul class="clear">
					<li :class="{active:index==nowIndex}" v-for="(item,index) in navHeadList" @click="selected(index)">{{ item.name }}</li>
				</ul>
			</div>
		</div>
		<div class="body-box">
<!--页面一-----------------------Sales Data Management------------------------------------>		
			<div class="tabPage" v-if="showTab1">
				<div class="table-head clear">
					<ul class="clear">
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Store Name:</span>
							    <el-select v-model="storeName" placeholder="Please choose" @change="" style="width: 200px;">
								    <el-option
								      v-for="item in storeNameList"
								      :key="item.id"
								      :label="item.value"
								      :value="item.id">
								    </el-option>
								</el-select>
							</div>
						</li>
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Department:</span>
							    <el-select v-model="department" placeholder="Please choose" @change="" style="width: 200px;">
								    <el-option
								      v-for="item in departmentList"
								      :key="item.id"
								      :label="item.value"
								      :value="item.id">
								    </el-option>
								</el-select>
							</div>
						</li>
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Commodity:</span>
							    <el-select v-model="commodity2" placeholder="Please choose" @change="changeCommodity2" style="width: 200px;">
								    <el-option
								      v-for="item in commodityList2"
								      :key="item.id"
								      :label="item.value"
								      :value="item.id">
								    </el-option>
								</el-select>
							</div>
						</li>
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Item:</span><!--搜索下拉框-->
							  	<el-autocomplete
							  	  style="width: 200px;"
								  v-model="itemData2"
								  :fetch-suggestions="querySearchAsync2"
								  placeholder="Please input contents"
								  @select="handleSelect2"
								  @blur="handleBlur2"
								></el-autocomplete>
							</div>
						</li>	
						<!--<li>	
							<div class="demo-input-suffix">
								<span class="oneline">UPC/PLU:</span>
							    <el-input v-model="companyText2" placeholder="Please input contents" style="width: 200px;"></el-input>
							</div>
						</li>-->
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Start Date:</span>
							    <el-date-picker
							      v-model="startDate"
							      type="date"
							      value-format="yyyy-MM-dd"
							      style="width: 200px;"
							      @change="getStartDate"
							      placeholder="Start Date">
							    </el-date-picker>
							</div>
						</li>
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">End Date:</span>
							    <el-date-picker
							      v-model="endDate"
							      type="date"
							      value-format="yyyy-MM-dd"
							      style="width: 200px;"
							      @change="getEndDate"
							      placeholder="End Date">
							    </el-date-picker>
							</div>
						</li>
					</ul> 
					<div class="search-but">
						<span class="float-left" style="margin: 13px 0 0 28px;">Day of Week:</span>
						<ul class="float-left day-of-week">
							<li class="pointer" :class="{active:index == curIndex}" v-for="(item,index) in dayOfWeek" @click="seleWeekOfDay(index)">{{ item }}</li>
						</ul>
						<el-button type="danger" @click="search2">Search</el-button>
						<el-button type="danger" @click="reset2">Reset</el-button>
					</div>	
				</div>
				<div class="table-body">
					<div class="table-top-set">				
						<el-popover
						    placement="bottom"
						    title="Column"
						    width="220"
						    trigger="click">
						    <div class="porpover">
						    	<ul class="check-column">
						    		<li><el-checkbox v-model="showDate2">Date</el-checkbox></li>
						    		<li><el-checkbox v-model="shoWeekday2">Day of Week</el-checkbox></li>
						    		<li><el-checkbox v-model="showCommodity2">Commodity</el-checkbox></li>
						    		<li><el-checkbox v-model="showUPC2">UPC/PLU</el-checkbox></li>				    		
						    		<li><el-checkbox v-model="showItem2">Item</el-checkbox></li>
						    	</ul>
						    </div>
						    <div class="table-column-set gray-font" slot="reference">
								<i class="el-icon-setting" style="color: #C9C9C9;"></i>
								Customized View
							</div>
						  </el-popover>
					</div>			
					<template>				
					  <el-table ref="multipleTable" key='secondTable' v-loading="loading2" :data="tableData2" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">			    
					    <el-table-column prop="storeNumber" label="Store Number" min-width="100">
					    </el-table-column>
					    <el-table-column prop="storeName" label="Store Name" min-width="120">
					    </el-table-column>
					    <el-table-column prop="departmentName" label="Department" min-width="120">
					    </el-table-column>
					    <el-table-column prop="planDate" v-if="showDate2" label="Date" min-width="120" :formatter="getPlanDate">
					    </el-table-column>
					    <el-table-column prop="weekday" v-if="shoWeekday2" label="Day of Week" :formatter="getDayOfWeek" min-width="120">
					    </el-table-column>
					    <el-table-column prop="categoryName" v-if="showCommodity2" label="Commodity" min-width="150">
					    </el-table-column>
					    <el-table-column prop="productCode" v-if="showUPC2" label="UPC/PLU" min-width="200">
					    </el-table-column>
					    <el-table-column prop="productName" v-if="showItem2" label="Item" min-width="200">
					    	<template slot-scope="scope">
					        	<div class="line-1" style="width: 100%; height: 25px; -webkit-box-orient: vertical;" :title="scope.row.productName">{{ scope.row.productName }}</div>
						    </template>
					    </el-table-column>
					    <el-table-column prop="priceType" label="Price Type" min-width="150">
					    </el-table-column>
					    <el-table-column prop="sold" label="$ Sold" min-width="150">
					    </el-table-column>
					    <el-table-column prop="unitsSold" label="Units Sold" min-width="150">
					    </el-table-column>			   
					  </el-table>
					    <el-pagination
					      @size-change="handleSizeChange2"
					      @current-change="handleCurrentChange2"
					      :current-page.sync="nowPage2"
					      :page-size="pageSize2"
					      layout="prev, pager, next, jumper"
					      :total="totalCount2">
					    </el-pagination>
					</template>				
				</div>
			</div>			
<!--页面二------------------------Import Data----------------------------------->				
			<div class="tabPage" v-if="showTab2">
				<div class="table-head clear">
					<ul class="clear">
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Upload Files:</span>
								<el-input v-model="fileName" placeholder="Can only upload ' xlsx / xls ' format files!" readonly style="width: 300px;"></el-input>
								<el-button type="info"  @click="browse" style="margin-left: 10px;">Browse</el-button>
							    <input type="file" class="file-input pointer" name="file" id="file" @change="upload"/>
							</div>
						</li>	
						<li>
							<div class="download pointer" @click="downloadTemplate" title="Click downloads">【Download template】</div>
						</li>
					</ul> 
					<div class="upload-but">
						<span></span>
						<el-button type="danger" :loading="uploadLoading" :disabled="isFiled" @click="uploadFileObj">Upload</el-button>
					</div>	
				</div>
				<div class="table-body">	
					<template>				
					  <el-table ref="multipleTable" key='firstTable' v-loading="loading" :data="tableData" tooltip-effect="dark" border :header-cell-style="tableHeaderColor">			    
					    <el-table-column prop="name" label="Upload File Name" min-width="100">
					    </el-table-column>
					    <el-table-column prop="state" label="Upload Status" min-width="110">
					    	<template scope="scope">
					              <span v-if="scope.row.state == 1" style="color:#3399FF">Success</span>
					              <span v-if="scope.row.state != 1" style="color:#FF002F">fail</span>
					        </template>
					    </el-table-column>
					    <el-table-column prop="uploadTime" label="Upload Time" min-width="200" :formatter="formatDate">
					    </el-table-column>					    				    
					    <el-table-column prop="userName" label="Operator" min-width="150">
					    </el-table-column>					    					    			    
					  </el-table>
					    <el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="nowPage"
					      :page-size="pageSize"
					      layout="prev, pager, next, jumper"
					      :total="totalCount">
					    </el-pagination>
					</template>				
				</div>
			</div>

		</div>	
	</div>
</template>

<script>
export default{
	data(){
		return{
			nowPage: 1,				//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,			//总条数
			nowPage2: 1,				//当前页
	      	pageSize2: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount2: 0,			//总条数
	      	/*第二页数据*/
	      	companyText: null, 			
	      	/*第一页数据*/
	      	restaurants2: [],	//远程下拉框数组2
	      	commodity2: null,
	      	//companyText2 : null,
	      	itemData2: '',
	      	itemDataId2: '',
	      	commodityList2: [],
	      	storeName: null,
	      	storeNameList: [],	
	      	department: null,
	      	departmentList: [],	    
	      	showDate2: true,			//day表头显示控制
	      	shoWeekday2: true,			//day表头显示控制
			showCommodity2: true,		//day表头显示控制
			showUPC2: true,				//day表头显示控制
			showItem2: true,			//day表头显示控制  		
	      	/*第一页数据end*/	      	
	      	showTab1: true,
	      	showTab2: false,
	      	startDate: null,
	      	endDate: null,
	      	startDateStr: null,
	      	endDateStr: null,
	      	dayOfWeek: ['All','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	      	weekNameList: ['SUN','MON','TUE','WED','THUR','FRI','SAT'],
	      	selectWeek: null,
	      	navHeadList: [
	      		{	      			
	      			name: 'Sales Data Management'
	      		},
	      		{
	      			name: 'Import Data'
	      		},
	      	],
	      	nowIndex: 0,
	      	curIndex: 0,
			weekDayList: [],
			tableData: [
				{
					'uploadFileName': 1,
					'uploadStatus': 2,
					'uploadTime': 3,
					'Operator': 4,
				},
				{
					'uploadFileName': 5,
					'uploadStatus': 6,
					'uploadTime': 7,
					'Operator': 8,
				}
			],
			fileList: [],   //上传文件列表
			tableData2: [],
			fileObj: null,
			uploadLoading: false,
			fileName: "",
			isFiled: true,  //判断是否选择文件
			//loading2: true	开发时打开注释		
		}
	},	
	methods:{
/*--------------------------------------------页面Import Data-----------------------------------------------------------*/
		downloadTemplate(){
			let url = '../../../static/Demo.xlsx'
			let $form = $('<form method="GET"></form>');
            $form.attr('action', url);
            $form.appendTo($('body'));
            $form.submit();
		},
		browse(){
			$("#file").click()
		},
		upload(e){
			let file = e.target.files[0];//获取到当前文件对象
			this.fileObj = new FormData(); //创建form对象
        	this.fileObj.append('file',file);//通过append向form对象添加数据
        	
        	this.fileName = this.fileObj.get('file').name
        	console.log(this.fileObj.get('file'))
			
        	if(this.fileName){
        		let arr = this.fileName.split('.');
		        if (arr[1] !== 'xls' && arr[1] !== 'xlsx') {
		           this.$message.error('Wrong file format!');
		           this.isFiled = true
		           return;
		        }
        		this.isFiled = false
        	}else{
        		this.isFiled = true
        	}
        	console.log(this.fileObj.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
		},
		uploadFileObj(){
			this.uploadLoading = true
			let config = {	//添加请求头
	          		headers:{'Content-Type':'multipart/form-data'}
	        	}; 
			console.log(this.fileObj)
			this.$axios.post('/v1/sales/import', this.fileObj, config)
				
			  .then((res) => {			  	
			  	let nowData = res.data
				
			  	if(nowData.code == 1){
			  		this.uploadLoading = false
					this.$message({
			          message: 'Upload Successful!',
			          type: 'success'
			        })				  	
			  	}else{
			  		this.uploadLoading = false
			  		console.log(nowData.msg)
			  		this.$message({
			          message: nowData.msg,
			          type: 'warning'
			        })
			  	}
			  	this.fileName = ''
			  	this.fileObj = null
			  	this.isFiled = true
			  	this.getTableData()
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
		},
		getTableData(){
			let _this = this
			this.loading = true
			let parm = {
				'currentPage': this.nowPage,
				'pageSize': this.pageSize
			}
			console.log(JSON.stringify(parm))
			this.$axios.get('/v1/importRecode',{params: parm})
				
			  .then((res) => {			  	
			  	let nowData = res.data
				
			  	if(nowData.code == 1){
			  		_this.loading = false
			  		_this.tableData = nowData.data.items
					_this.totalCount = nowData.data.totalNum									  	
										
			  	}else{
			  		console.log(nowData.msg)
			  		this.$message({
			          message: nowData.msg,
			          type: 'warning'
			        })
			  	}
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
		},
		formatDate(rows){
			let time = new Date(rows.uploadTime)
			return this.moment(time).format("MM/DD/YYYY  HH:m:s")
		},
		getStartDate(val){
			console.log(val)
			this.startDateStr = val
		},
		getEndDate(val){
			console.log(val)
			this.endDateStr = val
		},

/*--------------------------------------------------页面Sales Data Management-----------------------------------------*/
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		    if (rowIndex === 0) {
		        return 'background-color: #F5F7FA;'
		    }
		},
		querySearchAsync2(queryString, cb) {			/* 远程搜索下拉框*/
	        var restaurants = this.restaurants2;
	        var results = queryString ? restaurants.filter(this.createStateFilter2(queryString)) : restaurants;

	          cb(results);

	      },
	    createStateFilter2(queryString) {
	        return (state) => {
	          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	        };
	    },
	    handleSelect2(item) {   
	    	this.itemDataId2 = item.id
	        console.log(item.id);
	        console.log(item.value);
	    },
	    handleBlur2(item){
	    	this.itemDataId2 = ''
	    },
	    search2(){
	    	this.nowPage2 = 1
	    	this.getTableData2()
	    },
	    reset2(){
			this.commodity2 = null
			this.itemData2 = null
			this.itemDataId2 = null
			this.companyText2 = null
			//this.startDate = null
			//this.endDate = null
			//this.startDateStr = null
			//this.endDateStr = null
			this.startEndDate()   //渲染day页面默认起始结束日期
			
			this.curIndex = 0
			this.selectWeek = null	//重置恢复周选择
			this.getTableData2()
		},
	    getItemDate2(){
			this.$axios.get('/qitems/queryItemList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		//console.log(JSON.stringify(nowData.data))
			  		this.restaurants2 = nowData.data				  	
			  	}else{
			  		console.log(nowData.errorInfo)
			  		this.$message({
			          message: nowData.errorInfo,
			          type: 'warning'
			        })
			  	}
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
		},
		changeCommodity2(selVal){
			console.log(selVal)
			if(selVal == 2){
				this.commodity2 = null
			}
		},
		getCommodity2(){
			this.$axios.get('/qitems/queryCommodityList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		//console.log(JSON.stringify(nowData.data))
			  		this.commodityList2 = nowData.data
				  	
			  	}else{
			  		console.log(nowData.errorInfo)
			  		this.$message({
			          message: nowData.errorInfo,
			          type: 'warning'
			        })
			  	}
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
		},	
		getTableData2(){
			this.loading2 = true
			let parm = {
				  "categoryId": this.commodity2 ? this.commodity2 : null,
				  "currentPage": this.nowPage2,	
				  "pageSize": this.pageSize2,
				  "dayWeek": this.selectWeek,
				  "productCode": this.companyText2 ? this.companyText2 : null,
				  "productId": this.itemDataId2 ? this.itemDataId2 : null,
				  "productName": this.itemData2 ? this.itemData2 : null,
				  "startDate": this.startDateStr ? this.startDateStr : null,
  				  "endDate": this.endDateStr ? this.endDateStr : null,
				  "storeNumber": this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").storeNumber : null,
			}
			console.log(JSON.stringify(parm))
			this.$axios.post('/v1/sales/day',parm)
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
				
			  	if(nowData.code == 1){
			  		this.loading2 = false
			  		this.tableData2 = nowData.data.items
					this.totalCount2 = nowData.data.totalNum
			  	}else{
			  		console.log(nowData.msg)
			  		this.$message({
			          message: nowData.msg,
			          type: 'warning'
			        })
			  	}
			  	
			  })
			  .catch((err) => {
			    console.log(err);
			    this.$message({
		          message: err,
		          type: 'warning'
		        })
			  })
		},
		getPlanDate(rows){
			let time = new Date(rows.salesDate)
			return this.moment(time).format("MM/DD/YYYY")
		},
		getDayOfWeek(rows){
			if(rows.dayWeek == 0) return 'Sunday'
			if(rows.dayWeek == 1) return 'Monday'
			if(rows.dayWeek == 2) return 'Tuesday'
			if(rows.dayWeek == 3) return 'Wednesday'
			if(rows.dayWeek == 4) return 'Thursday'
			if(rows.dayWeek == 5) return 'Friday'
			if(rows.dayWeek == 6) return 'Saturday'
		},
		handleSizeChange(val){
    		this.pageSize = val
    		console.log(this.pageSize)
    	},
    	handleCurrentChange(val){
    		this.nowPage = val
    		console.log('当前页是:'+this.nowPage)
    		this.getTableData()
    	}, 
		handleSizeChange2(val){
    		this.pageSize2 = val
    		console.log(this.pageSize2)
    	},
    	handleCurrentChange2(val){
    		this.nowPage2 = val
    		console.log('当前页是:'+this.nowPage2)
    		this.getTableData2()
    	}, 
    	selected(index){
    		this.nowIndex = index
    		if(index == 0){		//by day
    			this.showTab1 = true
    			this.showTab2 = false		      	   			
    		}else{				//by week
    			this.showTab2 = true
    			this.showTab1 = false
    		}
    	},
    	seleWeekOfDay(index){
    		this.nowPage2 = 1
    		this.curIndex = index
    		if(index == 0) this.selectWeek = null
    		if(index == 1) this.selectWeek = 0
    		if(index == 2) this.selectWeek = 1
    		if(index == 3) this.selectWeek = 2
    		if(index == 4) this.selectWeek = 3
    		if(index == 5) this.selectWeek = 4
    		if(index == 6) this.selectWeek = 5
    		if(index == 7) this.selectWeek = 6
    		this.getTableData2()
    		console.log(this.selectWeek)
    	},
    	startEndDate(){
    		let now_date = this.moment(new Date()).add(0,'year').format("YYYY-MM-DD")				
			let weekOfday = this.moment(now_date).format('E');//计算今天是这周第几天
			//渲染day页面当前周的起始和结束日期
			this.startDateStr = this.moment(now_date).subtract(weekOfday, 'days').add('days').format('YYYY-MM-DD');//start date str
	      	this.endDateStr = this.moment(now_date).subtract(weekOfday, 'days').add(6, 'days').format('YYYY-MM-DD');//end date str
			this.startDate = new Date(this.moment(now_date).subtract(weekOfday, 'days').add('days').format('YYYY-MM-DD'));//start date
	      	this.endDate = new Date(this.moment(now_date).subtract(weekOfday, 'days').add(6, 'days').format('YYYY-MM-DD'));//end date
    	}
	},
	mounted (){
		this.getTableData()
		
		this.startEndDate()   //渲染day页面默认起始结束日期			
		this.getItemDate2()	
		this.getCommodity2()
		this.getTableData2()		
	}	
}	
</script>
<style scoped>
.upload-but {
    text-align: left; padding-left: 110px; margin-bottom: 20px;
}
.file-input{
	opacity: 0;  width: 0px; position: absolute; top: -94px; left: -234px;
}
.download{
	margin: 10px; color: #3366FF;
}
.download:hover{
	color: #FF4D34;
}
</style>