import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Index from './views/index.vue'
//项目导航
import Guide from './views/guide.vue'
import Data from './views/schoolAdmin/data.vue'
import Teacher from './views/schoolAdmin/teacher.vue'
import Class from './views/schoolAdmin/class.vue'
import Classs from './views/schoolAdmin/classInfo.vue'
import Import from './views/schoolAdmin/import.vue'
import Setting from './views/schoolAdmin/setting.vue'
import Student from './views/schoolAdmin/student.vue'
import telInfo from './views/schoolAdmin/teacherInfo.vue'
import stuDetail from './views/schoolAdmin/studentDetail.vue'
import stuInfo from './views/schoolAdmin/studentInfo.vue'

import DataEdit from './views/schoolAdmin/dataEdit.vue'
//tab
import UserInfo from './views/tab/userinfo.vue'
import ChangePwd from './views/tab/changepwd.vue'
//原有导航
import Home from './views/Home.vue'
import Main from './views/Main.vue'


let routes = [
    {
        path: '/logout',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/guide',
        component: Guide,
        name: '',
        hidden: true
    },
    {
        path: '/index',
        component: Home,
        name: '',
        iconCls: 'el-icon-menu',
        leaf: true,//只有一个节点
        children: [
            { path: '/index', component: Index, name: '首页' }
        ]
    },
    //项目导航
    {
        path: '/',
        component: Home,
        name: '学校信息管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/data', component: Data, name: '学校资料管理'},
            { path: '/class', component: Class, name: '班级管理', },
            { path: '/teacher', component: Teacher, name: '导师管理' },
            { path: '/student', component: Student, name: '学生管理' },
            { path: '/imports', component: Import, name: '导入信息校验' },
            { path: '/dataEdit', component: DataEdit, name: '学校资料编辑',hidden:true },
            { path: '/classInfo', component: Classs, name: '班级详情',hidden:true},
            { path: '/telInfo', component: telInfo, name: '教师详情',hidden:true},
            { path: '/studentDetail', component: stuDetail, name: '学生信息',hidden:true},
            { path: '/studentInfo', component: stuInfo, name: '学生详情',hidden:true},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '设置',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/userinfo', component: UserInfo, name: '用户资料' },
            { path: '/changepwd', component: ChangePwd, name: '修改密码' }
        ]
    },
    //{ path: '/main', component: Main },下面为原有模板
   /* {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航四',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },*/
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;