var mongoose = require('mongoose');
var express = require('express');
var app = express();
var db = mongoose.connection;
//var Professor = require('./models/professor');
var bodyParser = require('body-parser');
app.use(express.static(__dirname));
app.use(bodyParser.json());

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://reynaldo.reyes.4@gmail.com:zwvdhyensrwnfipt@smtp.gmail.com');

db.on('error', console.error);
db.once('open', function() {
	
	var assitanceSchema = new mongoose.Schema({
	  	day: String,
	  	assistance: Boolean
	});

	var studentSchema = new mongoose.Schema({
	  	id: Number,
	  	name: String,
	  	lastname: String,
	  	email: String,
	  	assistance: Number,
	  	btaddress: String,
	  	assistanceTotal: [assitanceSchema]
	});

	var sectionSchema = new mongoose.Schema({
	  	name: String,
	  	code: String,
	  	course: String,
	  	semester: String,
	  	students: [studentSchema]
	});

	var courseSchema = new mongoose.Schema({
	  	code: String,
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
		console.log('Received GET ALL professors request');
		Professor.find(function(err, docs){
			//console.log(docs);
			res.json(docs);
		})
	});

	app.get('/professors/:id', function(req, res){
		console.log('Received GET professor request');
		console.log(req.params);
		Professor.findById(req.params.id, 
			function(err, docs){
			console.log(docs);
			res.json(docs);
		})
	});

	app.post('/professors', function(req, res){
		console.log('Received ADD professor request');
		//console.log(req.body);

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
			// setup e-mail data with unicode symbols
			var mailOptions = {
			    from: '"Rey Reyes" <reynaldo.reyes.4@gmail.com>', // sender address
			    to: req.body.email, // list of receivers
			    subject: 'Registro en la aplicación M.A.S.A.',
			    text: 'Este es un correo automatizado para informarle que ha sido registrado en la aplicación M.A.S.A. sus credenciales son: '+ req.body.id +' / '+ req.body.password,
			    html: 'Este es un correo automatizado para informarle que ha sido registrado en la aplicación <b> M.A.S.A.</b> sus credenciales son: '+ req.body.id +' / '+ req.body.password
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			});
			res.json(docs);
		})
	});

	app.delete('/professors/:id', function(req, res){
		console.log("Received DELETE professor request...");
		console.log(req.params);
		Professor.findByIdAndRemove(req.params.id, 
			function(err, docs){
			//console.log(docs);
			res.json(docs);
		});
	});

	app.put('/professors/:id', function(req, res){
		console.log("Received UPDATE professor request");
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