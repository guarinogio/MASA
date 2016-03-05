var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('AttendanceDB', 
	['Courses', 'Professors', 'Sections', 'Students']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/students', function(req, res){
	console.log('Received get all request');
	db.Students.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/students/:id', function(req, res){
	console.log('Received get request');
	db.Students.findOne(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/students', function(req, res){
	console.log('Received add request');
	console.log(req.body);
	db.Students.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/students/:id', function(req, res){
	console.log("Received delete request...");
	db.Students.remove(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/students', function(req, res){
	console.log("Received update request");
	console.log(req.body);
	db.Students.findAndModify({query: 
		{"_id": new mongojs.ObjectId(req.body._id)}, 
		update: {$set: {email: req.body.email, number: req.body.number}}
		}, function(err, docs){
			console.log(docs);
			res.json(docs);
		})
});

app.get('/courses', function(req, res){
	console.log('Received get all request');
	db.Courses.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/courses/:id', function(req, res){
	console.log('Received get request');
	db.Courses.findOne(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/courses', function(req, res){
	console.log('Received add request');
	console.log(req.body);
	db.Courses.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/courses/:id', function(req, res){
	console.log("Received delete request...");
	db.Courses.remove(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.get('/sections', function(req, res){
	console.log('Received get all request');
	db.Sections.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/sections/:id', function(req, res){
	console.log('Received get request');
	db.Sections.findOne(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/sections', function(req, res){
	console.log('Received add request');
	console.log(req.body);
	db.Sections.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/sections/:id', function(req, res){
	console.log("Received delete request...");
	db.Sections.remove(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/sections', function(req, res){
	console.log("Received update request");
	console.log(req.body);
	db.Sections.findAndModify({query: 
		{"_id": new mongojs.ObjectId(req.body._id)}, 
		update: {$set: {students: req.body.students}}
		}, function(err, docs){
			console.log(docs);
			res.json(docs);
		})
});

app.get('/professors', function(req, res){
	console.log('Received get all request');
	db.Professors.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/professors/:id', function(req, res){
	console.log('Received get request');
	db.Professors.findOne({_id: new mongojs.ObjectId(req.params.id)}, 
		function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/professors', function(req, res){
	console.log('Received add request');
	console.log(req.body);
	db.Professors.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/professors/:id', function(req, res){
	console.log("Received delete request...");
	db.Professors.remove({_id: new mongojs.ObjectId(req.params.id)}, 
		function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/professors', function(req, res){
	console.log("Received update request");
	console.log(req.body);
	db.Professors.findAndModify({query: 
		{"_id": new mongojs.ObjectId(req.body._id)}, 
		update: {$set: {email: req.body.email, number: req.body.number}}
		}, function(err, docs){
			console.log(docs);
			res.json(docs);
		})
});

app.listen(3000);
console.log("server running on port 3000");