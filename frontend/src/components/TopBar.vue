<template>
  <div id="top-bar">
    <md-toolbar class="inner-top-bar md-primary">
      <md-icon v-if="loggedIn && !dashboard" class="icon-button back-button" @click.native="$emit('back')">arrow_back</md-icon>
      <div class="spacer"></div>
      <locale-changer></locale-changer>
      <div class="center-spacer"></div>
      <md-icon v-if=loggedIn class="icon-button power-button" @click.native="logout">power_settings_new</md-icon>
    </md-toolbar>
  </div>
</template>

<script>
import LocaleChanger from './LocaleChanger.vue';

export default {  
    name: 'TopBar',
    props: ['loggedIn', 'dashboard'],
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
.icon-container {
  
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
</style>
