<template>
    <div class="Sidebar"  v-bind:class="{ 'SidebarHide' : this.open }">
        <SidebarCart />
        <SidebarFilter />

    </div>
</template>
<script>
import SidebarCart from './sidebarCart'
import SidebarFilter from './sidebarFilter'
import { mapState  } from "vuex";
import {BaseUrl} from '../../api'
import axios from 'axios'

export default {
    components:{
        SidebarCart, SidebarFilter
    },
    data() {
        return {
            items: null,
            values:null
        }
    }, 
    methods: {
    
    },

    computed: {
        ...mapState({
            open: state => state.toggleMenu.toggle, 
        }),
    },
}
</script>
<style scoped>
    @media screen and (max-width: 700px) {
        #Sidebar {
            width: 150px!important;
        }
    }
   
    .SidebarHide{
        padding: 10px;
        position: fixed;
        z-index: 1;
        top: 55px;
        overflow: auto;
        z-index: 999999!important;
        transition: 0.3s;
        transform: translateX(-300px)!important;
        left: 0;
        width: 300px;
        background: white;
        /* height: calc(100% - 20px); */
        border-right: 1px solid #d9d9d9;
    }
    .Sidebar{
        z-index: 999999!important;
        padding: 10px;
        position: fixed;
        z-index: 1;
        top: 55px;
        transition: 0.3s;
        overflow: auto;
        left: 0;
        width: 300px;
        background: white;
        height: 100%!important;
        border-right: 1px solid #d9d9d9;
    }
</style>