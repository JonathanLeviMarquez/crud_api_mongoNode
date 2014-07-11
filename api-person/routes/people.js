//File: routes/people.js
module.exports = function(app) {

  var Person = require('../models/person.js');

  //GET - Return all people in the DB
  findAllPeople = function(req, res) {
  	Person.find(function(err, people) {
  		if(!err) {
        console.log('GET /people');
  			res.send(people);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a Person with specified ID
  findById = function(req, res) {
  	Person.findById(req.params.id, function(err, person) {
  		if(!err) {
        console.log('GET /person/' + req.params.id);
  			res.send(person);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //POST - Insert a new Person in the DB
  addPerson = function(req, res) {


  	console.log('POST'+'\n');
  	console.log(req.body);


  	var person = new Person({
  		name:    req.body.name,
  		lastName: 	  req.body.lastName,
  		lastName2:  req.body.lastName2
  	});

  	person.save(function(err) {
  		if(!err) {
  			console.log('Created');
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});

  	res.send(person);
  };

  //PUT - Update a register already exists
  updatePerson = function(req, res) {
  	Person.findById(req.params.id, function(err, person) {
  		person.name   = req.body.name;
  		person.lastName    = req.body.lastName;
  		person.lastName2 = req.body.lastName2;

  		person.save(function(err) {
  			if(!err) {
  				console.log('Updated');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  			res.send(person);
  		});
  	});
  }

  //DELETE - Delete a Person with specified ID
  deletePerson = function(req, res) {
  	Person.findById(req.params.id, function(err, person) {
  		person.remove(function(err) {
  			if(!err) {
  				console.log('Removed');
  			} else {
  				console.log('ERROR: ' + err);
  			}
  		})
  	});
  }

  //Link routes and functions
  app.get('/people', findAllPeople);
  app.get('/person/:id', findById);
  app.post('/person', addPerson);
  app.put('/person/:id', updatePerson);
  app.delete('/person/:id', deletePerson);

}