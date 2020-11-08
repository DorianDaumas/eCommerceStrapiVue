import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

    const state = {
        toggle: true,
    }


    const mutations = {
        TOGGLE_MENU(state) {
            state.toggle = !state.toggle;
        },
    }

     

export default {
    namespaced: true,
    state,
    mutations
    // actions,
    
  }
