import axios from 'axios';
import qs from 'qs';

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    else{
        return null;
    }
};

let token = getCookie('token');
sessionStorage.setItem('token', token);
let instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    headers: {'token':token}
});
let base='dadaodata.com';
let baseUrl = `//ddzx.api.${base}`;
let schoolUrl = `//school.api.${base}`;
let getSchool = '//gz.dadaodata.com';
//test.com               开发环境
//dadaodata.com          测试环境
//zgxyzx.net             正式生产环境
//dadaozx.com            演示环境

let qiniuSdk = `//base.api.${base}`;
export const exportExcel = `${schoolUrl}/school/Import/exportExcel`;
export const qiniu = 'http://image.zgxyzx.net/';
export const logout = 'http://test.dadaodata.com/login/index-high.html';

export const getImgSDK = params => { return instance.get(`${qiniuSdk}/api/Qiniu/getToken?type=image`, qs.stringify(params)).then(res => res.data); };
//get
export const schoolInfo = params => { return instance.get(`${schoolUrl}/school/SchoolData/getSchoolData`,{ params: params }); };
export const getClassListPage = params => { return instance.get(`${base}/user/clistpage`, { params: params }); };
export const getAdd = params => { return instance.get(`${qiniuSdk}/api/Region/region`, { params: params }); };
export const getDocSDK = params => { return instance.get(`${qiniuSdk}/api/Qiniu/getToken?type=doc`, qs.stringify(params)).then(res => res.data); };
//post

export const saveSchool = params => { return instance.post(`${schoolUrl}/school/SchoolData/saveSchoolData`, qs.stringify(params)).then(res => res.data); };
export const login = params => { return instance.post(`${qiniuSdk}/api/user/getData`, qs.stringify(params)).then(res => res.data); };
export const getClass = params => { return instance.post(`${schoolUrl}/school/classManager/getClassList`, qs.stringify(params)).then(res => res.data); };
export const removeClass = params => { return instance.post(`${schoolUrl}/school/classManager/delClass`, qs.stringify(params)).then(res => res.data); };
export const editClass = params => { return instance.post(`${schoolUrl}/school/classManager/updateClass`, qs.stringify(params)).then(res => res.data); };
export const addClass = params => { return instance.post(`${schoolUrl}/school/classManager/addClass`, qs.stringify(params)).then(res => res.data); };
export const classs = params => { return instance.post(`${schoolUrl}/school/classManager/classDetail`, qs.stringify(params)).then(res => res.data); };
export const teacher = params => { return instance.post(`${schoolUrl}/school/classManager/classTeacher`, qs.stringify(params)).then(res => res.data); };
export const student = params => { return instance.post(`${schoolUrl}/school/classManager/classStudent`, qs.stringify(params)).then(res => res.data); };
export const delTeacher = params => { return instance.post(`${schoolUrl}/school/classManager/delClassTeacher`, qs.stringify(params)).then(res => res.data); };
export const telList = params => { return instance.post(`${schoolUrl}/school/classManager/addClassTeacherList`, qs.stringify(params)).then(res => res.data); };
export const addTel = params => { return instance.post(`${schoolUrl}/school/classManager/addClassTeacher`, qs.stringify(params)).then(res => res.data); };
export const addStu = params => { return instance.post(`${schoolUrl}/school/Student/addStudentData`, qs.stringify(params)).then(res => res.data); };
export const teacherList = params => { return instance.post(`${schoolUrl}/school/Teacher/schoolTchList`, qs.stringify(params)).then(res => res.data); };
export const teacherInfo = params => { return instance.post(`${schoolUrl}/teacher/Information/schoolTchInfo `, qs.stringify(params)).then(res => res.data); };
export const teacherUp = params => { return instance.post(`${schoolUrl}/teacher/Information/schoolUpdateTchInfo `, qs.stringify(params)).then(res => res.data); };
export const telJob = params => { return instance.post(`${schoolUrl}/teacher/Information/tchClass`, qs.stringify(params)).then(res => res.data); };
export const upJob = params => { return instance.post(`${schoolUrl}/teacher/Information/upDataTchSchInfo`, qs.stringify(params)).then(res => res.data); };
export const removeCls = params => { return instance.post(`${schoolUrl}/teacher/Information/delTchSchClass`, qs.stringify(params)).then(res => res.data); };
export const addTeacher = params => { return instance.post(`${schoolUrl}/school/Teacher/addTeacher`, qs.stringify(params)).then(res => res.data); };
export const addStudent = params => { return instance.post(`${schoolUrl}/school/Student/addStudentData`, qs.stringify(params)).then(res => res.data); };
export const dataUp = params => { return instance.post(`${schoolUrl}/school/Import/importData`, qs.stringify(params)).then(res => res.data); };
export const getStudent = params => { return instance.post(`${schoolUrl}/school/Student/getStudentList`, qs.stringify(params)).then(res => res.data); };
export const stuInfo = params => { return instance.post(`${schoolUrl}/student/Student/getStuInfo`, qs.stringify(params)).then(res => res.data); };
export const country = params => { return instance.post(`${schoolUrl}/api/Country/getCountry/country_name/`, qs.stringify(params)).then(res => res.data); };
export const upStudent = params => { return instance.post(`${schoolUrl}/student/Student/updateStudentData`, qs.stringify(params)).then(res => res.data); };
export const parents = params => { return instance.post(`${schoolUrl}/student/Student/getStuParentInfo`, qs.stringify(params)).then(res => res.data); };
export const importTel = params => { return instance.post(`${schoolUrl}/school/Import/getTeacherList`, qs.stringify(params)).then(res => res.data); };
export const importStu = params => { return instance.post(`${schoolUrl}/school/Import/getStudentList`, qs.stringify(params)).then(res => res.data); };
export const delTel = params => { return instance.post(`${schoolUrl}/school/Import/delTeacherInfo`, qs.stringify(params)).then(res => res.data); };
export const delStu = params => { return instance.post(`${schoolUrl}/school/Import/delStudentInfo`, qs.stringify(params)).then(res => res.data); };
export const addTelInfo = params => { return instance.post(`${schoolUrl}/school/Import/addTeacherInfo`, qs.stringify(params)).then(res => res.data); };
export const addStuInfo = params => { return instance.post(`${schoolUrl}/school/Import/addStudentInfo`, qs.stringify(params)).then(res => res.data); };
export const saveMobile = params => { return instance.post(`${qiniuSdk}/api/user/saveMobile`, qs.stringify(params)).then(res => res.data); };
export const sendCode = params => { return instance.post(`${qiniuSdk}/api/sms/sendCode`, qs.stringify(params)).then(res => res.data); };
export const changePwd = params => { return instance.post(`${qiniuSdk}/api/user/updatePassword`, qs.stringify(params)).then(res => res.data); };
export const adminUpdate = params => { return instance.post(`${qiniuSdk}/api/user/updateData`, qs.stringify(params)).then(res => res.data); };

