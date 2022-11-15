import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'

// Plugins
import GlobalComponents from './common/globalComponents'
import GlobalDirectives from './common/globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import VueEasytable from 'vue-easytable'
import DatePicker from 'vue2-datepicker'
import VModal from 'vue-js-modal'
import 'bootstrap/dist/css/bootstrap.css'
import './sass/paper-dashboard.scss'
import 'vue-easytable/libs/theme-default/index.css'
import 'vue2-datepicker/index.css'
import 'es6-promise/auto'

// config
import cfg from '../config'

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(SideBar)
Vue.use(VueEasytable)
Vue.use(DatePicker)
Vue.use(VModal)

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.prototype.$cfg = cfg

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
