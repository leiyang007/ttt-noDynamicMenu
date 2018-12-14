<template>
	<div class="cms-admin">
		<div v-if="isShowLogin" class="header">
			<div class="float-left logo-admin">
				<span class="red-font">tSCG</span> Production Planning Management System
			</div>
		</div>
		<div v-if="isShowLogin">
			<div class="login-box">
				<div class="sign-in">Sign in</div>
				<el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
				  <el-form-item label="Username:" prop="username">
				    <el-input class="input-username" type="text" v-model="ruleForm.username" autofocus='autofocus' @keyup.enter.native="submitForm('ruleForm')" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="Password:" prop="password">
				    <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button class="loginBtn" type="danger" :loading="loginLoading" @click="submitForm('ruleForm')">Sign in</el-button>
				    <el-button @click="resetForm('ruleForm')">Reset</el-button>
				  </el-form-item>
				</el-form>
			</div>			
		</div>
		<div class="admin-foot">
			Copyright © 2018 the Stores Consulting Group
		</div>	   
	</div>
</template>


<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input a valid username'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input your password'));
        } else {
          callback();
        }
      };
      return {
      	isShowLogin: true,
      	loginLoading: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules2: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
      	
        this.$refs[formName].validate((valid) => {
          if (valid) {      
           	this.loginCheck()
            
          } else {
            console.log('Login failed!');
            return false;
          }
        });
      },
      loginCheck(){
      	let _this = this
		this.loginLoading = true
  			let parm = {
		  		"userName": this.ruleForm.username,
    			"password": this.ruleForm.password
		  	}
  			//console.log(parm)

			_this.$axios.post('/user/login',parm).then((res) => {			  	
			  	let nowData = res.data
			  	console.log(JSON.stringify(res))
			  	if(nowData.code == 1){
			  		this.loginLoading = false
			  		console.log(nowData)
				  						  						  	
				  	this.$message({
			          message: 'Login Successful!',
			          type: 'success'
			        })
				  	
				  	_this.common.LStorage.setItem("token",nowData.data.token)
				  	_this.common.LStorage.setItem("userInfo",nowData.data.userInfo)
				  	
				  	setTimeout(function(){
			       		_this.$router.push('/tscg_system')
			       		//window.location.reload()
			        },700)
				  	
			  	}else{
			  		console.log(nowData.errorInfo)
			  		this.$message({
			          message: 'Username and password does not match or you do not have an account yet！',
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
      resetForm(formName) {
        this.ruleForm.username = ''
        this.ruleForm.password = ''
        this.$refs[formName].resetFields();
      }
    },
    mounted(){        
        document.onkeydown=function(event){
			event = event|| window.event;
			if (event.keyCode == 13){
				$('.loginBtn').click()
			}
		}

    }
  }
</script>

<style type="text/css">
html,body{
	height: 100%; display: block;
}	
.login-box .el-form-item__label{
	color: #333;
}
</style>
<style scoped>	
.cms-admin{
	height: 100%; width: 100%
}		
/*h1{
	text-align: center; color: #333333; padding-top: 100px;
}*/
.cms-admin .header{
	height: 70px; border-bottom: 1px solid #B1B4B5; line-height: 70px; background-color: #333333;
}
.cms-admin .header .logo-admin{
	height: 100%; color: #FFFFFF; padding-left: 30px;
}
/*.login-box{
	width: 450px; margin: 100px auto;
}*/
.sign-in{
	text-align: left; border-bottom: 1px solid #C9C9C9; padding: 5px; margin: 10px;
}
.login-box{
	width: 598px; 
	height: 350px; 
	border: 1px solid #BCBCBC;
	border-radius: 5px;
	-moz-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.349019607843137);
	-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.349019607843137);
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.349019607843137);
	/*background: url(../../static/img/login-box.png) no-repeat; */
	position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -190px;
}
.demo-ruleForm{
	position: relative; top: 62px; left: 73px; width: 67%;
}	
.cms-admin .admin-foot{
	z-index: 9; background-color: #F2F2F2; height: 54px; line-height: 54px; text-align: center; position: fixed; bottom: 0px; width: 100%; border-top: 1px solid #E4E4E4;
}
</style>