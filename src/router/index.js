import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home/Home.vue'
import Login from '../components/Auth/Login'
import ProductDetails from '../components/Products/ProductDetails'
import Cart from '../components/Cart/Cart'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/product/:id',
    name: 'product',
    props: true,
    component: ProductDetails,
  },
  {
    path: '/Panier',
    name: 'Cart',
    component: Cart,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
