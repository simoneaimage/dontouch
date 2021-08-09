import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@/assets/sass/app.scss'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


const instance = axios.create({
  baseURL: "https://www.dontouch.ch/json/cc.json",
  timeout: 3000,
  headers: {
      'Content-Type': 'application/json'
  }
});

Vue.prototype.$axios = instance;

new Vue({
  render: h => h(App),
}).$mount('#app')
