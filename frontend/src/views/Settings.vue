<template>
<div class="settings">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="false" v-on:back="back"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div>

    </div>
  </md-content>    
</div>
</template>

<script>
  import axios from 'axios';
  import router from '../router'
  
  import TopBar from '../components/TopBar.vue'
  
  export default {
    name: 'Settings',
    data () {
    return {
  
	}
    },
    computed: {
	
    },
    components: {
	TopBar
    },
    beforeMount() {

    },
    beforeDestroy() {
        
    },
    methods: {
      back: function(e) {
        router.push({ name: 'Dashboard' });
      },
    },
}
</script>

<style scoped>

</style>
