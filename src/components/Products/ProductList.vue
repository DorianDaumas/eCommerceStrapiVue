<template>
    <div class="card">
            
        <v-card
            v-for="(product, index) in products" :key="index"
            class="mx-auto my-12 cardSpace"
            max-width="300"
            max-height= "100%"
        >
        <v-img
            class="imgResize"
            :src="`http://localhost:1337${product.Image[0].url}`"
        ></v-img>

        <h1 class="product-title">{{product.Title}}</h1>

        <v-card-text>
        <v-row
            align="center"
            class="mx-0"
        >
            <v-rating
            :value="product.Note - 0.5"
            background-color="#eee"
            color="yellow"
            dense
            readonly
            half-increments
            class="rating"
            size="14"
            ></v-rating>

            <div class="grey--text ml-4">
            {{product.Note - 0.5}}
            </div>
        </v-row>
        <v-card-text class="flex-price">
            <h1 class="price">{{new Intl.NumberFormat().format(product.Price)}} €</h1>
        
            <v-card-title class="stock-good" v-if="product.stocks > 15"> En stocks </v-card-title>
            <v-card-title class="stock-critical" v-else-if="product.stocks < 14 && product.stocks > 1 "> Bientot indisponible </v-card-title>
            <v-card-title class="stock-none" v-else-if="product.stocks < 1 && product.stocks == 0 "> Indisponible </v-card-title>
            

        </v-card-text>
        <div class="my-4 flex-btn subtitle-1">
            <v-btn
                color="#3e3f43"
                class="btn-add-cart ma-2 white--text"
                @click='showProduct(product.id)'
                >
                VOIR PLUS
            </v-btn>
           
            <div v-if="product.checkQuantity > 0 || checkCartProductsQuantity.checkQuantity > 0" class="flex-quantity margin-quantity">
                <v-btn @click.stop.prevent='removeQuantity(product)' color="error">-</v-btn>
                <div class="flex-add-quantity">
                    <p class="add-quantity">quantité : </p>
                    <p>x {{product.checkQuantity}}</p>
                </div>
                <v-btn @click.stop.prevent='addQuantity(product)' color="success">+</v-btn>
            </div>
            
             <v-btn
                v-else
                color="#3e3f43"
                class="btn-add-cart ma-2 white--text"
                @click.stop.prevent="addCart(product)"
                >
                Ajouter au panier
                <v-icon
                    right
                    dark
                >
                    mdi-cart-plus
                </v-icon>
            </v-btn>

            
        </div>
        </v-card-text>
    </v-card>
</div>
</template>

