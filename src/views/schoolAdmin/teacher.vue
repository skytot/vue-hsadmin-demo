<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="cname">
				<el-form-item>
					<el-input v-model="cname.name" placeholder="请输入导师名称"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-select  placeholder="选择状态" style="width:120px;" v-model="section">
						<el-option label="在职" value="0"></el-option>
						<el-option label="离职" value="1"></el-option>
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
							添加导师 <i class="el-icon-caret-bottom el-icon--right"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="addTel">添加导师</el-dropdown-item>
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
			<el-table-column prop="teacher_name" label="姓名">
			</el-table-column>
			<el-table-column prop="job_number" label="工号" sortable>
			</el-table-column>
			<el-table-column prop="phone_tel" label="手机号">
			</el-table-column>
			<el-table-column prop="cur_status" label="状态">
			</el-table-column>
			<el-table-column label="操作" width="300">
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
		<!-- 添加导师 -->
		<el-dialog title="添加导师" v-model="tels" :close-on-click-modal="false" size="tiny">
			<el-form ref="form" label-width="120px" style="padding:10px 30px">
				<el-form-item label="工号(用户名)：" required>
					<el-input v-model="form.job_number" style="max-width:217px"></el-input>
				</el-form-item>
				<el-form-item label="姓　　名：" required>
					 <el-input v-model="form.teacher_name" style="max-width:217px"></el-input>
				</el-form-item>	
				<el-form-item label="现任职务：">
					 生涯导师
				</el-form-item>	
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="tels= false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" >确定</el-button>
			</div>
		</el-dialog>
		<!-- 导入 -->
		<el-dialog title="添加导师" v-model="imp" :close-on-click-modal="false" size="tiny">
			<div class="import" v-loading="uploading">
				<el-button class="download" onclick="window.open('http://oupx1odj3.bkt.clouddn.com/%E7%94%9F%E6%B6%AF%E5%AF%BC%E5%B8%88%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls')">点击下载导师信息导入模板.xls</el-button>	
				<el-upload id="up" action="http://up-z2.qiniu.com" :data="postData" :before-upload="beforeUpload" :on-success="Success" :show-file-list=false > 
					<el-button class="download" style="margin:0">上传导师信息.xls</el-button>	
				</el-upload>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	import {teacherList, getSDK,removeClass,editClass,addClass,addTeacher,getDocSDK,dataUp} from '../../api/api';
	export default {
		data() {
			return {
				school_id:null,
				sels:[],
				tel:false,
				imp:false,
				tels:false,
				section:null,
				cname:{name:''},
				form:{
					job_number:'',
					teacher_name:'',
					school_id:null,
				},
				cls:[],
				total:null,
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
				addForm:{
					school_id:null,
					section_name:'高三',
					class_num:null,
				},
				addFormVisible:false,
				addLoading:false,
			}
		},
		methods: {	
			//获取用户列表
			getCls() {
				let para = {
					pageId: this.pages,
					pageSize:this.pageId,
					cur_status:this.section,
					teacher_name: this.cname.name,
					school_id:this.school_id,
				};
				this.listLoading = true;
				teacherList(para).then((res) => {
					this.total = res.data.total;
					this.cls = res.data.list;
					this.pageId = res.data.pageSize;
					this.listLoading = false;
				});
			},
			search(){
				this.getCls();
			},
			re(){
				this.section = null,
				this.cname.name = '',
				this.getCls();
			},
			addTel(){
				this.tels = true;
				this.form.job_number ='';
				this.form.teacher_name ='';
			},
			handleSizeChange(val) {
				this.pageId = val;
		        this.getCls();
		    },
		    importTel(){
		    	this.imp  = true;
		    },
		    handleCurrentChange(val) {
				this.pages = val;
				this.getCls();
			},
			Detail: function (index,row) {
				this.$router.push({path:'/telInfo',query:{id:row.user_id,tid:row.teacher_id}})
			},
			//新增
			addSubmit: function () {	
				let str1 = /^[^ ]+$/;//空白符和字符串，字符串
				let str2 = /^$| /;//空白符 
				let str3 = /^[A-Za-z0-9]{1,10}$/;
				this.form.school_id = this.school_id;
				if(str1.test(this.form.job_number) === false || str1.test(this.form.teacher_name) ===false){
					this.$message.error("提交失败，工号和姓名不能为空并且不能包含空格");
				}else if(this.form.job_number === '' || this.form.teacher_name === ''){
					this.$message.error("提交失败，工号和姓名不能为空并且不能包含空格");
				}else if(str3.test(this.form.job_number) === false){
					this.$message.error('提交失败,工号为1-10位英文数字组合')
				}else{
					let para = Object.assign({}, this.form);
					addTeacher(para).then((res) => {
						if(res.code === -1){
							this.$message.error(res.msg)
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.tels = false;
							this.getCls();
						}	
					})
				}
			},
			Success(res, file,) {
				file.url = 'http://' + this.url +'/'+ res.key;
				this.show = true;
				this.upFile = file;
				this.dis = false;
				let para ={tFile:file.url,type:2,school_id:this.school_id}
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
				        this.getCls();
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
			this.getCls();
		}
	}

</script>
<style scoped>
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