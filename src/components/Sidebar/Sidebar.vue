<template>
    <div id="Sidebar">
        <SidebarCart />
        <SidebarFilter />
    </div>
</template>
<script>
import SidebarCart from './sidebarCart'
import SidebarFilter from './sidebarFilter'
export default {
    components:{
        SidebarCart, SidebarFilter
    },
    data() {
        return {
            
        }
    }, 
}
</script>
<style scoped>
    @media screen and (max-width: 700px) {
        #Sidebar {
            width: 150px!important;
        }
    }
    #Sidebar{
        padding: 10px;
        position: fixed;
        z-index: 1;
        top: 50px;
        overflow: auto;
        left: 0;
        width: 300px;
        background: white;
        height: calc(100% - 20px);
        border-right: 1px solid #d9d9d9;
    }
</style>