<template>
<div  id="SidebarCart" >
        <h3 class="sidebarTitle" id="padding-tittle">PANIER</h3>
        <div class="placement-cart" v-if="cartProducts.length !== 0 " :key="$route.fullPath" >
            <div>
                
                <ul class="flex-cart border"  v-for="(product, index) in cartProducts" :key="index" >
                    <div>
                        
                        
                    </div>
                    
                    <div class="placement-info">
                        <li class="Title">{{product.Title}}</li>
                            <div style="display: flex;margin: 10px;">
                                <v-rating
                                    :value="product.Note - 0.5"
                                    background-color="#eee"
                                    color="yellow"
                                    readonly
                                    dense
                                    half-increments
                                    class="rating"
                                    size="14">
                                </v-rating>

                                <div class="grey--text ml-4">
                                    {{product.Note - 0.5}} 
                                </div>
                        </div>
                        <div v-if="product.checkQuantity > 0" :key="$route.fullPath"  class="flex-quantity space-quantity">
                            <v-btn  @click.stop.prevent='removeQuantity(product)' color="error">-</v-btn>
                            <p class="add-quantity">quantité <br></p>
                            <v-btn  @click.stop.prevent='addQuantity(product)' color="success">+</v-btn>
                        </div>
                        
                        <div class="flex-price">
                            <p  style="margin: 0;">x {{product.checkQuantity}}</p>
                            <h1>{{new Intl.NumberFormat().format(product.Price * product.checkQuantity)}} €</h1>
                        </div>
                    </div>
                    <div>
                        <v-img
                            width="220px"
                            height="220px"
                            class="picture-product"
                            :src="`https://ecommercestrapi.herokuapp.com${product.Image[0].url}`"
                        ></v-img>
                    </div>

                    <v-btn @click.stop.prevent="deleteItem(product)" style="margin-left: 35px;" class="btn-remove-cart" icon >
                        <v-icon>mdi-cart-remove</v-icon>
                    </v-btn>
                </ul>
            </div>
            <div class="flex-column">
                <h2 >Sous-total ({{cartProducts.length}} articles)</h2>
                <h1 >{{new Intl.NumberFormat().format(total) }} {{total}} €</h1>
                <v-btn
                    color="blue-grey"
                    class="btn-add-cart ma-2 white--text"
                    @click.stop.prevent="payment()"
                    >
                    payer
                    <v-icon
                        right
                        dark
                    >
                        mdi-credit-card-check-outline
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <div class="empty-cart" v-else>
            <p style="text-decoration: none;"><router-link to='/' style="text-decoration: none;"> <v-icon>mdi-arrow-left</v-icon> </router-link> votre panier est vide </p><br>
            <!-- <p> redirigez-vous vers la boutique</p> -->
            
        </div>

    </div>

</template>

<script>
import Swal from 'sweetalert2'

export default {
    components:{
        
    },

    data() {
        return {
        }
    }, 

    mounted() {
        console.log(this.cartProducts,"aefzefnzef")
    },
    
    computed: {
        test(){
            let sum = 0;
            this.cartProducts.forEach(e => {
                        sum += e.checkQuantity;
                    });
                    console.log(sum,"efzefzef")
                    return sum
        },
        cartProducts() {
            return this.$store.state.cart.getcart
        },
        total(){
            let sum = 0;
            this.cartProducts.forEach(e => {
                        sum += e.Price * e.checkQuantity;
                    });
                    
                    return sum
        }
        
    },

    methods: {
 
        addQuantity(product){
            this.$store.dispatch('addCart/ADD_PRODUCT_QUANTITY', product)

        },
        removeQuantity(product){
            this.$store.dispatch('addCart/REMOVE_PRODUCT_QUANTITY', product)
        },
        deleteItem(product){
            this.$store.dispatch('removeItemCart/REMOVE_PRODUCT_CART', product)
        },
        payment(){
            Swal.fire({
                position: 'center',
                toast: true,
                timerProgressBar: true,
                icon: 'success',
                color: "white",
                title: `merci pour votre achat !`,
                showConfirmButton: false,
                timer: 3000
              })
        }
    },
}
</script>

<style scoped>

#redirect{
    color: #2196F3;
    text-transform: uppercase;
    text-decoration: none;
}
.empty-cart{
    font-style: italic;
    color: grey;
        text-transform: uppercase;
    margin: 20px;
    font-size: x-large;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.space-quantity{
    margin-top: 20px;
    margin-right: 30px;
    margin-bottom: 20px;
}
.placement-info{
    width: 200px;
    margin-right: 20px;
}
.placement-cart{
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
}
.flex-column{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    background: #eef0eb;
    padding: 15px;
    height: 100%;
}
.flex-cart{
    display: flex;
    align-items: center;
    padding-left: 90px;
    padding-right: 90px;
    padding-bottom: 20px;
    padding-top: 20px;
    margin: auto;
    justify-content: space-evenly;
}
.flex-price{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.description-product-cart{
    height: 140px;
    width: 25%;
    overflow: auto;
}
.btn-remove-cart{
    transform: scale(1.1);
    background: #f44336;
    transition: 0.2s;
}
.btn-remove-cart:hover{
    transform: scale(1.2);
    
}
.border{

    border-bottom: 1px solid #d8d8d8;
    transition: 0.2s;
}
</style>