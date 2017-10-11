<template>
	<section>
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane label="班级信息" name="1">
				<el-form ref="form" :model="form" label-width="100px" style="padding:10px 30px" >
					<el-form-item label="班　　级">
						{{form.class_name}}
					</el-form-item>
					<el-form-item label="所属年级">
						{{form.section_name}}
					</el-form-item>	
					<el-form-item label="班级人数">
						{{form.student_count}}
					</el-form-item>
					<el-form-item label="生涯导师">
						<span class="tels" v-for="item in teacher">{{item.teacher_name}}</span>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="班级导师" name="2">
				<div class="selTeacher" style="text-align: right"><el-button type="primary" @click="selTeacher"  ><i class="el-icon-plus"></i> 选择导师</el-button></div>
				<ul class="teacher">
					<li v-if="teacher.length === 0" style="height:100px;line-height: 100px;text-align: center;font-size: 18px;color: #bbb">
	 					未找到相关信息
	 				</li>
					<li v-for="item in teacher">
						<div class="left">
							<img :src="item.pic_url">					
							<span>{{item.teacher_name}}</span>
						</div>
						<div class="right">
							<div class="zw">职　务：{{item.business_name}}</div>
							<div>
								<span class="cz">
									<el-button  @click="telInfo(item)"> <i class="el-icon-view"></i>　查看
									</el-button>
									<el-button type="danger"  @click="delTel(item)"> <i class="el-icon-delete"></i>　删除
									</el-button>
								</span>
								<span class="tel">手机号：{{item.phone_tel}}</span>
							</div>
						</div>
					</li>
				</ul>
			</el-tab-pane>
			<el-tab-pane label="班级学生" name="3">
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="cname">
						<el-form-item>
							<el-input v-model="cname.name" placeholder="请输入学生姓名"></el-input>
						</el-form-item>
						<el-form-item>
							<el-select  placeholder="选择性别" style="width:120px;" v-model="section">
								<el-option label="全部性别" value="0"></el-option>
								<el-option label="男" value="1"></el-option>
								<el-option label="女" value="2"></el-option>	
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" v-on:click="search"><i class="el-icon-search"></i> 查询</el-button>
						</el-form-item>
						<el-form-item style="float: right">
							<el-button type="primary" @click="stuAdd"  ><i class="el-icon-plus"></i> 添加学生</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				
				<!-- 列表 -->
				<el-table :data="stuList" highlight-current-row v-loading="listLoading" style="100%">
					<el-table-column type="index" width="60">
					</el-table-column>
					<el-table-column prop="student_number" label="学号">
					</el-table-column>
					<el-table-column prop="realname" label="姓名">
					</el-table-column>
					<el-table-column prop="gender" label="性别" :formatter="formatSex">
					</el-table-column>
					<el-table-column prop="parent_phone" label="家长手机号" >
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template scope="scope" >
							<el-button @click="stuDetail(scope.$index, scope.row)"><i class="el-icon-view"></i> 查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				
				<!-- 工具条 -->
				 <el-col :span="24" class="toolbar">
					<el-pagination layout="total, sizes, prev, pager, next" :page-sizes="[10, 20,30,40,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageId" :total="total" style="float:right;">
					</el-pagination>
				</el-col>
			</el-tab-pane> 
		</el-tabs>

		<!-- 查看教师 -->
		<el-dialog title="教师详情" v-model="tel" :close-on-click-modal="false" size="tiny">
			<el-card class="box-card">
				<div slot="header" class="clearfix" style="text-align: center;" >
					<img :src="telForm.pic_url" style="margin:0 auto;display:block;width:200px;height:200px;border-radius: 50%;text-align: center;">
					<span style="line-height: 50px;font-size: 18px;text-align: center;display:block">{{telForm.teacher_name}}</span>
				</div>
				<div class="lit"><span>工　　号：</span>{{telForm.job_number}}</div>
				<div class="lit"><span>职　　务：</span>{{telForm.business_name}}</div>
				<div class="lit"><span>性　　别：</span>{{telForm.sex}}</div>
				<div class="lit"><span>手机号码：</span>{{telForm.phone_tel}}</div>
			</el-card>
			<div style="text-align: center;margin-top: 10px"> <el-button :plain="true" type="info" @click="more(telForm.user_id,telForm.teacher_id)">查看更多</el-button></div>
		</el-dialog>
		<!-- 添加导师 -->
		<el-dialog title="添加导师" v-model="sel" :close-on-click-modal="false" >
			 <el-table
			    :data="telData"
			    border
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			 	<el-table-column
			      type="selection"
			      width="55"></el-table-column>
			 	<el-table-column
			 		prop="img"    
			      label="头像"
			      width="120"><template scope="scope">
					<img :src='scope.row.pic_url' style="width:80px;height:80px;border-radius: 50%;padding:10px"></template></el-table-column>
			 	<el-table-column
			      prop="teacher_name"
			      label="姓名"
			      show-overflow-tooltip></el-table-column>
			 	<el-table-column
			      prop="phone_tel"
			      label="手机号"
			      show-overflow-tooltip></el-table-column>
			 </el-table>
			 	<div slot="footer" class="dialog-footer">
				<el-button @click.native="sel = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog>
		<!-- 查看学生 -->
		<el-dialog title="学生详情" v-model="stuVisiable" :close-on-click-modal="false" size="tiny">
			<el-card class="box-card">
				<div slot="header" class="clearfix" style="text-align: center;" >
					<img :src="stu.pic_url" style="margin:0 auto;display:block;width:200px;height:200px;border-radius: 50%;text-align: center;">
					<span style="line-height: 50px;font-size: 18px;text-align: center;display:block">{{stu.realname}}</span>
				</div>
				<div class="lit"><span>学　　号：</span>{{stu.student_number}}</div>
				<div class="lit"><span>性　　别：</span>{{stu.sex}}</div>
				<div class="lit"><span>手机号码：</span>{{stu.phone_tel}}</div>
				<div class="lit"><span>所在班级：</span>{{form.class_name}}</div>
			</el-card>
			<div style="text-align: center;margin-top: 10px"> <el-button :plain="true" type="info" @click="mores(stu.user_id)">查看更多</el-button></div>
		</el-dialog>
		<!-- 添加学生 -->
		<el-dialog title="添加学生" v-model="addVisiable" :close-on-click-modal="false" size="tiny">
			<el-form :model="addStu" label-width="150px" :rules="rules" ref="addForm">
				<el-form-item label="姓　　名" prop="realname">
					<el-input v-model="addStu.realname" style="width:193px" ></el-input>
				</el-form-item>
				<el-form-item label="入学时间" prop="join_time">
				    <el-date-picker
				      v-model="addStu.join_time"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions">
				    </el-date-picker>
				</el-form-item>	
				<el-form-item label="学号(用户名)" prop="student_number">
					<el-input v-model="addStu.student_number" style="width:193px" ></el-input>
				</el-form-item>
				<el-form-item label="所属年级" required>
					<el-radio-group v-model="addStu.section_name" >
					    <el-radio-button label="高一" :disabled="addStu.section1"></el-radio-button>
					    <el-radio-button label="高二" :disabled="addStu.section2"></el-radio-button>
					    <el-radio-button label="高三" :disabled="addStu.section3"></el-radio-button>
					</el-radio-group>	
				</el-form-item>	
				<el-form-item label="所属班级" required>
					{{addStu.class_name}}
				</el-form-item>	
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addVisiable = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmits">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script >
	import {classs,teacher,student,delTeacher,telList,addTel,addStu} from '../../api/api';
	export default {
		data() {
			return {
				multipleSelection:[],
				cname:{naem:''},
				school_id:null,
				activeName:'1',
				class_id:null,
				form:{},
				tel:false,
				sel:false,
				teacher:{},
				telData:[],
				student:{},
				telForm:{
					type:'',
					attr:'',
					sex:'',
					educational:'',
				},
				sels:[],
				section:"0",
				cname:{name:''},
				stuList:[],
				stu:{
					sex:'',
				},
				stuVisiable:false,
				addVisiable:false,
				total:null,
				page: 1,
				pageId:null,
				pages:null,
				listLoading: false,
				editForm:{},
				editFormVisible:false,
				editLoading:false,
				addForm:{
					school_id:null,
					section_name:'高三',
					class_num:null,
				},
				addFormVisible:false,
				addLoading:false,
				addStu:{
					class_id:null,
					realname:'',
					join_time:'',
					student_number:'',
					class_id:null,
					class_name:'',
					section_name:'',
					school_id:null,
					section1:false,	
					section2:false,	
					section3:false,	
				},
				pickerOptions: {
		          disabledDate(time) {
		            return time.getTime() >= Date.now() - 8.64e7;
		          }
		        },
		        rules:{
		        	realname:[ { required: true, message: '请输入学生姓名', trigger: 'blur' },],
		        	join_time:[ { type: 'date', required: true, message: '请选择入学时间', trigger: 'change' },],
		        	student_number:[ { required: true, message: '请输入学生学号', trigger: 'blur' },],
		        }
			}
		},	
		methods: {
			getData() {
				let para = {school_id:this.school_id,class_id:this.class_id};
				classs(para).then((res) => {
					this.form = res.data;	
				});
				teacher(para).then((res) => {
					this.teacher = res.data;
				});
				this.getStu()
			},
			getStu(){
				let paras = {school_id:this.school_id,class_id:this.class_id,content:this.cname.name,page_id:this.pages,page_size:this.pageId,gender:this.section}
				student(paras).then((res) => {
					this.student = res.data;
					this.stuList = res.data.list;
					this.total = res.data.total;
				})
			},
			selTeacher(){
				let para = {class_id:this.class_id,school_id:this.school_id}
				telList(para).then((res) => {
					this.telData = res.data;
					this.sel = true;
				})
			},
			telInfo(e){
				this.telForm = Object.assign({},e);
				if(this.telForm.gender === "0"){
					this.telForm.sex = "保密"
				}else if(this.telForm.gender === "1"){
					this.telForm.sex = "男"
				}else if(this.telForm.gender === "2"){
					this.telForm.sex = "女"
				};
				if(this.telForm.max_educational === 0){
					this.telForm.educational = '博士'
				}else if(this.telForm.max_educational === 1){
					this.telForm.educational = '硕士'
				}else if(this.telForm.max_educational === 2){
					this.telForm.educational = '研究生'
				}else if(this.telForm.max_educational === 3){
					this.telForm.educational = '本科'
				}else if(this.telForm.max_educational === 4){
					this.telForm.educational = '大专'
				}else if(this.telForm.max_educational === 5){
					this.telForm.educational = '中专'
				}else if(this.telForm.max_educational === 6){
					this.telForm.educational = '高中'
				};
				if(this.telForm.station_type === 0){
					this.telForm.type = '行政岗'
				}else if(this.telForm.station_type === 1){
					this.telForm.type = '教学岗'
				}else if(this.telForm.station_type === 2){
					this.telForm.type = '职员岗'
				};
				if(this.telForm.station_attr === 0){
					this.telForm.attr = '编内'
				}else if(this.telForm.station_attr === 1){
					this.telForm.attr = '编外'
				}else if(this.telForm.station_attr === 2){
					this.telForm.attr = '合同'
				}else if(this.telForm.station_attr === 3){
					this.telForm.attr = '临时'
				};
				this.tel = true;
			},
			delTel(e){
				let para = {class_id:this.class_id,id:e.id}
				delTeacher(para).then((res) => {
					if (res.code === -1) {
						this.$message.error(res.msg);
					}else{
						this.$message({
							message: res.msg,
							type: 'success'
						});
						this.getData();
						this.activeName = "2";
					};	
				})
			},
			handleSelectionChange(val) {
	        	this.multipleSelection = val;
	     	},
	     	addSubmit(){
	     		let id=[];
	     		let ids = this.multipleSelection;
	     		for(var i=0;i<ids.length;i++){
	     			id[i] = ids[i].teacher_id;
	     		};
	     		let tid = id.toString();
	     		let para = {teacher_id:tid,school_id:this.school_id,class_id:this.class_id}
	     		if(id.length === 0){
	     			this.$message.error("请勾选要添加的导师");
	     		}else{
	     			addTel(para).then((res) => {
		     			this.$message({
							message: res.msg,
							type: 'success'
						});
						this.sel = false;
						this.getData();
						this.activeName = "2";
		     		})
	     		}
	     	},
	     	more(e,i){
	     		this.$router.push({path:'/telInfo',query:{id:e,tid:i}})
	     	},
	     	mores(e){
	     		this.$router.push({path:'/studentInfo',query:{id:e}})
	     	},
	     	//获取用户列表
	     	formatSex: function (row, column) {
				return row.gender == 1 ? '男' : row.gender == 2 ? '女' : '';
			},		
			search(){
				this.getStu();
			},
			handleSizeChange(val) {
				this.pageId = val;
		        this.getStu();
		    },
		    handleCurrentChange(val) {
				this.pages = val;
				this.getStu();
			},
			//新增
			stuAdd(){
				this.addVisiable = true;
				this.addStu.realname = '';
				this.addStu.join_time = '';
				this.addStu.student_number = '';
				this.addStu.class_id = this.form.class_id;
				this.addStu.class_name = this.form.class_name;
				this.addStu.section_name = this.form.section_name;
				this.addStu.school_id= this.school_id;
				if(this.addStu.section_name ==="高三"){
					this.addStu.section1 = true;
					this.addStu.section2 = true;
				}else if(this.addStu.section_name ==="高二"){
					this.addStu.section1 = true;
					this.addStu.section3 = true;
				}else if(this.addStu.section_name ==="高一"){
					this.addStu.section2 = true;
					this.addStu.section3 = true;
				};
			},
			stuDetail(index,row){
				this.stu = row;
				this.stuVisiable = true;
				if(this.stu.gender === "0"){
					this.stu.sex = "保密"
				}else if(this.stu.gender === "1"){
					this.stu.sex = "男"
				}else if(this.stu.gender === "2"){
					this.stu.sex = "女"
				};
			},
			addSubmits: function () {	
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						let para = this.addStu;
						addStu(para).then((res) => {
							if(res.code === -1){
								this.$message.error(res.msg)
							}else{
								this.$message({
									message: res.msg,
									type: 'success'
								});
								this.$refs.addForm.resetFields();
								this.getData();
								this.addVisiable = false;
							}
						})
					}
				})
			},	
		},
		mounted() {
			this.school_id = sessionStorage.getItem('school_id');
			this.class_id = this.$route.query.id;
			this.getData();				
		}
	}
