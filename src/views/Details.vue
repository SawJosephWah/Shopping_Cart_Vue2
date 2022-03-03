<template>
  <v-row>
    <v-col cols="12">
      <v-card v-if="!loading">
        <!-- back button -->
        <v-btn class="secondary ma-2" :to="{ name : 'Dashboard'}">
          <v-icon>mdi-chevron-left</v-icon>
          Back
        </v-btn>


        <div class="text-center">
          <img :src="details.image" width="500" height="500">
        </div>
        

         <v-card-title>
          {{ details.title}}
        </v-card-title>

        <v-card-subtitle>
          {{ details.description }}
        </v-card-subtitle>

        <v-card-text>
          <div class="d-flex align-center"> 
            <v-chip
            class="ma-2 mr-5"
            color="primary"
            >
              {{ details.category }}
            </v-chip>

            <p class="mb-0"> - $ {{ details.price }}</p>
          </div>

          <v-divider></v-divider>

          <div class="d-flex my-3">
            <v-spacer></v-spacer>

            <v-btn class="success" @click="addProduct(details)">
              Add Cart
            </v-btn>
            
          </div>
          
        </v-card-text>
        
      </v-card>
    
    <!-- loading -->

      <div class="loading" v-if="loading">
          <v-progress-circular
          :size="70"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>

        
    
    </v-col>
  </v-row>
</template>

<script>
export default {
  props : ['id'],
  created(){
    this.$store.dispatch('fetchProductDetails',this.id)
  },
  computed : {
    details(){
      return this.$store.state.details;
    },
    loading(){
      return this.$store.state.loading;
    }
  },
  methods: {
    addProduct(details){
    
    this.$store.dispatch( 'addProduct' , details);

    }
  },
}
</script>

<style>

    .loading{
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          /* background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)); */
      
    }
    @media screen and (max-width : 480px){
      img{
        width : 200px;
        height : 200px;
      }
    }


</style>