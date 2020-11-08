<template>
    <div id="flex">
        <Sidebar />
        <div class="product-component" v-bind:class="{ 'product-component-menu' : this.open }">
            <FilterSelector :getProducts="getProducts"/>
            <ProductList :getProducts="getProducts"  />
        </div>
    </div>
</template>

<script>
import FilterSelector from '../Products/FilterSelector'
import Sidebar from '../Sidebar/Sidebar'
import ProductList from '../Products/ProductList'
import {BaseUrl} from '../../api'
import axios from 'axios'
import { mapState  } from "vuex";

export default {

    components:{
        Sidebar,
        ProductList,
        FilterSelector
    },

    data() {
        return {
            allProducts: null,
            filteredProducts: null
        }
    }, 

    computed: {
        ...mapState({
            open: state => state.toggleMenu.toggle, 
        }),
        choosenCategorie() {
            return this.$store.state.filter.choosenCategorie
        },
        filter() {
            return this.$store.state.filter.isFiltered
        },
        checkCartProducts() {
            return this.$store.state.cart.getcart
        },
        getProducts() {
            if (this.filter === false || this.filteredProducts === null || this.choosenCategorie === null) {
                return this.allProducts
            }
            else{
                return this.filteredProducts.filter(product => product.Categorie === this.choosenCategorie)
            }
        },
    },

    created() {
        axios.get(`${BaseUrl}Products`, {}).then(response => {
            let results = response.data
            let checkQuantity = {checkQuantity: 0}
            results.map( products => {
                let checkProducts = this.checkCartProducts.find(productCart => productCart.id === products.id) 
                if (checkProducts) {
                    checkQuantity = {checkQuantity: checkProducts.checkQuantity}
                    Object.assign(products,checkQuantity);    
                }
                else{
                    checkQuantity = {checkQuantity: 0}
                    Object.assign(products,checkQuantity);                    
                }
            })
            this.allProducts = results
            this.filteredProducts = results
        })
    },
}
</script>
<style>
#flex{
    display: flex;
}
.sidebarTitle{
    padding: 10px;
}
@media screen and (max-width: 700px) {
    .product-component {
        left: 170px!important;
        width: calc(100% - 200px)!important
    }
}

.product-component-menu{
    display: flex;
    flex-flow: wrap;
    background: #F3F3F5;
    position: relative;
    justify-content: center;
    flex-direction: column;
    top: 90px;
    margin: 10px;
    left: 0!important;
    width: 100%!important;
    transition: 0.3s;
}
.product-component{
    transition: 0.3s;
    display: flex;
    flex-flow: wrap;
    background: #F3F3F5;
    position: relative;
    justify-content: center;
    flex-direction: column;
    top: 90px;
    left: 400px;
    width: calc(100% - 500px);
}
</style>