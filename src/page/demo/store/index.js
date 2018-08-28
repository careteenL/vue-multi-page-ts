import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleContext = require.context('./module/', false, /\.js$/)
const keys = moduleContext.keys()
const modules = {}
const debug = process.env.NODE_ENV !== 'production'

// 挂载数据模块
keys.forEach(item => {
  modules[
    item
      .split('/')
      .pop()
      .split('.')[0]
  ] = moduleContext(item).default
})

const store = new Vuex.Store({
  modules,
  strict: debug
})

export default store