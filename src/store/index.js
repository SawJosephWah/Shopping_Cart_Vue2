import Vue from 'vue'
import Vuex from 'vuex'
import fireStore from '../firebase/firebase.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products : [],
    loading : false,
    details : {},
    carts : []
  },

  // -------------------------------- mutation---------------------------------------


  mutations: {
      //fetch all products
      fetchProduct(state , data){
        
              state.products = data;
              state.loading = false;
           
      },

      //fetch product details
      fetchProductDetails(state , product){
        
              state.details = product;
              state.loading = false;
           
      },


      //add product to cart
      addProduct(state, details){
        state.carts.push(details);
      },
      //update cart
      updateCart(state, cart){
        let update_cart = state.carts.find(el => el.id == cart.id);
        update_cart.qty++;
      },
      //increase cart qty
      increaseQty(state , cart){
          cart.qty++;
          
      },

      //decrease cart qty
      decreaseQty(state, cart){
        cart.qty--;
      },

      //delete cart 
      deleteCart(state , index){
        state.carts.splice(index,1);
      },
      retriveFirebase(state , payload){
        state.carts.push(payload);        
      },
      setLoading(state,payload){
          state.loading = payload;
      }
  },


  // ----------------- action ----------------------


  actions : {
    //fetch all products
    fetchProduct(context){
      context.commit('setLoading',true);
      fetch('https://fakestoreapi.com/products')
          .then(res=>res.json())
          .then(json=>{
            context.commit('fetchProduct' , json); 
          })
    },

    //fetch product details
    fetchProductDetails(context , id){
      context.commit('setLoading',true);
     fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(product =>{
            context.commit( 'fetchProductDetails' , product  );
     
        }  )
  },
   //add product to cart
   addProduct(context, details){
    //  1. new product (spread operator + qty)
    let newProduct = { ...details , qty : 1}
    
    // 2. find data , exist or not
    let isInCart = context.state.carts.find( el => el.id == newProduct.id);
     
    // If not exist push . If exist , find data qty++ 
   if(isInCart){
      
        fireStore.collection("carts").doc(isInCart.productId)
          .update({
            qty: isInCart.qty + 1
          })
          .then(()=>{
            context.commit('updateCart' , isInCart);
            
          })
          
    }else{
      //loading
      context.commit('setLoading',true);

      fireStore.collection('carts')
      .add({...newProduct , timestamp : Date.now()})
      .then(docRef => {
        let localProduct = {...newProduct , productId : docRef.id};
       
        context.commit('addProduct' , localProduct);
         //loading
         context.commit('setLoading',false);
      }) ;

      
    }
    
  },
   //increase cart qty
   increaseQty(context , cart){
    context.commit('setLoading',true);
    fireStore.collection("carts").doc(cart.productId)
      .update({
        qty: cart.qty + 1
      })
      .then(()=>{
        context.commit('increaseQty' , cart);
        context.commit('setLoading',false);
      })
    
  },

   //decrease cart qty
   decreaseQty(context, cart){
    if(cart.qty != 1){
      context.commit('setLoading',true);
      fireStore.collection("carts").doc(cart.productId)
        .update({
          qty: cart.qty - 1
        })
        .then(()=>{
          context.commit('decreaseQty' , cart);
          context.commit('setLoading',false);
        })
     
    }
  },

  //delete cart 
  deleteCart(context , index){
    context.commit('setLoading',true);

    let cart = context.state.carts[index];
 
    fireStore.collection('carts')
    .doc(cart.productId)
    .delete()

    context.commit('deleteCart' , index);

    context.commit('setLoading',false);
  },

  //firestore fetch
  fetchFirestore(context){

    context.commit('setLoading',true);
    fireStore.collection("carts").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
          context.commit('retriveFirebase',{...doc.data(), productId : doc.id})
      
      });
      context.commit('setLoading',false);
  });

  
  }

  },
  getters : {
    carts(state){
      return state.carts;
    }
  }
})

export default store;