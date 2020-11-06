<template>
    <div  id="SidebarCart">
        <h3 class="sidebarTitle" id="padding-tittle">PANIER</h3>
        <div class="cart-margin" v-if="cartProducts.length !== 0 ">
            <ul  @click='showProduct(product)' v-for="(product, index) in cartProducts" :key="index" class="sidebarTitle border">
                <p>x{{product.checkQuantity}}</p>
                <v-img
                    class="picture-product"
                    :src="`${product.Image[0].url}`"
                ></v-img>
                <li class="Title">{{product.Title}}</li>
                <v-btn @click.stop.prevent="deleteItem(product)" class="btn-remove-cart" icon >
                    <v-icon>mdi-cart-remove</v-icon>
                </v-btn>
            </ul>
        </div>
        <div v-else>
            <p style="font-style:italic;color: grey;margin: 20px;">votre panier est vide</p>
        </div>
        
           
        
    </div>
</template>
<script>

export default {
    data() {
        return {
            
        }
    }, 
    methods: {
        showProduct(product){
            this.$router.push(`/product/${product.id}`)
        },
        deleteItem(product){
            this.$store.dispatch('removeItemCart/REMOVE_PRODUCT_CART', product)
        }
    },
    computed: {
        checkCartProducts() {
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
        cartProducts() {
            return this.$store.state.cart.getcart
        },
    },

}
</script>
<style scoped>
.cart-margin{
    margin-bottom: 10px;
}
#padding-tittle{
    padding-left: 40px;
}
.picture-product{
    height: 70px;
    width: 80px;
}
.border{
    display: flex;
    border-bottom: 1px solid #d8d8d8;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.2s;
}
.border:hover{
    background: #F3F3F5;
}
.Title{
    width: 121px;
    height: 50px;
    overflow: hidden;
    padding-left: 15px;
    overflow-wrap: break-word;
}
.btn-remove-cart{
    transition: 0.1s;
    z-index: 9999;
}

.btn-remove-cart:hover{
    transform: scale(1.2);
    background: #f44336;
}
</style>