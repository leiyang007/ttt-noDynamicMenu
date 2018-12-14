<template>
	<div class="balanceOnHand">
		<div class="nav-list">
			<span class="red-font">Production Planner</span>/<span class="gray-font bh-title">Balance on Hand</span>
		</div>
		<div>
			<div class="nav-head-one">
				<ul class="clear">
					<li class="red-font">Balance on Hand</li>
				</ul>
			</div>
		</div>
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
					      style="width: 200px;"	
						  v-model="itemData"
						  :fetch-suggestions="querySearchAsync"
						  placeholder="Please input contents"
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
						<span class="oneline">Fiscal Week :</span>
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
					</div>
				</li>
			</ul> 
			<div class="search-but">
				<el-button type="danger" @click="search">Search</el-button>
				<el-button type="danger" @click="reset">Reset</el-button>
				<el-button type="danger" @click="generationPrediction" :loading="buildLoading">Build Production Forecast</el-button>
			</div>	
		</div>
		<div class="table-body" style="word-wrap:break-word;">
			<div class="table-top-set">				
				<el-popover
				    placement="bottom"
				    title="Column"
				    width="200"
				    trigger="click">
				    <div class="porpover">
				    	<ul class="check-column">
				    		<li><el-checkbox v-model="showFiscalWeek">Fiscal Week</el-checkbox></li>
				    		<li><el-checkbox v-model="showCommodity">Commodity</el-checkbox></li>
				    		<li><el-checkbox v-model="showUPC">UPC/PLU</el-checkbox></li>				    		
				    		<li><el-checkbox v-model="showItem">Item</el-checkbox></li>			    		
				    	</ul>
				    </div>
				    <div class="table-column-set gray-font" slot="reference">
						<i class="el-icon-setting" style="color: #C9C9C9;"></i>
						Customized View
					</div>
				  </el-popover>
			</div>			
			<template>				
			  <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" border >			    
			    <el-table-column prop="categoryId" v-if="showCommodity" label="Commodity" min-width="120" :formatter="formatCategoryIdToName">
			    </el-table-column>
			    <el-table-column prop="" v-if="showFiscalWeek" label="Fiscal Week" min-width="120" :formatter="formatYearWeak">
			    </el-table-column>	
			    <el-table-column prop="code" v-if="showUPC" label="UPC/PLU" min-width="200">
			    </el-table-column>			    
			    <el-table-column prop="productName" v-if="showItem" label="Item" min-width="200">
			    	<template slot-scope="scope">
			        	<div class="line-1" style="height: 25px; -webkit-box-orient: vertical;" :title="scope.row.productName">{{ scope.row.productName }}</div>
				    </template>
			    </el-table-column>
	<!--一周预算-->
				<el-table-column prop="" label="On-Hand">
				    <el-table-column :prop="dayKey" :label="weekDate[dayIndex]" width="120" v-for="(dayKey, dayIndex) in dayKeyMaps" :key="dayKey">
				    	<template slot-scope="scope">
				        	<input class="edit-input" v-if="scope.row.edit[dayIndex]" v-model="scope.row.onHand[dayIndex]" autofocus="autofocus"
				        		 onkeyup="value=this.value.replace(/\D+/g,'')" 
				        		 @blur="editBlur(scope.row, scope.$index, dayIndex)"
				        		 @keyup.enter="enterDone(scope.row, scope.$index, dayIndex)">
					        <div class="pointer div-text" :data-index="dayIndex" ref="menuBorder" title="click to edit" v-if="!scope.row.edit[dayIndex]" @click="editCell(scope.row, dayIndex)">{{ scope.row.onHand[dayIndex] }}</div>
					    </template>	
				    </el-table-column>
				</el-table-column>		    	
	<!--一周预算end-->		    
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
</template>

