import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'

Vue.use(Vuex)


    const state = {
        getcart: [],        
    }

    const mutations = {
        ADD_PRODUCT(state,product){
            product.checkQuantity = +1;
            let cart = state.getcart
            let fillproduct = product
            cart.unshift(fillproduct)

            Swal.fire({
                position: 'center',
                toast: true,
                timerProgressBar: true,
                icon: 'success',
                color: "white",
                title: `${product.Title} à bien était ajouté dans votre panier.`,
                showConfirmButton: false,
                timer: 3000
              })

        },
        ADD_QUANTITY(state,product){
            let getCart = state.getcart
            var findProduct = getCart.find(o => o.id === product.id)
            if(findProduct){
                findProduct.checkQuantity ++ ; 
            }
        },

        REMOVE_PRODUCT(state,product){
            let getcart = state.getcart
            let deleteItem = getcart.map( (item) => {
                return item.id
            }).indexOf(product.id);
            getcart.splice(deleteItem, 1);

            Swal.fire({
                position: 'center',
                toast: true,
                timerProgressBar: true,
                icon: 'error',
                title: `${product.Title} à bien était supprimé de votre panier.`,
                showConfirmButton: false,
                timer: 3000
              })
        },

        REMOVE_QUANTITY(state,product){
            let getCart = state.getcart
            var findProduct = getCart.find(o => o.id === product.id)
            if(findProduct){
                findProduct.checkQuantity -- ;     
                if (findProduct.checkQuantity <= 0) {
                    let idToRemove = findProduct.id;
                    let index = getCart.map(function(item) {
                        return item.id
                    }).indexOf(idToRemove);
                    
                    getCart.splice(index, 1);
                    Swal.fire({
                        position: 'center',
                        toast: true,
                        timerProgressBar: true,
                        icon: 'error',
                        title: `${product.Title} à bien était supprimé de votre panier.`,
                        showConfirmButton: false,
                        timer: 3000
                      })
                }
            }
        },
    }

    const actions = {

    }



export default {
    namespaced: true,
    state,
    // getters,
    actions,
    mutations
  }
