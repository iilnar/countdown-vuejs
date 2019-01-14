import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import List from './components/List.vue'
import Countdown from './components/Countdown.vue'
import VueFire from 'vuefire'
import Fragment from 'vue-fragment'

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.use(Fragment.Plugin)

const router = new VueRouter({
    routes: [
        { path: '/', component: List },
        { path: '/:timer_name', component: Countdown },
    ]
})

const app = new Vue({
    router
}).$mount('#app');

Vue.filter('two_digits', function (value) {
  if(value.toString().length <= 1)
  {
    return "0"+value.toString();
  }
  return value.toString();
});
