const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
	name: { 
		type: String,
		required: true,
		trim: true
	},
	tel: {
		type: String,
	},
	email: { 
		type: String,
		lowercase: true,
		trim: true
	},
	organisation: {
		type: String
	},
	comment: {
		type: String
	},
	deleted: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	user: {
		type: String,
		required: true
	}
});

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;