<template>
<div class="dashboard">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="true"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div>
      <md-button @click.native="addPeriod" class="md-raised md-primary">{{ $t('addPeriod') }}</md-button>
      <md-button @click.native="agenda" class="md-raised md-primary">{{ $t('agenda') }}</md-button>
      <md-button @click.native="settings" class="md-raised md-primary">{{ $t('settings') }}</md-button>
      <md-button @click.native="stats" class="md-raised md-primary">{{ $t('stats') }}</md-button>
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
	addPeriod: function(e) {
	    
	},
	agenda: function(e) {
	    router.push({ name: 'Agenda' });
	},
	settings: function(e) {
	    router.push({ name: 'Settings' });
	},
	stats: function(e) {
	    router.push({ name: 'Stats' });
	},
    },
}
</script>

<style scoped>

</style>
