<template>
    <v-row style="background: white;" justify="center" align="center">
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
      filter(value){
        let items = this.items
        let selectorWithValue = {value,items}
        this.$store.dispatch('filter/FILTERED_SELECTOR', {selectorWithValue})

      }
    },

}
</script>
<style>


</style>