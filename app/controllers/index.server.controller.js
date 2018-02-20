exports.render = function(req, res){
	/*record visit date*/
	req.session.lastVisit = new Date();
	console.log(req.session.lastVisit);
	
	
	res.render('index', {
		title: 'Note Tracker',
		userFullName: req.user ? req.user.fullName : ''
	});

};