<script>
// import {BaseUrl} from '../../api'
// import axios from 'axios'
export default {


    data() {
        return {
        }
    }, 
    props: {
        getProducts: Array

    },
    created() {
    },
    computed: {

        checkCartProductsQuantity() {
            let results = this.products
            let checkCartProducts = this.$store.state.cart.getcart
            let checkQuantity = {checkQuantity: 0}
            results.map( products => {
                let checkProducts = checkCartProducts.find(productCart => productCart.id === products.id) 
                if (checkProducts) {
                    checkQuantity = {checkQuantity: checkProducts.checkQuantity}
                    Object.assign(products,checkQuantity);    
                }
                else{
                    checkQuantity = {checkQuantity: 0}
                    Object.assign(products,checkQuantity); 
                }

            })
            return results
            
        },
        selector(){
            return this.$store.state.filter.selector
        },
        selectedSelector(){
            return this.$store.state.filter.selectedSelector
        },
        products(){
                if (this.selector === null) {
                    return this.getProducts    
                }

                if (this.selectedSelector == this.selector[0]) {
                    if (this.getProducts === null) {
                        return this.getProducts    
                    }
                    else{
                        return this.getProducts.slice().sort( () => Math.random() - 0.5)
                    }
                     
                }
                else if (this.selectedSelector == this.selector[1]) {
                    if (this.getProducts === null) {
                        return this.getProducts
                    }
                    else{
                        return this.getProducts.slice().sort((a, b) => a.Price > b.Price ? 1 : b.Price > a.Price ? -1 : 0 )
                    }
                        
                }
                else if (this.selectedSelector == this.selector[2]) {
                    if (this.getProducts === null) {
                        return this.getProducts
                    }
                    else{
                        return this.getProducts.slice().sort((a, b) => a.Price > b.Price ? -1 : b.Price > a.Price ? 1 : 0)
                    }
                      
                }
                else if (this.selectedSelector == this.selector[3]) {
                    if (this.getProducts === null) {
                        return this.getProducts
                    }
                    else{
                        return this.getProducts.slice().sort((a, b) => a.stocks > b.stocks ? -1 : b.stocks > a.stocks ? 1 : 0)
                    }
                }
                else if (this.selectedSelector == this.selector[4]) {
                    if (this.getProducts === null) {
                        return this.getProducts
                    }
                    else{
                        return this.getProducts.slice().sort((a, b) => a.Note > b.Note ? -1 : b.Note > a.Note ? 1 : 0)
                    }
                     
                }
                else{
                    
                    return this.getProducts.slice().sort( () => Math.random() - 0.5)
                }            
        }
    },

    methods: {
        showProduct(productID){
            this.$router.push(`/product/${productID}`)
        },
        addQuantity(product){
            this.$store.dispatch('addCart/ADD_PRODUCT_QUANTITY', product)
        },
        removeQuantity(product){
            this.$store.dispatch('addCart/REMOVE_PRODUCT_QUANTITY', product)
        },
        addCart(product){ 
            this.$store.dispatch('addCart/ADD_PRODUCT_CART', product)
        }
    },
}
</script>
<style>

.flex-add-quantity{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.margin-quantity{
    margin-top: 7px;
}
.add-quantity{
margin-left: 7px;
    padding: 5px;
    margin-bottom: 0!important;
    margin-right: 7px;
    text-transform: uppercase;
}
.flex-quantity{
    display: flex;
    justify-content: space-evenly;
}
.btn-add-cart{
    transition: 0.3s;
    z-index: 9999;
}

.btn-add-cart:hover{
    transform: scale(1.2);
}

.flex-btn{
    display: flex;
    align-items: center;
    flex-direction: column;
}
.v-card__title{
    font-size: large;
    word-break: break-word!important;
}
.stock-none{
    color: #f44336;
    font-size: small!important;
    font-weight: 500;
    margin: auto;
}
.product-title{
    text-transform: uppercase;
    width: 291px;
    color: #3e3f43!important;
    margin: auto;
    padding-top: 20px;
    text-align: center;
    justify-content: center;
    text-overflow: ellipsis;
    word-break: break-word!important;
    overflow: hidden;
    white-space: pre-line;
    font-size: larger;
    align-items: center;
}
.stock-good{
    color: #4caf50;
    font-size: small!important;
    font-weight: 500;
    margin: auto;
}
.stock-critical{
    color: #ffc107;
    margin: auto;
    font-size: small!important;
    font-weight: 500;
}
.v-image__image--cover{
    background-size: contain!important;
}
.cardSpace{
        margin: 20px;
            transition: 0.3s;
        background-color: #eef0eb;
        padding: 5px;
    /* margin: 35px; */
}
.flex-price{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.imgResize{
height:250px;
    width:100%;
        background: #eef0eb;
}
.descriptionHome{
    height: 23px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
}
.rating{
    margin-left: 20px;
}
.card{
    display: flex;
    flex-flow: wrap;
    background: #ffffff;
    position: relative;
    justify-content: center;
    /* top: 50px; */
}
.cardSpace:hover{
    transform: scale(1.05);
    box-shadow: 0px 0px 19px 1px rgba(0,0,0,0.75);
}
.price{
    font-size: larger;
    text-align: center;
}
</style>