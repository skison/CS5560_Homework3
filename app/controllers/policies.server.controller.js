/*Used for displaying privacy policy and terms of service*/

/*display the privacy policy*/
exports.displayPolicy = function(req, res, next) {
	res.render('privacypolicy', {
		title: 'Note Tracker Privacy Policy'
	})
};

/*display the terms of service*/
exports.displayTerms = function(req, res, next) {
	res.render('termsofservice', {
		title: 'Note Tracker Terms Of Service'
	})
};