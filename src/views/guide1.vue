<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo logo-width">
				<span >
					<img src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" class="xyzx"/>
					中国·校园在线
				</span>
			</el-col>
			<el-col :span="10"></el-col>
			<el-col :span="4" class="userinfo">
				<span class="el-dropdown-link userinfo-inner">
					<img src="https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png" />
				</span>
			</el-col>
		</el-col>
		<el-col :span="24" class="man">
			<div class="content-container">
				<div class="grid-content bg-purple-light" style="text-align: center">
					<el-col :span="24" class="content-wrapper">
						<el-steps :space="200" :active="this.id" style="text-align: center">
							<el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
							<el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
							<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
						</el-steps>
					</el-col>
				</div>
			</div>
		</el-col>
		<el-col :span="24" class="mid" v-if="set">
			<div class="content-container" >
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="middle">
						<el-col :span="8" >d</el-col>
						<el-col :span="8" >d</el-col>
						<el-col :span="8" ><button @click="push">点击</button></el-col>
					</el-col>
				</div>
			</div>
		</el-col>
		<el-col :span="24" class="mid" v-else>
			<div class="content-container" >
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="middle">
						<el-col :span="8" >b</el-col>
						<el-col :span="8" >b</el-col>
						<el-col :span="8" >b</el-col>
					</el-col>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'中国·校园在线',
				set:true,
				id:1,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			next(){
				this.set=!this.set;
				this.id=2
			},
			push(){
				this.$router.push('/setting');
			}	
		}
	}
</script>
<style scoped lang="scss">
	@import '~scss_vars';
	#open{
	width:100% !important;
	}
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
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
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:9px;
				padding-right:10px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.xyzx{
					margin: 10px 10px 10px 0px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						padding-bottom:15px;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>