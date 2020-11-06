import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2'
window.Swal = Swal;
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
export {vm}