<template>
	<section v-loading="loading">
		<el-tabs v-model="activeName" type="card" >
			<el-tab-pane label="学校资料" name="first"></el-tab-pane>
		</el-tabs>
		<el-form ref="form" :model="form" label-width="100px" style="padding:10px 30px" :label-position="labelPosition">
			<el-form-item >
				<img :src="form.sch_badge" width="160px" height="160px"> <el-button type="primary" style="float: right;vertical-align: top;margin-right: 30px" size="large" @click="edit">修改资料</el-button>
			</el-form-item>
			<el-form-item label="学校名称">
				{{form.sch_name}}
			</el-form-item>
			<el-form-item label="办学性质">
				{{form.sch_type}}
			</el-form-item>
			<el-form-item label="学校属性">
				<el-button type="primary" v-for="(i,index) in form.info" :key="index">{{i}}</el-button>
			</el-form-item>
			<el-form-item label="学校等级">
				{{form.sch_level}}
			</el-form-item>	
			<el-form-item label="学校地址">
				{{form.sch_province}}  {{form.sch_city}}  {{form.sch_district}}  {{form.sch_add}}
			</el-form-item>
			<el-form-item label="创办时间">
				{{form.sch_since}}
			</el-form-item>
			<el-form-item label="现任校长">
				{{form.sch_president}}
			</el-form-item>
			<el-form-item label="校　　训">
				{{form.sch_motto}}
			</el-form-item>
			<el-form-item label="学校简介">
				{{form.sch_introduction}}
			</el-form-item>
			<el-form-item label="学校文化">
				{{form.sch_idea}}
			</el-form-item>
		</el-form>
	</section>
</template>
<script>
import {schoolInfo} from '../../api/api';
export default {
	data() {
		return {
			loading:false,
			activeName: 'first',
			labelPosition: 'left',
			school_id:null,
			form: {},
			info:[],
		}
	},
	methods: {
		edit() {
			this.$router.push('/dataEdit');
		},
		
		getData() {
			let para= {school_id:this.school_id};
			schoolInfo(para).then((res) => {
				let str=res.data.data.sch_attribute;
				this.form = res.data.data;
				if(str !=  null){
					let arr=str.split(",");
					this.form.info = arr;
				};	
				this.loading = false;
			})
		}
	},
	mounted() {
		this.school_id = sessionStorage.getItem('school_id');
		this.getData();
	},
	beforeMount(){
		this.loading = true;
	},
}
</script>
<style >
	p{margin:0;}
</style>