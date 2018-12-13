//引入项目依赖模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import App from './App'
import 'babel-polyfill'

import axios from 'axios'
import moment from 'moment'
import base64 from 'js-base64'
import store from '../store/index'

import ElementUI from 'element-ui'	
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'

import common from './assets/js/common.js'    //引入公共js文件

//引入项目各个页面一级组件
import global_ from './components/Global'  //引用全局变量文件

Vue.use(VueRouter)

import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })


Vue.prototype.GLOBAL = global_		//挂载到Vue实例上面
Vue.prototype.common = common
Vue.prototype.moment = moment
Vue.prototype.$axios = axios

axios.defaults.baseURL = process.env.API_ROOT
//axios.defaults.baseURL = 'http://10.10.59.188:8080';   //江武
//axios.defaults.baseURL = 'http://localhost:8080';
//axios.defaults.baseURL = 'http://13.229.230.131:8080';  //部署地址

//let Base64 = require('js-base64').Base64

// http request 拦截器
axios.interceptors.request.use( 		//登录成功后给每个请求头设置token
  config => {
    // 判断是否登录是否有token ，这里登录时将token存之本地
    const USER_TOKEN = localStorage.getItem('token') ? localStorage.getItem('token').replace(/\"/g,"") : null
    // 登录不需要传token,看一下自己登录的接口包含哪个特殊字段
    if(USER_TOKEN && !config.url.includes('login')){
      config.headers.common['token'] = USER_TOKEN
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
axios.interceptors.response.use(
    response => {
    	//console.log(response.data.code)
    	let nowIndex = window.location.pathname
    	if(nowIndex != '/' && (response.data.code == -1000 || response.data.msg == 'Session Expired! Please log in again!')){
    		setTimeout(function(){
	       		VueInstance.$router.push('/')
	       		window.location.reload()
	        },2000)
    	}
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.code) {
                case -1000:  
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: '/',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

/* eslint-disable no-new */
let VueInstance = new Vue({
  el: '#app',
  router,
  store,
  /*template: '<adminLogin/>',
  components: { adminLogin }*/
  render: h => h(App)
})

