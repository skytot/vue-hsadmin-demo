import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'

import routes from './routes'

import 'font-awesome/css/font-awesome.min.css'
import {login,logout} from './api/api'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    routes
})
//getcookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    else{
        return null;
    }
}
function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}
router.beforeEach((to, from, next) => {
    let token = getCookie('token');
    sessionStorage.setItem('token', token);
    let user = JSON.parse(sessionStorage.getItem('user'));
    if(to.path == '/logout'){
        clearCookie();
        sessionStorage.removeItem('token');
        window.location.replace(logout);
    };
    if (!user) {
        let para = {
            token: token
        };
        login(para).then((res) => {
            if (res.code === -1) {
                alert("无效账户");
                sessionStorage.removeItem('token');
                window.location.href=logout;
            } else { 
                sessionStorage.setItem('user', JSON.stringify(res.data));
                sessionStorage.setItem('school_id', res.data.school_id);
                sessionStorage.setItem('pic_url', res.data.pic_url);
                sessionStorage.setItem('school_name', res.data.school_name);
                sessionStorage.setItem('user_id', res.data.user_id);
                sessionStorage.setItem('user_name', res.data.user_name);
                sessionStorage.setItem('phone_tel', res.data.phone_tel);
                if(res.data.is_guide ===0){
                    next('/guide');
                    location.reload(); 
                }else if(to.path == '/'){
                    next('/index');
                    location.reload();  
                }
                else{ 
                    next()
                }  
            }
        }).catch(() => {
            alert("无效账户");
           window.location.href=logout;
        })
    } else {
        //window.location.href=logout;
        next();
    }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')