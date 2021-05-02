import Vue from 'vue'
import VueRouter from 'vue-router'
import lecture from '../views/lecture.vue'
import lectureSelect from '../components/select_lecture.vue'

Vue.use(VueRouter)

const routes = [
   { path: '/', name:'select_lecture', component:lectureSelect},
   { path: '/lecture/:id', name: 'lecture', component: lecture},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
