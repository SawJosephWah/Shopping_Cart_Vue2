<template>
  <v-row >
    
    <v-col cols="12" md="6" lg="4" v-for="product in products" :key="product.id" >
      <p>{{ message }}</p>
      <v-card v-if="!loading">
        <div class="text-center">
          <img height="170" width="170" class="mt-2" :src="product.image">
        </div>
        
        <v-card-title>
          {{ product.title }}
        </v-card-title>
        <v-card-text>
          <div class="d-flex justify-space-between align-center" >
            <p class="mb-0">Price - $ {{ product.price }}</p>
            <v-card-actions>
                <v-btn class="primary" @click="detailsProduct(product)">
                  Details
                </v-btn>
            </v-card-actions>
            
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  
     <!-- pagination -->
    <v-col cols="12" v-if="!loading">
      
        <v-pagination
          v-model="page"
          :length="paginationLength"
        ></v-pagination>

    </v-col>

    <div class="loading" v-if="loading">
          <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
    </div>



  </v-row>
</template>

<script>
export default {
  data () {
      return {
        page: 1,
      }
    },
  created(){

     this.$store.dispatch('fetchProduct');
  },
  methods: {
    detailsProduct(product){
      this.$router.push('/details/' + product.id);
    }
  },
  computed:{
    message(){
      return this.$store.getters.message;
    },
    products(){
      // 0 6
      // 6 12
      // 12 18
      let start = (this.page - 1) * 6;
      return this.$store.state.products.slice(start , start + 6);
    },
    loading(){
      return this.$store.state.loading;
    },
    paginationLength(){
      return Math.ceil(this.$store.state.products.length/6);
    }
  }
}
</script>

<style>
  v-card{
    height: 500px;
  }
</style>