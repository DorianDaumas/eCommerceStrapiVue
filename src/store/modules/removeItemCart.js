import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


    const actions = {
        REMOVE_PRODUCT_CART ({commit}, product) {
            commit('cart/REMOVE_PRODUCT', product, { root: true })
        },
        REMOVE_PRODUCT_QUANTITY({commit},product){
            commit('cart/REMOVE_QUANTITY', product, { root: true })
        }
    }



export default {
    namespaced: true,
    // state,
    // getters,
    actions,
  }
