<template>
  <div id="top-bar">
    <md-toolbar class="inner-top-bar md-primary">
      <md-icon v-if="loggedIn && !dashboard" class="icon-button back-button" @click.native="$emit('back')">arrow_back</md-icon>
      <div class="spacer"></div>
      <locale-changer v-if=!noLocalChanger></locale-changer>
      <div v-if=agenda class="agenda-wrapper">
	<md-button @click.native="$emit('today')" class="topBarHeigth clickable md-raised md-primary">{{$t('today')}}</md-button>
	<div class="topBarHeigth">
	  <md-icon class="icon-button previous-button" @click.native="$emit('previous')">keyboard_arrow_left</md-icon>
	  <md-icon class="icon-button next-button" @click.native="$emit('next')">keyboard_arrow_right</md-icon>
	</div>
	<div v-if="!xSmallScreen" class="topBarHeigth">{{$d(startDate, 'shortDate')+" "+$t('to')+" "+$d(endDate, 'date')}}</div>
      </div>
      <div class="center-spacer"></div>
      <md-icon v-if=loggedIn class="icon-button power-button" @click.native="logout">power_settings_new</md-icon>
    </md-toolbar>
  </div>
</template>

<script>
import LocaleChanger from './LocaleChanger.vue';

export default {  
    name: 'TopBar',
    props: ['loggedIn', 'dashboard', 'agenda', 'startDate', 'endDate', 'noLocalChanger', 'xSmallScreen'],
    methods: {
	logout: function(e) {
	    localStorage.setItem('token', null);
	    localStorage.setItem('user', null);
	    this.$router.push('/');
	},
    },
    components: {
	LocaleChanger
    },
}
</script>

<style>
#top-bar {
    height: 55px;
    min-height: 55px;
}
.icon-button {
    cursor: pointer;
    z-index: 1;
    margin: 0px !important;
}
.power-button, .back-button {
    height: 55px;
    width: 30px;
}
.inner-top-bar {
    height: 55px;
    min-height: 55px;
}
.center-spacer {
  height: 40px;
  margin-top: 0px;
  margin-right: auto;
  margin-left: auto;
}
.spacer {
  height: 40px;
  margin-top: 0px;
  margin-right: 20px;
}
.previous-button, .next-button {
    font-size: 2.5em !important;
}
.agenda-wrapper {
    height: 55px;
}
.topBarHeigth {
    height: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;
}
.clickable {
    cursor: pointer;
}
</style>
