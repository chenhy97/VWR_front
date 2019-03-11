'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Routes from './routes';
export { default as Routes } from './routes';

const debug = process.env.NODE_ENV !== 'production';

export default new VueRouter({
    strict: debug,
    mode: 'history',
    linkActiveClass: 'active',
    routes: Routes
});