import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import TopBar from '@/components/TopBar';

Vue.config.ignoredElements = [
    'md-toolbar', 'md-icon'
];

describe('TopBar', () => {
    it('should render the poweroff button if and only if loggedIn', () => {
	const wrapper = shallowMount(TopBar, {
	    propsData: { loggedIn: true }
	});
	expect(wrapper.find('.power-button').exists()).toBe(true);
	wrapper.setProps({ loggedIn: false });
	expect(wrapper.find('.power-button').exists()).toBe(false);
    });
    it('should render the back button if and only if loggedIn && !dashboard', () => {
	const wrapper = shallowMount(TopBar, {
	    propsData: { loggedIn: true, dashboard: false }
	});
	expect(wrapper.find('.back-button').exists()).toBe(true);
	wrapper.setProps({ loggedIn: false, dashboard: false });
	expect(wrapper.find('.back-button').exists()).toBe(false);
	wrapper.setProps({ loggedIn: true, dashboard: true });
	expect(wrapper.find('.back-button').exists()).toBe(false);
	wrapper.setProps({ loggedIn: false, dashboard: true });
	expect(wrapper.find('.back-button').exists()).toBe(false);
    });/*
    it('should logout when power-button is clicked', () => {
	const localVue = createLocalVue();
	localVue.use(VueRouter);
	const routes = [
	    { path: '/dashboard', name: 'Dashboard' },
	    { path: '/', name: 'Login' }
	];
	const router = new VueRouter({
	    routes
	});
	const wrapper = shallowMount(TopBar, {
	    localVue,
	    propsData: { loggedIn: true },
	    router
	});
	wrapper.vm.$router.push('/dashboard');
	expect(wrapper.vm.$route.path).toBe('/dashboard');
	wrapper.find('.power-button').trigger('click');
	expect(wrapper.vm.$route.path).toBe('/');
    });*/
    
});
