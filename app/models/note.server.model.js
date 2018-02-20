var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var NoteSchema = new Schema({
	subject: String,
	body: String,
	userID: String
});

mongoose.model('Note', NoteSchema);