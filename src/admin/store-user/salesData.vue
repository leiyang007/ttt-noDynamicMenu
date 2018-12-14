<template>
	<div class="salesData">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font">Sales Data</span>
		</div>
		<div>
			<div class="nav-head">
				<ul class="clear">
					<li :class="{active:index==nowIndex}" v-for="(item,index) in navHeadList" @click="selected(index)">{{ item.name }}</li>
				</ul>
			</div>
		</div>
		<div class="body-box">
<!--页面一-----------------------by day------------------------------------>		
			<div class="tabPage" v-if="showTab1">
				<div class="table-head clear">
					<ul class="clear">
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
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">UPC/PLU:</span>
							    <el-input v-model="companyText2" placeholder="Please input contents" style="width: 200px;"></el-input>
							</div>
						</li>
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
<!--页面二------------------------by week----------------------------------->				
			<div class="tabPage" v-if="showTab2">
				<div class="table-head clear">
					<ul class="clear">
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Commodity:</span>
							    <el-select v-model="commodity" placeholder="Please choose" @change="changeCommodity" style="width: 200px;">
								    <el-option
								      v-for="item in commodityList"
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
								  v-model="itemData"
								  :fetch-suggestions="querySearchAsync"
								  placeholder="Please input contents"
								  style="width: 200px;"
								  @select="handleSelect"
								  @blur="handleBlur"
								></el-autocomplete>
							</div>
						</li>
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">UPC/PLU:</span>
							    <el-input v-model="companyText" placeholder="Please input contents" style="width: 200px;"></el-input>
							</div>
						</li>	
						<li>	
							<div class="demo-input-suffix">
								<span class="oneline">Fiscal Week:</span>
							    <el-select v-model="seleYear" placeholder="year" @change="getYearText()" style="width: 90px;">
								    <el-option
								      v-for="item in yearList"
								      :key="item.value"
								      :label="item.text"
								      :value="item.value">
								    </el-option>
								</el-select> 
							    <el-select v-model="seleWeek" placeholder="week" @change="getWeekText()" style="width: 105px;">
								    <el-option
								      v-for="item in weekList"
								      :key="item.value"
								      :label="item.text"
								      :value="item.value">
								    </el-option>
								</el-select>
								-
							    <el-select v-model="seleYear2" placeholder="year" @change="getYearText2()" style="width: 90px;">
								    <el-option
								      v-for="item in yearList"
								      :key="item.value"
								      :label="item.text"
								      :value="item.value">
								    </el-option>
								</el-select> 
							    <el-select v-model="seleWeek2" placeholder="week" @change="getWeekText2()" style="width: 105px;">
								    <el-option
								      v-for="item in weekList"
								      :key="item.value"
								      :label="item.text"
								      :value="item.value">
								    </el-option>
								</el-select>
							</div>
						</li>
					</ul> 
					<div class="search-but">
						<span></span>
						<el-button type="danger" @click="getTableData">Search</el-button>
						<el-button type="danger" @click="reset">Reset</el-button>
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
						    		<li><el-checkbox v-model="shwoFiscalWeek">Fiscal Week</el-checkbox></li>
						    		<li><el-checkbox v-model="shwoCommodity">Commodity</el-checkbox></li>
						    		<li><el-checkbox v-model="shwoUPC">UPC/PLU</el-checkbox></li>
						    		<li><el-checkbox v-model="shwoItem">Item</el-checkbox></li>						    		
						    		<li><el-checkbox v-model="priceType">Price Type</el-checkbox></li>
						    		<li><el-checkbox v-model="sold">$ Sold</el-checkbox></li>
						    		<li><el-checkbox v-model="unitsSold">Units Sold</el-checkbox></li>
						    	</ul>
						    </div>
						    <div class="table-column-set gray-font" slot="reference">
								<i class="el-icon-setting" style="color: #C9C9C9;"></i>
								Customized View
							</div>
						  </el-popover>
					</div>			
					<template>				
					  <el-table ref="multipleTable" key='firstTable' v-loading="loading" :data="tableData" tooltip-effect="dark" border>			    
					    <el-table-column prop="fiscalWeekNum" v-if="shwoFiscalWeek" label="Fiscal Week" min-width="100" :formatter="formatFiscalWeek">
					    </el-table-column>
					    <el-table-column prop="commodity" v-if="shwoCommodity" label="Commodity" min-width="110" :formatter="formatCategoryIdToName">
					    </el-table-column>
					    <el-table-column prop="productCode" v-if="shwoUPC" label="UPC/PLU" min-width="200">
					    </el-table-column>					    
					    <el-table-column prop="productName" v-if="shwoItem" label="Item" min-width="300">
					    	<template slot-scope="scope">
					        	<div class="line-1" style="height: 25px; -webkit-box-orient: vertical;" :title="scope.row.productName">{{ scope.row.productName }}</div>
						    </template>
					    </el-table-column>					    
					    <el-table-column prop="priceType"  v-if="priceType" label="Price Type" min-width="150">
					    </el-table-column>
					    <el-table-column prop="sold"  v-if="sold" label="$ Sold" min-width="100">
					    </el-table-column>
					    <el-table-column prop="unitsSold"  v-if="unitsSold" label="Units Sold" min-width="100">
					    </el-table-column>
					    
					    <el-table-column prop="" :label="item" v-for="(item,index) in weekNameList" min-width="">
					    	<el-table-column :prop="'w'+index+'Sold'" label="$ Sold" min-width="100">
						    </el-table-column>	
						    <el-table-column :prop="'w'+index+'UnitsSold'" label="Units Sold" min-width="100">
						    </el-table-column>	
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
	      	restaurants: [],	//远程下拉框数组1
	      	commodity: null,
	      	companyText: null,
	      	itemData: '',
	      	itemDataId: '',
	      	commodityList: [],
	      	seleWeek: this.getNowYearAndWeek().week.toString(),
	      	seleWeek2: this.getNowYearAndWeek().week.toString(),
	      	weekList: [],
	      	seleYear: this.getNowYearAndWeek().year,
	      	seleYear2: this.getNowYearAndWeek().year,
	      	yearList: [],
	      	start_sunday: null, 
			this_monday: null, 
			this_tuesday: null, 
			this_wednesday: null, 
			this_thursday: null, 
			this_friday: null, 
			end_saturday: null, 
			shwoFiscalWeek: true,	//week页表头显示项控制
			shwoCommodity: true,	//week页表头显示项控制
			shwoUPC: true,			//week页表头显示项控制
			shwoItem: true,			//week页表头显示项控制
			priceType: true,			//week页表头显示项控制
			sold: true,			//week页表头显示项控制
			unitsSold: true,			//week页表头显示项控制
	      	/*第一页数据*/
	      	restaurants2: [],	//远程下拉框数组2
	      	commodity2: null,
	      	companyText2 : null,
	      	itemData2: '',
	      	itemDataId2: '',
	      	commodityList2: [],	    
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
	      			name: 'By Day'
	      		},
	      		{
	      			name: 'By Week'
	      		},
	      	],
	      	nowIndex: 0,
	      	curIndex: 0,
			weekDayList: [],
			tableData: [],
			tableData2: [],
			loading: true,
			loading2: true,
			
		}
	},	
	methods:{
/*--------------------------------------------页面week-----------------------------------------------------------*/		
		querySearchAsync(queryString, cb) {			/* 远程搜索下拉框*/
	        var restaurants = this.restaurants;
	        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
	
	        //clearTimeout(this.timeout);
	        //this.timeout = setTimeout(() => {
	          cb(results);
	        //}, 3000 * Math.random());
	    },
	    reset(){
			this.commodity = null
			this.companyText = null
			this.itemData = ''
			this.itemDataId = ''
			this.seleYear = this.getNowYearAndWeek().year
			this.seleWeek = this.getNowYearAndWeek().week.toString()
			this.getTableData()
		},
	    createStateFilter(queryString) {
	        return (state) => {
	          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	        };
	    },
	    handleSelect(item) {
	    	this.itemDataId = item.id
	        console.log(item.id);
	        console.log(item.value);
	    },	
	    handleBlur(item){
	    	this.itemDataId = ''
	    },
	    changeCommodity(selVal){
			console.log(selVal)
			if(selVal == 2){
				this.commodity = null
			}
		},
		getItemDate(){
			this.$axios.get('/qitems/queryItemList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		//console.log(JSON.stringify(nowData.data))
			  		this.restaurants = nowData.data				  	
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
		getCommodity(){
			this.$axios.get('/qitems/queryCommodityList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		//console.log(JSON.stringify(nowData.data))
			  		this.commodityList = nowData.data
				  	
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
		getYearText(){
			console.log(this.seleYear)
			this.getWeek(this.seleYear)
		},
		getYearText2(){
			console.log(this.seleYear2)
			this.getWeek(this.seleYear2)
		},
		getWeekText(){
			console.log(this.seleWeek)
		},
		getWeekText2(){
			console.log(this.seleWeek2)
		},
		getWeek(seleYear){
			let parm = seleYear
			this.$axios.get('/qitems/queryYearWeekList?year='+parm)
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){				  					  		
			  		this.weekList = nowData.data
			  		
				  	//console.log(JSON.stringify(this.weekList))
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
		getYear(){
			this.$axios.get('/qitems/queryYearList')
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		//console.log(JSON.stringify(nowData.data))
			  		this.yearList = nowData.data.reverse()	
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
		getNowWeekDate(pramDate){
			if(pramDate){
				var now_date = this.moment(pramDate).add(0,'year').format("YYYY-MM-DD")
			}else{
				var now_date = this.moment(new Date()).add(0,'year').format("YYYY-MM-DD")
			}			
			var weekOfday = this.moment(now_date).format('E');//计算今天是这周第几天
			this.start_sunday = this.moment(now_date).subtract(weekOfday, 'days').add('days').format('MM/DD/YYYY');//周日日期
			this.this_monday = this.moment(now_date).subtract(weekOfday, 'days').add(1, 'days').format('MM/DD/YYYY');//周一日期
			this.this_tuesday = this.moment(now_date).subtract(weekOfday, 'days').add(2, 'days').format('MM/DD/YYYY');//周二日期
			this.this_wednesday = this.moment(now_date).subtract(weekOfday, 'days').add(3, 'days').format('MM/DD/YYYY');//周三日期
			this.this_thursday = this.moment(now_date).subtract(weekOfday, 'days').add(4, 'days').format('MM/DD/YYYY');//周四日期
			this.this_friday = this.moment(now_date).subtract(weekOfday, 'days').add(5, 'days').format('MM/DD/YYYY');//周五日期
			this.end_saturday = this.moment(now_date).subtract(weekOfday, 'days').add(6, 'days').format('MM/DD/YYYY');//周六日期
	      	
			for(let i=0; i<=6; i++){
				
				let weekDate = null
				let day = null

				if(i == 0) {
					weekDate = this.start_sunday
					day = 'SUN'
				}else if(i == 1){
					weekDate = this.this_monday
					day = 'MON'
				}else if(i == 2){
					weekDate = this.this_tuesday
					day = 'TUE'
				}else if(i == 3){
					weekDate = this.this_wednesday
					day = 'WED'
				}else if(i == 4){
					weekDate = this.this_thursday
					day = 'THUR'
				}else if(i == 5){
					weekDate = this.this_friday
					day = 'FRI'
				}else if(i == 6){
					weekDate = this.end_saturday
					day = 'SAT'
				}
				
				this.weekDayList[i] = {
					"day": day +' ('+ weekDate +')',
	                "discription1":"$ Sold",
	                "discription2":"Units Sold"
				}

			}
			
			//console.log(JSON.stringify(this.weekDayList))
		},
		getTableData(){
			let _this = this
			this.loading = true
			let parm = {
				  "categoryId": this.commodity ? this.commodity : null,
				  "currentPage": this.nowPage,
				  "pageSize": this.pageSize,
				  "productCode": this.companyText ? this.companyText : null,
				  "productId": this.itemDataId ? this.itemDataId : null,
				  'productName': this.itemData ? this.itemData : null,
				  "storeNumber": this.common.LStorage.getItem("userInfo") ? this.common.LStorage.getItem("userInfo").storeNumber : null,
				  "startWeek": parseInt(this.seleWeek),
				  "startYear": this.seleYear,
				  "endWeek": parseInt(this.seleWeek2),
				  "endYear": this.seleYear2,
			}
			console.log(JSON.stringify(parm))
			this.$axios.post('/v1/sales/week',parm)
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
				
			  	if(nowData.code == 1){
			  		_this.loading = false
			  		_this.tableData = nowData.data.items
					_this.totalCount = nowData.data.totalNum									  	
										
					/*if(this.seleYear && this.seleWeek){				  		
				  		let seleDate = this.moment(this.seleYear+'-01-01').week(this.seleWeek).add(2, 'days').format('YYYY-MM-DD')
				  		this.getNowWeekDate(seleDate)    //渲染选择的周日期
				  	}else{
				  		this.getNowWeekDate()    //渲染当前周日期
				  	}
				  	
					for(let i=0; i<_this.tableData.length; i++){
						for(let j=0; j<_this.tableData[i].planDatas.length; j++){
							if(j == 0)	_this.tableData[i].planDatas[j].day = 'SUN'+' ('+_this.start_sunday+')'
							if(j == 1)	_this.tableData[i].planDatas[j].day = 'MON'+' ('+_this.this_monday+')'
							if(j == 2)	_this.tableData[i].planDatas[j].day = 'TUE'+' ('+_this.this_tuesday+')'
							if(j == 3)	_this.tableData[i].planDatas[j].day = 'WED'+' ('+_this.this_wednesday+')'
							if(j == 4)	_this.tableData[i].planDatas[j].day = 'THUR'+' ('+_this.this_thursday+')'
							if(j == 5)	_this.tableData[i].planDatas[j].day = 'FRI'+' ('+_this.this_friday+')'
							if(j == 6)	_this.tableData[i].planDatas[j].day = 'SAT'+' ('+_this.end_saturday+')'
							_this.tableData[i].planDatas[j].discription1 = 'Build-Up'
							_this.tableData[i].planDatas[j].discription2 = 'On-Hand'
							_this.tableData[i].planDatas[j].discription3 = 'Prod.'
						}
						this.weekDayList = _this.tableData[i].planDatas
					}*/
					
					//console.log(JSON.stringify(_this.tableData))
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
		formatCategoryIdToName(rows) {
			if (rows.categoryId) {
				for(let i=0; i<this.commodityList.length; i++){
					if(rows.categoryId == this.commodityList[i].id){
						return this.commodityList[i].value
					}
				}
			}			
		},
		toParseIntAWM(rows){
			return Math.round(rows.averageWeeklyMovement)   //四舍五入取整
		},
		toParseIntPWM(rows){
			return Math.round(rows.projectedWeeklyMovement)   //四舍五入取整
		},
		formatFiscalWeek(row,column){
			return row.year+' w'+row.week
		},
		getStartDate(val){
			console.log(val)
			this.startDateStr = val
		},
		getEndDate(val){
			console.log(val)
			this.endDateStr = val
		},
		getNowYearAndWeek(){
	         var today = new Date();
	         var year = today.getFullYear()
			  var firstDay = new Date(today.getFullYear(),0, 1);
			  var dayOfWeek = firstDay.getDay(); 
			  var spendDay= 1;
			  if (dayOfWeek !=0) {
			    spendDay=7-dayOfWeek+1;
			  }
			  firstDay = new Date(today.getFullYear(),0, 1+spendDay);
			  var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
			  var result =Math.ceil(d/7);
				
			  var obj = {
			  		year: year,
			  		week: result
			  }

			  //console.log('当前日期是第'+result+1)
			  return obj;			  
		},
/*--------------------------------------------------页面day-----------------------------------------*/
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
		    if (rowIndex === 0) {
		        return 'background-color: #F5F7FA;'
		    }
		},
		querySearchAsync2(queryString, cb) {			/* 远程搜索下拉框*/
	        var restaurants = this.restaurants2;
	        var results = queryString ? restaurants.filter(this.createStateFilter2(queryString)) : restaurants;
	
	        //clearTimeout(this.timeout);
	        //this.timeout = setTimeout(() => {
	          cb(results);
	        //}, 3000 * Math.random());
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
    			this.seleWeek = this.getNowYearAndWeek().week.toString()
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
		this.getItemDate()
		this.getCommodity()
		this.getYear()	
		this.getTableData()
		this.getWeek(this.seleYear)
		
		this.startEndDate()   //渲染day页面默认起始结束日期			
		this.getItemDate2()	
		this.getCommodity2()
		this.getTableData2()		
	}	
}	
</script>
<style scoped>

</style>