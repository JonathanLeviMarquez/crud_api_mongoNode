var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var personSchema = new Schema({
	name: 		{ type: String },
	lastName: 		{ type: String },
	lastName2: 	{ type: String }
});


module.exports = mongoose.model('Person', personSchema);