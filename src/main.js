import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './util/mandmobile'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
