import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


    const actions = {
        ADD_PRODUCT_CART ({commit}, product) {
            commit('cart/ADD_PRODUCT', product, { root: true })
        },
        ADD_PRODUCT_QUANTITY({commit},product){
            commit('cart/ADD_QUANTITY', product, { root: true })
        },
    }



export default {
    namespaced: true,
    actions,
  }
