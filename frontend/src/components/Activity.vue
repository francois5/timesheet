<template>
  <div id="activity">
    <div class="md-layout">
      <div class="md-layout-item md-xsmall-size-65 md-small-size-60 md-medium-size-50">
	<h2 class="activity-name">{{activity.name}}</h2>
      </div>
      <div class="md-layout-item md-xsmall-size-35 md-small-size-40 md-medium-size-50">
	<md-icon class="setting-icon-button icon-button edit-button" @click.native="openCloseEdit">edit</md-icon>
	<md-icon class="setting-icon-button icon-button delete-button" @click.native="openCloseDelete">delete</md-icon>
      </div>
    </div>
    <md-dialog-confirm
      :md-active.sync="deleteOpen"
      :md-title='$t("doYouReallyWantToDelete")+" \""+activity.name+"\"?"'
      md-content=""
      :md-confirm-text="$t('yes')"
      :md-cancel-text="$t('no')"
      @md-cancel=""
      @md-confirm="onDelete" />

    <div v-if="editOpen" class="md-layout settings-form">
      <div class="md-layout-item md-xsmall-size-100 md-size-50">
	<md-field>
	  <label>{{$t('name')}}</label>
	  <md-input v-model="activity.name"></md-input>
	</md-field>
      </div>
      <div class="md-layout-item md-xsmall-size-100 md-size-50">
        <md-field>
          <md-select v-model="activity.balance" name="balance" id="balance" :placeholder="$t('activityBalance')">
	    <md-option :value="enums.BALANCE.END_OF_WEEK">{{$t('endOfWeek')}}</md-option>
            <md-option :value="enums.BALANCE.END_OF_MONTH">{{$t('endOfMonth')}}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-xsmall-size-100 md-size-50">
        <md-field>
          <md-select v-model="activity.type" name="type" id="type" :placeholder="$t('activityType')">
	    <md-option :value="enums.TYPE.HOURLY_INCOME">{{$t('hourlyIncome')}}</md-option>
            <md-option :value="enums.TYPE.FIXED_INCOME">{{$t('fixedIncome')}}</md-option>
            <md-option :value="enums.TYPE.TIME">{{$t('time')}}</md-option>
          </md-select>
        </md-field>
      </div>
      <div v-if="activity.type === enums.TYPE.HOURLY_INCOME" class="md-layout-item md-xsmall-size-100 md-size-50">
	<md-field>
	  <label>{{$t('hourlyIncome')}}</label>
	  <span v-if="activity.hourlyIncome && activity.hourlyIncome != ''" class="currency-symbol">€</span>
	  <md-input class="number-input" type="number" v-model="activity.hourlyIncome"></md-input>
	</md-field>
      </div>
      <div v-if="activity.type === enums.TYPE.FIXED_INCOME" class="md-layout-item md-xsmall-size-100 md-size-50">
	<md-field>
	  <label>{{$t('fixedIncome')}}</label>
	  <span v-if="activity.fixedIncome && activity.fixedIncome != ''" class="currency-symbol">€</span>
	  <md-input class="number-input" type="number" v-model="activity.fixedIncome"></md-input>
	</md-field>
      </div>

      <div class="md-layout-item md-size-100">
	<md-icon class="down-setting-icon-button icon-button close-button" @click.native="openCloseEdit">close</md-icon>
	<md-icon class="down-setting-icon-button icon-button check-button" @click.native="edit">check</md-icon>
      </div>
      
    </div>
  </div>
</template>

<script>
import enums from '../appDataSchema.js';

export default {
    name: 'Activity',
    props: ['activity'],
    data () {
	return {
	    enums: enums,
	    editOpen: false,
	    deleteOpen: false,
	}
    },
    methods: {
	openCloseEdit: function(e) {
	    this.editOpen = !this.editOpen;
	},
	openCloseDelete: function(e) {
	    this.deleteOpen = !this.deleteOpen;
	},
	edit: function(e) {
	    this.$emit('edit', this.activity);
	    this.editOpen = !this.editOpen;
	},
	onDelete: function(e) {
	    this.$emit('delete', this.activity);
	},
	onCancel: function(e) {
	    
	},
    },
    components: {
	
    },
}
</script>

<style>
.activity-name {
    float: right;
}
.md-layout-item {
    margin: auto;
}
.setting-icon-button {
    float: left;
    margin-left: 15px !important;
}
.down-setting-icon-button {
    float: right;
    margin-right: 15px !important;
}
.md-layout {
    margin: 15px;
    margin-bottom: 0px;
    background-color: #efefef;
}
.md-layout.settings-form {
    margin-top: 0px;
    padding-bottom: 15px;
}
.md-field {
    width: calc(100% - 30px);
    margin-left: 15px;
}
.currency-symbol {
    position: absolute;
    top: 23px;
    font-size: 17.5px;
}
.number-input {
    transform: translateX(14px);
}
</style>
