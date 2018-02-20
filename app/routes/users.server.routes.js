var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app){
	/*app.route('/users')
		.post(users.create)
		.get(users.list);*/
		
	/*local authentication*/
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);
		
	app.route('/signin')
	.get(users.renderSignin)
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true
	}));
	
	/*OAuth Facebook authentication*/
	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/signin'
	}));
	app.get('/oauth/facebook/callback', passport.authenticate('facebook',
	{
		failureRedirect: '/signin',
		successRedirect: '/'
	}));

	
	app.get('/signout', users.signout);
};