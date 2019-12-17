import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import vueLazyload from 'vue-lazyload';
import {currency} from './utils/currency';

import 'assets/scss/index.scss'

Vue.filter("currency", currency);
Vue.config.productionTip = false

Vue.use(vueLazyload, {
  preLoad: 1,
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
