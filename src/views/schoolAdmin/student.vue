<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="cname">
				<el-form-item>
					<el-input v-model="cname.name" placeholder="请输入学生名称"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-select  placeholder="选择年级" style="width:120px;" v-model="section1" @change="change1">
						<el-option label="高一" value="4"></el-option>
						<el-option label="高二" value="5"></el-option>
						<el-option label="高三" value="6"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select  placeholder="选择班级" style="width:120px;" v-model="section2">
						<el-option v-for="item in classList" :label="item.class_name" :value="item.class_id" :key="item.class_id"></el-option>	
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select  placeholder="选择状态" style="width:120px;" v-model="section3">
						<el-option label="在校" value="0"></el-option>
						<el-option label="离校" value="3"></el-option>
						<el-option label="毕业" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search"><i class="el-icon-search"></i> 查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button  v-on:click="re"><i class="el-icon-time"></i> 重置</el-button>
				</el-form-item>
				<el-form-item style="float: right">
					<el-dropdown>
						<el-button type="primary">
							添加学生 <i class="el-icon-caret-bottom el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="addTel">添加学生</el-dropdown-item>
							<el-dropdown-item @click.native="importTel">批量导入</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="cls" highlight-current-row v-loading="listLoading"  style="100%">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="pic_url" label="头像">
				<template scope="scope">
					<img :src='scope.row.pic_url' style="width:80px;height:80px;border-radius: 50%;padding:10px"></template>
			</el-table-column>
			<el-table-column prop="realname" label="姓名">
			</el-table-column>
			<el-table-column prop="class_name" label="班级">
			</el-table-column>
			<el-table-column prop="student_number" label="学号" sortable>
			</el-table-column>
			<el-table-column prop="parent_tel" label="家长手机号">
			</el-table-column>
			<el-table-column prop="cur_status" label="状态" :formatter="format">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="Detail(scope.$index, scope.row)"><i class="el-icon-view"></i> 查看</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		 <el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next" :page-sizes="[10, 20,30,40,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageId" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!-- 添加-->
		<el-dialog title="添加学生" v-model="tels" :close-on-click-modal="false" size="tiny">
			<el-form ref="form" label-width="120px" style="padding:10px 30px" v-model="data">
				<el-form-item label="姓　　名：" required>
					 <el-input v-model="data.realname" style="max-width:217px"></el-input>
				</el-form-item>	
				<el-form-item label="入学时间："required>
					  <el-date-picker type="date" placeholder="请选择入学日期" v-model="data.join_time" @change="dateChange" :picker-options="pickerOptions0"></el-date-picker>
				</el-form-item>	
				<el-form-item label="学号(用户名)："required>
					 <el-input v-model="data.student_number" style="max-width:217px"></el-input>
				</el-form-item>	
				<el-form-item label="当前年级：" required>
					 <el-radio-group v-model="data.section_name" @change="change">
					    <el-radio-button label="高一"></el-radio-button>
					    <el-radio-button label="高二"></el-radio-button>
					    <el-radio-button label="高三"></el-radio-button>
					</el-radio-group>
				</el-form-item>	
				<el-form-item label="所属班级："required>
					 <el-select v-model="data.class_id" filterable placeholder="请选择班级">
					    <el-option
					      v-for="item in option"
					      :key="item.class_id"
					      :label="item.class_name"
					      :value="item.class_id">
					    </el-option>
				  	</el-select>
				</el-form-item>	
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="tels= false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" >确定</el-button>
			</div>
		</el-dialog>
		<!-- 导入 -->
		<el-dialog title="添加学生" v-model="imp" :close-on-click-modal="false" size="tiny">
			<div class="import" v-loading="uploading">
				<el-button class="download" onclick="window.open('http://oupx1odj3.bkt.clouddn.com/%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls')">点击下载学生信息导入模板.xls</el-button>	
				<el-upload id="up" action="http://up-z2.qiniu.com" :data="postData" :before-upload="beforeUpload" :on-success="Success" :show-file-list=false > 
					<el-button class="download" style="margin:0">上传学生信息.xls</el-button>	
				</el-upload>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	import {getStudent, getSDK,removeClass,editClass,addClass,getDocSDK,dataUp,getClass,addStudent} from '../../api/api';
	export default {
		data() {
			return {
				school_id:null,
				sels:[],
				classList:[],
				tel:false,
				imp:false,
				section1:null,
				section2:null,
				section3:null,
				data:{
					realname:'',
					join_time:'',
					student_number:'',
					section_name:'',
					class_id:null,
					school_id:null,
				},
				cname:{name:''},
				form:{
					job_number:'',
					teacher_name:'',
					school_id:null,
				},
				cls:[],
				total:null,
				tels:false,
				page: 1,
				pageId:null,
				pages:null,
				listLoading: false,
				uploading:false,
				editForm:{},
				editFormVisible:false,
				editLoading:false,
				url:'',
				postData:{},
				upFile: [],
				option:[],
				addForm:{
					school_id:null,
					section_name:'高三',
					class_num:null,
				},
				addFormVisible:false,
				addLoading:false,
				pickerOptions0:{
					disabledDate(time) {
			            
			        }
				},
			}
		},
		methods: {	
			//获取用户列表
			format: function (row, column) {
				return row.cur_status == 0 ? '在校' : row.cur_status == 1 ? '已转班' : row.cur_status == 2 ? '已辍学': row.cur_status == 3 ? '已转校' : '已毕业';
			},
			getStu() {
				let para = {
					page_id: this.pages,
					content:this.cname.name,
					class_id:this.section2,
					page_size:this.pageId,
					section:this.section1,
					cur_status:this.section3,
					school_id:this.school_id,
				};
				this.listLoading = true;
				getStudent(para).then((res) => {
					this.total = res.data.total;
					this.cls = res.data.list;
					this.pageId = res.data.page_size;
					this.listLoading = false;
				});
			},
			change(val){
				this.class(val);
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
						if(res.data.list.length === 0){
							this.data.class_id = null
						}else{
							for(var i = 0;i<res.data.list.length;i++){
								if(res.data.list[i].class_id === this.cid){
									this.data.class_id = this.cid;
									this.cid = null;
									return;
								}else{
									this.data.class_id = null;
									return;
								}
							}
						}	
					})
				}	
			},
			dateChange(val){
	            this.data.join_time = val;
	        },
			change1(val){
				let para = {school_id:this.school_id,section:val,pageSize:100,}
				getClass(para).then((res) => {
					this.classList = res.data.list;
					this.section2 = null;
				})
			},
			search(){
				this.getStu();
			},
			re(){
				this.section1=null;
				this.section2=null;
				this.section3=null;
				this.cname.name = '';
				this.getStu();
			},
			addTel(){
				this.tels = true;
				this.data.realname = '';
				this.data.join_time = '';
				this.data.student_number = '';
				this.data.section_name = '';
			},
			handleSizeChange(val) {
				this.pageId = val;
		        this.getStu();
		    },
		    importTel(){
		    	this.imp  = true;
		    },
		    handleCurrentChange(val) {
				this.pages = val;
				this.getStu();
			},
			Detail: function (index,row) {
				this.$router.push({path:'/studentInfo',query:{id:row.user_id}})
			},
			//新增
			addSubmit: function () {	
				let str1 = /^[^ ]+$/;//空白符和字符串，字符串
				let str2 = /^$| /;//空白符 
				let str3 = /^[A-Za-z0-9]{1,18}$/;
				this.data.school_id = this.school_id;
				if(str1.test(this.data.realname) === false || str1.test(this.data.student_number) ===false){
					this.$message.error("提交失败，学号和姓名不能为空并且不能包含空格");
				}else if(this.data.realname === '' || this.data.student_number === ''){
					this.$message.error("提交失败，学号和姓名不能为空并且不能包含空格");
				}else if(str3.test(this.data.student_number) === false){
					this.$message.error("提交失败，学号仅支持1-18位字母数字组合");
				}else if(this.data.class_id === null){
					this.$message.error("请选择班级");
				}else if(this.data.join_time=== ''){
					this.$message.error("请选择入学时间");
				}
				else{
					let para = Object.assign({}, this.data);
					addStudent(para).then((res) => {
						if(res.code === -1){
							this.$message.error(res.msg)
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.tels = false;
							this.getStu();
						}	
					})
				}
			},
			Success(res, file,) {
				file.url = 'http://' + this.url +'/'+ res.key;
				this.show = true;
				this.upFile = file;
				this.dis = false;
				let para ={sFile:file.url,type:1,school_id:this.school_id}
				dataUp(para).then((res) => {
					if (res.code ===-1) {
						this.uploading = false;
						this.$notify.error({
				          	title: '错误',
				          	message: res.msg
				        });
					}else{
						this.uploading = false;
						this.imp = false;
						this.$notify({
				           	title: '成功',
				          	message: res.msg,
				          	type: 'success'
				        });
				        this.getStu();
					};	
				})	
			},
			Err(res) { //显示错误
				console.log(res)
			},
			beforeUpload(file, fileList) { //在图片提交前获取token			
				const xls = file.type === 'application/vnd.ms-excel';
				if (!xls) {
					this.$message.error('上传格式错误，仅支持xls');
					return false;
				} else {
					this.dis = true;
					return getDocSDK().then((res) => {
						this.postData = {'token': res.uptoken,'key': file.uid+file.name};		
						this.url = res.url;	
						this.uploading = true;
					});
				}
			},
		},
		mounted() {
			this.school_id = sessionStorage.getItem('school_id');	
			this.getStu();
		}
	}

</script>
<style >
.el-button{
	font-size: 14px
}
.import{
	width: auto;
	margin:0px 30px 40px;
}
.download{
	display: block;
	max-width: 350px;
	width: 100%;
	min-width: 200px;
	font-size: 18px;
	text-align: center;
	height: 75px;
	line-height: 50px;
	margin: 50px auto 0;
}
#up{
	margin:50px auto 0;
	max-width:350px;
}
#up .el-upload{

	width: 100%;
} 
</style>