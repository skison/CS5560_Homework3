var notes = require('../../app/controllers/notes.server.controller');

module.exports = function(app){
	app.route('/notes')
		.post(notes.create)
		.get(notes.list)
};
