<template>
	<section v-loading="loading">
		<el-tabs v-model="activeName" type="card" >
			<el-tab-pane label="学校资料" name="first"></el-tab-pane>
		</el-tabs>
		<el-form ref="form" :model="form" label-width="100px" style="max-width: 1000px;padding:10px 30px" :rules="rules" :label-position="labelPosition">
			<el-form-item label="学校校徽">
				<el-upload
				  id="avatar-uploader"
				  action="http://up-z2.qiniu.com"
				  :show-file-list="false"
				  :data="postData"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="form.sch_badge" :src="form.sch_badge" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>	
			<el-form-item label="学校名称"　prop="sch_name">
				<el-input v-model="form.sch_name" style="width:217px"></el-input>
			</el-form-item>
			<el-form-item label="办学性质" prop="sch_type">
				<el-select v-model="form.sch_type" placeholder="请选择">
					<el-option label="公办校" value="公办校"></el-option>
					<el-option label="民办校" value="民办校"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学校属性" required>
				<span class="infos" :class="clicked1? 'active':''"@click="clicked1 = !clicked1">区重点</span>
				<span class="infos" :class="clicked2? 'active':''"@click="clicked2 = !clicked2">市重点</span>
				<span class="infos" :class="clicked3? 'active':''"@click="clicked3 = !clicked3">省重点</span>
				<span class="infos" :class="clicked4? 'active':''"@click="clicked4 = !clicked4">重点</span>
				<span class="infos" :class="clicked5? 'active':''"@click="clicked5 = !clicked5">示范校</span>
				<span class="infos" :class="clicked6? 'active':''"@click="clicked6 = !clicked6">示范高中</span>
				<span class="infos" :class="clicked8? 'active':''"@click="clicked8 = !clicked8">其它</span>
				<span class="infos" :class="clicked7? 'active':''"@click="clicked7 = !clicked7">无</span>			
			</el-form-item>
			<el-form-item label="学校等级" prop="sch_level" >
				<el-select v-model="form.sch_level" placeholder="请选择">
					<el-option label="一级达标" value="一级达标"></el-option>
					<el-option label="二级达标" value="二级达标"></el-option>
					<el-option label="三级达标" value="三级达标"></el-option>
					<el-option label="其它" value="其它"></el-option>
					<el-option label="无" value="无"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学校地址" required>
				<el-col :span="6">
				 <el-form-item prop="province_id">
					<el-select v-model="form.province_id" placeholder="请选择省份" @change="change1">
					    <el-option
					      v-for="item in options"
					      :key="item.region_id"
					      :label="item.region_name"
					      :value="item.region_id">
					    </el-option>
					</el-select>
				</el-form-item>
				</el-col>
				<el-col class="line" :span="1">-</el-col>
				<el-col :span="6">
				<el-form-item prop="city_id">
					<el-select v-model="form.city_id" placeholder="请选择市" @change="change2">
					    <el-option
					      v-for="item in option1"
					      :key="item.region_id"
					      :label="item.region_name"
					      :value="item.region_id">
					    </el-option>
					</el-select>
				</el-form-item>
				</el-col>
				<el-col class="line" :span="1">-</el-col>
				<el-col :span="6">
				<el-form-item prop="district_id">
					<el-select v-model="form.district_id" placeholder="请选择县区" @change="change3">
					    <el-option
					      v-for="item in option2"
					      :key="item.region_id"
					      :label="item.region_name"
					      :value="item.region_id">
					    </el-option>
					</el-select>
				</el-form-item>
				</el-col>
				<el-col class="line" :span="4"></el-col>
			</el-form-item>
			<el-form-item label="　　　　">
				<el-input v-model="form.sch_add" style=""></el-input>
			</el-form-item>
			<el-form-item label="创办时间" required prop="sch_since">
				<el-input v-model="form.sch_since" style="width:217px"></el-input>
			</el-form-item>
			<el-form-item label="现任校长" prop="sch_president">
				<el-input v-model="form.sch_president" style="width:217px"></el-input>
			</el-form-item>
			<el-form-item label="校　　训" prop="sch_motto">
				<el-input type="textarea" v-model="form.sch_motto" max-row="3"></el-input>
			</el-form-item>
			<el-form-item label="学校简介" prop="sch_introduction">
				<el-input type="textarea" v-model="form.sch_introduction" class="info" max-row="8"></el-input>
			</el-form-item>
			<el-form-item label="学校文化">
				<el-input type="textarea" v-model="form.sch_idea" class="info culture" max-row="5"></el-input>
			</el-form-item>
			<el-form-item label-width="100px">
				<el-button type="primary" @click="onSubmit('form')">提　　交</el-button>
				<el-button @click="back">返　　回</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>
