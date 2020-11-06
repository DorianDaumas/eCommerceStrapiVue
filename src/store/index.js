import Vue from 'vue'
import Vuex from 'vuex'
import filter from './modules/filter'
// import products from './modules/products'
import addCart from './modules/addCart'
import removeItemCart from './modules/removeItemCart'
import cart from './modules/cart'
import userAuthentication from './modules/userAuthentication'
// import relatedProducts from './modules/relatedProducts'
// import productDetails from './modules/productDetails'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userAuthentication,
    filter,
    // products,
    // productDetails,
    addCart,
    removeItemCart,
    cart,
    // relatedProducts
  },
  plugins: [createPersistedState()],
})