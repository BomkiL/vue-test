import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/database'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

firebase.initializeApp({
  apiKey: "AIzaSyDxNnpn3_5nx3bCoCmoHrfYZ0yEd0kWcNU",
  authDomain: "vue-test-3ccb1.firebaseapp.com",
  databaseURL: "https://vue-test-3ccb1.firebaseio.com",
  projectId: "vue-test-3ccb1",
  storageBucket: "vue-test-3ccb1.appspot.com",
  messagingSenderId: "1077534881830",
  appId: "1:1077534881830:web:a7d5c561bafd798defcee7"
});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