<script>
import { getImgSDK,qiniu,schoolInfo,getAdd,saveSchool} from '../../api/api';
	export default {
		data() {
				return {
					postData:{},
					loading:false,
					school_id:null,
					activeName: 'first',
					labelPosition: 'left',
					pickerOptions0: {
						disabledDate(time) {
							return time.getTime() > Date.now() - 8.64e7;
						}
					},
					form: {},
					selectedOptions: ['2'],
					clicked1:false,
					clicked2:false,
					clicked3:false,
					clicked4:false,
					clicked5:false,
					clicked6:false,
					clicked7:false,
					clicked8:false,
					option1:[],
					option2:[],
					options: [
				        {
				            "region_id": 1,
				            "region_name": "北京"
				        },
				        {
				            "region_id": 2,
				            "region_name": "天津"
				        },
				        {
				            "region_id": 3,
				            "region_name": "上海"
				        },
				        {
				            "region_id": 4,
				            "region_name": "重庆"
				        },
				        {
				            "region_id": 44,
				            "region_name": "河北省"
				        },
				        {
				            "region_id": 227,
				            "region_name": "山西省"
				        },
				        {
				            "region_id": 358,
				            "region_name": "内蒙古"
				        },
				        {
				            "region_id": 472,
				            "region_name": "辽宁省"
				        },
				        {
				            "region_id": 587,
				            "region_name": "吉林省"
				        },
				        {
				            "region_id": 657,
				            "region_name": "黑龙江省"
				        },
				        {
				            "region_id": 819,
				            "region_name": "江苏省"
				        },
				        {
				            "region_id": 939,
				            "region_name": "浙江省"
				        },
				        {
				            "region_id": 1041,
				            "region_name": "安徽省"
				        },
				        {
				            "region_id": 1159,
				            "region_name": "福建省"
				        },
				        {
				            "region_id": 1254,
				            "region_name": "江西省"
				        },
				        {
				            "region_id": 1365,
				            "region_name": "山东省"
				        },
				        {
				            "region_id": 1523,
				            "region_name": "河南省"
				        },
				        {
				            "region_id": 1701,
				            "region_name": "湖北省"
				        },
				        {
				            "region_id": 1815,
				            "region_name": "湖南省"
				        },
				        {
				            "region_id": 1952,
				            "region_name": "广东省"
				        },
				        {
				            "region_id": 2095,
				            "region_name": "广西"
				        },
				        {
				            "region_id": 2219,
				            "region_name": "海南省"
				        },
				        {
				            "region_id": 2285,
				            "region_name": "四川省"
				        },
				        {
				            "region_id": 2488,
				            "region_name": "贵州省"
				        },
				        {
				            "region_id": 2586,
				            "region_name": "云南省"
				        },
				        {
				            "region_id": 2732,
				            "region_name": "西藏"
				        },
				        {
				            "region_id": 2813,
				            "region_name": "陕西省"
				        },
				        {
				            "region_id": 2931,
				            "region_name": "甘肃省"
				        },
				        {
				            "region_id": 3033,
				            "region_name": "青海省"
				        },
				        {
				            "region_id": 3084,
				            "region_name": "宁夏"
				        },
				        {
				            "region_id": 3112,
				            "region_name": "新疆"
				        },
				    ],
					rules: {
						sch_name: [{
							required: true,
							message: '必填项，请输入内容',
							trigger: 'blur'
						}],
						sch_type: [{
							required: true,
							message: '请选择',
							trigger: 'change'
						}],
						province_id: [{
							type:'number',
							required: true,
							message: '请选择',
							trigger: 'change'
						}],
						city_id: [{
							type:'number',
							required: true,
							message: '请选择',
							trigger: 'change'
						}],
						district_id: [{
							type:'number',
							required: true,
							message: '请选择',
							trigger: 'change'
						}],
						sch_level: [{
							required: true,
							message: '请选择',
							trigger: 'change'
						}],
						 sch_since: [
				            { required: true,
							message: '必填项，请输入内容',
							trigger: 'blur' }
				          ],
						sch_president: [{
							required: true,
							message: '必填项，请填写内容',
							trigger: 'blur'
						}],
						sch_motto: [{
							required: true,
							message: '必填项，请填写内容',
							trigger: 'blur'
						}],
						sch_introduction: [{
							required: true,
							message: '必填项，请填写内容',
							trigger: 'blur'
						}],
					},
				}
			},
			methods: {
				handleAvatarSuccess(res, file) {
				this.form.sch_badge = qiniu +res.key;
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
				getData() {
					let para= {school_id:this.school_id};
					schoolInfo(para).then((res) => {
						let str=res.data.data.sch_attribute;
						this.form = res.data.data;
						if(str !=  null){
							let arr=str.split(",");
							for(var i=0;i<arr.length;i++){
								if(arr[i] === '区重点'){
									this.clicked1 = true;
								}else if(arr[i] === '市重点'){
									this.clicked2 = true;
								}else if(arr[i] === '省重点'){
									this.clicked3 = true;
								}else if(arr[i] === '重点'){
									this.clicked4 = true;
								}else if(arr[i] === '示范校'){
									this.clicked5 = true;
								}else if(arr[i] === '示范高中'){
									this.clicked6 = true;
								}else if(arr[i] === '无'){
									this.clicked7 = true;
								}else if(arr[i] === '其它'){
									this.clicked8 = true;
								}
							};
						};
						let id = this.form.city_id;
						let ids = this.form.district_id;
						let idss =this.form.province_id
						let para ={pid:idss};
						if(idss != null){
							getAdd(para).then((res) => {
								this.option1 = res.data.data;
								let para = {pid:this.form.city_id}
								getAdd(para).then((res) => {
									this.option2 = res.data.data;
									this.form.district_id = ids;
									this.form.city_id = id;	
								})
							})
						}
						this.loading = false;
					})
				},
				change1(val){
					if(val != null){
						let para = {pid:val};
						getAdd(para).then((res) =>{
							this.form.city_id = null;
							this.form.district_id = null;
							this.option1 =res.data.data;
							this.option2 = [];	
						});
					}		
				},
				change2(val){
					let para = {pid:val}
					if(val != null){getAdd(para).then((res) =>{
						this.option2 =res.data.data;
						this.district_id = null;
					});}				
				},
				change3(val){
				},
				onSubmit(formName) {
					this.$refs[formName].validate((valid) => {
						let str1 = /^[^ ]+$/;//空白符和字符串，字符串
						let str2 = /^$| /;//空白符 
						if (valid) {
							let str = '';
							if(this.clicked1 === true){
								str = '区重点,'
							};
							if(this.clicked2 === true){
								str = str + '市重点,'
							};
							if(this.clicked3 === true){
								str = str + '省重点,'
							};
							if(this.clicked4 === true){
								str = str + '重点,'
							};
							if(this.clicked5 === true){
								str = str + '示范校,'
							};
							if(this.clicked6 === true){
								str = str + '示范高中,'
							};
							if(this.clicked7 === true){
								str = str + '无,'
							};
							if(this.clicked8 === true){
								str = str + '其它,'
							};
							if( str.length === 0 || this.form.sch_add.length === 0){
								this.$message.error('提交失败，请检查必填项');
							}else if(str1.test(this.form.sch_name) === false || str1.test(this.form.sch_president) === false ){
								this.$message.error('提交失败，学校名称，校长名称不能含有空格')
							}else{
								str = str.substring(0,str.length - 1);
								let data= Object.assign({}, this.form);
								let para = {data,str};
								saveSchool(para).then((res) => {
									this.$message({
										message: res.msg,
										type: 'success'
									});
									this.$router.push('/data');
								})
							}				
						} else {
							this.$message.error('保存失败，请检查必填项');
							return false;
						}
					});
				},
				back() {
					this.$confirm('未提交的数据将丢失，确认离开?', '提示', {
						cancelButtonText: '取消',
						confirmButtonText: '确定',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '返回成功!'
						});
						this.$router.push('/data');
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
				}
			},
			mounted() {
				this.loading = true;
				this.school_id = sessionStorage.getItem('school_id');	
				this.getData();	
			},
	} 
</script>
<style lang="scss">
	.line{
		text-align: center
	}
	.demo-block{
		padding: 10px;
		border:1px solid #d1dbe5;
		min-height: 598px;
		max-height: 900px;
		overflow-y: auto;
	}
	.el-badge__content{
		top:10px
	}
	#avatar-uploader .el-upload {
    border: 2px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover{
    	border-color: #20a0ff;
    }
  }
  .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }
  .infos{
  	padding:5px 15px;
  	background-color: #ddd;
  	border-radius: 4px;
  	line-height: 30px;
  	color:#888;
  	margin-right: 20px;
  	cursor:pointer;
  }
  .active{
  	background-color: #20a0ff;
  	color:#FFF;
  }
</style>