<template>
<div class="stats">
  <top-bar v-bind:loggedIn="true" v-bind:dashboard="false" v-on:back="back"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div>
      <h2>{{$t('timePassedDuringCurrentMonthByActivity')}}</h2>
      <chartjs-pie :labels="labels" :data="hours" :bind="true"></chartjs-pie>
    </div>
  </md-content>
</div>
</template>

<script>
import axios from 'axios';

import TopBar from '../components/TopBar.vue';

export default {
    name: 'Stats',
    data () {
	return {
	    labels: [],
            hours: [],
	    appData: JSON.parse(localStorage.getItem('appData')),
	}
    },
    computed: {
	
    },
    components: {
	TopBar
    },
    mounted() {
	this.appData.periods = {"2018":{"10":{"12":{"0":{"0":"2","30":"2"},"1":{"0":"2","30":"2"},"2":{"0":"2","30":"2"},"3":{"0":"2","30":"2"},"4":{"0":"2","30":"2"},"5":{"0":"0","30":"0"},"6":{"0":"0","30":"0"},"7":{"0":"0","30":"0"},"8":{"0":"0","30":"0"},"9":{"0":"0"}},"13":{"0":{"0":"1","30":"1"},"1":{"0":"1","30":"1"},"2":{"0":"1","30":"1"},"3":{"0":"1","30":"1"},"4":{"0":"1","30":"1"}}}}};
	this.piechartDataCurrentMonth();
    },
    methods: {
	piechartDataCurrentMonth: function() {
	    let startDate = new Date();
	    startDate.setDate(1);
	    startDate.setHours(0);
	    startDate.setMinutes(0);
	    let endDate = new Date(startDate);
	    endDate.setMonth(startDate.getMonth()+1);
	    endDate.setDate(endDate.getDate()-1);
            let piechartData = this.piechartData(startDate, endDate);
	    for(let activityId in piechartData) {
		this.labels.push(piechartData[activityId].name);
		this.hours.push(piechartData[activityId].hours);
	    }
	},
	piechartData: function(startDate, endDate) {
	    let act = this.appData.activities;
	    let per = this.appData.periods;
	    let currentDate = new Date(startDate);
	    let piechartData = {};
	    for(let a in act)
		piechartData[act[a].id] = {name: act[a].name, hours: 0};
            while(currentDate.getTime() <= endDate.getTime()) {
		if(per[currentDate.getFullYear()] && per[currentDate.getFullYear()][currentDate.getMonth()] && per[currentDate.getFullYear()][currentDate.getMonth()][currentDate.getDate()])
		    this.getPiechartDayData(piechartData, per[currentDate.getFullYear()][currentDate.getMonth()][currentDate.getDate()]);
		currentDate.setDate(currentDate.getDate()+1);
	    }
	    return piechartData;
	},
	getPiechartDayData: function(piechartData, dayPeriods) {
	    for(let hour in dayPeriods) {
		if(dayPeriods[hour]["0"])
		    piechartData[dayPeriods[hour]["0"]].hours += 0.5;
		if(dayPeriods[hour]["30"])
		    piechartData[dayPeriods[hour]["30"]].hours += 0.5;
	    }
	},
	back: function(e) {
            this.$router.push({ name: 'Dashboard' });
	},
    },
}
</script>

<style scoped>

</style>
