var User = require('mongoose').model('User'),
	passport = require('passport');
	
var getErrorMessage = function(err) {
	var message = '';
 
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
			message = 'Username already exists';
			break;
			default:
			message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign-up Form',
			messages: req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	//console.log('Signing up user');
	if (!req.user) {
		//console.log('New User Data');
		var user = new User(req.body);
		var message = null;
		
		user.provider = 'local';
		
		user.save(function(err) {
			//console.log('Inside user.save');
			if (err) {
				console.log('New User Error! ' + err);
				var message = getErrorMessage(err);
				
				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, function(err) {
				if (err) return next(err);
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.create = function(req, res, next) {
	console.log('Creating user!');
	var user = new User(req.body);
	console.log('Created new user var! ' + user);
	user.save(function(err) {
		if(err){
			console.log('Error creating user!');
			return next(err);
		}else{
			console.log('Was able to create user!');
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	console.log('Finding users!');
	User.find({}, function(err, users) {
		if(err){
			console.log('Error finding users!');
			return next(err);
		}else{
			console.log('Found users, now returning!');
			res.json(users);
		}
	});
};

exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user) {
		if (err) {
			return done(err);
		} else {
			if (!user) {
				var possibleUsername = profile.username ||
				((profile.email) ? profile.email.split('@')[0] : '');
	
				User.findUniqueUsername(possibleUsername, null,
				function(availableUsername) {
					profile.username = availableUsername;
					
					user = new User(profile);
					
					user.save(function(err) {
						if (err) {
							var message = _this.getErrorMessage(err);
							
							req.flash('error', message);
							return res.redirect('/signup');
						}
						
						return done(err, user);
					});
				});
			} else {
				return done(err, user);
			}
		}
	});
};

exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user) {
		if (err) {
			return done(err);
		} else {
			if (!user) {
				var possibleUsername = profile.username ||
					((profile.email) ? profile.email.split('@')[0] : '');
					
				User.findUniqueUsername(possibleUsername, null,
					function(availableUsername) {
						profile.username = availableUsername;
						user = new User(profile);
						user.save(function(err) {
							if (err) {
								var message = _this.getErrorMessage(err);
								req.flash('error', message);
								return res.redirect('/signup');
							}
							return done(err, user);
						});
					});
			} else {
				return done(err, user);
			}
		}
	});
};