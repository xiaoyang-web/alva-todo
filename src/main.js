import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './util/mandmobile'
import router from './router'
import './registerServiceWorker'
import 'vue2-animate/dist/vue2-animate.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
