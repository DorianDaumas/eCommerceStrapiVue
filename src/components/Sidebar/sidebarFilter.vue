<template>
    <div id="SidebarCartFilter">
        <h3 class="sidebarTitle" id="padding-tittle">CATEGORIE</h3>

        <div class="padding-categorie">
             <v-container>
                <v-checkbox fluid
                    v-for="(categorie, index) in categories" :key="index"
                    v-model="choosenCategorie"
                    :label="categorie"
                    :value="categorie"
                    @change="filter"
                ></v-checkbox>
                
            </v-container>
        </div>

        <!-- <FilterSelector /> -->
           
    </div>
</template>
<script>
// import FilterSelector from '../Products/FilterSelector'
import { mapGetters } from 'vuex'

export default {
    
    components:{
        // FilterSelector
    },
    data() {
        return {
            categories: ['Tout','Lit','Sofa','Lavabo','Chaise','Tabouret'],
            selected: null
        }
    }, 

    created() {
        // window.addEventListener('resize', this.onResize)
        if (this.isMobile()) {
            this.$store.commit("toggleMenu/CLOSE_MENU")
        }
        else {
            this.$store.commit("toggleMenu/OPEN_MENU")
        }
    },

    beforeDestroy() {
        // window.removeEventListener('resize', this.onResize)
    },

    computed: {
        ...mapGetters({
                choosenCategorie: 'choosenCategorie'
            }),
        choosenCategorie: {
           get(){
             return this.$store.state.filter.choosenCategorie
           },
           set(selected){
             return selected
           } 
        },

        selectedCategorie() {
            return this.$store.state.filter.choosenCategorie
        },
    },
    methods: {
        filter(value){
            this.$store.dispatch('filter/FILTERED_CATEGORIE', value)
            window.scrollTo(0,0);
        },
        isMobile() {
            if( screen.width <= 1000 ) {
                return true;
            }
            else {
                return false;
            }
        }

    },
}
</script>
<style scoped>

@media screen and (max-width: 700px) {
    #SidebarCartFilter{
        padding-left: 0px!important;
    }
    .padding-categorie{
        padding-left: 0px!important;
    }
}


#SidebarCartFilter{
    padding-left: 30px;
}
.padding-categorie{
    padding-left: 20px;
}
</style>