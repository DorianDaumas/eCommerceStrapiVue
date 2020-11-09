import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

    const state = {
        toggle: false,
    }


    const mutations = {
        TOGGLE_MENU(state) {
            state.toggle = !state.toggle;
        },
        CLOSE_MENU(state) {
            state.toggle = false;
        },
    }

     

export default {
    namespaced: true,
    state,
    mutations
    // actions,
    
  }
