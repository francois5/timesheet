<template>
  <div id="datetimepicker">
    <div class="md-layout">
      <div class="md-layout-item md-size-45">
	<md-field>
          <md-select v-model="day" name="day" id="day">
	    <md-option v-for="d in days" :key="d.getTime()" :value="d.getTime()">{{$d(d, 'dayPickerDate')}}</md-option>
          </md-select>
        </md-field>
	<!--<md-content class="">
	  <md-datepicker v-model="localDate" md-immediately/>
	</md-content>-->
      </div>
      <div class="md-layout-item md-size-5"></div>
      <div class="md-layout-item md-size-25">
        <md-field>
          <md-select v-model="hour" name="hour" id="hour" :placeholder="$t('hour')">
	    <md-option v-for="h in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]" :key="h" :value="h">{{h+"h"}}</md-option>
          </md-select>
        </md-field>
      </div>
      
      <div class="md-layout-item md-size-25">
        <md-field>
          <md-select v-model="min" name="min" id="min" :placeholder="$t('min')">
	    <md-option v-for="m in [0,30]" :key="m" :value="m">{{m+"min"}}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Datetimepicker',
    props: ['date'],
    data () {
        return {
	    //localDate: this.date,
	    day: this.date.getTime(),
	    hour: null,
	    min: null,
        }
    },
    computed: {
	days: function() {
	    let date = new Date(this.date);
	    date.setDate(date.getDate()-10);
	    let days = [];
	    while(date.getTime() <= this.date.getTime()+(1000*60*60*24*3)) {
		days.push(new Date(date));
		date.setDate(date.getDate()+1);
	    }
	    return days;
	}
    },
    methods: {
	emitUpdate: function() {
	    let date = new Date(this.localDate)
	    date.setHours(this.hour)
	    date.setMinutes(this.min)
	    this.$emit('update', date)
	}
    },
    watch: {
	localDate: function() {
	    this.emitUpdate()
	},
	hour: function() {
	    this.emitUpdate()
	},
	min: function() {
	    this.emitUpdate()
	},
    },
    components: {
	
    },
}
</script>

<style scoped>

</style>
