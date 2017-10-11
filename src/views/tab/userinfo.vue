<template>
	<section>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="用户管理" name="first"></el-tab-pane>
			<el-tab-pane label="修改密码" name="second"></el-tab-pane>
		</el-tabs>
		<el-form :model="Form" ref="ruleForm" :label-position="labelPosition" label="right" label-width="100px" class="demo-ruleForm" style="margin-top: 35px;">
			<el-form-item prop="schname" label="学校名称" style="width:350px">
				<el-input v-model="Form.schname" placeholder=""  :disabled="true"></el-input>
			</el-form-item>
			<el-form-item  label="用户名称" style="width:350px">
				<el-input v-model="Form.uname" placeholder=""  :disabled="true" style="margin-right: 10px"></el-input>
			</el-form-item>
			<el-form-item  label="联系人" style="width:350px">
				<el-input v-model="Form.real_name" placeholder=""  :disabled="true" style="margin-right: 10px"></el-input>
			</el-form-item>
			<el-form-item  label="在校职务" style="width:350px">
				<el-input v-model="Form.duties" placeholder=""  :disabled="true" style="margin-right: 10px"></el-input>
			</el-form-item>
			<el-form-item  label="绑定手机" style="width:550px">
				<el-input v-model="Form.tel" placeholder=""  :disabled="true" style="margin-right: 10px; width: 250px"></el-input>
				<el-button type="primary" style="width:110px" @click="open2">{{message1}}</el-button>
			</el-form-item>
			<el-form-item  label="绑定邮箱" style="width:350px">
				<el-input v-model="Form.email" placeholder=""  :disabled="true" style="margin-right: 10px"></el-input>
			</el-form-item>
			<el-form-item  label="" style="width:350px">
				<el-button type="primary" @click="change">修改信息</el-button>
			</el-form-item>
		</el-form>
	<!-- 修改手机 -->
		<el-dialog title="手机绑定" v-model="tel" :close-on-click-modal="false" size="tiny" :before-close="cls">
			<el-form ref="forms" label-width="120px" style="padding:10px 30px" v-model="form1">

				<el-form-item label="手机绑定：" required>
					<el-input placeholder="请输入手机号" v-model="form1.phone_tel" style="max-width: 228px">
						<el-button slot="append"  @click="yzm1" :disabled="cod">{{message}}</el-button>
					</el-input>
				</el-form-item>
				<el-form-item label="验证码："required>
					<el-input v-model="form1.code"  style="max-width:228px"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cls">取消</el-button>
				<el-button type="primary" @click.native="addSubmit1" >确定</el-button>
			</div>
		</el-dialog>
		<!-- 修改基本信息 -->
		<el-dialog title="修改基本信息" v-model="tel2" :close-on-click-modal="false" size="tiny">
			<el-form ref="formss" label-width="120px" style="padding:10px 30px" v-model="form2">
				<el-form-item label="联系人：" required>
					<el-input placeholder="请输入联系人姓名" v-model="form2.real_name" style="max-width: 228px">
					</el-input>
				</el-form-item>
				<el-form-item label="在校职务：" required>
					<el-input v-model="form2.duties"  style="max-width:228px"></el-input>
				</el-form-item>
				<el-form-item label="绑定邮箱：" required>
					<el-input v-model="form2.email"  style="max-width:228px"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="tel2 = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit2()" >确定</el-button>
			</div>
		</el-dialog>
