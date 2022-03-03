<template>
  <v-app>
    <!-- button navigation start -->
       <v-bottom-navigation
          v-model="value"
          :background-color="color"
          dark
          shift
          fixed
          class="hidden-md-and-up"
        >
          <v-btn v-for="item in items"  :key="item.title" :to="item.link">
            <span>{{ item.title }}</span>

            <v-icon>{{ item.icon}}</v-icon>
          </v-btn>
        </v-bottom-navigation>

    <!-- bottom navigation end -->



    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>


      <div class="hidden-md-and-down">
           <v-btn
              :to="{ name : 'Dashboard' }"
              text
              exact
            >
              <v-icon>mdi-home</v-icon>
              <span class="mr-2">Home</span>
              
            </v-btn>
            <v-badge
                :content="carts.length"
                :value="carts.length"
                color="green"
                overlap
              >
                <v-btn
                  :to="{ name : 'Cart' }"
                  text
                  exact
                >
                
                        <v-icon>mdi-cart</v-icon>
                        <span class="mr-2">Cart</span>
                </v-btn>
             </v-badge>
      </div>
     
      
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
        
    </v-main>
  
  </v-app>
</template>

<script>


export default {

  data () {
      return {
        drawer: false,
        items: [
          { title: 'Home', icon: 'mdi-home', link : '/'},
          { title: 'Cart', icon: 'mdi-cart' , link : '/cart'}
        ],
        mini: true,
        value: 0 ,
      }
    },
    created(){
    this.$store.dispatch('fetchFirestore');
    },
    computed: {
      color () {
        switch (this.value) {
          case 0: return 'orange'
          case 1: return 'teal'
          default: return 'orange'
        }
      },
      carts(){
        return this.$store.getters.carts;
      },
      
    },
};
</script>
