<template>
	<section>
	<el-tabs v-model="activeName" type="card">
		<el-tab-pane label="个人信息" name="1">
			<el-form ref="form" :model="data" label-width="125px" style="padding:10px 30px">
				<el-form-item >
					<img :src="data.pic_url" width="160px" height="160px"> <el-button  style="float: right;vertical-align: top;margin-right: 30px" size="large" @click="goback">返回</el-button><el-button type="primary" style="float: right;vertical-align: top;margin-right: 20px" size="large" @click="edit">修改信息</el-button>
				</el-form-item>
				<el-form-item label="姓　　名：">
					{{data.teacher_name}}
				</el-form-item>
				<el-form-item label="性　　别：">
					{{data.sex}}
				</el-form-item>
				<el-form-item label="手机　号：">
					{{data.phone_tel}}
				</el-form-item>
				<el-form-item label="国　　籍：">
					{{data.country_name}}
				</el-form-item>	
				<el-form-item label="民　　族：">
					{{data.nation}}
				</el-form-item>	
				<el-form-item label="籍　　贯：">
					{{data.native_place}}
				</el-form-item>	
				<el-form-item label="政治面貌：">
					{{data.political_status}}
				</el-form-item>	
				<el-form-item label="出生年月日：">
					{{data.born}}
				</el-form-item>	
				<el-form-item label="教　　龄：">
					{{data.seniority}}
				</el-form-item>	
				<el-form-item label="导师资格证编号：">
					{{data.qualification_number}}
				</el-form-item>	
				<el-form-item label="最高学历：">
					{{data.educational}}
				</el-form-item>	
				<el-form-item label="毕业学校：">
					{{data.graduate_school}}
				</el-form-item>	
				<el-form-item label="毕业专业：">
					{{data.graduate_major}}
				</el-form-item>	
				<el-form-item label="参加工作时间：">
					{{data.working_time}}
				</el-form-item>	
				<el-form-item label="工作经历：">
					{{data.work_experience}}
				</el-form-item>
				<el-form-item label="状　　态：">
					<el-button type="primary">{{data.status}}</el-button>
				</el-form-item>		
			</el-form>
		</el-tab-pane>
		<el-tab-pane label="在校信息" name="2">
			<el-form ref="form" :model="job" label-width="100px" style="padding:10px 30px">
				<el-form-item label-width="40px">
					 <el-button type="primary" style="float: right;vertical-align: top;margin-right: 30px" size="large" @click="editTel">修改信息</el-button> 
				</el-form-item>
				<el-form-item label="工　　号：">
				{{job.job_number}}
				</el-form-item>
				<el-form-item label="现任职务：">
				{{job.business_name}}
				</el-form-item>
				<el-form-item label="教学班级：">
					<el-button type="primary" v-for='item in job.class_name' :key="item.class_id">{{item.class_name}}</el-button>
				</el-form-item>
			</el-form>
		</el-tab-pane>
		<!-- <el-tab-pane label="教学档案" name="3">
		</el-tab-pane> -->
	</el-tabs>
	<!-- 个人信息 -->
	<el-dialog title="修改信息" v-model="tel" :close-on-click-modal="false" >
		<el-form ref="form" :model="form" label-width="125px" style="padding:10px 30px">
			<el-form-item label="教师头像：">
				<el-upload
				  id="avatar-uploader"
				  action="http://up-z2.qiniu.com"
				  :show-file-list="false"
				  :data="postData"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="form.pic_url" :src="form.pic_url" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="姓　　名：">
				{{form.teacher_name}}
			</el-form-item>
			<el-form-item label="性　　别：">
				<el-radio class="radio" v-model="form.gender" label="1">男</el-radio>
					<el-radio class="radio" v-model="form.gender" label="2">女</el-radio>
			</el-form-item>
			<el-form-item label="手机　号：">
				{{form.phone_tel}}
			</el-form-item>
			<el-form-item label="国　　籍：">
				<el-select v-model="form.country_id" filterable placeholder="请搜索或选择国籍">
				    <el-option
				      v-for="item in options"
				      :key="item.country_id"
				      :label="item.country_name"
				      :value="item.country_id">
				    </el-option>
				  </el-select>
			</el-form-item>	
			<el-form-item label="民　　族：">
				<el-input v-model="form.nation" style="max-width:317px"></el-input>
			</el-form-item>	
			<el-form-item label="籍　　贯：">
				<el-input v-model="form.native_place" style="max-width:317px"></el-input>
			</el-form-item>	
			<el-form-item label="政治面貌：">
				<el-input v-model="form.political_status"style="max-width:317px" ></el-input>
			</el-form-item>	
			<el-form-item label="出生年月日：">
				<el-date-picker
			      v-model="form.born"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions0" @change="dateChange1">
			    </el-date-picker>	
			</el-form-item>	
			<el-form-item label="教　　龄：">
				<el-input v-model="form.seniority" style="max-width:317px" type="number" min="0" max="100"></el-input> 年
			</el-form-item>	
			<el-form-item label="导师资格证编号：">
				<el-input v-model="form.qualification_number" style="max-width:317px"></el-input>
			</el-form-item>	
			<el-form-item label="最高学历：">
				 <el-select v-model="form.max_educational" placeholder="请选择学历">
				    <el-option value="0" label="博士">博士</el-option>
				    <el-option value="1" label="硕士">硕士</el-option>
				    <el-option value="2" label="研究生">研究生</el-option>
				    <el-option value="3" label="本科">本科</el-option>
				    <el-option value="4" label="专科">专科</el-option>
				    <el-option value="5" label="中专">中专</el-option>
				    <el-option value="6" label="高中">高中</el-option>
				  </el-select>
			</el-form-item>	
			<el-form-item label="毕业学校：">
				<el-input v-model="form.graduate_school" style="max-width:317px"></el-input>
			</el-form-item>	
			<el-form-item label="毕业专业：">
				<el-input v-model="form.graduate_major" style="max-width:317px"></el-input>
			</el-form-item>	
			<el-form-item label="参加工作时间：">
				<el-date-picker
			      v-model="form.working_time"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions0" @change="dateChange2">
			    </el-date-picker>
			</el-form-item>	
			<el-form-item label="工作经历：">
				<el-input type="textarea" v-model="form.work_experience" class="info culture" max-row="5"></el-input>
			</el-form-item>
			<el-form-item label="状　　态：">
				 <el-radio-group v-model="form.status">
				 	<el-radio-button label="在职"></el-radio-button>
				 	<el-radio-button label="离职"></el-radio-button>
				 </el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">提　　交</el-button>
				<el-button @click="back">返　　回</el-button>
			</el-form-item>		
		</el-form>
	</el-dialog>
	<!-- 在校信息 -->
	<el-dialog title="修改信息" v-model="inf" :close-on-click-modal="false" size="tiny" >
		<el-form ref="form" :model="infos" label-width="100px" style="padding:10px 30px">
			<el-form-item label="工　　号：" required>
				<el-input v-model="infos.job_number" style="max-width:200px"></el-input>　<el-button type="primary" @click.native="telSubmit" >提交</el-button>
			</el-form-item>	
			<el-form-item label="现任职务：">
				{{infos.business_name}}
			</el-form-item>
			<el-form-item label="教学班级：">
				<div><el-button type="primary" @click="add"><i class="el-icon-plus"></i> 添加班级</el-button></div>
				<el-tag
				  v-for="tag in infos.class_name"
				  :key="tag.class_name"
				  :id= "tag.id"
				  :closable="true"
				  @close="handleClose(tag)"
				>　{{tag.class_name}}
				</el-tag>　
			</el-form-item>	
		</el-form>
	</el-dialog>
	<!-- 添加班级 -->
	<el-dialog title="添加班级" v-model="cls" :close-on-click-modal="false" size="tiny">
		<el-form ref="form" label-width="100px" style="padding:10px 30px">
		<el-form-item label="教学班级：">
			 <el-radio-group v-model="radio" @change="change">
			    <el-radio-button label="高一"></el-radio-button>
			    <el-radio-button label="高二"></el-radio-button>
			    <el-radio-button label="高三"></el-radio-button>
			</el-radio-group>
		</el-form-item>
			<el-form-item label="教学班级：">
				 <el-select v-model="value1" placeholder="请选择班级">
				 	<el-option
					      v-for="item in option"
					      :key="item.class_id"
					      :label="item.class_name"
					      :value="item.class_id"></el-option>
				 </el-select>
			</el-form-item>	
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="cls= false">取消</el-button>
			<el-button type="primary" @click.native="selSubmit" >确定</el-button>
		</div>
	</el-dialog>
	 <el-dialog
	  title="提示"
	  :visible.sync="video"
	  size="tiny">
	 <div id="id_video_container" style="width:100%; height:auto;"></div>
	</el-dialog> 	
	<!-- <div id="id_video_container" style="display: none"></div> -->
	</section>
