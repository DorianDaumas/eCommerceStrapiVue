<template>
    <div class="details" >
        <!-- <> -->
    <div >
      <v-container fluid >
        <v-row v-for="(product, index) in productDetails" :key="index">
            <v-col cols="12" md="6">
                <div class="flex-details-image">
                    <div class="current-img-size">
                        <v-img style='margin: auto' :src="img ? `${img}` : `${product.Image[0].url}`" ></v-img>
                    </div>
                    <div class="flex-details-image-slide">
                        <div class="other-image" v-for="(productImage, index) in product.Image" :key="index">
                            <v-img class="img-slide" @click='changeImg(productImage.url)' height="100" width="100" :src="`${productImage.url}`" ></v-img>
                        </div>
                    </div>
                </div>
            </v-col>
           
            <v-col id="padding-rating" cols="12" md="6">
                <v-row
                    id="margin-rating"
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="product.Note - 0.5"
                    background-color="#eee"
                    color="yellow"
                    readonly
                    dense
                    half-increments
                    size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                    {{product.Note - 0.5}} 
                    </div>
                </v-row>

                <h1 class="Title-product" id="margin-title">{{product.Title}}</h1>

                <h1 id="margin-title">{{new Intl.NumberFormat().format(product.Price)}} €</h1>               
                    <v-card-title class="stock-good" v-if="product.stocks > 15"> En stocks </v-card-title>
                    <v-card-title class="stock-critical" v-else-if="product.stocks < 14 && product.stocks > 1 "> Bientot indisponible </v-card-title>
                    <v-card-title class="stock-none" v-else-if="product.stocks < 1 && product.stocks == 0 "> Indisponible </v-card-title>
                
                
                <div v-if="checkInCart">
                    <p style="font-style: italic;color: #757575;">Ce produit est dans votre panier.</p>
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
            </v-col>

            <h2 id="decription">DESCRIPTION</h2>
            <p  class="product-description"><span v-html="product.Description"></span></p>

            <h2 style="margin: auto;" id="decription">ARTICLES SIMILAIRES</h2>
        

       
        <!-- <div class="hr-article"></div>
        <h1 class="article">Articles similaires </h1> -->
</v-row>
        </v-container>
        <div class="article-similaire">
            <v-container class="container-article"  fluid>
                <v-row  style="justify-content:space-evenly;" align="center">
                    <v-col v-for="(article, index) in similaire" class="background-article" :key="index" cols="12" md="4">
                    <v-card @click='showProduct(article)'  class="flex-article-similaire" >
                        <v-img class="img-article" width="210" :src="`${article.Image[0].url}`" ></v-img>

                            <v-card-title class="Title-article">{{article.Title}}</v-card-title>
                            <v-card-title class="stock-good" v-if="article.stocks > 15"> En stocks </v-card-title>
                            <v-card-title class="stock-critical" v-else-if="article.stocks < 14 && article.stocks > 1 "> Bientot indisponible </v-card-title>
                            <v-card-title class="stock-none" v-else-if="article.stocks < 1 && article.stocks == 0 "> Indisponible </v-card-title>

                            <v-card-title class="Title-article">{{new Intl.NumberFormat().format(article.Price)}} €</v-card-title>
                    </v-card>
                    </v-col>
                </v-row>
             </v-container>
        </div>
    </div>
    </div>
</template>

<script>
import {BaseUrl} from '../../api'
import axios from 'axios'
export default {
    components:{
        
    },

    data() {
        return {
            similaire:null,
            productDetails: null,
            img:null,
            throwError: false
        }
    }, 

    computed: {
        checkInCart(){
            let checkInCart = this.$store.state.cart.getcart
            let checkProducts = checkInCart.find(productCart => productCart.id === this.productDetails[0].id)

            return checkProducts
                       
        }
    },

    methods: {
        
        showProduct(article){
            this.$router.push(`/product/${article.id}`)
            this.img = null
            this.details()
        },
        changeImg(payload){
            this.img = payload
        },
        addCart(product){
            this.$store.dispatch('addCart/ADD_PRODUCT_CART', product)
        },
        details(){
                let productID = this.$route.params.id
                axios.get(`${BaseUrl}Products`, {}).then(response => {
                    let allProducts = response.data
                    this.productDetails = allProducts.filter(product => product.id === parseInt(productID))
                    let categorie = this.productDetails[0].Categorie
                    this.similaire = allProducts.filter(product => product.Categorie === categorie && product.id !== parseInt(productID) )
                })
                window.scrollTo(0,0);        
        }
    },

    created() {
        this.details()
        
    },



 
}
</script>

<style>

.current-img-size{
    width: 80%;
}

.hr-article{
    width: 50px;
    background: #3e3f43;
    margin: auto;
    height: 2px;
}
.article{
    text-align: center;
    font-size: medium;
    margin-bottom: 50px;
    padding-top: 15px;
    text-transform: uppercase;
    font-weight: 400;
}
#decription{
    width: 250px;
    border-bottom: 2px solid #3e3f43;
    text-align: center;
    font-size: initial;
    margin-bottom: 50px;
    padding-bottom: 20px;
    padding-top: 35px;
}
/* 
.container-article{
    background: #eef0eb;
} */
.product-description{
    color: #6f6f6f;
    white-space: pre-wrap;
    margin-bottom: 70px!important;
}
#margin-title{
    margin-bottom: 50px;
}
#margin-rating{
    margin-bottom: 25px;
}
#padding-rating{
    padding: 60px;
}
.Title-article{
    text-transform: uppercase;
    width: 266px;
    color: #3e3f43!important;
    margin: auto;
    text-align: center;
    justify-content: center;
    text-overflow: ellipsis;
    word-break: break-word!important;
    height: 70px;
    overflow: hidden;
    white-space: pre-line;
}
.Title-product{
    text-transform: uppercase;
}

.background-article{
    background: white;
    border-radius: 4px;
}

@media screen and (max-width: 700px) {
    .details{
        padding-left: 20px!important;
        padding-right: 20px!important;
    }
    .background-article{
        background: transparent!important;
        border-radius: 4px;
    }
    .flex-details-image{
        display: flex;
        flex-direction: column;
    }
    .flex-details-image-slide{
        display: flex;
        flex-direction: row!important;
    }

}

.details{
    background: #eaebef;
    padding-left: 150px;
    padding-right: 150px;
    margin-top: 50px;
    padding-top: 40px;  
}

.flex-price-categorie{
    display: flex;
    justify-content: space-evenly;
}
.img-slide{
    cursor: pointer;
}
.img-article{
    margin: 15px;
    padding: 5px;
    cursor: pointer;
        text-align: center;
    margin: auto;
}
.article-similaire{
    display: flex;
    justify-content: space-evenly;
    margin: 80px 15px;
}
.flex-article-similaire{
    display: flex;
    flex-direction: column;
    width: 310px;
    justify-content: center;
    margin: auto;
    height: 500px;
}
.other-image{
    padding: 5px;
    margin: 5px;
    border: 1px solid rgb(152, 152, 152);
}
.img-size{
    width: 450px!important;
}
.flex-details-image{
    display: flex;
}
.flex-details-image-slide{
    display: flex;
    flex-direction: column;
}

.article-title{
    width: 250px;
    text-overflow: ellipsis;
    height: 150px;
}

</style>