<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="cname">
				<el-form-item>
					<el-input v-model="cname.name" placeholder="请输入班级名称"></el-input>
				</el-form-item>
			
				<el-form-item>
					<el-select  placeholder="选择年级" style="width:120px;" v-model="section">
						<el-option label="初一" value="1"></el-option>
						<el-option label="初二" value="2"></el-option>
						<el-option label="初三" value="3"></el-option>
						<el-option label="高一" value="4"></el-option>
						<el-option label="高二" value="5"></el-option>
						<el-option label="高三" value="6"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search"><i class="el-icon-search"></i> 查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button  v-on:click="re"><i class="el-icon-time"></i> 重置</el-button>
				</el-form-item>
				<el-form-item style="float: right">
					<el-button type="primary" @click="classAdd"  ><i class="el-icon-plus"></i> 添加班级</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="cls" highlight-current-row v-loading="listLoading"  @selection-change="selsChange" style="100%">
			<el-table-column type="selection" width="50">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="section_name" label="年级">
			</el-table-column>
			<el-table-column prop="class_name" label="班级">
			</el-table-column>
			<el-table-column prop="student_count" label="班级人数" sortable>
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template scope="scope">
					<el-button size="small" @click="classDetail(scope.$index, scope.row)"><i class="el-icon-view"></i> 查看</el-button>
					<el-button size="small" @click="classEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>
					<el-button type="danger" size="small" @click="classDel(scope.$index, scope.row)"><i class="el-icon-delete"> 删除</i></el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		 <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="total, sizes, prev, pager, next" :page-sizes="[10, 20,30,40,50,100]" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageId" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<el-dialog title="编辑班级" v-model="editFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="editForm" label-width="150px" ref="editForm">
				<el-form-item label="班　　号" prop="class_num" required>
					<el-input v-model="editForm.class_num" style="width:180px" type="number" min="1" max="100"></el-input>
				</el-form-item>
				<el-form-item label="所属年级" required>
					 <el-radio-group v-model="editForm.section_name">
					    <el-radio-button label="高一"></el-radio-button>
					    <el-radio-button label="高二"></el-radio-button>
					    <el-radio-button label="高三"></el-radio-button>
					  </el-radio-group>
				</el-form-item>			
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增班级" v-model="addFormVisible" :close-on-click-modal="false" size="tiny">
			<el-form :model="addForm" label-width="150px">
				<el-form-item label="班　　号" required>
					<el-input v-model="addForm.class_num" style="width:180px" type="number" min="1" max="99"></el-input>
				</el-form-item>
				<el-form-item label="所属年级" required>
					 <el-radio-group v-model="addForm.section_name">
					    <el-radio-button label="高一"></el-radio-button>
					    <el-radio-button label="高二"></el-radio-button>
					    <el-radio-button label="高三"></el-radio-button>
					  </el-radio-group>
				</el-form-item>			
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog> 
	</section>
</template>

<script>
	import {getClass, getSDK,removeClass,editClass,addClass} from '../../api/api';

	export default {
		data() {
			return {
				school_id:null,
				sels:[],
				section:null,
				cname:{name:''},
				cls:[],
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
			}
		},
		methods: {	
			//获取用户列表
			getCls() {
				let para = {
					pageId: this.pages,
					pageSize:this.pageId,
					section:this.section,
					content: this.cname.name,
					school_id:this.school_id,
				};
				this.listLoading = true;
				getClass(para).then((res) => {
					this.total = res.data.total;
					this.cls = res.data.list;
					this.pageId = res.data.page_size;
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
			handleSizeChange(val) {
				this.pageId = val;
		        this.getCls();
		    },
		    handleCurrentChange(val) {
				this.pages = val;
				this.getCls();
			},
			//删除
			classDel: function (index, row) {
				this.$confirm('确认删除该班级吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { class_id: row.class_id };
					removeClass(para).then((res) => {
						this.listLoading = false;
						if (res.code === -1) {
							this.$message.error(res.msg)
						}else{
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getCls();
						};
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			classEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			classAdd: function () {
				this.addFormVisible = true;
				this.addForm.class_num = '';
				this.addForm.section_name = '高三';
			},
			classDetail: function (index,row) {
				this.$router.push({path:'/classInfo',query:{id:row.class_id}})
			},
			//编辑
			editSubmit: function () {
				this.editForm.class_num = Number(this.editForm.class_num);
				let str1 = this.editForm.class_num;
				let num = this.editForm.class_num;
				let str = /^\+?[1-9][0-9]*$/;
				if(str1.length > 2 || str1.length === 0 || str.test(num) === false)	{
					this.$message.error("请输入班号(1~99)")
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
					this.editLoading = true;
					if(this.editForm.section_name === '高三'){
						this.editForm.section = "6"
					}else if(this.editForm.section_name === '高二'){
						this.editForm.section = "5"
					}else{
						this.editForm.section = "4"
					}
					let para = Object.assign({}, this.editForm);
						editClass(para).then((res) => {
							this.editLoading = false;
							if (res.code === -1) {
								this.$message.error(res.msg)
							}else{
								this.$message({
									message: res.msg,
									type: 'success'
								});
							};
							this.editFormVisible = false;
							this.getCls();
						});
					}).catch(()=>{

					});	
				}	
			},
			//新增
			addSubmit: function () {	
				this.addForm.class_num = Number(this.addForm.class_num);
				let str1 = this.addForm.class_num;
				let num = this.addForm.class_num;
				let str = /^\+?[1-9][0-9]*$/;
				if(str1 <= 0  || str1 >= 100 || str.test(num) === false)	{
					this.$message.error("请输入班号(1~99)")
				}else{	
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						let para = Object.assign({}, this.addForm);	
						para.school_id = this.school_id;
						addClass(para).then((res) => {
							this.addLoading = false;
							if(res.code === -1){
								this.$message.error(res.msg)
							}else{
								this.$message({
								message: res.msg,
								type: 'success'
								});
								this.addFormVisible = false;
								this.getCls();
							}	
						});
					}).catch(()=>{})	
				}
			},
			//批量删除
			selsChange: function (sels) {
				this.sels = sels;
			},
			batchRemove: function () {
				var ids = this.sels.map(item => item.class_id).toString();
				this.$confirm('确认删除选中班级吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = {class_id: ids };
					removeClass(para).then((res) => {
						this.listLoading = false;
						if(res.code === -1){
							this.$message.error(res.msg)
						}else{
							this.$message({
							message: res.msg,
								type: 'success'
							});
							this.getCls();
						}	
					});
				}).catch(() => {
				});
			}
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
</style>