<template>  
  <v-row>
    <v-col cols="12" v-if="!loading">
      <!-- banners for no data -->
       <v-banner two-line class="indigo" dark v-if="carts.length == 0">
        <v-avatar
          slot="icon"
          size="40"
        >
          <v-icon
          >
            mdi-cart
          </v-icon>
        </v-avatar>

        There is no shopping items.

        <template v-slot:actions>
          <v-btn
            text
            dark
            :to="{name: 'Dashboard'}"
          >
            See items
          </v-btn>
        </template>
      </v-banner>

        
        <v-simple-table  v-if="carts.length != 0">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Image
              </th>
              <th class="text-left">
                Original Price
              </th>
              <th class="text-left">
                Quantity Actions
              </th>
              <th class="text-left">
                Quantity 
              </th>
              <th class="text-left">
                Price
              </th>
              <th class="text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart , index) in carts" :key="cart.id">
              <td>{{ index+1 }}</td>
              <td>{{ cart.title }}</td>
              <td>
                <img width="100" height="100" class="my-2" :src= cart.image >
              </td>
              <td class="text-no-wrap">$ {{ cart.price }}</td>
              <td class="text-no-wrap">
                    <v-btn class="purple mr-2" dark @click="increase(cart)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn class="pink darken-1" dark @click="decrease(cart)" >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
              </td>
              <td>{{ cart.qty }}</td>
              <td class="text-no-wrap">$ {{ Number(cart.price * cart.qty).toFixed(2) }}</td>
              <td>
                    <v-btn class="red" dark  @click="deleteCart(index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
              </td>
            </tr>
            
            <!-- total price start -->
            <tr>
              <td colspan="6" class="text-h6">Total Price</td>
              <td colspan="2" class="text-h6">$ {{ Number(totalPrice()).toFixed(2) }}</td>
            </tr>
            <!-- total price end -->
          </tbody>
        </template>
      </v-simple-table>
    </v-col>

    <!-- loading -->

      <div class="loading" v-if="loading">
          <v-progress-circular
          :size="70"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>

  </v-row>
  
</template>

<script>
export default {
  methods : {
    totalPrice(){
      
    return this.carts.reduce( (total , cart) => total += (cart.price *cart.qty) , 0)
    },
    increase(cart){
      
       this.$store.dispatch('increaseQty' , cart);
    },
    decrease(cart){
      this.$store.dispatch('decreaseQty', cart);    
   },
    deleteCart(index){
      this.$store.dispatch('deleteCart', index);
    }
    
  },
  
  computed : {
    carts(){
      return this.$store.state.carts.slice(( a , b ) => a.timestamp - b.timestamp);
    },
    loading(){
      return this.$store.state.loading;
    }
  }

}
</script>

<style>

</style>