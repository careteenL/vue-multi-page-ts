import Vue from 'vue'
import router from './router'
import store from './store'

import Picker from '@components/common-picker/index.js'
import Dialog from '@components/common-dialog/index.js'
import Toast from '@components/common-toast/index.js'

Vue.config.productionTip = false

Vue.prototype.$picker = Picker
Vue.prototype.$dialog = Dialog
Vue.prototype.$toast = Toast

window._ = require('lodash')

require('@commonUi/normalize.scss')

router.afterEach((to, from, next) => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 100)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router
})
