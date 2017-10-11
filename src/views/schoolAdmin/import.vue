<template>
	<section>
	<el-tabs v-model="activeName" type="card">
		<el-tab-pane label="导师信息" name="1">
				<!--列表-->
			<el-table :data="data" highlight-current-row v-loading="listLoadings"  style="100%" @selection-change="selsChange">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="teacher_name" label="姓名">
				</el-table-column>
				<el-table-column prop="job_number" label="工号" sortable>
				</el-table-column>
				<el-table-column prop="business_name" label="职务" >
				</el-table-column>
				<el-table-column prop="addtime" label="导入时间">
				</el-table-column>
				<el-table-column prop="rem" label=" 错误提示" width="100" style="text-align: center;">
					<template scope="scope">
					<div style="text-align: center">
						<el-tooltip placement="top">
						  	<div slot="content">{{scope.row.rem}}</div>
						  	<i class="el-icon-warning" style="font-size: 18px;color: #f00"></i>
						</el-tooltip>
					</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="250">
					<template scope="scope">
						<el-button size="small" @click="Edit(scope.$index, scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
						<el-button type="danger" size="small" @click="Del(scope.$index, scope.row)"><i class="el-icon-delete"> 删除</i></el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			 <el-col :span="24" class="toolbar">
			 	<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
				<el-pagination layout="total, sizes, prev, pager, next" :page-sizes="[10, 20,30,40,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageId" :total="total" style="float:right;">
				</el-pagination>
			</el-col>
		</el-tab-pane>
		<el-tab-pane label="学生信息" name="2">
			<el-table :data="data1" highlight-current-row v-loading="listLoading"  style="100%" @selection-change="selsChange1">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="realname" label="姓名">
				</el-table-column>
				<el-table-column prop="student_number" label="学号" sortable>
				</el-table-column>
				<el-table-column prop="section_name" label="年级" >
				</el-table-column>
				<el-table-column prop="class_num" label="班级" >
				</el-table-column>
				<el-table-column prop="addtime" label="导入时间">
				</el-table-column>
				<el-table-column prop="rem" label=" 错误提示" width="100" style="text-align: center;">
					<template scope="scope">
					<div style="text-align: center">
						<el-tooltip placement="top">
						  	<div slot="content">{{scope.row.rem}}</div>
						  	<i class="el-icon-warning" style="font-size: 18px;color: #f00"></i>
						</el-tooltip>
					</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="250">
					<template scope="scope">
						<el-button size="small" @click="Edit1(scope.$index, scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
						<el-button type="danger" size="small" @click="Del1(scope.$index, scope.row)"><i class="el-icon-delete"> 删除</i></el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--工具条-->
			 <el-col :span="24" class="toolbar">
			 	<el-button type="danger" @click="batchRemove1" :disabled="this.sel.length===0">批量删除</el-button>
				<el-pagination layout="total, sizes, prev, pager, next" :page-sizes="[10, 20,30,40,50,100]" @current-change="handleCurrentChange1" @size-change="handleSizeChange1" :page-size="pageIds" :total="totals" style="float:right;">
				</el-pagination>
			</el-col>
		</el-tab-pane>
	</el-tabs>
	<!-- 修改导师 -->
		<el-dialog title="修改信息" v-model="tels" :close-on-click-modal="false" size="tiny">
			<el-form ref="form" v-model="form" label-width="120px" style="padding:10px 30px">
				<el-form-item label="工号(用户名)：" required>
					<el-input v-model="form.job_number" style="max-width:217px"></el-input>
				</el-form-item>
				<el-form-item label="姓　　名：" required>
					 <el-input v-model="form.teacher_name" style="max-width:217px"></el-input>
				</el-form-item>	
				<el-form-item label="现任职务：">
					 生涯导师
				</el-form-item>
				<el-form-item label="教学班级："required>
					 <span class="jxbj" v-for="item in form.class" :key ="item.class_id">{{item}}</span>
				</el-form-item>		
			</el-form>
			<div slot="footer" class="dialog-footer" >
				<el-button @click.native="tels= false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit"  v-if="cname">确定</el-button>
			</div>
		</el-dialog>
	<!-- 修改学生 -->
		<el-dialog title="修改信息" v-model="stu" :close-on-click-modal="false" size="tiny">
			<el-form ref="form" v-model="form1" label-width="120px" style="padding:10px 30px">
				
				<el-form-item label="姓　　名：" required>
					 <el-input v-model="form1.realname" style="max-width:217px"></el-input>
				</el-form-item>	
				<el-form-item label="入学时间：" required>
				    <el-date-picker type="date" placeholder="请选择日期" v-model="form1.join_time" @change="dateChange2" :picker-options="pickerOptions0"></el-date-picker>
				</el-form-item>	
				<el-form-item label="学　　号：" required>
					<el-input v-model="form1.student_number" style="max-width:217px"></el-input>
				</el-form-item>
				<el-form-item label="当前年级：" required>
					<el-radio-group v-model="form1.section_name" @change="change" >
					    <el-radio-button label="高一"></el-radio-button>
					    <el-radio-button label="高二"></el-radio-button>
					    <el-radio-button label="高三"></el-radio-button>
					</el-radio-group>
				</el-form-item>	
				<el-form-item label="所在班级："  required>
					<el-select v-model="form1.class_id" filterable placeholder="请选择班级" @change="changes">
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
				<el-button @click.native="stu= false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit1" >确定</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	import {importTel,delTel,importStu,delStu,getClass,addTelInfo,addStuInfo,} from '../../api/api';
	export default {
		data() {
			return {
				school_id:null,
				activeName:"1",
				tels:false,
				stu:false,
				total:null,
				totals:null,
				pageId:null,
				pageIds:null,
				pages:null,
				page: null,
				form:{},
				form1:{
					school_id:null,
				},
				data:[],
				cid:null,
				data1:[],
				sels:[],
				sel:[],
				option:[],
				listLoading:false,
				listLoadings:false,
				cname:false,
				pickerOptions0:{
					disabledDate(time) { 
			        }
				},
			}
		},
		methods: {
			getData() {
				let para = {
					page:this.pages,
					pagesize:this.pageId,
					school_id:this.school_id
				};
				importTel(para).then((res) => {
					this.data = res.data.list;
					this.total = res.data.total;
					this.pageId = res.data.pagesize;
				});
			},
			getStu() {
				let paras = {
					page:this.page,
					pagesize:this.pageIds,
					school_id:this.school_id
				};
				importStu(paras).then((res) => {
					this.data1 = res.data.list;
					this.totals = res.data.total;
					this.pageIds = res.data.pagesize;
					this.listLoadings = false;
				})
			},
			Edit(index,row) {
				this.tels = true;
				this.form = row;
				if (this.form.teach_class !== null) {
					this.form.class = this.form.teach_class.split(",");
					this.cname = true;
				}else{
					this.cname = false;
				}		
			},
			Edit1(index,row) {
				this.stu = true;
				this.form1 = row;
				this.option = [];
				this.class();
			},
			handleSizeChange(val) {
				this.pageId = val;
		        this.getData();
		    },
		    handleSizeChange1(val) {
				this.pageIds = val;
		        this.getStu();
		    },
		    handleCurrentChange(val) {
				this.pages = val;
				this.getData();
			},
			handleCurrentChange1(val) {
				this.page = val;
				this.getStu();
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			selsChange1: function (sels) {
				this.sel = sels;
			},
			 dateChange2(val){
	            this.form1.join_time = val;
	        },
			change(val){
				this.class(val);
			},
			changes(val){
				console.log(val)
			},
			class(val){
				let se = null;
				if (this.form1.section_name ==="高一"){
					se = 4
				}else if(this.form1.section_name ==="高二"){
					se = 5
				}else if(this.form1.section_name ==="高三"){
					se = 6
				};
				if(se !== null){
					let para = {school_id:this.school_id,section:se,pageSize:100,}
					getClass(para).then((res) => {
						this.option = res.data.list;
					})
				};
			},
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
					addTelInfo(para).then((res) => {
						if(res.code === -1){
							this.$message.error(res.msg)
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.tels = false;
							this.getData();
						}	
					})
				}
			},
			addSubmit1: function () {	
				let str1 = /^[^ ]+$/;//空白符和字符串，字符串
				let str2 = /^$| /;//空白符 
				let str3 = /^[A-Za-z0-9]{1,18}$/ 
				this.form1.school_id = this.school_id;
				if(this.form1.join_time === ''){
					this.$message.error('请选择入学时间')
				}else if(this.form1.class_id === null){
					this.$message.error('请选择班级')
				}else if(str1.test(this.form1.realname) === false || str1.test(this.form1.student_number) === false){
					this.$message.error("姓名、学号不能包含空格")
				}else if(str3.test(this.form1.student_number) === false){
					this.$message.error("学号仅支持1-18位字母数字组合")
				}else{
					let para = Object.assign({}, this.form1);
					addStuInfo(para).then((res) => {
						if(res.code === -1){
							this.$message.error(res.msg)
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.stu = false;
							this.getStu();
						}	
					})
				}
			},
			//删除
			Del: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					delTel(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: res.msg,
							type: 'info'
						});
						this.getData();
					});
				}).catch(() => {

				});
			},
			Del1: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoadings = true;
					//NProgress.start();
					let para = { id: row.id };
					delStu(para).then((res) => {
						this.listLoadings = false;
						//NProgress.done();
						this.$message({
							message: res.msg,
							type: 'info'
						});
						this.getStu();
					});
				}).catch(() => {

				});
			},
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {id: ids };
					delTel(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: res.msg,
							type: 'success'
						});
						this.getData();
					});
				}).catch(() => {

				});
			},
			batchRemove1: function () {
				var ids = this.sel.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {id: ids };
					delStu(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: res.msg,
							type: 'success'
						});
						this.getStu();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.school_id = sessionStorage.getItem('school_id');
			this.listLoadings = true;
			this.getStu();	
			this.getData();
			
		}
	}
</script>
<style>
	.jxbj{
		padding:0 10px;
		display: inline-block;
	}
</style>