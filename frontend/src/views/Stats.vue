<template>
<div class="stats">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="false" v-on:back="back"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div>

    </div>
  </md-content>    
</div>
</template>

<script>
import axios from 'axios';

import TopBar from '../components/TopBar.vue'

export default {
    name: 'Stats',
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
            this.$router.push({ name: 'Dashboard' });
	},
    },
}
</script>

<style scoped>

</style>
