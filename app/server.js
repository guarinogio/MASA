var mongoose = require('mongoose');
var express = require('express');
var app = express();
var db = mongoose.connection;
//var Professor = require('./models/professor');
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

db.on('error', console.error);
db.once('open', function() {
	
	var assitanceSchema = new mongoose.Schema({
	  	day: Date
	});

	var studentSchema = new mongoose.Schema({
	  	id: Number,
	  	name: String,
	  	lastname: String,
	  	email: String,
	  	assistance: Number,
	  	btaddress: String,
	  	assistanceTotal: [Date]
	});

	var sectionSchema = new mongoose.Schema({
	  	name: String,
	  	code: Number,
	  	course: String,
	  	semester: String,
	  	assistance: Number,
	  	students: [studentSchema]
	});

	var courseSchema = new mongoose.Schema({
	  	code: Number,
	  	name: String,
	  	credits: Number,
	  	description: String,
	  	sections: [sectionSchema]
	});

	var professorSchema = new mongoose.Schema({
	  id: Number,
	  name: String,
	  lastname: String,
	  email: String, 
	  number: String,
	  role: String,
	  password: String,
	  courses: [courseSchema]
	});

	var Professor = mongoose.model('Professor', professorSchema);
	
	//Professor CRUD

	app.get('/professors', function(req, res){
		console.log('Received get all professors request');
		Professor.find(function(err, docs){
			console.log(docs);
			res.json(docs);
		})
	});

	app.get('/professors/:id', function(req, res){
		console.log('Received get professor request');
		console.log(req.params);
		Professor.findOne(req.params.id, 
			function(err, docs){
			console.log(docs);
			res.json(docs);
		})
	});

	app.post('/professors', function(req, res){
		console.log('Received add professor request');
		console.log(req.body);

		var professor = new Professor({
			id: req.body.id,
		    name: req.body.name,
		    lastname: req.body.lastname,
		    email: req.body.email, 
		    number: req.body.number,
		    role: req.body.role,
		    password: req.body.password,
		    course: [
		    	{ name:"Materia" }
		    ]
		})

		professor.save(
			function(err, docs){
			console.log(docs);
			res.json(docs);
		})
	});

	app.delete('/professors/:id', function(req, res){
		console.log("Received delete professor request...");
		console.log(req.params);
		Professor.findByIdAndRemove(req.params.id, 
			function(err, docs){
			console.log(docs);
			res.json(docs);
		});
	});

	app.put('/professors/:id', function(req, res){
		console.log("Received update professor request");
		console.log("params:" + req.params);
		console.log("body:" + req.body);
		Professor.findById(req.params.id, function (err, professor) {
				if (err)
	      			res.send(err);
			if (typeof req.body.email != 'undefined')	professor.email = req.body.email;
			if (typeof req.body.number != 'undefined') professor.number = req.body.number;
			if (typeof req.body.courses != 'undefined') professor.courses = req.body.courses;

			professor.save(function(err, docs){
				   if (err)
	    			res.send(err);
				console.log(docs);
				res.json(docs);
			});
		});
	});
});

mongoose.connect('mongodb://localhost/AttendanceDB');

app.listen(3000);
console.log("server running on port 3000");


/*var debug = require('debug')('passport-mongo');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});*/
/*
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('AttendanceDB', 
	['DB', 'Courses', 'Professors', 'Sections', 'Students']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/professors', function(req, res){
	console.log('Received get all professors request');
	db.DB.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/professors/:id', function(req, res){
	console.log('Received get professor request');
	db.DB.findOne({_id: new mongojs.ObjectId(req.params.id)}, 
		function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/professors', function(req, res){
	console.log('Received add professor request');
	console.log(req.body);
	db.DB.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/professors/:id', function(req, res){
	console.log("Received delete professor request...");
	db.DB.remove({_id: new mongojs.ObjectId(req.params.id)}, 
		function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/professors', function(req, res){
	console.log("Received update professor request");
	console.log(req.body);
	db.DB.findAndModify({query: 
		{"_id": new mongojs.ObjectId(req.body._id)}, 
		update: {$set: {email: req.body.email, number: req.body.number, courses: req.body.courses}}
		}, function(err, docs){
			console.log(docs);
			res.json(docs);
		})
});

app.get('/courses', function(req, res){
	console.log('Received get all courses request');
	db.DB.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/courses/:id', function(req, res){
	console.log('Received get courses request');
	db.DB.findOne({_id: new mongojs.ObjectId(req.params.id)}, 
		function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/courses', function(req, res){
	console.log('Received add courses request');
	console.log(req.body);
	db.DB.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/courses/:id', function(req, res){
	console.log("Received delete courses request...");
	db.DB.remove({_id: new mongojs.ObjectId(req.params.id)}, 
		function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/courses', function(req, res){
	console.log("Received update courses request");
	console.log(req.body);
	db.DB.findAndModify({query: 
		{"_id": new mongojs.ObjectId(req.body._id)}, 
		update: {$set: {sections: req.body.sections}}
		}, function(err, docs){
			console.log(docs);
			res.json(docs);
		})
});

app.get('/sections', function(req, res){
	console.log('Received get all sections request');
	db.DB.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/sections/:id', function(req, res){
	console.log('Received get section request');
	db.DB.findOne(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/sections', function(req, res){
	console.log('Received add section request');
	console.log(req.body);
	db.DB.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/sections/:id', function(req, res){
	console.log("Received delete section request...");
	db.DB.remove(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/sections', function(req, res){
	console.log("Received update section request");
	console.log(req.body);
	db.DB.findAndModify({query: 
		{"_id": new mongojs.ObjectId(req.body._id)}, 
		update: {$set: {students: req.body.students}}
		}, function(err, docs){
			console.log(docs);
			res.json(docs);
		})
});

app.get('/students', function(req, res){
	console.log('Received get all students request');
	db.DB.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/students/:id', function(req, res){
	console.log('Received get student request');
	db.DB.findOne(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/students', function(req, res){
	console.log('Received add student request');
	console.log(req.body);
	db.DB.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/students/:id', function(req, res){
	console.log("Received delete student request...");
	db.DB.remove(
		{_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/students', function(req, res){
	console.log("Received update student request");
	console.log(req.body);
	db.DB.findAndModify({query: 
		{"_id": new mongojs.ObjectId(req.body._id)}, 
		update: {$set: {email: req.body.email, number: req.body.number}}
		}, function(err, docs){
			console.log(docs);
			res.json(docs);
		})
});

app.listen(3000);
console.log("server running on port 3000");*/