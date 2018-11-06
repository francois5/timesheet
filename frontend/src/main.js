// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from './router';

import VueI18n from 'vue-i18n';

import "vue-material-design-icons/styles.css";
import { MdButton, MdToolbar, MdContent, MdField, MdMenu, MdList, MdDialog, MdDialogConfirm } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(MdButton);
Vue.use(MdToolbar);
Vue.use(MdContent);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdDialog);
Vue.use(MdDialogConfirm);

Vue.use(VueI18n);

Vue.config.productionTip = false;

Vue.mixin({
  data: function() {
    return {
      get API_URL() {
        return 'https://url/api/';
      },
      get PROTECTED_API_URL() {
	    return 'https://url/api/client/';
      }
    };
  }
});

Vue.use(VueI18n);

import { messages } from './messages.js';
import { dateTimeFormats } from './dateTimeFormats.js';

const i18n = new VueI18n({
    locale: 'fr',
    messages,
    dateTimeFormats
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>'
});
