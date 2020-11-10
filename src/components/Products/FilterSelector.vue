<template>
    <v-row style="background: white;" justify="center" align="center">
      
      <v-col cols="12" md="6">  
        <div class="Autocomplete-productList">
          <h3 class="sidebarTitle" id="padding-tittle">RECHERCHE</h3>
              <v-autocomplete  
                  v-model="values"
                  :items="product"
                  label="Chercher un produit..."
                  item-text="Title"
                  style="margin-top: 30px;"
                  item-value="id"
                  return-object
                  @change='showProduct(values)'
                  append-icon="mdi-magnify">
              </v-autocomplete>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <v-subheader v-if="product == null && getProducts == null">
          Résultats : 0 produits trouvés 
        </v-subheader>  
        <v-subheader v-else>
          Résultats : {{product.length}} produits trouvés 
        </v-subheader>        
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="choosenSelector"
          :items="items"
          @change="filter"
          label="Trier par :"
        ></v-select>
      </v-col>
    </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
          selected: null,
          values: null,
          items: ["Réinitialiser le filtre","Prix croissant","Prix décroissant", "Disponibilité","Note"],
        }
    }, 
    props: {
        getProducts: Array,
    },

    computed: {

      product(){
        return this.getProducts
      },
      
      ...mapGetters({
                choosenSelector: 'choosenSelector'
            }),
        choosenSelector: {
           get(){
             return this.$store.state.filter.selectedSelector
           },
           set(selected){
             return selected
           } 
        },

        filters() {
            return this.$store.state.filter.isFiltered
        },

    },

    methods: {
      showProduct(values){
        this.$router.push(`/product/${values.id}`)
      },
      filter(value){
        let items = this.items
        let selectorWithValue = {value,items}
        this.$store.dispatch('filter/FILTERED_SELECTOR', {selectorWithValue})

      }
    },

}
</script>
<style>
 @media screen and (min-width: 700px) {
        .Autocomplete-productList{
            display: none!important;
        }
    }
    .Autocomplete-productList{
        height: 100%!important;
    }

</style>