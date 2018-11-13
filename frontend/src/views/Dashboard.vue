<template>
<div class="dashboard">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="true"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div>
      <md-button @click.native="openAddPeriod" id="add-period-button" class="md-raised md-primary">{{ $t('addPeriod') }}</md-button>
      <md-button @click.native="agenda" id="agenda-button" class="md-raised md-primary">{{ $t('agenda') }}</md-button>
      <md-button @click.native="settings" id="settings-button" class="md-raised md-primary">{{ $t('settings') }}</md-button>
      <md-button @click.native="stats" id="stats-button" class="md-raised md-primary">{{ $t('stats') }}</md-button>
    </div>

    <add-period-dialog v-bind:open="addPeriodDialogOpen" v-bind:appData="appData" v-on:confirm="addPeriod(appData)" v-on:close="addPeriodDialogOpen = false"></add-period-dialog>
    
  </md-content>    
</div>
</template>

<script>
import axios from 'axios';

import TopBar from '../components/TopBar.vue'
import AddPeriodDialog from '../components/AddPeriodDialog.vue'

export default {
    name: 'Dashboard',
    data () {
	return {
	    appData: this.getAppData(),
	    addPeriodDialogOpen: false,
	}
    },
    computed: {
	
    },
    components: {
	TopBar, AddPeriodDialog
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
		    {id: "0", name: "Little Tokyo", color: 0, type: 0, balance: 32},
		    {id: "1", name: "Private lessons", color: 1, type: 0, balance: 33},
		    {id: "2", name: "Study", color: 2, type: 2, balance: 33}
		],
		periods: {
		},
	    };
	    localStorage.setItem('appData', JSON.stringify(appData));
	    return appData;
	},
	openAddPeriod: function(e) {
	    this.addPeriodDialogOpen = true;
	},
	addPeriod: function(appData) {
	    this.appData.periods = appData.periods;
	    localStorage.setItem('appData', JSON.stringify(appData));
	    this.addPeriodDialogOpen = false;
	},
	agenda: function(e) {
	    this.$router.push({ name: 'Agenda' });
	},
	settings: function(e) {
	    this.$router.push({ name: 'Settings' });
	},
	stats: function(e) {
	    this.$router.push({ name: 'Stats' });
	},
    },
}
</script>

<style scoped>

</style>
