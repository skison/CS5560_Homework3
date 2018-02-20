var Note = require('mongoose').model('Note');
//console.log('loaded Note model: ' + Note);

exports.create = function(req, res, next) {
	
	/*only save note if user is signed in, otherwise ignore it*/
	if(typeof req.user !== 'undefined')
	{
		console.log('Creating new note with user ID: ' + req.user._id)
		
		req.body['userID'] = req.user._id; //add userID to the body for identication
		
		var note = new Note(req.body);
		console.log('Created new note var! ' + note);
		
		note.save(function(err) {
			if(err){
				console.log('Error creating note!');
				return next(err);
			}else{
				console.log('Was able to create note!');
				//res.json(note);
				//now render the page as if it was a GET request
				exports.list(req, res, next);
			}
		});
	}
	else
	{
		//now render the page as if it was a GET request
		exports.list(req, res, next);
	}
};

exports.list = function(req, res, next) {
	
	/*only get or delete notes viewable by this user. Otherwise, don't return anything*/
	if(typeof req.user !== 'undefined')
	{
		/*first, check if we should delete a note*/
		if(req.query.deleteid)
		{
			console.log('Need to delete a note!');
			deleteNote(req.query.deleteid, req.user._id);
		}
		
		console.log('Finding notes!');
		Note.find({userID: req.user._id}, function(err, notes) {
			if(err){
				console.log('Error finding notes!');
				return next(err);
			}else{
				console.log('Found notes, now returning!');
				//res.json(notes);
				res.render('notes', {
					title: 'Note Tracker',
					noteList: notes,
					userFullName: req.user ? req.user.fullName : ''
				})
			}
		});
	}
	else
	{
		res.render('notes', {
			title: 'Note Tracker',
			noteList: {},
			userFullName: req.user ? req.user.fullName : ''
		})
	}
};

/*This is my quick, probably unsafe delete function. The calling function must check to make sure user is signed in!*/
function deleteNote(noteID, userID){ 
	console.log('Going to delete note with id ' + noteID + ", and userID " + userID);
	Note.find({"_id": noteID, "userID": userID}).remove().exec();
}