<template>
	<el-row class="container">
		<!--头部-->
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo logo-width">
				<span>
					<img src="http://image.zgxyzx.net/user.png" class="xyzx"/>
					中国·校园在线
				</span>
			</el-col>
			<el-col :span="10"></el-col>
			<el-col :span="4" class="userinfo">
				<span class="el-dropdown-link userinfo-inner">
					<img :src="pic" />
					{{school_name}}
				</span>
			</el-col>
		</el-col>
		<!--步骤条-->
		<el-row class="man">
			<div class="content-container">
				<div class="grid-content bg-purple-light" style="text-align: center">
					<el-col :span="12" :offset="7" class="content-wrapper">
						<el-steps :space="240" :active="active">
							<el-step title="欢迎入驻" description="">欢迎入驻</el-step>
							<el-step title="师生信息一键导入" description="">师生信息一键导入</el-step>
							<el-step title="完成" description="">完成</el-step>
						</el-steps>
					</el-col>
				</div>
			</div>
		</el-row>
		<!--第一步-->
		<el-row type="flex" justify="center" class="mid" id="mid" v-if="set==1">
			<div class="content-container">
				<div class="content-check">
					<el-col>
						<p class="middle_p middle_p1">恭喜您正式入驻高中生涯教育信息化教学云平台！</p>
						<p class="middle_p">下面，我将引导您进行学校基础信息设置</p>
					</el-col>
					<el-col  style="margin-top:50px">
						<el-button @click="next" class="content-check-bt">点击我开始</el-button>
					</el-col>
				</div>
			</div>
		</el-row>
		<!--第二步-->
		<el-row class="mid mid1" v-else-if="set==2" v-loading="loading">
			<div class="content-container">
				<div class="StepTwo" >
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<div id="excel"><img src="../assets/iconfont-jianjie.png"></div>
							<div>师生信息导入模板</div>
							<div>
								<a style="cursor:pointer" onclick="window.open('http://doc.zgxyzx.net/%E5%B8%88%E7%94%9F%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.zip')">点击下载</a>
							</div>
						</div>
					</el-col>
					<el-col :span="8" id="teachers">
						<div class="grid-content bg-purple">
							<div id="excel"><img :src="upImg"></div>
							<div>{{upSchool}}</div>
							<el-upload  action="http://up-z2.qiniu.com"  :on-progress="upProgress"  :show-file-list="false" :on-success="Success" :on-error="Error" :before-upload="beforeUpload" :data="postData" :file-list="fileList">
								<a v-bind:style="styleUp">{{clickUp}}</a>
							</el-upload>
						
							<el-progress :stroke-width="14" :percentage="percent" v-bind:style="styleProgress"></el-progress>
						</div>
                       
					</el-col>
					<el-col :span="8" id="students">
						<div class="grid-content bg-purple">
							<div id="excel"><img :src="upImgs"></div>
							<div>{{upStudent}}</div>
							<div>								
								<el-upload action="http://up-z2.qiniu.com"  :on-progress="upProgress1" :show-file-list="false" :on-success="Success1" :on-error="Error1" :before-upload="beforeUpload1" :data="postData1" :file-list="fileList1">
								<a v-bind:style="styleUps">{{clickUps}}</a>
							</el-upload>
							<el-progress :stroke-width="14" :percentage="percent1" v-bind:style="styleProgressS"></el-progress>							
							</div>
						</div>
					</el-col>
					<el-col :span="12" :offset="9">
						<el-button @click="confirm" class="StepTwo-bt">确认导入</el-button>
					</el-col>
				</div>
			</div>

		</el-row>
		<!--第三步-->
		<el-row :gutter="20" class="mid" v-else-if="set==3">
			<div class="content-container">
				<div class="middle_3">
					<el-row>
						<el-col :span="12" class="middle-img">
							<img src="../assets/c3.png">
						</el-col>
						<el-col :span="12">
							<el-col :span="24">
								<div class="middle-message">
                      	恭喜！您已完成学校基础信息设置
                      </div>
							</el-col>
							<el-col :span="24">
								<el-col :span="12" style="text-align: left">
									师生账号文档.xls
								</el-col>
								<el-col :span="12">
									<a class="middle_teacher_download" @click="down">点击下载</a>
								</el-col>
							</el-col>
							<el-col :span="24" v-if="err">
								<el-col :span="12" style="text-align: left">
									部分教师学生信息导入失败
								</el-col>
								<el-col :span="12">
									<a class="middle_teacher_error" @click="ck">点击查看</a>
								</el-col>
							</el-col>
						</el-col>

					</el-row>
				</div>
				<el-col :span="12" :offset="10">
					<el-button @click="next" style="margin-top:40px" class="enter">进入首页</el-button>
				</el-col>

			</div>
		</el-row>

	</el-row>
