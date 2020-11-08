<template>
  <v-app >
  <v-card id="header">
    <v-toolbar dense>

      <v-btn v-if="$route.params.id !== undefined || $route.path == '/Panier'" @click='goBack' icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      


      <v-app-bar-nav-icon @click='toggleMenu' v-else ></v-app-bar-nav-icon>
      
      <v-toolbar-title id="title-app">E-commerce</v-toolbar-title>

      
    <v-spacer></v-spacer> 
      <v-autocomplete
              class="Autocomplete"
              v-model="values"
              :items="items"
              label="Chercher un produit..."
              item-text="Title"
              style="margin-top: 30px;"
              item-value="id"
              return-object
              @change='showProduct(values)'
              append-icon="mdi-magnify"
      ></v-autocomplete>
      <v-spacer></v-spacer> 
      
      <v-spacer class="spacer-mobile"></v-spacer>   
      
      <v-btn @click="goCart" :disabled="cartProducts.length === 0" icon>
        <span :class="[cartProducts.length > 0 ? activeClass : errorClass]">{{cartProducts.length}}</span>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      
      <v-spacer class="spacer-mobile"></v-spacer> 
      
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-account</v-icon>
              
            </v-btn>
          </template>
          <v-list v-if='userInfo === null'>

            <v-list-item >
              <router-link  to="/Login">Se connecter</router-link>
            </v-list-item>
            
          </v-list>

          <v-list v-else>

            <v-list-item >
              <router-link  to="/Login">Profil</router-link>
            </v-list-item>
            
            <v-list-item >
              <p @click='logout()'>Deconnexion</p>
            </v-list-item>

          </v-list>

        </v-menu>
      </div>

  

    
      <div>
        <p v-if='userInfo !== null' class="p-nav">{{userInfo.user.prenom}}</p>
        <p v-else class="p-nav">Anonyme</p>
      </div>
      
    </v-toolbar>
  </v-card>
  
   <router-view :key="$route.fullPath"/>
  </v-app>
</template>

<script>
import {BaseUrl} from './api'
import axios from 'axios'


export default {
  data() {
    return {
      activeClass: 'number-cart-green',
      errorClass: 'number-cart-red',

      items: null,
      test:null,
      values: ['foo', 'bar'],
      value: null,
    }
  },

  watch: {

  },

  methods: {
    
    showProduct(values){

      this.$router.push(`/product/${values.id}`)
    },

    logout(){
      this.$store.dispatch("userAuthentication/USER_LOGOUT").then(() => {
        this.$router.go()
      })
    },
    goBack(){
      this.$router.push('/')
    },
    goCart(){
        this.$router.push('/Panier')     
    },

    toggleMenu(){
      this.$store.commit("toggleMenu/TOGGLE_MENU")
    },

    getProducts(){
      axios.get(`${BaseUrl}Products`, {}).then(response => {
          let allProducts = response.data
          this.items = allProducts
      })
    }

  },

  computed: {


    userInfo() {
      return this.$store.state.userAuthentication.userInfo
    },
    products() {
      return this.$store.state.products.getAllProducts
    },
    cartProducts() {
        return this.$store.state.cart.getcart
    },
    productDetails() {
        return this.$store.state.productDetails.productDetails
    },
    
  },
  created() {
    this.getProducts()
  },

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');


@media screen and (max-width: 700px) {
    #title-app{
      display: none;
    }
    .Autocomplete{
      display: none!important;
    }

}

@media screen and (min-width: 700px) {
    .spacer-mobile{
      display: block!important;
    }
}

.v-input__slot{
  min-height: 28!important;
}
body{
  font-family: 'Roboto', sans-serif;
  color: rgb(47 47 47 / 87%);
}
.p-nav{
  margin: 10px !important;
  padding: 0!important;
}
h1{
  font-weight: 900;
  color: #3f4044!important;
}
.number-cart-red{
  color: #FF5722;
  font-size: initial;
  position: absolute;
  top: -5px;
  left: 0px;
}
.number-cart-green{
  color: #4caf50;
  font-size: initial;
  position: absolute;
  top: -5px;
  left: 0px;
}
.v-toolbar__content{
  height: 55px!important;
}
#header{
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24);
}
.v-toolbar--dense{
  height: 55px!important;
}
.v-btn--contained{
  box-shadow: none!important;
}
.theme--light.v-card {
 
    color: white!important;
}

.v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 36px!important;
    padding: 0 16px;
}

@media screen and (max-width: 800px){
    
}
</style>
