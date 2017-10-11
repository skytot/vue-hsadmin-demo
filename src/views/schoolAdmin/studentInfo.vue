<template>
	<section>
	 <el-tabs v-model="activeName" type="card" >
	 	<el-tab-pane label="个人信息" name="1">
	 		<el-form ref="form" :model="data" label-width="125px" style="padding:10px 30px">
				<el-form-item label-width="40px">
					<img :src="data.pic_url" width="160px" height="160px"> <el-button style="float: right;vertical-align: top;margin-right: 10px" size="large" @click="back">返回</el-button><el-button type="primary" style="float: right;vertical-align: top;margin-right: 10px" size="large" @click="edit">修改信息</el-button>
				</el-form-item>
				<el-form-item label="姓　　名：">
					{{data.realname}}
				</el-form-item>
				<el-form-item label="性　　别：">
					{{data.sex}}
				</el-form-item>
				<el-form-item label="手机　号：">
					{{data.phone_tel}}
				</el-form-item>
				<el-form-item label="国　　籍：">
					{{data.nationality}}
				</el-form-item>	
				<el-form-item label="民　　族：">
					{{data.nation}}
				</el-form-item>	
				<el-form-item label="籍　　贯：">
					{{data.native_place}}
				</el-form-item>	
				<el-form-item label="政治面貌：">
					{{data.political}}
				</el-form-item>	
				<el-form-item label="出生年月日：">
					{{data.birthday}}
				</el-form-item>	
				<el-form-item label="入学时间：">
					{{data.join_time}}
				</el-form-item>	
				<el-form-item label="学　　号：">
					{{data.student_number}}
				</el-form-item>	
				<el-form-item label="当前年级：">
					{{data.section_name}}
				</el-form-item>	
				<el-form-item label="所在班级：">
					{{data.class_name}}
				</el-form-item>	
				<el-form-item label="状　　态：">
					<el-button >{{data.status}}</el-button>
				</el-form-item>		
			</el-form>
	 	</el-tab-pane>
	 	<el-tab-pane label="家庭信息" name="2">
 			<ul class="teacher">
 				<li v-if="parent.length === 0" style="height:100px;line-height: 100px;text-align: center;font-size: 18px;color: #bbb">
 					未找到相关信息
 				</li>
				<li v-for="item in parent">
					<div class="left">
						<img :src="item.pic_url">					
						<span>{{item.name}}</span>
					</div>
					<div class="right">
						<div class="zw">关　系：{{item.relation}}</div>
						<div>
							<span class="tel">手机号：{{item.phone_tel}}</span>
						</div>
					</div>
				</li>

			</ul>
	 	</el-tab-pane>
	 </el-tabs>
	</section>
</template>
<script>
	import {stuInfo,parents} from '../../api/api';
	export default {
		data() {
			return {
				activeName:"1",
				school_id:null,
				student_id:null,
				parent:{},
				data:{
					status:'',
				},
				postData:{},
			}
		},
		methods: {	
			//获取用户列表
			getData(){
				let para = {user_id:this.student_id};
				stuInfo(para).then((res) => {
					this.data = res.data;
					if(this.data.gender === "1"){
						this.data.sex = '男'
					}else if(this.data.gender === "2"){
						this.data.sex = '女'
					};
					if(this.data.cur_status === 0){
						this.data.status = "在校"
					}else if(this.data.cur_status === 3){
						this.data.status = "离校"
					}else if(this.data.cur_status === 4){
						this.data.status = "毕业"
					}
				})
				parents(para).then((res) => {
					this.parent = res.data;
				})
			},
			edit(){
				this.$router.push({path:'/studentDetail',query:{id:this.student_id}})
			},
			back(){
				this.$router.push('/student')
			}

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