</template>

<script>
	import { getDocSDK,qiniu,dataUp,exportExcel} from '../api/api';
	import img from '../assets/5.png';
	import imgs from '../assets/g.png';
	import line from '../assets/line.png';
	export default {
		data() {
			return {
				set: 1,
				id: 1,
				userName: 'admin',
				sysUserAvatar: '',
				school_name:'',
				pic:'',
				active: 1,
				sysName: '中国·校园在线',
				upImg:img,
				upSchool:'上传导师信息文件',				
				clickUp :'点击上传',
				upImgs:line,
				upStudent:'上传学生信息文件',
				clickUps :'点击上传',
				styleUp:{
					display:'block',
				},
				styleProgress:{
					display:'none',
					
				},
				styleUps:{
					display:'block',
				},
				styleProgressS:{
					display:'none',
					
				},
				
				percent:0,
				percent1:0,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				fileList1:[],
				loading:false,
				postData: {},
				upFile:[],
				upFile1:[],
				postData1: {},
				fileList: [],
				url:'',
				url1:'',
				ul: '',
				err:false,
				school_id:null,
			};
		},
	methods: {
		//导师信信上传
	    upProgress(event){
	    this.percent =Math.floor(event.percent); 
	    },
      	Success(res, file) {
//				file.uid = qiniu + res.key;
//				file.url = this.ul;
//				this.upFile = fileList;				
			this.styleProgress={
				display:'none',
				};
				this.styleUp={
					display:'block',						
				};	
				file.url = 'http://' + this.url +'/'+ res.key;
				this.upFile = file;
				this.clickUp = '重新上传';
				this.upImg =imgs;			
			},
			Error(res) { //显示错误
				this.styleProgress={
					display:'none',
					};
					this.styleUp={
						display:'block',						
					};
			},
			beforeUpload(file, fileList) { 
				const xls = file.type === 'application/vnd.ms-excel';			
				if(!xls) {
					this.$message.error('上传格式错误，仅支持xls');
					return false;
				} else {
					this.styleUp={
						display:'none',						
					};					
					this.styleProgress={
					display:'block',
					width:'80%',
					margin:'30px auto',
					};				
					return getDocSDK().then((res) => {
						this.postData = {'token': res.uptoken,'key': file.uid+file.name};		
						this.url = res.url;	
					});
				} 
			},
		//学生信息上传
	    upProgress1(event){
	    this.percent1 =Math.floor(event.percent);  
	    },
      	Success1(res, file) {
//				file.uid = qiniu + res.key;
//				file.url = this.ul;
//				this.upFile = fileList;				
				this.styleProgressS={
					display:'none',
					};
					this.styleUps={
						display:'block',						
					};
					file.url = 'http://' + this.url1 +'/'+ res.key;
					this.upFile1 = file;
					this.clickUps = '重新上传';
					this.upImgs =imgs;
			},
			Error1(res) { //显示错误
				this.styleProgressS={
					display:'none',
					};
					this.styleUps={
						display:'block',						
					};
			},
			beforeUpload1(file, fileList) { 		
				const xls = file.type === 'application/vnd.ms-excel';		
				if(!xls) {
					this.$message.error('上传格式错误，仅支持xls');
					return false;
				} else {	
					this.styleUps={
						display:'none',						
					};					
					this.styleProgressS={
					display:'block',
					width:'80%',
					margin:'30px auto',
					};				
					return getDocSDK().then((res) => {
						this.postData1 = {'token': res.uptoken,'key': file.uid+file.name};		
						this.url1 = res.url;	
					});
				} 
			},
		confirm: function() {
			this.$confirm('确认导入吗？', '提示', {}).then(() => {
				let para = {
					sFile: this.upFile1.url,
					tFile: this.upFile.url,
					type: 0,
					school_id: this.school_id
				};
				this.loading = true;
				dataUp(para).then((res) => {
					if (res.code === -1) {
						this.$notify.error({
							title: '错误',
							message: res.msg
						})
						this.loading = false;
					}else {
						this.loading = false;
						this.$notify({
							title: '成功',
							message: res.msg,
							type: 'success'
						});
						if(res.data.flag > 0){
							this.err = true;
						};
						this.set++;
						if (this.active++ > 2) this.active = this.$router.push('/index');
					}
				});		
			}).catch(() => {
			
			})
		},
		down() {
			let url = exportExcel+ '?school_id=' + this.school_id
			console.log(url);
			window.open(url)
		},
		next() {
			this.set++;
			if (this.active++ > 2) this.active = this.$router.push('/index');
		},
		ck() {
			this.$router.push('/imports')
		}
	},
		mounted() {
			this.school_id = sessionStorage.getItem('school_id');
			this.school_name = sessionStorage.getItem('school_name');
			this.pic = sessionStorage.getItem('pic_url');
			this.$router.go(1) 
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		font-size: 15px;
		a {
			font-family: 'Arial Normal', 'Arial';
			font-weight: 400;
			text-decoration: none;
			font-size: 18px;
			color: #0099CC;
		}
		/*头部*/
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color: #fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					color: #fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				height: 60px;
				font-size: 22px;
				padding-left: 9px;
				padding-right: 10px;
				border-color: rgba(238, 241, 146, 0.3);
				border-right-style: none;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.xyzx {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 10px 10px 0px;
				}
			}
			.logo-width {
				width: 230px;
			}
			.logo-collapse-width {
				width: 60px
			}
		}
		.content-container {
			flex: 1;
			/*步骤条*/
			.title {
				/*width: 200px;*/
				float: left;
				color: #2CA2FC;
				font-size: 200px;
				margin-top: 14px;
			}
			.content-wrapper {
				color: #fff;
				box-sizing: border-box;
				margin-top: 60px;
			}
			/*步骤条数字*/
			.el-step__head {
				color: #2CA2FC;
				font-size: 18px;
				background-color: #FFFFFF;
			}
		}
		/*第一步*/
		.content-check {
			text-align: center;
			max-width: 1920px;
			height: 400px;
			background-image: url(/static/img/banner.png);
			margin-top: 60px;
			.middle_p {
				font-family: 'Arial Negreta', 'Arial';
				color: #FFFFFF;
				font-size: 30px;
			}
			.middle_p1 {
				margin-top: 100px;
			}
			.content-check-bt {
				color: #FFFFFF;
				font-size: 24px;
				background-color: #2ca2fc;
				width: 260px;
				height: 56px;
				border-radius: 4px;
				border: none;
			}
		}
		/*步骤二*/
		.StepTwo {
			width: 1170px;
			margin: 60px auto;
			font-size: 20px;
			color: #343434;
			#excel {
				width: 69px;
				height: 65px;
				/*border: 1px solid #000;*/
				margin: 50px auto;
				line-height: 65px;
			}
			.bg-purple:hover {
				border: 1px solid #2CA2FC;
				box-shadow: 0px 8px 4px #6DC1E9;
				opacity: 0.76;
			}
			.bg-purple {
				text-align: center;
				margin-bottom: 40px;
				border: 1px solid #A1A1A1;
				height: 320px;
				width: 360px;
				border-radius: 8px;
			}
			.StepTwo-bt {
				display: block;
				width: 260px;
				height: 56px;
				font-size: 24px;
				background-color: #2CA2FC;
				color: #FEFEFF;
				border-radius: 8px;
				margin-top: 100px;
			}
		}
		.mid1 a {
			margin: auto;
			display: block;
			margin-top: 40px;
			width: 200px;
			height: 50px;
			line-height: 50PX;
			border-radius: 8px;
			font-size: 24px;
			background-color: #2CA2FC;
			color: #FEFEFF;
		}
		.el-icon-upload2 {
			font-size: 40px;
		}
		/*第三步*/
		.middle_3 {
			text-align: center;
			margin-top: 50px;
			padding-top: 100px;
			font-size: 26px;
			color: #666666;
			/*width: 1920px;*/
			height: 400px;
			background-color: #c7edff;
			.middle-message {

				font-size: 36px;
				color: #666666;
				text-align: left;
				margin-top: 20px;
				margin-bottom: 50px;
			}
			.middle_teacher_download,
			.middle_teacher_error {
				display: block;
				cursor:pointer;
				width: 200px;
				height: 50px;
				line-height: 50px;
				font-size: 24px;
				color: #FFFFFF;
				border-radius: 8px;
				opacity: 100%;
				background-color: #81cef2;
				margin-bottom: 20px;
			}
		}
		.enter {
			display: block;
			width: 260px;
			height: 56px;
			font-size: 24px;
			background-color: #2CA2FC;
			color: #FEFEFF;
			border-radius: 8px;
			margin-top: 120px;
		}
	}

</style>