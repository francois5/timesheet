<template>
<div class="settings">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="false" v-on:back="back"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div>
      <activity v-for="activity in appData.activities" :key="activity.id" :activity="activity" v-on:edit="editActivity(activity)" v-on:delete="deleteActivity(activity)"></activity>
    </div>
    <md-button @click.native="addActivity" id="add-activity-button" class="md-fab md-primary">
        <md-icon>add</md-icon>
      </md-button>
  </md-content>    
</div>
</template>

<script>
import axios from 'axios';

import TopBar from '../components/TopBar.vue'
import Activity from '../components/Activity.vue'
  
export default {
    name: 'Settings',
    data () {
	return {
	    appData: JSON.parse(localStorage.getItem('appData'))
	}
    },
    computed: {
	
    },
    components: {
	TopBar, Activity
    },
    beforeMount() {
	
    },
    beforeDestroy() {
        
    },
    methods: {
	editActivity: function(activity) {
	    // todo call server
	    localStorage.setItem('appData', JSON.stringify(this.appData));
	},
	addActivity: function() {
	    // todo call server
	    this.appData.activities.push({name: "New activity"}); // todo push server response with new document id
	    localStorage.setItem('appData', JSON.stringify(this.appData));
	},
	deleteActivity: function(activity) {
	    // todo call server
	    this.appData.activities = this.appData.activities.filter(function(a) {
		return a.id !== activity.id;
	    });
	    localStorage.setItem('appData', JSON.stringify(this.appData));
	},
	back: function(e) {
            this.$router.push({ name: 'Dashboard' });
	},
    },
}
</script>

<style scoped>
.settings {
    height: 100%;
}
.inner-screen {
    height: calc(100% - 55px);
    overflow-y: scroll;
}
#add-activity-button {
    position: absolute;
    right: 15px;
    bottom: 15px;
}
</style>
