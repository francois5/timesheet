<template>
<div class="dashboard">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="true"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div>
      <md-button @click.native="addPeriod" id="add-period-button" class="md-raised md-primary">{{ $t('addPeriod') }}</md-button>
      <md-button @click.native="agenda" id="agenda-button" class="md-raised md-primary">{{ $t('agenda') }}</md-button>
      <md-button @click.native="settings" id="settings-button" class="md-raised md-primary">{{ $t('settings') }}</md-button>
      <md-button @click.native="stats" id="stats-button" class="md-raised md-primary">{{ $t('stats') }}</md-button>
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
	    appData: this.getAppData(),
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
	getAppData: function(e) {
	    // todo get data from server
	    //var appData = JSON.parse(localStorage.getItem('appData'));
	    var appData = {
		activities: [
		    {id: "0", name: "Little Tokyo", type: 0, balance: 32},
		    {id: "1", name: "Private lessons", type: 0, balance: 33},
		    {id: "2", name: "Study", type: 2, balance: 33}
		],
		periods: [

		],
	    };
	    localStorage.setItem('appData', JSON.stringify(appData));
	    return appData;
	},
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
