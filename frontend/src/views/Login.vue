<template>
<div class="login">
  <top-bar v-bind:loggedIn="false"></top-bar>
  <md-content class="inner-screen md-scrollbar">
    <div id="login-form">
      <md-toolbar md-elevation="0" class="form-toolbar">
	<h3 class="md-title">{{ $t('login') }}</h3>
      </md-toolbar>
      <md-content id="login-form-content" class="form-content">
        <form v-on:submit.prevent="submit">
          <md-field :class="emailMsgClass">
      	    <label>{{ $t('email') }}</label>
      	    <md-input v-on:blur="validateEmail" v-model="email" required></md-input>
      	    <span class="md-error">{{ $t('invalidEmail') }}</span>
    	  </md-field>
	  <md-field :class="passwordMsgClass">
      	    <label>{{ $t('password') }}</label>
      	    <md-input v-on:blur="validatePassword" v-model="password" type="password" required></md-input>
      	    <span class="md-error">{{ $t('invalidPassword') }}</span>
    	  </md-field>
	  <p class="error-msg" v-if="error">{{ $t('error') }} {{ error }}</p>
          <md-button id="login" class="md-raised md-primary" type="submit">{{ $t('validate') }}</md-button>
	  <md-button @click.native="guestLogin" id="guestLogin" class="md-raised md-primary">{{ $t('guestLogin') }}</md-button>
	</form>
      </md-content>
    </div>
  </md-content>
</div>
</template>

<script>
import axios from 'axios';
import router from '../router'

import TopBar from '../components/TopBar.vue'

export default {
    name: 'Login',
    data () {
	return {
	    email: null,
	    emailError: false,
	    password: null,
	    passwordError: false,
	    error: null,
	}
    },
    computed: {
	emailMsgClass () {
            return { 'md-invalid': this.emailError }
	},
	passwordMsgClass () {
            return { 'md-invalid': this.passwordError }
	}
    },
    components: {
	TopBar
    },
    beforeMount(){
	this.ifLoggedRedirect()
    },
    methods: {
	ifLoggedRedirect: function() {
	    var token = JSON.parse(localStorage.getItem('token'));
	    var user = JSON.parse(localStorage.getItem('user'));
	    if(token && user && token !== 'null' && user !== 'null'
	       && (user.kind === 'Client' || user.kind === 'Guest'))
		router.push({ name: 'Dashboard' });
	},
	validatePassword: function() {
	    this.passwordError = !this.password;
	    return !this.passwordError;
	},
	validateEmail: function() {
	    var re = new RegExp('^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$', 'i');
	    this.emailError = !re.test(String(this.email).toLowerCase());
	    return !this.emailError;
	},
	validate: function() {
	    return(this.validateEmail() && this.validatePassword());
	},
	guestLogin: function(e) {
	    localStorage.setItem('token', JSON.stringify({ token: 'faketoken' }));
	    localStorage.setItem('user', JSON.stringify({ name: 'Bob', kind: 'Guest' }));
	    router.push({ name: 'Dashboard' });
	},
	submit: function(e) {
	    if(this.validate()) this.login(e);
	},
	login: function(e) {
	    localStorage.setItem('token', JSON.stringify({ token: 'faketoken' }));
	    localStorage.setItem('user', JSON.stringify({ name: 'Bob', kind: 'Client' }));
	    router.push({ name: 'Dashboard' });
/*	    axios.post(this.API_URL+'clientlogin', {
		email: this.email,
		password: this.password
	    }).then(response => {
		localStorage.setItem('token', JSON.stringify(response.data.token));
		localStorage.setItem('user', JSON.stringify(response.data.user));
		router.push({ name: 'Dashboard' });
	    }).catch(e => {
		if(e.response.status === 403) {
		    if(e.response.data === "bad email")
			this.emailError = true;
		    else if(e.response.data === "bad password")
			this.passwordError = true;
		    this.error = null;
		}
		else
		    this.error = e.response.status+', '+e.response.data;
	    });
*/
	}
    },
}
</script>

<style lang="scss">
#login-form {
    max-width: 450px;
    min-height: 280px;
    margin-top: calc(33vh - 140px);
    margin-left: auto;
    margin-right: auto;
}
#login-form-content {
    max-width: 450px;
    height: 400px;
    max-height: 235px;
    background-color: #fff;
    padding-left: 15px;
    padding-right: 15px;
}
</style>
