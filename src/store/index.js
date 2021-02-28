import Vue from 'vue'
import Vuex from 'vuex'
import filter from './modules/filter'
import addItemCart from './modules/addItemCart'
import removeItemCart from './modules/removeItemCart'
import cart from './modules/cart'
import userAuthentication from './modules/userAuthentication'
import toggleMenu from './modules/toggleMenu'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userAuthentication,
    filter,
    addItemCart,
    removeItemCart,
    cart,
    toggleMenu
  },
  plugins: [createPersistedState()],
})