</section>
</template>
<script type="text/javascript">
import {saveMobile,sendCode,adminUpdate} from '../../api/api';
	export default {
		data() {
			var checkEmail = (rule, value, callback) => {
				let str = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
				if (!value) {
		          return callback(new Error('邮箱不能为空'));
		        }else if(str.test(value) === false){
		        	return callback(new Error('邮箱格式有误'));
		        }else{
		        	callback;
		        }
			};
			return {
				activeName: 'first',
				labelPosition: 'right',
				logining: false,
				user_id:null,
				num:60,
				tel:false,
				tel2:false,
				Form: {
					schname: '',
					uname: '',
					tel: '',
				},
				form1:{
					phone_tel:'',
					code:'',
				},
				form2:{
				},	
				cod:false,
				message:'发送验证码',
				message1:'绑定手机',
			};
		},
	methods: {
		handleClick(event) {
			this.$nextTick(_ => {
				if (event.name == 'second') {
				this.$router.push('/changepwd');
				} else {
					this.$router.push('/userinfo');
				}
			})	
		},
		open1() {
			this.$prompt('修改用户名', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputErrorMessage: '格式不正确'
			}).then(({
				value
			}) => {
				this.$message({
					type: 'success',
					message: '你的用户名是: ' + value
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消修改'
				});
			});
		},
		open2() {
			this.tel = true;
		},
		cls(done){
			this.form1 = {
				phone_tel:'',
				code:'',
			};
			this.tel = false;
		},
		yzm1(){		
			let str1 = /^1(3|4|5|7|8)\d{9}$/;
			if(str1.test(this.form1.phone_tel) === false){
				this.$message.error('手机号码有误，请输入正确的11位手机号码')
			}else{
				this.cod = true;
				if(this.num !=  0){
					let _this = this;
					let timer = window.setInterval(function() {
			            if (_this.num >= 1) {
			                _this.num--;
			                _this.message = "重新发送(" + _this.num + "s)";
			            }else{
			            	_this.cod = false;
							_this.message ="发送验证码";
							_this.num = 60;
			            	window.clearInterval(timer);   	
			            }
			        }, 1000);
				}else{
					this.cod = false;
					this.message ="发送验证码"
				}
				this.message = "重新发送(" + this.num + "s)";	
				let para = {mobile:this.form1.phone_tel};
				sendCode(para).then((res) => {
					if(res.code === -1){
						this.$message.error(res.msg)
					}else{
					}		
				})
			}
		},
		addSubmit1(){
				let str1 = /^1(3|4|5|7|8)\d{9}$/;
				if(this.form1.phone_tel === ''){
					this.$message.error('请填写家长手机号')
				}else if(str1.test(this.form1.phone_tel) === false){
					this.$message.error('手机号码有误，请输入正确的11位手机号码')
				}else if(this.form1.code === ''){
					this.$message.error('请填写验证码')
				}else{
					let para = {phone_tel:this.form1.phone_tel,code:this.form1.code,user_id:this.user_id}
					saveMobile(para).then((res) => {
						if(res.code === -1){
							this.$message.error(res.msg)
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});		
							this.tel = false,
							this.Form.tel = res.data;
							sessionStorage.setItem('phone_tel',res.data);
							this.message1='更换手机';
							this.form1 = {
								phone_tel:'',
								code:'',
							}; 
						}
					})
				}
			},
			change(){
				this.form2 = Object.assign({},this.Form);
				this.tel2= true;
			},
			addSubmit2(formname){
				let str = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
			     if (this.form2.real_name === ''|| this.form2.duties==='' || this.form2.email === '') {
			     	this.$message.error('请填写必填项')
			     }else if(str.test(this.form2.email) === false){
			     	this.$message.error('邮箱有误')
			     }else{
			     	let para = Object.assign({},this.form2)
						adminUpdate(para).then((res) => {
							if(res.code === -1){
								this.$message.error(res.msg)
							}else{
								this.$message({
									message: res.msg,
									type: 'success'
								});
								this.Form.real_name = para.real_name;
								this.Form.email = para.email;
								this.Form.duties = para.duties;
								this.tel2 = false;	
							}
					})
			     }	      
			},
	},
	mounted() {
		var user = sessionStorage.getItem('user');
		this.Form.tel =  sessionStorage.getItem('phone_tel');
		if(this.Form.tel !== ''){
			this.message1 = '更换手机'
		}
		if (user) {
			user = JSON.parse(user);
			this.Form.schname = user.school_name || '';
			this.Form.uname = user.user_name || '';
			this.Form.real_name = user.real_name || '';
			this.Form.email = user.email || '';
			this.Form.duties = user.duties || '';
			this.user_id = user.user_id || '';
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
</style>