// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': function (browser) {
	// automatically uses dev Server port from /config.index.js
	// default: http://localhost:8080
	// see nightwatch.conf.js
	const devServer = browser.globals.devServerURL;
	
	browser
	    .url(devServer)
	    .waitForElementVisible('#app', 5000)
	    .assert.elementPresent('#guestLogin')
	    .assert.elementPresent('#login')
	    .assert.containsText('h3.md-title', 'Connection')
	    .assert.elementPresent('.locale-changer')
	    .click('#guestLogin')
	    .assert.elementPresent('.power-button')
	    .end();
    }
};
