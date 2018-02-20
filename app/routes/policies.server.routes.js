var policies = require('../../app/controllers/policies.server.controller');

module.exports = function(app){
	app.route('/privacy')
		.get(policies.displayPolicy)
		.post(policies.displayPolicy)
		
	app.route('/terms')
		.get(policies.displayTerms)
		.post(policies.displayTerms)
};
