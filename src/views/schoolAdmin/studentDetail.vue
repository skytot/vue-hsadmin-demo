<template>
	<section>
	<el-form ref="form" :model="data" label-width="125px" style="padding:10px 30px" :rules="rules">
				<el-form-item label="学生头像：">
				<el-upload
				  id="avatar-uploader"
				  action="http://up-z2.qiniu.com"
				  :show-file-list="false"
				  :data="postData"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="data.pic_url" :src="data.pic_url" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
				<el-form-item label="姓　　名：">
					<el-input v-model="data.realname" :disabled="true" style="max-width: 317px"></el-input >
				</el-form-item>
				<el-form-item label="性　　别：">
					<el-radio class="radio" v-model="data.gender" label="1">男</el-radio>
					<el-radio class="radio" v-model="data.gender" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="手机　号：" >
					<el-input v-model="data.phone_tel" :disabled="true" style="max-width: 317px"></el-input>
				</el-form-item>
				<el-form-item label="国　　籍：">
					<el-select v-model="data.country_id" filterable placeholder="请搜索或选择国籍">
				    <el-option
				      v-for="item in options"
				      :key="item.country_id"
				      :label="item.country_name"
				      :value="item.country_id">
				    </el-option>
				  </el-select>
				</el-form-item>	
				<el-form-item label="民　　族：">
					<el-input v-model="data.nation" style="max-width: 317px"></el-input>
				</el-form-item>	
				<el-form-item label="籍　　贯：">
					<el-input v-model="data.native_place" style="max-width: 317px"></el-input>
				</el-form-item>	
				<el-form-item label="政治面貌：">
					<el-input v-model="data.political" style="max-width: 317px"></el-input>
				</el-form-item>	
				<el-form-item label="出生年月日：">
					<el-date-picker
				      v-model="data.birthday"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions0" @change="dateChange1">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="入学时间：" required>
				    <el-date-picker type="date" placeholder="请选择日期" v-model="data.join_time" @change="dateChange2" :picker-options="pickerOptions0"></el-date-picker>
				</el-form-item>	
				<el-form-item label="学　　号：" prop="student_number">
					<el-input v-model="data.student_number" style="max-width: 317px"></el-input>
				</el-form-item>	
				<el-form-item label="当前年级：" required>
					<el-radio-group v-model="data.section_name" @change="change" :disabled="sec">
					    <el-radio-button label="高一"></el-radio-button>
					    <el-radio-button label="高二"></el-radio-button>
					    <el-radio-button label="高三"></el-radio-button>
					</el-radio-group>
				</el-form-item>	
				<el-form-item label="所在班级：" v-show="disabled" required>
					<el-select v-model="data.class_id" filterable placeholder="请选择班级">
					    <el-option
					      v-for="item in option"
					      :key="item.class_id"
					      :label="item.class_name"
					      :value="item.class_id">
					    </el-option>
				  	</el-select>
				</el-form-item>	
				<el-form-item label="状　　态：">
					<el-radio-group v-model="data.status" @change="sel">
					    <el-radio-button label="在校"></el-radio-button>
					    <el-radio-button label="离校"></el-radio-button>
					    <el-radio-button label="毕业"></el-radio-button>
					</el-radio-group>
				</el-form-item>	
				<el-form-item label="">
					<el-button @click.native="cls">取消</el-button>
					<el-button type="primary" @click.native="Submit" >保存</el-button>
				</el-form-item>		
			</el-form>

	</section>
