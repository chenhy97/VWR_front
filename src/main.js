'use strict';

import Vue from 'vue';
import Store from '@/store';
import Router from '@/router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue'
import 'admin-lte/bower_components/bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/bower_components/font-awesome/css/font-awesome.min.css'
import 'admin-lte/bower_components/Ionicons/css/ionicons.min.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'admin-lte/bower_components/morris.js/morris.css'
import 'admin-lte/bower_components/jvectormap/jquery-jvectormap.css'
import 'admin-lte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
import 'admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.css'
import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'
// import 'admin-lte/bower_components/jquery/dist/jquery.min.js'
import 'admin-lte/bower_components/jquery-ui/jquery-ui.min.js'
// import 'admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js'
import 'admin-lte/bower_components/raphael/raphael.min.js'
import 'admin-lte/bower_components/morris.js/morris.min.js'
import 'admin-lte/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js'
import 'admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'
import 'admin-lte/plugins/jvectormap/jquery-jvectormap-world-mill-en.js'
import 'admin-lte/bower_components/jquery-knob/dist/jquery.knob.min.js'
import 'admin-lte/bower_components/moment/min/moment.min.js'
import 'admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.js'
import 'admin-lte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
// import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js'//don't work with browserify
import 'admin-lte/bower_components/jquery-slimscroll/jquery.slimscroll.min.js'
import 'admin-lte/bower_components/fastclick/lib/fastclick.js'
import 'admin-lte/dist/js/adminlte.min.js'
import 'admin-lte/dist/js/pages/dashboard.js'
import 'admin-lte/dist/js/demo.js'
import { VizceralVue } from '@/vizceral-vue';
//   {/* <!-- Bootstrap Color Picker --> */}
import "admin-lte/bower_components/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css"
//   {/* <!-- Bootstrap time Picker --> */}
 import "admin-lte/plugins/timepicker/bootstrap-timepicker.min.css"
//   {/* <!-- Select2 --> */}
 import "admin-lte/bower_components/select2/dist/css/select2.min.css"
//   {/* <!-- Theme style --> */}
 import "admin-lte/dist/css/AdminLTE.min.css"
 import 'bootstrap-vue/dist/bootstrap-vue.css'
//   {/* <!-- AdminLTE Skins. Choose a skin from the css/skins */}
    //    {/* folder instead of downloading all of them to reduce the load. --> */}
 import "admin-lte/dist/css/skins/_all-skins.min.css"

import axios from 'axios' //引入axios
import qs from 'qs'

Vue.prototype.$ajax=axios //修改Vue的原型属性
// Vue.http.options.emulateJSON = true;
Vue.use(VizceralVue);
Vue.use(BootstrapVue);

import '@/less/app.less';

import App from './App';
import Eject from './components/Eject';
import Start from './components/Start';
new Vue({
    el: '#app',
    store: Store,
    router: Router,
    vizceralVue: {},
    template: '<App/>',
    components: { App }
});
new Vue({
    el: '#eject',
    store: Store,
    router: Router,
    vizceralVue: {},
    components: {Eject},
    template: '<Eject/>'
});
new Vue({
    el: '#start',
    store:  Store,
    router: Router,
    vizceralVue: {},
    components: {Start},
    template: '<Start/>'
})