<template>
<div class="dashboard">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="true"></top-bar>
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
    name: 'Dashboard',
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
	
    },
}
</script>

<style scoped>

</style>