</script>
<style >
	.tels{
		padding:1px 15px;
	  	border-radius: 15px;
	  	margin-bottom: 10px;
	  	line-height: 30px;
	  	background-color: #20a0ff;
  		color:#FFF;
  		display: inline-block;
	  	margin-right: 20px;
	}
	.teacher{
		overflow: hidden;
		margin:10px 20px;
	}
	.teacher li{
		margin-top: 20px;
		overflow: hidden;
		list-style: none;
	}
	.left{
		float: left;
		width: 180px;
		border:1px solid #ddd;
	}
	.left img{
		display: block;
		width: 110px;
		height: 110px;
		text-align: center;
		line-height: 110px;
		border-radius: 50%;
		overflow:hidden;
		margin: 20px 35px 10px;
	}
	.left span{
		font-size: 18px;
		color: #333;
		height: 40px;
		line-height: 40px;
		text-align: center;
		display: block;
	}
	.right{
		float: right;
		width: calc(100% - 260px);
		border:1px solid #ddd;
		padding: 40px 20px;	
	}
	.right .zw{
		font-size: 18px;
		line-height: 60px;
	}
	.right .tel{
		font-size: 18px;
		line-height: 40px;
		display: inline-block;
	}
	.right .cz{
		float: right;
		display: inline-block;
		text-align: right;
		min-width: 200px
	}
	.lit{
		line-height: 35px;
		font-size: 16px;
		color: #222
	}
</style>