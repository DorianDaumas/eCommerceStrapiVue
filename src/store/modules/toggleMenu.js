import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

    const state = {
        toggle: false,
    }

    // const getters = {
    //     open(state){
    //         return state.toggle
    //     }
    // }

    const mutations = {
        TOGGLE_MENU(state) {
            state.toggle = !state.toggle;
        },
    }
    const getters = {

        open: (state) => {
            return state.toggle;
        }
    }   
     

export default {
    namespaced: true,
    state,
    getters,
    mutations
    // actions,
    
  }
