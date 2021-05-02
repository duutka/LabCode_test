import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
import router from './router'
import './assets/css/style.css'

require('firebase/firestore');


Vue.prototype.$firebase = firebase;

const firebaseConfig = {
    apiKey: "AIzaSyBc9zZ0vqsO_Kn_yu66FoCIwAmQQmVx1U8",
    authDomain: "lectionrate.firebaseapp.com",
    projectId: "lectionrate",
    storageBucket: "lectionrate.appspot.com",
    messagingSenderId: "5377632351",
    appId: "1:5377632351:web:9e2dbf56ed161ce4f993ea",
    measurementId: "G-KE3ZQ29X0L"
  }

firebase.initializeApp(firebaseConfig)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