</template>
<script>
	import {stuInfo,country,getClass,upStudent,getImgSDK,qiniu} from '../../api/api';
	export default {
		data() {
			return {
				activeName:"1",
				school_id:null,
				student_id:null,
				data:{
					birthday:'',
					join_time:'',
				},
				user_id:null,
				cid:null,
				disabled:true,
				sec:false,
				option:[],
				options:[],
				postData:{},
				rules:{
			        join_time: [
			             { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
			        ], 
				},
				pickerOptions0:{
					disabledDate(time) {
			        }
				},
			}
		},
		methods: {	
			//获取用户列表
			getData(){
				if(this.student_id !== 0){
					let para = {user_id:this.student_id};
					stuInfo(para).then((res) => {
						this.data = res.data;
						this.cid = this.data.class_id;
						if(this.data.gender === "1"){
							this.data.sex = '男'
						}else if(this.data.gender === "2"){
							this.data.sex = '女'
						};
						this.user_id = res.data.user_id	
					});
					country().then((res) => {
						this.options = res.data
					});
				}		
			},
			change(val){
				this.class(val);
			},
			sel(val){
				console.log(val);
				if(val === "离校"){
					this.disabled = false;
					this.sec = true;
					this.data.cur_status =3
				}else if(val === "毕业"){
					this.disabled = false;
					this.sec = true;
					this.data.cur_status =4
				}
				else {
					this.data.cur_status =0
					this.disabled = true;
					this.sec = false;
				}
			},
			class(val){
				let se = null;
				if (this.data.section_name ==="高一"){
					se = 4
				}else if(this.data.section_name ==="高二"){
					se = 5
				}else if(this.data.section_name ==="高三"){
					se = 6
				};
				if(se !== null){
					let para = {school_id:this.school_id,section:se,pageSize:100,}
					getClass(para).then((res) => {
						this.option = res.data.list;
						for(var i = 0;i<res.data.list.length;i++){
								if(res.data.list[i].class_id === this.cid){
									this.data.class_id = this.cid;
									this.cid = null;
									return;
								}else{
									this.data.class_id = null;
								}
						}		
					})
				}	
			},
			cls(){
				this.$confirm('未提交的数据将丢失，确认离开?', '提示', {
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					type: 'warning'
				}).then(() => {
					this.$router.push({path:'/studentInfo',query:{id:this.user_id}})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			dateChange1(val){
            	this.data.birthday = val;
	        }, 
	        dateChange2(val){
	            this.data.join_time = val;
	        },
	        handleAvatarSuccess(res, file) {
				this.data.pic_url = qiniu +res.key;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isPNG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 5;
				if(!isJPG  && !isPNG ){
					this.$message.error('上传格式错误，仅支持jpg、png');
					return false;
				}else if(!isLt2M){
					this.$message.error('上传图片大小不能超过 5MB!');
					return false;
				}
				else{
					return getImgSDK().then((res) => {
						this.postData = {token:res.uptoken};			
					});	
				}
			},
			Submit(){
				let str1 = /^[^ ]+$/;//空白符和字符串，字符串
				let str2 = /^$| /;//空白符 
				let str3 = /^[A-Za-z0-9]{1,18}$/
				this.$refs.form.validate((valid) => {
					if (valid) {	
						if(this.data.join_time === ''){
							this.$message.error('请选择入学时间')
						}else if(this.data.cur_status === 0&& this.data.class_id === null){
							this.$message.error('请选择班级')
						}else if(str1.test(this.data.realname) === false || str1.test(this.data.student_number) === false){
							this.$message.error("姓名、学号不能包含空格")
						}else if(str3.test(this.data.student_number) === false){
							this.$message.error("学号仅支持1-18位字母数字组合")
						}
						else{
							let para = Object.assign({},this.data)
							upStudent(para).then((res) => {
								if(res.code === -1){
									this.$message.error(res.msg)
								}else{
									this.$message({
										message: res.msg,
										type: 'success'
									});
									this.$router.push({path:'/studentInfo',query:{id:this.user_id}})
								}
							})
						}	
					} else {
						return false;
					}
				});
			},
		},
		mounted() {
			this.school_id = sessionStorage.getItem('school_id');
			this.student_id = this.$route.query.id;
			this.getData();	
		}
	}

</script>
<style >


</style>