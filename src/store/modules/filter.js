import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

    const state = {
        choosenCategorie: null,
        isFiltered: false,
        selector: null,
        selectedSelector: null
    }

    const mutations = {
        SELECTED_CATEGORIE(state, value){
            state.choosenCategorie = value
        },
        SELECTED_SELECTOR(state, value){
            state.selectedSelector = value
        },
        SELECTOR(state, value){
            state.selector = value
        },
        IS_FILTERED(state, value){
            state.isFiltered = value
        }
    }
    const getters = {
        choosenCategorie: (state) => {
            return state.choosenCategorie;
        },
        choosenSelector: (state) => {
            return state.selectedSelector;
        }
    }   
     
    const actions = {

        FILTERED_CATEGORIE({ commit }, value){
            if (value == "Tout") {
                commit("SELECTED_CATEGORIE", value ) 
                commit('IS_FILTERED', false)
            }else{
                commit('IS_FILTERED', true)
                commit("SELECTED_CATEGORIE", value )    
            }  
        },
        FILTERED_SELECTOR({ commit }, {selectorWithValue}){
                commit("SELECTED_SELECTOR", selectorWithValue.value )   
                commit("SELECTOR", selectorWithValue.items )    
        },
    }



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    
  }
