import Vue from 'vue'
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Cart from '../views/Cart.vue';
import Details from '../views/Details.vue';

Vue.use(VueRouter) 

let router = new VueRouter({ 
    mode: 'history',
    routes : [
        
     
      {
        path : '/',
        name : 'Dashboard',
        component : Dashboard
      },
      {
        path : '/cart',
        name : 'Cart',
        component : Cart
      },
      {
        path : '/details/:id',
        props : true,
        name : 'Details',
        component : Details
      },
    ]
  })

  export default router;