import Vue from 'vue'
import Vuex from 'vuex'
import {BaseUrl} from '../../api'
import axios from 'axios'
import router from '../../router'

Vue.use(Vuex)


    const state = {
        userInfo: null,
    }

    const mutations = {
        USER_INFO (state, userInfo) {
            state.userInfo = userInfo
        },  
        LOGOUT (state) {
            state.userInfo = null
        },
    }

    const actions = {
        // USER_INSCRIPTION (payload) {
        //     axios.get(`${BaseUrl}auth/local/register`, {

        //     })
        // },
        USER_LOGIN ({ commit },payload) {
            axios.post(`${BaseUrl}auth/local`, {
                identifier: payload.email,
                password: payload.password
            }).then(response => {
                let userInfo = response.data
                commit("USER_INFO", userInfo )
                router.push('/');
            })
        },
        USER_LOGOUT({commit}){
            commit("LOGOUT")
        }
        
    }



export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
  }
