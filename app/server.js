var mongoose = require('mongoose');
var express = require('express');
var path = require ('path');
var favicon = require ('serve-favicon');
var logger = require('morgan');
var cookieparser = require('cookie-parser');
var app = express();
var db = mongoose.connection;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var jwbt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://masa.mailer.daemon@gmail.com:otigcasccfkqadue@smtp.gmail.com');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
mongoose.Promise = require('bluebird');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

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
	  	id: {
	  		type: Number,
		    unique: true,
		    required: true
	  	},
	  	name: String,
		lastname: String,
		email: String, 
	  	number: String,
	  	role: String,
	   	hash: String,
  		salt: String,
	  	courses: [courseSchema]
	});

	professorSchema.methods.setPassword = function(password){
	  	this.salt = crypto.randomBytes(16).toString('hex');
	    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	};

	professorSchema.methods.validPassword = function(password){
		var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
		return this.hash === hash;
	};

	professorSchema.methods.generateJwt = function() {
		var profile = {
			_id: this._id,
   			role: this.role
		};
		return jwbt.sign(profile, "MY_SECRET", { expiresIn: 18000 });
	};

	var Professor = mongoose.model('professor', professorSchema);

	var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

	passport.use(new LocalStrategy({
	    usernameField: 'id'
	  	},
		function(username, password, done) {
		    Professor.findOne({ id: username }, function (err, professor) {
			    if (err) return done(err);
			    if (!professor) return done(null, false, {message: 'professor not found'});
			    if (!professor.validPassword(password)) return done(null, false, {message: 'Password is wrong'});
			    return done(null, professor);
			});
		}));

	app.use(passport.initialize());

	app.put('/reset/:id', auth, function(req, res){
		Professor.findById(req.params.id, function (err, professor) {
			if (err)
	      		res.send(err);
			professor.setPassword(req.body.password);
			professor.save(
			function(err, docs){
				// setup e-mail data with unicode symbols
				var mailOptions = {
				    from: '"MASA Notifier" <masa.mailer.daemon@gmail.com>', // sender address
				    to: req.body.email, // list of receivers
				    subject: 'Cambio de Contraseña en aplicación M.A.S.A.',
				    text: 'Este es un correo automatizado para informarle que sus credenciales han sido modificadas, sus nuevas credenciales son: '+ req.body.id +' / '+ req.body.password,
				    html: 'Este es un correo automatizado para informarle que sus credenciales han sido modificadas, sus nuevas credenciales son: '+ req.body.id +' / '+ req.body.password
				};
				// send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info){
				    if(error) return console.log(error);
				    console.log('Message sent: ' + info.response);
				});
				var token = professor.generateJwt();
			    res.status(200);
			    res.json({"token" : token});
			})
		});
	});

	app.get('/professors', auth, function(req, res){
		console.log('Received GET ALL professors request');
		Professor.find(function(err, docs){
			//console.log(docs);
			res.json(docs);
		})
	});

	app.get('/professors/:id', auth, function(req, res){
		console.log('Received GET professor request');
		console.log(req.params);
		Professor.findById(req.params.id, 
			function(err, docs){
			console.log(docs);
			res.json(docs);
		})
	});

	app.post('/professors',  function(req, res){
		console.log('Received ADD professor request');
		console.log(req.body);

		var professor = new Professor({
			id: req.body.id,
		    name: req.body.name,
		    lastname: req.body.lastname,
		    email: req.body.email, 
		    number: req.body.number,
		    role: req.body.role,
		    course: [{ name:"Materia" }]
		})
		professor.setPassword(req.body.password);

		professor.save(
			function(err, docs){
			/*	// setup e-mail data with unicode symbols
				var mailOptions = {
				    from: '"MASA Notifier" <masa.mailer.daemon@gmail.com>', // sender address
				    to: req.body.email, // list of receivers
				    subject: 'Registro en la aplicación M.A.S.A.',
				    text: 'Este es un correo automatizado para informarle que ha sido registrado en la aplicación M.A.S.A. sus credenciales son: '+ req.body.id +' / '+ req.body.password,
				    html: 'Este es un correo automatizado para informarle que ha sido registrado en la aplicación <b> M.A.S.A.</b> sus credenciales son: '+ req.body.id +' / '+ req.body.password
				};
				 // send mail with defined transport object
				transporter.sendMail(mailOptions, function(error, info){
				    if(error) return console.log(error);
				    console.log('Message sent: ' + info.response);
				});*/
		        	var token = professor.generateJwt();
			    res.status(200);
			    res.json({"token" : token});
			})
	});

	app.delete('/professors/:id', auth,  function(req, res){
		console.log("Received DELETE professor request...");
		console.log(req.params);
		Professor.findByIdAndRemove(req.params.id, 
			function(err, docs){
			//console.log(docs);
			res.json(docs);
		});
	});

	app.put('/professors/:id', auth,  function(req, res){
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

	app.post('/login', function(req, res){
		passport.authenticate('local', function(err, professor, info){
		    var token;
		    // If Passport throws/catches an error
		    if (err) {
		      	res.status(404).json(err);
		      	return;
		    }
		    // If a user is found
		    if(professor){
		      	token = professor.generateJwt();
		      	res.status(200);
		      	res.json({
		        	"token" : token
		      	});
		    // If user is not found
		    } else {
		     	res.status(401).json(info);
		    }
		})(req, res);
	});
});
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/AttendanceDB');
app.listen(3000, '0.0.0.0');

console.log("server running on port 3000");
