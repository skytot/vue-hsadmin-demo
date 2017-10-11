<template>
	<section>		
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick1">
    <el-tab-pane label="用户管理" name="first"></el-tab-pane>
    <el-tab-pane label="修改密码" name="second"></el-tab-pane>
  </el-tabs>

	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label="right" label-width="100px" class="demo-ruleForm" style="margin-top: 35px;">
		<el-form-item prop="oldpwd" label="原密码" style="width:300px">
		    <el-input v-model="ruleForm.oldpwd" placeholder="请输入原密码" type="password"></el-input>
		</el-form-item>
		<el-form-item prop="newpwd" label="新密码" style="width:300px">
			<el-input v-model="ruleForm.newpwd" placeholder="请输入新密码" type="password"></el-input>
		</el-form-item>
		<el-form-item prop="repwd" label="重复新密码" style="width:300px">
			<el-input v-model="ruleForm.repwd" placeholder="请重复新密码" type="password"></el-input>
		</el-form-item>
		<el-form-item style="width:100%;">
			<el-button type="primary" style="width:250px;margin-left: 100px" @click.native.prevent="Submit" :loading="logining">提交</el-button>
			<!--<el-button @click.native.prevent="handleReset2">重置</el-button>
		-->
	</el-form-item>
	</el-form>
		
	</section>
</template>
<script type="text/javascript">
import { changePwd } from '../../api/api';
	export default {
		 data() {
	      return {
	      	activeName: 'second',
	      	labelPosition: 'right',
	        logining: false,
	        ruleForm: {
	          oldpwd: '',
	          newpwd: '',
	          repwd: '',
	        },
	        rules: {
	          oldpwd: [
	            { required: true, message: '请输入原密码', trigger: 'blur' },
	            //{ validator: validaePass }
	          ],
	          newpwd: [
	            { required: true, message: '请输入新密码(6-18位)', trigger: 'blur', min:6, max:18},
	          ],
	          repwd:[
		          { required: true, message: '请重复新密码(6-18位)', trigger: 'blur',min:6, max:18},
		        ]
	        },
	        checked: true
	      };
	    },
		methods: {
			handleClick1(event){
				this.$nextTick(_ => {
					if(event.name == 'first'){
					this.$router.push('/userinfo');
					}else{
						this.$router.push('/changepwd');
					}
				})	
			},	
			Submit(ev) {
		        var _this = this;
		        this.$refs.ruleForm.validate((valid) => {
		          if (valid) {
		          	if(this.ruleForm.newpwd !== this.ruleForm.repwd){
		          		this.$message.error("两次输入的密码不一致！")
		          	}else{
		          		this.logining = true;
			            var pwdParams = { old_password: this.ruleForm.oldpwd, password: this.ruleForm.newpwd, re_password: this.ruleForm.repwd };
			            changePwd(pwdParams).then(data => {
			              this.logining = false;
			              let { cod, msg, code, user } = data;
			              if (code == 1) {
			              	  this.$message({
			                  message: msg,
			                  type: 'success'
			                })   
			              }else{
			                this.$message({
			                  message: msg,
			                  type: 'error'
			                });      
			              }
			            });
		          	}  
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		      }	
		}
	}
</script>
<style scoped lang="scss">
	.tab{
		border-bottom: 1px solid #ccc;
		line-height: 40px;
		height:40px;
		.tab-line{
			height: 39px;
			line-height: 39px;
			font-size: 16px;
			text-align: center;	
			cursor: pointer;
			span{
				display: inline-block;
				color:#333;
				width: 100%;
				background-color: #efefef;
				border-bottom: 1px solid #ccc;
			}
		}
		.tab-line-active{		
			span{
				display:inline-block;
				width: 100%;
				border:1px solid #ccc;
				border-bottom: none;
				color:#20a0ff;
				background-color: #fff
			}
			
		}
	}
	.pwd{
		margin-top:20px;
		line-height: 40px;
		height:40px;
		font-size: 15px;
		.label{
			text-align: center;
		}
	}
</style>