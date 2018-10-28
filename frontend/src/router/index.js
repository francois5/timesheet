import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Dashboard from '@/views/Dashboard';
import Agenda from '@/views/Agenda';
import Settings from '@/views/Settings';
import Stats from '@/views/Stats';

Vue.use(Router);

export default new Router({
    routes: [
	{
	    path: '/',
	    name: 'Login',
	    component: Login
	},
	{
	    path: '/dashboard/',
	    name: 'Dashboard',
	    component: Dashboard
	},
	{
	    path: '/agenda/',
	    name: 'Agenda',
	    component: Agenda
	},
	{
	    path: '/settings/',
	    name: 'Settings',
	    component: Settings
	},
	{
	    path: '/stats/',
	    name: 'Stats',
	    component: Stats
	},
    ]
});