<script>
export default{
	data(){
		return{
			userType: null,			//用户类型,如:厂家\经销商等
			nowPage: 1,				//当前页
	      	pageSize: this.GLOBAL.pageSize,			//每页显示条数
	      	totalCount: 0,			//总条数      	
	      	restaurants: [],	//远程下拉框数组
        	timeout:  null,
	      	loading: true,
	      	commodity: null,
	      	companyText: '',
	      	itemData: '',
	      	itemDataId: '',
	      	commodityList: [],
	      	seleWeek: this.getNowYearAndWeek().week.toString(),
	      	weekList: [],
	      	seleYear: this.getNowYearAndWeek().year,
	      	yearList: [],
	      	dayKeyMaps: ['sunNum', 'monNum', 'tueNum', 'wedNum', 'thurNum', 'friNum', 'satNum'], // the key of day in week maps
	      	weekDate: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 
			tableData: [],
			editBefore: null,
			editAfter: null,
			enter: false,
			buildLoading: false,
			showFiscalWeek: false,	//控制表头显示项
			showCommodity: true,	//控制表头显示项
			showUPC: true,			//控制表头显示项
			showItem: true,			//控制表头显示项
		}
	},	
	methods:{	
		search(){
			this.nowPage = 1
			this.getTableData()
		},
		reset(){
			this.commodity = null
			this.companyText = ''
			this.itemData = ''
			this.itemDataId = ''
			this.seleYear = this.getNowYearAndWeek().year
			this.seleWeek = this.getNowYearAndWeek().week.toString()
			this.getTableData()
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
    	/*closePorp(){
    		document.querySelector('.oneline').click()
    	},*/
    	handleCurrentChange(row, event, column) {
    		this.loading = true
            console.log(row)
            this.nowPage = row
            this.getTableData()
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },       
        querySearchAsync(queryString, cb) {			/* 远程搜索下拉框*/
	        var restaurants = this.restaurants;
	        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
	
	        //clearTimeout(this.timeout);
	        //this.timeout = setTimeout(() => {
	          cb(results);
	        //}, 3000 * Math.random());
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
	    /* 远程搜索下拉框end*/
		getTableData(){
			let _this = this
			this.loading = true
			let parm = {
				'currentPage': this.nowPage,
				'pageSize': this.pageSize,
				'code': this.companyText ? this.companyText : null,
				'categoryId': this.commodity ? this.commodity : null,
				"productId": this.itemDataId ? this.itemDataId : null,
				'productName': this.itemData ? this.itemData : null,
				'year': this.seleYear ? this.seleYear : null,
				'week': this.seleWeek ? this.seleWeek : null
			}
			console.log(JSON.stringify(parm))

			this.$axios.post('/balancehand/queryBalancePage',parm)
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	
			  	_this.weekDate = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']  //每次重置星期数组
			  	if(_this.seleYear && _this.seleWeek){
			  		//let aaa = this.moment('2018-01-01').week(40).add(2, 'days').format('YYYY-MM-DD')
			  		let seleDate = _this.moment(_this.seleYear+'-01-01').week(_this.seleWeek).add(2, 'days').format('YYYY-MM-DD')
			  		_this.getNowWeekDate(seleDate)    //渲染选择的周日期
			  	}else{
			  		_this.getNowWeekDate()    //渲染当前周日期
			  	}			  	
			  	
			  	if(nowData.code == 1){
			  		_this.loading = false
			  		//console.log(JSON.stringify(nowData.data.items))
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
		getWeek(seleYear){
			let parm = seleYear
			this.$axios.get('/qitems/queryYearWeekList?year='+parm)
				
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		//console.log(JSON.stringify(nowData.data))
			  		this.weekList = nowData.data

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
		getYearList(){
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
		getYearText(){
			console.log(this.seleYear)
			this.getWeek(this.seleYear)
		},
		getWeekText(){
			console.log(this.seleWeek)
		},
		changeCommodity(selVal){
			console.log(selVal)
			if(selVal == 2){
				this.commodity = null
			}
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
		formatYearWeak(rows){
			return rows.year+' w'+rows.week
		},
		generationPrediction(){			//同时生成周和天的预测
			this.buildLoading = true
			let parm = {
					params: {
			            year: this.seleYear,
			            week: this.seleWeek
			        }
				}
			console.log(JSON.stringify(parm))
			if(this.seleYear && this.seleWeek){
				this.$axios.get('/productPlan/generation',parm)				
				  .then((res) => {			  	
				  	let nowData = res.data
				  	//console.log(JSON.stringify(nowData))
				  	if(nowData.code == 1){
				  		this.buildLoading = false
				  		this.$message({
				          message: 'Build Completed Successfully!',
				          type: 'success'
				        })
				  	}else{
				  		this.buildLoading = false
				  		console.log(nowData.errorInfo)
				  		this.$message({
				          message: 'Generation Failure!',
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
			}else{
				this.$message({
			          message: 'please select year and week!',
			          type: 'warning'
			        })
			}
			
		},
		// edit cell click
		editCell(row, dayIndex) {
			this.editBefore = row.onHand[dayIndex]
			//console.log('edit cell', row, dayIndex)
			var editKey = row.edit[dayIndex]
			//var dayKey = this.dayKeyMaps[dayIndex]
			if (typeof editKey != 'undefined') {
				this.$set(row.edit, dayIndex, true)
				this.$nextTick(function(){
					//console.log(this)
					//console.log($(event))
					$('.edit-input').focus()
					$('.edit-input').select()
				})	
			}
		},
		editBlur(row, index, dayIndex){
			if(this.enter != true){
				this.editCellDone(row, index, dayIndex)
			}
			this.enter = false
		},
		// edit cell done blur
		editCellDone(row, index, dayIndex) {
			this.editAfter = row.onHand[dayIndex] = row.onHand[dayIndex] == "" ? 0 : row.onHand[dayIndex]
			
			if(this.enter == true && $('.div-text[data-index='+ dayIndex +']')[index]){
				$('.div-text[data-index='+ dayIndex +']')[index].click()
			}

			var editKey = row.edit[dayIndex]
			var dayKey = this.dayKeyMaps[dayIndex]
			if (typeof editKey != 'undefined' && dayKey && typeof row.onHand[dayIndex] != 'undefined') {
				//console.log('edit cell done', row, dayIndex, 'new value', row[dayKey])
				this.$set(row.edit, dayIndex, false)
				
				if(this.editBefore != this.editAfter){		//检测输入前后数据是否相等，不相等才保存					
					this.postRowData(row,dayIndex)	
				}else{
					this.$message({
			          message: 'No changes detected！',
			          type: 'warning'
			        })
				}	
			}
			//this.enter = false
		},
		enterDone(row, index, dayIndex){
			this.enter = true
			this.editCellDone(row, index, dayIndex)
		},
		postRowData(row,dayIndex) {			
			var data = {
				accelerator: 0, 
				productId: row.id, 
				onHand: row.onHand,
				year: this.seleYear, 
				week: this.seleWeek, 					
			}
					
			this.$axios.post('/productset/saveProdSet', data)
			  .then((res) => {			  	
			  	let nowData = res.data
			  	//console.log(JSON.stringify(nowData))
			  	if(nowData.code == 1){	
			  		console.log(JSON.stringify(nowData.data))
			  		this.$message({
			          message: 'Successfully saved！',
			          type: 'success'
			        })	
			  	}else{
			  		console.log(nowData.errorInfo)
			  		this.$message({
			          message: 'Data anomaly',
			          type: 'warning'
			        })
			  		this.getTableData()
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
			var oneWeekDay = 7
			var start_sunday = this.moment(now_date).subtract(weekOfday, 'days').add(oneWeekDay, 'days').format('MM/DD/YYYY');//周日日期
			var this_monday = this.moment(now_date).subtract(weekOfday, 'days').add(1 + oneWeekDay, 'days').format('MM/DD/YYYY');//周一日期
			var this_tuesday = this.moment(now_date).subtract(weekOfday, 'days').add(2 + oneWeekDay, 'days').format('MM/DD/YYYY');//周二日期
			var this_wednesday = this.moment(now_date).subtract(weekOfday, 'days').add(3 + oneWeekDay, 'days').format('MM/DD/YYYY');//周三日期
			var this_thursday = this.moment(now_date).subtract(weekOfday, 'days').add(4 + oneWeekDay, 'days').format('MM/DD/YYYY');//周四日期
			var this_friday = this.moment(now_date).subtract(weekOfday, 'days').add(5 + oneWeekDay, 'days').format('MM/DD/YYYY');//周五日期
			var end_saturday = this.moment(now_date).subtract(weekOfday, 'days').add(6 + oneWeekDay, 'days').format('MM/DD/YYYY');//周六日期
			
			for(let i=0; i<this.weekDate.length; i++){
				
				if(i == 0) this.weekDate[i] = this.weekDate[i]+'\n'+start_sunday
				if(i == 1) this.weekDate[i] = this.weekDate[i]+'\n'+this_monday
				if(i == 2) this.weekDate[i] = this.weekDate[i]+'\n'+this_tuesday
				if(i == 3) this.weekDate[i] = this.weekDate[i]+'\n'+this_wednesday
				if(i == 4) this.weekDate[i] = this.weekDate[i]+'\n'+this_thursday
				if(i == 5) this.weekDate[i] = this.weekDate[i]+'\n'+this_friday
				if(i == 6) this.weekDate[i] = this.weekDate[i]+'\n'+end_saturday
			}

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

			  //console.log('当前日期是第'+result+1+'周')
			  return obj;			  
		}
	},
	mounted (){
		this.getCommodity()
		this.getTableData()
		this.getItemDate()
		this.getYearList()
		this.getWeek(this.seleYear)
	}	
}	
</script>

<style scoped>	
.edit-input{
	border: 1px solid #D9D9D9;
    width: 100%;
    height: 30px;
    border-radius: 5px;
} 
</style>