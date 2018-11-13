<template>
  <div id="add-period-dialog">
    <md-dialog class="add-period-dialog" :md-active.sync="open" :md-close-on-esc="false" :md-click-outside-to-close="false">
      <md-dialog-title>{{$t('addPeriod')}}</md-dialog-title>
      <div class="add-period-dialog-content">

	<div class="md-layout">
	  <div class="md-layout-item md-size-100">
	    <md-field>
	      <md-select v-model="activityId" name="activity" id="activity" :placeholder="$t('activity')">
		<md-option v-for="act in appData.activities" :key=act.id :value=act.id>{{act.name}}</md-option>
	      </md-select>
	    </md-field>
	  </div>
	  <h4>{{$t('beginDate')}}</h4>
	  <datetimepicker :date="beginDate" v-on:update="updateBeginDate($event)" />
	  <h4>{{$t('endDate')}}</h4>
	  <datetimepicker :date="endDate" v-on:update="updateEndDate($event)" />
	</div>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="newPeriodCancel">{{$t('cancel')}}</md-button>
        <md-button class="md-primary" @click.native="newPeriodConfirm">{{$t('comfirm')}}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>

import Datetimepicker from '../components/Datetimepicker.vue'
import {addPeriod} from '../appDataSchema.js';

export default {
    name: 'AddPeriodDialog',
    props: ['open', 'appData'],
    data () {
        return {
            activityId: null,
	    beginDate: new Date(),
	    endDate: new Date(),
        }
    },
    methods: {
        newPeriodCancel: function() {
            this.$emit('close');
        },
	minus30Mins: function(date) {
	    date.setMinutes(date.getMinutes()-30);
	},
        newPeriodConfirm: function() {
	    let periods = this.appData.periods;
	    if(this.beginDate.getTime() > this.endDate.getTime()) {
		this.minus30Mins(this.beginDate)
		addPeriod(periods, this.activityId.toString(), this.endDate, this.beginDate);
	    }
	    else {
		this.minus30Mins(this.endDate)
		addPeriod(periods, this.activityId.toString(), this.beginDate, this.endDate);
	    }
            this.$emit('confirm', this.appData);
        },
	updateBeginDate: function(date) {
            this.beginDate = date;
        },
	updateEndDate: function(date) {
            this.endDate = date;
        },
    },
    components: {
	Datetimepicker
    },
}
</script>

<style scoped>
.add-period-dialog {
    min-width: 360px;
}
.add-period-dialog-content {
    margin-left: 20px;
    margin-right: 20px;
}
h4 {
    margin: 0px;
}
</style>
