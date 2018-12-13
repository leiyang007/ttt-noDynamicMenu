import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import adminLogin from '../components/adminLogin'  //系统登录界面

import balanceOnHand from '../admin/store-user/balanceOnHand' 		//balanceOnHand
import productForecast from '../admin/store-user/productForecast' 		//productForecast
//import dailyProductionAmount from '../admin/store-user/dailyProductionAmount' 		//dailyProductionAmount
import salesData from '../admin/store-user/salesData' 		//salesData

import storeManagement from '../admin/administrator/storeManagement' 		//storeManagement
import productStandard from '../admin/administrator/productStandard' 		//productStandard
import productManagement from '../admin/administrator/productManagement' 		//productManagement
import salesDataManagement from '../admin/administrator/salesDataManagement' 		//salesDataManagement


import tscg_system from '../admin/tscg_system' 		//后台管理系统主界面

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: adminLogin,
			name: 'adminLogin'
		},
		{
			path: '/tscg_system',
			component: tscg_system,
			name: 'tscg_system',
			redirect: '/tscg_system/balanceOnHand',
			children: [
				{
					path: 'balanceOnHand',				//balanceOnHand
					component: balanceOnHand,
					name: 'Balance on Hand'
				},
				{
					path: 'productForecast',				//productForecast
					component: productForecast,
					name: 'Product Forecast'
				},	
				/*{
					path: 'dailyProductionAmount',				//dailyProductionAmount
					component: dailyProductionAmount
				},*/	
				{
					path: 'salesData',				//salesData
					component: salesData,
					name: 'Sales Data'
				},	
				/*{
					path: 'storeManagement',				//storeManagement
					component: storeManagement,
					name: 'Store Management'
				},	
				{
					path: 'productStandard',				//productStandard
					component: productStandard,
					name: 'Product Standard'
				},
				{
					path: 'productManagement',				//productManagement
					component: productManagement,
					name: 'Product Management'
				},	*/
				{
					path: 'salesDataManagement',				//salesDataManagement
					component: salesDataManagement,
					name: 'Sales Data Management'
				},			
			]
		}
	]
})