</template>
<script >
	import {teacherInfo,getImgSDK,qiniu,teacherUp,telJob,getClass,addTel,upJob,removeCls,country} from '../../api/api';
	export default {
		data() {
			return {
				video:false,
				activeName:'1',
				school_id:null,
				teacher_id:null,
				user_id:null,
				tel:false,
				job:{},
				radio:'高一',
				value1:'',
				tcid:'',
				inf:false,
				cls:false,
				infos:{},
				postData:{},
				form:{
					cur_status:'',	
				},
				option:[],
				options:[],
				value:'',
				data:{
					sex:'',
					status:'',
					educational:'',
				},
				pickerOptions0:{
					disabledDate(time) {   
			        }
				}
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.form.pic_url = qiniu +res.key;
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
			dateChange1(val){
            	this.form.born = val;
	        }, 
	        dateChange2(val){
	            this.form.working_time = val;
	        },
			getData(){
				let para = {
					school_id:this.school_id,
					user_id:this.user_id,
				};
				teacherInfo(para).then((res) => {
					this.data = res.data;
					if(this.data.gender === "1"){
						this.data.sex = '男'
					}else if(this.data.gender === "2"){
						this.data.sex = '女'
					};
					if(this.data.cur_status === 0){
						this.data.status = "在职"
					}else if(this.data.cur_status === 1){
						this.data.status = "离职"
					};
					if(this.data.max_educational === "0"){
						this.data.educational = "博士"
					}else if(this.data.max_educational === "1"){
						this.data.educational = "硕士"
					}else if(this.data.max_educational === "2"){
						this.data.educational = "研究生"
					}else if(this.data.max_educational === "3"){
						this.data.educational = "本科"
					}else if(this.data.max_educational === "4"){
						this.data.educational = "大专"
					}else if(this.data.max_educational === "5"){
						this.data.educational = "中专"
					}else if(this.data.max_educational === "6"){
						this.data.educational = "高中"
					};
				})
			},
			getJob(){
				let para ={user_id:this.user_id}
				telJob(para).then((res) => {
					this.job = res.data
				})
			},
			edit(){
				this.form = Object.assign({}, this.data);
				country().then((res) => {
					this.options = res.data
				});
				this.tel = true;
			},
			goback(){
				this.$router.push('/teacher');
			},
			editTel(){
				this.infos = Object.assign({}, this.job);
				this.inf = true;
			},
			 handleClose(tag) {
			 	this.$confirm('确认删除该班级吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let cid = tag.id;
					let classid = [];
					for(var i=0;i<this.infos.class_name.length;i++){
						classid[i] = this.infos.class_name[i].id;
					};
					classid.splice(classid.indexOf(cid),1);
					this.tcid =classid.toString();
					let para = {tcid:this.tcid,teacher_id:this.teacher_id}
					removeCls(para).then((res) => {
						this.$message({
							message: res.msg,
							type: 'success'
						});
					})
					this.infos.class_name.splice(this.infos.class_name.indexOf(tag), 1);
				}).catch(()=>{

				})    
		    },
			back(){
				this.tel = false;
			},
			add(){
				this.getCls();
				this.cls = true;
			},
			change(val){
				this.getCls(val);
			},
			getCls(){
				this.value1 = '';
				let se = null;
				if(this.radio ==="高一"){
					se = 4
				}else if(this.radio ==="高二"){
					se = 5
				}else if(this.radio ==="高三"){
					se = 6
				}
				let para = {school_id:this.school_id,section:se}
				getClass(para).then((res) => {
					this.option = res.data.list
				})
			},
			onSubmit(form){
				this.form.nationality = this.form.country_id;
				var fm = this.form;
				if(fm.status === "在职"){
					fm.cur_status = 0
				}else if(fm.status === "离职"){
					fm.cur_status = 1
				};
				let para = Object.assign({}, fm)
				teacherUp(para).then((res) => {
					if(res.code === -1){
						this.$message.error(res.msg);
					}else{
						this.$message({
						message: res.msg,
						type: 'success'
						});
						this.getData();
						this.tel = false;
					}	
				})
			},
			telSubmit(){
				let str1 = /^[^ ]+$/;//空白符和字符串，字符串
				let str2 = /^$| /;//空白符 
				let str3 = /^[A-Za-z0-9]{1,10}$/;
				if(str1.test(this.infos.job_number) === false){
					this.$message.error('提交失败,工号不能含有空格')
				}else if(str3.test(this.infos.job_number) === false){
					this.$message.error('提交失败,工号为1-10位英文数字组合')
				}else{
					let para ={job_number:this.infos.job_number,user_id:this.user_id}
					upJob(para).then((res) => {
						if(res.code === -1){
							this.$message.error(res.msg)
						}else{
							this.$message({
							message: res.msg,
							type: 'success'
							});
							this.getJob();
							this.inf = false;
						}
						
					})
				}
			},
			selSubmit(){
				let para = {school_id:this.school_id,teacher_id:this.teacher_id,class_id:this.value1};
				if(this.value1 === ''){
					this.$message.error('请选择班级');
				}else{
					addTel(para).then((res) => {
						if(res.code === -1){
							this.$message.error(res.msg);
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.cls = false;
							this.inf = false;
							this.getJob();
						}	
					})
				}
				
			},
		},
		mounted() {
			this.school_id = sessionStorage.getItem('school_id');
			this.user_id = this.$route.query.id;	
			this.teacher_id = this.$route.query.tid;	
			this.getData();
			this.getJob();
		}
	}
</script>
<style>
	.el-tag{margin-right: 10px}
</style>