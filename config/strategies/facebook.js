var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');
 
module.exports = function() {
	passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		var providerData = profile._json;
		providerData.accessToken = accessToken;
		providerData.refreshToken = refreshToken;
		
		//console.log("got user profile: " + profile.emails + ".");
		
		var userEmail = 'example@example.com'; //placeholder email, just in case
		if(profile.emails !== undefined){userEmail = profile.emails[0].value}//make sure emails is defined, it might not be. If not, use placeholder.
		
		var providerUserProfile = {
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			fullName: profile.displayName,
			email: userEmail, 
			username: profile.username,
			provider: 'facebook',
			providerId: profile.id,
			providerData: providerData
		};
		users.saveOAuthUserProfile(req, providerUserProfile, done);
	}));
};
