import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/untils/storage.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: getItem('TOUTIAO_USER')
  },
  mutations: {
    setUser (state, value) {
      state.user = value
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(value))
      setItem('TOUTIAO_USER', value)
    }
  },
  actions: {
  },
  modules: {
  }
})
